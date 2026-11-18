import React, { useState } from 'react';
import { Briefcase, ClipboardList, Home, IndianRupee, LayoutDashboard, Loader2, ShieldAlert, User } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { isFirebaseConfigured } from './services/firebase';
import type { Booking, GpsCoords, ServiceItem } from './types';
import { MobileShell } from './components/common/MobileShell';
import { BottomNav, type NavTabItem } from './components/common/BottomNav';
import { BhopalLocationModal } from './components/common/BhopalLocationModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { CustomerHome } from './components/customer/CustomerHome';
import { ServiceDetailBooking } from './components/customer/ServiceDetailBooking';
import { OtherServiceFlow } from './components/customer/OtherServiceFlow';
import { BookingConfirmation } from './components/customer/BookingConfirmation';
import { CustomerBookings } from './components/customer/CustomerBookings';
import { CustomerProfile } from './components/customer/CustomerProfile';
import { PartnerRegistration } from './components/partner/PartnerRegistration';
import { PartnerDashboard } from './components/partner/PartnerDashboard';
import { PartnerJobs } from './components/partner/PartnerJobs';
import { PartnerEarnings } from './components/partner/PartnerEarnings';
import { PartnerProfile } from './components/partner/PartnerProfile';

type CustomerTab = 'home' | 'bookings' | 'profile';
type PartnerTab = 'dashboard' | 'jobs' | 'earnings' | 'profile';

const MainApp: React.FC = () => {
      const {
            firebaseUser,
                authLoading,
                    userProfile,
                        partnerProfile,
                            selectedLocality,
                                bookings,
                                    setSelectedLocality,
                                        updateUserProfile,
                                            savePartnerProfile,
                                                togglePartnerOnline,
                                                    createBooking,
                                                        acceptBooking,
                                                            updateBookingStatus,
                                                                signOutUser,
      } = useApp();

        const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
          const [partnerTab, setPartnerTab] = useState<PartnerTab>('dashboard');
            const [locationModalOpen, setLocationModalOpen] = useState(false);
              const [gpsCoords, setGpsCoords] = useState<GpsCoords | null>(null);
                const [bookingTarget, setBookingTarget] = useState<{ service: ServiceItem; emergency: boolean } | null>(null);
                  const [otherFlowState, setOtherFlowState] = useState<{ open: boolean; initialQuery: string }>({ open: false, initialQuery: '' });
                    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

                      if (!isFirebaseConfigured()) {
                            return (
                                      <MobileShell>
                                              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-50">
                                                        <ShieldAlert className="w-12 h-12 text-amber-600" />
                                                                  <h1 className="text-lg font-bold text-navy-800">Backend Configuration Needed</h1>
                                                                            <p className="text-xs text-slate-600">Add your VITE_FIREBASE_* environment variables in Cloudflare Build Settings and redeploy to activate live NEEDZO services.</p>
                                                                                    </div>
                                                                                          </MobileShell>
                            );
                      }

                        if (authLoading) {
                                return (
                                          <MobileShell>
                                                  <div className="flex-1 flex flex-col items-center justify-center bg-navy-800 text-white space-y-3">
                                                            <h1 className="text-3xl font-extrabold tracking-tight">NEED<span className="text-teal-400">ZO</span></h1>
                                                                      <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
                                                                                <p className="text-xs text-slate-300">Connecting to Bhopal live services...</p>
                                                                                        </div>
                                                                                              </MobileShell>
                                );
                        }

                          if (!firebaseUser || !userProfile) {
                                return <MobileShell><AuthScreen /></MobileShell>;
                          }

                            if (userProfile.role === 'customer') {
                                    if (confirmedBooking) {
                                              return (
                                                        <MobileShell>
                                                                  <BookingConfirmation
                                                                              booking={confirmedBooking}
                                                                                          onGoHome={() => { setConfirmedBooking(null); setCustomerTab('home'); }}
                                                                                                      onViewBookings={() => { setConfirmedBooking(null); setCustomerTab('bookings'); }}
                                                                                                                />
                                                                                                                        </MobileShell>
                                              );
                                    }
                                        if (bookingTarget) {
                                                  return (
                                                            <MobileShell>
                                                                      <ServiceDetailBooking
                                                                                  service={bookingTarget.service}
                                                                                              initialEmergency={bookingTarget.emergency}
                                                                                                          selectedLocality={selectedLocality}
                                                                                                                      gpsCoords={gpsCoords}
                                                                                                                                  userProfile={userProfile}
                                                                                                                                              onBack={() => setBookingTarget(null)}
                                                                                                                                                          onSubmitBooking={async (data) => {
                                                                                                                                                                          const created = await createBooking(data);
                                                                                                                                                                                        setBookingTarget(null);
                                                                                                                                                                                                      setConfirmedBooking(created);
                                                                                                                                                          }}
                                                                                                                                                                    />
                                                                                                                                                                            </MobileShell>
                                                  );
                                        }
                                            if (otherFlowState.open) {
                                                      return (
                                                                <MobileShell>
                                                                          <OtherServiceFlow
                                                                                      initialQuery={otherFlowState.initialQuery}
                                                                                                  selectedLocality={selectedLocality}
                                                                                                              gpsCoords={gpsCoords}
                                                                                                                          userProfile={userProfile}
                                                                                                                                      onBack={() => setOtherFlowState({ open: false, initialQuery: '' })}
                                                                                                                                                  onSubmitCustomBooking={async (data) => {
                                                                                                                                                                  const created = await createBooking(data);
                                                                                                                                                                                setOtherFlowState({ open: false, initialQuery: '' });
                                                                                                                                                                                              setConfirmedBooking(created);
                                                                                                                                                  }}
                                                                                                                                                            />
                                                                                                                                                                    </MobileShell>
                                                      );
                                            }

                                                const activeCustomerCount = bookings.filter((b) => ['pending', 'accepted', 'on_the_way', 'in_progress'].includes(b.status)).length;
                                                    const customerTabs: NavTabItem<CustomerTab>[] = [
                                                              { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
                                                                    { id: 'bookings', label: 'Bookings', icon: <ClipboardList className="w-5 h-5" />, badgeCount: activeCustomerCount },
                                                                          { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                                                    ];

                                                        return (
                                                                  <MobileShell>
                                                                          {customerTab === 'home' && (
                                                                                      <CustomerHome
                                                                                                  selectedLocality={selectedLocality}
                                                                                                              onOpenLocationModal={() => setLocationModalOpen(true)}
                                                                                                                          onSelectService={(service, emergency = false) => setBookingTarget({ service, emergency })}
                                                                                                                                      onOpenOtherService={(initialQuery = '') => setOtherFlowState({ open: true, initialQuery })}
                                                                                                                                                />
                                                                          )}
                                                                                  {customerTab === 'bookings' && <CustomerBookings bookings={bookings} onUpdateStatus={updateBookingStatus} />}
                                                                                          {customerTab === 'profile' && <CustomerProfile profile={userProfile} onSaveProfile={updateUserProfile} onLogout={signOutUser} />}
                                                                                                  <BottomNav items={customerTabs} activeTab={customerTab} onChange={setCustomerTab} />
                                                                                                          <BhopalLocationModal
                                                                                                                    isOpen={locationModalOpen}
                                                                                                                              selectedLocality={selectedLocality}
                                                                                                                                        onSelect={(loc, coords) => {
                                                                                                                                                        setSelectedLocality(loc);
                                                                                                                                                                    if (coords !== undefined) setGpsCoords(coords);
                                                                                                                                        }}
                                                                                                                                                  onClose={() => setLocationModalOpen(false)}
                                                                                                                                                          />
                                                                                                                                                                </MobileShell>
                                                        );
                            }

                              if (!partnerProfile || !partnerProfile.isRegistered) {
                                    return (
                                              <MobileShell>
                                                      <PartnerRegistration initialName={userProfile.name} initialPhone={userProfile.phone} onComplete={savePartnerProfile} />
                                                            </MobileShell>
                                    );
                              }

                                const pendingCount = partnerProfile.isOnline ? bookings.filter((b) => b.status === 'pending').length : 0;
                                  const partnerTabs: NavTabItem<PartnerTab>[] = [
                                        { id: 'dashboard', label: 'Requests', icon: <LayoutDashboard className="w-5 h-5" />, badgeCount: pendingCount },
                                            { id: 'jobs', label: 'My Jobs', icon: <Briefcase className="w-5 h-5" /> },
                                                { id: 'earnings', label: 'Earnings', icon: <IndianRupee className="w-5 h-5" /> },
                                                    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
                                  ];

                                    return (
                                            <MobileShell>
                                                  {partnerTab === 'dashboard' && <PartnerDashboard partner={partnerProfile} bookings={bookings} onToggleOnline={togglePartnerOnline} onAcceptBooking={acceptBooking} />}
                                                        {partnerTab === 'jobs' && <PartnerJobs bookings={bookings} onUpdateStatus={updateBookingStatus} />}
                                                              {partnerTab === 'earnings' && <PartnerEarnings bookings={bookings} />}
                                                                    {partnerTab === 'profile' && <PartnerProfile profile={partnerProfile} onSaveProfile={savePartnerProfile} onLogout={signOutUser} />}
                                                                          <BottomNav items={partnerTabs} activeTab={partnerTab} onChange={setPartnerTab} />
                                                                              </MobileShell>
                                    );
};

export default function App() {
      return (
            <AppProvider>
                  <MainApp />
                      </AppProvider>
      );
}
