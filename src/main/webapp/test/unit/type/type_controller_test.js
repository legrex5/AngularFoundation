'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('type.module'));
  
  describe('TypeCtrl', function(){
    var TypeCtrl, Type, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Type service
    	Type = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'type1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				TypeCtrl = $controller('TypeCtrl', {
    		'Type': Type,
						'Useraccess': Useraccess,
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
    	expect($scope.type).toBeNull();
    	expect($scope.types).toBe('type1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshTypeList', function() {
    	// given
    	Type.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'type2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshTypeList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.types).toBe('type2');
    });
    
    it('refreshType', function() {
    	// given
    	Type.get = function(typeid) {
			var deferred = $q.defer();
			deferred.resolve({data:'type'+typeid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshType('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.type).toBe('type'+'1');
    });
    
	it('goToTypeList', function() {
    	// given
    	spyOn($scope, "refreshTypeList");
    	
    	// when
    	$scope.goToTypeList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshTypeList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/type');
    });
    
    it('goToType', function() {
    	// given
    	spyOn($scope, "refreshType");
    	var typeid = 1;
    	
    	// when
    	$scope.goToType(typeid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshType).toHaveBeenCalledWith(typeid);
    	expect($location.path).toHaveBeenCalledWith('/type'+'/'+typeid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.type = {typeid:'1', name:'type'};
    	
    	$scope.mode = 'create';
    	Type.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'typeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.type).toBe('typeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.type = {typeid:'1', name:'type'};
    	
    	$scope.mode = 'update';
    	Type.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'typeSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.type).toBe('typeSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Type.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToTypeList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToTypeList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : type create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/type/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.type).toBeNull();
    	expect($scope.types).toBe('type1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});