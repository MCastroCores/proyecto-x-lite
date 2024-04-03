import { createContext, useState } from "react";
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userState, setUserState] = useState(null);

  const userValues = { userState, setUserState };

  return (
    <UserContext.Provider value={userValues}>
      { children }
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node
}