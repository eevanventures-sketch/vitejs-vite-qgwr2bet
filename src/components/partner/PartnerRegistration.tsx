import React, { useState } from 'react';
import { Briefcase, Check, Loader2, MapPin } from 'lucide-react';
import type { PartnerProfile, ServiceCategoryId } from '../../types';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { BHOPAL_LOCALITIES } from '../../data/bhopalLocalities';

interface PartnerRegistrationProps {
      initialName?: string;
        initialPhone?: string;
          profile?: PartnerProfile | null;
            isEditMode?: boolean;
              onComplete: (data: Omit<PartnerProfile, 'uid' | 'isOnline' | 'isRegistered' | 'createdAtMs'>) => Promise<void>;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({
      initialName = '',
        initialPhone = '',
          profile,
            isEditMode = false,
              onComplete,
}) => {
      const [fullName, setFullName] = useState(profile?.fullName || initialName);
        const [phone, setPhone] = useState(profile?.phone || initialPhone);
          const [professions, setProfessions] = useState<ServiceCategoryId[]>(profile?.professions || []);
            const [serviceAreas, setServiceAreas] = useState<string[]>(profile?.serviceAreas || []);
              const [experienceYears, setExperienceYears] = useState(profile?.experienceYears ?? 2);
                const [bio, setBio] = useState(profile?.bio || '');
                  const [saving, setSaving] = useState(false);
                    const [error, setError] = useState<string | null>(null);

                      const toggleProfession = (id: ServiceCategoryId) => {
                            setProfessions((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
                      };

                        const toggleArea = (area: string) => {
                                setServiceAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]));
                        };

                          const handleSubmit = async (e: React.FormEvent) => {
                                e.preventDefault();
                                    setError(null);
                                        const cleanedPhone = phone.replace(/\D/g, '');
                                            if (fullName.trim().length < 3) return setError('Please enter your full name.');
                                                if (!/^[6-9]\d{9}$/.test(cleanedPhone)) return setError('Enter a valid 10-digit Indian mobile number.');
                                                    if (professions.length === 0) return setError('Select at least one service skill/profession.');
                                                        if (serviceAreas.length === 0) return setError('Select at least one Bhopal service area.');

                                                            setSaving(true);
                                                                try {
                                                                          await onComplete({
                                                                                    fullName: fullName.trim(),
                                                                                            phone: cleanedPhone,
                                                                                                    professions,
                                                                                                            serviceAreas,
                                                                                                                    experienceYears: Number(experienceYears) || 1,
                                                                                                                            bio: bio.trim(),
                                                                          });
                                                                } catch {
                                                                          setError('Could not save partner profile. Please check your connection.');
                                                                } finally {
                                                                          setSaving(false);
                                                                }
                          };

                            return (
                                    <div className="flex-1 flex flex-col bg-slate-50 pb-6 safe-top">
                                          {!isEditMode && (
                                                    <header className="bg-navy-800 text-white px-5 pt-6 pb-7 rounded-b-3xl">
                                                              <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold mb-1"><Briefcase className="w-4 h-4" />NEEDZO Partner Setup</div>
                                                                        <h1 className="text-xl font-bold">Complete Partner Profile</h1>
                                                                                  <p className="text-xs text-slate-300 mt-1">Select your skills & Bhopal areas to receive live job requests</p>
                                                                                          </header>
                                          )}

                                                <form onSubmit={(e) => void handleSubmit(e)} className="p-4 space-y-4">
                                                        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                  <h2 className="text-sm font-bold text-navy-800">Basic Details</h2>
                                                                            <div>
                                                                                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name / Business Name *</label>
                                                                                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Ramesh Vishwakarma" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                              </div>
                                                                                                                        <div>
                                                                                                                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact Number (+91) *</label>
                                                                                                                                                <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                          </div>
                                                                                                                                                                    <div>
                                                                                                                                                                                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Experience (Years)</label>
                                                                                                                                                                                            <input type="number" min={0} max={50} value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Short Work Summary</label>
                                                                                                                                                                                                                                        <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tools, specializations, languages..." className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                                                                                                                                                                                                                            <div><h2 className="text-sm font-bold text-navy-800">Select Your Professions *</h2><p className="text-[11px] text-slate-500">Choose one or more categories you serve</p></div>
                                                                                                                                                                                                                                                                                      <div className="flex flex-wrap gap-2">
                                                                                                                                                                                                                                                                                                  {SERVICE_CATEGORIES.map((cat) => {
                                                                                                                                                                                                                                                                                                                  const selected = professions.includes(cat.id);
                                                                                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                                                                                                    <button key={cat.id} type="button" onClick={() => toggleProfession(cat.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition flex items-center gap-1 ${selected ? 'bg-navy-800 text-white border-navy-800' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                                                                                                                                                                                                                                                                                                                                                      {selected && <Check className="w-3 h-3 text-teal-300" />}{cat.name}
                                                                                                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                  })}
                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                                                                                                                                                                                                                                                                                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal-600" /><div><h2 className="text-sm font-bold text-navy-800">Bhopal Service Areas *</h2><p className="text-[11px] text-slate-500">Select localities where you can travel for jobs</p></div></div>
                                                                                                                                                                                                                                                                                                                                                <div className="flex flex-wrap gap-2">
                                                                                                                                                                                                                                                                                                                                                            {BHOPAL_LOCALITIES.map((loc) => {
                                                                                                                                                                                                                                                                                                                                                                              const selected = serviceAreas.includes(loc.name);
                                                                                                                                                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                                                                                                                                                                <button key={loc.name} type="button" onClick={() => toggleArea(loc.name)} className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition ${selected ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>{loc.name}</button>
                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                            })}
                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                                                                      {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 font-medium">{error}</p>}
                                                                                                                                                                                                                                                                                                                                                                                              <button type="submit" disabled={saving} className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm flex items-center justify-center gap-2 disabled:opacity-60">
                                                                                                                                                                                                                                                                                                                                                                                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                                                                                                                                                                                                                                                                                                                                                                                                  {isEditMode ? 'Save Partner Details' : 'Save & Open Partner Dashboard'}
                                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                </form>
                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                            );
};
