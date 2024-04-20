import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const usePath = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const path = location.pathname.split("/");
  return [path, pathname];
};

export const useActivepath = () => {
  const [active, setActive] = useState(null);
  const [path] = usePath();

  useEffect(() => {
    if (path[1] == "dash") {
      if (path[2] == "" || path[2] == null) {
        path[2] = "profile";
      } else null;
      setActive(path[2]);
    } else {
      if (path[1] == "" || path[1] == null) {
        path[1] = "home";
      }
      setActive(path[1]);
    }
  }, [path]);

  return [active];
};
