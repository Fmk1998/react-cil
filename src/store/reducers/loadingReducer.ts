import {
    LOADING
} from '../action-types'

interface ActionState {
    type: string;
    loading: boolean;
}

const initState: object = {
    loading: false
}
export default function loadingReducer(state = initState, action: ActionState) {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state, {loading: action.loading});
        default:
            return state;
    }
}
