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
        vm.suppliers = [];
        vm.products = [];
        vm.commodities = [];
        vm.regions = [];

        activate();

        function activate() {
            var promises = [getMessageCount(), getCurveCategories(), getCurveTypes(), getCurveStatus(), getCommodities(), getRegions(), getSuppliers(), getProducts()];
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
        
        function getProducts() {
            return datacontext.getProducts().then(function (data) {
                return vm.products = data;
            });
        }
        
        function getSuppliers() {
            return datacontext.getSuppliers().then(function (data) {
                return vm.suppliers = data;
            });
        }
        
        function getRegions() {
            return datacontext.getRegions().then(function (data) {
                return vm.regions = data;
            });
        }
        
        function getCommodities() {
            return datacontext.getCommodities().then(function (data) {
                return vm.commodities = data;
            });
        }
    }
})();