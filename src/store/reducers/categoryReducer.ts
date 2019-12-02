import {APICATEGORY} from '../action-types'

export default function categoryReducer(state = {}, action: any) {
    switch (action.type) {
        case APICATEGORY.ADD:
            console.log('from APICATEGORY')
            return state;
        default:
            return state;
    }
}
