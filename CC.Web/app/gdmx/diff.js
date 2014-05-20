(function () {
    'use strict';
    var controllerId = 'gdmxDiff';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dependencies]);

    function dependencies(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        vm.leftFile = null;
        vm.rightFile = null;
        vm.getDiff = getDiff;
        vm.onFileSelect = onFileSelect;
        
        
        activate();

        function activate() {
            common.activateController([], controllerId).then(function() {
                log('Activated Gdmx Diff');
            });
        }
        
        function onFileSelect($file, side) {
            if (side === "left") {
                vm.leftFile = $file;
            } else if (side === "fight") {
                vm.rightFile = $file;
            }
        }
        

        function getDiff() {
            datacontext.getGdmx34Diff();
        }

        
        

    }
})();