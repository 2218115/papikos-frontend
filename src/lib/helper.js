import { useEffect, useState } from "react";

const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        resolve(event.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    } else {
      reject("Null input on file");
    }
  });
};

const dataUriToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};

const getSession = () => {
  if (!localStorage.getItem("session")) {
    window.location.replace(`/login?redirect=${window.location.href}`);
    return null;
  }
  return JSON.parse(localStorage.getItem("session"));
};

const useAction = ({ fn, onSuccess, onError, placeholder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(placeholder);
  const [error, setError] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  const isFieldError = (name) => {
    if (!error) {
      return false;
    }

    return error[name] !== undefined;
  };

  const getError = (name) => {
    if (!error) {
      return null;
    }
    if (!error[name]) {
      return null;
    }

    return error[name][0];
  };

  return {
    isLoading,
    execute: async (params) => {
      setIsLoading(true);
      setIsSuccess(false);
      try {
        const result = await fn(params);
        setData(result.data.data);
        try {
          onSuccess?.(result);
        } catch (i) {
          console.error("ONSUCCESS", i);
        }
        setIsSuccess(true);
      } catch (e) {
        console.error("ERROR", e);
        try {
          onError?.(e.response);
        } catch (i) {
          console.error("ERROR [ONEROR] 😭", i);
        }
        if (e.response?.data?.errors) {
          setError(e.response.data.errors);
        }
      } finally {
        setIsLoading(false);
      }
    },
    data,
    getError,
    isFieldError,
    isSuccess,
  };
};

const debounce = (callback, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

const kosStatusToBadgeColor = (status) => {
  if (status == 1) {
    return "bg-blue-100 text-blue-800";
  } else if (status == 2) {
    return "bg-green-100 text-green-800";
  } else if (status == 3) {
    return "bg-red-100 text-red-800";
  } else {
    return "bg-zinc-100 text-zinc-800";
  }
};

const bookingStatusToBageColor = (status) => {
  if (status == 1) {
    return "bg-zinc-100 text-zinc-800";
  } else if (status == 2 || status == 5) {
    return "bg-red-100 text-red-800";
  } else if (status == 3) {
    return "bg-blue-100 text-blue-800";
  } else {
    return "bg-green-100 text-green-800";
  }
};


const stringLimit = (str, max) => {
  if (str.length > max) {
    return str.substring(0, max) + "....";
  }
  return str;
};

/**
 * 
 * @param {Date} date 
 * @returns 
 */

const dateToInputDate = (date) => {
  const result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${(date.getDate() + 1).toString().padStart(2, "0")}`;
  return result;
}

export {
  fileToDataUrl,
  dataUriToBlob,
  useAction,
  getSession,
  kosStatusToBadgeColor,
  stringLimit,
  debounce,
  dateToInputDate,
  bookingStatusToBageColor,
};
