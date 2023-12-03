type ProductItem = {
    id: string
    sum: number
    total: number
    photoProduct: string
    nameProduct: string
    priceProduct: number
    description: string
}

type ProductDetail = {
    id: string
    name: string
    is_new: boolean
    price_sale_off: number
    categoryID: string
    description: string
    image: string
    special: boolean
    rating: string
    price: number
    summary: string
}

export type { ProductItem, ProductDetail }
