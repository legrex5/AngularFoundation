'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('salesorderdtl.module'));
  
  describe('Salesorderdtl', function(){
	var $httpBackend, Salesorderdtl, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Salesorderdtl = $injector.get('Salesorderdtl');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/salesorderdtl').respond("test");
    	Salesorderdtl.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/salesorderdtl').respond("test");
    	Salesorderdtl.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/salesorderdtl/1').respond("test");
    	Salesorderdtl.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Salesorderdtl.create({salesorderdtlid:null,name:'salesorderdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesorderdtl.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/salesorderdtl').respond("test");
    	Salesorderdtl.create({salesorderdtlid:'1',name:'salesorderdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Salesorderdtl.update({salesorderdtlid:null,name:'salesorderdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesorderdtl.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/salesorderdtl/1').respond("test");
    	Salesorderdtl.update({salesorderdtlid:'1',name:'salesorderdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/salesorderdtl/1').respond("test");
    	Salesorderdtl.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});