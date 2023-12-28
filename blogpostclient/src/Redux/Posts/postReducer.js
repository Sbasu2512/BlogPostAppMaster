import {
  addAllPosts,
  addUserPosts,
  UpdateUserPosts,
  updatePostStore
} from "./actionTypes";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case addUserPosts:
      return {
        ...state,
        userPosts: action.payload,
      };

    case addAllPosts:
      return {
        ...state,
        AllPosts: action.payload,
      };

    case UpdateUserPosts:
      state.userPosts.user_posts.push(action.payload);
      return { ...state };

    case updatePostStore:
      state.AllPosts.push(action.payload);
      return { ...state };
      
    default:
      return state;
  }
}
