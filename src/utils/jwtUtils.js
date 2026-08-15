export const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));

    return decodedPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const payload = decodeJwt(token);
    if (!payload?.exp) {
      return false;
    }

    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};