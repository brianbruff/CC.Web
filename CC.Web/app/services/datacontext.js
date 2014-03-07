(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getCurveCategories: getCurveCategories,
            getCurveTypes: getCurveTypes,
            getMessageCount: getMessageCount,
            getCurveStatus: getCurveStatus,
            getProducts: getProducts,
            getCommodities: getCommodities,
            getSuppliers: getSuppliers,
            getRegions: getRegions,
            getDependencies: getDependencies
        };

        return service;

        function getMessageCount() { return $q.when(710); }

        function getCurveCategories() {
            var categories = [
                { name: 'BootGas', description: "Bootstrap Gas", curveCount: '44', status: true },
                { name: 'BootOil', description: "Bootstrap Oil", curveCount: '15', status: true },
                { name: 'RegressionOil', description: "Oil regression curves", curveCount: '51', status: false },
            ];
            return $q.when(categories);
        }

        function getCurveTypes() {
            var types = [
                { name: 'BootootstrapGas', description: "Bootstrap Gas", curveCount: '34', status: true },
                { name: 'BootootstrapGasSA', description: "Bootstrap Gas Seasonality", curveCount: '10', status: true },
                { name: 'BootstrapOil', description: "Bootstrap Oil", curveCount: '15', status: false },
                { name: 'Correlation', description: "Oil correlation curves", curveCount: '51', status: false },
            ];
            return $q.when(types);
        }

        function getCurveStatus() {
            var status = [
                { name: 'ETS.CH_BASE_ETSFO.FINAL.MID.EUR_MWH.SPR', resource: 'CLOSING_FWD__POWER', description: "Swiss Base Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7: false, Tm6: false, Tm5: false, Tm4: false, Tm3: false, Tm2: false, Tm1: false, T: undefined },
                { name: 'ETS.CH_OFFPEAK_ETSFO.FINAL.MID.EUR_MWH.SPR', resource: 'CLOSING_FWD__POWER', description: "Swiss Offpeak Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7: false, Tm6: false, Tm5: false, Tm4: true, Tm3: true, Tm2: true, Tm1: true, T: undefined },
                { name: 'ETS.CH_PEAK_ETSFO.FINAL.MID.EUR_MWH.SPR', resource: 'CLOSING_FWD__POWER', description: "Swiss Peak Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7: true, Tm6: false, Tm5: true, Tm4: true, Tm3: true, Tm2: true, Tm1: true, T: undefined },
            ];
            return $q.when(status);
        }

        function getSuppliers() {
            var status = [
                { name: 'ICE' },
                { name: 'Platts' },
                { name: 'Supplier1' },
                { name: 'Supplier2' },
                { name: 'Supplier3' },
                { name: 'Supplier4' },
                { name: 'Supplier5' },
                { name: 'Supplier6' },
                { name: 'Supplier7' },
                { name: 'Supplier8' },
                { name: 'Supplier9' },
                { name: 'Supplier10' },
                { name: 'Supplier11' },
                { name: 'Supplier12' },
                { name: 'Supplier13' },
                { name: 'Supplier14' },
                { name: 'Supplier15' },
            ];
            return $q.when(status);
        }

        function getRegions() {
            var status = [
                { name: 'ARA' },
                { name: 'North West Europe' },
                { name: 'Rotterdam' },
            ];
            return $q.when(status);
        }

        function getProducts() {
            var status = [
                { name: 'ICE Gasoil' },
                { name: 'ICE Brent' },
                { name: 'Low Sulpher Diesel' },
            ];
            return $q.when(status);
        }

        function getCommodities() {
            var status = [
                { name: 'Oil' },
                { name: 'Products' },
            ];
            return $q.when(status);
        }

        function getDependencies() {
            var dependencies = [{
                name: "Power NL Final Power", code: 1, status: -1, children: [
                    { name: "Power NL EEX", code: 2, status: -1, },
                {
                    name: "Power NL Broker Final",
                    code: 3,
                    status: 0,
                    children: [
                        { name: "Power NL Broker1 Bootstrap", code: 4, status: 1 },
                        { name: "Power NL Broker2 Bootstrap", code: 5, status: 0 },
                        { name: "Power NL Broker3 Bootstrap", code: 6, status: -1 }]
                }]
            }, { name: "Bootstrap Gas Prebon", code: 7, status: 1 }];
            
            return $q.when(dependencies);
        }
    }
})();