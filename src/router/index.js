import Main from '@/layouts/template.vue'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import LandingPageView from '@/pages/LandingPageView.vue'
import CreateProductsView from '@/pages/products/CreateProductsView.vue'
import EditProductsView from '@/pages/products/EditProductsView.vue'
import ProductsView from '@/pages/products/ProductsView.vue'
import CreatePurchasesView from '@/pages/purchases/CreatePurchasesView.vue'
import DetailPurchasesView from '@/pages/purchases/DetailPurchasesView.vue'
import PurchasesView from '@/pages/purchases/PurchasesView.vue'
import CreateSalesView from '@/pages/sales/CreateSalesView.vue'
import DetailSalesView from '@/pages/sales/DetailSalesView.vue'
import EditSalesView from '@/pages/sales/EditSalesView.vue'
import ReportSalesView from '@/pages/sales/ReportSalesView.vue'
import SalesView from '@/pages/sales/SalesView.vue'
import CustomersView from '@/pages/customers/CustomersView.vue';
import CreateCustomersView from '@/pages/customers/CreateCustomersView.vue';
import UpdateCustomersView from '@/pages/customers/UpdateCustomersView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
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
                    path: '/customers',
                    name: 'customers',
                    children: [
                        {
                            path: '',
                            component: CustomersView,
                            name: 'customers-view',
                            meta: { hideSideBar: false, title: ['Pelanggan', 'Daftar Pelanggan'] },
                        },
                        {
                            path: 'create',
                            component: CreateCustomersView,
                            name: 'create-customers-view',
                            meta: { hideSideBar: false, showTopBar: false },
                        },
                        {
                            path: 'edit/:id',
                            component: UpdateCustomersView,
                            name: 'edit-customers-view',
                            meta: { hideSideBar: false, showTopBar: false },
                        },
                    ],
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
							component: EditSalesView,
							name: 'edit-sales-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
						{
							path: '/sales/:id',
							component: DetailSalesView,
							name: 'detail-sales-view',
							meta: { hideSideBar: true, title: ['Riwayat Penjualan', 'Detail Penjualan'] }
						},
						{
							path: '/sales/report',
							component: ReportSalesView,
							name: 'report-sales-view',
							meta: { hideSideBar: true, title: ['Riwayat Penjualan', 'Laporan Penjualan'] }
						},
					]
				},
				{
					path: '/products',
					name: 'products',
					children: [
						{
							path: '/products',
							component: ProductsView,
							name: 'products-view',
							meta: { hideSideBar: false, title: ['Daftar Produk'] }
						},
						{
							path: '/products/create',
							component: CreateProductsView,
							name: 'create-products-view',
							meta: { hideSideBar: false, title: ['Daftar Produk', 'Tambah Produk'] }
						},
						{
							path: '/products/edit/:id',
							component: EditProductsView,
							name: 'edit-products-view',
							meta: { hideSideBar: false, title: ['Daftar Produk', 'Edit Produk'] }
						},
						{
							path: '/products/detail/:id',
							component: DetailPurchasesView,
							name: 'detail-products-view',
							meta: { hideSideBar: false }
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
							component: CreatePurchasesView,
							name: 'edit-purchases-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
						{
							path: '/purchases/detail/:id',
							component: DetailPurchasesView,
							name: 'detail-purchases-view',
							meta: { hideSideBar: true, showTopBar: false }
						},
					]
				},
			]
		}
	],
})

export default router;
