import axios from "axios";

const state = {
    adminName: localStorage.adminName,
    token: localStorage.token,

    adminLog: [],
    adminList:[],
};
const mutations = {
    CHANGE_LOGIN_INFO(state, info) {
        state.adminName = localStorage.adminName = info.adminName;
        state.token = localStorage.token = info.token;
    },
    //退出登录
    OUT_LOGIN(state) {
        localStorage.clear();
        state.adminName = state.token = null;
    },
    CHANGE_ADMIN_LOG(state, data) {
        state.adminLog = data.adminLog
    },
    CHANGE_ADMIN_LIST(state,data){
        state.adminList = data.adminList
    }
};
const actions = {
    // 登录
    async login(content, params) {
        const data = await axios.post("/login", params);
        return data;
    },
    // 获取管理员日志
    async getAdminLog(content,query={}) {
        const {pageIndex=1}=query;
        const data = await axios.get("/adminLog", {
            params:{
                pageIndex
            }
        });
        content.commit("CHANGE_ADMIN_LOG", data);
        content.commit("CHANGE_PAGE_INFO",data);
        return data
    },
    // 获取管理员列表
    async getAdminList(content,query={}){
        const {pageIndex=1} = query;
        const data = await axios.get("/adminList",{
            params:{
                pageIndex
            }
        });
        content.commit("CHANGE_ADMIN_LIST",data);
        content.commit("CHANGE_PAGE_INFO",data);
        return data;
    },
    //验证密码是否正确
    async verifyPassWord(content,params){
        const data = await axios.post("/verifyPassWord",params);
        return data;
    },
    //更改密码
    async updatePassWord(content,params){
        const data = await axios.put("/updatePassWord",params);
        return data;
    }
};
export default {
    state,
    actions,
    mutations,
}