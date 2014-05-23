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


        activate();

        function activate() {
            common.activateController([], controllerId).then(function() {
                log('Activated Gdmx Diff');
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
                    var diffs = JSON.parse(data);
                    logSuccess(diffs);
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