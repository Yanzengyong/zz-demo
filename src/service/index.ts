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
            produceCompanies: ['华为科技有限公司'],
            supplyCompanies: ['小米科技有限公司', '魅族科技', 'vivo']
        })
    })
}
    // request.get('/product/relationship', {
    //     name: productName
    // });


export interface Policy {
    title: string,
    region: string
}



// {
//     return new Promise<IProductRelations>((resolve, reject) => {
//         resolve({
//             produceCompanies: ['华为科技有限公司'],
//             supplyCompanies: ['小米科技有限公司', '魅族科技', 'vivo']
//         })
//     })
// }