import VueRouter from "vue-router";

const routes = [
    {
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
        component: () => import("../views/Games.vue")
    }, { 
        path: "/owngameslist",
        component: () => import("../views/OwnList.vue")
    }, { 
        path: "/wishgameslist",
        component: () => import("../views/WishList.vue")
    }, { 
        path: "/subscription",
        component: () => import("../views/Subscription.vue")
    }, { 
        path: "/exchange/:userid/:gameid",
        component: () => import("../components/Exchange/Game_Exchange.vue")
    }, { 
        path: "/profile",
        component: () => import("../views/Profil.vue")
    },
    { 
        path: "/channel",
        component: () => import("../views/Exchange.vue")
    },
    {
        path: "/popularGames",
        component: () => import("../views/popularGames.vue")
    },
    {
        path: "/showGame/:id",
        component: () => import("../components/Game/GameLayerDetails.vue"),
    },
    { 
        path: '*',
        component: () => import("../views/404.vue")
    }
];

export default new VueRouter({
    mode: "history",
    routes,
});