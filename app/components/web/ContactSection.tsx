"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

// Schema
const formSchema = z.object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    type: z.enum(["auditoria", "projeto", "consultoria", "outro"]),
    message: z.string().min(10, "Mínimo 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
    const [isPending, setIsPending] = useState(false);
    const [serverState, setServerState] = useState<{ success?: boolean; error?: any }>({});
    const honeypotRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { type: "projeto" },
    });

    const onSubmit = async (data: FormData) => {
        setIsPending(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("type", data.type);
            formData.append("message", data.message);
            formData.append("_gotcha", honeypotRef.current?.value || "");

            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setServerState({ success: true });
                reset();
            } else {
                setServerState({ success: false, error: result.error });
            }
        } catch (error) {
            setServerState({ success: false, error: "Erro de rede" });
        } finally {
            setIsPending(false);
        }
    };

    // --- SUCCESS STATE ---
    if (serverState.success) {
        return (
            <section className="relative bg-zinc-950 px-4 md:px-8 py-24 md:py-32 overflow-hidden">
                {/* Ambient Backlight Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.15)_0%,transparent_100%)] blur-3xl pointer-events-none" aria-hidden="true" />

                <div className="relative max-w-6xl mx-auto bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] rounded-[2.5rem] p-12 md:p-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] flex items-center justify-center min-h-[400px]">
                    <div className="text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-1 bg-black mx-auto mb-8" />
                        <h3 className="text-4xl md:text-6xl font-bold text-black mb-4 tracking-tighter">
                            MENSAGEM RECEBIDA.
                        </h3>
                        <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                            Resposta em breve.
                        </p>
                        <button
                            onClick={() => setServerState({})}
                            className="mt-10 px-8 py-3 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                        >
                            Enviar Outra
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // --- FORM STATE ---
    return (
        <section className="relative bg-zinc-950 px-4 md:px-8 py-24 md:py-32 overflow-hidden">
            {/* Ambient Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.15)_0%,transparent_100%)] blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative max-w-6xl mx-auto bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] rounded-[2.5rem] p-8 md:p-16 lg:p-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT: CONTEXT */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4">
                                Contacto
                            </p>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6 leading-[0.9]">
                                VAMOS
                                <br />
                                CONSTRUIR.
                            </h2>
                            <p className="text-zinc-500 max-w-sm text-lg leading-relaxed">
                                Projetos ambiciosos merecem engenharia de precisão.
                                Fale comigo sobre a sua visão.
                            </p>
                        </div>

                        <div className="mt-16 space-y-8">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                                    Email
                                </p>
                                <a
                                    href="mailto:martim@ramosdigital.pt"
                                    className="text-xl text-black hover:text-zinc-600 transition-colors inline-flex items-center gap-2 group"
                                >
                                    martim@ramosdigital.pt
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            <div className="flex gap-4">
                                <SocialLink href="https://github.com" icon={Github} />
                                <SocialLink href="https://twitter.com" icon={Twitter} />
                                <SocialLink href="https://linkedin.com" icon={Linkedin} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Honeypot */}
                        <input
                            ref={honeypotRef}
                            type="text"
                            name="_gotcha"
                            tabIndex={-1}
                            autoComplete="off"
                            className="hidden"
                        />

                        {/* NAME */}
                        <div className="group">
                            <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 group-focus-within:text-black transition-colors">
                                Nome
                            </label>
                            <input
                                {...register("name")}
                                className="w-full bg-transparent border-b-2 border-zinc-200 text-black py-3 focus:outline-none focus:border-black transition-colors text-xl placeholder:text-zinc-300"
                                placeholder="O seu nome"
                                autoComplete="off"
                            />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>

                        {/* EMAIL */}
                        <div className="group">
                            <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 group-focus-within:text-black transition-colors">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                className="w-full bg-transparent border-b-2 border-zinc-200 text-black py-3 focus:outline-none focus:border-black transition-colors text-xl placeholder:text-zinc-300"
                                placeholder="email@exemplo.com"
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </div>

                        {/* TYPE */}
                        <div className="group">
                            <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 group-focus-within:text-black transition-colors">
                                Tipo de Projeto
                            </label>
                            <div className="relative">
                                <select
                                    {...register("type")}
                                    className="w-full bg-transparent border-b-2 border-zinc-200 text-black py-3 focus:outline-none focus:border-black transition-colors text-xl appearance-none cursor-pointer"
                                >
                                    <option value="projeto">Novo Projeto</option>
                                    <option value="auditoria">Auditoria Técnica</option>
                                    <option value="consultoria">Consultoria</option>
                                    <option value="outro">Outro Assunto</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* MESSAGE */}
                        <div className="group">
                            <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3 group-focus-within:text-black transition-colors">
                                Mensagem
                            </label>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="w-full bg-transparent border-b-2 border-zinc-200 text-black py-3 focus:outline-none focus:border-black transition-colors text-xl resize-none placeholder:text-zinc-300"
                                placeholder="Descreva o seu projeto..."
                            />
                            {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                        </div>

                        {/* SUBMIT */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-5 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? "A Enviar..." : "Enviar Mensagem"}
                            </button>

                            {serverState.error && (
                                <p className="mt-4 text-red-600 font-mono text-xs uppercase">
                                    Erro: {typeof serverState.error === "string" ? serverState.error : "Falha na validação."}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

// --- SUBCOMPONENTS ---

function SocialLink({ href, icon: Icon }: { href: string; icon: typeof Github }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 border-2 border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black hover:border-black transition-all duration-300"
        >
            <Icon size={20} />
        </a>
    );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
    return <p className="mt-2 text-red-600 font-mono text-xs uppercase tracking-wide">{children}</p>;
}
