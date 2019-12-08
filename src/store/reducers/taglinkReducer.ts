import {TAGLINK} from '../action-types'

const initState = {
    list: []
};
export default function tagLinkReducer(state = initState, action: any) {
    switch (action.type) {
        case TAGLINK.LIST:
            return state;
        case TAGLINK.QUERY:
            return Object.assign({}, state, {list: action.payload});
        default:
            return state;
    }
}
