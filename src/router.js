import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserList/UserIndex'
import UserCreate from './components/UserList/userform/UserCreate'
import UserEdit from './components/UserList/userform/UserEdit'

const routes = [
	{
		path: '/',
		name: 'user.index',
        component: UserIndex,
    },
    {
        path:'/create',
        name:'user.create',
        component: UserCreate
    },
    {
        path:'/edit/:id',
        name:'user.edit',
        component:UserEdit,
        props:true

    },
  
]
export default createRouter({
	history: createWebHistory(),
	routes
})