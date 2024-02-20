import React from 'react';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';

const UserInfo: React.FC = () => {
  const {
    ui: { collapseSidebar },
    authentication: { name }
  } = useAppSelector((state: RootState) => state);

  return (
    <div className="flex items-center p-4 gap-2.5 text-sm uppercase font-black">
      <img src="https://picsum.photos/40/40" alt="user" className="rounded-xl" />

      <div className="flex flex-col gap-2">
        <p className={`${collapseSidebar ? 'scale-0' : ''} origin-left duration-300 truncate`}>
          {name}
        </p>
        <p className={`${collapseSidebar ? 'scale-0' : ''} origin-left duration-300 truncate`}>
          admin
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
