import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Binder Design",
    description: "Design binding partners against a target structure.",
    colors: ["#0B8F70", "#FFFFFF"], // Green/White
  },
  {
    title: "De Novo Design",
    description: "Generate novel protein backbones from scratch.",
    colors: ["#2F80ED", "#EAF3FF"], // Blue
  },
  {
    title: "Motif Scaffolding",
    description: "Build around a functional structural motif.",
    colors: ["#684CDF", "#FFFFFF"], // Purple/White
  },
  {
    title: "Partial Diffusion",
    description: "Redesign selected regions of an input structure.",
    colors: ["#2F80ED", "#D0D5DD", "#EF4444"], // Blue/Gray with red highlight
  },
  {
    title: "Symmetric Design",
    description: "Generate symmetric oligomers and complexes.",
    colors: ["#0B8F70", "#2F80ED"], // Green/Blue symmetric
  }
];

// Reusable mini molecular SVG generator based on colors
const MiniMolecule = ({ colors }: { colors: string[] }) => {
  return (
    <svg viewBox="0 0 100 100" className="w-[90px] h-[90px] mx-auto drop-shadow-sm">
      <defs>
        {colors.map((color, i) => (
          <radialGradient key={i} id={`grad-${color.replace('#', '')}`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={color === "#FFFFFF" ? 1 : 0.4} />
            <stop offset="100%" stopColor={color === "#FFFFFF" ? "#E4E7EC" : color} />
          </radialGradient>
        ))}
      </defs>

      {/* Abstract structure tailored roughly by the number of colors provided */}
      {colors.length === 2 && (
        <g>
          <circle cx="45" cy="40" r="14" fill={`url(#grad-${colors[0].replace('#', '')})`} opacity="0.9" />
          <circle cx="35" cy="55" r="12" fill={`url(#grad-${colors[0].replace('#', '')})`} opacity="0.9" />
          <circle cx="65" cy="45" r="16" fill={`url(#grad-${colors[1].replace('#', '')})`} opacity="0.9" />
          <circle cx="55" cy="65" r="14" fill={`url(#grad-${colors[1].replace('#', '')})`} opacity="0.9" />
        </g>
      )}

      {colors.length === 3 && (
        <g>
          <circle cx="40" cy="50" r="16" fill={`url(#grad-${colors[1].replace('#', '')})`} opacity="0.9" />
          <circle cx="65" cy="45" r="14" fill={`url(#grad-${colors[0].replace('#', '')})`} opacity="0.9" />
          <circle cx="50" cy="30" r="10" fill={`url(#grad-${colors[2].replace('#', '')})`} opacity="0.9" />
          <circle cx="55" cy="65" r="12" fill={`url(#grad-${colors[1].replace('#', '')})`} opacity="0.9" />
        </g>
      )}
    </svg>
  );
};

export default function RFCapabilities() {
  return (
    <section id="capabilities" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] lg:text-[36px] font-[750] text-text-main mb-3 tracking-tight"
          >
            What Can You Design?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-text-soft"
          >
            RFdiffusion supports a wide range of protein design applications.
          </motion.p>
        </div>

        <div className="flex flex-row overflow-x-auto lg:overflow-visible gap-5 pb-4 lg:pb-0 hide-scrollbar snap-x">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 min-w-[200px] lg:min-w-0 bg-white border border-border-subtle rounded-[12px] p-5 snap-start transition-all duration-300 hover:border-border-color hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(16,24,40,0.04)]"
            >
              <div className="h-[110px] w-full flex items-center justify-center mb-4 bg-bg-alt/50 rounded-lg">
                <MiniMolecule colors={cap.colors} />
              </div>
              <h3 className="text-[15px] font-bold text-text-main mb-2 leading-tight">{cap.title}</h3>
              <p className="text-[13px] text-text-soft leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
