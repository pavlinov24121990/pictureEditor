import React, { ReactNode } from 'react';
import stateStore from './stateStore';
import { Provider } from 'mobx-react';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <Provider stateStore={stateStore}>{children}</Provider>;
};

export default AppProvider;
