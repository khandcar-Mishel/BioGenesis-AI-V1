import React from 'react';
import { Database, Inbox } from 'lucide-react';

export default function RecentResultsCard() {
  return (
    <div className="bg-ws-card border border-ws-border rounded-[14px] p-3 sm:p-3.5 shadow-[0_1px_4px_rgba(16,24,40,0.03)] flex flex-col">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Database size={15} className="text-ws-primary" strokeWidth={2.5} />
          <h3 className="text-[13px] font-[700] text-ws-text">Recent results</h3>
        </div>
        <span className="text-[11px] text-ws-muted">0 designs</span>
      </div>

      <div className="flex items-center justify-center gap-3 py-2.5 px-3 bg-[#F8FAFC] border border-[#EEF1F4] rounded-[8px] text-center sm:text-left">
        <div className="w-[30px] h-[30px] rounded-[6px] bg-white border border-[#E2E8F0] flex items-center justify-center text-ws-muted shrink-0">
          <Inbox size={15} strokeWidth={1.75} />
        </div>
        <div className="flex flex-col">
          <span className="text-[12px] font-semibold text-ws-text leading-tight">No designs generated yet</span>
          <span className="text-[11px] text-ws-text-sec leading-snug">
            Generated structures and metrics will appear here.
          </span>
        </div>
      </div>

    </div>
  );
}

