import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Booking, CustomerProfile, UploadedPhoto } from '../../types';
import { BHOPAL_LOCALITIES } from '../../data/bhopalLocalities';
import { PhotoUploader } from '../common/PhotoUploader';
import { DemoBanner } from '../common/DemoBanner';

interface OtherServiceFlowProps {
    initialQuery?: string;
      selectedLocality: string;
        customerProfile: CustomerProfile;
          onBack: () => void;
            onSubmitCustomBooking: (data: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isDemo'>) => void;
}

const SUGGESTED_NEEDS = [
    'Water Tank Cleaning',
      'Pest Control / Termite',
        'Welder / Grill Gate Repair',
          'RO Water Purifier Service',
            'Gardener / Lawn Care',
              'Elderly Care Helper',
];

export const OtherServiceFlow: React.FC<OtherServiceFlowProps> = ({
    initialQuery = '',
      selectedLocality,
        customerProfile,
          onBack,
            onSubmitCustomBooking,
}) => {
    const todayStr = new Date().toISOString().split('T')[0];
      const [customNeedSummary, setCustomNeedSummary] = useState(initialQuery);
        const [problemDescription, setProblemDescription] = useState('');
          const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
            const [locality, setLocality] = useState(selectedLocality);
              const [fullAddress, setFullAddress] = useState(customerProfile.defaultAddress);
                const [preferredDate, setPreferredDate] = useState(todayStr);
                  const [preferredSlot, setPreferredSlot] = useState('10:00 AM - 12:00 PM');
                    const [isEmergency, setIsEmergency] = useState(false);
                      const [error, setError] = useState<string | null>(null);

                        const handleSubmit = (e: React.FormEvent) => {
                              e.preventDefault();
                                  setError(null);
                                      if (customNeedSummary.trim().length < 4) {
                                              setError('Please enter what service you need (at least 4 characters).');
                                                    return;
                                      }
                                          if (problemDescription.trim().length < 10) {
                                                  setError('Please add details about the requirement (at least 10 characters).');
                                                        return;
                                          }
                                              if (fullAddress.trim().length < 8) {
                                                      setError('Please provide your Bhopal address.');
                                                            return;
                                              }
                                                  onSubmitCustomBooking({
                                                          customerName: customerProfile.name,
                                                                customerPhone: customerProfile.phone,
                                                                      categoryId: 'other',
                                                                            serviceTitle: `Custom: ${customNeedSummary.trim()}`,
                                                                                  isCustomRequest: true,
                                                                                        customNeedSummary: customNeedSummary.trim(),
                                                                                              isEmergency,
                                                                                                    problemDescription: problemDescription.trim(),
                                                                                                          photos,
                                                                                                                locality,
                                                                                                                      fullAddress: fullAddress.trim(),
                                                                                                                            preferredDate,
                                                                                                                                  preferredSlot: isEmergency ? 'Urgent / Earliest Available' : preferredSlot,
                                                                                                                                        estimatedAmount: 199,
                                                  });
                        };

                          return (
                                <div className="flex-1 flex flex-col bg-slate-50 pb-6 safe-top">
                                      <header className="sticky top-0 z-20 bg-navy-800 text-white px-4 py-3.5 flex items-center gap-3 shadow-sm">
                                              <button type="button" onClick={onBack} aria-label="Go back" className="p-1.5 rounded-lg hover:bg-white/10">
                                                        <ArrowLeft className="w-5 h-5" />
                                                                </button>
                                                                        <div>
                                                                                  <h1 className="text-sm font-bold">Other Service Request</h1>
                                                                                            <p className="text-[11px] text-teal-300">Har Zaroorat Ka Solution • Bhopal</p>
                                                                                                    </div>
                                                                                                          </header>

                                                                                                                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                                                                                                        <DemoBanner compact message="Tell us any unlisted household or local help you need in Bhopal. Stored locally as a demo request." />
                                                                                                                                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                                                                                          <div className="flex items-center gap-1.5 text-xs font-bold text-navy-800"><Sparkles className="w-4 h-4 text-teal-600" />What Service Do You Need? *</div>
                                                                                                                                                    <input type="text" value={customNeedSummary} onChange={(e) => setCustomNeedSummary(e.target.value)} placeholder="e.g. Overhead water tank cleaning, gate welding..." className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600 focus:bg-white" />
                                                                                                                                                              <div className="flex flex-wrap gap-1.5">
                                                                                                                                                                          {SUGGESTED_NEEDS.map((tag) => (
                                                                                                                                                                                          <button key={tag} type="button" onClick={() => setCustomNeedSummary(tag)} className="text-[11px] px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">+ {tag}</button>
                                                                                                                                                                          ))}
                                                                                                                                                                                    </div>
                                                                                                                                                                                              <div>
                                                                                                                                                                                                          <label className="block text-xs font-semibold text-navy-800 mb-1">Detailed Requirement *</label>
                                                                                                                                                                                                                      <textarea rows={3} value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} placeholder="Share size, quantity, urgency, or tools needed..." className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:outline-none focus:border-teal-600 focus:bg-white" />
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                          <PhotoUploader photos={photos} onChange={setPhotos} />
                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                                                                                                                                                                                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-navy-800"><MapPin className="w-4 h-4 text-teal-600" />Bhopal Location & Schedule</div>
                                                                                                                                                                                                                                                                              <select value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal-600">
                                                                                                                                                                                                                                                                                          {BHOPAL_LOCALITIES.map((loc) => <option key={loc.name} value={loc.name}>{loc.name} ({loc.pinCode})</option>)}
                                                                                                                                                                                                                                                                                                    </select>
                                                                                                                                                                                                                                                                                                              <textarea rows={2} value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} placeholder="Full house/flat address in Bhopal" className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm focus:outline-none focus:border-teal-600 focus:bg-white" />
                                                                                                                                                                                                                                                                                                                        <div className="grid grid-cols-2 gap-2.5">
                                                                                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                                                                                                  <label className="block text-[11px] font-medium text-slate-600 mb-1"><Calendar className="w-3 h-3 inline mr-1" />Date</label>
                                                                                                                                                                                                                                                                                                                                                                <input type="date" min={todayStr} value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs" />
                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                                                                                                                                                                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Time Window</label>
                                                                                                                                                                                                                                                                                                                                                                                                                    <select value={preferredSlot} disabled={isEmergency} onChange={(e) => setPreferredSlot(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs disabled:opacity-50">
                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="08:00 AM - 10:00 AM">08 AM - 10 AM</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="10:00 AM - 12:00 PM">10 AM - 12 PM</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="12:00 PM - 02:00 PM">12 PM - 02 PM</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="02:00 PM - 04:00 PM">02 PM - 04 PM</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <option value="04:00 PM - 06:00 PM">04 PM - 06 PM</option>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </select>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <label className="flex items-center gap-2 text-xs text-navy-800 pt-1 cursor-pointer">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <input type="checkbox" checked={isEmergency} onChange={(e) => setIsEmergency(e.target.checked)} className="w-4 h-4 accent-rose-600" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Need this urgently (Emergency Priority Tag)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    {error && <p className="text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <button type="submit" className="w-full py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white text-sm font-bold shadow-sm transition">Submit Custom Request (Demo)</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                          );
};
