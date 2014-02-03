(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(710); }

        function getPeople() {
            var people = [
                { firstName: 'Brian', lastName: 'Keating', age: 25, location: 'Ireland' },
                { firstName: 'Colin', lastName: 'Hartley', age: 31, location: 'Essex' },
                { firstName: 'Angular', lastName: 'DotJs', age: 35, location: 'Everywhere' }
            ];
            return $q.when(people);
        }
    }
})();