'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('pricehistory.module'));
  
  describe('PricehistoryCtrl', function(){
    var PricehistoryCtrl, Pricehistory, Useraccess,  Product, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Pricehistory service
    	Pricehistory = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'pricehistory1'});
    			return deferred.promise;
    		}
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

				PricehistoryCtrl = $controller('PricehistoryCtrl', {
    		'Pricehistory': Pricehistory,
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
    	expect($scope.pricehistory).toBeNull();
    	expect($scope.pricehistorys).toBe('pricehistory1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPricehistoryList', function() {
    	// given
    	Pricehistory.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pricehistory2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPricehistoryList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.pricehistorys).toBe('pricehistory2');
    });
    
    it('refreshPricehistory', function() {
    	// given
    	Pricehistory.get = function(pricehistoryid) {
			var deferred = $q.defer();
			deferred.resolve({data:'pricehistory'+pricehistoryid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPricehistory('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.pricehistory).toBe('pricehistory'+'1');
    });
    
	it('goToPricehistoryList', function() {
    	// given
    	spyOn($scope, "refreshPricehistoryList");
    	
    	// when
    	$scope.goToPricehistoryList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPricehistoryList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/pricehistory');
    });
    
    it('goToPricehistory', function() {
    	// given
    	spyOn($scope, "refreshPricehistory");
    	var pricehistoryid = 1;
    	
    	// when
    	$scope.goToPricehistory(pricehistoryid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPricehistory).toHaveBeenCalledWith(pricehistoryid);
    	expect($location.path).toHaveBeenCalledWith('/pricehistory'+'/'+pricehistoryid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.pricehistory = {pricehistoryid:'1', name:'pricehistory'};
    	
    	$scope.mode = 'create';
    	Pricehistory.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pricehistorySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.pricehistory).toBe('pricehistorySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.pricehistory = {pricehistoryid:'1', name:'pricehistory'};
    	
    	$scope.mode = 'update';
    	Pricehistory.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'pricehistorySaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.pricehistory).toBe('pricehistorySaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Pricehistory.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPricehistoryList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPricehistoryList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : pricehistory create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/pricehistory/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.pricehistory).toBeNull();
    	expect($scope.pricehistorys).toBe('pricehistory1');
    	expect(Object.keys($scope.items).length).toBe(2);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});