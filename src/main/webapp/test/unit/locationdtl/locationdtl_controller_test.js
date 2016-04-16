'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('locationdtl.module'));
  
  describe('LocationdtlCtrl', function(){
    var LocationdtlCtrl, Locationdtl, Useraccess,  Location, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Locationdtl service
    	Locationdtl = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'locationdtl1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Location = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				LocationdtlCtrl = $controller('LocationdtlCtrl', {
    		'Locationdtl': Locationdtl,
						'Useraccess': Useraccess,
						'Location': Location,
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
    	expect($scope.locationdtl).toBeNull();
    	expect($scope.locationdtls).toBe('locationdtl1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshLocationdtlList', function() {
    	// given
    	Locationdtl.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'locationdtl2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshLocationdtlList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.locationdtls).toBe('locationdtl2');
    });
    
    it('refreshLocationdtl', function() {
    	// given
    	Locationdtl.get = function(locationdtlid) {
			var deferred = $q.defer();
			deferred.resolve({data:'locationdtl'+locationdtlid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshLocationdtl('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.locationdtl).toBe('locationdtl'+'1');
    });
    
	it('goToLocationdtlList', function() {
    	// given
    	spyOn($scope, "refreshLocationdtlList");
    	
    	// when
    	$scope.goToLocationdtlList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshLocationdtlList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/locationdtl');
    });
    
    it('goToLocationdtl', function() {
    	// given
    	spyOn($scope, "refreshLocationdtl");
    	var locationdtlid = 1;
    	
    	// when
    	$scope.goToLocationdtl(locationdtlid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshLocationdtl).toHaveBeenCalledWith(locationdtlid);
    	expect($location.path).toHaveBeenCalledWith('/locationdtl'+'/'+locationdtlid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.locationdtl = {locationdtlid:'1', name:'locationdtl'};
    	
    	$scope.mode = 'create';
    	Locationdtl.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'locationdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.locationdtl).toBe('locationdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.locationdtl = {locationdtlid:'1', name:'locationdtl'};
    	
    	$scope.mode = 'update';
    	Locationdtl.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'locationdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.locationdtl).toBe('locationdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Locationdtl.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToLocationdtlList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToLocationdtlList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : locationdtl create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/locationdtl/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.locationdtl).toBeNull();
    	expect($scope.locationdtls).toBe('locationdtl1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});