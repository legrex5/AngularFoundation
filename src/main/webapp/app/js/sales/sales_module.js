/**=========================================================
* Menu: Sales Menu List
* Daftar menu penjualan
============================================================*/

'use strict';

var salesModule = angular.module('UIFoundation.salesModule',['UIFoundation','ui.router','oc.lazyLoad','UIFoundation.rest']);

salesModule.config(['$stateProvider','$locationProvider','$urlRouterProvider',
                       function($stateProvider,$locationProvider,$urlRouterProvider){
	'use strict';
	var pathView = 'app/views/protected/';
	var pathJs = 'app/js/';
	$stateProvider
	.state('app.salesOrder',{
		url : '/sales/salesorder',
		title : 'Sales Order',
		controller:'SalesorderCtrl',
		templateUrl : pathView+'sales/salesorder/salesorder_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'sales/salesorder/salesorder_controller.js',
					         pathJs+'sales/salesorder/salesorder_factory.js',
					         pathJs+'master/paymentform/paymentform_controller.js',
					         pathJs+'master/paymentform/paymentform_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.salesordercorrection',{
		url : '/sales/salesordercorrection',
		title : 'Correction Sales',
		controller:'SalesordercorrectionCtrl',
		templateUrl : pathView+'sales/salesordercorrection/salesordercorrection_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'sales/salesordercorrection/salesordercorrection_controller.js',
					         pathJs+'sales/salesordercorrection/salesordercorrection_factory.js',
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
	
	salesModule.controller= $controllerProvider.register;
	salesModule.directive= $compileProvider.directive;
	salesModule.filter= $filterProvider.register;
	salesModule.factory= $provide.factory;
	salesModule.service= $provide.service;
	salesModule.constant= $provide.constant;
	salesModule.value= $provide.value;
}]);