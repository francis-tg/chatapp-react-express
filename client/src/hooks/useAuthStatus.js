import {useEffect, useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {setUserData} from "../redux/features/user";
import {API_URL} from "../api/common";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isMounted) {
      //const auth = sessionStorage.getItem("token");
      fetch(`${API_URL}/user/protect`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }).then(async (r) => {
        if (r.status === 200) {
          //const auth = sessionStorage.getItem("token");
          //if (auth) {

        
          const data = await r.json();
          dispatch(setUserData(data));
          //}
          setCheckingStatus(false);
          return setLoggedIn(true);
        } else {
          setCheckingStatus(false);
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, dispatch]);

  return {loggedIn, checkingStatus};
}
