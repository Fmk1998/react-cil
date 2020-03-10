import {Response} from 'para-lib'

export interface ResponseInterface extends Response {
    // 额外的定义参数接口定义在这里，响应体
    data?: {
        data?: object
    },
    err?: object
}
