import React, { createContext, useContext, useState } from "react";

const PersonContext = createContext();

export const PersonProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <PersonContext.Provider
      value={{ selectedUser, setSelectedUser, selectedGroup, setSelectedGroup }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export const usePersonContext = () => {
  return useContext(PersonContext);
};
