import React from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import type { Booking } from '../../types';

export const PartnerEarnings: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
      const completedJobs = bookings.filter((b) => b.status === 'completed');
        const totalEarnings = completedJobs.reduce((sum, b) => sum + b.estimatedAmount, 0);
          const pendingValue = bookings
              .filter((b) => ['accepted', 'on_the_way', 'in_progress'].includes(b.status))
                  .reduce((sum, b) => sum + b.estimatedAmount, 0);

                    return (
                            <div className="flex-1 flex flex-col pb-4 safe-top">
                                  <header className="bg-navy-800 text-white px-4 py-4">
                                          <h1 className="text-lg font-bold">Earnings</h1>
                                                  <p className="text-xs text-slate-300">Visit charges recorded from completed jobs</p>
                                                        </header>

                                                              <div className="p-4 space-y-4">
                                                                      <div className="rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-white p-5 space-y-4 shadow-md">
                                                                                <div>
                                                                                            <p className="text-xs text-teal-300 font-semibold">Completed Jobs Visit Total</p>
                                                                                                        <div className="flex items-center gap-1 text-3xl font-extrabold mt-1"><IndianRupee className="w-7 h-7 text-teal-400" /><span>{totalEarnings}</span></div>
                                                                                                                  </div>
                                                                                                                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                                                                                                                                        <div><p className="text-[11px] text-slate-300">Completed Jobs</p><p className="text-base font-bold">{completedJobs.length}</p></div>
                                                                                                                                                    <div><p className="text-[11px] text-slate-300">Active Pipeline</p><p className="text-base font-bold text-teal-300">₹{pendingValue}</p></div>
                                                                                                                                                              </div>
                                                                                                                                                                      </div>

                                                                                                                                                                              <p className="text-[11px] text-slate-500 px-1">Note: Customers pay Cash or UPI directly upon completion. Totals above summarize base visit fees of completed bookings.</p>

                                                                                                                                                                                      <section className="space-y-2.5">
                                                                                                                                                                                                <div className="flex items-center gap-1.5 text-sm font-bold text-navy-800"><TrendingUp className="w-4 h-4 text-teal-600" />Completed Job History</div>
                                                                                                                                                                                                          {completedJobs.length === 0 ? (
                                                                                                                                                                                                                        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center text-xs text-slate-500">No completed jobs yet.</div>
                                                                                                                                                                                                          ) : (
                                                                                                                                                                                                                        completedJobs.map((job) => (
                                                                                                                                                                                                                                          <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between">
                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                            <p className="text-sm font-bold text-navy-800">{job.serviceTitle}</p>
                                                                                                                                                                                                                                                                                              <p className="text-[11px] text-slate-500">#{job.id.slice(0, 8).toUpperCase()} • {job.locality} • {job.preferredDate}</p>
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
