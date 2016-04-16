'use strict';

/**
 * Controller for Purchaseorder
 **/
purchaseModule.controller('PurchaseorderCtrl', ['Purchaseorder',  'Supplier', 'Paymentform', 'PurchaseAccountbank', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Purchaseorder, Supplier, Paymentform, PurchaseAccountbank, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Supplier',  'Paymentform',  'PurchaseAccountbank',     // edition mode
    $scope.mode = null;
    
	// list of purchaseorders
    $scope.purchaseorders = [];
	// purchaseorder to edit
    $scope.purchaseorder = null;

	// referencies entities
	$scope.items = {};
    // suppliers
	$scope.items.suppliers = [];
    // paymentforms
	$scope.items.paymentforms = [];
    // accountbanks
	$scope.items.accountbanks = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Supplier.getAllAsListItems().then(
				function(success) {
        	        $scope.items.suppliers = success.data;
            	}, 
	            MessageHandler.manageError);
		Paymentform.getAllAsListItems().then(
				function(success) {
        	        $scope.items.paymentforms = success.data;
            	}, 
	            MessageHandler.manageError);
		PurchaseAccountbank.getAllAsListItems().then(
				function(success) {
        	        $scope.items.accountbanks = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh purchaseorders list
     */
    $scope.refreshPurchaseorderList = function() {
    	try {
			$scope.purchaseorders = [];
        	Purchaseorder.getAll().then(
				function(success) {
        	        $scope.purchaseorders = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh purchaseorder
     */
    $scope.refreshPurchaseorder = function(purchaseorderid) {
    	try {
        	$scope.purchaseorder = null;
	        Purchaseorder.get(purchaseorderid).then(
				function(success) {
        	        $scope.purchaseorder = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the purchaseorders list page
     */
    $scope.goToPurchaseorderList = function() {
        $scope.refreshPurchaseorderList();
        $location.path('/app/purchase/purchaseorder');
    }
    /**
     * Go to the purchaseorder edit page
     */
    $scope.goToPurchaseorder = function(purchaseorderid) {
        $scope.refreshPurchaseorder(purchaseorderid);
        $location.path('/app/purchase/purchaseorder/'+purchaseorderid);
    }

    // Actions

    /**
     * Save purchaseorder
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Purchaseorder.create;
			} else {
				save = Purchaseorder.update;
			}
			save($scope.purchaseorder).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.purchaseorder = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete purchaseorder
     */
    $scope.delete = function(purchaseorderid) {
	    try {
			MessageHandler.cleanMessage();
    	    Purchaseorder.delete(purchaseorderid).then(
				function(success) {
                	$scope.goToPurchaseorderList();
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
        $scope.purchaseorder = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.purchaseorderid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPurchaseorder($routeParams.purchaseorderid);
    } else {
        // List page
        $scope.refreshPurchaseorderList();
    }
    
    
}]);
