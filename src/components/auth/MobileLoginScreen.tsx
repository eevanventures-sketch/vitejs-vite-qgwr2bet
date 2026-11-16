import React, { useState } from 'react';
import { ArrowLeft, KeyRound, Lock, Phone } from 'lucide-react';
import { UserRole } from '../../types';
import { DemoBanner } from '../common/DemoBanner';

interface MobileLoginScreenProps {
    role: UserRole;
      onBack: () => void;
        onVerified: (phone: string) => void;
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({ role, onBack, onVerified }) => {
    const [phone, setPhone] = useState(role === 'customer' ? '9826000001' : '9826000099');
      const [otpSent, setOtpSent] = useState(false);
        const [otp, setOtp] = useState('');
          const [error, setError] = useState<string | null>(null);

            const handleSendOtp = (e: React.FormEvent) => {
                  e.preventDefault();
                      setError(null);
                          const cleaned = phone.replace(/\D/g, '');
                              if (!/^[6-9]\d{9}$/.test(cleaned)) {
                                      setError('Please enter a valid 10-digit Indian mobile number starting with 6-9.');
                                            return;
                              }
                                  setPhone(cleaned);
                                      setOtpSent(true);
                                          setOtp('1234');
            };

              const handleVerifyOtp = (e: React.FormEvent) => {
                    e.preventDefault();
                        setError(null);
                            if (!/^\d{4}$/.test(otp.trim())) {
                                    setError('Enter the 4-digit demo code (e.g. 1234).');
                                          return;
                            }
                                onVerified(phone);
              };

                return (
                      <div className="flex-1 flex flex-col bg-slate-50 safe-top">
                            <div className="bg-navy-800 text-white px-5 pt-5 pb-7 rounded-b-3xl">
                                    <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white mb-4">
                                              <ArrowLeft className="w-4 h-4" />Change Role
                                                      </button>
                                                              <span className="block text-[11px] font-semibold uppercase tracking-wider text-teal-300">
                                                                        {role === 'customer' ? 'Customer Login' : 'Service Partner Login'}
                                                                                </span>
                                                                                        <h1 className="text-2xl font-bold mt-1">Sign in with Mobile</h1>
                                                                                                <p className="text-xs text-slate-300 mt-1">NEEDZO • Bhopal, Madhya Pradesh</p>
                                                                                                      </div>

                                                                                                            <div className="flex-1 px-5 py-6 space-y-5">
                                                                                                                    <DemoBanner compact message="Demo Login UI: Real SMS OTP is not sent yet. Use any valid 10-digit number and 4-digit demo code (pre-filled 1234)." />
                                                                                                                            {!otpSent ? (
                                                                                                                                        <form onSubmit={handleSendOtp} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                                                                                                                                    <div>
                                                                                                                                                                  <label className="block text-xs font-semibold text-navy-800 mb-1.5">Mobile Number (India)</label>
                                                                                                                                                                                <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 overflow-hidden">
                                                                                                                                                                                                <span className="px-3 py-3 text-sm font-semibold text-navy-800 bg-slate-100 border-r border-slate-200">+91</span>
                                                                                                                                                                                                                <input type="tel" inputMode="numeric" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="Enter 10-digit number" className="flex-1 px-3 py-3 text-sm bg-transparent focus:outline-none" />
                                                                                                                                                                                                                                <Phone className="w-4 h-4 text-slate-400 mr-3" />
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
                                                                                                                                                                                                                                                                                  <button type="submit" className="w-full py-3.5 rounded-xl bg-navy-800 text-white text-sm font-semibold">Continue with Demo OTP</button>
                                                                                                                                                                                                                                                                                            </form>
                                                                                                                            ) : (
                                                                                                                                        <form onSubmit={handleVerifyOtp} className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                                                                                                                                    <div className="flex items-center justify-between">
                                                                                                                                                                  <div><p className="text-xs text-slate-500">Verifying Demo Session for</p><p className="text-sm font-bold text-navy-800">+91 {phone}</p></div>
                                                                                                                                                                                <button type="button" onClick={() => { setOtpSent(false); setError(null); }} className="text-xs font-semibold text-teal-600">Edit</button>
                                                                                                                                                                                            </div>
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                      <label className="block text-xs font-semibold text-navy-800 mb-1.5">Enter 4-Digit Demo Verification Code</label>
                                                                                                                                                                                                                                    <div className="relative">
                                                                                                                                                                                                                                                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                                                                                                                                                                                                                                    <input type="text" inputMode="numeric" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="1234" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-base tracking-[0.4em] font-bold text-navy-800 focus:outline-none" />
                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                          {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
                                                                                                                                                                                                                                                                                                                      <button type="submit" className="w-full py-3.5 rounded-xl bg-teal-600 text-white text-sm font-semibold flex items-center justify-center gap-2">
                                                                                                                                                                                                                                                                                                                                    <Lock className="w-4 h-4" />Enter {role === 'customer' ? 'Customer App' : 'Partner App'}
                                                                                                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                                                                                                          </form>
                                                                                                                            )}
                                                                                                                                  </div>
                                                                                                                                      </div>
                );
};
