'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('useraccess.module'));
  
  describe('Useraccess', function(){
	var $httpBackend, Useraccess, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Useraccess = $injector.get('Useraccess');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/useraccess').respond("test");
    	Useraccess.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/useraccess').respond("test");
    	Useraccess.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/useraccess/1').respond("test");
    	Useraccess.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Useraccess.create({userid:null,name:'useraccess'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('useraccess.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/useraccess').respond("test");
    	Useraccess.create({userid:'1',name:'useraccess'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Useraccess.update({userid:null,name:'useraccess'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('useraccess.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/useraccess/1').respond("test");
    	Useraccess.update({userid:'1',name:'useraccess'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/useraccess/1').respond("test");
    	Useraccess.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});