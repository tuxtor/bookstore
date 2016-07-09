
angular.module('bookstore').controller('NewBookController', function ($scope, $location, locationParser, flash, BookResource , AuthorResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.book = $scope.book || {};
    
    $scope.languageList = [
        "ENGLISH",
        "SPANISH"
    ];
    
    $scope.authorList = AuthorResource.queryAll(function(items){
        $scope.authorSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("authorSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.book.author = {};
            $scope.book.author.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The book was created successfully.'});
            $location.path('/Books');
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        BookResource.save($scope.book, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Books");
    };
});