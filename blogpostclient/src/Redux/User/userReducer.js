import { addUserDetails, changeUserEmail, changeUserProfileDetails, deleteUserDetails } from "./actionTypes";

const initialState = {};

export default function userReducer(state = initialState, action)  {
    switch (action.type) {
        case addUserDetails:
            return{
                ...state,
                userDetails: action.payload
            };
        
        case deleteUserDetails:
            return {};

        case changeUserProfileDetails:
            const userId = state.userDetails.userId;
            if(userId === action.payload.userId){
                return {
                    ...state, 
                    userDetails:{
                        userId:action.payload.userId,
                        profileId:state.userDetails.profileId,
                        email:state.userDetails.email,
                        displayName:action.payload.displayName,
                        description:action.payload.description
                    }
                }
                
            }
           return state;

          case changeUserEmail:
            const id = state.userDetails.userId;
            if(id === action.payload.userId){
                return{
                    ...state,
                    userDetails:{
                        userId:action.payload.userId,
                        profileId:state.userDetails.profileId,
                        displayName:state.userDetails.displayName,
                        description:state.userDetails.description,
                        email:action.payload.email
                    }
                }
            }
            return state;
    
        default:
            return state;
    }
}
