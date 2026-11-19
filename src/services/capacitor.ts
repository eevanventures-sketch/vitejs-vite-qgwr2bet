          import type { Booking } from '../types';

          export function isNativeAndroid(): boolean {
              const win = window as unknown as { Capacitor?: { getPlatform?: () => string } };
                return win.Capacitor?.getPlatform?.() === 'android';
          }

          export function getPlatformLabel(): string {
              return isNativeAndroid() ? 'NEEDZO Android App' : 'NEEDZO India Web App';
          }

          export async function shareNeedzoApp(): Promise<'shared' | 'copied'> {
              const url = 'https://needzo-bhopal.eevanventures.workers.dev';
                const text = 'NEEDZO – Har Zaroorat Ka Solution! Book trusted plumbers, electricians, AC repair, tutors, cooks & more across India:';
                  if (typeof navigator !== 'undefined' && navigator.share) {
                        try {
                                  await navigator.share({ title: 'NEEDZO', text, url });
                                        return 'shared';
                        } catch {
                                  // Fallback to clipboard
                        }
                  }
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            await navigator.clipboard.writeText(text + ' ' + url);
                    }
                      return 'copied';
          }

          export function getGoogleMapsUrl(booking: Booking): string {
              if (booking.gpsCoords) {
                    return `https://www.google.com/maps/dir/?api=1&destination=${booking.gpsCoords.lat},${booking.gpsCoords.lng}`;
              }
                const q = [booking.fullAddress, booking.locality, booking.city || 'Bhopal', booking.pinCode, 'India']
                    .filter(Boolean)
                        .join(', ');
                          return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
          }

          export function getWhatsAppUrl(phone: string, text: string): string {
              const digits = phone.replace(/\D/g, '');
                const full = digits.length === 10 ? `91${digits}` : digits;
                  return `https://wa.me/${full}?text=${encodeURIComponent(text)}`;
          }

          export function getUpiPayUrl(upiId: string, amount: number, bookingId: string): string {
              return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('NEEDZO Services')}&am=${amount}&cu=INR&tn=${encodeURIComponent(`NEEDZO-${bookingId.slice(0, 6)}`)}`;
          }

          export function isAdminEmail(email?: string | null): boolean {
              if (!email) return false;
                const norm = email.trim().toLowerCase();
                  const envAdmins = (import.meta.env.VITE_ADMIN_EMAILS || '')
                      .split(',')
                          .map((e: string) => e.trim().toLowerCase())
                              .filter(Boolean);
                                return envAdmins.includes(norm) || ['dev.rgu201@gmail.com', 'eevanventures@gmail.com'].includes(norm);
          }
