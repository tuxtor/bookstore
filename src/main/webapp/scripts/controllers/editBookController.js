

angular.module('bookstore').controller('EditBookController', function($scope, $routeParams, $location, flash, BookResource , AuthorResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.book = new BookResource(self.original);
            AuthorResource.queryAll(function(items) {
                $scope.authorSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.book.author && item.id == $scope.book.author.id) {
                        $scope.authorSelection = labelObject;
                        $scope.book.author = wrappedObject;
                        self.original.author = $scope.book.author;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The book could not be found.'});
            $location.path("/Books");
        };
        BookResource.get({BookId:$routeParams.BookId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.book);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The book was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.book.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Books");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The book was deleted.'});
            $location.path("/Books");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.book.$remove(successCallback, errorCallback);
    };
    
    $scope.languageList = [
        "ENGLISH",  
        "SPANISH"  
    ];
    $scope.$watch("authorSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.book.author = {};
            $scope.book.author.id = selection.value;
        }
    });
    
    $scope.get();
});