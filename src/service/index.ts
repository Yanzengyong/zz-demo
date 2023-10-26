import request from './request';

export interface Product {
    name: string,
}
export const getProductList = (chainNode): Promise<Array<Product>> => request.get('/product/list', { params: { chainNode } });


export interface IProductRelations {
    produceCompanies: string[],
    supplyCompanies: string[]
}
export const getProductRelations = (productName: string): Promise<IProductRelations> =>

{
    return new Promise<IProductRelations>((resolve, reject) => {
        resolve({
            produceCompanies: ['深圳纳宏光电技术有限公司'],
            supplyCompanies: ['大族激光科技有限公司', '深圳迪能激光科技有限公司 ', '武汉华俄激光工程有限公司', '深圳市联赢激光股份有限公司', '武汉楚天激光', '苏州天弘激光股份有限公司']
        })
    })
}
    // request.get('/product/relationship', {
    //     name: productName
    // });


export interface Policy {
    title: string,
    region: string,
    fileType: string
}



// {
//     return new Promise<IProductRelations>((resolve, reject) => {
//         resolve({
//             produceCompanies: ['华为科技有限公司'],
//             supplyCompanies: ['小米科技有限公司', '魅族科技', 'vivo']
//         })
//     })
// }