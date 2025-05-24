// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase } from '@/utils/client';
import { checkUser } from '@/utils/auth';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const updateUser = useMemo(
    () => (uid) =>
      checkUser(uid).then((gamerInfo) => {
        setUser({ fbUser: oAuthUser, ...gamerInfo });
      }),
    [oAuthUser],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((gamerInfo) => {
          let userObj = {};
          if ('valid' in gamerInfo) {
            userObj = gamerInfo;
          } else {
            userObj = { fbUser, uid: fbUser.uid, ...gamerInfo };
          }
          setUser(userObj);
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null || oAuthUser === null,
      updateUser,
    }),
    [user, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
}
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
