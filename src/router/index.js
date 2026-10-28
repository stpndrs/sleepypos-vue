import Main from '@/layouts/template.vue'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import LandingPageView from '@/pages/Landing page/LandingPageView.vue'
import CreatePurchasesView from '@/pages/purchases/CreatePurchasesView.vue'
import PurchasesView from '@/pages/purchases/PurchasesView.vue'
import CreateSalesView from '@/pages/sales/CreateSalesView.vue'
import SalesView from '@/pages/sales/SalesView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '',
			component: LandingPageView,
			name: 'landing-page',
		},
		{
			component: Main,
			children: [
				{
					path: '/dashboard',
					component: DashboardView,
					name: 'dashboard',
					meta: { title: ['Dashboard'] }
				},
				{
					path: '/sales',
					name: 'sales',
					children: [
						{
							path: '/sales',
							component: SalesView,
							name: 'sales-view',
							meta: { hideSideBar: true, title: ['Riwayat Penjualan'] }
						},
						{
							path: '/sales/create',
							component: CreateSalesView,
							name: 'create-sales-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
						{
							path: '/sales/edit/:id',
							component: SalesView,
							name: 'edit-sales-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
					]
				},
				{
					path: '/purchases',
					name: 'purchases',
					children: [
						{
							path: '/purchases',
							component: PurchasesView,
							name: 'purchases-view',
							meta: { hideSideBar: true, title: ['Riwayat Pembelian'] }
						},
						{
							path: '/purchases/create',
							component: CreatePurchasesView,
							name: 'create-purchases-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
						{
							path: '/purchases/edit/:id',
							component: PurchasesView,
							name: 'edit-purchases-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
					]
				},
			]
		}
	],
})

export default router
