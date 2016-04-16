'use strict';

/**
 * Controller for Pricehistory
 **/
masterModule.controller('PricehistoryCtrl', ['Pricehistory',  'Useraccess', 'Product', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Pricehistory, Useraccess, Product, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',  'Product',     // edition mode
    $scope.mode = null;
    
	// list of pricehistorys
    $scope.pricehistorys = [];
	// pricehistory to edit
    $scope.pricehistory = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];
    // products
	$scope.items.products = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
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
     * Refresh pricehistorys list
     */
    $scope.refreshPricehistoryList = function() {
    	try {
			$scope.pricehistorys = [];
        	Pricehistory.getAll().then(
				function(success) {
        	        $scope.pricehistorys = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh pricehistory
     */
    $scope.refreshPricehistory = function(pricehistoryid) {
    	try {
        	$scope.pricehistory = null;
	        Pricehistory.get(pricehistoryid).then(
				function(success) {
        	        $scope.pricehistory = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the pricehistorys list page
     */
    $scope.goToPricehistoryList = function() {
        $scope.refreshPricehistoryList();
        $location.path('/app/master/pricehistory');
    }
    /**
     * Go to the pricehistory edit page
     */
    $scope.goToPricehistory = function(pricehistoryid) {
        $scope.refreshPricehistory(pricehistoryid);
        $location.path('/app/master/pricehistory/'+pricehistoryid);
    }

    // Actions

    /**
     * Save pricehistory
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Pricehistory.create;
			} else {
				save = Pricehistory.update;
			}
			save($scope.pricehistory).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.pricehistory = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete pricehistory
     */
    $scope.delete = function(pricehistoryid) {
	    try {
			MessageHandler.cleanMessage();
    	    Pricehistory.delete(pricehistoryid).then(
				function(success) {
                	$scope.goToPricehistoryList();
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
        $scope.pricehistory = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.pricehistoryid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshPricehistory($stateParams.pricehistoryid);
    } else {
        // List page
        $scope.refreshPricehistoryList();
    }
    
    
}]);
