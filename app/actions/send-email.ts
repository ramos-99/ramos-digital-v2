'use server';

export const runtime = 'edge';

import { Resend } from 'resend';

export async function sendEmail(prevState: any, formData: FormData) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const type = formData.get('type') as string;
    const message = formData.get('message') as string;

    try {
        await resend.emails.send({
            from: 'Ramos Digital <system@ramosdigital.pt>',
            to: 'martim@ramosdigital.pt',
            subject: `Novo contacto: ${name}`,
            reply_to: email,
            text: `Nome: ${name}\nEmail: ${email}\nTipo: ${type}\nMensagem: ${message}`,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Falha ao enviar email' };
    }
}
