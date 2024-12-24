import axios from "axios";

export const BASE_URI = "http://localhost:5000/api/";
import Cookies from "js-cookie";


// export const TOKEN = Cookies?.get("authToken");

const MakeApicallWithToken = async (path, method = "GET", payload) => {
    const url = `${BASE_URI}${path}`;

    const token = Cookies.get("authToken");

    console.log("token", token);

    const options = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: payload ? payload : undefined,
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error making API call:", error);
        throw error;
    }
};

const MakeApicallWithoutToken = async (path, method = "GET", payload) => {
    const url = `${BASE_URI}${path}`;

    const options = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
        },
        data: payload ? payload : undefined,
    };

    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error("Error making API call:", error);
        throw error;
    }
};

export {
    MakeApicallWithToken,
    MakeApicallWithoutToken
};