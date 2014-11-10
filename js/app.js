var app = angular.module('app', ['pageModule']);
app.controller('pagectr', ['$scope', 'Pagination', function($scope, Pagination){
	$scope.items = [];
	for(var i=0;i<50;i++){
		$scope.items.push({id:i,name:"name"+i,description:"description"+i});
	};
	$scope.pagination = Pagination.getNew();
	$scope.pagination.numPages = Math.ceil($scope.items.length/$scope.pagination.perPage);
}]);