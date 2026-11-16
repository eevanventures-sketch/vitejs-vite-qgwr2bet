import React from 'react';
import { BookingStatus } from '../../types';

const STATUS_MAP: Record<BookingStatus, { label: string; classes: string }> = {
    pending: {
          label: 'Pending Match',
              classes: 'bg-amber-100 text-amber-800 border-amber-200',
    },
      accepted: {
            label: 'Partner Accepted',
                classes: 'bg-teal-100 text-teal-800 border-teal-200',
      },
        on_the_way: {
              label: 'On the Way',
                  classes: 'bg-sky-100 text-sky-800 border-sky-200',
        },
          in_progress: {
                label: 'Work In Progress',
                    classes: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          },
            completed: {
                  label: 'Completed',
                      classes: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            },
              cancelled: {
                    label: 'Cancelled',
                        classes: 'bg-slate-200 text-slate-700 border-slate-300',
              },
                rejected: {
                      label: 'Declined',
                          classes: 'bg-rose-100 text-rose-800 border-rose-200',
                },
};

export const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
    const cfg = STATUS_MAP[status];
      return (
            <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.classes}`}
                      >
                            {cfg.label}
                                </span>
      );
};
