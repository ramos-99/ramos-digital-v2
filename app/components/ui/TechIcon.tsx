
export function TechIcon({
    color,
    name,
    children,
}: {
    color: string;
    name: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center gap-2 group/icon">
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center group-hover/icon:scale-110 transition-transform"
                style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}30`,
                    borderWidth: 1,
                }}
            >
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill={color}
                >
                    {children}
                </svg>
            </div>
            <span className="text-xs text-white/40">{name}</span>
        </div>
    );
}
