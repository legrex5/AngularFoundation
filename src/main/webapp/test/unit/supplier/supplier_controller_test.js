'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('supplier.module'));
  
  describe('SupplierCtrl', function(){
    var SupplierCtrl, Supplier, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Supplier service
    	Supplier = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'supplier1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SupplierCtrl = $controller('SupplierCtrl', {
    		'Supplier': Supplier,
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
    	expect($scope.supplier).toBeNull();
    	expect($scope.suppliers).toBe('supplier1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSupplierList', function() {
    	// given
    	Supplier.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplier2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSupplierList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.suppliers).toBe('supplier2');
    });
    
    it('refreshSupplier', function() {
    	// given
    	Supplier.get = function(supplierid) {
			var deferred = $q.defer();
			deferred.resolve({data:'supplier'+supplierid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSupplier('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.supplier).toBe('supplier'+'1');
    });
    
	it('goToSupplierList', function() {
    	// given
    	spyOn($scope, "refreshSupplierList");
    	
    	// when
    	$scope.goToSupplierList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSupplierList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/supplier');
    });
    
    it('goToSupplier', function() {
    	// given
    	spyOn($scope, "refreshSupplier");
    	var supplierid = 1;
    	
    	// when
    	$scope.goToSupplier(supplierid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSupplier).toHaveBeenCalledWith(supplierid);
    	expect($location.path).toHaveBeenCalledWith('/supplier'+'/'+supplierid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.supplier = {supplierid:'1', name:'supplier'};
    	
    	$scope.mode = 'create';
    	Supplier.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.supplier).toBe('supplierSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.supplier = {supplierid:'1', name:'supplier'};
    	
    	$scope.mode = 'update';
    	Supplier.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'supplierSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.supplier).toBe('supplierSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Supplier.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSupplierList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSupplierList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : supplier create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/supplier/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.supplier).toBeNull();
    	expect($scope.suppliers).toBe('supplier1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});