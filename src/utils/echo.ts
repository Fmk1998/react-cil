const sequlizeURL = (str: string) => {
    let url = "";
    if (str.charAt(0) === "/") {
        url = str;
    } else {
        url = `/${str}`;
    }
    return url;
};
export {
    sequlizeURL
};
