import React, { useMemo, useState } from 'react';
import { Loader2, MapPin, Navigation, Search, X } from 'lucide-react';
import { BHOPAL_LOCALITIES, findNearestBhopalLocality } from '../../data/bhopalLocalities';
import type { GpsCoords } from '../../types';

interface BhopalLocationModalProps {
      isOpen: boolean;
        selectedLocality: string;
          onSelect: (locality: string, coords?: GpsCoords | null) => void;
            onClose: () => void;
}

export const BhopalLocationModal: React.FC<BhopalLocationModalProps> = ({
      isOpen,
        selectedLocality,
          onSelect,
            onClose,
}) => {
      const [query, setQuery] = useState('');
        const [gpsLoading, setGpsLoading] = useState(false);
          const [gpsError, setGpsError] = useState<string | null>(null);

            const filtered = useMemo(() => {
                    const q = query.trim().toLowerCase();
                        if (!q) return BHOPAL_LOCALITIES;
                            return BHOPAL_LOCALITIES.filter(
                                      (loc) => loc.name.toLowerCase().includes(q) || loc.zone.toLowerCase().includes(q) || loc.pinCode.includes(q)
                            );
            }, [query]);

              const handleUseGps = () => {
                    setGpsError(null);
                        if (!navigator.geolocation) {
                                  setGpsError('GPS location is not supported on this device/browser.');
                                        return;
                        }
                            setGpsLoading(true);
                                navigator.geolocation.getCurrentPosition(
                                          (pos) => {
                                                    const lat = pos.coords.latitude;
                                                            const lng = pos.coords.longitude;
                                                                    const nearest = findNearestBhopalLocality(lat, lng);
                                                                            setGpsLoading(false);
                                                                                    onSelect(nearest.name, { lat, lng });
                                                                                            onClose();
                                          },
                                                () => {
                                                            setGpsLoading(false);
                                                                    setGpsError('Location permission denied or unavailable. Please select your Bhopal area below.');
                                                },
                                                      { enableHighAccuracy: true, timeout: 10000 }
                                );
              };

                if (!isOpen) return null;

                  return (
                        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-[1px] flex items-end sm:items-center justify-center">
                              <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-xl">
                                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                                                <div>
                                                            <h2 className="text-base font-bold text-navy-800">Select Bhopal Locality</h2>
                                                                        <p className="text-xs text-slate-500">Service City: Bhopal, Madhya Pradesh</p>
                                                                                  </div>
                                                                                            <button type="button" onClick={onClose} aria-label="Close location modal" className="p-2 rounded-full hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
                                                                                                    </div>

                                                                                                            <div className="p-4 space-y-3 border-b border-slate-100">
                                                                                                                      <div className="relative">
                                                                                                                                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                                                                                                              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Arera, MP Nagar, Kolar, PIN..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-teal-500 focus:bg-white" />
                                                                                                                                                        </div>
                                                                                                                                                                  <button type="button" disabled={gpsLoading} onClick={handleUseGps} className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-teal-200 bg-teal-50 text-teal-800 text-xs font-semibold disabled:opacity-60">
                                                                                                                                                                              <span className="flex items-center gap-2">
                                                                                                                                                                                            {gpsLoading ? <Loader2 className="w-4 h-4 text-teal-600 animate-spin" /> : <Navigation className="w-4 h-4 text-teal-600" />}
                                                                                                                                                                                                          {gpsLoading ? 'Detecting GPS location...' : 'Use Current GPS Location'}
                                                                                                                                                                                                                      </span>
                                                                                                                                                                                                                                  <span className="text-[10px] uppercase tracking-wide bg-white px-2 py-0.5 rounded-full border border-teal-200">GPS</span>
                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                      {gpsError && <p className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{gpsError}</p>}
                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                      <div className="overflow-y-auto p-3 space-y-1.5">
                                                                                                                                                                                                                                                                                {filtered.length === 0 ? (
                                                                                                                                                                                                                                                                                                <p className="text-center text-sm text-slate-500 py-8">No matching Bhopal area found.</p>
                                                                                                                                                                                                                                                                                ) : (
                                                                                                                                                                                                                                                                                                filtered.map((loc) => {
                                                                                                                                                                                                                                                                                                                  const active = loc.name === selectedLocality;
                                                                                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                                                                                                    <button key={loc.name} type="button" onClick={() => { onSelect(loc.name, null); onClose(); }} className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition ${active ? 'bg-navy-800 text-white' : 'hover:bg-slate-100 text-slate-800'}`}>
                                                                                                                                                                                                                                                                                                                                                                      <div className="flex items-center gap-3">
                                                                                                                                                                                                                                                                                                                                                                                          <MapPin className={`w-4 h-4 shrink-0 ${active ? 'text-teal-400' : 'text-teal-600'}`} />
                                                                                                                                                                                                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                    <p className="text-sm font-semibold">{loc.name}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                          <p className={`text-[11px] ${active ? 'text-slate-300' : 'text-slate-500'}`}>{loc.zone} • {loc.pinCode}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {active && <span className="text-[11px] font-semibold text-teal-300">Selected</span>}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                  </div>
                  );
};
