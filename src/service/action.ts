import request from './request'
import { GetExample, PostExample, ResposeExample } from './paramsAndResponseType'

// get 请求
export const exportGet = (params: GetExample): Promise<ResposeExample> =>
    request.get("/api/get", { params });


// post 请求
export const exportPost = (data: PostExample): Promise<ResposeExample> =>
    request.post("/api/post", data);

