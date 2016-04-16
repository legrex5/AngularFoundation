'use strict';

/**
 * Controller for Productstock
 **/
stockModule.controller('ProductstockCtrl', ['Productstock',  'Productuom', 'Useraccess', 'Location', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLStock', function(Productstock, Productuom, Useraccess, Location, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLStock) {
	 'Productuom',  'Useraccess',  'Location',     // edition mode
    $scope.mode = null;
    
	// list of productstocks
    $scope.productstocks = [];
	// productstock to edit
    $scope.productstock = null;

	// referencies entities
	$scope.items = {};
    // productuoms
	$scope.items.productuoms = [];
    // useraccesss
	$scope.items.useraccesss = [];
    // locations
	$scope.items.locations = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Productuom.getAllAsListItems().then(
				function(success) {
        	        $scope.items.productuoms = success.data;
            	}, 
	            MessageHandler.manageError);
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
		Location.getAllAsListItems().then(
				function(success) {
        	        $scope.items.locations = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh productstocks list
     */
    $scope.refreshProductstockList = function() {
    	try {
			$scope.productstocks = [];
        	Productstock.getAll().then(
				function(success) {
        	        $scope.productstocks = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh productstock
     */
    $scope.refreshProductstock = function(productstockid) {
    	try {
        	$scope.productstock = null;
	        Productstock.get(productstockid).then(
				function(success) {
        	        $scope.productstock = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the productstocks list page
     */
    $scope.goToProductstockList = function() {
        $scope.refreshProductstockList();
        $location.path('/app/stock/productstock');
    }
    /**
     * Go to the productstock edit page
     */
    $scope.goToProductstock = function(productstockid) {
        $scope.refreshProductstock(productstockid);
        $location.path('/app/stock/productstock/'+productstockid);
    }

    // Actions

    /**
     * Save productstock
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Productstock.create;
			} else {
				save = Productstock.update;
			}
			save($scope.productstock).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.productstock = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete productstock
     */
    $scope.delete = function(productstockid) {
	    try {
			MessageHandler.cleanMessage();
    	    Productstock.delete(productstockid).then(
				function(success) {
                	$scope.goToProductstockList();
            	}, 
                MessageHandler.manageError);
        } catch(ex) {
            MessageHandler.manageException(ex);
        }
    };
    
    // Main
	MessageHandler.cleanMessage();
    if( $location.path().endsWith('/new') ) {
        // Creation page
        $scope.productstock = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.productstockid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshProductstock($routeParams.productstockid);
    } else {
        // List page
        $scope.refreshProductstockList();
    }
    
    
}]);
