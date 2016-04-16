'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('location.module'));
  
  describe('LocationCtrl', function(){
    var LocationCtrl, Location, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Location service
    	Location = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'location1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				LocationCtrl = $controller('LocationCtrl', {
    		'Location': Location,
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
    	expect($scope.location).toBeNull();
    	expect($scope.locations).toBe('location1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshLocationList', function() {
    	// given
    	Location.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'location2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshLocationList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.locations).toBe('location2');
    });
    
    it('refreshLocation', function() {
    	// given
    	Location.get = function(locationid) {
			var deferred = $q.defer();
			deferred.resolve({data:'location'+locationid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshLocation('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.location).toBe('location'+'1');
    });
    
	it('goToLocationList', function() {
    	// given
    	spyOn($scope, "refreshLocationList");
    	
    	// when
    	$scope.goToLocationList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshLocationList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/location');
    });
    
    it('goToLocation', function() {
    	// given
    	spyOn($scope, "refreshLocation");
    	var locationid = 1;
    	
    	// when
    	$scope.goToLocation(locationid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshLocation).toHaveBeenCalledWith(locationid);
    	expect($location.path).toHaveBeenCalledWith('/location'+'/'+locationid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.location = {locationid:'1', name:'location'};
    	
    	$scope.mode = 'create';
    	Location.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'locationSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.location).toBe('locationSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.location = {locationid:'1', name:'location'};
    	
    	$scope.mode = 'update';
    	Location.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'locationSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.location).toBe('locationSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Location.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToLocationList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToLocationList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : location create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/location/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.location).toBeNull();
    	expect($scope.locations).toBe('location1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});