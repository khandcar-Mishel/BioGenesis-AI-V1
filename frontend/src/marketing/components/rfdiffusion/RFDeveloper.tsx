import { Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RFDeveloper() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-pale-mint rounded-2xl p-8 lg:p-12 border border-bio-green-light/50 flex flex-col lg:flex-row gap-10 items-start lg:items-center"
        >

          {/* LEFT: Portrait and Bio */}
          <div className="flex flex-col sm:flex-row items-start gap-8 flex-1">
            {/* David Baker portrait */}
            <div className="w-[120px] h-[140px] rounded-[12px] overflow-hidden bg-bio-deep shrink-0 relative flex items-end justify-center shadow-md">
              <img src="/BakerDavid.jpg" alt="David Baker" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-[24px] lg:text-[28px] font-bold text-text-main mb-1 tracking-tight">
                Developed by David Baker
              </h2>
              <p className="text-[15px] font-semibold text-text-main mb-1">
                David Baker, Ph.D.
              </p>
              <p className="text-[13px] text-text-soft mb-4">
                University of Washington
              </p>

              <p className="text-[14px] text-text-soft leading-relaxed max-w-[400px] mb-5">
                RFdiffusion was developed by Dr. David Baker and colleagues as part of a broader effort to enable de novo protein design using deep learning and generative protein design models.
              </p>

              <a
                href="https://www.nature.com/articles/s41586-023-06415-8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[14px] font-semibold text-bio-green hover:text-bio-green-dark transition-colors self-start"
              >
                Read the original paper <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT: Quote */}
          <div className="flex-1 lg:max-w-[400px] bg-white rounded-[12px] p-6 lg:p-8 border border-border-subtle shadow-sm relative">
            <Quote size={28} className="text-bio-green-light fill-bio-green-light absolute top-6 left-6 -z-0 opacity-50" />

            <div className="relative z-10">
              <p className="text-[15px] lg:text-[17px] font-medium text-text-main italic leading-[1.6] mb-4">
                "The goal is not just to predict protein structures, but to create new proteins with desired functions."
              </p>
              <p className="text-[14px] font-bold text-text-main mb-5">
                — David Baker
              </p>

              <div className="w-8 h-[1px] bg-border-subtle mb-4" />
              <p className="text-[11px] text-text-muted-light leading-[1.5]">
                Watson et al. (2022). RFdiffusion: a generative model for de novo protein design.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
