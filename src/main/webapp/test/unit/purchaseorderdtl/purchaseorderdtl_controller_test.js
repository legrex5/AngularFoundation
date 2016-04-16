'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('purchaseorderdtl.module'));
  
  describe('PurchaseorderdtlCtrl', function(){
    var PurchaseorderdtlCtrl, Purchaseorderdtl, Purchaseorder,  Detailexpired,  Productuom,  Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Purchaseorderdtl service
    	Purchaseorderdtl = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'purchaseorderdtl1'});
    			return deferred.promise;
    		}
    	};
		
				Purchaseorder = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Detailexpired = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
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

				PurchaseorderdtlCtrl = $controller('PurchaseorderdtlCtrl', {
    		'Purchaseorderdtl': Purchaseorderdtl,
						'Purchaseorder': Purchaseorder,
						'Detailexpired': Detailexpired,
						'Productuom': Productuom,
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
    	expect($scope.purchaseorderdtl).toBeNull();
    	expect($scope.purchaseorderdtls).toBe('purchaseorderdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPurchaseorderdtlList', function() {
    	// given
    	Purchaseorderdtl.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderdtl2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPurchaseorderdtlList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.purchaseorderdtls).toBe('purchaseorderdtl2');
    });
    
    it('refreshPurchaseorderdtl', function() {
    	// given
    	Purchaseorderdtl.get = function(purchaseorderdtlid) {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderdtl'+purchaseorderdtlid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPurchaseorderdtl('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.purchaseorderdtl).toBe('purchaseorderdtl'+'1');
    });
    
	it('goToPurchaseorderdtlList', function() {
    	// given
    	spyOn($scope, "refreshPurchaseorderdtlList");
    	
    	// when
    	$scope.goToPurchaseorderdtlList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPurchaseorderdtlList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/purchaseorderdtl');
    });
    
    it('goToPurchaseorderdtl', function() {
    	// given
    	spyOn($scope, "refreshPurchaseorderdtl");
    	var purchaseorderdtlid = 1;
    	
    	// when
    	$scope.goToPurchaseorderdtl(purchaseorderdtlid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPurchaseorderdtl).toHaveBeenCalledWith(purchaseorderdtlid);
    	expect($location.path).toHaveBeenCalledWith('/purchaseorderdtl'+'/'+purchaseorderdtlid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.purchaseorderdtl = {purchaseorderdtlid:'1', name:'purchaseorderdtl'};
    	
    	$scope.mode = 'create';
    	Purchaseorderdtl.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.purchaseorderdtl).toBe('purchaseorderdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.purchaseorderdtl = {purchaseorderdtlid:'1', name:'purchaseorderdtl'};
    	
    	$scope.mode = 'update';
    	Purchaseorderdtl.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'purchaseorderdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.purchaseorderdtl).toBe('purchaseorderdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Purchaseorderdtl.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPurchaseorderdtlList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPurchaseorderdtlList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : purchaseorderdtl create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/purchaseorderdtl/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.purchaseorderdtl).toBeNull();
    	expect($scope.purchaseorderdtls).toBe('purchaseorderdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});