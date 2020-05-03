<template>
    <div>
        <el-table
                v-loading="$store.state.isLoading"
                :border=true
                :data="$store.state.admin.adminLog"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope" ref="Id">
                    {{scope.row.adminId}}
                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.loginTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="管理员名称">
                <template slot-scope="scope">
                    {{scope.row.adminName}}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="adminLog" action-name="getAdminLog"></Delete>
                </template>
            </el-table-column>
        </el-table>
        <PageInfo action-name="getAdminLog"></PageInfo>
    </div>
</template>

<script>
    export default {
        name: "AdminLog",
    }
</script>

<style scoped>

</style>