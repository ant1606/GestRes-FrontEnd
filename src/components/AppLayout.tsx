import React, { type ReactNode } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Titlebar from './Titlebar';

interface Props {
  children: ReactNode;
}
const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col w-full">
        <Titlebar />
        <div className="container h-full pt-4 px-6">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
