import { createContext, useState } from "react";
import PropTypes from 'prop-types';


export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const tokenValues = { token, setToken };
  


  return (
    <UserTokenContext.Provider value={tokenValues}>
      {children}
    </UserTokenContext.Provider>
  )

}

UserTokenProvider.propTypes = {
  children: PropTypes.node
}