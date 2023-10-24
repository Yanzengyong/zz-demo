
export interface IProductRelations {
    produceCompanies: string[],
    supplyCompanies: string[]
}
export const getProductRelations = async (productName: string): Promise<IProductRelations> => {
    return new Promise<IProductRelations>((resolve, reject) => {
        resolve({
            produceCompanies: ['华为科技有限公司'],
            supplyCompanies: ['小米科技有限公司', '魅族科技', 'vivo']
        })
    })
}