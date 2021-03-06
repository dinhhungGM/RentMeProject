import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosClient from "utils/axiosClient"
import { ToastSweet } from "components/SweetAlert2"

const initialState = {
  userList: [],
  players: [],
  deletedUsers: [],
  bannedPlayers: [],
  userEdit: null,
  loading: false,
  error: null
}

export const getAllUsersAsync = createAsyncThunk(
  "admin/users",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("managements/users")
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const createUserAsync = createAsyncThunk(
  "admin/users/create",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("managements/users", values)
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateUserAsync = createAsyncThunk(
  "admin/users/update",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put("managements/users", values)
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const softDeleteUsersAsync = createAsyncThunk(
  "admin/users/softDelete",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("managements/users/soft", {
        data: {
          ids: values
        }
      })
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const forceDeleteUsersAsync = createAsyncThunk(
  "admin/users/forceDelete",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("managements/users/force", {
        data: {
          ids: values
        }
      })
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const getPlayersAsync = createAsyncThunk(
  "admin/players",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("managements/players/v1",
      {params: values}
      )
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)



export const getBannedPlayersAsync = createAsyncThunk(
  "admin/players/getBanned",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("managements/players/banned", {
        data: {
          ids: values
        }
      })
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)


export const changeStatusPlayersAsync = createAsyncThunk(
  "admin/players/changeStatus",
  async ({ids, status}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete("managements/players", {
          data: {
            ids: ids,
            status: status
          }
      })
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const getDeletedUsersAsync = createAsyncThunk(
  "admin/users/deleted",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("managements/users/deleted")
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const restoreUsersAsync = createAsyncThunk(
  "admin/users/restore",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch("managements/users", {
        ids: values
      })
      return response
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    EditUser (state, action) {
      state.userEdit = action.payload
    },
    addPlayerRegistration (state, action) {
      state.players.push(action.payload)
    },
    removePlayerRegistration (state, action) {
      state.players = state.players.filter(
        player => player._id !== action.payload._id
      )
    }
  },
  extraReducers: {
    [getAllUsersAsync.pending]: (state) => {
      state.loading = true
    },
    [getAllUsersAsync.fulfilled]: (state, action) => {
      state.userList = action.payload
      state.loading = false
      state.error = null
    },
    [getAllUsersAsync.rejected]: (state, action) => {
      state.userList = []
      state.loading = false
      state.error = action.payload.message
    },
    [createUserAsync.pending]: (state) => {
      state.loading = true
    },
    [createUserAsync.fulfilled]: (state, action) => {
      state.loading = false
      state.error = null
      ToastSweet("success", action.payload.message || "User created successfully","bottom-end")
    },
    [createUserAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet("error", action.payload.message || "Something wrong happend!","bottom-end")
    },
    [updateUserAsync.pending]: (state) => {
      state.loading = true
    },
    [updateUserAsync.fulfilled]: (state, action) => {
      state.userList = state.userList.map((user) =>
        user._id === action.payload.user._id ? action.payload.user : user
      )
      state.loading = false
      state.error = null
      ToastSweet("success", action.payload.message, "bottom-end")
    },
    [updateUserAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet("success", action.payload.message, "bottom-end")
    },
    [softDeleteUsersAsync.pending]: (state) => {
      state.loading = true
    },
    [softDeleteUsersAsync.fulfilled]: (state, action) => {
      console.log(action.payload.userIds);
      state.userList = state.userList.filter(
        (user) => !action.payload.userIds.includes(user._id)
      )
      state.loading = false
      state.error = null
      ToastSweet("success", action.payload.message, "bottom-end")
    },
    [softDeleteUsersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [forceDeleteUsersAsync.pending]: (state) => {
      state.loading = true
    },
    [forceDeleteUsersAsync.fulfilled]: (state, action) => {
      state.deletedUsers = state.deletedUsers.filter(
        (user) => !action.payload.userIds.includes(user._id)
      )
      state.loading = false
      state.error = null
      ToastSweet("success", action.payload.message, "bottom-end")
    },
    [forceDeleteUsersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [getBannedPlayersAsync.pending]: (state) => {
      state.loading = true
    },
    [getBannedPlayersAsync.fulfilled]: (state, action) => {
      state.bannedPlayers = action.payload.players
      state.loading = false
      state.error = null
    },
    [getBannedPlayersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [getPlayersAsync.pending]: (state) => {
      state.loading = true
    },
    [getPlayersAsync.fulfilled]: (state, action) => {
      state.players = action.payload
      state.loading = false
      state.error = null
    },
    [getPlayersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [getDeletedUsersAsync.pending]: (state) => {
      state.loading = true
    },
    [getDeletedUsersAsync.fulfilled]: (state, action) => {
      state.deletedUsers = action.payload.users
      state.loading = false
      state.error = null
    },
    [getDeletedUsersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [restoreUsersAsync.pending]: (state) => {
      state.loading = true
    },
    [restoreUsersAsync.fulfilled]: (state, action) => {
      state.deletedUsers = state.deletedUsers.filter(
        (user) => !action.payload.userIds.includes(user._id)
      )

      state.loading = false
      state.error = null
      ToastSweet("success", action.payload.message, "bottom-end")
    },
    [restoreUsersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    },
    [changeStatusPlayersAsync.pending]: (state) => {
      state.loading = true
    },
    [changeStatusPlayersAsync.fulfilled]: (state, action) => {
      
      state.loading = false
      state.error = null
      if(action.payload.status === "ban"){

        state.players = state.players.filter( 
          (player) => !action.payload.ids.includes(player._id)
        )
  
        ToastSweet("success", action.payload.message, "bottom-end")
      }else{
        
        state.bannedPlayers = state.bannedPlayers.filter( 
          (player) => !action.payload.ids.includes(player._id)
        )
        ToastSweet("success", action.payload.message, "bottom-end")
      }
    },
    [changeStatusPlayersAsync.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      ToastSweet(
        "error",
        action.payload.message || "Something Wrong Happened !!",
        "bottom-end"
      )
    }
  }
})

const { reducer } = AdminSlice
export const { EditUser, addPlayerRegistration, removePlayerRegistration} = AdminSlice.actions
export default reducer
