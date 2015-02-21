angular.module('app.controller', []).controller('pics', function($scope, $http){
	$scope.picsView = true;
	$scope.myArray = [];

	var promise = $http.get('http://tiny-pizza-server.herokuapp.com/collections/dspics')
	.success(function(response){
		console.log('testing');
		
		for(var i=0; i<response.length; i++){
			console.log('d')
			if(response[i].url && response[i].caption){
				$scope.myArray.push(response[i]);
			}
		}

		console.log($scope.myArray)
	}).error(function(err){
		console.log(err)
	});
	$scope.picDrop = function(){
		console.log('click');
		$scope.submitForm = !$scope.submitForm;
	}

	$scope.submitContent = function(img, caption){
		console.log('test add')
		var myImageExists = false;
		for(var i = 0; i < $scope.myArray.length; i++){
			console.log('testing')
			if($scope.myArray[i].url === img){
				myImageExists = true;
			}
		}

		if(myImageExists === false){
			$scope.myArray.push({url:img, caption: caption});
			$http.post(
				'http://tiny-pizza-server.herokuapp.com/collections/dspics',
				{url: img,
				caption: caption}
				);
		}

		else{
			alert('That image already exists.')
		}

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



		// promise();

	}
})
