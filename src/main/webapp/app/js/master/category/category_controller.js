'use strict';

/**
 * Controller for Category
 **/
masterModule.controller('CategoryCtrl', ['Category',  'Useraccess', '$scope', '$stateParams', '$http', '$location', '$cookies', 'MessageHandler', 'restURLMaster', function(Category, Useraccess, $scope, $stateParams, $http, $location, $cookies, MessageHandler, restURLMaster) {
	 'Useraccess',     // edition mode
    $scope.mode = null;
    
	// list of categorys
    $scope.categorys = [];
	// category to edit
    $scope.category = null;

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
     * Refresh categorys list
     */
    $scope.refreshCategoryList = function() {
    	try {
			$scope.categorys = [];
        	Category.getAll().then(
				function(success) {
        	        $scope.categorys = success.data;
            	}, 
	            MessageHandler.manageError);
    	} catch(ex) {
    		MessageHandler.manageException(ex);
    	}
    }
    /**
     * Refresh category
     */
    $scope.refreshCategory = function(categoryid) {
    	try {
        	$scope.category = null;
	        Category.get(categoryid).then(
				function(success) {
        	        $scope.category = success.data;
            	}, 
	            MessageHandler.manageError);
    	  } catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    }

    /**
     * Go to the categorys list page
     */
    $scope.goToCategoryList = function() {
        $scope.refreshCategoryList();
        $location.path('/app/master/category');
    }
    /**
     * Go to the category edit page
     */
    $scope.goToCategory = function(categoryid) {
        $scope.refreshCategory(categoryid);
        $location.path('/app/master/category/'+categoryid);
    }

    // Actions

    /**
     * Save category
     */
    $scope.save = function() {
    	try {
			MessageHandler.cleanMessage();
			var save;
			if( $scope.mode === 'create' ) {
        		save = Category.create;
			} else {
				save = Category.update;
			}
			save($scope.category).then(
    	        function(success) {
	                MessageHandler.addSuccess('save ok');
                	$scope.category = success.data;
            	},
        	    MessageHandler.manageError);
    	} catch(ex) {
        	MessageHandler.manageException(ex);
    	}
    };
    /**
     * Delete category
     */
    $scope.delete = function(categoryid) {
	    try {
			MessageHandler.cleanMessage();
    	    Category.delete(categoryid).then(
				function(success) {
                	$scope.goToCategoryList();
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
        $scope.category = {};
        $scope.mode = 'create';
		$scope.loadAllReferencies();
        $scope.bookorderitem = null;
    } else if( $stateParams.categoryid != null ) {
        // Edit page
		$scope.loadAllReferencies();
		$scope.refreshCategory($stateParams.categoryid);
    } else {
        // List page
        $scope.refreshCategoryList();
    }
    
    
}]);
