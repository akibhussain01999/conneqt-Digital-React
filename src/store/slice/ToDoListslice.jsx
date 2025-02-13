import { createSlice } from "@reduxjs/toolkit";

const ToDoListslice = createSlice({
name : "addTask",
initialState :[],
reducers :{
addTaskData(state,action){
    state.push(action.payload)
},
deleteUser(state,action){
    state.splice(action.payload,1)
},
clearUser(state,action){
    return state = [];
}

}
})

console.log(ToDoListslice.actions)

export default ToDoListslice
export const {addTaskData , deleteUser,clearUser} = ToDoListslice.actions