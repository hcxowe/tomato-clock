import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AccountLogin from '@/components/AccountLogin'
import AccountSigin from '@/components/AccountSigin'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/login',
			name: 'AccountLogin',
			component: AccountLogin
		},
		{
			path: '/sigin',
			name: 'AccountSigin',
			component: AccountSigin
		},
	]
})
