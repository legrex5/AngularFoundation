'use strict';

/**
 * Controller for Productuom
 **/
stockModule.controller('ProductuomCtrl', ['Productuom',  'Uom', 'Useraccess', 'Product', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLStock', function(Productuom, Uom, Useraccess, Product, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLStock) {
	 'Uom',  'Useraccess',  'Product',     // edition mode
    $scope.mode = null;
    
	// list of productuoms
    $scope.productuoms = [];
	// productuom to edit
    $scope.productuom = null;

	// referencies entities
	$scope.items = {};
    // uoms
	$scope.items.uoms = [];
    // useraccesss
	$scope.items.useraccesss = [];
    // products
	$scope.items.products = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Uom.getAllAsListItems().then(
				function(success) {
        	        $scope.items.uoms = success.data;
            	}, 
	            MessageHandler.manageError);
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
		Product.getAllAsListItems().then(
				function(success) {
        	        $scope.items.products = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh productuoms list
     */
    $scope.refreshProductuomList = function() {
    	try {
			$scope.productuoms = [];
        	Productuom.getAll().then(
				function(success) {
        	        $scope.productuoms = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh productuom
     */
    $scope.refreshProductuom = function(productuomid) {
    	try {
        	$scope.productuom = null;
	        Productuom.get(productuomid).then(
				function(success) {
        	        $scope.productuom = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the productuoms list page
     */
    $scope.goToProductuomList = function() {
        $scope.refreshProductuomList();
        $location.path('/app/stock/productuom');
    }
    /**
     * Go to the productuom edit page
     */
    $scope.goToProductuom = function(productuomid) {
        $scope.refreshProductuom(productuomid);
        $location.path('/app/stock/productuom/'+productuomid);
    }

    // Actions

    /**
     * Save productuom
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Productuom.create;
			} else {
				save = Productuom.update;
			}
			save($scope.productuom).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.productuom = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete productuom
     */
    $scope.delete = function(productuomid) {
	    try {
			MessageHandler.cleanMessage();
    	    Productuom.delete(productuomid).then(
				function(success) {
                	$scope.goToProductuomList();
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
        $scope.productuom = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.productuomid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshProductuom($routeParams.productuomid);
    } else {
        // List page
        $scope.refreshProductuomList();
    }
    
    
}]);
