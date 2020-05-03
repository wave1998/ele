import axios from "axios";
const state = {
    goodsTypeList:[],
    allGoodsTypeList:[],
    goodsList:[],
}

const actions = {
    async addGoodsTypeList(content,params) {
        const data = await axios.post("/goodsTypeList",params)
        return data;
    },
    async getGoodsTypeList({state,commit},query={}){
        const {pageIndex=1,shopId=""} = query;
        const data = await axios.get("/goodsTypeList",{
            params:{
                pageIndex,
                shopId,
            }
        })

        state.goodsTypeList = data.goodsTypeList;
        commit("CHANGE_PAGE_INFO",data)
    },

    //用于下拉菜单的商品类型列表
    async getAllGoodsTypeList({state},shopId){
        const data = await axios.get("/goodsTypeList/"+shopId);
        state.allGoodsTypeList = data.goodsTypeList;
    },
    //用于渲染页面的商品列表
    async getGoodsList({state,commit},query={}){
        const {pageIndex=1,goodsTypeId=""} = query;
        const data = await axios.get("/goodsList",{
            params:{
                pageIndex,
                goodsTypeId,
            }
        })
        state.goodsList = data.goodsList;
        commit("CHANGE_PAGE_INFO",data)
    }
}
export default {
    state,
    actions,
}