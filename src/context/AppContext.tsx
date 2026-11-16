import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    AuthSession,
      Booking,
        BookingStatus,
          CustomerProfile,
            PartnerProfile,
              UserRole,
} from '../types';
import { DEMO_BOOKINGS } from '../data/demoBookings';

interface PersistedState {
    session: AuthSession;
      selectedLocality: string;
        customerProfile: CustomerProfile;
          partnerProfile: PartnerProfile;
            bookings: Booking[];
}

const STORAGE_KEY = 'needzo_bhopal_demo_v1';

const getInitialState = (): PersistedState => ({
    session: {
          isAuthenticated: false,
              role: null,
                  phone: '',
    },
      selectedLocality: 'Arera Colony',
        customerProfile: {
              name: 'Aarav Sharma (Demo)',
                  phone: '9826000001',
                      defaultLocality: 'Arera Colony',
                          defaultAddress: 'E-4/112, Near Bittan Market, Arera Colony, Bhopal',
        },
          partnerProfile: {
                id: 'PTR-DEMO-01',
                    fullName: 'Ramesh Vishwakarma (Demo)',
                        phone: '9826000099',
                            professions: ['plumber', 'electrician'],
                                serviceAreas: ['Arera Colony', 'MP Nagar', 'Shahpura', 'Kolar Road'],
                                    experienceYears: 6,
                                        bio: 'Experienced home technician serving South & Central Bhopal.',
                                            isOnline: true,
                                                isRegistered: false,
                                                    isDemo: true,
                                                        ratingDemo: 4.8,
          },
            bookings: DEMO_BOOKINGS,
});

interface AppContextValue {
    session: AuthSession;
      selectedLocality: string;
        customerProfile: CustomerProfile;
          partnerProfile: PartnerProfile;
            bookings: Booking[];
              selectRoleForLogin: (role: UserRole) => void;
                loginWithDemoOtp: (phone: string, role: UserRole) => void;
                  logout: () => void;
                    switchRoleDemo: (role: UserRole) => void;
                      setSelectedLocality: (locality: string) => void;
                        updateCustomerProfile: (updates: Partial<CustomerProfile>) => void;
                          savePartnerProfile: (updates: Partial<PartnerProfile>) => void;
                            togglePartnerOnline: () => void;
                              createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isDemo'>) => Booking;
                                updateBookingStatus: (bookingId: string, status: BookingStatus, assignPartner?: boolean) => void;
                                  resetDemoData: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<PersistedState>(() => {
          try {
                  const raw = localStorage.getItem(STORAGE_KEY);
                        if (!raw) return getInitialState();
                              const parsed = JSON.parse(raw) as PersistedState;
                                    return { ...getInitialState(), ...parsed };
          } catch {
                  return getInitialState();
          }
    });

      useEffect(() => {
            try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch {
                    // Ignore storage quota errors
            }
      }, [state]);

        const selectRoleForLogin = (role: UserRole) => {
              setState((prev) => ({
                      ...prev,
                            session: { ...prev.session, role },
              }));
        };

          const loginWithDemoOtp = (phone: string, role: UserRole) => {
                setState((prev) => ({
                        ...prev,
                              session: {
                                        isAuthenticated: true,
                                                role,
                                                        phone,
                              },
                                    customerProfile:
                                            role === 'customer'
                                                      ? { ...prev.customerProfile, phone }
                                                                : prev.customerProfile,
                                                                      partnerProfile:
                                                                              role === 'partner'
                                                                                        ? { ...prev.partnerProfile, phone }
                                                                                                  : prev.partnerProfile,
                }));
          };

            const logout = () => {
                  setState((prev) => ({
                          ...prev,
                                session: {
                                          isAuthenticated: false,
                                                  role: null,
                                                          phone: '',
                                },
                  }));
            };

              const switchRoleDemo = (role: UserRole) => {
                    setState((prev) => ({
                            ...prev,
                                  session: {
                                            ...prev.session,
                                                    isAuthenticated: true,
                                                            role,
                                  },
                    }));
              };

                const setSelectedLocality = (locality: string) => {
                      setState((prev) => ({
                              ...prev,
                                    selectedLocality: locality,
                                          customerProfile: {
                                                    ...prev.customerProfile,
                                                            defaultLocality: locality,
                                          },
                      }));
                };

                  const updateCustomerProfile = (updates: Partial<CustomerProfile>) => {
                        setState((prev) => ({
                                ...prev,
                                      customerProfile: { ...prev.customerProfile, ...updates },
                        }));
                  };

                    const savePartnerProfile = (updates: Partial<PartnerProfile>) => {
                          setState((prev) => ({
                                  ...prev,
                                        partnerProfile: {
                                                  ...prev.partnerProfile,
                                                          ...updates,
                                                                  isRegistered: true,
                                        },
                          }));
                    };

                      const togglePartnerOnline = () => {
                            setState((prev) => ({
                                    ...prev,
                                          partnerProfile: {
                                                    ...prev.partnerProfile,
                                                            isOnline: !prev.partnerProfile.isOnline,
                                          },
                            }));
                      };

                        const createBooking = (
                              input: Omit<Booking, 'id' | 'createdAt' | 'status' | 'isDemo'>
                        ): Booking => {
                              const randomCode = Math.floor(2000 + Math.random() * 7999);
                                  const newBooking: Booking = {
                                          ...input,
                                                id: `NDZ-DEMO-${randomCode}`,
                                                      createdAt: new Date().toISOString(),
                                                            status: 'pending',
                                                                  isDemo: true,
                                  };

                                      setState((prev) => ({
                                              ...prev,
                                                    bookings: [newBooking, ...prev.bookings],
                                      }));

                                          return newBooking;
                        };

                          const updateBookingStatus = (
                                bookingId: string,
                                    status: BookingStatus,
                                        assignPartner = false
                          ) => {
                                setState((prev) => ({
                                        ...prev,
                                              bookings: prev.bookings.map((b) => {
                                                        if (b.id !== bookingId) return b;
                                                                return {
                                                                            ...b,
                                                                                      status,
                                                                                                partnerId: assignPartner ? prev.partnerProfile.id : b.partnerId,
                                                                                                          partnerName: assignPartner ? prev.partnerProfile.fullName : b.partnerName,
                                                                };
                                              }),
                                }));
                          };

                            const resetDemoData = () => {
                                  const fresh = getInitialState();
                                      setState(fresh);
                                          localStorage.removeItem(STORAGE_KEY);
                            };

                              return (
                                    <AppContext.Provider
                                          value={{
                                                    session: state.session,
                                                            selectedLocality: state.selectedLocality,
                                                                    customerProfile: state.customerProfile,
                                                                            partnerProfile: state.partnerProfile,
                                                                                    bookings: state.bookings,
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
                                          }}
                                              >
                                                    {children}
                                                        </AppContext.Provider>
                              );
};

export function useApp(): AppContextValue {
    const ctx = useContext(AppContext);
      if (!ctx) throw new Error('useApp must be used inside AppProvider');
        return ctx;
}
