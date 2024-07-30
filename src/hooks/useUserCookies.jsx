import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useUserCookies = () => {
  const [cookies, setCookiesState] = useState({});

  const getCookies = () => {
    const user = Cookies.get('user');
    const pname = Cookies.get('pname');
    
    if (user && pname) {
      return { user, pname };
    } else {
      return 404;
    }
  };

  const setCookies = ({
    user:email,
    pname: userName
  }) => {
    Cookies.set('user', email);
    Cookies.set('pname', userName);
    setCookiesState(getCookies());
  };

  useEffect(() => {
    setCookiesState(getCookies());
  }, []);

  return { getCookies, setCookies };
};

export default useUserCookies;
