'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('salesordercorrection.module'));
  
  describe('Salesordercorrection', function(){
	var $httpBackend, Salesordercorrection, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Salesordercorrection = $injector.get('Salesordercorrection');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/salesordercorrection').respond("test");
    	Salesordercorrection.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/salesordercorrection').respond("test");
    	Salesordercorrection.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/salesordercorrection/1').respond("test");
    	Salesordercorrection.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Salesordercorrection.create({salesordercorrectionid:null,name:'salesordercorrection'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesordercorrection.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/salesordercorrection').respond("test");
    	Salesordercorrection.create({salesordercorrectionid:'1',name:'salesordercorrection'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Salesordercorrection.update({salesordercorrectionid:null,name:'salesordercorrection'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesordercorrection.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/salesordercorrection/1').respond("test");
    	Salesordercorrection.update({salesordercorrectionid:'1',name:'salesordercorrection'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/salesordercorrection/1').respond("test");
    	Salesordercorrection.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});