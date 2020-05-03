<template>
    <el-form class="container" :rules="rules" :model="adminForm" ref="adminForm">
        <h3>大学生兼职后台管理系统{{$store.state.admin.adminName}}</h3>
        <el-form-item  prop="adminName">
            <el-input placeholder="请输入管理员账号" v-model="adminForm.adminName"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
            <el-input type="passWord" placeholder="请输入管理员密码" v-model="adminForm.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="width:100%;" :loading="$store.state.admin.isLoading" type="primary" @click="submitForm('adminForm')">登录</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                adminForm:{
                    adminName: "",
                    passWord:"",
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
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if(valid){
                        const data = await this.$store.dispatch("login",this.adminForm)
                        if(data.ok === 1){
                            this.$store.commit("CHANGE_LOGIN_INFO",data);
                        }else{
                            this.$message.error(data.msg)
                        }
                    }else{
                        this.$message.error('错了哦，请输入正确的信息');
                    }
                });
            },

        }

    }
</script>

<style scoped lang="less">
.container{
    border: 1px solid #eaeaea;
    margin:250px auto;
    width: 350px;
    padding: 10px 20px;
    h3{
        text-align: center;
    }
}
</style>
