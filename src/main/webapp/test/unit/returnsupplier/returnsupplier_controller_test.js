'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('returnsupplier.module'));
  
  describe('ReturnsupplierCtrl', function(){
    var ReturnsupplierCtrl, Returnsupplier, Supplier, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Returnsupplier service
    	Returnsupplier = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'returnsupplier1'});
    			return deferred.promise;
    		}
    	};
		
				Supplier = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				ReturnsupplierCtrl = $controller('ReturnsupplierCtrl', {
    		'Returnsupplier': Returnsupplier,
						'Supplier': Supplier,
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
    	expect($scope.returnsupplier).toBeNull();
    	expect($scope.returnsuppliers).toBe('returnsupplier1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshReturnsupplierList', function() {
    	// given
    	Returnsupplier.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplier2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReturnsupplierList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.returnsuppliers).toBe('returnsupplier2');
    });
    
    it('refreshReturnsupplier', function() {
    	// given
    	Returnsupplier.get = function(returnsupplierid) {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplier'+returnsupplierid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReturnsupplier('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.returnsupplier).toBe('returnsupplier'+'1');
    });
    
	it('goToReturnsupplierList', function() {
    	// given
    	spyOn($scope, "refreshReturnsupplierList");
    	
    	// when
    	$scope.goToReturnsupplierList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReturnsupplierList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/returnsupplier');
    });
    
    it('goToReturnsupplier', function() {
    	// given
    	spyOn($scope, "refreshReturnsupplier");
    	var returnsupplierid = 1;
    	
    	// when
    	$scope.goToReturnsupplier(returnsupplierid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReturnsupplier).toHaveBeenCalledWith(returnsupplierid);
    	expect($location.path).toHaveBeenCalledWith('/returnsupplier'+'/'+returnsupplierid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.returnsupplier = {returnsupplierid:'1', name:'returnsupplier'};
    	
    	$scope.mode = 'create';
    	Returnsupplier.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.returnsupplier).toBe('returnsupplierSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.returnsupplier = {returnsupplierid:'1', name:'returnsupplier'};
    	
    	$scope.mode = 'update';
    	Returnsupplier.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.returnsupplier).toBe('returnsupplierSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Returnsupplier.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToReturnsupplierList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToReturnsupplierList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : returnsupplier create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/returnsupplier/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.returnsupplier).toBeNull();
    	expect($scope.returnsuppliers).toBe('returnsupplier1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});