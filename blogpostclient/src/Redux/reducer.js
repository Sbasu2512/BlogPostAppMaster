import { addUserDetails, changeUserDetails, deleteUserDetails } from "./actionTypes";

const initialState = {};

export default function userReducer  (state = initialState ,action)  {
    switch (action.type) {
        case addUserDetails:
            console.log('data', action.payload);
            return{
                ...state,
                userDetails: action.payload
            }
        
        case deleteUserDetails:
            return {};

        case changeUserDetails:
            console.log(state);
            break;
    
        default:
            break;
    }
}