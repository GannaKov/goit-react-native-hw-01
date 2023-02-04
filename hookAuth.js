import React, { useState } from "react";

export const useAuth = (initialState = false) => {
  const [isAuth, setIsAuth] = useState(initialState);
  const auth = () => setIsAuth(true);
  //   const close = () => setIsOpen(false);
  //   const toggle = () => setIsOpen((isOpen) => !isOpen);

  return { isAuth, auth };
};
