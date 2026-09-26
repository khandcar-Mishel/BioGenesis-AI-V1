import { Upload, Settings2, PlayCircle, ChartColumn, FileText, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MDHowItWorks() {
  const steps = [
    {
      num: 1,
      icon: <Upload size={26} strokeWidth={1.5} />,
      title: "Input Structure",
      description: "Upload a PDB file from RFdiffusion or other sources."
    },
    {
      num: 2,
      icon: <Settings2 size={26} strokeWidth={1.5} />,
      title: "Set Parameters",
      description: "Define simulation conditions (e.g., force field, time, solvent)."
    },
    {
      num: 3,
      icon: <PlayCircle size={26} strokeWidth={1.5} />,
      title: "Run Simulation",
      description: "Perform MD simulation on GPU infrastructure."
    },
    {
      num: 4,
      icon: <ChartColumn size={26} strokeWidth={1.5} />,
      title: "Analyze Results",
      description: "Visualize and analyze key metrics and structural changes."
    },
    {
      num: 5,
      icon: <FileText size={26} strokeWidth={1.5} />,
      title: "Download & Report",
      description: "Get trajectories, analysis plots, and summary reports."
    }
  ];

  return (
    <section id="md-how-it-works" className="bg-md-bg py-16 lg:py-24 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="mb-14 lg:mb-20 max-w-[700px]">
          <h2 className="text-[32px] sm:text-[36px] font-[700] text-md-navy mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-[15px] sm:text-[17px] text-md-text leading-[1.6]">
            Run molecular dynamics simulations on your designed structures with a simple, streamlined workflow.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center w-full lg:w-1/5 relative">

                <motion.div
                  className="flex flex-col items-center text-center px-2 w-full group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="flex items-center gap-3 lg:w-full lg:justify-center mb-5">
                      <div className="hidden lg:flex w-8 h-8 rounded-full bg-md-mint-light items-center justify-center text-md-green font-bold text-[14px]">
                          {step.num}
                      </div>
                      <div className="w-[60px] h-[60px] rounded-full bg-md-mint-light flex items-center justify-center text-md-green transition-transform group-hover:scale-105">
                        {step.icon}
                      </div>
                  </div>

                  <h3 className="text-[16px] font-[600] text-md-navy mb-2">
                    {step.title}
                  </h3>

                  <p className="text-[14px] text-md-text leading-[1.5] max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrows */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Arrow */}
                    <div className="hidden lg:flex absolute top-7 -right-[15%] w-[30%] items-center justify-center text-md-green/40 z-0">
                      <ArrowRight size={20} strokeWidth={1.5} />
                    </div>
                    {/* Mobile Arrow */}
                    <div className="flex lg:hidden mt-2 mb-6 text-md-green/40">
                      <ArrowDown size={20} strokeWidth={1.5} />
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
