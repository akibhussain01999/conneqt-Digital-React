import { configureStore } from "@reduxjs/toolkit";
import  ToDoListslice  from "./ToDoListslice";
import authReducer from "./authSlice";


const store = configureStore({
reducer:{
addTask : ToDoListslice.reducer,
checkAuth : authReducer

}

})

export default store;

