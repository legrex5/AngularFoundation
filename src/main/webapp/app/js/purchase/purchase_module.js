/**=========================================================
* Menu: Purchase Menu List
* Daftar menu pembelian
============================================================*/

'use strict';

var purchaseModule = angular.module('UIFoundation.purchaseModule',['UIFoundation','ui.router','oc.lazyLoad','UIFoundation.rest']);

purchaseModule.config(['$stateProvider','$locationProvider','$urlRouterProvider',
                       function($stateProvider,$locationProvider,$urlRouterProvider){
	'use strict';
	var pathView = 'app/views/protected/';
	var pathJs = 'app/js/';
	$stateProvider
	.state('app.purchaseOrder',{
		url : '/purchase/purchaseorder',
		title : 'Purchase Order',
		controller:'PurchaseorderCtrl',
		templateUrl : pathView+'purchase/purchaseorder/purchaseorder_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'purchase/purchaseorder/purchaseorder_controller.js',
					         pathJs+'purchase/purchaseorder/purchaseorder_factory.js',
					         pathJs+'purchase/accountbank/accountbank_controller.js',
					         pathJs+'purchase/accountbank/accountbank_factory.js',
					         pathJs+'master/supplier/supplier_controller.js',
					         pathJs+'master/supplier/supplier_factory.js',
					         pathJs+'master/paymentform/paymentform_controller.js',
					         pathJs+'master/paymentform/paymentform_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.returnsupplier',{
		url : '/purchase/returnsupplier',
		title : 'Return Supplier',
		controller:'ReturnsupplierCtrl',
		templateUrl : pathView+'purchase/returnsupplier/returnsupplier_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'purchase/purchaseorder/returnsupplier_controller.js',
					         pathJs+'purchase/purchaseorder/returnsupplier_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
}                  
])
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
	
	purchaseModule.controller= $controllerProvider.register;
	purchaseModule.directive= $compileProvider.directive;
	purchaseModule.filter= $filterProvider.register;
	purchaseModule.factory= $provide.factory;
	purchaseModule.service= $provide.service;
	purchaseModule.constant= $provide.constant;
	purchaseModule.value= $provide.value;
}]);