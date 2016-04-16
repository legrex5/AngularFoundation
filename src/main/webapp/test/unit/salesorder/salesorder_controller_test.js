'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('salesorder.module'));
  
  describe('SalesorderCtrl', function(){
    var SalesorderCtrl, Salesorder, Paymentform, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Salesorder service
    	Salesorder = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'salesorder1'});
    			return deferred.promise;
    		}
    	};
		
				Paymentform = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SalesorderCtrl = $controller('SalesorderCtrl', {
    		'Salesorder': Salesorder,
						'Paymentform': Paymentform,
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
    	expect($scope.salesorder).toBeNull();
    	expect($scope.salesorders).toBe('salesorder1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSalesorderList', function() {
    	// given
    	Salesorder.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorder2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesorderList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.salesorders).toBe('salesorder2');
    });
    
    it('refreshSalesorder', function() {
    	// given
    	Salesorder.get = function(salesorderid) {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorder'+salesorderid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesorder('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.salesorder).toBe('salesorder'+'1');
    });
    
	it('goToSalesorderList', function() {
    	// given
    	spyOn($scope, "refreshSalesorderList");
    	
    	// when
    	$scope.goToSalesorderList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesorderList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/salesorder');
    });
    
    it('goToSalesorder', function() {
    	// given
    	spyOn($scope, "refreshSalesorder");
    	var salesorderid = 1;
    	
    	// when
    	$scope.goToSalesorder(salesorderid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesorder).toHaveBeenCalledWith(salesorderid);
    	expect($location.path).toHaveBeenCalledWith('/salesorder'+'/'+salesorderid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.salesorder = {salesorderid:'1', name:'salesorder'};
    	
    	$scope.mode = 'create';
    	Salesorder.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesorder).toBe('salesorderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.salesorder = {salesorderid:'1', name:'salesorder'};
    	
    	$scope.mode = 'update';
    	Salesorder.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesorder).toBe('salesorderSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Salesorder.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSalesorderList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSalesorderList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : salesorder create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/salesorder/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.salesorder).toBeNull();
    	expect($scope.salesorders).toBe('salesorder1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});