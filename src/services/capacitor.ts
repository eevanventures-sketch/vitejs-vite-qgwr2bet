          import type { AppSettings, Booking } from '../types';

          export function isNativeAndroid(): boolean {
              const win = window as unknown as { Capacitor?: { getPlatform?: () => string } };
                return win.Capacitor?.getPlatform?.() === 'android';
          }

          export function getPlatformLabel(): string {
              return isNativeAndroid() ? 'NEEDZO Android App' : 'NEEDZO India Web App';
          }

          export async function nativeGoogleSignOut(): Promise<void> {
              try {
                    const win = window as unknown as {
                              Capacitor?: {
                                        Plugins?: { FirebaseAuthentication?: { signOut?: () => Promise<void> } };
                                                nativePromise?: (pluginId: string, methodName: string, options?: Record<string, unknown>) => Promise<unknown>;
                                                        toNative?: (
                                                                      pluginId: string,
                                                                                methodName: string,
                                                                                          options: Record<string, unknown>,
                                                                                                    callbacks: { resolve: (v: unknown) => void; reject: (e: unknown) => void }
                                                        ) => void;
                              };
                    };
                        const cap = win.Capacitor;
                            if (!cap) return;
                                if (cap.Plugins?.FirebaseAuthentication?.signOut) {
                                          await cap.Plugins.FirebaseAuthentication.signOut();
                                } else if (typeof cap.nativePromise === 'function') {
                                          await cap.nativePromise('FirebaseAuthentication', 'signOut', {});
                                } else if (typeof cap.toNative === 'function') {
                                          await new Promise((resolve) => {
                                                    cap.toNative!('FirebaseAuthentication', 'signOut', {}, { resolve, reject: resolve });
                                          });
                                }
              } catch {
                    // Ignore
              }
          }

          export async function nativeGoogleSignIn(): Promise<string> {
              const win = window as unknown as {
                    Capacitor?: {
                              Plugins?: {
                                        FirebaseAuthentication?: {
                                                      signInWithGoogle?: (opts?: Record<string, unknown>) => Promise<{ credential?: { idToken?: string | null } | null }>;
                                        };
                              };
                                    nativePromise?: (
                                                pluginId: string,
                                                        methodName: string,
                                                                options?: Record<string, unknown>
                                    ) => Promise<{ credential?: { idToken?: string | null } | null }>;
                                          toNative?: (
                                                    pluginId: string,
                                                            methodName: string,
                                                                    options: Record<string, unknown>,
                                                                            callbacks: { resolve: (v: unknown) => void; reject: (e: unknown) => void }
                                          ) => void;
                    };
              };
                const cap = win.Capacitor;
                  if (!cap) throw new Error('NO_CAPACITOR_OBJECT');

                    await nativeGoogleSignOut();

                      const opts = { useCredentialManager: false };
                        const direct = cap.Plugins?.FirebaseAuthentication;
                          let res: { credential?: { idToken?: string | null } | null } | undefined;

                            if (direct?.signInWithGoogle) {
                                    res = await direct.signInWithGoogle(opts);
                            } else if (typeof cap.nativePromise === 'function') {
                                    res = await cap.nativePromise('FirebaseAuthentication', 'signInWithGoogle', opts);
                            } else if (typeof cap.toNative === 'function') {
                                    res = await new Promise((resolve, reject) => {
                                              cap.toNative!('FirebaseAuthentication', 'signInWithGoogle', opts, {
                                                        resolve: (v) => resolve(v as { credential?: { idToken?: string | null } | null }),
                                                                reject,
                                              });
                                    });
                            } else {
                                    throw new Error('NO_BRIDGE:' + Object.keys(cap).join(','));
                            }

                              const idToken = res?.credential?.idToken;
                                if (!idToken) throw new Error('NO_ID_TOKEN');
                                  return idToken;
          }

          export async function shareNeedzoApp(): Promise<'shared' | 'copied'> {
              const url = 'https://needzo-bhopal.eevanventures.workers.dev';
                const text = 'NEEDZO – Har Zaroorat Ka Solution! Book trusted plumbers, electricians, AC repair, tutors, cooks & more across India:';
                  if (typeof navigator !== 'undefined' && navigator.share) {
                        try {
                                  await navigator.share({ title: 'NEEDZO', text, url });
                                        return 'shared';
                        } catch {
                                  // Fallback
                        }
                  }
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            await navigator.clipboard.writeText(text + ' ' + url);
                    }
                      return 'copied';
          }

          function safePdfText(val: string): string {
              return val
                  .replace(/₹/g, 'Rs. ')
                      .replace(/[^\x20-\x7E]/g, ' ')
                          .replace(/\\/g, '\\\\')
                              .replace(/\(/g, '\\(')
                                  .replace(/\)/g, '\\)')
                                      .trim();
          }

          export function generateReceiptPdfBlob(b: Booking, settings: AppSettings): Blob {
              const billAmt = b.finalAmount ?? b.estimatedAmount;
                const discount = b.discountAmount || 0;
                  const extras = (b.extraCharges || []).slice(0, 4);
                    const extraTotal = (b.extraCharges || []).reduce((s, item) => s + item.amount, 0);
                      const serviceAmt = Math.max(0, billAmt + discount - extraTotal);
                        const txnId = b.transactionRef || `NDZ${b.id.slice(0, 8).toUpperCase()}`;
                          const dateStr = new Date(b.paidAtMs || b.createdAtMs).toLocaleString('en-IN');
                            const payLabel = b.paymentStatus === 'paid' ? `PAID (${(b.paymentMethod || 'cash').toUpperCase()})` : 'PAYMENT DUE';

                              const lines: string[] = [
                                    '0.06 0.09 0.16 rg 0 735 595 107 re f',
                                        '0.08 0.72 0.65 rg 0 729 595 6 re f',
                                            'BT /F2 24 Tf 1 1 1 rg 40 792 Td (NEEDZO) Tj ET',
                                                'BT /F1 10 Tf 0.75 0.90 0.88 rg 40 772 Td (Har Zaroorat Ka Solution - Pan-India Home Services) Tj ET',
                                                    'BT /F2 13 Tf 1 1 1 rg 410 792 Td (TAX / SERVICE RECEIPT) Tj ET',
                                                        `BT /F1 10 Tf 0.85 0.90 0.95 rg 410 772 Td (Receipt: #${safePdfText(txnId)}) Tj ET`,
                                                            '0.95 0.97 0.98 rg 40 650 515 62 re f',
                                                                '0.06 0.09 0.16 rg',
                                                                    `BT /F2 12 Tf 55 688 Td (Status: ${safePdfText(payLabel)}) Tj ET`,
                                                                        `BT /F1 10 Tf 55 666 Td (Date & Time: ${safePdfText(dateStr)}) Tj ET`,
                                                                            `BT /F2 16 Tf 0.05 0.50 0.45 rg 425 676 Td (Rs. ${billAmt}) Tj ET`,
                                                                                '0.06 0.09 0.16 rg',
                                                                                    'BT /F2 11 Tf 40 618 Td (CUSTOMER DETAILS) Tj ET',
                                                                                        `BT /F1 10 Tf 40 600 Td (Name: ${safePdfText(b.customerName)}   |   Phone: +91 ${safePdfText(b.customerPhone)}) Tj ET`,
                                                                                            `BT /F1 10 Tf 40 584 Td (Address: ${safePdfText(`${b.fullAddress}, ${b.locality}, ${b.city}${b.pinCode ? ' - ' + b.pinCode : ''}`).slice(0, 88)}) Tj ET`,
                                                                                                'BT /F2 11 Tf 40 550 Td (SERVICE & PARTNER DETAILS) Tj ET',
                                                                                                    `BT /F1 10 Tf 40 532 Td (Service: ${safePdfText(b.serviceTitle)}) Tj ET`,
                                                                                                        `BT /F1 10 Tf 40 516 Td (Partner: ${safePdfText(b.partnerName || 'NEEDZO Partner')}   |   Slot: ${safePdfText(b.preferredDate + ' ' + b.preferredSlot)}) Tj ET`,
                                                                                                            b.workNote ? `BT /F1 10 Tf 40 500 Td (Work Note: ${safePdfText(b.workNote).slice(0, 82)}) Tj ET` : '',
                                                                                                                '0.92 0.94 0.96 rg 40 455 515 24 re f',
                                                                                                                    '0.06 0.09 0.16 rg',
                                                                                                                        'BT /F2 10 Tf 50 463 Td (DESCRIPTION) Tj ET',
                                                                                                                            'BT /F2 10 Tf 470 463 Td (AMOUNT) Tj ET',
                              ].filter(Boolean);

                                let rowY = 434;
                                  lines.push(`BT /F1 10 Tf 50 ${rowY} Td (${safePdfText(b.serviceTitle).slice(0, 56)}) Tj ET`);
                                    lines.push(`BT /F1 10 Tf 470 ${rowY} Td (Rs. ${serviceAmt}) Tj ET`);
                                      rowY -= 18;

                                        for (const ex of extras) {
                                                lines.push(`BT /F1 10 Tf 50 ${rowY} Td (Extra: ${safePdfText(ex.label).slice(0, 50)}) Tj ET`);
                                                    lines.push(`BT /F1 10 Tf 470 ${rowY} Td (Rs. ${ex.amount}) Tj ET`);
                                                        rowY -= 18;
                                        }

                                          if (discount > 0) {
                                                lines.push(`BT /F1 10 Tf 0.05 0.50 0.30 rg 50 ${rowY} Td (Promo Discount (${safePdfText(b.couponCode || 'COUPON')})) Tj ET`);
                                                    lines.push(`BT /F1 10 Tf 0.05 0.50 0.30 rg 470 ${rowY} Td (- Rs. ${discount}) Tj ET`);
                                                        rowY -= 18;
                                          }

                                            lines.push('0.06 0.09 0.16 rg');
                                              lines.push(`BT /F1 10 Tf 50 ${rowY} Td (Platform Convenience Fee) Tj ET`);
                                                lines.push(`BT /F1 10 Tf 470 ${rowY} Td (Rs. 0 (FREE)) Tj ET`);
                                                  rowY -= 14;

                                                    lines.push(`0.80 0.84 0.88 RG 40 ${rowY} m 555 ${rowY} l S`);
                                                      rowY -= 22;
                                                        lines.push(`BT /F2 13 Tf 50 ${rowY} Td (TOTAL AMOUNT) Tj ET`);
                                                          lines.push(`BT /F2 13 Tf 470 ${rowY} Td (Rs. ${billAmt}) Tj ET`);

                                                            lines.push(
                                                                    '0.94 0.98 0.97 rg 40 190 515 48 re f',
                                                                        '0.06 0.09 0.16 rg',
                                                                            'BT /F2 10 Tf 55 216 Td (7-Day Service Warranty on Labour - Verified NEEDZO Receipt) Tj ET',
                                                                                `BT /F1 9 Tf 55 200 Td (Helpline: ${safePdfText(settings.supportPhone)}   |   Email: ${safePdfText(settings.supportEmail)}) Tj ET`,
                                                                                    'BT /F1 9 Tf 150 50 Td (Thank you for choosing NEEDZO - https://needzo-bhopal.eevanventures.workers.dev) Tj ET'
                                                            );

                                                              const stream = lines.join('\n');
                                                                const objects = [
                                                                        '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
                                                                            '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
                                                                                '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
                                                                                    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
                                                                                        '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
                                                                                            `6 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
                                                                ];
                                                                  let pdf = '%PDF-1.4\n';
                                                                    const offsets: number[] = [];
                                                                      for (const obj of objects) {
                                                                            offsets.push(pdf.length);
                                                                                pdf += obj;
                                                                      }
                                                                        const xrefPos = pdf.length;
                                                                          pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
                                                                            for (const off of offsets) {
                                                                                    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
                                                                            }
                                                                              pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
                                                                                return new Blob([pdf], { type: 'application/pdf' });
          }

          export async function downloadOrShareReceiptPdf(b: Booking, settings: AppSettings, mode: 'download' | 'share'): Promise<'shared' | 'downloaded'> {
              const blob = generateReceiptPdfBlob(b, settings);
                const fileName = `NEEDZO-Receipt-${b.id.slice(0, 6).toUpperCase()}.pdf`;
                  const file = new File([blob], fileName, { type: 'application/pdf' });

                    if (mode === 'share' && typeof navigator !== 'undefined' && navigator.share) {
                            try {
                                      const canShareFiles = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
                                            if (canShareFiles) {
                                                        await navigator.share({ title: 'NEEDZO Payment Receipt', text: `NEEDZO Receipt #${b.id.slice(0, 6).toUpperCase()}`, files: [file] });
                                                                return 'shared';
                                            }
                            } catch {
                                      // Fallback
                            }
                    }

                      const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                          a.href = url;
                            a.download = fileName;
                              document.body.appendChild(a);
                                a.click();
                                  document.body.removeChild(a);
                                    setTimeout(() => URL.revokeObjectURL(url), 4000);
                                      return 'downloaded';
          }

          export function formatBookingReceiptText(b: Booking): string {
              const billAmt = b.finalAmount ?? b.estimatedAmount;
                const discount = b.discountAmount || 0;
                  const extraTotal = (b.extraCharges || []).reduce((s, item) => s + item.amount, 0);
                    const serviceAmt = Math.max(0, billAmt + discount - extraTotal);
                      const extraLines = (b.extraCharges || []).map((ex) => `• Extra (${ex.label}): ₹${ex.amount}`);
                        return [
                                '*NEEDZO – Digital Service Receipt*',
                                    `Receipt ID: #${(b.transactionRef || b.id.slice(0, 8)).toUpperCase()}`,
                                        `Customer: ${b.customerName}`,
                                            `Date: ${b.preferredDate}`,
                                                `Location: ${b.locality}, ${b.city}`,
                                                    b.partnerName ? `Partner: ${b.partnerName}` : '',
                                                        `Service (${b.serviceTitle}): ₹${serviceAmt}`,
                                                            ...extraLines,
                                                                b.couponCode ? `Coupon (${b.couponCode}): -₹${discount}` : '',
                                                                    `*Total Amount: ₹${billAmt}*`,
                                                                        `Payment: ${b.paymentStatus === 'paid' ? `PAID (${(b.paymentMethod || 'cash').toUpperCase()})` : 'Pending'}`,
                                                                            '7-Day Service Warranty • https://needzo-bhopal.eevanventures.workers.dev',
                        ].filter(Boolean).join('\n');
          }

          export function getWhatsAppShareTextUrl(text: string): string {
              return `https://wa.me/?text=${encodeURIComponent(text)}`;
          }

          export async function shareBookingReceipt(b: Booking): Promise<'shared' | 'copied'> {
              const text = formatBookingReceiptText(b);
                if (typeof navigator !== 'undefined' && navigator.share) {
                        try {
                                  await navigator.share({ title: 'NEEDZO Receipt', text });
                                        return 'shared';
                        } catch {
                                  // Fallback
                        }
                }
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                        await navigator.clipboard.writeText(text);
                  }
                    return 'copied';
          }

          export function playLeadAlertSound(): void {
              try {
                    if (typeof navigator !== 'undefined' && navigator.vibrate) {
                              navigator.vibrate([200, 100, 200]);
                    }
                        const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
                            const Ctx = win.AudioContext || win.webkitAudioContext;
                                if (!Ctx) return;
                                    const ctx = new Ctx();
                                        const now = ctx.currentTime;
                                            [660, 880].forEach((freq, idx) => {
                                                      const osc = ctx.createOscillator();
                                                            const gain = ctx.createGain();
                                                                  osc.type = 'sine';
                                                                        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
                                                                              gain.gain.setValueAtTime(0.18, now + idx * 0.14);
                                                                                    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.25);
                                                                                          osc.connect(gain);
                                                                                                gain.connect(ctx.destination);
                                                                                                      osc.start(now + idx * 0.14);
                                                                                                            osc.stop(now + idx * 0.14 + 0.26);
                                            });
              } catch {
                    // Ignore
              }
          }

          export function compressImageFile(file: File, maxDim = 900, quality = 0.72): Promise<{ dataUrl: string; sizeKb: number }> {
              return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                        reader.onerror = () => reject(new Error('Read failed'));
                            reader.onload = () => {
                                      const rawUrl = String(reader.result || '');
                                            const img = new Image();
                                                  img.onerror = () => resolve({ dataUrl: rawUrl, sizeKb: Math.round(file.size / 1024) });
                                                        img.onload = () => {
                                                                    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
                                                                            const w = Math.max(1, Math.round(img.width * scale));
                                                                                    const h = Math.max(1, Math.round(img.height * scale));
                                                                                            const canvas = document.createElement('canvas');
                                                                                                    canvas.width = w;
                                                                                                            canvas.height = h;
                                                                                                                    const ctx = canvas.getContext('2d');
                                                                                                                            if (!ctx) return resolve({ dataUrl: rawUrl, sizeKb: Math.round(file.size / 1024) });
                                                                                                                                    ctx.drawImage(img, 0, 0, w, h);
                                                                                                                                            const compressed = canvas.toDataURL('image/jpeg', quality);
                                                                                                                                                    resolve({ dataUrl: compressed, sizeKb: Math.max(1, Math.round((compressed.length * 0.75) / 1024)) });
                                                        };
                                                              img.src = rawUrl;
                            };
                                reader.readAsDataURL(file);
              });
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
