import { BHOPAL_LOCALITIES } from './bhopalLocalities';

export interface IndianCity {
      name: string;
        state: string;
          sampleAreas: string[];
}

export interface PincodeLookupResult {
      city: string;
        locality: string;
          state: string;
            areas: string[];
}

export const INDIA_CITIES: IndianCity[] = [
      { name: 'Bhopal', state: 'Madhya Pradesh', sampleAreas: BHOPAL_LOCALITIES.map((l) => l.name) },
        { name: 'Indore', state: 'Madhya Pradesh', sampleAreas: ['Vijay Nagar', 'Palasia', 'Bhawarkua', 'Rajwada', 'Rau'] },
          { name: 'Jabalpur', state: 'Madhya Pradesh', sampleAreas: ['Civil Lines', 'Napier Town', 'Wright Town', 'Vijay Nagar'] },
            { name: 'Gwalior', state: 'Madhya Pradesh', sampleAreas: ['City Centre', 'Lashkar', 'Morar', 'Thatipur'] },
              { name: 'Ujjain', state: 'Madhya Pradesh', sampleAreas: ['Freeganj', 'Nanakheda', 'Rishi Nagar', 'Dewas Road'] },
                { name: 'Delhi NCR', state: 'Delhi / NCR', sampleAreas: ['Connaught Place', 'Dwarka', 'Rohini', 'Noida Sec-62', 'Gurugram'] },
                  { name: 'Mumbai', state: 'Maharashtra', sampleAreas: ['Andheri', 'Bandra', 'Dadar', 'Powai', 'Thane'] },
                    { name: 'Pune', state: 'Maharashtra', sampleAreas: ['Kothrud', 'Hinjewadi', 'Viman Nagar', 'Baner', 'Hadapsar'] },
                      { name: 'Jaipur', state: 'Rajasthan', sampleAreas: ['Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'C-Scheme'] },
                        { name: 'Lucknow', state: 'Uttar Pradesh', sampleAreas: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar'] },
                          { name: 'Kanpur', state: 'Uttar Pradesh', sampleAreas: ['Kakadeo', 'Swaroop Nagar', 'Civil Lines', 'Kidwai Nagar'] },
                            { name: 'Patna', state: 'Bihar', sampleAreas: ['Kankarbagh', 'Boring Road', 'Bailey Road', 'Rajendra Nagar'] },
                              { name: 'Ahmedabad', state: 'Gujarat', sampleAreas: ['Satellite', 'Navrangpura', 'Bopal', 'Prahlad Nagar'] },
                                { name: 'Bengaluru', state: 'Karnataka', sampleAreas: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout'] },
                                  { name: 'Hyderabad', state: 'Telangana', sampleAreas: ['Madhapur', 'Gachibowli', 'Banjara Hills', 'Kukatpally'] },
                                    { name: 'Chennai', state: 'Tamil Nadu', sampleAreas: ['Anna Nagar', 'T. Nagar', 'Velachery', 'Adyar'] },
                                      { name: 'Kolkata', state: 'West Bengal', sampleAreas: ['Salt Lake', 'New Town', 'Park Street', 'Ballygunge'] },
                                        { name: 'Raipur', state: 'Chhattisgarh', sampleAreas: ['Shankar Nagar', 'Civil Lines', 'Pandri', 'Telibandha'] },
                                          { name: 'Nagpur', state: 'Maharashtra', sampleAreas: ['Dharampeth', 'Sitabuldi', 'Manish Nagar', 'Sadar'] },
                                            { name: 'Surat', state: 'Gujarat', sampleAreas: ['Vesu', 'Adajan', 'Piplod', 'Varachha'] },
];

export async function reverseGeocodeIndia(lat: number, lng: number): Promise<{ city: string; locality: string; pinCode: string }> {
      try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`);
                if (!res.ok) throw new Error('Geo failed');
                    const data = (await res.json()) as { address?: Record<string, string> };
                        const a = data.address || {};
                            const city = a.city || a.town || a.village || a.state_district || 'Bhopal';
                                const locality = a.suburb || a.neighbourhood || a.residential || a.road || city;
                                    const pinCode = a.postcode || '';
                                        return { city, locality, pinCode };
      } catch {
            return { city: 'Bhopal', locality: 'Arera Colony', pinCode: '' };
      }
}

export async function lookupIndiaPincode(pin: string): Promise<PincodeLookupResult | null> {
      const cleaned = pin.replace(/\D/g, '');
        if (!/^\d{6}$/.test(cleaned)) return null;

          try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${cleaned}`);
                    if (res.ok) {
                              const json = (await res.json()) as Array<{
                                        Status?: string;
                                                PostOffice?: Array<{ Name?: string; District?: string; Block?: string; State?: string }>;
                              }>;
                                    const entry = json?.[0];
                                          if (entry?.Status === 'Success' && entry.PostOffice && entry.PostOffice.length > 0) {
                                                    const first = entry.PostOffice[0];
                                                            const city = (first.District || first.Block || '').trim();
                                                                    const state = (first.State || '').trim();
                                                                            const areas = Array.from(
                                                                                          new Set(entry.PostOffice.map((p) => (p.Name || '').trim()).filter(Boolean))
                                                                            );
                                                                                    return {
                                                                                                  city: city || areas[0] || 'India',
                                                                                                            locality: areas[0] || city,
                                                                                                                      state,
                                                                                                                                areas,
                                                                                    };
                                          }
                    }
          } catch {
                // Fallback to OpenStreetMap Nominatim below
          }

            try {
                    const res = await fetch(
                              `https://nominatim.openstreetmap.org/search?postalcode=${cleaned}&country=India&format=jsonv2&addressdetails=1&limit=1`
                    );
                        if (res.ok) {
                                  const list = (await res.json()) as Array<{ address?: Record<string, string> }>;
                                        const a = list?.[0]?.address;
                                              if (a) {
                                                        const city = a.city || a.town || a.state_district || a.county || '';
                                                                const locality = a.suburb || a.neighbourhood || a.village || a.town || city;
                                                                        const state = a.state || '';
                                                                                if (city || locality) {
                                                                                              return {
                                                                                                            city: city || locality,
                                                                                                                        locality: locality || city,
                                                                                                                                    state,
                                                                                                                                                areas: locality ? [locality] : [],
                                                                                              };
                                                                                }
                                              }
                        }
            } catch {
                    // Ignore
            }

              return null;
}
