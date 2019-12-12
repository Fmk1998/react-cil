import {TAGLINK} from '../action-types'

const initState = {
    tagList: []
};
export default function tagLinkReducer(state = initState, action: any) {
    switch (action.type) {
        case TAGLINK.LIST:
            return Object.assign({}, state, {tagList: action.payload});
        case TAGLINK.QUERY:
            return Object.assign({}, state);
        default:
            return state;
    }
}
