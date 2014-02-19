(function () {
    'use strict';
    var controllerId = 'dependencies';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dependencies]);

    function dependencies(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Genic Insight',
            description: 'Datagenic Dashboard.'
        };
        
        vm.filterValue = '';
        vm.messageCount = 0;
        vm.categories = [];
        vm.types = [];
        vm.curveStatus = [];
        vm.title = 'Dependencies';

        activate();

        function activate() {
            var promises = [getMessageCount(), getCurveCategories(), getCurveTypes(), getCurveStatus()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated depencency View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getCurveCategories() {
            return datacontext.getCurveCategories().then(function (data) {
                return vm.categories = data;
            });
        }
        
        function getCurveTypes() {
            return datacontext.getCurveTypes().then(function (data) {
                return vm.types = data;
            });
        }
        
        function getCurveStatus() {
            return datacontext.getCurveStatus().then(function (data) {
                return vm.curveStatus = data;
            });
        }
    }
})();