import * as React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Info } from 'lucide-react';

interface TabContainerProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

interface OptionCardProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface DetailLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const TabContainer = ({ activeTab, onTabChange, children }: TabContainerProps) => {
  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      {children}
    </Tabs.Root>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tabs.List className="flex gap-1 rounded-lg bg-gray-100 p-1 text-sm font-medium">
      {children}
    </Tabs.List>
  );
};

export const TabTrigger = ({ value, children }: TabTriggerProps) => {
  return (
    <Tabs.Trigger 
      value={value}
      className="px-3 py-1.5 rounded-md transition-all text-gray-600 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900"
    >
      {children}
    </Tabs.Trigger>
  );
};

export const TabContent = ({ value, children }: TabContentProps) => {
  return (
    <Tabs.Content value={value} className="mt-4">
      {children}
    </Tabs.Content>
  );
};

export const OptionsGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {children}
    </div>
  );
};

export const OptionCard = ({ isActive, onClick, children }: OptionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-left ${
        isActive 
          ? 'border-teal-400 bg-teal-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
};

export const DetailLink = ({ onClick, children }: DetailLinkProps) => {
  return (
    <button 
      onClick={onClick}
      className="text-sm text-teal-600 hover:underline flex items-center gap-1 mt-2"
    >
      <Info size={16} />
      {children}
    </button>
  );
};