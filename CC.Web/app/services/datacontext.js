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
            getCurveStatus: getCurveStatus
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
                { name: 'curvedefinition://CLOSING_FWD__POWER/ETS.CH_BASE_ETSFO.FINAL.MID.EUR_MWH.SPR', description: "Swiss Base Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7 : false, Tm6:false, Tm5: false, Tm4:false, Tm3:false,Tm2:false,Tm1:false, T : undefined },
                { name: 'curvedefinition://CLOSING_FWD__POWER/ETS.CH_OFFPEAK_ETSFO.FINAL.MID.EUR_MWH.SPR', description: "Swiss Offpeak Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7: false, Tm6: false, Tm5: false, Tm4: true, Tm3: true, Tm2: true, Tm1: true, T: undefined },
                { name: 'curvedefinition://CLOSING_FWD__POWER/ETS.CH_PEAK_ETSFO.FINAL.MID.EUR_MWH.SPR', description: "Swiss Peak Final Power curve", buildType: 'Plus Differential', category: "Power", Tm7: true, Tm6: false, Tm5: true, Tm4: true, Tm3: true, Tm2: true, Tm1: true, T: undefined },
            ];
            return $q.when(status);
        }
    }
})();