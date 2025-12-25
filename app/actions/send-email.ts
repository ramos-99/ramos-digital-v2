'use server';

// We force Edge runtime for Cloudflare Pages compatibility
export const runtime = 'edge';

import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    type: z.enum(['auditoria', 'projeto', 'consultoria', 'outro']),
    message: z.string().min(10, "Mensagem muito curta"),
});

export async function sendEmail(prevState: any, formData: FormData) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        type: formData.get('type'),
        message: formData.get('message'),
    };

    const validated = schema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            error: validated.error.issues[0].message,
        };
    }

    const { name, email, type, message } = validated.data;

    try {
        // Using 'system@ramosdigital.pt' as verified domain sender
        // If this fails due to DNS, user will switch to 'onboarding@resend.dev'
        await resend.emails.send({
            // Added < > brackets for correct email format compliance
            from: 'Ramos Digital System <system@ramosdigital.pt>',
            to: 'martim@ramosdigital.pt',
            reply_to: email, // Note: Resend Node SDK uses reply_to, React SDK uses replyTo. Adjust if needed.
            subject: `[LEAD] ${type.toUpperCase()} - ${name}`,
            text: `
NOVA MENSAGEM DO SITE
---------------------
Nome: ${name}
Email: ${email}
Tipo: ${type}

Mensagem:
${message}
      `,
        });

        return { success: true };

    } catch (error) {
        console.error('Send error:', error);
        return { success: false, error: 'Erro ao enviar email.' };
    }
}
