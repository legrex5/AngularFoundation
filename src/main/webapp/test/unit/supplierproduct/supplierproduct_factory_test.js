'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('supplierproduct.module'));
  
  describe('Supplierproduct', function(){
	var $httpBackend, Supplierproduct, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Supplierproduct = $injector.get('Supplierproduct');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/supplierproduct').respond("test");
    	Supplierproduct.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/supplierproduct').respond("test");
    	Supplierproduct.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/supplierproduct/1').respond("test");
    	Supplierproduct.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Supplierproduct.create({supplierproductid:null,name:'supplierproduct'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('supplierproduct.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/supplierproduct').respond("test");
    	Supplierproduct.create({supplierproductid:'1',name:'supplierproduct'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Supplierproduct.update({supplierproductid:null,name:'supplierproduct'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('supplierproduct.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/supplierproduct/1').respond("test");
    	Supplierproduct.update({supplierproductid:'1',name:'supplierproduct'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/supplierproduct/1').respond("test");
    	Supplierproduct.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});