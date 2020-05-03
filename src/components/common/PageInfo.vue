<template>
    <div>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-count="$store.state.pageSum"
                :current-page="$store.state.pageIndex"
                @current-change="pageIndex=>$store.dispatch(actionName,{
                ...{pageIndex},
                ...query
                })"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PageInfo",
        props:{
            actionName:{
                type:String,
                default:""
            },
            query:{
                // 设置的类型是一个对象或者数组，默认值需要通过工厂模式进行生成
                type:Object,
                default: ()=>{return {}}
            }
        },
        mounted() {
            this.$store.dispatch(this.actionName,this.query)
        }
    }
</script>

<style scoped>

</style>