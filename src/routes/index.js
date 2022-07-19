import VueRouter from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("../views/Home.vue")
    }, {
        path: "/signin",
        component: () => import("../views/Login.vue")
    }, {
        path: "/signup",
        component: () => import("../views/Register.vue")
    }, {
        path: "/games",
        component: () => import("../views/Games.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/games/genre/:id",
        component: () => import("../views/Games.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/owngameslist",
        component: () => import("../views/OwnList.vue"),
        meta: { requiresAuth: true }
    }, {
        path: "/wishgameslist",
        component: () => import("../views/WishList.vue"),
        meta: { requiresAuth: true }
    }, {
        path: "/subscription",
        component: () => import("../views/Subscription.vue"),
        meta: { requiresAuth: true }
    }, {
        path: "/exchange/:userid/:gameid",
        component: () => import("../components/Exchange/Game_Exchange.vue"),
        meta: { requiresAuth: true }
    }, {
        path: "/profile",
        component: () => import("../views/Profil.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/channel",
        component: () => import("../views/Exchange.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/popularGames",
        component: () => import("../views/popularGames.vue"),
        meta: { requiresAuth: true }
    },
    {
        name: "showGame",
        path: "/showGame/:id",
        component: () => import("../components/Game/GameLayerDetails.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: '*',
        component: () => import("../views/404.vue")
    },
    {
        path: "/admin",
        component: () => import("../views/Admin.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/admin/login",
        component: () => import("../views/AdminSignin.vue")
    },
    {
        path: "/recap_exchange",
        component: () => import("../components/Exchange/Game_Card_Exchange_Recap.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/user-edit/:id",
        name: "user.edit",
        component: () => import("../components/Admin/UserForm/userForm.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/form-request-reset-password",
        component: () => import("../components/Form/FormRequestPassword.vue"),
    },
    {
        path: "/form-reset-password/:token",
        component: () => import("../components/Form/FormResetPassword.vue"),
    },
    {
        path: "/cgu",
        component: () => import("../views/Reglement.vue")
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("token")) {
            next();
        } else {
            next("/signin");
        }
    } else {
        next();
    }
});

export default router;