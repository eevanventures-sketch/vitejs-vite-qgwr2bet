import React, { useState } from 'react';
import { Briefcase, Check, LogOut, MapPin, Phone, RotateCcw, User } from 'lucide-react';
import { CustomerProfile as CustomerProfileType } from '../../types';
import { BHOPAL_LOCALITIES } from '../../data/bhopalLocalities';
import { getPlatformCapabilityNotice } from '../../services/capacitor';

interface CustomerProfileProps {
    profile: CustomerProfileType;
      onSaveProfile: (updates: Partial<CustomerProfileType>) => void;
        onSwitchToPartner: () => void;
          onLogout: () => void;
            onResetDemo: () => void;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
    profile,
      onSaveProfile,
        onSwitchToPartner,
          onLogout,
            onResetDemo,
}) => {
    const [name, setName] = useState(profile.name);
      const [locality, setLocality] = useState(profile.defaultLocality);
        const [address, setAddress] = useState(profile.defaultAddress);
          const [savedNotice, setSavedNotice] = useState(false);

            const handleSave = (e: React.FormEvent) => {
                  e.preventDefault();
                      if (!name.trim()) return;
                          onSaveProfile({ name: name.trim(), defaultLocality: locality, defaultAddress: address.trim() });
                              setSavedNotice(true);
                                  setTimeout(() => setSavedNotice(false), 2500);
            };

              return (
                    <div className="flex-1 flex flex-col pb-6 safe-top">
                          <header className="bg-navy-800 text-white px-4 pt-5 pb-6 rounded-b-3xl">
                                  <div className="flex items-center gap-3.5">
                                            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300"><User className="w-7 h-7" /></div>
                                                      <div>
                                                                  <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">Customer Account (Demo)</span>
                                                                              <h1 className="text-lg font-bold">{profile.name}</h1>
                                                                                          <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> +91 {profile.phone}</p>
                                                                                                    </div>
                                                                                                            </div>
                                                                                                                  </header>

                                                                                                                        <div className="p-4 space-y-4">
                                                                                                                                <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                                                                                                                                          <h2 className="text-sm font-bold text-navy-800">Saved Bhopal Details</h2>
                                                                                                                                                    <div>
                                                                                                                                                                <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Name</label>
                                                                                                                                                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:border-teal-600" />
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
                                                                                                                                                                                                                                                                                                                  <button type="submit" className="w-full py-2.5 rounded-xl bg-navy-800 text-white text-xs font-bold flex items-center justify-center gap-1.5">
                                                                                                                                                                                                                                                                                                                              {savedNotice ? <><Check className="w-4 h-4 text-teal-300" /> Saved Locally</> : 'Update Profile'}
                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                </form>

                                                                                                                                                                                                                                                                                                                                                        <button type="button" onClick={onSwitchToPartner} className="w-full p-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-left flex items-center justify-between shadow-sm">
                                                                                                                                                                                                                                                                                                                                                                  <div>
                                                                                                                                                                                                                                                                                                                                                                              <p className="text-sm font-bold">Switch to Service Partner Mode</p>
                                                                                                                                                                                                                                                                                                                                                                                          <p className="text-[11px] text-teal-100">Preview partner registration, incoming Bhopal jobs & earnings</p>
                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                              <Briefcase className="w-5 h-5 shrink-0" />
                                                                                                                                                                                                                                                                                                                                                                                                                      </button>

                                                                                                                                                                                                                                                                                                                                                                                                                              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-2">
                                                                                                                                                                                                                                                                                                                                                                                                                                        <p className="text-[11px] text-slate-500">{getPlatformCapabilityNotice()}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  <div className="flex gap-2">
                                                                                                                                                                                                                                                                                                                                                                                                                                                              <button type="button" onClick={onResetDemo} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" />Reset Demo</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <button type="button" onClick={onLogout} className="flex-1 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5"><LogOut className="w-3.5 h-3.5" />Sign Out</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
              );
};
