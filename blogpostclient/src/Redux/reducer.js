import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import postReducer from "./Posts/postReducer";

const allReducers = combineReducers({
    users:userReducer,
    posts:postReducer
})

export default  allReducers;