import axios from '@/utils/request';

// 登录
export const $login = (params) => axios.post("/auth/local", params)
// 获取用户列表
export const $fetchUsers = () => axios.get("/bears", {
    params: {
        sort: 'createdAt:desc'
    }
})
// 添加用户
export const $addUser = (params) => axios.post("/bears", params)
// 删除用户
export const $deleteUserById = (id) => axios.delete(`/bears/${id}`)
// 获取单个用户信息
export const $fetchUserById = (id) => axios.get(`/bears/${id}`)
// 更新用户信息
export const $updateUserById = (id, params) => axios.put(`/bears/${id}`, params)
// 获取头像
export const $fetchAvatar = () => axios.get('/upload/files')
// 上传文件
// export const $upload=()=>


