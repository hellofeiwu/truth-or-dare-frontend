app.factory('HttpRequestService', function($q, $http, CONF) {
    var self = this;

    this.login = function (
      url,
      username,
      password,
      on_success,
      on_error) {

      var request = {
        url: CONF.api + url,
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      };

      return $http(request)
        .success(on_success)
        .error(on_error);
    };

    /**
     * check if sharedUser is current user,
     * and get authorization string use token from cookie
     * @get_authorization_string
     * @returns {string || undefined}
     * @public
     */
    this.get_auth_string = function () {
      var authString = localStorage.getItem("TOKEN");
      return authString;
    };

    /**
     * do a http request to get json result
     * @method api_get_json_request
     * @param {String} url - url to request
     * @param {Function} on_success
     * @param {Function} on_error
     * @public
     */
    this.http_request = function (
        url,
        method,
        on_success,
        on_error
    ) {
        var request = {
            url: CONF.api + url,
            method: method,
            headers: {
                'Accept': 'application/json'
            }
        };

        return $http(request)
            .success(on_success)
            .error(on_error);

    };

    /**
     * do a http request to get json result
     * @method api_get_json_request
     * @param {String} url - url to request
     * @param {Function} on_success
     * @param {Function} on_error
     * @public
     */
    this.http_request_with_auth = function (
        url,
        method,
        on_success,
        on_error
    ) {
        var authString = self.get_auth_string();

        if (authString === undefined) {
            return $q.reject('no auth');
        }

        var request = {
            url: CONF.api + url,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': authString
            }
        };

        return $http(request)
            .success(on_success)
            .error(on_error);

    };

    /**
     * do a GET http request to get json result
     * @method api_get_json_request
     * @param {String} url - url to request
     * @param {Function} on_success
     * @param {Function} on_error
     * @public
     */
    this.get_data_with_auth = function (
      url,
      on_success,
      on_error
    ) {
      var authString = self.get_auth_string();

      if (authString === undefined) {
        return $q.reject('no auth');
      }


      var request = {
        url: CONF.api + url,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': authString
        }
      };

      return $http(request)
        .success(on_success)
        .error(on_error);

    };

    /**
     * do a GET http request to get json result
     * @method api_get_json_request
     * @param {String} url - url to request
     * @param {Function} on_success
     * @param {Function} on_error
     * @public
     */
    this.get_zip_with_auth = function (
        url,
        on_success,
        on_error
    ) {
        var authString = self.get_auth_string();

        if (authString === undefined) {
            return $q.reject('no auth');
        }


        var request = {
            url: CONF.api + url,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/zip',
                'Authorization': authString
            }
        };

        return $http(request)
            .success(on_success)
            .error(on_error);

    };

    /**
     * do a http request
     * @method http_request
     * @param {String} url part of a full url
     * @param {Object} data data to post
     * @param {Function} on_success
     * @param {Function} on_error
     */
     this.http_request_with_data_auth = function (url, method, data, on_success, on_error) {
      var authString = self.get_auth_string();
      $http({
        url: CONF.api + url,
        method: method,
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authString
        }
      }).success(on_success)
        .error(on_error);
    };

    /**
     * do a http request
     * @method http_request
     * @param {String} url part of a full url
     * @param {Object} data data to post
     * @param {Function} on_success
     * @param {Function} on_error
     */
    this.http_request_with_data = function (url, method, data, on_success, on_error) {
        $http({
            url: CONF.api + url,
            method: method,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(on_success)
            .error(on_error);
    };

    /**
     * do a http request
     * @method http_request
     * @param {String} url part of a full url
     * @param {Object} data data to post
     * @param {Function} on_success
     * @param {Function} on_error
     */
    this.http_request_with_params = function (url, method, data, on_success, on_error) {
      var authString = self.get_auth_string();
      $http({
        url: CONF.api + url,
        method: method,
        params: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authString
        }
      }).success(on_success)
        .error(on_error);
    };

    return self;
  });
