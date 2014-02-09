(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getCurveCategories: getCurveCategories,
            getMessageCount: getMessageCount,
            getCurveStatus: getCurveStatus
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