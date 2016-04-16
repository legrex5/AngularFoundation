'use strict';

/* jasmine specs for controllers go here */

describe('services', function(){
  beforeEach(module('purchaseorder.module'));
  
  describe('Purchaseorder', function(){
	var $httpBackend, Purchaseorder, restURL;
	  
    beforeEach(inject(function($injector) {
    	$httpBackend = $injector.get('$httpBackend');
    	Purchaseorder = $injector.get('Purchaseorder');
        restURL = $injector.get('restURL');
    }));

    afterEach(function() {
    	$httpBackend.verifyNoOutstandingExpectation();
    	$httpBackend.verifyNoOutstandingRequest();
    });
    
	it('getAllAsListItems', function() {
		$httpBackend.when('GET', restURL+'/items/purchaseorder').respond("test");
    	Purchaseorder.getAllAsListItems().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
	});

    it('getAll', function() {
    	$httpBackend.when('GET', restURL+'/purchaseorder').respond("test");
    	Purchaseorder.getAll().then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('get', function() {
    	$httpBackend.when('GET', restURL+'/purchaseorder/1').respond("test");
    	Purchaseorder.get('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('create throws exception : id not defined', function() {
    	try{
    		Purchaseorder.create({purchaseorderid:null,name:'purchaseorder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('purchaseorder.id.not.defined');
    	}
    });
    
    it('create', function() {
    	$httpBackend.when('POST', restURL+'/purchaseorder').respond("test");
    	Purchaseorder.create({purchaseorderid:'1',name:'purchaseorder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('update throws exception : id not defined', function() {
    	try{
    		Purchaseorder.update({purchaseorderid:null,name:'purchaseorder'});
    		$httpBackend.flush();
    	} catch(errors) {
    		expect(errors[0]).toBe('purchaseorder.id.not.defined');
    	}
    });
    
    it('update', function() {
    	$httpBackend.when('PUT', restURL+'/purchaseorder/1').respond("test");
    	Purchaseorder.update({purchaseorderid:'1',name:'purchaseorder'}).then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
    
    it('delete', function() {
    	$httpBackend.when('DELETE', restURL+'/purchaseorder/1').respond("test");
    	Purchaseorder.delete('1').then(function(response) {
        	expect(response.status).toBe(200);
    		expect(response.data).toBe("test");
    	});
    	$httpBackend.flush();
    });
  });
});