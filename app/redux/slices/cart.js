import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: []
    },
    reducers: {
        AddCart: (state, action) => {
            const {
                id,
                sum = 1,
                photoProduct,
                nameProduct,
                priceProduct,
                description,
                update = false,
                sumUpdate,
                total
            } = action.payload
            let newData = [...state.cart]
            let exist = newData.find((item) => item.id === id)
            if (exist) {
                newData = newData.map((item) => {
                    let sumCurrent = item.sum
                    let totalCurrent = item.total
                    let photoProduct = item.photoProduct
                    let nameProduct = item.nameProduct
                    let priceProduct = item.priceProduct
                    let description = item.description
                    if (item.id === id) {
                        if (update) {
                            sumCurrent = sumUpdate
                            totalCurrent = total
                        } else {
                            sumCurrent += sum
                        }
                    }
                    return {
                        ...item,
                        id: item.id,
                        sum: sumCurrent,
                        total: totalCurrent,
                        photoProduct: photoProduct,
                        nameProduct: nameProduct,
                        priceProduct: priceProduct,
                        description: description
                    }
                })
            } else {
                newData.push({
                    id,
                    sum,
                    total,
                    photoProduct,
                    nameProduct,
                    priceProduct,
                    description
                })
            }
            return {
                ...state,
                cart: newData
            }
        },
        RemoveCart: (state, action) => {
            const { id } = action.payload
            let newData = [...state.cart]
            newData = newData.filter((item) => item.id !== id)
            return {
                ...state,
                cart: newData
            }
        },
        RemoveAll: (state, action) => {
            return {
                ...state,
                cart: []
            }
        }
    }
})

export const { AddCart, RemoveCart, RemoveAll } = CartSlice.actions
export default CartSlice.reducer
