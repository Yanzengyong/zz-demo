export enum VertexType {
    Company = 'company',
    Product = 'product',
}

export interface CompanyNode {
    type: VertexType,
    name: string
}

export interface Policy {
    title: string,
    region: string
}

export interface Product {
    name: string,
  }
  