import { motion } from 'motion/react';

export default function AboutStory() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] sm:text-[36px] font-[750] text-about-navy-head mb-6 tracking-tight">
            Our Story
          </h2>
          <p className="text-[16px] sm:text-[17px] text-about-text leading-[1.65] max-w-[900px]">
            BioGen AI started as a student-driven initiative with a simple idea — to make powerful computational tools for protein and peptide design more accessible, especially for the research and academic community. We believe that by combining the power of AI with biological insight, we can accelerate scientific discovery and contribute to a healthier future.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
