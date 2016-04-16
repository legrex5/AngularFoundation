'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('supplier.module'));
  
  describe('Supplier', function(){
	var $httpBackend, Supplier, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Supplier = $injector.get('Supplier');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/supplier').respond("test");
    	Supplier.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/supplier').respond("test");
    	Supplier.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/supplier/1').respond("test");
    	Supplier.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Supplier.create({supplierid:null,name:'supplier'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('supplier.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/supplier').respond("test");
    	Supplier.create({supplierid:'1',name:'supplier'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Supplier.update({supplierid:null,name:'supplier'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('supplier.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/supplier/1').respond("test");
    	Supplier.update({supplierid:'1',name:'supplier'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/supplier/1').respond("test");
    	Supplier.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});