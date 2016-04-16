'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('salesordercorrection.module'));
  
  describe('SalesordercorrectionCtrl', function(){
    var SalesordercorrectionCtrl, Salesordercorrection,$rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Salesordercorrection service
    	Salesordercorrection = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'salesordercorrection1'});
    			return deferred.promise;
    		}
    	};
		
				SalesordercorrectionCtrl = $controller('SalesordercorrectionCtrl', {
    		'Salesordercorrection': Salesordercorrection,
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
    	expect($scope.salesordercorrection).toBeNull();
    	expect($scope.salesordercorrections).toBe('salesordercorrection1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSalesordercorrectionList', function() {
    	// given
    	Salesordercorrection.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesordercorrection2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesordercorrectionList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.salesordercorrections).toBe('salesordercorrection2');
    });
    
    it('refreshSalesordercorrection', function() {
    	// given
    	Salesordercorrection.get = function(salesordercorrectionid) {
			var deferred = $q.defer();
			deferred.resolve({data:'salesordercorrection'+salesordercorrectionid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesordercorrection('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.salesordercorrection).toBe('salesordercorrection'+'1');
    });
    
	it('goToSalesordercorrectionList', function() {
    	// given
    	spyOn($scope, "refreshSalesordercorrectionList");
    	
    	// when
    	$scope.goToSalesordercorrectionList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesordercorrectionList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/salesordercorrection');
    });
    
    it('goToSalesordercorrection', function() {
    	// given
    	spyOn($scope, "refreshSalesordercorrection");
    	var salesordercorrectionid = 1;
    	
    	// when
    	$scope.goToSalesordercorrection(salesordercorrectionid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesordercorrection).toHaveBeenCalledWith(salesordercorrectionid);
    	expect($location.path).toHaveBeenCalledWith('/salesordercorrection'+'/'+salesordercorrectionid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.salesordercorrection = {salesordercorrectionid:'1', name:'salesordercorrection'};
    	
    	$scope.mode = 'create';
    	Salesordercorrection.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesordercorrectionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesordercorrection).toBe('salesordercorrectionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.salesordercorrection = {salesordercorrectionid:'1', name:'salesordercorrection'};
    	
    	$scope.mode = 'update';
    	Salesordercorrection.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesordercorrectionSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesordercorrection).toBe('salesordercorrectionSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Salesordercorrection.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSalesordercorrectionList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSalesordercorrectionList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : salesordercorrection create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/salesordercorrection/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.salesordercorrection).toBeNull();
    	expect($scope.salesordercorrections).toBe('salesordercorrection1');
    	expect(Object.keys($scope.items).length).toBe(0);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});