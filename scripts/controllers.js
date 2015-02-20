angular.module('app.controller', []).controller('pics', function($scope, $http){
	var promise = $http.get('http://tiny-pizza-server.herokuapp.com/collections/dspics')
	.success(function(){
		console.log('testing');
	})
	$scope.picDrop = function(){
		console.log('click');
		$scope.submitForm = !$scope.submitForm;
		// http://tiny-pizza-server.herokuapp.com/collections/dspics
	}

	$scope.submitContent = function(){
		console.log('test add')
		$scope.$watch('imgInput', function(){
			if (!$scope.imgInput) {
				$scope.imgError1 = true;
			} else if($scope.imgInput.substring(0,7) !== 'http://'){
				$scope.imgError2 = true;
				$scope.imgError1 = false;
			} else {
				$scope.imgSuccess = true;
				$scope.imgError2 = false;
				$scope.imgError1 = false;
			}
		});

		$scope.$watch('imgCap', function(){
			if (!$scope.imgCap) {
				$scope.imgError1 = true;
			} else{
				$scope.imgError1 = false;
				$scope.capSuccess = true;
			}
		})
	}
})
