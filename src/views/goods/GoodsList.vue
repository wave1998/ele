<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="公司及职位类别"  label-width="120px">
                <el-select v-model="goodsListForm.shopTypeId" @change="$store.dispatch('getAllShopList',goodsListForm.shopTypeId),goodsListForm.shopId = ''" placeholder="请选择公司类别">
                    <el-option
                            v-for="item in $store.state.shop.allShopTypeList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopTypeName"
                    ></el-option>
                </el-select>
                <el-select v-model="goodsListForm.shopId" placeholder="请选择公司" @change="$store.dispatch('getAllGoodsTypeList',goodsListForm.shopId),goodsListForm.goodsTypeId = ''">
                    <el-option
                            v-for="item in $store.state.shop.allShopList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopName"
                    ></el-option>
                </el-select>
                <el-select v-model="goodsListForm.goodsTypeId" @change="$store.dispatch('getGoodsList',goodsListForm)" placeholder="职位类别">
                    <el-option
                            v-for="item in $store.state.goods.allGoodsTypeList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.goodsTypeName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="goodsListVisible=true">添加职位</el-button>
            </el-form-item>
        </el-form>
<!--        渲染-->
        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.goods.goodsList"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="职位名称" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司名称">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>
            <el-table-column label="部门">
                <template slot-scope="scope">
                    {{scope.row.goodsTypeName}}
                </template>
            </el-table-column>


            <el-table-column label="职位薪资（/天）">
                <template slot-scope="scope">
                    {{scope.row.goodsPrice}}
                </template>
            </el-table-column>

            <el-table-column label="是否热门">
                <template slot-scope="scope">
                    {{scope.row.isTop}}
                </template>
            </el-table-column>

            <el-table-column label="职位图片">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.goodsPic" alt="" width="100">
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">

                    <el-button size="mini" type="success" @click="goodsTypeVisible=true,shopTypeDialog=scope.row.shopTypeId,shopId=scope.row.shopId">添加部门</el-button>
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="goodsList" action-name="getGoodsList"></Delete>
                </template>
            </el-table-column>
        </el-table>


        <GoodsListDialog v-if="goodsListVisible" :visible.sync="goodsListVisible" :shop-type-id="goodsListForm.shopTypeId" :shop-id="goodsListForm.shopId" :goods-type-id="goodsListForm.goodsTypeId"></GoodsListDialog>
        <GoodsTypeDialog v-if="goodsTypeVisible" :visible.sync="goodsTypeVisible" ></GoodsTypeDialog>
        <PageInfo action-name="getGoodsList" :query="goodsListForm"></PageInfo>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data(){
            return {
                updataGoodsListVisible:false,
                goodsListVisible:false,
                goodsTypeVisible:false,
                goodsListForm:{
                    goodsTypeId: "",
                    shopTypeId:"",
                    shopId:"",
                },
                shopTypeId:"",
                shopId:"",
                shopTypeDialog:"",
            }
        },
        created(){
            if(this.$route.params.shopTypeId)
                this.goodsListForm.shopTypeId = this.$route.params.shopTypeId
            if(this.$route.params.shopId)
                this.goodsListForm.shopId = this.$route.params.shopId
            if(this.$route.params.goodsTypeId)
                this.goodsListForm.goodsTypeId = this.$route.params.goodsTypeId
        },
        mounted() {
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
        }
    }
</script>

<style scoped>

</style>
