'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('detailexpired.module'));
  
  describe('Detailexpired', function(){
	var $httpBackend, Detailexpired, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Detailexpired = $injector.get('Detailexpired');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/detailexpired').respond("test");
    	Detailexpired.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/detailexpired').respond("test");
    	Detailexpired.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/detailexpired/1').respond("test");
    	Detailexpired.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Detailexpired.create({detailexpiredid:null,name:'detailexpired'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('detailexpired.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/detailexpired').respond("test");
    	Detailexpired.create({detailexpiredid:'1',name:'detailexpired'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Detailexpired.update({detailexpiredid:null,name:'detailexpired'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('detailexpired.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/detailexpired/1').respond("test");
    	Detailexpired.update({detailexpiredid:'1',name:'detailexpired'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/detailexpired/1').respond("test");
    	Detailexpired.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});