          import type { AppSettings, ServiceCategory, ServiceItem } from '../types';

          export const SERVICE_CATEGORIES: ServiceCategory[] = [
              { id: 'plumber', name: 'Plumber', hindiTag: 'नल व पाइप', description: 'Tap leak, pipe fitting, tank & bathroom repair', startingVisitFee: 99, isEmergencyEligible: true },
                { id: 'electrician', name: 'Electrician', hindiTag: 'बिजली मिस्त्री', description: 'Switchboard, fan, MCB, inverter & wiring', startingVisitFee: 99, isEmergencyEligible: true },
                  { id: 'ac_repair', name: 'AC & Appliance', hindiTag: 'एसी व फ्रिज', description: 'AC service, gas refill, fridge & washing machine', startingVisitFee: 199, isEmergencyEligible: true },
                    { id: 'carpenter', name: 'Carpenter', hindiTag: 'बढ़ई / लकड़ी', description: 'Door lock, hinge, cupboard & furniture repair', startingVisitFee: 99, isEmergencyEligible: false },
                      { id: 'cleaning', name: 'Home Cleaning', hindiTag: 'साफ़-सफ़ाई', description: 'Bathroom, kitchen, sofa & full home deep clean', startingVisitFee: 199, isEmergencyEligible: false },
                        { id: 'painter', name: 'Painter', hindiTag: 'पेंटर', description: 'Room painting, waterproofing & wall touch-up', startingVisitFee: 99, isEmergencyEligible: false },
                          { id: 'mason', name: 'Mason / Tiles', hindiTag: 'राजमिस्त्री', description: 'Tile fixing, plaster, seepage & civil repair', startingVisitFee: 99, isEmergencyEligible: false },
                            { id: 'driver', name: 'Driver on Call', hindiTag: 'ड्राइवर', description: 'Hourly, daily or outstation car driver', startingVisitFee: 199, isEmergencyEligible: true },
                              { id: 'cook', name: 'Home Cook', hindiTag: 'रसोइया / कुक', description: 'Daily home food or small family function cook', startingVisitFee: 149, isEmergencyEligible: false },
                                { id: 'tutor', name: 'Home Tutor', hindiTag: 'होम ट्यूटर', description: 'School subjects, maths, science & English tutor', startingVisitFee: 99, isEmergencyEligible: false },
                                  { id: 'shifting', name: 'Packers & Shifting', hindiTag: 'सामान शिफ्टिंग', description: 'Local house shifting, loading & tempo help', startingVisitFee: 149, isEmergencyEligible: false },
                                    { id: 'other', name: 'Other Need', hindiTag: 'अन्य सेवा', description: 'Any other local skilled help or custom work', startingVisitFee: 99, isEmergencyEligible: true },
          ];

          export const SERVICE_ITEMS: ServiceItem[] = [
              { id: 'plumb-leak', categoryId: 'plumber', title: 'Tap / Mixer / Pipe Leak Repair', description: 'Fix dripping taps, wall mixers or concealed pipe leaks.', startingVisitFee: 99, estimatedDuration: '30–45 mins', includes: ['Leak inspection', 'Washer/spindle check', 'Basic sealing'] },
                { id: 'plumb-tank', categoryId: 'plumber', title: 'Water Tank & Motor Fitting', description: 'Overhead tank connection, float valve or motor issue.', startingVisitFee: 199, estimatedDuration: '45–60 mins', includes: ['Motor check', 'Joint & valve check', 'Pressure test'] },
                  { id: 'elec-mcb', categoryId: 'electrician', title: 'MCB / Short Circuit / Power Issue', description: 'Urgent trip fix, phase check & fuse/MCB replacement.', startingVisitFee: 99, estimatedDuration: '30–45 mins', includes: ['Fault tracing', 'Safety load check', 'MCB test'] },
                    { id: 'elec-fan', categoryId: 'electrician', title: 'Fan, Light & Switchboard Repair', description: 'Ceiling fan capacitor, regulator or socket installation.', startingVisitFee: 99, estimatedDuration: '30 mins', includes: ['Wiring check', 'Switch/capacitor fitting', 'Testing'] },
                      { id: 'ac-service', categoryId: 'ac_repair', title: 'Split / Window AC Foam Jet Service', description: 'Deep coil cleaning, drain pipe flush & cooling check.', startingVisitFee: 299, estimatedDuration: '45–60 mins', includes: ['Filter & coil wash', 'Drain cleaning', 'Cooling check'] },
                        { id: 'ac-gas', categoryId: 'ac_repair', title: 'AC Not Cooling / Gas Refill Check', description: 'Leak test, pressure check & refrigerant refill estimate.', startingVisitFee: 199, estimatedDuration: '45 mins', includes: ['Leak inspection', 'Compressor check', 'Upfront gas quote'] },
                          { id: 'carp-lock', categoryId: 'carpenter', title: 'Door Lock, Hinge & Handle Repair', description: 'Fix jammed doors, latches, almirah hinges or main lock.', startingVisitFee: 149, estimatedDuration: '30–45 mins', includes: ['Alignment check', 'Screw & hinge tighten', 'Lock test'] },
                            { id: 'clean-bath', categoryId: 'cleaning', title: 'Bathroom Deep Cleaning', description: 'Tile descaling, hard water stain removal & sanitization.', startingVisitFee: 249, estimatedDuration: '60 mins', includes: ['Floor & wall scrub', 'Basin & WC clean', 'Mirror & taps'] },
                              { id: 'paint-wall', categoryId: 'painter', title: 'Room / Damp Wall Touch-Up', description: 'Putty, primer & paint touch-up for damp or chipped walls.', startingVisitFee: 149, estimatedDuration: '1–2 hrs', includes: ['Surface inspection', 'Putty/paint quote', 'Touch-up prep'] },
                                { id: 'mason-tile', categoryId: 'mason', title: 'Loose Tile & Grouting Repair', description: 'Re-fix broken/loose floor or bathroom tiles & waterproof grout.', startingVisitFee: 149, estimatedDuration: '60 mins', includes: ['Tile check', 'Joint grouting', 'Clean finish'] },
                                  { id: 'driver-call', categoryId: 'driver', title: 'Driver on Call (City / Outstation)', description: 'Verified car driver for office, family trip or hospital visit.', startingVisitFee: 199, estimatedDuration: '4+ hrs', includes: ['License verified', 'Manual & automatic', 'Safe driving'] },
                                    { id: 'cook-home', categoryId: 'cook', title: 'Home Cook (Trial / Event / Daily)', description: 'Hygienic North/South Indian home-style meals.', startingVisitFee: 149, estimatedDuration: '60–90 mins', includes: ['Fresh prep', 'Clean kitchen', 'Custom menu'] },
                                      { id: 'tutor-home', categoryId: 'tutor', title: 'Home Tutor Demo Session', description: '1-on-1 home tuition for Class 1–12, Maths, Science or English.', startingVisitFee: 99, estimatedDuration: '60 mins', includes: ['Level assessment', 'Study plan', 'Monthly option'] },
                                        { id: 'shift-local', categoryId: 'shifting', title: 'Local Room / House Shifting Help', description: 'Careful packing, loading & local transport within city.', startingVisitFee: 299, estimatedDuration: '2–4 hrs', includes: ['Survey & quote', 'Loading helpers', 'Safe transit'] },
          ];

          export function getCategoryFee(cat: ServiceCategory, settings?: AppSettings): number {
              const override = settings?.categoryRates?.[cat.id];
                return typeof override === 'number' && override >= 0 ? override : cat.startingVisitFee;
          }

          export function getServiceFee(item: ServiceItem, settings?: AppSettings): number {
              const override = settings?.serviceRates?.[item.id];
                return typeof override === 'number' && override >= 0 ? override : item.startingVisitFee;
          }
