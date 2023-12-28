import { addUserPosts,addAllPosts, UpdateUserPosts, updatePostStore} from "../Redux/Posts/actionTypes"

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

// to update the store of all user posts -- called upon refetching
const updateUserPostsAction = (data) => {
    return{
        type:UpdateUserPosts,
        payload:data
    }
}

const updateAllPostsAction = (data) => {
    return {
        type:updatePostStore,
        payload:data
    }
}


export {
    addUserPostsAction, 
    addAllPostsAction, 
    updateUserPostsAction,
    updateAllPostsAction
}