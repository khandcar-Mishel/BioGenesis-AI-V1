import { ShieldCheck, Link2, Network, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

export default function MDApplications() {
  const applications = [
    {
      icon: <ShieldCheck size={20} strokeWidth={2} />,
      title: "Stability Assessment",
      description: "Evaluate structural stability of designed proteins and peptides."
    },
    {
      icon: <Link2 size={20} strokeWidth={2} />,
      title: "Binding Analysis",
      description: "Study interactions with targets, ligands, or membranes."
    },
    {
      icon: <Network size={20} strokeWidth={2} />,
      title: "Conformational Dynamics",
      description: "Explore functional motions and structural transitions."
    },
    {
      icon: <FlaskConical size={20} strokeWidth={2} />,
      title: "Pre-experimental Validation",
      description: "Provide computational evidence to support laboratory studies."
    }
  ];

  return (
    <section className="bg-md-bg py-16 lg:py-24 border-t border-md-border/50">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-10 lg:mb-14 max-w-[700px]">
          <h2 className="text-[30px] sm:text-[34px] font-[700] text-md-navy mb-3 tracking-tight">
            Applications
          </h2>
          <p className="text-[15px] sm:text-[16px] text-md-text leading-[1.6]">
            MD simulation can be applied to a wide range of research questions in protein and peptide design.
          </p>
        </div>

        {/* Cards Grid (Horizontal on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-md-border rounded-[12px] p-5 flex flex-row lg:flex-col items-start gap-4 lg:gap-5 transition-all hover:border-md-green/30 hover:shadow-sm group"
            >
              <div className="w-10 h-10 rounded-[8px] bg-md-mint-light flex items-center justify-center text-md-green shrink-0 transition-colors group-hover:bg-md-mint">
                {app.icon}
              </div>
              <div>
                  <h3 className="text-[15px] font-[600] text-md-navy mb-1.5 leading-tight">
                    {app.title}
                  </h3>
                  <p className="text-[13px] text-md-text leading-[1.5]">
                    {app.description}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
