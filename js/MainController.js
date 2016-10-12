app.controller('MainController', function(
    $scope,
    $location,
    $translate
) {
    $scope.translate = function(lang) {
        $translate.use(lang);
    };

    $scope.$watch(function () {
        return localStorage.getItem('ROLE');
    }, function (newVal, oldVal) {
        $scope.role = newVal;
    });
    $scope.$watch(function () {
        return localStorage.getItem("TOKEN");
    }, function (newVal, oldVal) {
        $scope.loginFlag = newVal;
    });
    $scope.logout = function () {
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("ROLE");
        $location.path('/login');
    }
});