/* jshint devel: true, unused: false */
var clutch = angular.module('clutch', [])
  .config(['$provide', function ($provide) {

    // // Configure Trackjs exception reporting
    // $provide.decorator('$exceptionHandler', ['$delegate', '$window', function($delegate, $window) {
    //   return function (exception, cause) {
    //     if ($window.trackJs) {
    //       $window.trackJs.track(exception)
    //     }
    //     // (Optional) Pass the error through to the delegate formats it for the console
    //     $delegate(exception, cause);
    //   }
    // }])

    console.info('application launched')

  }])
