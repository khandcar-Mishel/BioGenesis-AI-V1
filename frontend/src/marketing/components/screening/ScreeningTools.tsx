import { Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const tableData = [
  {
    property: "Toxicity prediction",
    tool: "ToxinPred3",
    url: "https://webs.iiitd.edu.in/raghava/toxinpred3/",
    description: "Predicts toxic peptides using machine learning."
  },
  {
    property: "Allergenicity prediction",
    tool: "AllerCatPro",
    url: "https://allercatpro.bii.a-star.edu.sg/",
    description: "Predicts potential allergenic peptides."
  },
  {
    property: "Digestion prediction",
    tool: "RPG (PeptideCutter)",
    url: "https://gitlab.pasteur.fr/nmamelon/rpg",
    description: "Predicts proteolytic cleavage and digestion stability."
  },
  {
    property: "Antioxidant prediction",
    tool: "NEPC2",
    url: "https://nepc2pvmzy.us-east-1.awsapprunner.com",
    description: "Predicts antioxidant activity of peptides."
  },
  {
    property: "Stability prediction",
    tool: "PLIFEpred",
    url: "https://webs.iiitd.edu.in/raghava/plifepred",
    description: "Predicts peptide stability and half-life."
  },
  {
    property: "Aggregation propensity",
    tool: "DL_for_Peptide",
    url: "https://github.com/Zihan-Liu00/DL_for_Peptide",
    description: "Predicts aggregation-prone regions."
  },
  {
    property: "Solubility prediction",
    tool: "Innovagen Tools",
    url: "http://www.innovagen.com/proteomics-tools",
    description: "Predicts peptide solubility."
  },
  {
    property: "Physico-chemical properties",
    tool: "ProtParam",
    url: "https://web.expasy.org/protparam/",
    description: "Computes molecular weight, pI, charge, etc."
  },
  {
    property: "Cell-penetrating peptide",
    tool: "TriPep-CPP",
    url: "https://github.com/marurser/TriPep-CPP",
    description: "Predicts cell-penetrating peptides (CPPs)."
  },
  {
    property: "Comprehensive BAP database",
    tool: "BIOPEP-UWM",
    url: "https://biochemia.uwm.edu.pl/en/biopep-uwm-2/",
    description: "Database of bioactive peptides and functions."
  }
];

export default function ScreeningTools() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = tableData.filter(item =>
    item.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-screen-bg py-16">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

        {/* Header and Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <h2 className="text-[30px] sm:text-[36px] font-bold text-screen-navy mb-3 tracking-tight">
              Available Screening Tools
            </h2>
            <p className="text-[15px] sm:text-[16px] text-screen-text-secondary leading-[1.6]">
              A collection of trusted, widely-used bioinformatics tools to evaluate multiple properties of your designed peptides.
            </p>
          </div>

          <div className="relative w-full lg:w-[320px] shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-screen-text-muted" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-screen-border text-[14px] text-screen-navy rounded-[8px] py-2.5 pl-9 pr-4 focus:outline-none focus:border-screen-green focus:ring-1 focus:ring-screen-green transition-shadow placeholder:text-screen-text-muted"
              placeholder="Search tools or properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto rounded-[12px] border border-screen-border bg-white shadow-[0_2px_12px_rgba(16,35,63,0.02)]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-screen-surface-soft border-b border-screen-border">
                <th className="py-4 px-6 text-[13px] font-bold text-screen-navy uppercase tracking-wider w-[22%]">Property / Purpose</th>
                <th className="py-4 px-6 text-[13px] font-bold text-screen-navy uppercase tracking-wider w-[18%]">Tool Name</th>
                <th className="py-4 px-6 text-[13px] font-bold text-screen-navy uppercase tracking-wider w-[25%]">URL</th>
                <th className="py-4 px-6 text-[13px] font-bold text-screen-navy uppercase tracking-wider w-[35%]">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-screen-border/60 last:border-0 hover:bg-[#F9FCFC] transition-colors group"
                  >
                    <td className="py-4 px-6 text-[14px] font-medium text-screen-navy">
                      {row.property}
                    </td>
                    <td className="py-4 px-6 text-[14px] text-screen-text-secondary font-medium">
                      {row.tool}
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-screen-teal hover:text-screen-green transition-colors truncate max-w-[200px] lg:max-w-[250px]"
                        title={row.url}
                      >
                        {row.url.replace(/^https?:\/\/(www\.)?/, '')}
                        <ExternalLink size={12} className="shrink-0 opacity-70 group-hover:opacity-100" />
                      </a>
                    </td>
                    <td className="py-4 px-6 text-[14px] text-screen-text-secondary leading-[1.5]">
                      {row.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-[14px] text-screen-text-muted">
                    No tools found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
