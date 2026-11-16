import React from 'react';
import { ArrowRight, Calendar, MapPin, Phone } from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface PartnerJobsProps {
    bookings: Booking[];
      onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
}

const NEXT_STEP: Partial<Record<BookingStatus, { next: BookingStatus; label: string }>> = {
    accepted: { next: 'on_the_way', label: 'Mark On the Way' },
      on_the_way: { next: 'in_progress', label: 'Start Work' },
        in_progress: { next: 'completed', label: 'Mark Completed' },
};

export const PartnerJobs: React.FC<PartnerJobsProps> = ({ bookings, onUpdateStatus }) => {
    const partnerJobs = bookings.filter((b) => b.status !== 'pending');

      return (
            <div className="flex-1 flex flex-col pb-4 safe-top">
                  <header className="bg-navy-800 text-white px-4 py-4">
                          <h1 className="text-lg font-bold">My Jobs & Status</h1>
                                  <p className="text-xs text-slate-300">Update job progress from accepted to completed (Demo)</p>
                                        </header>

                                              <div className="p-4 space-y-3">
                                                      {partnerJobs.length === 0 ? (
                                                                  <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">Accept a request from the Dashboard tab to manage job steps here.</div>
                                                      ) : (
                                                                  partnerJobs.map((job) => {
                                                                                const action = NEXT_STEP[job.status];
                                                                                            return (
                                                                                                            <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                                                                                                                            <div className="flex items-start justify-between gap-2">
                                                                                                                                              <div><span className="text-[11px] font-bold text-slate-500">{job.id}</span><h3 className="text-sm font-bold text-navy-800">{job.serviceTitle}</h3></div>
                                                                                                                                                                <StatusBadge status={job.status} />
                                                                                                                                                                                </div>
                                                                                                                                                                                                <p className="text-xs text-slate-600">{job.problemDescription}</p>
                                                                                                                                                                                                                <div className="space-y-1 text-[11px] text-slate-600">
                                                                                                                                                                                                                                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" /><span>{job.locality} — {job.fullAddress}</span></div>
                                                                                                                                                                                                                                                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" /><span>{job.preferredDate} • {job.preferredSlot}</span></div>
                                                                                                                                                                                                                                                                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" /><span>Customer: {job.customerName} (+91 {job.customerPhone})</span></div>
                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                                                                                                                                                                                                                                                                                        <span className="text-xs font-extrabold text-navy-800">Est. ₹{job.estimatedAmount}</span>
                                                                                                                                                                                                                                                                                                                                          {action && (
                                                                                                                                                                                                                                                                                                                                                                <button type="button" onClick={() => onUpdateStatus(job.id, action.next)} className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white text-xs font-bold flex items-center gap-1.5">
                                                                                                                                                                                                                                                                                                                                                                                      {action.label}<ArrowRight className="w-3.5 h-3.5" />
                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                            );
                                                                  })
                                                      )}
                                                            </div>
                                                                </div>
      );
};
