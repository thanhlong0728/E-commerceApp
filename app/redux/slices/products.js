import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ProductService from '../../services/products'


export const fetchProduct = createAsyncThunk('product/fetchProduct', async (data, thunkAPI) => {
    const respone = await ProductService.list(data)
    return respone.data
})
export const fetchSingleProduct = createAsyncThunk(
    'product/fetchSingleProduct',
    async (data, thunkAPI) => {
        const respone = await ProductService.getSingle(data)
        return respone.data
    }
)
export const fetchProductSpec = createAsyncThunk(
    'product/fetchProductSpec',
    async (data, thunkAPI) => {
        const respone = await ProductService.list({ special: true, ...data })
        return respone.data
    }
)
export const fetchProductIsNew = createAsyncThunk(
    'product/fetchProductIsNew',
    async (data, thunkAPI) => {
        const respone = await ProductService.list({ is_new: true, ...data })
        return respone.data
    }
)
const ProductSlice = createSlice({
    name: 'Product',
    initialState: {
        items: [],
        itemsSpec: [],
        itemsIsNew: [],
        product: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.items = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.product = action.payload
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(fetchProductSpec.fulfilled, (state, action) => {
                state.itemsSpec = action.payload
            })
            .addCase(fetchProductSpec.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(fetchProductIsNew.fulfilled, (state, action) => {
                state.itemsIsNew = action.payload
            })
            .addCase(fetchProductIsNew.rejected, (state, action) => {
                console.log(action.error.message)
            })
    }
})
export const {} = ProductSlice.actions
export default ProductSlice.reducer
