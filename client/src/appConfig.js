//Development
let ApiBaseUrl = process.env.REACT_APP_API_BASE_URL_DEV
//let ApiBaseUrl = "http://localhost:3001/";

//Produnction
//let ApiBaseUrl = process.env.REACT_APP_API_BASE_URL_Prod

//Urls
let base = ApiBaseUrl
export const postUserQuery = base + 'user/postUserQuery';
export const getLinkOn = base + 'user/getLinkOn';
export const loginUser = base + 'login/loginUser';
export const joinInstently = base + 'login/joinInstently';
export const getLocationData = base + 'user/getLocationData';
export const getActivity = base + 'initGet/getActivity';
export const getActivityType = base + 'initGet/getActivityType';
export const getTopProvider = base + 'initGet/getTopProvider';
export const getCities = base + 'initGet/getCities';
export const getShopCategory = base + 'initGet/getShopCategory';
export const getShopProducts = base + 'initGet/getShopProducts';
export const postShoppingcart = base + 'initGet/postShoppingcart';
export const getShoppingcart = base + 'initGet/getShoppingcart';
export const deleteShoppingcart = base + 'initGet/deleteShoppingcart';

//register
export const UserRegistration = base + "registration/userRegister";
export const UserLogin = base + "login/userLogin";







