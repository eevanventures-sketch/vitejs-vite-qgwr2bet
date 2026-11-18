import React from 'react';

export interface NavTabItem<T extends string> {
      id: T;
        label: string;
          icon: React.ReactNode;
            badgeCount?: number;
}

interface BottomNavProps<T extends string> {
      items: NavTabItem<T>[];
        activeTab: T;
          onChange: (tab: T) => void;
}

export function BottomNav<T extends string>({ items, activeTab, onChange }: BottomNavProps<T>) {
      return (
            <nav className="sticky bottom-0 z-30 bg-white border-t border-slate-200 safe-bottom">
                  <div className="grid grid-flow-col auto-cols-fr">
                          {items.map((item) => {
                                      const isActive = item.id === activeTab;
                                                return (
                                                                <button
                                                                              key={item.id}
                                                                                            type="button"
                                                                                                          onClick={() => onChange(item.id)}
                                                                                                                        className={`relative flex flex-col items-center justify-center py-2.5 min-h-[58px] transition-colors ${isActive ? 'text-teal-600' : 'text-slate-500 hover:text-navy-800'}`}
                                                                                                                                    >
                                                                                                                                                  {isActive && <span className="absolute top-0 w-10 h-0.5 rounded-b-full bg-teal-600" />}
                                                                                                                                                                <div className="relative">
                                                                                                                                                                                {item.icon}
                                                                                                                                                                                                {typeof item.badgeCount === 'number' && item.badgeCount > 0 && (
                                                                                                                                                                                                                      <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                                                                                                                                                                                                                                          {item.badgeCount}
                                                                                                                                                                                                                                                            </span>
                                                                                                                                                                                                )}
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                            <span className="text-[11px] font-medium mt-1">{item.label}</span>
                                                                                                                                                                                                                                        </button>
                                                );
                          })}
                                </div>
                                    </nav>
      );
}
