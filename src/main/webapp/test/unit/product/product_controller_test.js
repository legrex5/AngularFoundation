'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('product.module'));
  
  describe('ProductCtrl', function(){
    var ProductCtrl, Product, Useraccess,  Type,  Category, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Product service
    	Product = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'product1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Type = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Category = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ProductCtrl = $controller('ProductCtrl', {
    		'Product': Product,
						'Useraccess': Useraccess,
						'Type': Type,
						'Category': Category,
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
    	expect($scope.product).toBeNull();
    	expect($scope.products).toBe('product1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshProductList', function() {
    	// given
    	Product.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'product2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProductList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.products).toBe('product2');
    });
    
    it('refreshProduct', function() {
    	// given
    	Product.get = function(productid) {
			var deferred = $q.defer();
			deferred.resolve({data:'product'+productid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProduct('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.product).toBe('product'+'1');
    });
    
	it('goToProductList', function() {
    	// given
    	spyOn($scope, "refreshProductList");
    	
    	// when
    	$scope.goToProductList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProductList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/product');
    });
    
    it('goToProduct', function() {
    	// given
    	spyOn($scope, "refreshProduct");
    	var productid = 1;
    	
    	// when
    	$scope.goToProduct(productid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProduct).toHaveBeenCalledWith(productid);
    	expect($location.path).toHaveBeenCalledWith('/product'+'/'+productid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.product = {productid:'1', name:'product'};
    	
    	$scope.mode = 'create';
    	Product.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.product).toBe('productSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.product = {productid:'1', name:'product'};
    	
    	$scope.mode = 'update';
    	Product.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.product).toBe('productSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Product.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToProductList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToProductList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : product create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/product/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.product).toBeNull();
    	expect($scope.products).toBe('product1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});