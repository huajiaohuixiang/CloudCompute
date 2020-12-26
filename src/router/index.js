import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/schart',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/schart.vue'),
                    meta: { title: '图' }
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
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/registry',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/registry.vue'),
            meta: { title: '注册' }
        },
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