'use strict';

/* Module for Useraccess */

var useraccessModule = angular.module('UIFoundation.userAccessModule', ['UIFoundation','ui.router','oc.lazyLoad','UIFoundation.rest']);

/**
 * Module for useraccess
 */
useraccessModule.config(['$stateProvider','$locationProvider','$urlRouterProvider', 
                         function($stateProvider,$locationProvider,$urlRouterProvider) {
	'use strict';
	var pathJs = 'app/js/';
	var pathView = 'app/views/protected/';
	
	$stateProvider
	.state('app.userAccess',{
		url:'/useraccess',
		title: 'User Access',
		controller: 'UseraccessCtrl',
		templateUrl: pathView+'useraccess/useraccess_list.html',
		resolve: {
			deps: ['$ocLazyLoad',function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie : true,
					files : [pathJs+'useraccess/useraccess_controller.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.userAccessNew',{
		url: '/useraccess/new',
		title: 'New User Access',
		controller: 'UseraccessCtrl',
		templateUrl: pathView+'useraccess/useraccess_form.html',
		resolve:{
			deps: ['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'useraccess/useraccess_controller.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
				})
			}]
		}
	})
	.state('app.userAccessEdit',{
		url: '/useraccess/:userid',
		title: 'Edit User Access',
		controller: 'UseraccessCtrl',
		templateUrl: pathView+'useraccess/useraccess_form.html',
		resolve:{
			deps: ['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load({
					serie: true,
					files: [pathJs+'useraccess/useraccess_controller.js',
					         pathJs+'useraccess/useraccess_factory.js',
					         pathJs+'messages_handler.js']
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
	
	useraccessModule.controller= $controllerProvider.register;
	useraccessModule.directive= $compileProvider.directive;
	useraccessModule.filter= $filterProvider.register;
	useraccessModule.factory= $provide.factory;
	useraccessModule.service= $provide.service;
	useraccessModule.constant= $provide.constant;
	useraccessModule.value= $provide.value;
}]);
