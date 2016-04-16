'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bank.module'));
  
  describe('BankCtrl', function(){
    var BankCtrl, Bank, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Bank service
    	Bank = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'bank1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				BankCtrl = $controller('BankCtrl', {
    		'Bank': Bank,
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
    	expect($scope.bank).toBeNull();
    	expect($scope.banks).toBe('bank1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshBankList', function() {
    	// given
    	Bank.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bank2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBankList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.banks).toBe('bank2');
    });
    
    it('refreshBank', function() {
    	// given
    	Bank.get = function(bankid) {
			var deferred = $q.defer();
			deferred.resolve({data:'bank'+bankid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshBank('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.bank).toBe('bank'+'1');
    });
    
	it('goToBankList', function() {
    	// given
    	spyOn($scope, "refreshBankList");
    	
    	// when
    	$scope.goToBankList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBankList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/bank');
    });
    
    it('goToBank', function() {
    	// given
    	spyOn($scope, "refreshBank");
    	var bankid = 1;
    	
    	// when
    	$scope.goToBank(bankid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshBank).toHaveBeenCalledWith(bankid);
    	expect($location.path).toHaveBeenCalledWith('/bank'+'/'+bankid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.bank = {bankid:'1', name:'bank'};
    	
    	$scope.mode = 'create';
    	Bank.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bankSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bank).toBe('bankSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.bank = {bankid:'1', name:'bank'};
    	
    	$scope.mode = 'update';
    	Bank.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'bankSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.bank).toBe('bankSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Bank.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToBankList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToBankList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : bank create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/bank/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.bank).toBeNull();
    	expect($scope.banks).toBe('bank1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});