(function () {
    'use strict';
    var controllerId = 'overview';
    angular.module('app').controller(controllerId, ['common', 'datacontext', overview]);

    function overview(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Genic Insight',
            description: 'Datagenic Dashboard.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Overview';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated overview View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();