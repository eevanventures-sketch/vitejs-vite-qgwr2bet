import React from 'react';
import {
      Car, GraduationCap, Hammer, HardHat, Paintbrush,
        PlusCircle, Sparkles, Truck, UtensilsCrossed, Wind, Wrench, Zap,
} from 'lucide-react';
import type { ServiceCategoryId } from '../../types';

export const CategoryIcon: React.FC<{ categoryId: ServiceCategoryId; className?: string }> = ({
      categoryId,
        className = 'w-5 h-5',
}) => {
      switch (categoryId) {
            case 'plumber': return <Wrench className={className} />;
                case 'electrician': return <Zap className={className} />;
                    case 'mason': return <HardHat className={className} />;
                        case 'carpenter': return <Hammer className={className} />;
                            case 'ac_repair': return <Wind className={className} />;
                                case 'cleaning': return <Sparkles className={className} />;
                                    case 'painter': return <Paintbrush className={className} />;
                                        case 'driver': return <Car className={className} />;
                                            case 'cook': return <UtensilsCrossed className={className} />;
                                                case 'tutor': return <GraduationCap className={className} />;
                                                    case 'shifting': return <Truck className={className} />;
                                                        case 'other':
                                                            default: return <PlusCircle className={className} />;
      }
};
