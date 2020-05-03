import axios from "axios";
const state = {
    shopTypeList:[],
    allShopTypeList:[],
    shopList:[],
    allShopList:[],
};
const mutations = {
    CHANGE_SHOP_TYPE_LIST(state,shopTypeList){
        state.shopTypeList = shopTypeList
    }
};
const actions = {
    async getShopTypeList({commit},query={}){
        const {pageIndex=1,shopTypeName=""} = query
        const data = await axios.get('/shopTypeList',{
            params:{
                pageIndex,
                shopTypeName,
            }
        })
        commit("CHANGE_SHOP_TYPE_LIST",data.shopTypeList);
        commit("CHANGE_PAGE_INFO",data)
    },
    //用于下拉菜单的店铺类型列表
    async getAllShopTypeList({state}){
        const data = await axios.get("/allShopTypeList");
        state.allShopTypeList = data.shopTypeList;
    },
    //用于下拉菜单的店铺列表
    async getAllShopList({state},shopTypeId){
      const data = await axios.get("/allShopList/"+shopTypeId);
      state.allShopList = data.shopList;
    },
    async getShopList(content,query={}){
        const {pageIndex=1,shopTypeId=""} = query;
        const data = await axios.get("shopList",{
            params:{
                pageIndex,
                shopTypeId,
            }
        })
        content.state.shopList = data.shopList;
        content.commit("CHANGE_PAGE_INFO",data)
    },


}
export default {
    state,
    actions,
    mutations,
}