export const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];

    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("").map((char) =>
            "%" +("00" +char.charCodeAt(0).toString(16)).slice(-2)).join(""));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decodedToken = decodeJwt(token);

  if (!decodedToken) {
    return true;
  }

  if (!decodedToken.exp) {
    return false;
  }

  return Date.now() >= decodedToken.exp * 1000;
};