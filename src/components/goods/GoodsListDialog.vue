<template>
    <!--        <el-dialog title="添加公司类型" :visible.sync="goodsListVisible">-->
    <el-dialog title="添加职位" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)">
        <el-form >
            <el-form-item label="职位名称"  label-width="120px" >
                <el-input  autocomplete="off" v-model="goodsListForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="公司类别"  label-width="120px">
                <el-select v-model="goodsListForm.shopTypeId" @change="$store.dispatch('getAllShopList',goodsListForm.shopTypeId),goodsListForm.shopId = ''" placeholder="请选择公司类别">
                    <el-option
                            v-for="item in $store.state.shop.allShopTypeList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopTypeName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司名称"  label-width="120px">
                <el-select v-model="goodsListForm.shopId" placeholder="请选择公司" @change="$store.dispatch('getAllGoodsTypeList',goodsListForm.shopId),goodsListForm.goodsTypeId = ''">
                    <el-option
                            v-for="item in $store.state.shop.allShopList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门"  label-width="120px">
                <el-select v-model="goodsListForm.goodsTypeId" placeholder="请选择部门" >
                    <el-option
                            v-for="item in $store.state.goods.allGoodsTypeList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.goodsTypeName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位薪资（/天）"  label-width="120px">
                <el-input autocomplete="off" v-model="goodsListForm.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="是否热门"  label-width="120px" >
                <el-radio v-model="goodsListForm.isTop" :label="true">是</el-radio>
                <el-radio v-model="goodsListForm.isTop" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="职位图片：" label-width="120px">
                <el-upload
                        :on-success="success"
                        name="goodsPic"
                        ref="upload"
                        class="upload-demo"
                        action="/ele/goodsList"
                        :headers="{
                            authorization:$store.state.admin.token
                        }"
                        :data="goodsListForm"
                        :auto-upload="false"
                        :limit="1"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <el-button type="primary" @click="addGoodsList">提交</el-button>
        </div>
    </el-dialog>
    
</template>

<script>
    export default {
        name: "GoodsListDialog",
        props:["visible","shopTypeId","shopId","goodsTypeId"],
        data(){
            return {
                goodsListForm:{
                    goodsName:"",
                    shopTypeId:"",
                    shopId:"",
                    goodsPrice:"",
                    goodsTypeId:"",
                    isTop:false,
                },
            }
        },
        methods:{
            addGoodsList(){
                this.$refs.upload.submit()
            },
            success(res){
                if(res.ok === 1){
                    if (this.$route.name === "goodsList")
                        this.$store.dispatch("getGoodsList");
                    else
                        this.$router.push("/goodsList")
                }
                this.$emit("update:visible",false);
            }
        },
        created(){
            if(this.shopTypeId)
                this.goodsListForm.shopTypeId = this.shopTypeId;
            if(this.shopId)
                this.goodsListForm.shopId = this.shopId;
            if(this.goodsTypeId)
                this.goodsListForm.goodsTypeId=this.goodsTypeId;
        },
        mounted() {
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
        }
    }
</script>

<style scoped>

</style>
