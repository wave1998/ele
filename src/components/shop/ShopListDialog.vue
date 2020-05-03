<template>
<!--        <el-dialog title="添加公司类型" :visible.sync="shopListVisible">-->
    <el-dialog title="添加公司" :visible="shopListVisible" @update:visible="(bol)=>$emit('update:shop-list-visible',bol)">
        <el-form >
            <el-form-item label="公司名称"  label-width="120px" >
                <el-input  autocomplete="off" v-model="shopListForm.shopName"></el-input>
            </el-form-item>
            <el-form-item label="公司类别"  label-width="120px">
                <el-select v-model="shopListForm.shopTypeId" >
                    <el-option
                        v-for="item in $store.state.shop.allShopTypeList"
                        :key="item._id"
                        :value="item._id"
                        :label="item.shopTypeName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否推荐"  label-width="120px" >
                <el-radio v-model="shopListForm.isTop" :label="true">是</el-radio>
                <el-radio v-model="shopListForm.isTop" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="公司图片：" label-width="120px">
                <el-upload
                        :on-success="success"
                        name="shopPic"
                        ref="upload"
                        class="upload-demo"
                        action="/ele/shopList"
                        :data="shopListForm"
                        :headers="{
                            authorization:$store.state.admin.token
                        }"
                        :auto-upload="false"
                        :limit="1"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:shop-list-visible',false)">取 消</el-button>
            <el-button type="primary" @click="shopListSubmit">提交</el-button>
        </div>
    </el-dialog>
    
</template>

<script>
    export default {
        name: "ShopListDialog",
        props:["shopListVisible","shopTypeId"],
        data(){
            return {
                shopListForm:{
                    shopName:"",
                    shopTypeId:"",
                    isTop:false,
                }
            }
        },
        methods:{
            success(res){
                // 添加成功时，执行的函数
                if(res.ok===1){
                    if(this.$route.name === "shopList"){
                        this.$store.dispatch("getShopList")
                        this.$emit('update:shop-list-visible',false)
                    }else{
                        this.$router.push("/shopList")
                    }
                }else{
                    alert(res.msg)
                }
            },
            shopListSubmit(){
                this.$refs.upload.submit()
            }
        },
        mounted() {
            if(this.shopTypeId)
                this.shopListForm.shopTypeId = this.shopTypeId
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
        }
    }
</script>

<style scoped>

</style>
