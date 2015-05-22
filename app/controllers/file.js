app.controller(
  "fileCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    'Upload', '$rootScope',

    function(scope, filter, timeout, state, Restangular, Upload, rootScope) {
      Files = Restangular.all('Files?format=json');
      loadFileList();

      function loadFileList() {
        Files.customGET().then(function(files) {
          console.log(files);
          scope.files = files;
        });
      }


      scope.$watch('files', function() {
        scope.upload(scope.files);
      });

      scope.upload = function(files) {
        console.log(Upload);
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Upload.upload({
              url: 'files',
              fields: {
                'username': rootScope.user.f_name
              },
              file: file
            }).progress(function(evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded /
                evt.total);
              console.log('progress: ' + progressPercentage + '% ' +
                evt.config.file
                .name);
            }).success(function(data, status, headers, config) {
              console.log('file ' + config.file.name +
                'uploaded. Response: ' +
                data);
            });
          }
        }
      };
    }
  ]
);
