<template>
    <div>
        <el-select v-model="shopTypeId" @change="$store.dispatch('getShopList',{shopTypeId})">
            <el-option
                    v-for="item in $store.state.shop.allShopTypeList"
                    :key="item._id"
                    :value="item._id"
                    :label="item.shopTypeName"
            >
            </el-option>
        </el-select>
        <el-button type="success" @click="isShopType=true">添加公司类别</el-button>
        <el-button type="success" @click="shopListVisible=true">添加公司</el-button>
<!--        渲染-->
        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopList"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column
                    label="上传日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司名称">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>
            <el-table-column label="公司类别">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="公司图片">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.shopPic" alt="" width="100">
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="goodsTypeVisible=true,shopTypeDialog=scope.row.shopTypeId,shopId=scope.row._id">添加部门</el-button>
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="shopList" action-name="getShopList"></Delete>
                </template>
            </el-table-column>
        </el-table>

        <PageInfo action-name="getShopList" :query="{shopTypeId}"></PageInfo>
        <ShopListDialog v-if="shopListVisible" :shop-list-visible.sync="shopListVisible" :shop-type-id="shopTypeId"></ShopListDialog>
        <ShopTypeDialog v-if="isShopType" :visible.sync="isShopType" ></ShopTypeDialog>
        <GoodsTypeDialog v-if="goodsTypeVisible" :visible.sync="goodsTypeVisible" :shop-type-id="shopTypeDialog" :shop-id="shopId"></GoodsTypeDialog>
    </div>

</template>

<script>
    export default {
        name: "shopList",
        data(){
            return {
                shopListVisible:false,
                isShopType:false,
                shopTypeId:"",
                goodsTypeVisible:false,
                shopId:"",
                shopTypeDialog:"",
            }
        },
        created(){
          if(this.$route.params.shopTypeId)
            this.shopTypeId = this.$route.params.shopTypeId
        },
        mounted() {
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
        }
    }
</script>

<style scoped>

</style>
