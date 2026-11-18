import React, { useState } from 'react';
import { Check, Loader2, LogOut, MapPin, Phone, User } from 'lucide-react';
import type { UserProfile } from '../../types';
import { BHOPAL_LOCALITIES } from '../../data/bhopalLocalities';
import { getPlatformLabel } from '../../services/capacitor';

interface CustomerProfileProps {
      profile: UserProfile;
        onSaveProfile: (updates: Partial<UserProfile>) => Promise<void>;
          onLogout: () => Promise<void>;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ profile, onSaveProfile, onLogout }) => {
      const [name, setName] = useState(profile.name);
        const [phone, setPhone] = useState(profile.phone);
          const [locality, setLocality] = useState(profile.defaultLocality);
            const [address, setAddress] = useState(profile.defaultAddress);
              const [saving, setSaving] = useState(false);
                const [savedNotice, setSavedNotice] = useState(false);

                  const handleSave = async (e: React.FormEvent) => {
                        e.preventDefault();
                            if (name.trim().length < 2 || !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) return;
                                setSaving(true);
                                    try {
                                              await onSaveProfile({
                                                        name: name.trim(),
                                                                phone: phone.replace(/\D/g, ''),
                                                                        defaultLocality: locality,
                                                                                defaultAddress: address.trim(),
                                              });
                                                    setSavedNotice(true);
                                                          setTimeout(() => setSavedNotice(false), 2500);
                                    } finally {
                                              setSaving(false);
                                    }
                  };

                    return (
                            <div className="flex-1 flex flex-col pb-6 safe-top">
                                  <header className="bg-navy-800 text-white px-4 pt-5 pb-6 rounded-b-3xl">
                                          <div className="flex items-center gap-3.5">
                                                    <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300"><User className="w-7 h-7" /></div>
                                                              <div className="min-w-0">
                                                                          <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">Customer Account</span>
                                                                                      <h1 className="text-lg font-bold truncate">{profile.name}</h1>
                                                                                                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> +91 {profile.phone}</p>
                                                                                                            </div>
                                                                                                                    </div>
                                                                                                                          </header>

                                                                                                                                <div className="p-4 space-y-4">
                                                                                                                                        <form onSubmit={(e) => void handleSave(e)} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                                                                                                                                                  <h2 className="text-sm font-bold text-navy-800">Saved Bhopal Details</h2>
                                                                                                                                                            <div>
                                                                                                                                                                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Name</label>
                                                                                                                                                                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                                                              </div>
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                    <label className="block text-[11px] font-medium text-slate-600 mb-1">Mobile Number (+91)</label>
                                                                                                                                                                                                                                <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                <label className="block text-[11px] font-medium text-slate-600 mb-1"><MapPin className="w-3 h-3 inline mr-1 text-teal-600" />Default Bhopal Locality</label>
                                                                                                                                                                                                                                                                            <select value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:border-teal-600">
                                                                                                                                                                                                                                                                                          {BHOPAL_LOCALITIES.map((loc) => <option key={loc.name} value={loc.name}>{loc.name}</option>)}
                                                                                                                                                                                                                                                                                                      </select>
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                                                                                      <label className="block text-[11px] font-medium text-slate-600 mb-1">Default Address</label>
                                                                                                                                                                                                                                                                                                                                                  <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-sm focus:outline-none focus:border-teal-600" />
                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                      <button type="submit" disabled={saving} className="w-full py-2.5 rounded-xl bg-navy-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-60">
                                                                                                                                                                                                                                                                                                                                                                                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : savedNotice ? <><Check className="w-4 h-4 text-teal-300" /> Profile Updated</> : 'Save Changes'}
                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                    </form>

                                                                                                                                                                                                                                                                                                                                                                                                            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                                                                                                                                                                                                                                                                                                                                                                                                                      <p className="text-[11px] text-slate-500">{getPlatformLabel()} • Live Cloud Sync Active</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                <button type="button" onClick={() => void onLogout()} className="w-full py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5">
                                                                                                                                                                                                                                                                                                                                                                                                                                            <LogOut className="w-4 h-4" />Sign Out
                                                                                                                                                                                                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                    );
};
