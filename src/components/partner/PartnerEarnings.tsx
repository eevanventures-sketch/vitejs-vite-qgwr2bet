import React from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { Booking } from '../../types';
import { DemoBanner } from '../common/DemoBanner';

interface PartnerEarningsProps {
    bookings: Booking[];
}

export const PartnerEarnings: React.FC<PartnerEarningsProps> = ({ bookings }) => {
    const completedJobs = bookings.filter((b) => b.status === 'completed');
      const totalDemoEarnings = completedJobs.reduce((sum, b) => sum + b.estimatedAmount, 0);
        const pendingValue = bookings
            .filter((b) => ['accepted', 'on_the_way', 'in_progress'].includes(b.status))
                .reduce((sum, b) => sum + b.estimatedAmount, 0);

                  return (
                        <div className="flex-1 flex flex-col pb-4 safe-top">
                              <header className="bg-navy-800 text-white px-4 py-4">
                                      <h1 className="text-lg font-bold">Demo Earnings</h1>
                                              <p className="text-xs text-slate-300">Simulated ledger based on completed demo jobs</p>
                                                    </header>

                                                          <div className="p-4 space-y-4">
                                                                  <DemoBanner compact message="No real payouts or bank settlements occur in this prototype. Figures reflect completed demo jobs only." />
                                                                          <div className="rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-white p-5 space-y-4 shadow-md">
                                                                                    <div>
                                                                                                <p className="text-xs text-teal-300 font-semibold">Completed Demo Jobs Total</p>
                                                                                                            <div className="flex items-center gap-1 text-3xl font-extrabold mt-1"><IndianRupee className="w-7 h-7 text-teal-400" /><span>{totalDemoEarnings}</span></div>
                                                                                                                      </div>
                                                                                                                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                                                                                                                                            <div><p className="text-[11px] text-slate-300">Completed Jobs</p><p className="text-base font-bold">{completedJobs.length}</p></div>
                                                                                                                                                        <div><p className="text-[11px] text-slate-300">In-Pipeline Est.</p><p className="text-base font-bold text-teal-300">₹{pendingValue}</p></div>
                                                                                                                                                                  </div>
                                                                                                                                                                          </div>

                                                                                                                                                                                  <section className="space-y-2.5">
                                                                                                                                                                                            <div className="flex items-center gap-1.5 text-sm font-bold text-navy-800"><TrendingUp className="w-4 h-4 text-teal-600" />Completed Job Breakdown (Demo)</div>
                                                                                                                                                                                                      {completedJobs.length === 0 ? (
                                                                                                                                                                                                                    <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center text-xs text-slate-500">Complete a job in the Jobs tab to see it logged here.</div>
                                                                                                                                                                                                      ) : (
                                                                                                                                                                                                                    completedJobs.map((job) => (
                                                                                                                                                                                                                                    <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between">
                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                      <p className="text-sm font-bold text-navy-800">{job.serviceTitle}</p>
                                                                                                                                                                                                                                                                                        <p className="text-[11px] text-slate-500">{job.id} • {job.locality} • {job.preferredDate}</p>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                        <span className="text-sm font-extrabold text-emerald-700">+₹{job.estimatedAmount}</span>
                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                    ))
                                                                                                                                                                                                      )}
                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                        </div>
                  );
};
