export type UserRole = 'customer' | 'partner';
export type ServiceCategoryId =
  | 'plumber' | 'electrician' | 'mason' | 'carpenter'
    | 'ac_repair' | 'cleaning' | 'painter' | 'driver'
      | 'cook' | 'tutor' | 'shifting' | 'other';

      export type BookingStatus =
        | 'pending' | 'accepted' | 'on_the_way'
          | 'in_progress' | 'completed' | 'cancelled';

          export type PaymentStatus = 'unpaid' | 'paid';
          export type PaymentMethod = 'upi' | 'cash';

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

          export interface ExtraChargeItem {
              id: string;
                label: string;
                  amount: number;
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
                                                      couponCode?: string;
                                                        discountAmount?: number;
                                                          status: BookingStatus;
                                                            startOtp?: string;
                                                              finalAmount?: number;
                                                                extraCharges?: ExtraChargeItem[];
                                                                  workNote?: string;
                                                                    paymentStatus?: PaymentStatus;
                                                                      paymentMethod?: PaymentMethod;
                                                                        paidAtMs?: number;
                                                                          transactionRef?: string;
                                                                            rating?: number;
                                                                              review?: string;
                                                                                ratedAtMs?: number;
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
                                  isVerified?: boolean;
                                    kycDocType?: string;
                                      kycDocUrl?: string;
                                        createdAtMs: number;
          }

          export interface AppSettings {
              supportPhone: string;
                whatsappNumber: string;
                  supportEmail: string;
                    upiId: string;
                      bannerNotice: string;
                        categoryRates?: Record<string, number>;
                          serviceRates?: Record<string, number>;
                            updatedAtMs?: number;
          }

          export interface AppFeedback {
              id: string;
                uid: string;
                  name: string;
                    email: string;
                      role: UserRole;
                        rating: number;
                          message: string;
                            createdAtMs: number;
          }

          export interface Coupon {
              id: string;
                code: string;
                  discountAmount: number;
                    minOrderAmount: number;
                      active: boolean;
                        description: string;
                          createdAtMs: number;
          }
