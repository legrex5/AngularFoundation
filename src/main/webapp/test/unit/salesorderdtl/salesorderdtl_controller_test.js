'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('salesorderdtl.module'));
  
  describe('SalesorderdtlCtrl', function(){
    var SalesorderdtlCtrl, Salesorderdtl, Useraccess,  Detailexpired,  Productuom,  Salesorder, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Salesorderdtl service
    	Salesorderdtl = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'salesorderdtl1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
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

				Salesorder = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				SalesorderdtlCtrl = $controller('SalesorderdtlCtrl', {
    		'Salesorderdtl': Salesorderdtl,
						'Useraccess': Useraccess,
						'Detailexpired': Detailexpired,
						'Productuom': Productuom,
						'Salesorder': Salesorder,
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
    	expect($scope.salesorderdtl).toBeNull();
    	expect($scope.salesorderdtls).toBe('salesorderdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshSalesorderdtlList', function() {
    	// given
    	Salesorderdtl.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderdtl2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesorderdtlList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.salesorderdtls).toBe('salesorderdtl2');
    });
    
    it('refreshSalesorderdtl', function() {
    	// given
    	Salesorderdtl.get = function(salesorderdtlid) {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderdtl'+salesorderdtlid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshSalesorderdtl('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.salesorderdtl).toBe('salesorderdtl'+'1');
    });
    
	it('goToSalesorderdtlList', function() {
    	// given
    	spyOn($scope, "refreshSalesorderdtlList");
    	
    	// when
    	$scope.goToSalesorderdtlList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesorderdtlList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/salesorderdtl');
    });
    
    it('goToSalesorderdtl', function() {
    	// given
    	spyOn($scope, "refreshSalesorderdtl");
    	var salesorderdtlid = 1;
    	
    	// when
    	$scope.goToSalesorderdtl(salesorderdtlid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshSalesorderdtl).toHaveBeenCalledWith(salesorderdtlid);
    	expect($location.path).toHaveBeenCalledWith('/salesorderdtl'+'/'+salesorderdtlid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.salesorderdtl = {salesorderdtlid:'1', name:'salesorderdtl'};
    	
    	$scope.mode = 'create';
    	Salesorderdtl.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesorderdtl).toBe('salesorderdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.salesorderdtl = {salesorderdtlid:'1', name:'salesorderdtl'};
    	
    	$scope.mode = 'update';
    	Salesorderdtl.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'salesorderdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.salesorderdtl).toBe('salesorderdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Salesorderdtl.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToSalesorderdtlList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToSalesorderdtlList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : salesorderdtl create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/salesorderdtl/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.salesorderdtl).toBeNull();
    	expect($scope.salesorderdtls).toBe('salesorderdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});