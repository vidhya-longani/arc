angular.module('arcApp', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/map', {
				controller: 'ArcController',
				templateUrl: './views/map.html',
				resolve: {
		            promiseObj: function ($q, $rootScope, mapService) {
		                var deferred = $q.defer(),
		                    deps = {
		                        Map: 'esri/map',
		                        FeatureLayer: 'esri/layers/FeatureLayer',
		                        InfoTemplate: 'esri/InfoTemplate',
		                        SimpleFillSymbol: 'esri/symbols/SimpleFillSymbol',
		                        SimpleLineSymbol: 'esri/symbols/SimpleLineSymbol',
		                        SimpleMarkerSymbol: 'esri/symbols/SimpleMarkerSymbol',
		                        PictureMarkerSymbol: 'esri/symbols/PictureMarkerSymbol',
		                        GeometryTask : "esri/tasks/geometry",
		                        Geometry : "esri/geometry",
		                        Color: 'dojo/_base/Color',
		                        Search :  "esri/dijit/Search",
		                        Graphic : "esri/graphic",
		                        GraphicUtils : "esri/graphicsUtils",
		                        Array : 'dojo/_base/array',
		                        Edit : "esri/toolbars/edit",
		                       	Event : "dojo/_base/event",
		                        GraphicsLayer :"esri/layers/GraphicsLayer",
		                        Polygon : "esri/geometry/Polygon",
		                        Point : "esri/geometry/Point",
		                        Extent : "esri/geometry/Extent",
		                        WebMercator : "esri/geometry/webMercatorUtils",
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