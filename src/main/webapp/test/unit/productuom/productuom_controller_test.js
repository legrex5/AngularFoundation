'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('productuom.module'));
  
  describe('ProductuomCtrl', function(){
    var ProductuomCtrl, Productuom, Uom,  Useraccess,  Product, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Productuom service
    	Productuom = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'productuom1'});
    			return deferred.promise;
    		}
    	};
		
				Uom = {
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

				ProductuomCtrl = $controller('ProductuomCtrl', {
    		'Productuom': Productuom,
						'Uom': Uom,
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
    	expect($scope.productuom).toBeNull();
    	expect($scope.productuoms).toBe('productuom1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshProductuomList', function() {
    	// given
    	Productuom.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productuom2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProductuomList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.productuoms).toBe('productuom2');
    });
    
    it('refreshProductuom', function() {
    	// given
    	Productuom.get = function(productuomid) {
			var deferred = $q.defer();
			deferred.resolve({data:'productuom'+productuomid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshProductuom('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.productuom).toBe('productuom'+'1');
    });
    
	it('goToProductuomList', function() {
    	// given
    	spyOn($scope, "refreshProductuomList");
    	
    	// when
    	$scope.goToProductuomList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProductuomList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/productuom');
    });
    
    it('goToProductuom', function() {
    	// given
    	spyOn($scope, "refreshProductuom");
    	var productuomid = 1;
    	
    	// when
    	$scope.goToProductuom(productuomid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshProductuom).toHaveBeenCalledWith(productuomid);
    	expect($location.path).toHaveBeenCalledWith('/productuom'+'/'+productuomid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.productuom = {productuomid:'1', name:'productuom'};
    	
    	$scope.mode = 'create';
    	Productuom.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productuomSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.productuom).toBe('productuomSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.productuom = {productuomid:'1', name:'productuom'};
    	
    	$scope.mode = 'update';
    	Productuom.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'productuomSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.productuom).toBe('productuomSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Productuom.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToProductuomList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToProductuomList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : productuom create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/productuom/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.productuom).toBeNull();
    	expect($scope.productuoms).toBe('productuom1');
    	expect(Object.keys($scope.items).length).toBe(3);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});