'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('paymentform.module'));
  
  describe('Paymentform', function(){
	var $httpBackend, Paymentform, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Paymentform = $injector.get('Paymentform');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/paymentform').respond("test");
    	Paymentform.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/paymentform').respond("test");
    	Paymentform.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/paymentform/1').respond("test");
    	Paymentform.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Paymentform.create({paymentformid:null,name:'paymentform'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentform.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/paymentform').respond("test");
    	Paymentform.create({paymentformid:'1',name:'paymentform'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Paymentform.update({paymentformid:null,name:'paymentform'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('paymentform.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/paymentform/1').respond("test");
    	Paymentform.update({paymentformid:'1',name:'paymentform'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/paymentform/1').respond("test");
    	Paymentform.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});