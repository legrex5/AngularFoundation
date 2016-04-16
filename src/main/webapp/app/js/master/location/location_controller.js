'use strict';

/**
 * Controller for Location
 **/
masterModule.controller('LocationCtrl', ['Location',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Location, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of locations
    $scope.locations = [];
	// location to edit
    $scope.location = null;

	// referencies entities
	$scope.items = {};
    // useraccesss
	$scope.items.useraccesss = [];

    /**
     * Load all referencies entities
     */
	$scope.loadAllReferencies = function() {
		Useraccess.getAllAsListItems().then(
				function(success) {
        	        $scope.items.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
    };
    
    /**
     * Refresh locations list
     */
    $scope.refreshLocationList = function() {
    	try {
			$scope.locations = [];
        	Location.getAll().then(
				function(success) {
        	        $scope.locations = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh location
     */
    $scope.refreshLocation = function(locationid) {
    	try {
        	$scope.location = null;
	        Location.get(locationid).then(
				function(success) {
        	        $scope.location = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the locations list page
     */
    $scope.goToLocationList = function() {
        $scope.refreshLocationList();
        $location.path('/app/master/location');
    }
    /**
     * Go to the location edit page
     */
    $scope.goToLocation = function(locationid) {
        $scope.refreshLocation(locationid);
        $location.path('/app/master/location/'+locationid);
    }

    // Actions

    /**
     * Save location
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Location.create;
			} else {
				save = Location.update;
			}
			save($scope.location).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.location = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete location
     */
    $scope.delete = function(locationid) {
	    try {
			MessageHandler.cleanMessage();
    	    Location.delete(locationid).then(
				function(success) {
                	$scope.goToLocationList();
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
        $scope.location = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.locationid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshLocation($stateParams.locationid);
    } else {
        // List page
        $scope.refreshLocationList();
    }
    
    
}]);
