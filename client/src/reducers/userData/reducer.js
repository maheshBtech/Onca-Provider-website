const initialState = {
    profileData: [],
    loginStatus:false
}
const userProfileData = (state = initialState, action) => {
    if (action.type === "CHANGE_USER_PROFILE_DATA") {
        state.profileData = action.payload;
    }
      if (action.type === "CHANGE_LOGIN_STATUS") {
        state.loginStatus = action.payload;
      }
    return state;

}
export default userProfileData;