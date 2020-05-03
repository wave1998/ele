import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import shop from './shop'
import goods from './goods'
import axios from 'axios'


Vue.use(Vuex)
const state = {
  isLoading:false,

  pageIndex:1,
  pageSum:1,
}
const mutations = {
  CHANGE_LOADING(state, bol) {
    state.isLoading = bol;
  },
  CHANGE_PAGE_INFO(state,data){
    state.pageSum = data.pageSum,
    state.pageIndex = data.pageIndex
  },

}
const actions = {
  //删除
  async delete(content,{id,collName}){
    const data = await axios.delete('/del?id='+id+"&collName="+collName);
  },
  //更新
  async update(content,{id,collName}){
    const data = await axios.put('/update?id='+id+"&collName="+collName);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    admin,
    shop,
    goods,
  }
})
