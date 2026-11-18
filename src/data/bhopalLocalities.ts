export interface BhopalLocality {
      name: string;
        zone: string;
          pinCode: string;
            lat: number;
              lng: number;
}

export const BHOPAL_LOCALITIES: BhopalLocality[] = [
      { name: 'Arera Colony', zone: 'South Bhopal', pinCode: '462016', lat: 23.2167, lng: 77.4344 },
        { name: 'MP Nagar', zone: 'Central Bhopal', pinCode: '462011', lat: 23.2332, lng: 77.4343 },
          { name: 'Kolar Road', zone: 'South Bhopal', pinCode: '462042', lat: 23.1756, lng: 77.4167 },
            { name: 'Shahpura', zone: 'South Bhopal', pinCode: '462039', lat: 23.1964, lng: 77.4244 },
              { name: 'Habibganj / Rani Kamalapati', zone: 'South-Central', pinCode: '462016', lat: 23.2294, lng: 77.4391 },
                { name: 'New Market / TT Nagar', zone: 'Central Bhopal', pinCode: '462003', lat: 23.2367, lng: 77.3999 },
                  { name: 'Bawadiya Kalan', zone: 'South Bhopal', pinCode: '462026', lat: 23.1869, lng: 77.4418 },
                    { name: 'Gulmohar Colony', zone: 'South Bhopal', pinCode: '462039', lat: 23.1912, lng: 77.4326 },
                      { name: 'Indrapuri', zone: 'BHEL Zone', pinCode: '462022', lat: 23.2496, lng: 77.4651 },
                        { name: 'Ashoka Garden', zone: 'East Bhopal', pinCode: '462023', lat: 23.2572, lng: 77.4368 },
                          { name: 'Ayodhya Bypass', zone: 'North-East Bhopal', pinCode: '462041', lat: 23.2756, lng: 77.4563 },
                            { name: 'Bairagarh (Sant Hirdaram Nagar)', zone: 'West Bhopal', pinCode: '462030', lat: 23.2683, lng: 77.3389 },
                              { name: 'Kohefiza', zone: 'West-Central', pinCode: '462001', lat: 23.2647, lng: 77.3812 },
                                { name: 'Misrod / Hoshangabad Road', zone: 'South-East', pinCode: '462026', lat: 23.1726, lng: 77.4631 },
                                  { name: 'Karond', zone: 'North Bhopal', pinCode: '462038', lat: 23.2961, lng: 77.4027 },
];

export function findNearestBhopalLocality(lat: number, lng: number): BhopalLocality {
      let closest = BHOPAL_LOCALITIES[0];
        let minDist = Infinity;
          for (const loc of BHOPAL_LOCALITIES) {
                const d = (loc.lat - lat) ** 2 + (loc.lng - lng) ** 2;
                    if (d < minDist) {
                              minDist = d;
                                    closest = loc;
                    }
          }
            return closest;
}
