import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import CategoriesService from '../../services/category'


export const fetchCategories = createAsyncThunk(
    'categories/fetchCatefories',
    async (data, thunkAPI) => {
        const respone = await CategoriesService.list(data)
        return respone.data
    }
)
export const fetchProductInCategories = createAsyncThunk(
    'categories/fetchProductInCategories',
    async (data, thunkAPI) => {
        const respone = await CategoriesService.listProduct(data)
        return respone.data
    }
)

const categorySlice = createSlice({
    name: 'Categories',
    initialState: {
        items: [],
        products: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                return {
                    ...state,
                    items: action.payload
                }
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.log(action.error.message)
            })
            .addCase(fetchProductInCategories.fulfilled, (state, action) => {
                return {
                    ...state,
                    products: action.payload
                }
            })
            .addCase(fetchProductInCategories.rejected, (state, action) => {
                console.log(action.error.message)
            })
    }
})
export const {} = categorySlice.actions
export default categorySlice.reducer
