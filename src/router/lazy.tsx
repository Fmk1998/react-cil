// 懒加载模块
import Loadable from 'react-loadable'
import Loading from '../components/loading/global';
//通用的过场组件
const loadings = () => Loading

export const Lazy = (loader: any, loading = loadings) => {
    return Loadable({
        loader,
        loading
    })
}
export default Lazy;