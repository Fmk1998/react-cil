import {INCREMENT, DECREMENT} from '../action-types'

export default (state = 0, action: { type: any }) => {
    switch (action.type) {
        case INCREMENT:
            console.log('INCREMENT ======>', state)
            return state + 1
        case DECREMENT:
            console.log('DECREMENT ======>', state)
            return state - 1
        default:
            return state
    }
}
