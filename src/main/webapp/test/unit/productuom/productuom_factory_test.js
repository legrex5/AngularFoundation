'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('productuom.module'));
  
  describe('Productuom', function(){
	var $httpBackend, Productuom, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Productuom = $injector.get('Productuom');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/productuom').respond("test");
    	Productuom.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/productuom').respond("test");
    	Productuom.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/productuom/1').respond("test");
    	Productuom.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Productuom.create({productuomid:null,name:'productuom'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('productuom.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/productuom').respond("test");
    	Productuom.create({productuomid:'1',name:'productuom'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Productuom.update({productuomid:null,name:'productuom'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('productuom.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/productuom/1').respond("test");
    	Productuom.update({productuomid:'1',name:'productuom'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/productuom/1').respond("test");
    	Productuom.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});