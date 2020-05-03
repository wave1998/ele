<template>

    <div class="toolbar">
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="公司类别名称">
                    <el-input placeholder="公司类别名称" v-model="shopTypeName" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$store.dispatch('getShopTypeList',{shopTypeName})">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success"  @click="isShopType=true,shopTypeId=''">添加公司类别</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopTypeList"
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
            <el-table-column label="公司类别名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="公司类别图片" width="250">
                <template slot-scope="scope">
                    <img :src="'/ele/'+scope.row.shopTypePic" alt="" width="100">
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="success"  size="mini" @click="$router.push({name:'shopList',params:{shopTypeId:scope.row._id}})">查看该类别下的公司</el-button>
                    <el-button type="success"  size="mini" @click="shopTypeId=scope.row._id,shopListVisible=true">添加公司</el-button>
                    <el-button type="danger" size="mini" @click="isShopType=true,shopTypeId=scope.row._id" >修改</el-button>
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="shopTypeList" action-name="getShopTypeList"></Delete>
                </template>
            </el-table-column>
        </el-table>

        <PageInfo action-name="getShopTypeList" :query="{shopTypeName}"></PageInfo>

        <ShopListDialog :shop-type-id="shopTypeId" v-if="shopListVisible" :shop-list-visible.sync="shopListVisible"></ShopListDialog>
        <ShopTypeDialog ref="shopTypeDialog" :shop-type-id="shopTypeId" v-if="isShopType" :visible.sync="isShopType"></ShopTypeDialog>
<!--            <el-dialog title="添加公司类型" :visible.sync="dialogFormVisible">-->
<!--                <el-form >-->
<!--                    <el-form-item label="公司名称"  label-width="120px">-->
<!--                        <el-input  autocomplete="off" v-model="shopTypeForm.shopTypeName"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="公司图片：" label-width="120px">-->
<!--                        <el-upload-->
<!--                                name="shopTypePic"-->
<!--                                ref="upload"-->
<!--                                class="upload-demo"-->
<!--                                action="/ele/shopType"-->
<!--                                :data="shopTypeForm"-->
<!--                                :auto-upload="false"-->
<!--                                :limit="1"-->
<!--                                list-type="picture">-->
<!--                            <el-button size="small" type="primary">点击上传</el-button>-->
<!--                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                        </el-upload>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--                <div slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                    <el-button type="primary" @click="addShopType">确 定</el-button>-->
<!--                </div>-->
<!--            </el-dialog>-->


    </div>
</template>

<script>
    export default {
        name: "shopTypeList",
        data(){
            return {
                isShopType:false,
                shopListVisible:false,
                shopTypeId:"",
                shopTypeName:"",
            }
        },
        methods:{
            addShopType(){
                this.isShopType = true;
                setTimeout(()=>{
                    this.$refs.shopTypeDialog.dialogFormVisible = true;
                    console.log(this.$refs.shopTypeDialog);
                },100)
            }
        },
    }
</script>

<style scoped>

</style>
