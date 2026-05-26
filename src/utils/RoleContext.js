import React, { createContext, useContext, useState } from 'react';
import { ROLES } from './helper';

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(ROLES.TECHNICIAN);
  const [profileComplete, setProfileComplete] = useState(false);

  return (
    <RoleContext.Provider value={{ role, setRole, profileComplete, setProfileComplete }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
