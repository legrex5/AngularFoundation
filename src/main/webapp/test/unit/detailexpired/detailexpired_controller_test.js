'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('detailexpired.module'));
  
  describe('DetailexpiredCtrl', function(){
    var DetailexpiredCtrl, Detailexpired, Productstock,  Locationdtl,  Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Detailexpired service
    	Detailexpired = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'detailexpired1'});
    			return deferred.promise;
    		}
    	};
		
				Productstock = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Locationdtl = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				DetailexpiredCtrl = $controller('DetailexpiredCtrl', {
    		'Detailexpired': Detailexpired,
						'Productstock': Productstock,
						'Locationdtl': Locationdtl,
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
    	expect($scope.detailexpired).toBeNull();
    	expect($scope.detailexpireds).toBe('detailexpired1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshDetailexpiredList', function() {
    	// given
    	Detailexpired.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'detailexpired2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDetailexpiredList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.detailexpireds).toBe('detailexpired2');
    });
    
    it('refreshDetailexpired', function() {
    	// given
    	Detailexpired.get = function(detailexpiredid) {
			var deferred = $q.defer();
			deferred.resolve({data:'detailexpired'+detailexpiredid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshDetailexpired('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.detailexpired).toBe('detailexpired'+'1');
    });
    
	it('goToDetailexpiredList', function() {
    	// given
    	spyOn($scope, "refreshDetailexpiredList");
    	
    	// when
    	$scope.goToDetailexpiredList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDetailexpiredList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/detailexpired');
    });
    
    it('goToDetailexpired', function() {
    	// given
    	spyOn($scope, "refreshDetailexpired");
    	var detailexpiredid = 1;
    	
    	// when
    	$scope.goToDetailexpired(detailexpiredid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshDetailexpired).toHaveBeenCalledWith(detailexpiredid);
    	expect($location.path).toHaveBeenCalledWith('/detailexpired'+'/'+detailexpiredid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.detailexpired = {detailexpiredid:'1', name:'detailexpired'};
    	
    	$scope.mode = 'create';
    	Detailexpired.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'detailexpiredSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.detailexpired).toBe('detailexpiredSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.detailexpired = {detailexpiredid:'1', name:'detailexpired'};
    	
    	$scope.mode = 'update';
    	Detailexpired.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'detailexpiredSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.detailexpired).toBe('detailexpiredSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Detailexpired.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToDetailexpiredList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToDetailexpiredList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : detailexpired create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/detailexpired/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.detailexpired).toBeNull();
    	expect($scope.detailexpireds).toBe('detailexpired1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});