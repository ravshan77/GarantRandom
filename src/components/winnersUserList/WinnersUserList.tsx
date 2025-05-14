import React from 'react';
import { Userlist } from '@/types';
import WinnersUserItem from './WinnersUserItem';

interface WinnersUserListProps {
  users: Userlist[];
}

const WinnersUserList: React.FC<WinnersUserListProps> = ({ users }) => {
  if (users?.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-instagram-gray">Hech qanday ishtirokchilar topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-instagram-border overflow-hidden">
      <div className="divide-y divide-instagram-border h-80 overflow-y-auto overflow-x-hidden">
        {users?.map((usr, ind) => {
          return (<WinnersUserItem key={ind} user={usr} />)}
        )}
      </div>
    </div>
  );
};

export default WinnersUserList;