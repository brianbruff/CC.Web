(function () {
    'use strict';
    var controllerId = 'gdmxDiff';
    angular.module('app').controller(controllerId, ['common', 'datacontext', '$upload', gdmxDiffController]);

    function gdmxDiffController(common, datacontext, $upload) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logError = getLogFn(controllerId, 'error');
        var logSuccess = getLogFn(controllerId, 'success');

        var vm = this;
        vm.getDiff = getDiff;
        vm.onFileSelect = onFileSelect;
        vm.upload = {};
        vm.comparison = null;


        vm.modelEpcOptions = { animate: true, barColor: '#FF0000', scaleColor: true, lineWidth: 3, lineCap: 'butt' };
        vm.profileEpcOptions = { animate: true, barColor: '#E67E22', scaleColor: true, lineWidth: 3, lineCap: 'butt' };
        vm.versionEpcOptions = { animate: true, barColor: '#0000FF', scaleColor: true, lineWidth: 3, lineCap: 'butt' };
        
        activate();

        function activate() {
            common.activateController([], controllerId).then(function() {
                log('Activated Gdmx Diff');
            });
        }
        
        function calculateMetrics() {
            vm.modelMismatchCount = vm.comparison.length;
            vm.profileMismatchCount = 0;
            vm.versionMismatchCount = 0;

            angular.forEach(vm.comparison, function (model) {
                vm.profileMismatchCount += model.profiles.length;
                angular.forEach(model.profiles, function (profile) {
                    vm.versionMismatchCount += profile.versions.length;

                });

            });

            
        }
        
        function onFileSelect($files, side) {
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                vm.upload = $upload.upload({
                    url: '/api/Files/', 
                    method: 'POST',
                    data: { side: { side: side } },
                    file: file,
                }).success(function (data) {
                    //logSuccess("Diff result retrieved");
                    vm.comparison = data;
                    calculateMetrics();
                }).error(function (data, status) {
                    logError('Failed to send file ' + status);
                });
            }
        }
        

        function getDiff() {
            datacontext.getGdmx34Diff();
            
            
        }
        

    }
})();