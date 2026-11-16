import React from 'react';
import { Info } from 'lucide-react';

interface DemoBannerProps {
    message?: string;
      compact?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
    message = 'Frontend Demo Prototype • Sample Bhopal data only. Live bookings, GPS, OTP & payments require backend integration.',
      compact = false,
}) => {
    return (
          <div
                className={`flex items-start gap-2 rounded-xl border border-teal-200 bg-teal-50/90 text-navy-800 ${
                          compact ? 'px-3 py-2 text-[11px]' : 'px-3.5 py-2.5 text-xs'
                }`}
                    >
                          <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                                <p className="leading-relaxed">{message}</p>
                                    </div>
    );
};
