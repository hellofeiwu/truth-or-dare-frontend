app.factory('QuestionService', function(
        $http,
        HttpRequestService
    ) {
        var self = this;
        this.createQuestion = function(data, successCallback, errorCallback) {
            HttpRequestService.http_request_with_data_auth(
                '/question',
                'POST',
                data,
                successCallback,
                errorCallback
            );
        };

        this.deleteQuestion = function(data, successCallback, errorCallback) {
            HttpRequestService.http_request_with_data_auth(
                '/question',
                'DELETE',
                data,
                successCallback,
                errorCallback
            );
        };

        this.getQuestions = function(successCallback, errorCallback) {
            HttpRequestService.http_request_with_auth(
                '/question',
                'GET',
                successCallback,
                errorCallback
            );
        };

        this.register = function(successCallback, errorCallback) {
            HttpRequestService.http_request(
                '/register',
                'POST',
                successCallback,
                errorCallback
            );
        };

        return self;
    }
);