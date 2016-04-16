'use strict';

/**
 * Controller for Product
 **/
masterModule.controller('ProductCtrl', ['Product',  'Useraccess', 'Type', 'Category', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Product, Useraccess, Type, Category, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',  'Type',  'Category',     // edition mode
    $scope.mode = null;
    
	// list of products
    $scope.products = [];
	// product to edit
    $scope.product = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];
    // types
	$scope.items.types = [];
    // categorys
	$scope.items.categorys = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
		Type.getAllAsListItems().then(
				function(success) {
        	        $scope.items.types = success.data;
            	}, 
	            MessageHandler.manageError);
		Category.getAllAsListItems().then(
				function(success) {
        	        $scope.items.categorys = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh products list
     */
    $scope.refreshProductList = function() {
    	try {
			$scope.products = [];
        	Product.getAll().then(
				function(success) {
        	        $scope.products = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh product
     */
    $scope.refreshProduct = function(productid) {
    	try {
        	$scope.product = null;
	        Product.get(productid).then(
				function(success) {
        	        $scope.product = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the products list page
     */
    $scope.goToProductList = function() {
        $scope.refreshProductList();
        $location.path('/app/master/product');
    }
    /**
     * Go to the product edit page
     */
    $scope.goToProduct = function(productid) {
        $scope.refreshProduct(productid);
        $location.path('/app/master/product/'+productid);
    }

    // Actions

    /**
     * Save product
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Product.create;
			} else {
				save = Product.update;
			}
			save($scope.product).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.product = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete product
     */
    $scope.delete = function(productid) {
	    try {
			MessageHandler.cleanMessage();
    	    Product.delete(productid).then(
				function(success) {
                	$scope.goToProductList();
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
        $scope.product = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.productid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshProduct($stateParams.productid);
    } else {
        // List page
        $scope.refreshProductList();
    }
    
    
}]);
