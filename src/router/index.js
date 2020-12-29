import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/yearInfo'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                // {
                //     path: '/dashboard',
                //     component: () =>
                //         import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard/Dashboard.vue'),
                //     meta: { title: '系统首页' }
                // },
                {
                    path: '/yearInfo',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/yearInfo.vue'),
                    meta: { title: '年度销售图' }
                },
                {
                    path: '/monthInfo',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/monthInfo.vue'),
                    meta: { title: '月销售图' }
                },
                {
                    path: '/areaInfo',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/areaInfo.vue'),
                    meta: { title: '地区销售图' }
                },
                {
                    path: '/allorder',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/allorder.vue'),
                    meta: { title: '订单表' }
                },
                {
                    path: '/alluser',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/alluser.vue'),
                    meta: { title: '用户表' }
                },
                {
                    path: '/allarea',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/allarea.vue'),
                    meta: { title: '地区表' }
                },
                {
                    path: '/searchOrderByPrice',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/searchOrderByPrice.vue'),
                    meta: { title: '超过某价格订单' }
                },
                {
                    path: '/searchCode',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/searchCode.vue'),
                    meta: { title: '前N季度查询' }
                },
                {
                    path: '/yearMaxGood',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/yearMaxGood.vue'),
                    meta: { title: '年度最畅销产品' }
                },
                {
                    path: '/yearLessGood',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/yearLessGood.vue'),
                    meta: { title: '退货最多货物' }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/wrongpage/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/wrongpage/403.vue'),
                    meta: { title: '403' }
                },

            ]
        },
        // {
        //     path: '/login',
        //     component: () =>
        //         import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
        //     meta: { title: '登录' }
        // },
        // {
        //     path: '/registry',
        //     component: () =>
        //         import ( /* webpackChunkName: "login" */ '../components/page/registry.vue'),
        //     meta: { title: '注册' }
        // },
        // {
        //     path: '/tabs',
        //     component: () =>
        //         import ( /* webpackChunkName: "tabs" */ '../components/page/Message.vue'),
        //     meta: { title: '个人中心' }
        // },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});