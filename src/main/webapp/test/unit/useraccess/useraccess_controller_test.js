'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('useraccess.module'));
  
  describe('UseraccessCtrl', function(){
    var UseraccessCtrl, Useraccess, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
    beforeEach(inject(function($injector) {
    	$controller = $injector.get('$controller');
    	$q = $injector.get('$q');
    	$rootScope = $injector.get('$rootScope');
    	$scope = $rootScope.$new();
    	$routeParams = $injector.get('$routeParams');
    	$httpBackend = $injector.get('$httpBackend');
    	
    	// location is mocked due to redirection in browser : karma does not support it
    	$location = {
    		path: jasmine.createSpy("path").andCallFake(function() {
        	    return "";
        	})
    	};
    	
    	// Messages
    	MessageHandler = {
    		cleanMessage: jasmine.createSpy("cleanMessage"),
    		addSuccess: jasmine.createSpy("addSuccess"),
    		manageError: jasmine.createSpy("manageError"),
    		manageException: jasmine.createSpy("manageException"),
    	};

    	// Useraccess service
    	Useraccess = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'useraccess1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				UseraccessCtrl = $controller('UseraccessCtrl', {
    		'Useraccess': Useraccess,
//						'Useraccess': Useraccess,
			    		'$scope': $scope,
    		'$routeParams': $routeParams,
    		'$http': $httpBackend,
    		'$location': $location,
    		'MessageHandler': MessageHandler
    	});
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
    it('init', function() {
    	$rootScope.$apply();
    	expect($scope.mode).toBeNull();
    	expect($scope.useraccess).toBeNull();
    	expect($scope.useraccesss).toBe('useraccess1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshUseraccessList', function() {
    	// given
    	Useraccess.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'useraccess2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUseraccessList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.useraccesss).toBe('useraccess2');
    });
    
    it('refreshUseraccess', function() {
    	// given
    	Useraccess.get = function(userid) {
			var deferred = $q.defer();
			deferred.resolve({data:'useraccess'+userid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUseraccess('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.useraccess).toBe('useraccess'+'1');
    });
    
	it('goToUseraccessList', function() {
    	// given
    	spyOn($scope, "refreshUseraccessList");
    	
    	// when
    	$scope.goToUseraccessList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUseraccessList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/useraccess');
    });
    
    it('goToUseraccess', function() {
    	// given
    	spyOn($scope, "refreshUseraccess");
    	var userid = 1;
    	
    	// when
    	$scope.goToUseraccess(userid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUseraccess).toHaveBeenCalledWith(userid);
    	expect($location.path).toHaveBeenCalledWith('/useraccess'+'/'+userid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.useraccess = {userid:'1', name:'useraccess'};
    	
    	$scope.mode = 'create';
    	Useraccess.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'useraccessSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.useraccess).toBe('useraccessSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.useraccess = {userid:'1', name:'useraccess'};
    	
    	$scope.mode = 'update';
    	Useraccess.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'useraccessSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.useraccess).toBe('useraccessSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Useraccess.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToUseraccessList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToUseraccessList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : useraccess create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/useraccess/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.useraccess).toBeNull();
    	expect($scope.useraccesss).toBe('useraccess1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});