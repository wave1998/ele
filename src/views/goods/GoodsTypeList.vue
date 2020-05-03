<template>
    <div>
        <div class="toolbar">

            <el-form :inline="true" class="demo-form-inline">
<!--                <el-form-item label="部门名称">-->
<!--                    <el-input placeholder="部门名称" v-model="goodsTypeForm.goodsTypeName" ></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="部门所属公司"  label-width="120px">
                    <el-select v-model="goodsTypeForm.shopTypeId" @change="$store.dispatch('getAllShopList',goodsTypeForm.shopTypeId),goodsTypeForm.shopId = ''" placeholder="请选择公司类别">
                        <el-option
                                v-for="item in $store.state.shop.allShopTypeList"
                                :key="item._id"
                                :value="item._id"
                                :label="item.shopTypeName"
                        ></el-option>
                    </el-select>
                    <el-select v-model="goodsTypeForm.shopId" placeholder="请选择公司" @change="$store.dispatch('getGoodsTypeList',{shopId:goodsTypeForm.shopId})">
                        <el-option
                                v-for="item in $store.state.shop.allShopList"
                                :key="item._id"
                                :value="item._id"
                                :label="item.shopName"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success"  @click="goodsTypeVisible=true">添加部门</el-button>
                </el-form-item>

            </el-form>
        </div>


        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data = "$store.state.goods.goodsTypeList"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column label="上传日期" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="公司名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>

            <el-table-column label="部门" width="250">
                <template slot-scope="scope">
                    {{scope.row.goodsTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="success"  size="mini" @click="$router.push({name:'goodsList',params:{shopTypeId:scope.row.shopTypeId,shopId:scope.row.shopId,goodsTypeId:scope.row._id}})">查看该部门下的职位</el-button>
                    <el-button type="success"  size="mini" @click="goodsId=scope.row._id,goodsTypeVisible=true">添加部门</el-button>
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="goodsTypeList" action-name="getGoodsTypeList"></Delete>
                </template>
            </el-table-column>
        </el-table>

        <GoodsTypeDialog v-if="goodsTypeVisible" :visible.sync="goodsTypeVisible" ></GoodsTypeDialog>
        <PageInfo action-name="getGoodsTypeList" :query="goodsTypeForm"></PageInfo>
    </div>
</template>

<script>
    export default {
        name: "GoodsTypeList",
        data(){
            return {
                goodsTypeVisible:false,
                goodsTypeForm:{
                    goodsTypeName:"",
                    shopTypeId:"",
                    shopId:"",
                    goodsTypeId:"",
                }
            }
        },
        created(){
            if(this.$route.params.shopTypeId)
                this.goodsTypeForm.shopTypeId = this.$route.params.shopTypeId
            if(this.$route.params.shopId)
                this.goodsTypeForm.shopId = this.$route.params.shopId
        },
        mounted(){
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
        }
    }
</script>

<style scoped>

</style>
