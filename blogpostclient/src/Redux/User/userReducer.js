import { createSlice } from "@reduxjs/toolkit";
import { addUserDetails, changeUserDetails, deleteUserDetails } from "./actionTypes";

const initialState = {};

export default function userReducer(state = initialState, action)  {
    switch (action.type) {
        case addUserDetails:
            console.log('data from user reducer',action.payload);
            return{
                ...state,
                userDetails: action.payload
            };
        
        case deleteUserDetails:
            return {};

        case changeUserDetails:
            console.log('changeUserDetails',state);
            break;
    
        default:
            console.log('hit default trying:',action);
            return state;
    }
}

// const userSlice = createSlice({
//     name:'users',
//     initialState: {},
//     reducers:{
//         addUserDetails(state, action) {
//             state.users.push({
//                 payload:action.payload,
//                 type:addUserDetails
//             })
//         }
//     }
// })