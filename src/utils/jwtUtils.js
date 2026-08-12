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