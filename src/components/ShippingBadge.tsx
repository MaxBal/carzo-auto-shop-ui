import { Send } from 'lucide-react';

export const ShippingBadge = () => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 rounded-full px-3 py-0.5 text-xs font-medium mb-4">
      <Send size={16} />
      Відправимо сьогодні після 18:00
    </div>
  );
};