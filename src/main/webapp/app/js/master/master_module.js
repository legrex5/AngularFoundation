/**=========================================================
* Menu: Master Data Menu List
* Daftar menu master data aplikasi
============================================================*/

'use strict';

var  masterModule = angular.module('UIFoundation.masterModule',['UIFoundation','ui.router','oc.lazyLoad','UIFoundation.rest']);

masterModule.config(['$stateProvider','$locationProvider','$urlRouterProvider'
                     ,function($stateProvider,$locationProvider,$urlRouterProvider){
	'use strict';
	var pathView = 'app/views/protected/';
	var pathJs = 'app/js/';
	$stateProvider
	/**=========================================================
	 * MENU ACCOUNT BANK
	============================================================*/
	.state('app.accountBank',{
		url : '/master/accountbank',
		title : 'Account Bank',
		controller:'AccountbankCtrl',
		templateUrl : pathView+'master/accountbank/accountbank_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/accountbank/accountbank_controller.js',
					         pathJs+'master/accountbank/accountbank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         'vendor/ng-table/dist/ng-table.min.js',
                             'vendor/ng-table/dist/ng-table.min.css'],
				})
			}]
		}
	})
	.state('app.accountBankNew',{
		url: '/master/accountbank/new',
		title: 'New Account Bank',
		controller: 'AccountbankCtrl',
		templateUrl: pathView+'master/accountbank/accountbank_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/accountbank/accountbank_controller.js',
					         pathJs+'master/accountbank/accountbank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.accountBankEdit',{
		url: '/master/accountbank/:accountbankid',
		title: 'Edit Account Bank',
		controller: 'AccountbankCtrl',
		templateUrl: pathView+'master/accountbank/accountbank_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/accountbank/accountbank_controller.js',
					         pathJs+'master/accountbank/accountbank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU BANK
	============================================================*/
	.state('app.bank',{
		url : '/master/bank',
		title : 'Bank',
		controller:'BankCtrl',
		templateUrl : pathView+'master/bank/bank_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/bank/bank_controller.js',
					         pathJs+'master/bank/bank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.bankNew',{
		url: '/master/bank/new',
		title: 'New Bank',
		controller: 'BankCtrl',
		templateUrl: pathView+'master/bank/bank_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/bank/bank_controller.js',
					         pathJs+'master/bank/bank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.bankEdit',{
		url: '/master/bank/:bankid',
		title: 'Edit Bank',
		controller: 'BankCtrl',
		templateUrl: pathView+'master/bank/bank_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/bank/bank_controller.js',
					         pathJs+'master/bank/bank_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU CATEGORY
	============================================================*/
	.state('app.category',{
		url : '/master/category',
		title : 'category',
		controller:'CategoryCtrl',
		templateUrl : pathView+'master/category/category_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/category/category_controller.js',
					         pathJs+'master/category/category_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.categoryNew',{
		url: '/master/category/new',
		title: 'New category',
		controller: 'CategoryCtrl',
		templateUrl: pathView+'master/category/category_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/category/category_controller.js',
					         pathJs+'master/category/category_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.categoryEdit',{
		url: '/master/category/:categoryid',
		title: 'Edit category',
		controller: 'CategoryCtrl',
		templateUrl: pathView+'master/category/category_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/category/category_controller.js',
					         pathJs+'master/category/category_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU LOCATION
	============================================================*/
	.state('app.location',{
		url : '/master/location',
		title : 'location',
		controller:'LocationCtrl',
		templateUrl : pathView+'master/location/location_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/location/location_controller.js',
					         pathJs+'master/location/location_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.locationNew',{
		url: '/master/location/new',
		title: 'New location',
		controller: 'LocationCtrl',
		templateUrl: pathView+'master/location/location_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/location/location_controller.js',
					         pathJs+'master/location/location_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.locationEdit',{
		url: '/master/location/:locationid',
		title: 'Edit location',
		controller: 'LocationCtrl',
		templateUrl: pathView+'master/location/location_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/location/location_controller.js',
					         pathJs+'master/location/location_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU LOCATION DETAIL
	============================================================*/
	.state('app.locationdtl',{
		url : '/master/locationdtl',
		title : 'locationdtl',
		controller:'LocationdtlCtrl',
		templateUrl : pathView+'master/locationdtl/locationdtl_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/locationdtl/locationdtl_controller.js',
					         pathJs+'master/locationdtl/locationdtl_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.locationdtlNew',{
		url: '/master/locationdtl/new',
		title: 'New locationdtl',
		controller: 'LocationdtlCtrl',
		templateUrl: pathView+'master/locationdtl/locationdtl_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/locationdtl/locationdtl_controller.js',
					         pathJs+'master/locationdtl/locationdtl_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.locationdtlEdit',{
		url: '/master/locationdtl/:locationdtlid',
		title: 'Edit locationdtl',
		controller: 'LocationdtlCtrl',
		templateUrl: pathView+'master/locationdtl/locationdtl_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/locationdtl/locationdtl_controller.js',
					         pathJs+'master/locationdtl/locationdtl_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU PAYMENT FORM
	============================================================*/
	.state('app.paymentform',{
		url : '/master/paymentform',
		title : 'paymentform',
		controller:'PaymentformCtrl',
		templateUrl : pathView+'master/paymentform/paymentform_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/paymentform/paymentform_controller.js',
					         pathJs+'master/paymentform/paymentform_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.paymentformNew',{
		url: '/master/paymentform/new',
		title: 'New paymentform',
		controller: 'PaymentformCtrl',
		templateUrl: pathView+'master/paymentform/paymentform_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/paymentform/paymentform_controller.js',
					         pathJs+'master/paymentform/paymentform_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.paymentformEdit',{
		url: '/master/paymentform/:paymentformid',
		title: 'Edit paymentform',
		controller: 'PaymentformCtrl',
		templateUrl: pathView+'master/paymentform/paymentform_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/paymentform/paymentform_controller.js',
					         pathJs+'master/paymentform/paymentform_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU PRICE HISTORY
	============================================================*/
	.state('app.pricehistory',{
		url : '/master/pricehistory',
		title : 'pricehistory',
		controller:'PricehistoryCtrl',
		templateUrl : pathView+'master/pricehistory/pricehistory_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/pricehistory/pricehistory_controller.js',
					         pathJs+'master/pricehistory/pricehistory_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.pricehistoryNew',{
		url: '/master/pricehistory/new',
		title: 'New pricehistory',
		controller: 'PricehistoryCtrl',
		templateUrl: pathView+'master/pricehistory/pricehistory_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/pricehistory/pricehistory_controller.js',
					         pathJs+'master/pricehistory/pricehistory_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.pricehistoryEdit',{
		url: '/master/pricehistory/:pricehistoryid',
		title: 'Edit pricehistory',
		controller: 'PricehistoryCtrl',
		templateUrl: pathView+'master/pricehistory/pricehistory_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/pricehistory/pricehistory_controller.js',
					         pathJs+'master/pricehistory/pricehistory_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU PRODUCT
	============================================================*/
	.state('app.product',{
		url : '/master/product',
		title : 'product',
		controller:'ProductCtrl',
		templateUrl : pathView+'master/product/product_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/product/product_controller.js',
					         pathJs+'master/product/product_factory.js',
					         pathJs+'master/type/type_controller.js',
					         pathJs+'master/type/type_factory.js',
					         pathJs+'master/category/category_controller.js',
					         pathJs+'master/category/category_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.productNew',{
		url: '/master/product/new',
		title: 'New product',
		controller: 'ProductCtrl',
		templateUrl: pathView+'master/product/product_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/product/product_controller.js',
					         pathJs+'master/product/product_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.productEdit',{
		url: '/master/product/:productid',
		title: 'Edit product',
		controller: 'ProductCtrl',
		templateUrl: pathView+'master/product/product_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/product/product_controller.js',
					         pathJs+'master/product/product_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU SUPPLIER
	============================================================*/
	.state('app.supplier',{
		url : '/master/supplier',
		title : 'supplier',
		controller:'SupplierCtrl',
		templateUrl : pathView+'master/supplier/supplier_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/supplier/supplier_controller.js',
					         pathJs+'master/supplier/supplier_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.supplierNew',{
		url: '/master/supplier/new',
		title: 'New supplier',
		controller: 'SupplierCtrl',
		templateUrl: pathView+'master/supplier/supplier_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/supplier/supplier_controller.js',
					         pathJs+'master/supplier/supplier_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.supplierEdit',{
		url: '/master/supplier/:supplierid',
		title: 'Edit supplier',
		controller: 'SupplierCtrl',
		templateUrl: pathView+'master/supplier/supplier_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/supplier/supplier_controller.js',
					         pathJs+'master/supplier/supplier_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU TYPE
	============================================================*/
	.state('app.type',{
		url : '/master/type',
		title : 'type',
		controller:'TypeCtrl',
		templateUrl : pathView+'master/type/type_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/type/type_controller.js',
					         pathJs+'master/type/type_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.typeNew',{
		url: '/master/type/new',
		title: 'New type',
		controller: 'TypeCtrl',
		templateUrl: pathView+'master/type/type_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/type/type_controller.js',
					         pathJs+'master/type/type_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.typeEdit',{
		url: '/master/type/:typeid',
		title: 'Edit type',
		controller: 'TypeCtrl',
		templateUrl: pathView+'master/type/type_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/type/type_controller.js',
					         pathJs+'master/type/type_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	/**=========================================================
	 * MENU UOM
	============================================================*/
	.state('app.uom',{
		url : '/master/uom',
		title : 'uom',
		controller:'UomCtrl',
		templateUrl : pathView+'master/uom/uom_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'master/uom/uom_controller.js',
					         pathJs+'master/uom/uom_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js',
					         pathJs+'i18n.js']
				})
			}]
		}
	})
	.state('app.uomNew',{
		url: '/master/uom/new',
		title: 'New uom',
		controller: 'UomCtrl',
		templateUrl: pathView+'master/uom/uom_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/uom/uom_controller.js',
					         pathJs+'master/uom/uom_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
	.state('app.uomEdit',{
		url: '/master/uom/:uomid',
		title: 'Edit uom',
		controller: 'UomCtrl',
		templateUrl: pathView+'master/uom/uom_form.html',
		resolve: {
			deps:['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'master/uom/uom_controller.js',
					         pathJs+'master/uom/uom_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js'
					        ]
				})
			}]
		}
		
	})
}])
.config(['$ocLazyLoadProvider',function($ocLazyLoadProvider){
	'use strict';
	
	$ocLazyLoadProvider.config({
		debug: false,
		events: true
	});
}])
.config(['$controllerProvider','$compileProvider','$filterProvider','$provide',
         function($controllerProvider,$compileProvider,$filterProvider,$provide){
	'use strict';
	
	masterModule.controller= $controllerProvider.register;
	masterModule.directive= $compileProvider.directive;
	masterModule.filter= $filterProvider.register;
	masterModule.factory= $provide.factory;
	masterModule.service= $provide.service;
	masterModule.constant= $provide.constant;
	masterModule.value= $provide.value;
}]);
