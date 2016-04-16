'use strict';

/**
 * Controller for Detailexpired
 **/
stockModule.controller('DetailexpiredCtrl', ['Detailexpired',  'Productstock', 'Locationdtl', 'Useraccess', '$scope', '$routeParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLStock', function(Detailexpired, Productstock, Locationdtl, Useraccess, $scope, $routeParams, $http, $location, $cookies, MessageHandler, restURLStock) {
	 'Productstock',  'Locationdtl',  'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of detailexpireds
    $scope.detailexpireds = [];
	// detailexpired to edit
    $scope.detailexpired = null;

	// referencies entities
	$scope.items = {};
    // productstocks
	$scope.items.productstocks = [];
    // locationdtls
	$scope.items.locationdtls = [];
    // useraccesss
	$scope.items.useraccesss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Productstock.getAllAsListItems().then(
				function(success) {
        	        $scope.items.productstocks = success.data;
            	}, 
	            MessageHandler.manageError);
		Locationdtl.getAllAsListItems().then(
				function(success) {
        	        $scope.items.locationdtls = success.data;
            	}, 
	            MessageHandler.manageError);
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh detailexpireds list
     */
    $scope.refreshDetailexpiredList = function() {
    	try {
			$scope.detailexpireds = [];
        	Detailexpired.getAll().then(
				function(success) {
        	        $scope.detailexpireds = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh detailexpired
     */
    $scope.refreshDetailexpired = function(detailexpiredid) {
    	try {
        	$scope.detailexpired = null;
	        Detailexpired.get(detailexpiredid).then(
				function(success) {
        	        $scope.detailexpired = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the detailexpireds list page
     */
    $scope.goToDetailexpiredList = function() {
        $scope.refreshDetailexpiredList();
        $location.path('/app/stock/detailexpired');
    }
    /**
     * Go to the detailexpired edit page
     */
    $scope.goToDetailexpired = function(detailexpiredid) {
        $scope.refreshDetailexpired(detailexpiredid);
        $location.path('/app/stock/detailexpired/'+detailexpiredid);
    }

    // Actions

    /**
     * Save detailexpired
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Detailexpired.create;
			} else {
				save = Detailexpired.update;
			}
			save($scope.detailexpired).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.detailexpired = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete detailexpired
     */
    $scope.delete = function(detailexpiredid) {
	    try {
			MessageHandler.cleanMessage();
    	    Detailexpired.delete(detailexpiredid).then(
				function(success) {
                	$scope.goToDetailexpiredList();
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
        $scope.detailexpired = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $routeParams.detailexpiredid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshDetailexpired($routeParams.detailexpiredid);
    } else {
        // List page
        $scope.refreshDetailexpiredList();
    }
    
    
}]);
