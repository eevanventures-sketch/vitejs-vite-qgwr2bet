import React, { useState } from 'react';
import { Briefcase, ClipboardList, Home, IndianRupee, LayoutDashboard, User } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Booking, ServiceItem } from './types';
import { MobileShell } from './components/common/MobileShell';
import { BottomNav, NavTabItem } from './components/common/BottomNav';
import { BhopalLocationModal } from './components/common/BhopalLocationModal';
import { RoleSelectionScreen } from './components/auth/RoleSelectionScreen';
import { MobileLoginScreen } from './components/auth/MobileLoginScreen';
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
          session,
              selectedLocality,
                  customerProfile,
                      partnerProfile,
                          bookings,
                              selectRoleForLogin,
                                  loginWithDemoOtp,
                                      logout,
                                          switchRoleDemo,
                                              setSelectedLocality,
                                                  updateCustomerProfile,
                                                      savePartnerProfile,
                                                          togglePartnerOnline,
                                                              createBooking,
                                                                  updateBookingStatus,
                                                                      resetDemoData,
    } = useApp();

      const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
        const [partnerTab, setPartnerTab] = useState<PartnerTab>('dashboard');
          const [locationModalOpen, setLocationModalOpen] = useState(false);
            const [bookingTarget, setBookingTarget] = useState<{ service: ServiceItem; emergency: boolean } | null>(null);
              const [otherFlowState, setOtherFlowState] = useState<{ open: boolean; initialQuery: string }>({ open: false, initialQuery: '' });
                const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

                  const handleFullLogout = () => {
                        setBookingTarget(null);
                            setOtherFlowState({ open: false, initialQuery: '' });
                                setConfirmedBooking(null);
                                    logout();
                  };

                    if (!session.isAuthenticated) {
                          if (!session.role) {
                                  return <MobileShell><RoleSelectionScreen onSelectRole={selectRoleForLogin} /></MobileShell>;
                          }
                              return (
                                      <MobileShell>
                                              <MobileLoginScreen role={session.role} onBack={logout} onVerified={(phone) => loginWithDemoOtp(phone, session.role!)} />
                                                    </MobileShell>
                              );
                    }

                      if (session.role === 'customer') {
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
                                                                                                            customerProfile={customerProfile}
                                                                                                                        onBack={() => setBookingTarget(null)}
                                                                                                                                    onSubmitBooking={(data) => {
                                                                                                                                                    const created = createBooking(data);
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
                                                                                                    customerProfile={customerProfile}
                                                                                                                onBack={() => setOtherFlowState({ open: false, initialQuery: '' })}
                                                                                                                            onSubmitCustomBooking={(data) => {
                                                                                                                                            const created = createBooking(data);
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
                                                                        {customerTab === 'bookings' && (
                                                                                    <CustomerBookings bookings={bookings} onUpdateStatus={(id, status) => updateBookingStatus(id, status, false)} />
                                                                        )}
                                                                                {customerTab === 'profile' && (
                                                                                            <CustomerProfile
                                                                                                        profile={customerProfile}
                                                                                                                    onSaveProfile={updateCustomerProfile}
                                                                                                                                onSwitchToPartner={() => switchRoleDemo('partner')}
                                                                                                                                            onLogout={handleFullLogout}
                                                                                                                                                        onResetDemo={() => { resetDemoData(); setCustomerTab('home'); }}
                                                                                                                                                                  />
                                                                                )}
                                                                                        <BottomNav items={customerTabs} activeTab={customerTab} onChange={setCustomerTab} />
                                                                                                <BhopalLocationModal isOpen={locationModalOpen} selectedLocality={selectedLocality} onSelect={setSelectedLocality} onClose={() => setLocationModalOpen(false)} />
                                                                                                      </MobileShell>
                                                );
                      }

                        if (!partnerProfile.isRegistered) {
                              return <MobileShell><PartnerRegistration profile={partnerProfile} onComplete={(updates) => savePartnerProfile(updates)} /></MobileShell>;
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
                                          {partnerTab === 'dashboard' && <PartnerDashboard partner={partnerProfile} bookings={bookings} onToggleOnline={togglePartnerOnline} onActionBooking={updateBookingStatus} />}
                                                {partnerTab === 'jobs' && <PartnerJobs bookings={bookings} onUpdateStatus={(id, status) => updateBookingStatus(id, status, false)} />}
                                                      {partnerTab === 'earnings' && <PartnerEarnings bookings={bookings} />}
                                                            {partnerTab === 'profile' && (
                                                                      <PartnerProfile
                                                                                profile={partnerProfile}
                                                                                          onSaveProfile={savePartnerProfile}
                                                                                                    onSwitchToCustomer={() => switchRoleDemo('customer')}
                                                                                                              onLogout={handleFullLogout}
                                                                                                                        onResetDemo={() => { resetDemoData(); setPartnerTab('dashboard'); }}
                                                                                                                                />
                                                            )}
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
