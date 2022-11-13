import {configureStore} from '@reduxjs/toolkit'
import sliderReducer from './slices/slider'
import CategoriesReducer from './slices/category'
import ProductReducer from './slices/products'
import FillterReducer from './slices/fillter'
import FavoriteReducer from './slices/favorite'
import CartReducer from './slices/cart'
import AddressReducer from './slices/address'

const store = configureStore({
    reducer: {
        Slider: sliderReducer,
        Categories : CategoriesReducer,
        Product : ProductReducer,
        Fillter : FillterReducer,
        Favorite : FavoriteReducer,
        Cart : CartReducer,
        Address: AddressReducer
    },
})

export default store