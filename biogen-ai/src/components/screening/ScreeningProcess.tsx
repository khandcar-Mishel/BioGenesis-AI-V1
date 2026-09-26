import { FileText, Settings2, ClipboardList, BarChart3, CheckCircle2, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    icon: <FileText size={24} strokeWidth={1.8} />,
    title: "Input Sequences",
    description: "Upload or paste peptide sequences from RFdiffusion."
  },
  {
    icon: <Settings2 size={24} strokeWidth={1.8} />,
    title: "Run Screening Tools",
    description: "Automatically analyze multiple properties."
  },
  {
    icon: <ClipboardList size={24} strokeWidth={1.8} />,
    title: "View Results",
    description: "See property predictions and detailed reports."
  },
  {
    icon: <BarChart3 size={24} strokeWidth={1.8} />,
    title: "Compare Candidates",
    description: "Rank and compare peptides based on key metrics."
  },
  {
    icon: <CheckCircle2 size={24} strokeWidth={1.8} />,
    title: "Select for Validation",
    description: "Choose the most promising candidates for further studies."
  }
];

export default function ScreeningProcess() {
  return (
    <section id="screening-process" className="bg-screen-bg py-16 lg:py-24 overflow-hidden scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-14 lg:mb-20 text-center max-w-[680px] mx-auto">
          <h2 className="text-[30px] sm:text-[36px] font-bold text-screen-navy mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-[15px] sm:text-[17px] text-screen-text-secondary leading-[1.6]">
            Input your designed peptide sequences and run a suite of predictive analyses to identify the best candidates.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center w-full lg:w-1/5 relative">
                
                <motion.div 
                  className="flex flex-col items-center text-center px-2 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="w-16 h-16 rounded-full bg-screen-green-light flex items-center justify-center text-screen-green mb-5 shrink-0 shadow-[0_4px_12px_rgba(7,155,120,0.1)] border border-[#c6efe5]">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-[15px] font-[650] text-screen-navy mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-[14px] text-screen-text-secondary leading-[1.5] max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrows */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Arrow */}
                    <div className="hidden lg:flex absolute top-8 -right-[15%] w-[30%] items-center justify-center text-screen-green/40 z-0">
                      <ArrowRight size={24} strokeWidth={1.5} />
                    </div>
                    {/* Mobile Arrow */}
                    <div className="flex lg:hidden mt-2 mb-8 text-screen-green/40">
                      <ArrowDown size={24} strokeWidth={1.5} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
