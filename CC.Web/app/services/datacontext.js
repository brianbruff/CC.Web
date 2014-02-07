(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getCurveCategories: getCurveCategories,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(710); }

        function getCurveCategories() {
            var categories = [
                { name: 'BootGas', description: "Bootstrap Gas", curveCount: '44', status: "fa fa-thumbs-o-down" },
                { name: 'BootOil', description: "Bootstrap Oil", curveCount: '15', status: "fa fa-thumbs-o-up" },
                { name: 'RegressionOil', description: "Oil regression curves", curveCount: '51', status: "fa fa-thumbs-o-down" },
            ];
            return $q.when(categories);
        }
    }
})();