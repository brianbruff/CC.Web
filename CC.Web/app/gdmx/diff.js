(function () {
    'use strict';
    var controllerId = 'gdmxDiff';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dependencies]);

    function dependencies(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        vm.leftFile = "";
        vm.rightFile = "";
        vm.getDiff = getDiff;


        activate();

        function activate() {
            common.activateController([], controllerId).then(function() {
                log('Activated Gdmx Diff');
            });
        }
        

        function getDiff() {
            datacontext.getGdmx34Diff();
        }

        
        

    }
})();