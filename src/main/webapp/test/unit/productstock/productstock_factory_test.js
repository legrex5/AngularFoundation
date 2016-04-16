'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('productstock.module'));
  
  describe('Productstock', function(){
	var $httpBackend, Productstock, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Productstock = $injector.get('Productstock');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/productstock').respond("test");
    	Productstock.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/productstock').respond("test");
    	Productstock.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/productstock/1').respond("test");
    	Productstock.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Productstock.create({productstockid:null,name:'productstock'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('productstock.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/productstock').respond("test");
    	Productstock.create({productstockid:'1',name:'productstock'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Productstock.update({productstockid:null,name:'productstock'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('productstock.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/productstock/1').respond("test");
    	Productstock.update({productstockid:'1',name:'productstock'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/productstock/1').respond("test");
    	Productstock.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});