import {APICATEGORY} from '../action-types'

const initState = {
    list: []
};
export default function categoryReducer(state = initState, action: any) {
    switch (action.type) {
        case APICATEGORY.ADD:
            return state;
        case APICATEGORY.QUERY:
            return Object.assign({}, state, {list: action.payload});
        default:
            return state;
    }
}
