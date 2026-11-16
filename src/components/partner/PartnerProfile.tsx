import React, { useState } from 'react';
import { Briefcase, LogOut, Phone, RotateCcw, Star, User } from 'lucide-react';
import { PartnerProfile as PartnerProfileType } from '../../types';
import { PartnerRegistration } from './PartnerRegistration';

interface PartnerProfileProps {
    profile: PartnerProfileType;
      onSaveProfile: (updates: Partial<PartnerProfileType>) => void;
        onSwitchToCustomer: () => void;
          onLogout: () => void;
            onResetDemo: () => void;
}

export const PartnerProfile: React.FC<PartnerProfileProps> = ({
    profile,
      onSaveProfile,
        onSwitchToCustomer,
          onLogout,
            onResetDemo,
}) => {
    const [editing, setEditing] = useState(false);

      if (editing) {
            return (
                    <div className="flex-1 flex flex-col">
                            <div className="bg-navy-800 text-white px-4 py-3.5 flex items-center justify-between safe-top">
                                      <h1 className="text-sm font-bold">Edit Partner Profile</h1>
                                                <button type="button" onClick={() => setEditing(false)} className="text-xs text-teal-300 font-semibold">Cancel</button>
                                                        </div>
                                                                <PartnerRegistration profile={profile} isEditMode onComplete={(updates) => { onSaveProfile(updates); setEditing(false); }} />
                                                                      </div>
            );
      }

        return (
              <div className="flex-1 flex flex-col pb-6 safe-top">
                    <header className="bg-navy-800 text-white px-4 pt-5 pb-6 rounded-b-3xl">
                            <div className="flex items-center gap-3.5">
                                      <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300"><Briefcase className="w-7 h-7" /></div>
                                                <div className="flex-1 min-w-0">
                                                            <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">Service Partner (Demo)</span>
                                                                        <h1 className="text-lg font-bold truncate">{profile.fullName}</h1>
                                                                                    <div className="flex items-center gap-3 text-xs text-slate-300 mt-0.5">
                                                                                                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 {profile.phone}</span>
                                                                                                                <span className="flex items-center gap-1 text-amber-300"><Star className="w-3 h-3 fill-amber-300" /> {profile.ratingDemo} (Demo)</span>
                                                                                                                            </div>
                                                                                                                                      </div>
                                                                                                                                              </div>
                                                                                                                                                    </header>

                                                                                                                                                          <div className="p-4 space-y-4">
                                                                                                                                                                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                                                                                                                                                                            <div className="flex items-center justify-between">
                                                                                                                                                                                        <h2 className="text-sm font-bold text-navy-800">Skills & Bhopal Coverage</h2>
                                                                                                                                                                                                    <button type="button" onClick={() => setEditing(true)} className="text-xs font-bold text-teal-600">Edit Details</button>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                        <p className="text-xs text-slate-600">{profile.bio}</p>
                                                                                                                                                                                                                                  <div>
                                                                                                                                                                                                                                              <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Registered Professions</p>
                                                                                                                                                                                                                                                          <div className="flex flex-wrap gap-1.5">
                                                                                                                                                                                                                                                                        {profile.professions.map((p) => <span key={p} className="px-2.5 py-1 rounded-full bg-navy-50 text-navy-800 text-[11px] font-semibold capitalize">{p.replace('_', ' ')}</span>)}
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                                                                                                                    <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Service Areas in Bhopal</p>
                                                                                                                                                                                                                                                                                                                                <div className="flex flex-wrap gap-1.5">
                                                                                                                                                                                                                                                                                                                                              {profile.serviceAreas.map((area) => <span key={area} className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-medium">{area}</span>)}
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                              <p className="text-[11px] text-slate-500 pt-1">Experience: <strong>{profile.experienceYears} years</strong></p>
                                                                                                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                                                                                                              <button type="button" onClick={onSwitchToCustomer} className="w-full p-4 rounded-2xl bg-navy-800 hover:bg-navy-700 text-white text-left flex items-center justify-between shadow-sm">
                                                                                                                                                                                                                                                                                                                                                                                                        <div><p className="text-sm font-bold">Switch to Customer Mode</p><p className="text-[11px] text-slate-300">Browse Bhopal services & create a test booking</p></div>
                                                                                                                                                                                                                                                                                                                                                                                                                  <User className="w-5 h-5 text-teal-300 shrink-0" />
                                                                                                                                                                                                                                                                                                                                                                                                                          </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                  <div className="flex gap-2">
                                                                                                                                                                                                                                                                                                                                                                                                                                            <button type="button" onClick={onResetDemo} className="flex-1 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" />Reset Demo</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button type="button" onClick={onLogout} className="flex-1 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1.5"><LogOut className="w-3.5 h-3.5" />Sign Out</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
        );
};
