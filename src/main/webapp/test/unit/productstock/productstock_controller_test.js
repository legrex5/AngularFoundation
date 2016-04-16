'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('productstock.module'));
  
  describe('ProductstockCtrl', function(){
    var ProductstockCtrl, Productstock, Productuom,  Useraccess,  Location, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Productstock service
    	Productstock = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'productstock1'});
    			return deferred.promise;
    		}
    	};
		
				Productuom = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
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

				ProductstockCtrl = $controller('ProductstockCtrl', {
    		'Productstock': Productstock,
						'Productuom': Productuom,
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
    	expect($scope.productstock).toBeNull();
    	expect($scope.productstocks).toBe('productstock1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshProductstockList', function() {
    	// given
    	Productstock.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productstock2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProductstockList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.productstocks).toBe('productstock2');
    });
    
    it('refreshProductstock', function() {
    	// given
    	Productstock.get = function(productstockid) {
			var deferred = $q.defer();
			deferred.resolve({data:'productstock'+productstockid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProductstock('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.productstock).toBe('productstock'+'1');
    });
    
	it('goToProductstockList', function() {
    	// given
    	spyOn($scope, "refreshProductstockList");
    	
    	// when
    	$scope.goToProductstockList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProductstockList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/productstock');
    });
    
    it('goToProductstock', function() {
    	// given
    	spyOn($scope, "refreshProductstock");
    	var productstockid = 1;
    	
    	// when
    	$scope.goToProductstock(productstockid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProductstock).toHaveBeenCalledWith(productstockid);
    	expect($location.path).toHaveBeenCalledWith('/productstock'+'/'+productstockid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.productstock = {productstockid:'1', name:'productstock'};
    	
    	$scope.mode = 'create';
    	Productstock.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productstockSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.productstock).toBe('productstockSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.productstock = {productstockid:'1', name:'productstock'};
    	
    	$scope.mode = 'update';
    	Productstock.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productstockSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.productstock).toBe('productstockSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Productstock.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToProductstockList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToProductstockList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : productstock create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/productstock/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.productstock).toBeNull();
    	expect($scope.productstocks).toBe('productstock1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});