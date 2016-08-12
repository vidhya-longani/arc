angular.module("arcApp").service('mapService', function () {

    // it's not require... it's a wish?
    var wish = {};

    function _loadDependencies(deps, next) {
        var reqArr = _.values(deps),
            keysArr = _.keys(deps);

        // use the dojo require (required by arcgis + dojo) && save refs
        // to required obs
        require(reqArr, function () {
            var args = arguments;

            _.each(keysArr, function (name, idx) {
                wish[name] = args[idx];
            });

            next();
        });
    }

    return {
        loadDependencies: function (deps, next) {
            _loadDependencies(deps, next);
        },

        get: function () {
            return wish;
        }
    };

});
    