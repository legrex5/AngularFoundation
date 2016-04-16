'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('returnsupplierdtl.module'));
  
  describe('Returnsupplierdtl', function(){
	var $httpBackend, Returnsupplierdtl, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Returnsupplierdtl = $injector.get('Returnsupplierdtl');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/returnsupplierdtl').respond("test");
    	Returnsupplierdtl.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/returnsupplierdtl').respond("test");
    	Returnsupplierdtl.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/returnsupplierdtl/1').respond("test");
    	Returnsupplierdtl.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Returnsupplierdtl.create({returndtlid:null,name:'returnsupplierdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('returnsupplierdtl.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/returnsupplierdtl').respond("test");
    	Returnsupplierdtl.create({returndtlid:'1',name:'returnsupplierdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Returnsupplierdtl.update({returndtlid:null,name:'returnsupplierdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('returnsupplierdtl.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/returnsupplierdtl/1').respond("test");
    	Returnsupplierdtl.update({returndtlid:'1',name:'returnsupplierdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/returnsupplierdtl/1').respond("test");
    	Returnsupplierdtl.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});