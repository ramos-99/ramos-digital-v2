"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function WebProjects() {
    const t = useTranslations('web_projects');

    const projects = [
        {
            id: 1,
            title: t('project1_title'),
            desc: t('project1_desc'),
            tags: t('project1_tags').split(', '),
        },
        {
            id: 2,
            title: t('project2_title'),
            desc: t('project2_desc'),
            tags: t('project2_tags').split(', '),
        },
        {
            id: 3,
            title: t('project3_title'),
            desc: t('project3_desc'),
            tags: t('project3_tags').split(', '),
        }
    ];

    return (
        <section className="py-32 bg-black text-white px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-light mb-16 tracking-tight border-b border-white/10 pb-8"
                >
                    {t('title')}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: project.id * 0.1 }}
                            className="group relative border border-white/10 bg-white/5 p-8 rounded-lg hover:border-white/30 transition-colors duration-500 hover:bg-white/[0.08]"
                        >
                            <div className="mb-8 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-md group-hover:from-white/10 transition-colors duration-500 flex items-center justify-center overflow-hidden">
                                {/* Placeholder for project image/visual */}
                                <div className="w-16 h-16 border border-white/20 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-white/90 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-8 font-light leading-relaxed">{project.desc}</p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-white/10 text-white/50 group-hover:text-white/70 group-hover:border-white/20 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
