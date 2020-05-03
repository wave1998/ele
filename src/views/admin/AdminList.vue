<template>
    <div>
        <el-table
                v-loading="$store.state.isLoading"
                :border=true
                :data="$store.state.admin.adminList"
                style="width: 100%">
            <el-table-column label="ID" width="250">
                <template slot-scope="scope" ref="Id">
                    {{scope.row._id}}
                </template>
            </el-table-column>

            <el-table-column label="管理员名称">
                <template slot-scope="scope">
                    {{scope.row.adminName}}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="dialogFormVisible = true , adminForm.adminName = scope.row.adminName" >改密</el-button>
            <!--            /*********************更改密码*******************************/-->
                    <el-dialog title="更改密码" :visible.sync="dialogFormVisible">

                        <el-form :rules="rules" :model="adminForm" ref="adminForm">
                            <el-form-item label="用户名" prop="adminName">
                                <el-input  autocomplete="off" v-model="adminForm.adminName"></el-input>
                            </el-form-item>
                            <el-form-item label="原密码" prop="passWord" >
                                <el-input type="passWord" autocomplete="off" v-model="adminForm.passWord" @blur="Verify"></el-input>
                                <span :class="passwordFalse">密码不正确</span>
                            </el-form-item>
                            <el-form-item label="新密码密码" prop="newPassWord">
                                <el-input type="passWord" autocomplete="off" v-model="adminForm.newPassWord" @blur="compare"></el-input>
                                <span :class="spanClass1">不能和原密码一样</span>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="rePassWord">
                                <el-input type="passWord" autocomplete="off" v-model="adminForm.rePassWord" @blur="compare"></el-input>
                                <span :class="spanClass2">两次密码不一致</span>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="update">确 定</el-button>
                        </div>
                    </el-dialog>
                <!--/************************删除操作***********************************/-->
                    <Delete :id="scope.row._id" :pageIndex="$store.state.pageIndex" collName="adminList" action-name="getAdminList"></Delete>
                </template>
            </el-table-column>

        </el-table>
        <PageInfo action-name="getAdminList"></PageInfo>
    </div>
</template>

<script>
    export default {
        name: "adminList",
        data() {
            return {
                dialogFormVisible:false,
                spanClass1:"",
                spanClass2:"",
                passwordFalse:"",
                adminForm:{
                    adminName:"",
                    passWord:"",
                    newPassWord:"",
                    rePassWord:""
                },
                rules:{
                    adminName: [
                        { required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                    ],
                    newPassWord: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                    ],
                    rePassWord: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            async Verify(){
                const data = await this.$store.dispatch("verifyPassWord",this.adminForm)
                console.log(data)
                if(data.ok !== 1){
                    this.adminForm.passWord="";
                    this.passwordFalse = "active"
                }else{
                    this.passwordFalse=""
                }
            },
            compare(){
                if(this.adminForm.newPassWord === this.adminForm.passWord){
                    this.adminForm.newPassWord=""
                    this.spanClass1="active"
                }else{
                    this.spanClass1=""
                }
                if(this.adminForm.newPassWord !== this.adminForm.rePassWord){
                    this.adminForm.rePassWord=""
                    this.spanClass2="active"
                }else {
                    this.spanClass2=""
                }
            },
            async update(){
                this.dialogFormVisible = false;
                const data = await this.$store.dispatch("updatePassWord",this.adminForm)
                if(data.ok === 1){
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'success'
                    });
                }else{
                    this.$message.error(data.msg)
                }
            }
        }
    }
</script>

<style scoped>
span{
    float: left;
    font-size: 10px;
    color: red;
    display: none;
}
button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 7px 15px;
    margin:5px;
}

    .active{
        display: block;
    }
</style>