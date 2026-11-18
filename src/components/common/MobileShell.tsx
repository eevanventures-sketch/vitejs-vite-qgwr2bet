import React from 'react';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div className="min-h-screen w-full bg-slate-200/80 flex justify-center">
          <div className="w-full max-w-[430px] min-h-screen bg-slate-50 shadow-2xl flex flex-col relative overflow-x-hidden">
                {children}
                    </div>
                      </div>
);
