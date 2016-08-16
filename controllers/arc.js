angular.module("arcApp")
.controller("ArcController", function ($rootScope, $scope, mapService) {
	var w = mapService.get();//initiate mapService

  $scope.mapInit = function(){//map initiate with search box
	    $scope.map = new w.Map("map", {
            basemap: "streets",
            center: [-120.435, 46.159], // lon, lat
            zoom: 15
        });//set map
	    var search = new w.Search({//set autocomplete
            map: $scope.map
         }, "search");
      search.startup();//start search
      search.on('select-result', function(result){//set search result
        var web = w.WebMercator.webMercatorToGeographic(result.result.feature.geometry);
        $scope.searchLat =  web.y;
        $scope.searchLng =  web.x;
      });
      editToolbar = new w.Edit($scope.map);//add edit toolbar
      $scope.map.on("click", function(evt){//on click on map deactivate any current highlighted polygon for editing
        editToolbar.deactivate();
      });
      $scope.map.on("layer-add-result",function(evt){//when layer is added add editing on it
        evt.layer.on("click", function(evt) {//on click on layer enable editing
          w.Event.stop(evt);//stop any other open events
          activateToolbar(evt.graphic);//activate editing
        });
      });
	}
	$scope.drawBoundary = function(){//to add boundary to map
    draw('boundary');
	}
	$scope.drawExclusion = function(){//to add exclusion to map
    draw('exclusion');
	}
	$scope.addPCC = function(){//add pcc to the map
		var center = $scope.map.extent.getCenter();//add PCC to the centre of the map
	  var lat = center.y;
	  var lon = center.x;
		var point = new w.Point(lon, lat);
		point = w.WebMercator.webMercatorToGeographic(point);
		var symbol = new w.PictureMarkerSymbol("./img/point-of-interconnect.png", 70, 45);
		var graphic = new w.Graphic(point, symbol);
		var layer = new w.GraphicsLayer();
		layer.add(graphic);
		$scope.map.addLayer(layer);
	}
	//function edit(evt) {//enable editing/dragon polygons
    // var editToolbar = new w.Edit($scope.map);
    // editToolbar.on("deactivate", function(evt) {//deactivate default functionalities
    //   if (evt.info.isModified) {
    //   	if(evt.layer){
    //   		evt.layer.applyEdits(null, [evt.graphic], null);
    //   	}
    //   }
    // });

    // var editingEnabled = false;
    // evt.layer.on("dbl-click", function(evt) {//dbl-click and set/remove edit and drag feature
    //   w.Event.stop(evt);
    //   if (editingEnabled) {
    //     editingEnabled = false;
    //     editToolbar.deactivate();
    //     if(evt.layer){
    //     	evt.layer.clearSelection();
    //     }
    //   }
    //   else {
    //     editingEnabled = true;
    //     editToolbar.activate(w.Edit.MOVE | w.Edit.EDIT_VERTICES, evt.graphic);
    //   }
    // });

  //}
  function activateToolbar(graphic){//set editing type and graphic
    editToolbar.activate(w.Edit.MOVE | w.Edit.EDIT_VERTICES, graphic);//add ability to move/drag and edit vertices on graphic
  }
  function draw(type){
    var latOffset, lonOffset, center, lat, lon, points;
    var center = $scope.map.extent.getCenter();
    var lat = center.y;
    var lon = center.x + 500;
    if(type == 'exclusion'){
      var latOffset = 100;// Create a small Polygon
      var lonOffset = 100;
    }else{
      var latOffset = 500;// Create a big Polygon
      var lonOffset = 500;
    }
    var points = [
      new w.Point(lon - lonOffset, lat + latOffset, map.spatialReference),
      new w.Point(lon, lat+  latOffset, map.spatialReference),
      new w.Point(lon , lat, map.spatialReference),
      new w.Point(lon - lonOffset, lat, map.spatialReference),
      new w.Point(lon - lonOffset, lat + lonOffset, map.spatialReference)
    ];
    var polygon = new w.Polygon();
    polygon.addRing(points);
    polygon.spatialReference = $scope.map.spatialReference;
    // Add the polygon to map
    if(type == 'exclusion'){//red polygon
       var symbol = new w.SimpleFillSymbol().setStyle(w.SimpleFillSymbol.STYLE_SOLID).setColor(new w.Color([178,34,34,0.8])).setOutline(new w.SimpleLineSymbol(
            w.SimpleLineSymbol.STYLE_SOLID,
            new w.Color("#b22222"), 2
          ));
    }else{//green polygon
      var symbol = new w.SimpleFillSymbol().setStyle(w.SimpleFillSymbol.STYLE_SOLID).setColor(new w.Color([79,255,47,0.3])).setOutline(new w.SimpleLineSymbol(
            w.SimpleLineSymbol.STYLE_SOLID,
            new w.Color("#4fff2f"), 2
          ));;
    }
    polygonGraphic = new w.Graphic(polygon, symbol);
    if(type == 'exclusion'){//set ids on polygons
      var polyLayer = new w.GraphicsLayer({id : 'excl_'+Math.random(5)});
    } else{
      var polyLayer = new w.GraphicsLayer({id : 'bound_'+Math.random(5)});
    }
    $scope.map.addLayer(polyLayer);
    polyLayer.add(polygonGraphic);
  }
});