import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import StorageManager from '../../StorageManager/StorageManager'

//  lấy thông tin user từ local
export const didGetInfoUser = createAsyncThunk('user/didGetInfoUser', async () => {
    return await StorageManager.getData('user')
})

const user = createSlice({
    name: 'user',
    initialState: {
        data: []
    },
    reducers: {
        // xử lý set thông tin user
        setInfoUser: (state, action) => {
            const { payload } = action
            state.data = payload
            StorageManager.setData('user', payload)
        }
    },
    extraReducers: {
        [didGetInfoUser.fulfilled]: (state, action) => {
            state.data = action.payload?.data || {}
        }
    }
})

const { reducer, actions } = user
export const { setInfoUser } = actions
export default reducer
