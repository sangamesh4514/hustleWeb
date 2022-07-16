import { userLogin } from "../slices/authSlice";

export const generateOtp = (number, navigate) => (dispatch) => {
  if (number === 2) {
    dispatch(userLogin(number));
    navigate("/home");
  } else {
    dispatch(userLogin(5));
  }
};
