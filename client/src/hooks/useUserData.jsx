import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../app/features/authSlice";

const useUserData = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserData(token));
  }, [dispatch, token]);

  return;
};

export default useUserData;
