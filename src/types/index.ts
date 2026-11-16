export type UserRole = 'customer' | 'partner';
export type ServiceCategoryId = 'plumber' | 'electrician' | 'mason' | 'carpenter' | 'ac_repair' | 'cleaning' | 'painter' | 'driver' | 'cook' | 'tutor' | 'shifting' | 'other';
export type BookingStatus = 'pending' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';

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
            estimatedVisitFee: number;
              estimatedDuration: string;
                includes: string[];
                  isDemo: true;
}

export interface UploadedPhoto {
    id: string;
      name: string;
        previewUrl: string;
          sizeKb: number;
}

export interface Booking {
    id: string;
      isDemo: boolean;
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
                            locality: string;
                              fullAddress: string;
                                preferredDate: string;
                                  preferredSlot: string;
                                    estimatedAmount: number;
                                      status: BookingStatus;
                                        partnerId?: string;
                                          partnerName?: string;
                                            createdAt: string;
}

export interface CustomerProfile {
    name: string;
      phone: string;
        defaultLocality: string;
          defaultAddress: string;
}

export interface PartnerProfile {
    id: string;
      fullName: string;
        phone: string;
          professions: ServiceCategoryId[];
            serviceAreas: string[];
              experienceYears: number;
                bio: string;
                  isOnline: boolean;
                    isRegistered: boolean;
                      isDemo: boolean;
                        ratingDemo: number;
}

export interface AuthSession {
    isAuthenticated: boolean;
      role: UserRole | null;
        phone: string;
}
