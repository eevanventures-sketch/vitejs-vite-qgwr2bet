import React from 'react';

interface MobileShellProps {
    children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
    return (
          <div className="min-h-screen w-full bg-slate-200/80 flex justify-center">
                <div className="w-full max-w-[430px] min-h-screen bg-slate-50 shadow-2xl flex flex-col relative overflow-x-hidden">
                        {children}
                              </div>
                                  </div>
    );
};
