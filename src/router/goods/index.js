export default [
    {
        path:"/goodsList",
        name:"goodsList",
        component:()=>import("@/views/goods/GoodsList")
    },
    {
        path:"/goodsTypeList",
        name:"goodsTypeList",
        component:()=>import("@/views/goods/GoodsTypeList")
    },
]