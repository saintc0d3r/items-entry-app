/**
*  Module
*  'items-shop'
* Description
*/
angular.module('items-shop', []).
controller('items', function($scope, $http){
    // Your own REST service endpoint that return a list of items, where an item has these properties: title, description, price, quantity
    var rest_endpoint = 'http://localhost';
    $scope.post_panel_visible = false;
    $scope.post_result_panel_visible = false;

    $scope.post_progress_panel_visible = false;
    $scope.button_post_visible = true;

    /**
     * A helper method for initialising item object
     */
    var initialise_post_item = function(item){
        item.title = "";
        item.description = "";
        item.price = 0.00;
        item.quantity = 0;
    };

    /**
     * A helper to pull all items from server
     */
    var get_items = function() {
        $http.get(rest_endpoint + '/items')
             .success(function(response){
                        $scope.items = response;
              });

    }

    get_items();

    /**
     * Show/Hide post item panel when the Post item show button is clicked
     */
    $scope.on_show_post_panel_button_clicked = function(){
        $scope.post_panel_visible = !$scope.post_panel_visible;
        initialise_post_item($scope.post_item);

        if ($scope.post_panel_visible) {
            $scope.button_post_label = 'Cancel';
        }   
        else{                        
            $scope.button_post_label = 'Post New Item';
        }                
    }                     

    /**
     * Post the entered item to server.                 
     */
    $scope.on_post_button_clicked = function(){
        $scope.post_panel_visible = false;
        $scope.button_post_visible = false;
        $scope.post_progress_panel_visible = true;

        var post_item = angular.copy($scope.post_item);
        $http.post(rest_endpoint + '/items', post_item)
            .success(function(response){
                //$scope.items.push(response);
                get_items();
                $scope.post_progress_panel_visible = false;
                $scope.last_post_result = "Item is posted successfully";                            
                $scope.post_result_panel_visible = true;
            })
            .error(function(response){
                $scope.post_progress_panel_visible = false;
                $scope.last_post_result = 'failed to post the item into server.';
                $scope.post_result_panel_visible = true;
            })
    }

    /**
     * Hide Post Item's Result panel & restore the Post Item Panel Show Button
     */
    $scope.on_result_panel_button_clicked = function(){
        $scope.last_post_result = "";
        $scope.post_result_panel_visible = false;
        $scope.button_post_label = 'Post New Item';
        $scope.button_post_visible = true;
    }
});