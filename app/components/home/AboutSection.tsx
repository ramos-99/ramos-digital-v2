"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { TechIcon } from "@/app/components/ui/TechIcon";
import { LisbonTime } from "@/app/components/home/LisbonTime";
import { useTranslations } from "next-intl";

// About Section Component
export function AboutSection() {
    const t = useTranslations();
    const reveal1 = useScrollReveal();
    const reveal2 = useScrollReveal();

    return (
        <section id="about" className="py-8 md:py-32 px-4 md:px-6 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div
                    ref={reveal1.ref}
                    className={`mb-16 ${reveal1.isRevealed ? "revealed" : ""}`}
                    style={{
                        opacity: reveal1.isRevealed ? 1 : 0,
                        transform: reveal1.isRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                        {t("about_title")}
                        <span className="text-electric-400">.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div
                    ref={reveal2.ref}
                    className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[180px] ${reveal2.isRevealed ? "revealed" : ""
                        }`}
                    style={{
                        opacity: reveal2.isRevealed ? 1 : 0,
                        transform: reveal2.isRevealed ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    {/* Card 1: Education (Large) */}
                    <div className="group md:col-span-2 lg:col-span-3 row-span-2 p-8 rounded-2xl glass-card border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mb-6">
                                <svg
                                    className="w-7 h-7 text-electric-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 14l9-5-9-5-9 5 9 5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                </svg>
                            </div>

                            <h3 className="font-heading text-2xl font-semibold mb-3">
                                {t("about_edu_title")}
                            </h3>

                            <p
                                className="text-white/60 mb-auto leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t.raw("about_edu_desc") }}
                            />

                            <div className="flex items-center gap-2 text-sm text-white/40 font-mono mt-6">
                                <span className="text-electric-400">&gt;</span>
                                <span>{t("about_edu_note")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Status (Small) */}
                    <div className="group md:col-span-2 lg:col-span-2 p-6 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer">
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                </span>
                                <span className="text-emerald-400 font-medium">
                                    {t("about_status")}
                                </span>
                            </div>
                            <div>
                                <p className="text-2xl font-heading font-semibold">
                                    {t("about_freelance")}
                                </p>
                                <p className="text-white/40 text-sm mt-1">
                                    {t("about_freelance_desc")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Location + Time */}
                    <div className="group lg:col-span-1 p-6 rounded-2xl glass-card border border-white/10 hover:border-electric-500/30 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <svg
                                className="w-6 h-6 text-electric-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="text-xs text-white/30 font-mono">{t("about_timezone")}</span>
                        </div>
                        <div>
                            <LisbonTime />
                            <p className="text-white/40 text-sm">{t("about_location")}</p>
                        </div>
                    </div>

                    {/* Card 4: Tech Stack (Wide) */}
                    <div className="group md:col-span-4 lg:col-span-3 row-span-1 p-6 rounded-2xl glass-card border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-electric-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    {/* React */}
                                    <TechIcon color="#61DAFB" name="React">
                                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                                    </TechIcon>
                                    {/* Cloudflare */}
                                    <TechIcon color="#F48120" name="Cloudflare">
                                        <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713.1476.1476 0 0 1-.0195-.1482c.0283-.0986.1224-.168.2288-.168l8.7149-.1123c1.0351-.0498 2.1597-.8691 2.5617-1.8965l.5098-1.3013c.0214-.0533.0214-.1123 0-.1656a4.9013 4.9013 0 0 0-.8467-1.8203c-1.6553-2.0606-4.4424-2.7207-6.8516-1.6211a5.1096 5.1096 0 0 0-2.4199 2.0166c-.6279-.4766-1.4029-.7354-2.1984-.7354-2.0205 0-3.6601 1.6396-3.6601 3.6601 0 .1992.0176.3984.0537.5928-.0107 0-.0215-.0049-.0322-.0049a3.3937 3.3937 0 0 0-3.3916 3.3916c0 .1553.0127.3154.0342.4756.0381.2197.2314.3818.4511.3818h15.5254a.3565.3565 0 0 0 .3467-.2803l.2032-.6962zm2.7813-3.4063l-.1709.0049c-.0127 0-.0244.0068-.0361.0068a.1392.1392 0 0 0-.1182.0996l-.3584 1.2295c-.1534.5273-.0879.9844.1465 1.3193.2246.3164.6055.499 1.0625.5205l1.0898.1133c.0449.0039.0898.0313.1201.0703.0303.0381.0381.0879.0254.1367-.0283.0986-.1221.168-.2285.168l-1.1475.1123c-1.0303.0498-2.1582.8691-2.5605 1.8975l-.1416.3613c-.0283.0703.0273.1416.1025.1416h6.5557c.1768 0 .335-.1201.3809-.2969a3.2093 3.2093 0 0 0 .0987-1.0312c-.0039-2.0284-1.6533-3.6815-3.6816-3.6865z" />
                                    </TechIcon>
                                </div>
                                <p className="text-white/40 text-sm hidden lg:block">
                                    {t("about_tech_note")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
