import {
    SETTING
} from "../action-types";

const initState: any = {
    language: "zh"
};
export default function settingReducer(state = initState, action: any) {
    switch (action.type) {
        case SETTING:
            return Object.assign({}, state, {language: action.payload});
        default:
            return state;
    }
}
