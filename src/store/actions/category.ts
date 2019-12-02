/**
 * action 在redux-thunk的情况下才可以做异步操作,数据请求都在这里，相当于Vuex的actions
 */
import {APICATEGORY} from '../action-types'
import {queryListData} from '../../service/categoryService' // 数据请求，返回Promise

export const queryData = () => async (dispatch: any) => {
    const data = await queryListData()
    console.log(data)
    dispatch({type: APICATEGORY.ADD, payload: data})
}
