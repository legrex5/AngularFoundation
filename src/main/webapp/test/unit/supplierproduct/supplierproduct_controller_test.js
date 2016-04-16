'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('supplierproduct.module'));
  
  describe('SupplierproductCtrl', function(){
    var SupplierproductCtrl, Supplierproduct, Supplier,  Useraccess,  Product, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Supplierproduct service
    	Supplierproduct = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'supplierproduct1'});
    			return deferred.promise;
    		}
    	};
		
				Supplier = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Product = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SupplierproductCtrl = $controller('SupplierproductCtrl', {
    		'Supplierproduct': Supplierproduct,
						'Supplier': Supplier,
						'Useraccess': Useraccess,
						'Product': Product,
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
    	expect($scope.supplierproduct).toBeNull();
    	expect($scope.supplierproducts).toBe('supplierproduct1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSupplierproductList', function() {
    	// given
    	Supplierproduct.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierproduct2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSupplierproductList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.supplierproducts).toBe('supplierproduct2');
    });
    
    it('refreshSupplierproduct', function() {
    	// given
    	Supplierproduct.get = function(supplierproductid) {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierproduct'+supplierproductid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSupplierproduct('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.supplierproduct).toBe('supplierproduct'+'1');
    });
    
	it('goToSupplierproductList', function() {
    	// given
    	spyOn($scope, "refreshSupplierproductList");
    	
    	// when
    	$scope.goToSupplierproductList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSupplierproductList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/supplierproduct');
    });
    
    it('goToSupplierproduct', function() {
    	// given
    	spyOn($scope, "refreshSupplierproduct");
    	var supplierproductid = 1;
    	
    	// when
    	$scope.goToSupplierproduct(supplierproductid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSupplierproduct).toHaveBeenCalledWith(supplierproductid);
    	expect($location.path).toHaveBeenCalledWith('/supplierproduct'+'/'+supplierproductid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.supplierproduct = {supplierproductid:'1', name:'supplierproduct'};
    	
    	$scope.mode = 'create';
    	Supplierproduct.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierproductSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.supplierproduct).toBe('supplierproductSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.supplierproduct = {supplierproductid:'1', name:'supplierproduct'};
    	
    	$scope.mode = 'update';
    	Supplierproduct.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierproductSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.supplierproduct).toBe('supplierproductSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Supplierproduct.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSupplierproductList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSupplierproductList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : supplierproduct create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/supplierproduct/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.supplierproduct).toBeNull();
    	expect($scope.supplierproducts).toBe('supplierproduct1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});