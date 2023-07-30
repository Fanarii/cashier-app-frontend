import React from 'react';
import { ReactComponent as SettingIcon } from '../icons/setting.svg';

const SettingButton = ({ active, onClick }) => {
  return (
    <button
      className={`flex flex-col self-center hover:shadow-xl items-center w-[70px] mt-4 h-[65px] hover:bg-primary group rounded-xl transition duration-300 ease-in-out cursor-pointer justify-center ${
        active ? 'bg-primary shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <SettingIcon
        className={`w-6 h-6 text-secondary fill-current group-hover:text-white ${
          active ? 'text-white' : 'text-secondary'
        }`}
      />
      <span
        className={`text-secondary text-sm mt-1 group-hover:text-white ${
          active ? 'text-white' : 'text-secondary'
        }`}
      >
        Setting
      </span>
    </button>
  );
};

export default SettingButton;
