export const SET_USER_INFO = "SET_USER_INFO";

export const setUserInfo = (user) => ({
  type: SET_USER_INFO,
  payload: user,
});