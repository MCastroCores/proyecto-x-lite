import { createContext, useState } from "react";
import PropTypes from 'prop-types';


export const UserAvatarContext = createContext();

export const UserAvatarProvider = ({ children }) => {

  const [userAvatar, setUserAvatar] = useState(null);

  const avatarValues = { userAvatar, setUserAvatar };

  return (
    <UserAvatarContext.Provider value={avatarValues}>
      {children}
    </UserAvatarContext.Provider>
  )
};

UserAvatarProvider.propTypes = {
  children: PropTypes.node
}