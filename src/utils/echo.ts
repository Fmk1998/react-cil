import Cookie from 'js-cookie'

const getCookie = (key: string) => Cookie.get(key);

const setCookie = (key: string, value: any) => Cookie.set(key, value);

const removeCookie = (key: string) => Cookie.remove(key);


export {
    getCookie,
    setCookie,
    removeCookie
}
