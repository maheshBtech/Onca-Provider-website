import { UserRegistration, UserLogin } from "../../../../appConfig";
import axios from "axios";
class registerService {
    constructor() { }

    async userRegistration(data) {
        try {
            if (data == null) {
                return;
            }
            return axios
                .post(UserRegistration, data)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            return response;
                        }
                        return null;
                    } else {
                        return null;
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } catch (error) {
            throw error;
        }
    }

    async userLogin(data) {
        try {
            if (data == null) {
                return;
            }
            return axios
                .post(UserLogin, data)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.length > 0) {
                            return response;
                        }
                        return null;
                    } else {
                        return null;
                    }
                })
                .catch((err) => {
                    return err;
                });
        } catch (error) {
            throw error;
        }
    }



    async sendOTP(number) {
        var apiKey = "678b2743-51d1-11eb-8153-0200cd936042";
        return axios.post("https://2factor.in/API/V1/" + apiKey + "/SMS/" + number + "/AUTOGEN")
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            })
            .catch((err) => {
                throw err;
            })
    }
    async verifyOTP(data) {
        var apiKey = "678b2743-51d1-11eb-8153-0200cd936042";
        return axios.post(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${data.sessionID}/${data.OTP}`)
            .then(res => {
                if (res.status == 200) {
                    return res;
                }
                // else if (res)
            })
            .catch((err) => {
                return err;
            })

    }

}

export default registerService;