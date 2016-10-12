'use strict';

/* Controller
 *
 * Author: Fei Wu
 *
 * */

app.controller('LoginController', function(
    $scope,
    LoginService
) {
    $scope.user = {
        username: '',
        password:''
    };
    
    $scope.login = function () {
        LoginService.login($scope.user.username, $scope.user.password);
    };

    $scope.loginWithKey = function (keyCode) {
        if (keyCode == 13){
            $scope.login();
        }
    };
});