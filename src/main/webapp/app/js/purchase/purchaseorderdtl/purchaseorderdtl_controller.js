'use strict';

/**
 * Controller for Purchaseorderdtl
 **/
purchaseModule.controller('PurchaseorderdtlCtrl', ['Purchaseorderdtl',  'Purchaseorder', 'Detailexpired', 'Productuom', 'Useraccess', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Purchaseorderdtl, Purchaseorder, Detailexpired, Productuom, Useraccess, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Purchaseorder',  'Detailexpired',  'Productuom',  'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of purchaseorderdtls
    $scope.purchaseorderdtls = [];
	// purchaseorderdtl to edit
    $scope.purchaseorderdtl = null;

	// referencies entities
	$scope.items = {};
    // purchaseorders
	$scope.items.purchaseorders = [];
    // detailexpireds
	$scope.items.detailexpireds = [];
    // productuoms
	$scope.items.productuoms = [];
    // useraccesss
	$scope.items.useraccesss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Purchaseorder.getAllAsListItems().then(
				function(success) {
        	        $scope.items.purchaseorders = success.data;
            	}, 
	            MessageHandler.manageError);
		Detailexpired.getAllAsListItems().then(
				function(success) {
        	        $scope.items.detailexpireds = success.data;
            	}, 
	            MessageHandler.manageError);
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
    };
    
    /**
     * Refresh purchaseorderdtls list
     */
    $scope.refreshPurchaseorderdtlList = function() {
    	try {
			$scope.purchaseorderdtls = [];
        	Purchaseorderdtl.getAll().then(
				function(success) {
        	        $scope.purchaseorderdtls = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh purchaseorderdtl
     */
    $scope.refreshPurchaseorderdtl = function(purchaseorderdtlid) {
    	try {
        	$scope.purchaseorderdtl = null;
	        Purchaseorderdtl.get(purchaseorderdtlid).then(
				function(success) {
        	        $scope.purchaseorderdtl = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the purchaseorderdtls list page
     */
    $scope.goToPurchaseorderdtlList = function() {
        $scope.refreshPurchaseorderdtlList();
        $location.path('/app/purchase/purchaseorderdtl');
    }
    /**
     * Go to the purchaseorderdtl edit page
     */
    $scope.goToPurchaseorderdtl = function(purchaseorderdtlid) {
        $scope.refreshPurchaseorderdtl(purchaseorderdtlid);
        $location.path('/app/purchase/purchaseorderdtl/'+purchaseorderdtlid);
    }

    // Actions

    /**
     * Save purchaseorderdtl
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Purchaseorderdtl.create;
			} else {
				save = Purchaseorderdtl.update;
			}
			save($scope.purchaseorderdtl).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.purchaseorderdtl = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete purchaseorderdtl
     */
    $scope.delete = function(purchaseorderdtlid) {
	    try {
			MessageHandler.cleanMessage();
    	    Purchaseorderdtl.delete(purchaseorderdtlid).then(
				function(success) {
                	$scope.goToPurchaseorderdtlList();
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
        $scope.purchaseorderdtl = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.purchaseorderdtlid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPurchaseorderdtl($routeParams.purchaseorderdtlid);
    } else {
        // List page
        $scope.refreshPurchaseorderdtlList();
    }
    
    
}]);
