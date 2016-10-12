app.factory('LoginService', function(
    HttpRequestService,
    $location
) {
        var self = this;
        this.login = function(username, password) {
            HttpRequestService.login(
                '/login',
                username,
                password,
                function successCallback(data) {
                    localStorage.setItem("TOKEN", data.token);
                    localStorage.setItem('ROLE', data.role);
                    $location.url('/');
                },
                function errorCallback(data, status) {
                    if (status == 401) {
                        noty({
                            layout: 'center',
                            text: '用户不存在!',
                            type: 'warning',
                            animation: {
                                open: {height: 'toggle'}, // jQuery animate function property object
                                close: {height: 'toggle'}, // jQuery animate function property object
                                easing: 'swing', // easing
                                speed: 500 // opening & closing animation speed
                            },
                            timeout: 1000
                        });
                    }

                    if (status == 403) {
                        noty({
                            layout: 'center',
                            text: '密码有误!',
                            type: 'warning',
                            animation: {
                                open: {height: 'toggle'}, // jQuery animate function property object
                                close: {height: 'toggle'}, // jQuery animate function property object
                                easing: 'swing', // easing
                                speed: 500 // opening & closing animation speed
                            },
                            timeout: 1000
                        });
                    }
                });
        };
        return self;
    }
);