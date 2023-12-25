import { addAllPosts, deleteAllPosts, deleteSomePosts, addUserPosts, UpdateUserPosts, deleteUserPosts, updatePostStore } from "./actionTypes";

const initialState = {};

export default function postReducer(state = initialState, action)  {
    switch (action.type) {
        case addUserPosts:
            return{
                ...state,
                userPosts: action.payload
            }

        
        case deleteUserPosts:
            return {...state};

        case UpdateUserPosts:
            console.log(state);
            console.log(action.payload);
            state.userPosts.user_posts.push(action.payload);
            return {...state}
        
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
        
    
        default:
            // console.log('hit default trying:',action);
            return state;
    }
}