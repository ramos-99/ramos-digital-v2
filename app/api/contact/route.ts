import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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

        // Honeypot check: if _gotcha is filled, it's a bot
        const honeypot = formData.get('_gotcha');
        if (honeypot) {
            return NextResponse.json({ success: true });
        }

        // Extract and validate form data
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

        // Send both emails in parallel
        const [adminResult, clientResult] = await Promise.allSettled([
            // Email 1: Admin notification
            resend.emails.send({
                from: 'Ramos Digital <system@ramosdigital.pt>',
                to: 'martim@ramosdigital.pt',
                subject: `Novo contacto: ${name}`,
                replyTo: email,
                text: `Nome: ${name}\nEmail: ${email}\nTipo: ${type}\nMensagem: ${message}`,
            }),
            // Email 2: Client confirmation
            resend.emails.send({
                from: 'Ramos Digital <system@ramosdigital.pt>',
                to: email,
                subject: 'Mensagem Recebida | Ramos Digital',
                react: ConfirmationEmail({ name, type }),
            }),
        ]);

        // Log results for debugging
        if (adminResult.status === 'rejected') {
            console.error('Admin email failed:', JSON.stringify(adminResult.reason));
        } else {
            console.log('Admin email sent:', adminResult.value);
        }

        if (clientResult.status === 'rejected') {
            console.error('Client email failed:', JSON.stringify(clientResult.reason));
        } else {
            console.log('Client email sent:', clientResult.value);
        }

        // Success if admin email was sent (client email is nice-to-have)
        if (adminResult.status === 'fulfilled') {
            return NextResponse.json({ success: true });
        }

        // Admin email failed
        return NextResponse.json(
            { success: false, error: 'Falha ao enviar email' },
            { status: 500 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
