import React, { createContext, useContext, useEffect, useState } from 'react';
import {
      createUserWithEmailAndPassword,
        onAuthStateChanged,
          signInWithEmailAndPassword,
            signInWithPopup,
              signOut,
                type User,
} from 'firebase/auth';
import {
      addDoc,
        collection,
          doc,
            getDoc,
              onSnapshot,
                query,
                  setDoc,
                    updateDoc,
                      where,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase';
import type {
      Booking,
        BookingStatus,
          PartnerProfile,
            UserProfile,
              UserRole,
} from '../types';

interface CompleteProfileInput {
      role: UserRole;
        name: string;
          phone: string;
            defaultLocality: string;
              defaultAddress: string;
}

interface AppContextValue {
      firebaseUser: User | null;
        authLoading: boolean;
          userProfile: UserProfile | null;
            partnerProfile: PartnerProfile | null;
              selectedLocality: string;
                bookings: Booking[];
                  setSelectedLocality: (loc: string) => void;
                    signInWithGoogle: () => Promise<void>;
                      signInWithEmail: (email: string, password: string) => Promise<void>;
                        signUpWithEmail: (email: string, password: string) => Promise<void>;
                          completeUserProfile: (data: CompleteProfileInput) => Promise<void>;
                            updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
                              savePartnerProfile: (data: Omit<PartnerProfile, 'uid' | 'isOnline' | 'isRegistered' | 'createdAtMs'>) => Promise<void>;
                                togglePartnerOnline: () => Promise<void>;
                                  createBooking: (input: Omit<Booking, 'id' | 'status' | 'createdAtMs'>) => Promise<Booking>;
                                    acceptBooking: (bookingId: string) => Promise<void>;
                                      updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
                                        signOutUser: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
        const [authLoading, setAuthLoading] = useState(true);
          const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
            const [partnerProfile, setPartnerProfile] = useState<PartnerProfile | null>(null);
              const [selectedLocality, setSelectedLocality] = useState('Arera Colony');
                const [bookings, setBookings] = useState<Booking[]>([]);

                  useEffect(() => {
                        if (!auth || !db) {
                                  setAuthLoading(false);
                                        return;
                        }
                            const firestore = db;
                                const unsub = onAuthStateChanged(auth, async (user) => {
                                          setFirebaseUser(user);
                                                if (!user) {
                                                            setUserProfile(null);
                                                                    setPartnerProfile(null);
                                                                            setBookings([]);
                                                                                    setAuthLoading(false);
                                                                                            return;
                                                }
                                                      try {
                                                                const userSnap = await getDoc(doc(firestore, 'users', user.uid));
                                                                        if (userSnap.exists()) {
                                                                                      const prof = userSnap.data() as UserProfile;
                                                                                                setUserProfile(prof);
                                                                                                          if (prof.defaultLocality) setSelectedLocality(prof.defaultLocality);
                                                                                                                    if (prof.role === 'partner') {
                                                                                                                                    const pSnap = await getDoc(doc(firestore, 'partners', user.uid));
                                                                                                                                                setPartnerProfile(pSnap.exists() ? (pSnap.data() as PartnerProfile) : null);
                                                                                                                    } else {
                                                                                                                                    setPartnerProfile(null);
                                                                                                                    }
                                                                        } else {
                                                                                      setUserProfile(null);
                                                                                                setPartnerProfile(null);
                                                                        }
                                                      } catch {
                                                                setUserProfile(null);
                                                      } finally {
                                                                setAuthLoading(false);
                                                      }
                                });
                                    return () => unsub();
                  }, []);

                    useEffect(() => {
                            if (!db || !firebaseUser || !userProfile) {
                                      setBookings([]);
                                            return;
                            }
                                const firestore = db;
                                    if (userProfile.role === 'customer') {
                                              const q = query(collection(firestore, 'bookings'), where('customerId', '==', firebaseUser.uid));
                                                    return onSnapshot(q, (snap) => {
                                                                const list = snap.docs
                                                                          .map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }))
                                                                                    .sort((a, b) => b.createdAtMs - a.createdAtMs);
                                                                                            setBookings(list);
                                                    });
                                    }

                                        let pendingList: Booking[] = [];
                                            let mineList: Booking[] = [];
                                                const syncMerged = () => {
                                                          const map = new Map<string, Booking>();
                                                                for (const b of pendingList) map.set(b.id, b);
                                                                      for (const b of mineList) map.set(b.id, b);
                                                                            const merged = Array.from(map.values()).sort((a, b) => {
                                                                                        if (a.isEmergency !== b.isEmergency) return a.isEmergency ? -1 : 1;
                                                                                                return b.createdAtMs - a.createdAtMs;
                                                                            });
                                                                                  setBookings(merged);
                                                };

                                                    const qPending = query(collection(firestore, 'bookings'), where('status', '==', 'pending'));
                                                        const qMine = query(collection(firestore, 'bookings'), where('partnerId', '==', firebaseUser.uid));

                                                            const unsub1 = onSnapshot(qPending, (snap) => {
                                                                      pendingList = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
                                                                            syncMerged();
                                                            });
                                                                const unsub2 = onSnapshot(qMine, (snap) => {
                                                                          mineList = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
                                                                                syncMerged();
                                                                });
                                                                    return () => {
                                                                              unsub1();
                                                                                    unsub2();
                                                                    };
                    }, [firebaseUser, userProfile]);

                      const signInWithGoogle = async () => {
                            if (!auth) throw new Error('Firebase is not configured.');
                                await signInWithPopup(auth, googleProvider);
                      };

                        const signInWithEmail = async (email: string, password: string) => {
                                if (!auth) throw new Error('Firebase is not configured.');
                                    await signInWithEmailAndPassword(auth, email, password);
                        };

                          const signUpWithEmail = async (email: string, password: string) => {
                                if (!auth) throw new Error('Firebase is not configured.');
                                    await createUserWithEmailAndPassword(auth, email, password);
                          };

                            const completeUserProfile = async (data: CompleteProfileInput) => {
                                    if (!db || !firebaseUser) throw new Error('Not signed in.');
                                        const profile: UserProfile = {
                                                  uid: firebaseUser.uid,
                                                        email: firebaseUser.email || '',
                                                              role: data.role,
                                                                    name: data.name,
                                                                          phone: data.phone,
                                                                                defaultLocality: data.defaultLocality,
                                                                                      defaultAddress: data.defaultAddress,
                                                                                            createdAtMs: Date.now(),
                                        };
                                            await setDoc(doc(db, 'users', firebaseUser.uid), profile);
                                                setUserProfile(profile);
                                                    setSelectedLocality(data.defaultLocality);
                            };

                              const updateUserProfile = async (updates: Partial<UserProfile>) => {
                                    if (!db || !firebaseUser || !userProfile) return;
                                        await updateDoc(doc(db, 'users', firebaseUser.uid), updates);
                                            setUserProfile({ ...userProfile, ...updates });
                              };

                                const savePartnerProfile = async (
                                        data: Omit<PartnerProfile, 'uid' | 'isOnline' | 'isRegistered' | 'createdAtMs'>
                                ) => {
                                        if (!db || !firebaseUser) throw new Error('Not signed in.');
                                            const next: PartnerProfile = {
                                                      uid: firebaseUser.uid,
                                                            ...data,
                                                                  isOnline: partnerProfile?.isOnline ?? true,
                                                                        isRegistered: true,
                                                                              createdAtMs: partnerProfile?.createdAtMs ?? Date.now(),
                                            };
                                                await setDoc(doc(db, 'partners', firebaseUser.uid), next, { merge: true });
                                                    setPartnerProfile(next);
                                };

                                  const togglePartnerOnline = async () => {
                                        if (!db || !firebaseUser || !partnerProfile) return;
                                            const nextVal = !partnerProfile.isOnline;
                                                await updateDoc(doc(db, 'partners', firebaseUser.uid), { isOnline: nextVal });
                                                    setPartnerProfile({ ...partnerProfile, isOnline: nextVal });
                                  };

                                    const createBooking = async (
                                            input: Omit<Booking, 'id' | 'status' | 'createdAtMs'>
                                    ): Promise<Booking> => {
                                            if (!db) throw new Error('Firestore not ready.');
                                                const payload = { ...input, status: 'pending' as BookingStatus, createdAtMs: Date.now() };
                                                    const docRef = await addDoc(collection(db, 'bookings'), payload);
                                                        return { id: docRef.id, ...payload };
                                    };

                                      const acceptBooking = async (bookingId: string) => {
                                            if (!db || !firebaseUser || !partnerProfile) return;
                                                await updateDoc(doc(db, 'bookings', bookingId), {
                                                          status: 'accepted',
                                                                partnerId: firebaseUser.uid,
                                                                      partnerName: partnerProfile.fullName,
                                                                            partnerPhone: partnerProfile.phone,
                                                });
                                      };

                                        const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
                                                if (!db) return;
                                                    await updateDoc(doc(db, 'bookings', bookingId), { status });
                                        };

                                          const signOutUser = async () => {
                                                if (auth) await signOut(auth);
                                          };

                                            return (
                                                    <AppContext.Provider
                                                          value={{
                                                                    firebaseUser,
                                                                            authLoading,
                                                                                    userProfile,
                                                                                            partnerProfile,
                                                                                                    selectedLocality,
                                                                                                            bookings,
                                                                                                                    setSelectedLocality,
                                                                                                                            signInWithGoogle,
                                                                                                                                    signInWithEmail,
                                                                                                                                            signUpWithEmail,
                                                                                                                                                    completeUserProfile,
                                                                                                                                                            updateUserProfile,
                                                                                                                                                                    savePartnerProfile,
                                                                                                                                                                            togglePartnerOnline,
                                                                                                                                                                                    createBooking,
                                                                                                                                                                                            acceptBooking,
                                                                                                                                                                                                    updateBookingStatus,
                                                                                                                                                                                                            signOutUser,
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
