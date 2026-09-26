import { motion } from 'framer-motion';
import { Target, Eye, UsersRound } from 'lucide-react';

export default function AboutValues() {
  const cards = [
    {
      icon: <Target size={24} strokeWidth={2} className="text-about-green" />,
      title: "Our Mission",
      description: "To empower researchers and students with accessible computational tools for protein and peptide design."
    },
    {
      icon: <Eye size={24} strokeWidth={2} className="text-about-green" />,
      title: "Our Vision",
      description: "A future where AI-driven protein design accelerates the discovery of safer and more effective therapeutics."
    },
    {
      icon: <UsersRound size={24} strokeWidth={2} className="text-about-green" />,
      title: "Our Values",
      description: "Science, collaboration, open access, and a passion for solving real biological problems."
    }
  ];

  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-about-border rounded-[12px] p-8 shadow-sm hover:shadow-md transition-all duration-250 ease-out hover:-translate-y-[3px]"
            >
              <div className="w-[50px] h-[50px] rounded-[10px] bg-about-cyan flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-[18px] font-bold text-about-navy-head mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] text-about-text leading-[1.6]">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
