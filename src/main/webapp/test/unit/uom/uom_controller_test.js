'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('uom.module'));
  
  describe('UomCtrl', function(){
    var UomCtrl, Uom, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Uom service
    	Uom = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'uom1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				UomCtrl = $controller('UomCtrl', {
    		'Uom': Uom,
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
    	expect($scope.uom).toBeNull();
    	expect($scope.uoms).toBe('uom1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshUomList', function() {
    	// given
    	Uom.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'uom2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUomList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.uoms).toBe('uom2');
    });
    
    it('refreshUom', function() {
    	// given
    	Uom.get = function(uomid) {
			var deferred = $q.defer();
			deferred.resolve({data:'uom'+uomid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshUom('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.uom).toBe('uom'+'1');
    });
    
	it('goToUomList', function() {
    	// given
    	spyOn($scope, "refreshUomList");
    	
    	// when
    	$scope.goToUomList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUomList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/uom');
    });
    
    it('goToUom', function() {
    	// given
    	spyOn($scope, "refreshUom");
    	var uomid = 1;
    	
    	// when
    	$scope.goToUom(uomid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshUom).toHaveBeenCalledWith(uomid);
    	expect($location.path).toHaveBeenCalledWith('/uom'+'/'+uomid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.uom = {uomid:'1', name:'uom'};
    	
    	$scope.mode = 'create';
    	Uom.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'uomSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.uom).toBe('uomSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.uom = {uomid:'1', name:'uom'};
    	
    	$scope.mode = 'update';
    	Uom.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'uomSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.uom).toBe('uomSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Uom.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToUomList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToUomList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : uom create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/uom/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.uom).toBeNull();
    	expect($scope.uoms).toBe('uom1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});