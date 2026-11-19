export type UserRole = 'customer' | 'partner';
export type ServiceCategoryId =
  | 'plumber' | 'electrician' | 'mason' | 'carpenter'
    | 'ac_repair' | 'cleaning' | 'painter' | 'driver'
      | 'cook' | 'tutor' | 'shifting' | 'other';

      export type BookingStatus =
        | 'pending' | 'accepted' | 'on_the_way'
          | 'in_progress' | 'completed' | 'cancelled';

          export interface ServiceCategory {
              id: ServiceCategoryId;
                name: string;
                  hindiTag: string;
                    description: string;
                      startingVisitFee: number;
                        isEmergencyEligible: boolean;
          }

          export interface ServiceItem {
              id: string;
                categoryId: ServiceCategoryId;
                  title: string;
                    description: string;
                      startingVisitFee: number;
                        estimatedDuration: string;
                          includes: string[];
          }

          export interface UploadedPhoto {
              id: string;
                name: string;
                  dataUrl: string;
                    sizeKb: number;
          }

          export interface GpsCoords {
              lat: number;
                lng: number;
          }

          export interface Booking {
              id: string;
                customerId: string;
                  customerName: string;
                    customerPhone: string;
                      categoryId: ServiceCategoryId;
                        serviceId?: string;
                          serviceTitle: string;
                            isCustomRequest: boolean;
                              customNeedSummary?: string;
                                isEmergency: boolean;
                                  problemDescription: string;
                                    photos: UploadedPhoto[];
                                      city: string;
                                        locality: string;
                                          pinCode?: string;
                                            fullAddress: string;
                                              gpsCoords?: GpsCoords | null;
                                                preferredDate: string;
                                                  preferredSlot: string;
                                                    estimatedAmount: number;
                                                      status: BookingStatus;
                                                        partnerId?: string;
                                                          partnerName?: string;
                                                            partnerPhone?: string;
                                                              createdAtMs: number;
          }

          export interface UserProfile {
              uid: string;
                role: UserRole;
                  name: string;
                    email: string;
                      phone: string;
                        defaultCity: string;
                          defaultLocality: string;
                            defaultPinCode?: string;
                              defaultAddress: string;
                                createdAtMs: number;
          }

          export interface PartnerProfile {
              uid: string;
                fullName: string;
                  phone: string;
                    city: string;
                      professions: ServiceCategoryId[];
                        serviceAreas: string[];
                          experienceYears: number;
                            bio: string;
                              isOnline: boolean;
                                isRegistered: boolean;
                                  createdAtMs: number;
          }
