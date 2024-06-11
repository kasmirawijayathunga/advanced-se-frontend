import { LOCAL_PRIFIX } from "../../config";
import Axios from "./Axios";

const logout = () => {
    localStorage.removeItem(`${LOCAL_PRIFIX}_refresh`);
    sessionStorage.removeItem(`${LOCAL_PRIFIX}_access`);
    window.location.reload();
}

const storeTokens = async (data:{ result: { refresh: {} } }) => {
    sessionStorage.setItem(`${LOCAL_PRIFIX}_access`, JSON.stringify(data.result));
    localStorage.setItem(`${LOCAL_PRIFIX}_refresh`, JSON.stringify(data.result.refresh));
};

const getAccessToken = async () => {
    const localDb = sessionStorage.getItem(`${LOCAL_PRIFIX}_access`);
    if(localDb){
        const JSONlocalDb = await JSON.parse(localDb);
        return JSONlocalDb.access.token;
    }
};

const refresh = async () => {
    try {
        const localDb = localStorage.getItem(`${LOCAL_PRIFIX}_refresh`);
        if(localDb) {
            const JSONlocalDb = JSON.parse(localDb);
            if(new Date(JSONlocalDb.expire).getTime() >= Date.now()){
                const { data } = await Axios.post("/auth",{
                    token: JSONlocalDb?.token,
                })
                sessionStorage.setItem(`${LOCAL_PRIFIX}_access`, JSON.stringify(data.result));
            } else {
                localStorage.removeItem(`${LOCAL_PRIFIX}_refresh`)
                window.location.reload()
            }
        }
    } catch (err) {
        console.error(err);
    }
};

export default {
    logout,
    getAccessToken,
    storeTokens,
    refresh
}