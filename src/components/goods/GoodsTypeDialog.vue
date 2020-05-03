<template>
    <el-dialog title="添加部门" :visible="visible" @update:visible="(bol)=>$emit('update:visible',bol)">
        <el-form >
            <el-form-item label="部门名称："  label-width="120px">
                <el-input  autocomplete="off" v-model="goodsTypeForm.goodsTypeName"></el-input>
            </el-form-item>
            <el-form-item label="部门所属公司"  label-width="120px">
                <el-select v-model="goodsTypeForm.shopTypeId" @change="$store.dispatch('getAllShopList',goodsTypeForm.shopTypeId),goodsTypeForm.shopId = ''" placeholder="请选择公司类别">
                    <el-option
                        v-for="item in $store.state.shop.allShopTypeList"
                        :key="item._id"
                        :value="item._id"
                        :label="item.shopTypeName"
                    ></el-option>
                </el-select>
                <el-select v-model="goodsTypeForm.shopId" placeholder="请选择公司">
                    <el-option
                            v-for="item in $store.state.shop.allShopList"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopName"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:visible',false)">取 消</el-button>
            <el-button type="primary" @click="addGoodsType" >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "GoodsTypeDialog",
        props:["visible","shopTypeId","shopId"],
        data(){
            return{
                goodsTypeForm:{
                    goodsTypeName:"",
                    shopTypeId:"",
                    shopId:"",
                }
            }
        },
        methods:{
            async addGoodsType(){
                const data = await this.$store.dispatch("addGoodsTypeList",this.goodsTypeForm)
                if(data.ok === 1){
                    if(this.$route.name==="goodsTypeList"){
                        this.$emit("update:visible",false)
                        this.$message({
                            type:"success",
                            message:data.msg
                        })
                    }else{
                        this.$router.push({name:'goodsTypeList',params:{shopTypeId:this.goodsTypeForm.shopTypeId,shopId:this.goodsTypeForm.shopId}})
                        this.$router.push("/goodsTypeList")
                    }
                }
            }
        },
        created(){
            if(this.shopTypeId)
                  this.goodsTypeForm.shopTypeId = this.shopTypeId;
            if(this.shopId)
                    this.goodsTypeForm.shopId = this.shopId;
        },
        mounted() {
            if(this.$store.state.shop.allShopTypeList.length<1)
                this.$store.dispatch("getAllShopTypeList")
            if(this.shopId)
                this.$store.dispatch("getAllShopList",this.shopTypeId)
        }
    }
</script>

<style scoped>

</style>
