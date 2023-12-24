import { addUserDetails, deleteUserDetails, changeUserProfileDetails, changeUserEmail } from "../Redux/User/actionTypes";


const addUserDetailsAction = (data) => {
    return{
        type: addUserDetails,
        payload: data
    }
}

const updateUserDetailsAction = (data) => {
    return{
        type: changeUserProfileDetails,
        payload:data
    }
}

const updateUserEmail = (data) => {
    return{
        type:changeUserEmail,
        payload:data
    }
}

const deleteUserDetailsAction = () => {
    return{
        type: deleteUserDetails
    }
}

export { addUserDetailsAction, updateUserDetailsAction, deleteUserDetailsAction, updateUserEmail}