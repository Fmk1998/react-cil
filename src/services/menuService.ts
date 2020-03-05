import {Get} from "para-lib";
import Api from "../config/api.config";

export const queryMenus = () => {
    return Get({
        url: Api.menu
    });
};
