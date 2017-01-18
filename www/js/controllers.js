angular.module('starter.controllers', [])

.filter('defaultUser', function() {
    return function(input, param) {
        if(!input) {
            return param;
        }
        return input;
    };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
})

.controller('TeamsCtrl', ['$scope', 'teamsServ', function($scope, teamsServ) {
    $scope.teams = [];
    var refresh = function() {
        teamsServ.getTeams()
            .then(
                function(response) {
                    console.log(response.data);
                    $scope.teams = response.data;
                },
                function(data, status) {
                    if(data.status === 401) {
                        console.log('send to login');
                    }
                }
            );
    };
    refresh();
}])

.controller('TeamDashboardCtrl', ['$scope', '$stateParams', '$ionicModal', 'teamsServ', function($scope, $stateParams, $ionicModal, teamsServ) {
    $scope.team = {};
    var refresh = function() {
        teamsServ.getTeam($stateParams.name)
            .then(function(response) {
                console.log(response.data);
                $scope.team = response.data;
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
    
    $scope.totals = true;
    $scope.toggleCards = function() {
      $scope.totals = !$scope.totals;
    };
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/dialogs/show_report.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
  
    // Triggered in the login modal to close it
    $scope.closeReport = function() {
      $scope.modal.hide();
    };
  
    // Open the login modal
    $scope.showReport = function(report) {
      $scope.report = report;
      $scope.modal.show();
    };
    
    $scope.filterFn = function() {
        $scope.showFilter = !$scope.showFilter;
        $scope.subjectFilter = '';
        $scope.studentFilter = '';
        $scope.typeFilter = '';
    };
}])

.controller('TeamStudentsCtrl', ['$scope', '$stateParams', 'teamsServ', function($scope, $stateParams, teamsServ) {
    $scope.team = {};
    $scope.students = [];
    var refresh = function() {
        teamsServ.getStudents($stateParams.name)
            .then(function(response) {
                console.log(response.data);
                $scope.team = response.data;
                $scope.students = response.data.students;
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
}])

.controller('TeamLessonsCtrl', ['$scope', '$stateParams', 'teamsServ', function($scope, $stateParams, teamsServ) {
    $scope.lessons = [];
    var refresh = function() {
        teamsServ.getlessons($stateParams.name)
            .then(function(response) {
                console.log(response.data);
                $scope.lessons = response.data;
                countReports();
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
    
    var countReports = function() {
        $scope.lessons.forEach(function(lesson) {
            var sums = {AB: 0, LA: 0, MA: 0, BH: 0, SR: 0};
            lesson.reports.forEach(function(report) {
                for(var prop in sums) {
                    console.log(report.type);
                    if(report.type == prop) {
                        sums[prop] += 1;
                    }
                }
            });
            
            lesson.sums = sums;
        });
    };
}])

.controller('TeamLessonCtrl', ['$scope', '$stateParams', '$state', 'teamsServ', 'attendanceServ', 'reportServ', function($scope, $stateParams, $state, teamsServ, attendanceServ, reportServ) {
    
    var refresh = function() {
        teamsServ.getSingleLesson($stateParams.name, $stateParams.id)
            .then(function(response) {
                console.log(response.data);
                $scope.lesson = response.data;
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
    
    
    $scope.saveFn = function() {
        $scope.lesson.attendances.forEach(function(attendance) {
            console.log('attendance: ' + attendance);
            /*if(attendance.present) {
                console.log('true');*/
                var obj = {
                    present: attendance.present,
                    late: attendance.late
                };
                
                console.log('obj');
                attendanceServ.putAttendance(attendance._id, obj)
                    .then(function(response) {
                        console.log(response.data);
                        
                        
                        //$state.go('teams');
                    },
                    function(data, status) {
                        if(data.status === 401) {
                            console.log('send to login');
                        }
                    }
                );
                
                // Report for AB and LA
                var report = {
                    student: attendance.student.name,
                    studentId: attendance.student.id,
                    team: $scope.lesson.team.name,
                    teamId: $scope.lesson.team.id,
                    lessonId: $scope.lesson._id,
                    subject: $scope.lesson.subject.name,
                    subjectId: $scope.lesson.subject.id,
                    hour: $scope.lesson.hour,
                    description: 'n/a'
                };
                
                if(obj.present === false) {
                    report.type = 'AB';
                    
                    $scope.submitReport(report);
                    
                } else if(obj.late === true) {
                    report.type = 'LA';
                    
                    $scope.submitReport(report);
                }
            /*}*/
        });
        
        $scope.lesson.pristine = false;
    };
    
    $scope.change = function(attendance) {
        if(attendance.late === true) {
            attendance.present = true;
        }
    };
    
    $scope.openDialog = function(attendance, lesson) {
        console.log('studentId: ' + attendance.student.id);
        
        $scope.newReport = {
            student: attendance.student.name,
            studentId: attendance.student.id,
            team: lesson.team.name,
            teamId: lesson.team.id,
            lessonId: lesson._id,
            subject: lesson.subject.name,
            subjectId: lesson.subject.id,
            hour: lesson.hour
        };
        
        ngDialog.open({
            template: 'views/dialogs/newReport.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
            disableAnimation: true
        });
    };
    
    $scope.submitReport = function(report) {
        console.log(report);
        
        reportServ.postReport(report);
        
        ngDialog.closeAll();
    };
}])

.controller('LessonListCtrl', ['$scope', 'lessonServ', function($scope, lessonServ) {
    $scope.lessons = [];
    var refresh = function() {
        lessonServ.getLesson()
            .then(function(response) {
                console.log(response.data);
                $scope.lessons = response.data;
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
}])

.controller('StudentDashboardCtrl', ['$scope', '$stateParams', '$ionicModal', 'studentServ', function($scope, $stateParams, $ionicModal, studentServ) {
    $scope.student = {};
    var refresh = function() {
        studentServ.getStudent($stateParams.id)
            .then(function(response) {
                console.log(response.data);
                $scope.student = response.data;
            },
            function(data, status) {
                if(data.status === 401) {
                    console.log('send to login');
                }
            }
        );
    };
    refresh();
    
    $scope.totals = true;
    $scope.toggleCards = function() {
      $scope.totals = !$scope.totals;
    };
    
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/dialogs/show_report.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
  
    // Triggered in the login modal to close it
    $scope.closeReport = function() {
      $scope.modal.hide();
    };
  
    // Open the login modal
    $scope.showReport = function(report) {
      $scope.report = report;
      $scope.modal.show();
    };
    
    $scope.filterFn = function() {
        $scope.showFilter = !$scope.showFilter;
        $scope.subjectFilter = '';
        $scope.studentFilter = '';
        $scope.typeFilter = '';
    };
}])

;
