'use strict';

/**
 * Controller for Useraccess
 **/
useraccessModule.controller('UseraccessCtrl', [ 'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLUserAccess', function( Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLUserAccess) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of useraccesss
    $scope.useraccesss = [];
	// useraccess to edit
    $scope.useraccess = null;

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
     * Refresh useraccesss list
     */
    $scope.refreshUseraccessList = function() {
    	try {
			$scope.useraccesss = [];
        	Useraccess.getAll().then(
				function(success) {
        	        $scope.useraccesss = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh useraccess
     */
    $scope.refreshUseraccess = function(userid) {
    	try {
        	$scope.useraccess = null;
	        Useraccess.get(userid).then(
				function(success) {
        	        $scope.useraccess = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the useraccesss list page
     */
    $scope.goToUseraccessList = function() {
        $scope.refreshUseraccessList();
        $location.path('/app/useraccess');
    }
    /**
     * Go to the useraccess edit page
     */
    $scope.goToUseraccess = function(userid) {
        $scope.refreshUseraccess(userid);
        $location.path('/app/useraccess/'+userid);
    }

    // Actions

    /**
     * Save useraccess
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Useraccess.create;
			} else {
				save = Useraccess.update;
			}
			save($scope.useraccess).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.useraccess = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete useraccess
     */
    $scope.delete = function(userid) {
	    try {
			MessageHandler.cleanMessage();
    	    Useraccess.delete(userid).then(
				function(success) {
                	$scope.goToUseraccessList();
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
        $scope.useraccess = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.userid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshUseraccess($stateParams.userid);
    } else {
        // List page
        $scope.refreshUseraccessList();
    }
    
    
}]);
