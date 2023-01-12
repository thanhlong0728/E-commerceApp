import {api} from './index'

const ProductService = {
    list ({
        offset = 0,
        limit = 20,
        special,
        is_new,
        sortBy,
        search,
        order,
        min_price,
        max_price = 50000000,
        ...restParam
    } = {}) {
        return api.call().get('/mobile/products',{
            params : {
                offset,
                limit,
                special,
                is_new, 
                sortBy,
                search,
                order,
                min_price,
                max_price,
                ...restParam
            }
        })
    },
    getSingle ({
        id,
        ...restParam
    } = {}) {
        return api.call().get(`/mobile/products/${id}`,{
            params : {
                id,
                ...restParam
            }
        })
    }
}
export default ProductService