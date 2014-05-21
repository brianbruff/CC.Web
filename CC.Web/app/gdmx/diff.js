(function () {
    'use strict';
    var controllerId = 'gdmxDiff';
    angular.module('app').controller(controllerId, ['common', 'datacontext', '$upload', dependencies]);

    function dependencies(common, datacontext, $upload) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logError = getLogFn(controllerId, 'error');

        var vm = this;

//        vm.leftFile = null;
//        vm.rightFile = null;
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
            
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                vm.upload = $upload.upload({
                    url: '/api/Files/', 
                    method: 'POST',
                    data: {side: side},
                    file: file,
                }).progress(function(evt) {
                }).success(function(data, status, headers, config) {
                    logSuccess(data);
                }).error(function (data, status, headers, config) {
                    logError('Failed to send file ' + status);
                });
            }
            
        }
        

        function getDiff() {
            datacontext.getGdmx34Diff();
            
            
        }
        

    }
})();