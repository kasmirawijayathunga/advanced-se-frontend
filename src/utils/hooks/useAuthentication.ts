'use client'

import { useEffect, useState } from 'react';

import Axios from '@/utils/services/Axios';

interface AuthUser {
  data: {
    fname: string,
    lname: string,
  }
}

export default function useAuthentication() {
  const [localUser, setLocalUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = () => {
      setLocalUser({
        data: {
          fname: "foo",
          lname: "bar",
        }
      })
    };

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return localUser;
}