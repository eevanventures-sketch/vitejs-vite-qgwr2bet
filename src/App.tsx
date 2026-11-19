import React, { useState } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { auth, db } from './services/firebase';
import { AuthScreen } from './components/auth/AuthScreen';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { PartnerDashboard } from './components/partner/PartnerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppRouter: React.FC = () => {
      const { authLoading, firebaseUser, userProfile, isAdmin } = useApp();
        const [showAdmin, setShowAdmin] = useState(false);

          if (!auth || !db) {
                return (
                          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white">
                                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                                            <ShieldAlert className="w-6 h-6 text-amber-600" />
                                                    </div>
                                                            <h1 className="text-lg font-bold text-navy-800">Backend Configuration Needed</h1>
                                                                    <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                                                                              Add your <code className="font-semibold text-navy-800">VITE_FIREBASE_*</code> environment variables in
                                                                                        Cloudflare Build Settings and redeploy to activate live NEEDZO services.
                                                                                                </p>
                                                                                                      </div>
                );
          }

            if (authLoading) {
                    return (
                              <div className="flex-1 flex flex-col items-center justify-center bg-navy-800 text-white gap-3">
                                      <h1 className="text-2xl font-extrabold tracking-tight">
                                                NEED<span className="text-teal-400">ZO</span>
                                                        </h1>
                                                                <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
                                                                      </div>
                    );
            }

              if (!firebaseUser || !userProfile) {
                    return <AuthScreen />;
              }

                if (isAdmin && showAdmin) {
                        return <AdminDashboard onBack={() => setShowAdmin(false)} />;
                }

                  if (userProfile.role === 'partner') {
                        return <PartnerDashboard onOpenAdmin={isAdmin ? () => setShowAdmin(true) : undefined} />;
                  }

                    return <CustomerDashboard onOpenAdmin={isAdmin ? () => setShowAdmin(true) : undefined} />;
};

export const App: React.FC = () => {
      return (
            <div className="min-h-screen bg-slate-200 flex justify-center">
                  <div className="w-full max-w-[430px] min-h-screen bg-slate-50 flex flex-col shadow-2xl relative">
                          <AppProvider>
                                    <AppRouter />
                                            </AppProvider>
                                                  </div>
                                                      </div>
      );
};

export default App;
