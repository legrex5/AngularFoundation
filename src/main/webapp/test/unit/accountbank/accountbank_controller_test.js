'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('accountbank.module'));
  
  describe('AccountbankCtrl', function(){
    var AccountbankCtrl, Accountbank, Salesorder,  Useraccess,  Bank,  Supplier, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Accountbank service
    	Accountbank = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'accountbank1'});
    			return deferred.promise;
    		}
    	};
		
				Salesorder = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Bank = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				Supplier = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				AccountbankCtrl = $controller('AccountbankCtrl', {
    		'Accountbank': Accountbank,
						'Salesorder': Salesorder,
						'Useraccess': Useraccess,
						'Bank': Bank,
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
    	expect($scope.accountbank).toBeNull();
    	expect($scope.accountbanks).toBe('accountbank1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshAccountbankList', function() {
    	// given
    	Accountbank.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountbank2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountbankList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.accountbanks).toBe('accountbank2');
    });
    
    it('refreshAccountbank', function() {
    	// given
    	Accountbank.get = function(accountbankid) {
			var deferred = $q.defer();
			deferred.resolve({data:'accountbank'+accountbankid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshAccountbank('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.accountbank).toBe('accountbank'+'1');
    });
    
	it('goToAccountbankList', function() {
    	// given
    	spyOn($scope, "refreshAccountbankList");
    	
    	// when
    	$scope.goToAccountbankList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountbankList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/accountbank');
    });
    
    it('goToAccountbank', function() {
    	// given
    	spyOn($scope, "refreshAccountbank");
    	var accountbankid = 1;
    	
    	// when
    	$scope.goToAccountbank(accountbankid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshAccountbank).toHaveBeenCalledWith(accountbankid);
    	expect($location.path).toHaveBeenCalledWith('/accountbank'+'/'+accountbankid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.accountbank = {accountbankid:'1', name:'accountbank'};
    	
    	$scope.mode = 'create';
    	Accountbank.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountbankSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountbank).toBe('accountbankSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.accountbank = {accountbankid:'1', name:'accountbank'};
    	
    	$scope.mode = 'update';
    	Accountbank.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'accountbankSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.accountbank).toBe('accountbankSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Accountbank.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToAccountbankList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToAccountbankList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : accountbank create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/accountbank/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.accountbank).toBeNull();
    	expect($scope.accountbanks).toBe('accountbank1');
    	expect(Object.keys($scope.items).length).toBe(4);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});