<template>
<!--    <el-dialog title="添加公司类型" :visible.sync="dialogFormVisible">-->
        <el-dialog :title="title+'公司类别'" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)">
        <el-form >
            <el-form-item label="公司类别名称"  label-width="120px">
                <el-input  autocomplete="off" v-model="shopTypeForm.shopTypeName"></el-input>
            </el-form-item>
            <el-form-item label="公司图片：" label-width="120px">
                <el-upload
                        :on-success="success"
                        :file-list="fileList"
                        name="shopTypePic"
                        ref="upload"
                        class="upload-demo"
                        action="/ele/shopType"
                        :data="shopTypeForm"
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
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <el-button type="primary" @click="addShopType">{{title}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import axios from "axios"
    export default {
        name: "ShopTypeDialog",
        props:{
            visible:{
                type:Boolean,
                default:false,
            },
            shopTypeId:{
                type:String,
                default: "",
            }
        },
        data(){
            return {
                dialogFormVisible:false,
                title:"添加",
                fileList:[],
                shopTypeForm:{
                    shopTypeName:""
                },
            }
        },
        methods:{
            async addShopType(){
                if(this.shopTypeId.length>0){
                    const formdata = new FormData();
                    formdata.set("shopTypeId",this.shopTypeId);
                    formdata.set("shopTypeName",this.shopTypeForm.shopTypeName);
                    formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
                    const data = await  axios.put("/shopTypeList",formdata)
                    if(data.ok===1){
                        this.success(data)
                    }
                }else{
                    this.$refs.upload.submit()
                }
            },
            success(res){
                if(res.ok === 1){
                    if (this.$route.name === "shopTypeList")
                        this.$store.dispatch("getShopTypeList");
                    else
                        this.$router.push("/shopTypeList")
                }
                this.$emit("update:visible",false);
                console.log(res);
            }
        },
        created() {
            console.log(this.shopTypeId)
            if(this.shopTypeId.length>0)
                console.log(13)
                this.title="修改"
        },
        async mounted() {
            if(this.shopTypeId.length>0){
                const data =await axios.get("/getShopTypeById",{
                    params:{
                            shopTypeId:this.shopTypeId
                        }
                })
                console.log(data.shopTypeInfo)
                this.shopTypeForm.shopTypeName = data.shopTypeInfo.shopTypeName
                this.fileList= [
                    {
                     name: data.shopTypeInfo.shopTypePic,
                     url: '/ele/'+data.shopTypeInfo.shopTypePic,
                    }]
            }
        }
    }
</script>

<style scoped>

</style>
