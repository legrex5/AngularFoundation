'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('returnsupplierdtl.module'));
  
  describe('ReturnsupplierdtlCtrl', function(){
    var ReturnsupplierdtlCtrl, Returnsupplierdtl, Returnsupplier,  Detailexpired,  Productuom,  Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Returnsupplierdtl service
    	Returnsupplierdtl = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'returnsupplierdtl1'});
    			return deferred.promise;
    		}
    	};
		
				Returnsupplier = {
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

				ReturnsupplierdtlCtrl = $controller('ReturnsupplierdtlCtrl', {
    		'Returnsupplierdtl': Returnsupplierdtl,
						'Returnsupplier': Returnsupplier,
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
    	expect($scope.returnsupplierdtl).toBeNull();
    	expect($scope.returnsupplierdtls).toBe('returnsupplierdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshReturnsupplierdtlList', function() {
    	// given
    	Returnsupplierdtl.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierdtl2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReturnsupplierdtlList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.returnsupplierdtls).toBe('returnsupplierdtl2');
    });
    
    it('refreshReturnsupplierdtl', function() {
    	// given
    	Returnsupplierdtl.get = function(returndtlid) {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierdtl'+returndtlid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshReturnsupplierdtl('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.returnsupplierdtl).toBe('returnsupplierdtl'+'1');
    });
    
	it('goToReturnsupplierdtlList', function() {
    	// given
    	spyOn($scope, "refreshReturnsupplierdtlList");
    	
    	// when
    	$scope.goToReturnsupplierdtlList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReturnsupplierdtlList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/returnsupplierdtl');
    });
    
    it('goToReturnsupplierdtl', function() {
    	// given
    	spyOn($scope, "refreshReturnsupplierdtl");
    	var returndtlid = 1;
    	
    	// when
    	$scope.goToReturnsupplierdtl(returndtlid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshReturnsupplierdtl).toHaveBeenCalledWith(returndtlid);
    	expect($location.path).toHaveBeenCalledWith('/returnsupplierdtl'+'/'+returndtlid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.returnsupplierdtl = {returndtlid:'1', name:'returnsupplierdtl'};
    	
    	$scope.mode = 'create';
    	Returnsupplierdtl.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.returnsupplierdtl).toBe('returnsupplierdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.returnsupplierdtl = {returndtlid:'1', name:'returnsupplierdtl'};
    	
    	$scope.mode = 'update';
    	Returnsupplierdtl.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'returnsupplierdtlSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.returnsupplierdtl).toBe('returnsupplierdtlSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Returnsupplierdtl.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToReturnsupplierdtlList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToReturnsupplierdtlList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : returnsupplierdtl create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/returnsupplierdtl/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.returnsupplierdtl).toBeNull();
    	expect($scope.returnsupplierdtls).toBe('returnsupplierdtl1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});