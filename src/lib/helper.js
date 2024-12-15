import { useState } from "react";

const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                resolve(event.target.result);
            }
            fileReader.readAsDataURL(file[0]);
        } else {
            reject('Null input on file');
        }
    });
}

const dataUriToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}

const getSession = () => {
    return JSON.parse(localStorage.getItem('session'));
}

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
    }

    const getError = (name) => {
        if (!error) {
            return null;
        }
        if (!error[name]) {
            return null;
        }

        return error[name][0];
    }

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
                    console.error('ONSUCCESS', i);
                }
                setIsSuccess(true);
            } catch (e) {
                try {
                    onError?.(e.response);
                } catch (i) {
                    console.error('ONEROR', i);
                }
                setError(e.response.data.errors);
            } finally {
                setIsLoading(false);
            }
        },
        data,
        getError,
        isFieldError,
        isSuccess,
    }
}

export {
    fileToDataUrl,
    dataUriToBlob,
    useAction,
    getSession,
}