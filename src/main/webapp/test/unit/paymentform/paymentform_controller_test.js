'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('paymentform.module'));
  
  describe('PaymentformCtrl', function(){
    var PaymentformCtrl, Paymentform, Useraccess, $rootScope, $scope, $routeParams, $httpBackend, $location, MessageHandler, $q, $controller;
	  
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

    	// Paymentform service
    	Paymentform = {
    		getAll: function() {
    			var deferred = $q.defer();
    			deferred.resolve({data:'paymentform1'});
    			return deferred.promise;
    		}
    	};
		
				Useraccess = {
			getAllAsListItems: jasmine.createSpy("getAllAsListItems").andCallFake(function() {
				return [];
			})
		};

				PaymentformCtrl = $controller('PaymentformCtrl', {
    		'Paymentform': Paymentform,
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
    	expect($scope.paymentform).toBeNull();
    	expect($scope.paymentforms).toBe('paymentform1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('refreshPaymentformList', function() {
    	// given
    	Paymentform.getAll = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentform2'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentformList();
    	$scope.$apply();

    	// then
    	$rootScope.$apply();
    	expect($scope.paymentforms).toBe('paymentform2');
    });
    
    it('refreshPaymentform', function() {
    	// given
    	Paymentform.get = function(paymentformid) {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentform'+paymentformid});
			return deferred.promise;
		}
    	
    	// when
    	$scope.refreshPaymentform('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.paymentform).toBe('paymentform'+'1');
    });
    
	it('goToPaymentformList', function() {
    	// given
    	spyOn($scope, "refreshPaymentformList");
    	
    	// when
    	$scope.goToPaymentformList();
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentformList).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/paymentform');
    });
    
    it('goToPaymentform', function() {
    	// given
    	spyOn($scope, "refreshPaymentform");
    	var paymentformid = 1;
    	
    	// when
    	$scope.goToPaymentform(paymentformid);
    	$scope.$apply();
    	
    	// then
    	expect($scope.refreshPaymentform).toHaveBeenCalledWith(paymentformid);
    	expect($location.path).toHaveBeenCalledWith('/paymentform'+'/'+paymentformid);
    });
    
    it('save : create', function() {
    	// given
    	$scope.paymentform = {paymentformid:'1', name:'paymentform'};
    	
    	$scope.mode = 'create';
    	Paymentform.create = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentformSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentform).toBe('paymentformSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('save : update', function() {
    	// given
    	$scope.paymentform = {paymentformid:'1', name:'paymentform'};
    	
    	$scope.mode = 'update';
    	Paymentform.update = function() {
			var deferred = $q.defer();
			deferred.resolve({data:'paymentformSaved'});
			return deferred.promise;
		}
    	
    	// when
    	$scope.save();
    	$scope.$apply();
    	
    	// then
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    	expect($scope.paymentform).toBe('paymentformSaved');
    	expect(MessageHandler.addSuccess).toHaveBeenCalledWith('save ok');
    });
    
    it('delete', function() {
    	// given
    	Paymentform.delete = function() {
			var deferred = $q.defer();
			deferred.resolve(null);
			return deferred.promise;
		}
    	spyOn($scope, "goToPaymentformList");
    	
    	// when
    	$scope.delete('1');
    	$scope.$apply();
    	
    	// then
    	expect($scope.goToPaymentformList).toHaveBeenCalled();
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
    
    it('init : paymentform create page', function() {
    	// given
		$location.path.andCallFake(function() {
        	return "/paymentform/new";
       	});

		// when
		$scope.$apply();
		
		// then
    	expect($scope.mode).toBeNull();
    	expect($scope.paymentform).toBeNull();
    	expect($scope.paymentforms).toBe('paymentform1');
    	expect(Object.keys($scope.items).length).toBe(1);
    	expect(MessageHandler.cleanMessage).toHaveBeenCalled();
    });
	
  });
});