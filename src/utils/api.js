
import Cookies from "universal-cookie";
import { BASE_URL } from "../constants"; 

const cookies = new Cookies(null, { path: '/' })

export const checkResponse = async (response) => {
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || "Ошибка при оформлении заказа");
    }
    return data;
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/token`, { method: "POST", body: JSON.stringify({
      refreshToken: cookies.get('refreshToken')
    }) })

    const data = await checkResponse(response)
    
    cookies.set("accessToken", data.accessToken)
    cookies.set("refreshToken", data.refreshToken)

    return data
  } catch {
    cookies.remove("accessToken")
    cookies.remove("refreshToken")
  }
}
  
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
        const refreshData = await refreshToken()
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res) ;
    } else {
      return Promise.reject(err);
    }
  }
}