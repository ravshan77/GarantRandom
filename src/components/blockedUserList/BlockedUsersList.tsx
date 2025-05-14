import React from 'react';
import { Userlist } from '@/types';
import BlockedUserItem from './BlockedUserItem';

interface BlockedUsersListProps {
  users: Userlist[];
  fetchBlockedUser: () => Promise<void>
}

const BlockedUsersList: React.FC<BlockedUsersListProps> = ({ users, fetchBlockedUser }) => {

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
          return (<BlockedUserItem key={ind} user={usr} fetchBlockedUser={fetchBlockedUser} />)}
        )}
      </div>
    </div>
  );
};

export default BlockedUsersList;