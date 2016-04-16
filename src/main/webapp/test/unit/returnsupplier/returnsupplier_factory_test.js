'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('returnsupplier.module'));
  
  describe('Returnsupplier', function(){
	var $httpBackend, Returnsupplier, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Returnsupplier = $injector.get('Returnsupplier');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/returnsupplier').respond("test");
    	Returnsupplier.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/returnsupplier').respond("test");
    	Returnsupplier.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/returnsupplier/1').respond("test");
    	Returnsupplier.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Returnsupplier.create({returnsupplierid:null,name:'returnsupplier'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('returnsupplier.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/returnsupplier').respond("test");
    	Returnsupplier.create({returnsupplierid:'1',name:'returnsupplier'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Returnsupplier.update({returnsupplierid:null,name:'returnsupplier'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('returnsupplier.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/returnsupplier/1').respond("test");
    	Returnsupplier.update({returnsupplierid:'1',name:'returnsupplier'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/returnsupplier/1').respond("test");
    	Returnsupplier.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});