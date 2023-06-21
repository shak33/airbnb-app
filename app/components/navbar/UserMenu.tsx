'use client';

import { User } from '@prisma/client';

interface UserMenuProps {
  currentUser?: User | null;
}

import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';

import { AiOutlineMenu } from 'react-icons/ai';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Airbnb your home
        </div>
        <div
          className="p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute reounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => false}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => false}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => false}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => false}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => false}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Login"
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;