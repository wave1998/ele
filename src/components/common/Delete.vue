<template>
    <el-button type="danger" @click="open" size="mini">删除</el-button>
</template>

<script>
    import axios from 'axios'
    export default {
        props:["id","pageIndex","collName","actionName"],
        name: "delete",
        methods: {
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$store.dispatch("delete",{id:this.id,collName:this.collName});
                    this.$store.dispatch(this.actionName,{pageIndex:this.$store.state.pageIndex})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>