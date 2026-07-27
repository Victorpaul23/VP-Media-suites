import React from 'react';

interface AuroraCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowIntensity?: 'subtle' | 'medium' | 'high';
  darkTheme?: boolean;
}

export const AuroraCard: React.FC<AuroraCardProps> = ({
  children,
  className = '',
  contentClassName = '',
  glowIntensity = 'medium',
  darkTheme = false,
}) => {
  const blurAmount =
    glowIntensity === 'high' ? 'blur-xl opacity-90' : glowIntensity === 'subtle' ? 'blur-md opacity-60' : 'blur-lg opacity-80';

  return (
    <div className={`relative group p-[2px] rounded-3xl overflow-hidden transition-all duration-300 ${className}`}>
      {/* Conic Gradient Aurora Rotating Element */}
      <div
        className={`absolute -inset-[150%] animate-aurora rounded-full bg-[conic-gradient(from_0deg,#2563eb,#06b6d4,#8b5cf6,#ec4899,#06b6d4,#2563eb)] ${blurAmount}`}
        style={{ transformOrigin: 'center center' }}
      />

      {/* Subtle outer ambient glow layer */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"
      />

      {/* Inner Content Card */}
      <div
        className={`relative z-10 w-full h-full rounded-[22px] ${
          darkTheme
            ? 'bg-slate-900/95 text-white border border-slate-800/80 shadow-2xl shadow-blue-950/40'
            : 'bg-white/95 text-slate-900 border border-slate-100/80 shadow-xl shadow-blue-500/5'
        } ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
