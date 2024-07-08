'use client'

import { useEffect, useState } from 'react';
import { LOCAL_PRIFIX } from '../../config';
import AuthService from '../services/Auth';

interface AuthUser {
  id: number,
  role: number,
  email: string,
  access: {
      token: string,
      expire: string
  },
  refresh?: {
    token: string,
    expire: string
  }
}

export default function useAuthentication() {
  const [localUser, setLocalUser] = useState<AuthUser | null | undefined>(undefined);

  const unsubscribeFromAuthStatuChanged = () => {
    const sessionData = sessionStorage.getItem(`${LOCAL_PRIFIX}_access`);
    if (sessionData) {
      let userdata = JSON.parse(sessionData);
      if(new Date(userdata.access.expire).getTime() >= Date.now()) {
        setLocalUser(userdata)
      } else {
        AuthService.refresh()
        setLocalUser(null)
      }
    } else {
      AuthService.refresh()
      setLocalUser(null)
    }
  };

  useEffect(() => {
    unsubscribeFromAuthStatuChanged();
  }, []);

  return localUser;
}