'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('accountbank.module'));
  
  describe('Accountbank', function(){
	var $httpBackend, Accountbank, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Accountbank = $injector.get('Accountbank');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/accountbank').respond("test");
    	Accountbank.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/accountbank').respond("test");
    	Accountbank.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/accountbank/1').respond("test");
    	Accountbank.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Accountbank.create({accountbankid:null,name:'accountbank'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountbank.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/accountbank').respond("test");
    	Accountbank.create({accountbankid:'1',name:'accountbank'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Accountbank.update({accountbankid:null,name:'accountbank'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('accountbank.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/accountbank/1').respond("test");
    	Accountbank.update({accountbankid:'1',name:'accountbank'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/accountbank/1').respond("test");
    	Accountbank.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});