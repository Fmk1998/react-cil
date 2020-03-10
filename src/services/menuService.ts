import {Get} from "para-lib";
import Api, {CTX} from "../config/api.config";

export const queryMenus = () => {
    return Get({
        url: Api.menuOnline,

    });
};
