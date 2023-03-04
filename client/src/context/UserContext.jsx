import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res?.data);
          setIsReady(true);
        })
        .catch((err) => console.log(err?.response?.data));
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser, isReady }}>{children}</UserContext.Provider>;
}
