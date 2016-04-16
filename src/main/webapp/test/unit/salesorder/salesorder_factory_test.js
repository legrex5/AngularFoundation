'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('salesorder.module'));
  
  describe('Salesorder', function(){
	var $httpBackend, Salesorder, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Salesorder = $injector.get('Salesorder');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/salesorder').respond("test");
    	Salesorder.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/salesorder').respond("test");
    	Salesorder.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/salesorder/1').respond("test");
    	Salesorder.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Salesorder.create({salesorderid:null,name:'salesorder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesorder.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/salesorder').respond("test");
    	Salesorder.create({salesorderid:'1',name:'salesorder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Salesorder.update({salesorderid:null,name:'salesorder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('salesorder.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/salesorder/1').respond("test");
    	Salesorder.update({salesorderid:'1',name:'salesorder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/salesorder/1').respond("test");
    	Salesorder.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});