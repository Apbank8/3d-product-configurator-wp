import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({ activeTab: '', setActiveTab: () => {} });

const TabsContainer = styled.div`
  width: 100%;
`;

const TabsListContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: ${props => props.active ? '#2563eb' : '#6b7280'};
  border-bottom: 2px solid ${props => props.active ? '#2563eb' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

const TabContentContainer = styled.div`
  padding: 1rem 0;
`;

export const Tabs: React.FC<{ defaultValue: string; children: React.ReactNode }> = ({ 
  defaultValue, 
  children 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <TabsContainer>{children}</TabsContainer>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TabsListContainer>{children}</TabsListContainer>;
};

export const TabsTrigger: React.FC<{ 
  value: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <TabButton
      active={activeTab === value}
      onClick={() => setActiveTab(value)}
      className={className}
    >
      {children}
    </TabButton>
  );
};

export const TabsContent: React.FC<{ 
  value: string; 
  children: React.ReactNode 
}> = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <TabContentContainer>{children}</TabContentContainer>;
};
