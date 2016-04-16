'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('pricehistory.module'));
  
  describe('Pricehistory', function(){
	var $httpBackend, Pricehistory, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Pricehistory = $injector.get('Pricehistory');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/pricehistory').respond("test");
    	Pricehistory.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/pricehistory').respond("test");
    	Pricehistory.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/pricehistory/1').respond("test");
    	Pricehistory.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Pricehistory.create({pricehistoryid:null,name:'pricehistory'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('pricehistory.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/pricehistory').respond("test");
    	Pricehistory.create({pricehistoryid:'1',name:'pricehistory'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Pricehistory.update({pricehistoryid:null,name:'pricehistory'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('pricehistory.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/pricehistory/1').respond("test");
    	Pricehistory.update({pricehistoryid:'1',name:'pricehistory'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/pricehistory/1').respond("test");
    	Pricehistory.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});