'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('purchaseorderdtl.module'));
  
  describe('Purchaseorderdtl', function(){
	var $httpBackend, Purchaseorderdtl, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Purchaseorderdtl = $injector.get('Purchaseorderdtl');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/purchaseorderdtl').respond("test");
    	Purchaseorderdtl.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/purchaseorderdtl').respond("test");
    	Purchaseorderdtl.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/purchaseorderdtl/1').respond("test");
    	Purchaseorderdtl.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Purchaseorderdtl.create({purchaseorderdtlid:null,name:'purchaseorderdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('purchaseorderdtl.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/purchaseorderdtl').respond("test");
    	Purchaseorderdtl.create({purchaseorderdtlid:'1',name:'purchaseorderdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Purchaseorderdtl.update({purchaseorderdtlid:null,name:'purchaseorderdtl'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('purchaseorderdtl.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/purchaseorderdtl/1').respond("test");
    	Purchaseorderdtl.update({purchaseorderdtlid:'1',name:'purchaseorderdtl'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/purchaseorderdtl/1').respond("test");
    	Purchaseorderdtl.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});