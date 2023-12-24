import { addAllPosts, deleteAllPosts, deleteSomePosts, addUserPosts, UpdateUserPosts, deleteUserPosts, updatePostStore } from "./actionTypes";

const initialState = {};

export default function postReducer(state = initialState, action)  {
    switch (action.type) {
        case addUserPosts:
            //console.log('data from POst Reducer user post', action.payload);
            return{
                ...state,
                userPosts: action.payload
            }

        
        case deleteUserPosts:
            return {};

        case UpdateUserPosts:
            console.log(state);
            console.log(action.payload);
            break;
        
        case addAllPosts:
            console.log('data from POst Reducer all post', action.payload);
            return{
                ...state,
                AllPosts: action.payload
            }

        case updatePostStore:
            console.log(state);
            console.log(action.payload);
        break;
    
        default:
            // console.log('hit default trying:',action);
            return state;
    }
}