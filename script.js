angular.module('arcApp', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/map', {
				controller: 'ArcController',
				templateUrl: 'map.html',
				resolve: {
		            promiseObj: function ($q, $rootScope, mapService) {
		                var deferred = $q.defer(),
		                    deps = {
		                        Map: 'esri/map',
		                        FeatureLayer: 'esri/layers/FeatureLayer',
		                        InfoTemplate: 'esri/InfoTemplate',
		                        SimpleFillSymbol: 'esri/symbols/SimpleFillSymbol',
		                        SimpleRenderer: 'esri/renderers/SimpleRenderer',
		                        SimpleMarkerSymbol: 'esri/symbols/SimpleMarkerSymbol',
		                        ScaleDependentRenderer: 'esri/renderers/ScaleDependentRenderer',
		                        Color: 'dojo/_base/Color',
		                        Search :  "esri/dijit/Search",
		                        DojoReady : "dojo/domReady!"
		                    };

		                mapService.loadDependencies(deps, function () {
		                    deferred.resolve();
		                    if (!$rootScope.$$phase) {
		                        $rootScope.$apply();
		                    }
		                });

		                return deferred.promise;
		            }
       			}
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);