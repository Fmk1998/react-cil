import {INCREMENT, DECREMENT} from '../action-types'

export const increment = (text: any) => ({type: [INCREMENT], text})
export const decrement = (id: any) => ({type: [DECREMENT], id})
