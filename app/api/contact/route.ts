import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const type = formData.get('type') as string;
        const message = formData.get('message') as string;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: 'Campos obrigatórios em falta' },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: 'Ramos Digital <system@ramosdigital.pt>',
            to: 'martim@ramosdigital.pt',
            subject: `Novo contacto: ${name}`,
            replyTo: email,
            text: `Nome: ${name}\nEmail: ${email}\nTipo: ${type}\nMensagem: ${message}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'Falha ao enviar email' },
            { status: 500 }
        );
    }
}
