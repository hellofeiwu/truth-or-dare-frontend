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
    $timeout
) {
    $scope.pageFlag = 'question';
    $scope.question = '';
    $scope.type = 'truth';
    var truthQuestions = [];
    var dareQuestions = [];
    var truthQuestionsCopy = [];
    var dareQuestionsCopy = [];
    $scope.types = ['truth', 'dare'];
    $scope.newQuestion = {
        question: '',
        type: 'truth'
    };

    var cardInsert = function () {
        angular.element(document.querySelector('.card-bottom')).after(
            '<div class="card"><h1 id="question">' +
            $scope.question +
            '</h1></div>');
    };

    var removeUsedCards = function() {
        $timeout(
            function() {
                angular.element(document.querySelector('.move-left')).remove();
                angular.element(document.querySelector('.move-right')).remove();
            },
            200
        );
    };

    $scope.swipeLeft = function() {
        angular.element(document.querySelector('.card')).addClass('move-left');
        $scope.getQuestion();
        removeUsedCards();
    };

    $scope.swipeRight = function() {
        angular.element(document.querySelector('.card')).addClass('move-right');
        $scope.getQuestion();
        removeUsedCards();
    };

    $scope.restoreQuestions = function() {
        angular.element(document.querySelector('.card')).remove();

        if ($scope.type == 'truth') {
            truthQuestions = truthQuestionsCopy.slice();
        }else {
            dareQuestions = dareQuestionsCopy.slice();
        }

        $scope.getQuestion();
    };

    $scope.getQuestion = function() {
        if ($scope.type == 'truth') {
            console.log(truthQuestions.length);
            $scope.questions = truthQuestions;
        }else {
            $scope.questions = dareQuestions;
        }
        if ($scope.questions.length) {
            var i = Math.floor((Math.random() * $scope.questions.length));
            $scope.question = $scope.questions[i].question;
            $scope.questions.splice(i, 1);
        }else {
            $scope.showConfirmModal(showAddQuestion);
        }
        cardInsert();
    };

    var showAddQuestion = function() {
        confirmModal.hide();
        if (localStorage.getItem('TOKEN')) {
            $scope.pageFlag = 'addQuestion';
        }else {
            $location.path('/login');
        }
    };

    $scope.showQuestion = function() {
        $scope.pageFlag = 'question';
    };

    var getQuestions = function() {
        QuestionService.getQuestions(
            function successCallback(data) {
                truthQuestions = data;
                angular.forEach(
                    truthQuestions,
                    function(value) {
                        if (value.type == 'dare'){
                            dareQuestions.push(value);
                        }
                    }
                );
                truthQuestions = _.difference(truthQuestions, dareQuestions);
                truthQuestionsCopy = truthQuestions;
                dareQuestionsCopy = dareQuestions;
                $scope.getQuestion();
            },
            function errorCallback() {

            }
        );
    };

    $scope.addQuestion = function() {
        QuestionService.addQuestion(
            $scope.newQuestion,
            function successCallback() {
                $scope.pageFlag = 'question';
                noty({
                    layout: 'center',
                    text: 'question added',
                    type: 'success',
                    animation: {
                        open: {height: 'toggle'}, // jQuery animate function property object
                        close: {height: 'toggle'}, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 500 // opening & closing animation speed
                    },
                    timeout: 1000
                });
            },
            function errorCallback() {

            }
        );
    };

    $scope.toggleType = function() {
      if ($scope.type == 'truth') {
          $scope.type = 'dare';
      }else {
          $scope.type = 'truth';
      }
        angular.element(document.querySelector('.card')).remove();
        $scope.getQuestion();
    };

    $timeout( // wait for DOM ready
        function() {
            if (localStorage.getItem('TOKEN')) {
                getQuestions();
            } else {
                truthQuestions = [
                    {
                        "question": "你们家里谁的脾气最大"
                    },
                    {
                        "question": "现在想被有钱人保养么"
                    },
                    {
                        "question": "你会做菜么"
                    },
                    {
                        "question": "每天上网几个小时"
                    },
                    {
                        "question": "请说出在座谁昨天没有洗澡"
                    },
                    {
                        "question": "今天晚上要做什么"
                    },
                    {
                        "question": "异性知己有几个"
                    },
                    {
                        "question": "上厕所后洗手么"
                    },
                    {
                        "question": "你最受不了别人对你做什么"
                    },
                    {
                        "question": "觉得失去什么最可怕"
                    },
                    {
                        "question": "你觉得自己什么时候身体发育成熟的"
                    }
                ];

                dareQuestions = [
                    {
                        "question": "背一位异性绕场一周"
                    },
                    {
                        "question": "唱青藏高原最后一句"
                    },
                    {
                        "question": "做一个大家都满意的鬼脸"
                    },
                    {
                        "question": "抱一位异性直到下一轮真心话大冒险结束"
                    },
                    {
                        "question": "向一位异性表白3分钟"
                    },
                    {
                        "question": "与一位异性十指相扣，对视10秒"
                    },
                    {
                        "question": "邀请一位异性为你唱情歌，或邀请一位异性与你情歌对唱"
                    },
                    {
                        "question": "做自己最性感、最妩媚的表情或动作"
                    },
                    {
                        "question": "吃下每个人为你夹的菜"
                    },
                    {
                        "question": "跳草裙舞或脱衣舞"
                    },
                    {
                        "question": "亲吻一位异性，部位不限"
                    }
                ];
                truthQuestionsCopy = truthQuestions.slice();
                dareQuestionsCopy = dareQuestions.slice();
                $scope.getQuestion();
            }
        }
    );

    $scope.register = function() {
        QuestionService.register(
            function successCallback(data) {

            },
            function errorCallback() {

            }
        );
    };

    // Pre-fetch an external template populated with a custom scope
    var confirmModal = $modal({
        scope: $scope,
        templateUrl: 'templates/confirm-modal.html',
        show: false
    });
    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showConfirmModal = function(operation) {
        $scope.operation = operation;
        confirmModal.$promise.then(confirmModal.show);
    };
});