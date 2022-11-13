import {createSlice} from '@reduxjs/toolkit'


const favoriteSlice = createSlice({
    name : 'Favorite',
    initialState: {
        items : []
    },
    reducers: {
        Favorite : (state, action) =>{
            const {id} = action.payload
            let newData
            const item = state.items.find(item => item === id)
            if(item){
                newData = state.items.filter(item => item !== id)
            }else{
                newData = [...new Set([id,...state.items])]
            }
            return{
                ...state,
                items : newData
            }
        },
        RemoveFavorite : (state, action) =>{
            return{
                ...state,
                items : []
            }
        }
    },
    
})
export const {Favorite, RemoveFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer