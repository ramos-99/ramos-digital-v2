import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { render } from '@react-email/render';
import ConfirmationEmail from '@/app/components/emails/ConfirmationEmail';

export const runtime = 'edge';

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    type: z.enum(['auditoria', 'projeto', 'consultoria', 'outro']),
    message: z.string().min(10).max(5000),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Honeypot check
        const honeypot = formData.get('_gotcha');
        if (honeypot) {
            return NextResponse.json({ success: true });
        }

        // Validate form data
        const rawData = {
            name: formData.get('name'),
            email: formData.get('email'),
            type: formData.get('type'),
            message: formData.get('message'),
        };

        const result = contactSchema.safeParse(rawData);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: 'Dados inválidos' },
                { status: 400 }
            );
        }

        const { name, email, type, message } = result.data;

        // PRIORITY: Send admin email first
        const adminResult = await resend.emails.send({
            from: 'Ramos Digital <system@ramosdigital.pt>',
            to: 'martim@ramosdigital.pt',
            subject: `Novo contacto: ${name}`,
            replyTo: email,
            text: `Nome: ${name}\nEmail: ${email}\nTipo: ${type}\nMensagem: ${message}`,
        });

        if (adminResult.error) {
            console.error('Admin email failed:', adminResult.error);
            return NextResponse.json(
                { success: false, error: 'Falha ao enviar email' },
                { status: 500 }
            );
        }

        // Admin email sent successfully - now try client confirmation (non-blocking)
        try {
            // Pre-render HTML to avoid timeout
            const emailHtml = await render(ConfirmationEmail({ name, type }));

            await resend.emails.send({
                from: 'Ramos Digital <system@ramosdigital.pt>',
                to: email,
                subject: 'Mensagem Recebida | Ramos Digital',
                html: emailHtml,
            });
        } catch (clientError) {
            // Log but don't fail - admin email was already sent
            console.error('Client confirmation email failed:', clientError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
