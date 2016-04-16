'use strict';

/**
 * Controller for Supplierproduct
 **/
purchaseModule.controller('SupplierproductCtrl', ['Supplierproduct',  'Supplier', 'Useraccess', 'Product', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Supplierproduct, Supplier, Useraccess, Product, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Supplier',  'Useraccess',  'Product',     // edition mode
    $scope.mode = null;
    
	// list of supplierproducts
    $scope.supplierproducts = [];
	// supplierproduct to edit
    $scope.supplierproduct = null;

	// referencies entities
	$scope.items = {};
    // suppliers
	$scope.items.suppliers = [];
    // useraccesss
	$scope.items.useraccesss = [];
    // products
	$scope.items.products = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Supplier.getAllAsListItems().then(
				function(success) {
        	        $scope.items.suppliers = success.data;
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
     * Refresh supplierproducts list
     */
    $scope.refreshSupplierproductList = function() {
    	try {
			$scope.supplierproducts = [];
        	Supplierproduct.getAll().then(
				function(success) {
        	        $scope.supplierproducts = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh supplierproduct
     */
    $scope.refreshSupplierproduct = function(supplierproductid) {
    	try {
        	$scope.supplierproduct = null;
	        Supplierproduct.get(supplierproductid).then(
				function(success) {
        	        $scope.supplierproduct = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the supplierproducts list page
     */
    $scope.goToSupplierproductList = function() {
        $scope.refreshSupplierproductList();
        $location.path('/app/purchase/supplierproduct');
    }
    /**
     * Go to the supplierproduct edit page
     */
    $scope.goToSupplierproduct = function(supplierproductid) {
        $scope.refreshSupplierproduct(supplierproductid);
        $location.path('/app/purchase/supplierproduct/'+supplierproductid);
    }

    // Actions

    /**
     * Save supplierproduct
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Supplierproduct.create;
			} else {
				save = Supplierproduct.update;
			}
			save($scope.supplierproduct).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.supplierproduct = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete supplierproduct
     */
    $scope.delete = function(supplierproductid) {
	    try {
			MessageHandler.cleanMessage();
    	    Supplierproduct.delete(supplierproductid).then(
				function(success) {
                	$scope.goToSupplierproductList();
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
        $scope.supplierproduct = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.supplierproductid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshSupplierproduct($routeParams.supplierproductid);
    } else {
        // List page
        $scope.refreshSupplierproductList();
    }
    
    
}]);
