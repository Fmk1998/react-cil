import {TAGLINK} from '../action-types'
import {getAllTagLinks} from '../../service/taglinkService'

export const queryData = () => async (dispatch: any) => {
    // @ts-ignore
    const {data, error} = await getAllTagLinks();
    if (error) return false;
    dispatch({type: TAGLINK.LIST, payload: data.data})
}
