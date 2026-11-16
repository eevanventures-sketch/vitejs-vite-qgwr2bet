import React from 'react';
import { Calendar, CheckCircle2, ClipboardList, Home, MapPin } from 'lucide-react';
import { Booking } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface BookingConfirmationProps {
    booking: Booking;
      onGoHome: () => void;
        onViewBookings: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
    booking,
      onGoHome,
        onViewBookings,
}) => {
    return (
          <div className="flex-1 flex flex-col justify-between bg-slate-50 p-5 safe-top safe-bottom">
                <div className="space-y-5 pt-4">
                        <div className="text-center space-y-2">
                                  <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto"><CheckCircle2 className="w-9 h-9" /></div>
                                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">Demo Request Logged</span>
                                                      <h1 className="text-xl font-extrabold text-navy-800">Request Recorded Locally</h1>
                                                                <p className="text-xs text-slate-600 max-w-xs mx-auto">Your request is saved in this prototype and visible in Partner Mode. Real partner matching activates after backend setup.</p>
                                                                        </div>

                                                                                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                                                                                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                                                                                      <div><p className="text-[11px] text-slate-500">Booking Reference</p><p className="text-sm font-extrabold text-navy-800">{booking.id}</p></div>
                                                                                                                  <StatusBadge status={booking.status} />
                                                                                                                            </div>
                                                                                                                                      <div>
                                                                                                                                                  <p className="text-sm font-bold text-navy-800">{booking.serviceTitle}</p>
                                                                                                                                                              {booking.isEmergency && <span className="inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700">Emergency Priority</span>}
                                                                                                                                                                          <p className="text-xs text-slate-600 mt-1.5">{booking.problemDescription}</p>
                                                                                                                                                                                    </div>
                                                                                                                                                                                              <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                                                                                                                                                                                                          <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" /><span><strong>{booking.locality}:</strong> {booking.fullAddress}</span></div>
                                                                                                                                                                                                                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-600 shrink-0" /><span>{booking.preferredDate} • {booking.preferredSlot}</span></div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                          <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
                                                                                                                                                                                                                                                      <span className="text-slate-600">Est. Visit Fee (No Payment Taken)</span>
                                                                                                                                                                                                                                                                  <span className="font-bold text-navy-800">₹{booking.estimatedAmount}</span>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                                <div className="space-y-2.5 pt-4">
                                                                                                                                                                                                                                                                                                        <button type="button" onClick={onViewBookings} className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white text-sm font-bold flex items-center justify-center gap-2"><ClipboardList className="w-4 h-4" />View My Bookings</button>
                                                                                                                                                                                                                                                                                                                <button type="button" onClick={onGoHome} className="w-full py-3 rounded-xl bg-white border border-slate-300 text-navy-800 text-sm font-semibold flex items-center justify-center gap-2"><Home className="w-4 h-4" />Back to Home</button>
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                          </div>
    );
};
