'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('purchaseorder.module'));
  
  describe('PurchaseorderCtrl', function(){
    var PurchaseorderCtrl, Purchaseorder, Supplier,  Paymentform,  Accountbank, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Purchaseorder service
    	Purchaseorder = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'purchaseorder1'});
    			return deferred.promise;
    		}
    	};
		
				Supplier = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Paymentform = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Accountbank = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PurchaseorderCtrl = $controller('PurchaseorderCtrl', {
    		'Purchaseorder': Purchaseorder,
						'Supplier': Supplier,
						'Paymentform': Paymentform,
						'Accountbank': Accountbank,
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
    	expect($scope.purchaseorder).toBeNull();
    	expect($scope.purchaseorders).toBe('purchaseorder1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPurchaseorderList', function() {
    	// given
    	Purchaseorder.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorder2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPurchaseorderList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.purchaseorders).toBe('purchaseorder2');
    });
    
    it('refreshPurchaseorder', function() {
    	// given
    	Purchaseorder.get = function(purchaseorderid) {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorder'+purchaseorderid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPurchaseorder('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.purchaseorder).toBe('purchaseorder'+'1');
    });
    
	it('goToPurchaseorderList', function() {
    	// given
    	spyOn($scope, "refreshPurchaseorderList");
    	
    	// when
    	$scope.goToPurchaseorderList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPurchaseorderList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/purchaseorder');
    });
    
    it('goToPurchaseorder', function() {
    	// given
    	spyOn($scope, "refreshPurchaseorder");
    	var purchaseorderid = 1;
    	
    	// when
    	$scope.goToPurchaseorder(purchaseorderid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPurchaseorder).toHaveBeenCalledWith(purchaseorderid);
    	expect($location.path).toHaveBeenCalledWith('/purchaseorder'+'/'+purchaseorderid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.purchaseorder = {purchaseorderid:'1', name:'purchaseorder'};
    	
    	$scope.mode = 'create';
    	Purchaseorder.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.purchaseorder).toBe('purchaseorderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.purchaseorder = {purchaseorderid:'1', name:'purchaseorder'};
    	
    	$scope.mode = 'update';
    	Purchaseorder.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.purchaseorder).toBe('purchaseorderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Purchaseorder.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPurchaseorderList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPurchaseorderList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : purchaseorder create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/purchaseorder/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.purchaseorder).toBeNull();
    	expect($scope.purchaseorders).toBe('purchaseorder1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});