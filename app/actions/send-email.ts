"use server";

export const runtime = 'edge';

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define schema for validation
const ContactSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    type: z.enum(["auditoria", "projeto", "consultoria", "outro"], {
        message: "Selecione um tipo válido",
    }),
    message: z.string().min(10, "Mensagem muito curta (mínimo 10 caracteres)"),
});

export async function sendEmail(prevState: any, formData: FormData) {
    // Validate fields
    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        type: formData.get("type"),
        message: formData.get("message"),
    });

    // Return errors if validation fails
    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, type, message } = validatedFields.data;

    try {
        // Send email via Resend
        const data = await resend.emails.send({
            from: "Ramos Digital System <system@ramosdigital.pt>",
            to: ["martim@ramosdigital.pt"],
            replyTo: email,
            subject: `[LEAD] ${type.toUpperCase()} - ${name}`,
            text: `
NOVA MENSAGEM DO SITE (WEB - LEAD)
------------------------------------------------
NOME:    ${name}
EMAIL:   ${email}
TIPO:    ${type.toUpperCase()}
------------------------------------------------
MENSAGEM:
${message}
      `,
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return { success: false, error: "Erro ao enviar email. Tente novamente." };
        }

        return { success: true };
    } catch (error) {
        console.error("Server Action Error:", error);
        return { success: false, error: "Erro interno do servidor." };
    }
}
