import {APICATEGORY} from "../action-types";
import {queryMenus} from "../../services/menuService";

export const queryMenusAction = () => async (dispatch: any) => {
    const {data, err} = await queryMenus();
    if (err) return;
    dispatch({type: APICATEGORY.QUERY, payload: data});
};
