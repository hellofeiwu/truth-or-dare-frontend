'use strict';

/* Controller
 *
 * Author: Fei Wu
 *
 * */

app.controller('QuestionController', function(
    $scope,
    $location,
    $anchorScroll,
    $modal,
    QuestionService,
    CountryCodeService
) {
    if (!localStorage.getItem('TOKEN')) {
        $location.path('/login');
        return;
    }

    $scope.searchQuery = '';

    $scope.role = localStorage.getItem('ROLE');

    $scope.testMode = 1;
    $scope.expressClearance = 0;
    $scope.ddp = 0;

    $scope.statusFlag = $scope.role == 'admin' ? 'pending' : 'received';

    $scope.orders = [];
    $scope.length = '';
    $scope.width = '';
    $scope.height = '';

    $scope.labelTypes = [
        {
            key: 'Ground',
            value: 1
        },
        {
            key: 'Expedited',
            value: 2
        },
        {
            key: 'Priority',
            value: 3
        },
        {
            key: 'Mini label',
            value: 12
        },
        {
            key: 'Canada label',
            value: 20
        },
        {
            key: 'China label',
            value: 30
        },
        {
            key: 'TrakPak label',
            value: 40
        }
    ];

    $scope.labelFormats = [
        'PNG',
        'PDF',
        'EPL2'
    ];

    $scope.currencyOptions = [
        'USD',
        'EUR',
        'RMB'
    ];

    $scope.countryCodes = CountryCodeService.countryCodes;

    $scope.shippingRequest = {
        labelType: 1,
        labelFormat: 'PNG',
        data: {
            shippingApiRequest: {
                mailItem: {
                    trackingNumber: '',
                    shipperItemId: "",
                    displayItemId: "",
                    consignee: {
                        name: "",
                        companyName: "",
                        addressLine1: "",
                        addressLine2: "",
                        city: "",
                        state: "",
                        zip: "",
                        country: "US",
                        phone: "",
                        email: ""
                    },
                    shipper: {
                        name: "alibaba",
                        companyName: "Amazon",
                        addressLine1: "some address",
                        city: "some city",
                        state: "EU",
                        zip: "12345",
                        country: "GB"
                    },
                    returnAddress: {
                        name: "John Smith",
                        companyName: "Shippers, LLC",
                        addressLine1: "LAX",
                        city: "Los Angeles",
                        state: "CA",
                        zip: "90045",
                        country: "US",
                        phone: "1 (800) 426-4968"
                    },
                    value: 0,
                    currency: "USD",
                    weight: "",
                    weightUnitOfMeasure: "kg",
                    dimensions: {
                        length: 0,
                        width: 0,
                        height: 0
                    },
                    dimensionsUnitOfMeasure: "m",
                    product: [
                        {
                            harmonizationCode: "",
                            description: "",
                            manufacturerCode: "",
                            quantity: 0,
                            unitValue: 0,
                            value: 0
                        }
                    ]
                }
            }
        }
    };

    $scope.toggleAll = function() {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.questions, function (item) {
            item.selected = $scope.selectedAll;
        });
    };

    var getQuestions = function() {
        QuestionService.getQuestions(
            function successCallback(data) {
                $scope.questions = data;
            },
            function errorCallback() {

            }
        );
    };

    getQuestions();

    $scope.totalValue = function() {
        $scope.shippingRequest.data.shippingApiRequest.mailItem.value = 0;
        angular.forEach(
            $scope.shippingRequest.data.shippingApiRequest.mailItem.product,
            function(item) {
                item.value = item.unitValue * item.quantity;
                $scope.shippingRequest.data.shippingApiRequest.mailItem.value += item.value;
            }
        );
    };

    $scope.createQuestion = function() {
        $scope.disableCreateQuestion = true;

        // update size to be in unit m
        $scope.shippingRequest.data.shippingApiRequest.mailItem.dimensions.length = $scope.length * 0.01;
        $scope.shippingRequest.data.shippingApiRequest.mailItem.dimensions.width = $scope.width * 0.01;
        $scope.shippingRequest.data.shippingApiRequest.mailItem.dimensions.height = $scope.height * 0.01;

        $scope.loadingToggle = true;
        $scope.loadingMessage = '正在创建邮包中，请稍后...';

        $scope.shippingRequest.testMode = $scope.testMode;
        $scope.shippingRequest.expressClearance = $scope.expressClearance;
        $scope.shippingRequest.ddp = $scope.ddp;
        QuestionService.createQuestion(
            $scope.shippingRequest,
            function successCallback(data) {
                if (data.shippingApiResponse.error) {
                    noty({
                        layout: 'center',
                        text: data.shippingApiResponse.error,
                        type: 'warning',
                        animation: {
                            open: {height: 'toggle'}, // jQuery animate function property object
                            close: {height: 'toggle'}, // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        },
                        timeout: 1000
                    });
                    $scope.loadingToggle = false;
                    $scope.disableCreateQuestion = false;
                    return;
                }else if (data.shippingApiResponse.mailItem.result == 'ok') {
                    noty({
                        layout: 'center',
                        text: '创建邮包成功!',
                        type: 'success',
                        animation: {
                            open: {height: 'toggle'}, // jQuery animate function property object
                            close: {height: 'toggle'}, // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        },
                        timeout: 1000
                    });
                }else {
                    noty({
                        layout: 'center',
                        text: data.shippingApiResponse.mailItem.error,
                        type: 'warning',
                        animation: {
                            open: {height: 'toggle'}, // jQuery animate function property object
                            close: {height: 'toggle'}, // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        },
                        timeout: 1000
                    });
                    $scope.loadingToggle = false;
                    $scope.disableCreateQuestion = false;
                    return;
                }
                $scope.loadingToggle = false;
                $scope.disableCreateQuestion = false;
                getQuestions();
                $location.hash('questionsAnchor');
                $anchorScroll();
            },
            function errorCallback() {
                $scope.disableCreateQuestion = false;
                $scope.loadingToggle = false;
            }
        );
    };

    $scope.deleteQuestion = function(trackingNumber) {
        confirmModal.hide();
        $scope.loadingToggle = true;
        $scope.loadingMessage = '正在取消邮包中，请稍后...';
        CreateQuestionService.deleteQuestion(
            {
                testMode: $scope.testMode,
                data: {
                    shippingApiRequest: {
                        mailItem: {
                            trackingNumber: trackingNumber
                        }
                    }
                }
            },
            function successCallback(data) {
                if (data.shippingApiResponse.mailItem.result == 'ok') {
                    noty({
                        layout: 'center',
                        text: '邮件删除成功!',
                        type: 'success',
                        animation: {
                            open: {height: 'toggle'}, // jQuery animate function property object
                            close: {height: 'toggle'}, // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 500 // opening & closing animation speed
                        },
                        timeout: 1000
                    });
                }else {
                    noty({
                        layout: 'center',
                        text: data.shippingApiResponse.mailItem.error,
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
                getQuestions();
                $scope.loadingToggle = false;
            },
            function errorCallback() {
                $scope.loadingToggle = false;
            }
        );
    };

    $scope.register = function() {
        QuestionService.register(
            function successCallback(data) {

            },
            function errorCallback() {

            }
        );
    };

    $scope.visible = null;

    $scope.toggleQuestions = function (data) {
        if ($scope.visible == null) {
            $scope.visible = data;
        }else {
            $scope.visible = null;
        }
    };

    // Pre-fetch an external template populated with a custom scope
    var labelModal = $modal({
        scope: $scope,
        templateUrl: 'templates/label-modal.html',
        show: false
    });
    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showLabelModal = function(label) {
        $scope.label = 'data:image/png;base64,' + label;
        labelModal.$promise.then(labelModal.show);
    };

    // Pre-fetch an external template populated with a custom scope
    var confirmModal = $modal({
        scope: $scope,
        templateUrl: 'templates/confirm-modal.html',
        show: false
    });
    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showConfirmModal = function(cancelType, item, operation) {
        $scope.cancelType = cancelType;
        $scope.item = item;
        $scope.operation = operation;
        confirmModal.$promise.then(confirmModal.show);
    };
});