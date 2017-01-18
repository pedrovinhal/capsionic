// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.teams', {
    url: '/teams',
    views: {
      'menuContent': {
        templateUrl: 'templates/team/teams.html',
        controller: 'TeamsCtrl'
      }
    }
  })
  
  .state('app.team_students', {
    url: '/:name/students',
    views: {
      'menuContent': {
        templateUrl: 'templates/team/students.html',
        controller: 'TeamStudentsCtrl'
      }
    }
  })
  
  .state('app.student_dashboard', {
     url:'/student/:id/dashboard',
     views: {
         'menuContent': {
             templateUrl: 'templates/student/dashboard.html',
             controller: 'StudentDashboardCtrl'
         }
     }
  })
  
  .state('app.team_dashboard', {
     url:'/:name/dashboard',
     views: {
         'menuContent': {
             templateUrl: 'templates/team/dashboard.html',
             controller: 'TeamDashboardCtrl'
         }
     }
  })
  
  .state('app.team_lessons', {
     url:'/:name/lessons',
     views: {
         'menuContent': {
             templateUrl: 'templates/team/lessons.html',
             controller: 'TeamLessonsCtrl'
         }
     }
  })
  
  .state('app.single_lesson', {
           url:'/:name/single_lesson/:id',
           views: {
               'menuContent': {
                   templateUrl: 'templates/lesson/lesson.html',
                   controller: 'TeamLessonCtrl'
               }
           }
        })
  ;
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/teams');
});
