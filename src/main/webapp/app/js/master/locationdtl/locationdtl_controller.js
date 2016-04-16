'use strict';

/**
 * Controller for Locationdtl
 **/
masterModule.controller('LocationdtlCtrl', ['Locationdtl',  'Useraccess', 'Location', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Locationdtl, Useraccess, Location, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',  'Location',     // edition mode
    $scope.mode = null;
    
	// list of locationdtls
    $scope.locationdtls = [];
	// locationdtl to edit
    $scope.locationdtl = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];
    // locations
	$scope.items.locations = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
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
     * Refresh locationdtls list
     */
    $scope.refreshLocationdtlList = function() {
    	try {
			$scope.locationdtls = [];
        	Locationdtl.getAll().then(
				function(success) {
        	        $scope.locationdtls = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh locationdtl
     */
    $scope.refreshLocationdtl = function(locationdtlid) {
    	try {
        	$scope.locationdtl = null;
	        Locationdtl.get(locationdtlid).then(
				function(success) {
        	        $scope.locationdtl = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the locationdtls list page
     */
    $scope.goToLocationdtlList = function() {
        $scope.refreshLocationdtlList();
        $location.path('/app/master/locationdtl');
    }
    /**
     * Go to the locationdtl edit page
     */
    $scope.goToLocationdtl = function(locationdtlid) {
        $scope.refreshLocationdtl(locationdtlid);
        $location.path('/app/master/locationdtl/'+locationdtlid);
    }

    // Actions

    /**
     * Save locationdtl
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Locationdtl.create;
			} else {
				save = Locationdtl.update;
			}
			save($scope.locationdtl).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.locationdtl = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete locationdtl
     */
    $scope.delete = function(locationdtlid) {
	    try {
			MessageHandler.cleanMessage();
    	    Locationdtl.delete(locationdtlid).then(
				function(success) {
                	$scope.goToLocationdtlList();
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
        $scope.locationdtl = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.locationdtlid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshLocationdtl($stateParams.locationdtlid);
    } else {
        // List page
        $scope.refreshLocationdtlList();
    }
    
    
}]);
