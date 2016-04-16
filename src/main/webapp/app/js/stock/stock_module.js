/**=========================================================
* Menu: Sales Menu List
* Daftar menu penjualan
============================================================*/

'use strict';

var stockModule = angular.module('UIFoundation.stockModule',['UIFoundation','ui.router','oc.lazyLoad','UIFoundation.rest']);

stockModule.config(['$stateProvider','$locationProvider','$urlRouterProvider',
                       function($stateProvider,$locationProvider,$urlRouterProvider){
	'use strict';
	var pathView = 'app/views/protected/';
	var pathJs = 'app/js/';
	$stateProvider
	.state('app.expiredproduct',{
		url : '/stock/expiredproduct',
		title : 'Expired Product',
		controller:'DetailexpiredCtrl',
		templateUrl : pathView+'stock/detailexpired/detailexpired_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'stock/detailexpired/detailexpired_controller.js',
					         pathJs+'stock/detailexpired/detailexpired_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.stockproduct',{
		url : '/stock/stockproduct',
		title : 'Stock Product',
		controller:'ProductstockCtrl',
		templateUrl : pathView+'stock/productstock/productstock_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'stock/productstock/productstock_controller.js',
					         pathJs+'stock/productstock/productstock_factory.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.uomproduct',{
		url : '/stock/uomproduct',
		title : 'UOM Product',
		controller:'ProductuomCtrl',
		templateUrl : pathView+'stock/productuom/productuom_list.html',
		resolve : {
			deps : ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'stock/productuom/productuom_controller.js',
					         pathJs+'stock/productuom/productuom_factory.js',
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
	
	stockModule.controller= $controllerProvider.register;
	stockModule.directive= $compileProvider.directive;
	stockModule.filter= $filterProvider.register;
	stockModule.factory= $provide.factory;
	stockModule.service= $provide.service;
	stockModule.constant= $provide.constant;
	stockModule.value= $provide.value;
}]);