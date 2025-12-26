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

const typeLabels: Record<string, string> = {
    auditoria: 'Auditoria Técnica',
    projeto: 'Novo Projeto',
    consultoria: 'Consultoria',
    outro: 'Outro Assunto',
};

// Simple HTML email template
function getConfirmationEmailHtml(name: string, type: string): string {
    const projectType = typeLabels[type] || type;
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
        <p style="color:#ffffff;font-size:12px;font-weight:600;letter-spacing:0.2em;margin:0 0 32px 0;">RAMOS DIGITAL</p>
        <div style="background-color:#111111;border-radius:8px;padding:40px;border:1px solid #222222;">
            <h1 style="color:#ffffff;font-size:24px;font-weight:600;margin:0 0 24px 0;">Mensagem Recebida</h1>
            <p style="color:#d4d4d4;font-size:16px;line-height:26px;margin:0 0 16px 0;">Olá ${name},</p>
            <p style="color:#d4d4d4;font-size:16px;line-height:26px;margin:0 0 16px 0;">Recebi a sua mensagem relativamente a <strong>${projectType}</strong>.</p>
            <p style="color:#d4d4d4;font-size:16px;line-height:26px;margin:0 0 16px 0;">Vou analisar o seu pedido e entrarei em contacto brevemente.</p>
            <hr style="border:none;border-top:1px solid #333333;margin:32px 0;">
            <p style="color:#888888;font-size:14px;line-height:24px;margin:0;">
                Com os melhores cumprimentos,<br>
                <strong>Martim Ramos</strong><br>
                <span style="color:#666666;font-size:12px;">Ramos Digital</span>
            </p>
        </div>
    </div>
</body>
</html>`;
}

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

        // Send admin email (priority)
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

        // Send client confirmation (non-blocking)
        try {
            await resend.emails.send({
                from: 'Ramos Digital <system@ramosdigital.pt>',
                to: email,
                subject: 'Mensagem Recebida | Ramos Digital',
                html: getConfirmationEmailHtml(name, type),
            });
        } catch (clientError) {
            console.error('Client email failed:', clientError);
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
