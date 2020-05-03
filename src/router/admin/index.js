import AdminLog from "@/views/admin/AdminLog";
import AdminList from "../../views/admin/AdminList";
export default [
    {
        path:'/',
        name:'AdminLog',
        component:AdminLog,
    },
    {
        path:'/adminList',
        name:'AdminList',
        component: AdminList
    }
]