import { addUserPosts,addAllPosts } from "../Redux/Posts/actionTypes"

const addUserPostsAction = (data) => {
    return{
        type: addUserPosts,
        payload: data
    }
}

const addAllPostsAction = (data) => {
    return {
        type: addAllPosts,
        payload: data
    }
}


export {addUserPostsAction, addAllPostsAction}