'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('type.module'));
  
  describe('Type', function(){
	var $httpBackend, Type, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Type = $injector.get('Type');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/type').respond("test");
    	Type.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/type').respond("test");
    	Type.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/type/1').respond("test");
    	Type.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Type.create({typeid:null,name:'type'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('type.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/type').respond("test");
    	Type.create({typeid:'1',name:'type'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Type.update({typeid:null,name:'type'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('type.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/type/1').respond("test");
    	Type.update({typeid:'1',name:'type'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/type/1').respond("test");
    	Type.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});