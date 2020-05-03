export default [
    {
        path:"/shopList",
        name:"shopList",
        component:()=>import("@/views/shop/ShopList")
    },
    {
        path:"/shopTypeList",
        name:"shopTypeList",
        component:()=>import("@/views/shop/ShopTypeList")
    },

]

