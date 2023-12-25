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
            return{
                ...state,
                userPosts:{
                    user_posts:action.payload
                }
            }
        
        case addAllPosts:
            return{
                ...state,
                AllPosts: action.payload
            }

        case updatePostStore:
            return{
                ...state,
                AllPosts:action.payload
            }
        break;
    
        default:
            // console.log('hit default trying:',action);
            return state;
    }
}