'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('locationdtl.module'));
  
  describe('Locationdtl', function(){
	var $httpBackend, Locationdtl, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Locationdtl = $injector.get('Locationdtl');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/locationdtl').respond("test");
    	Locationdtl.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/locationdtl').respond("test");
    	Locationdtl.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/locationdtl/1').respond("test");
    	Locationdtl.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Locationdtl.create({locationdtlid:null,name:'locationdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('locationdtl.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/locationdtl').respond("test");
    	Locationdtl.create({locationdtlid:'1',name:'locationdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Locationdtl.update({locationdtlid:null,name:'locationdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('locationdtl.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/locationdtl/1').respond("test");
    	Locationdtl.update({locationdtlid:'1',name:'locationdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/locationdtl/1').respond("test");
    	Locationdtl.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});