'use strict';

/**
 * Controller for Returnsupplierdtl
 **/
purchaseModule.controller('ReturnsupplierdtlCtrl', ['Returnsupplierdtl',  'Returnsupplier', 'Detailexpired', 'Productuom', 'Useraccess', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLPurchase', function(Returnsupplierdtl, Returnsupplier, Detailexpired, Productuom, Useraccess, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLPurchase) {
	 'Returnsupplier',  'Detailexpired',  'Productuom',  'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of returnsupplierdtls
    $scope.returnsupplierdtls = [];
	// returnsupplierdtl to edit
    $scope.returnsupplierdtl = null;

	// referencies entities
	$scope.items = {};
    // returnsuppliers
	$scope.items.returnsuppliers = [];
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
		Returnsupplier.getAllAsListItems().then(
				function(success) {
        	        $scope.items.returnsuppliers = success.data;
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
     * Refresh returnsupplierdtls list
     */
    $scope.refreshReturnsupplierdtlList = function() {
    	try {
			$scope.returnsupplierdtls = [];
        	Returnsupplierdtl.getAll().then(
				function(success) {
        	        $scope.returnsupplierdtls = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh returnsupplierdtl
     */
    $scope.refreshReturnsupplierdtl = function(returndtlid) {
    	try {
        	$scope.returnsupplierdtl = null;
	        Returnsupplierdtl.get(returndtlid).then(
				function(success) {
        	        $scope.returnsupplierdtl = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the returnsupplierdtls list page
     */
    $scope.goToReturnsupplierdtlList = function() {
        $scope.refreshReturnsupplierdtlList();
        $location.path('/app/purchase/returnsupplierdtl');
    }
    /**
     * Go to the returnsupplierdtl edit page
     */
    $scope.goToReturnsupplierdtl = function(returndtlid) {
        $scope.refreshReturnsupplierdtl(returndtlid);
        $location.path('/app/purchase/returnsupplierdtl/'+returndtlid);
    }

    // Actions

    /**
     * Save returnsupplierdtl
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Returnsupplierdtl.create;
			} else {
				save = Returnsupplierdtl.update;
			}
			save($scope.returnsupplierdtl).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.returnsupplierdtl = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete returnsupplierdtl
     */
    $scope.delete = function(returndtlid) {
	    try {
			MessageHandler.cleanMessage();
    	    Returnsupplierdtl.delete(returndtlid).then(
				function(success) {
                	$scope.goToReturnsupplierdtlList();
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
        $scope.returnsupplierdtl = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.returndtlid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshReturnsupplierdtl($routeParams.returndtlid);
    } else {
        // List page
        $scope.refreshReturnsupplierdtlList();
    }
    
    
}]);
