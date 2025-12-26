import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
            // Silently return success to trick the bot
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
