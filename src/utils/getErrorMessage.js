const getServerMessage = (data) => {
  if (!data) 
    return null;

  if (typeof data === "string") 
    return data;

  if (typeof data.message === "string")
    return data.message;

  if (typeof data.error === "string")
    return data.error;

  if (Array.isArray(data.errors)) {
    return data.errors.map((error) => {
        if (typeof error === "string")
          return error;
        return error.message || "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return null;
};

const getErrorMessage = (error, fallbackMessage = "Something went wrong. Please try again.",
  statusOverrides = {}) => {
  /*No response usually means an error reaching the server. */
  if (!error?.response) 
    return "Could not connect to the server. Please try again later.";
  
  const { status, data } = error.response;
  const serverMessage = getServerMessage(data);

  /* Allows a specific page to override a message for a specific status code. 
  For example the login page can override the 401 message to say "Invalid email 
  or password" instead of the default message.*/
  if (statusOverrides[status]) {
    return serverMessage || statusOverrides[status];
  }

  switch (status) {
    case 400:
      return (serverMessage || "Please check the information you entered.");

    case 401:
      return (serverMessage || "Your session is missing or invalid. Please log in again.");

    case 403:
      return (serverMessage || "You do not have permission to perform this action.");

    case 404:
      return (serverMessage || "The requested resource could not be found.");

    case 409:
      return (serverMessage || "This information already exists in the system.");

    case 423:
      return (serverMessage || "Your account is currently locked.");

    default:
      if (status >= 500) {
        return (serverMessage || "The server encountered an error. Please try again later.");
      }
      return serverMessage || fallbackMessage;
  }
};

export default getErrorMessage;