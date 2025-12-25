"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContact } from "@/app/actions/submit-contact";
import { clsx } from "clsx";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

// Schema (Matched with Server Action logic, though validation is now manual in action)
const formSchema = z.object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    type: z.enum(["auditoria", "projeto", "consultoria", "outro"]),
    message: z.string().min(10, "Mínimo 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
    const [isPending, startTransition] = useTransition();
    const [serverState, setServerState] = useState<{ success?: boolean; error?: any }>({});

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "projeto",
        },
    });

    const onSubmit = (data: FormData) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("type", data.type);
            formData.append("message", data.message);

            const result = await submitContact(null, formData);

            if (result.success) {
                setServerState({ success: true });
                reset(); // Clear form
            } else {
                setServerState({ success: false, error: result.error });
            }
        });
    };

    // --- RENDER: SUCCESS STATE ---
    if (serverState.success) {
        return (
            <section className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[50vh]">
                <div className="text-center font-mono animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-1 bg-green-500 mx-auto mb-6" />
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                        MENSAGEM RECEBIDA.
                    </h3>
                    <p className="text-white/50 text-sm tracking-widest uppercase">
                        O protocolo de comunicação foi iniciado.
                        <br />
                        Aguarde resposta em breve.
                    </p>
                    <button
                        onClick={() => setServerState({})}
                        className="mt-8 text-xs text-white/30 hover:text-white underline underline-offset-4 decoration-white/20 transition-colors"
                    >
                        [ ENVIAR OUTRA ]
                    </button>
                </div>
            </section>
        );
    }

    // --- RENDER: FORM STATE ---
    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                {/* ESQUERDA: DIRECT CHANNEL */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
                            Contato
                        </h2>
                        <p className="text-white/40 font-mono text-xs tracking-[0.2em] mb-12">
                            CHANNEL_OPEN // READY
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-white/30 text-[10px] font-mono tracking-widest uppercase mb-2">EMAIL PRINCIPAL</h4>
                                <a href="mailto:martim@ramosdigital.pt" className="text-xl md:text-2xl text-white hover:text-white/70 transition-colors font-light">
                                    martim@ramosdigital.pt
                                </a>
                            </div>

                            <div className="flex gap-6">
                                <SocialLink href="https://github.com" icon={Github} />
                                <SocialLink href="https://twitter.com" icon={Twitter} />
                                <SocialLink href="https://linkedin.com" icon={Linkedin} />
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <p className="text-white/20 text-[10px] font-mono max-w-xs leading-relaxed">
                            ESTE SISTEMA É MONITORIZADO. TODAS AS COMUNICAÇÕES SÃO CRIPTOGRAFADAS E ARQUIVADAS PARA AUDITORIA.
                        </p>
                    </div>
                </div>

                {/* DIREITA: THE FORM */}
                <form action={submitContact} onSubmit={handleSubmit(onSubmit)} className="space-y-12">

                    {/* INPUT: NAME */}
                    <div className="group">
                        <label className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2 group-focus-within:text-white transition-colors">
                            Identificação (Nome)
                        </label>
                        <input
                            {...register("name")}
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-light text-xl rounded-none placeholder:text-white/10"
                            placeholder="Ex: Ana Silva"
                            autoComplete="off"
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>

                    {/* INPUT: EMAIL */}
                    <div className="group">
                        <label className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2 group-focus-within:text-white transition-colors">
                            Ponto de Contato (Email)
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-light text-xl rounded-none placeholder:text-white/10"
                            placeholder="ana@empresa.com"
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>

                    {/* SELECT: TYPE */}
                    <div className="group">
                        <label className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2 group-focus-within:text-white transition-colors">
                            Classificação
                        </label>
                        <div className="relative">
                            <select
                                {...register("type")}
                                className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-light text-xl rounded-none appearance-none cursor-pointer"
                            >
                                <option value="projeto" className="bg-black text-white">Novo Projeto</option>
                                <option value="auditoria" className="bg-black text-white">Auditoria Técnica</option>
                                <option value="consultoria" className="bg-black text-white">Consultoria</option>
                                <option value="outro" className="bg-black text-white">Outro Assunto</option>
                            </select>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 text-xs font-mono">
                                [▼]
                            </div>
                        </div>
                    </div>

                    {/* TEXTAREA: MESSAGE */}
                    <div className="group">
                        <label className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2 group-focus-within:text-white transition-colors">
                            Dados da Transmissão
                        </label>
                        <textarea
                            {...register("message")}
                            rows={4}
                            className="w-full bg-transparent border-b border-white/20 text-white py-2 focus:outline-none focus:border-white transition-colors font-light text-xl rounded-none resize-none placeholder:text-white/10"
                            placeholder="Descreva o objetivo..."
                        />
                        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full md:w-auto px-8 py-4 border border-white/20 text-white font-mono text-sm tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10">
                                {isPending ? "[ ENVIANDO... ]" : "[ INICIAR_PROTOCOLO ]"}
                            </span>
                        </button>

                        {/* Server Error Message */}
                        {serverState.error && (
                            <p className="mt-4 text-red-500 font-mono text-xs">
                                ERRO: {typeof serverState.error === 'string' ? serverState.error : "Falha na validação."}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

// --- SUBCOMPONENTS ---

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all duration-300"
        >
            <Icon size={18} />
        </a>
    );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
    return <p className="mt-2 text-red-500 font-mono text-[10px] uppercase tracking-wide">{children}</p>;
}
