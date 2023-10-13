import { BASE_URL } from "./baseurl"
import { commonRequest } from "./commonRequest"

export const getAllblogs = async () => {
    return await commonRequest('GET',`${BASE_URL}/getallposts`)
}

export const userPosts = async (username) => {
    return await commonRequest('GET',`${BASE_URL}/userposts/${username}`)
}

export const signinLogic = async (body) => {
    return await commonRequest('POST',`${BASE_URL}/signin`,body)
}

export const registerLogic = async (body) => {
    return await commonRequest('POST',`${BASE_URL}/register`,body)
}

export const newPost = async (body) => {
    return await commonRequest('POST',`${BASE_URL}/newpost`,body)
}

export const editpost = async (postId, body) => {
    return await commonRequest('PUT',`${BASE_URL}/editpost/${postId}`,body)
}

export const deleteUser = async (userId) => {
    return await commonRequest('DELETE',`${BASE_URL}/deleteuser/${userId}`)
}

export const deletePost = async (postId) => {
    return await commonRequest('DELETE',`${BASE_URL}/deletepost/${postId}`)
}

export const editUser = async (userId, body) => {
    return await commonRequest('PUT',`${BASE_URL}/edituser/${userId}`,body)
}