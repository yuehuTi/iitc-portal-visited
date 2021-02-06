// ==UserScript==
// @id             iitc-plugin-upcv@takurua
// @name           IITC plugin: Show portal visited
// @category       Layer
// @version        1.0.0
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {
if(typeof window.plugin !== 'function') window.plugin = function() {};
plugin_info.buildName = 'iitc';
plugin_info.dateTimeVersion = '20210206.213300';
plugin_info.pluginId = 'upcv';

// PLUGIN START ////////////////////////////////////////////////////////
window.plugin.upcv = function() {
};

window.plugin.upcv.ICON_SIZE = 12;
window.plugin.upcv.MOBILE_SCALE = 1.5;

window.plugin.upcv.upcvLayers = {};
window.plugin.upcv.scopeLayers = {};
window.plugin.upcv.upcvLayerGroup = null;
window.plugin.upcv.scopeLayerGroup = null;

window.plugin.upcv.removeFlag = function(guid) {
  var previousLayer = window.plugin.upcv.upcvLayers[guid];
  if(previousLayer) {
    window.plugin.upcv.upcvLayerGroup.removeLayer(previousLayer);
    delete plugin.upcv.upcvLayers[guid];
  }
  previousLayer = window.plugin.upcv.scopeLayers[guid];
  if(previousLayer) {
    window.plugin.upcv.scopeLayerGroup.removeLayer(previousLayer);
    delete plugin.upcv.scopeLayers[guid];
  }
}

window.plugin.upcv.addFlag = function(guid,latLng,type) {
  window.plugin.upcv.removeFlag(guid);
  var p = window.portals[guid];
  var levelNumber = p.options.level;
  var iconurl = ""
  var iconSize = ""
  if(type == 1){
    iconurl = "http://commondatastorage.googleapis.com/ingress.com/img/map_icons/marker_images/layer_visited.png"
    iconSize = [30,30]
  }
  if(type == 2){
    iconurl = "http://commondatastorage.googleapis.com/ingress.com/img/map_icons/marker_images/layer_captured.png"
    iconSize = [30,30]
  }
  if(type == 4){
    iconurl = "http://commondatastorage.googleapis.com/ingress.com/img/map_icons/marker_images/layer_scanned.png"
    iconSize = [40,40]
  }
  var flag = L.marker(latLng, {
      title: "",
      icon: L.icon({
        iconUrl: iconurl,
        iconAnchor: [15,15],
        iconSize: [30,30]
      })
    });
  if(type == 1){
    plugin.upcv.upcvLayers[guid] = flag;
    flag.addTo(plugin.upcv.upcvLayerGroup);
  }
  if(type == 2){
    plugin.upcv.upcvLayers[guid] = flag;
    flag.addTo(plugin.upcv.upcvLayerGroup);
  }
  if(type == 4){
    plugin.upcv.scopeLayers[guid] = flag;
    flag.addTo(plugin.upcv.scopeLayerGroup);
  }
}

window.plugin.upcv.updatePortalFlag = function() {
  if (!map.hasLayer(window.plugin.upcv.upcvLayerGroup) && !map.hasLayer(window.plugin.upcv.scopeLayerGroup)) {
    return;
  }
  var showupcv = false
  var showscope = false
  if (map.hasLayer(window.plugin.upcv.upcvLayerGroup)){
    showupcv = true
  }
  if (map.hasLayer(window.plugin.upcv.scopeLayerGroup)){
    showscope = true
  }
  var portalVisted = {};
  var portalCapture = {};
  var portalScope = {};

  for (var guid in window.portals) {
    var p = window.portals[guid];
    if (p._map && p.options.data.title) {
      if (showupcv && p.options.ent[2][18] & 2) {
        portalCapture[guid] = p;
      }else if(showupcv && p.options.ent[2][18] & 1){
        portalVisted[guid] = p;
      }
      if (showscope && p.options.ent[2][18] & 4) {
        portalScope[guid] = p;
      }
    }
  }
  for (guid in portalVisted) {
    window.plugin.upcv.addFlag(guid, portalVisted[guid].getLatLng(), 1);
  }
  for (guid in portalCapture) {
    window.plugin.upcv.addFlag(guid, portalCapture[guid].getLatLng(), 2);
  }
  for (guid in portalScope) {
    window.plugin.upcv.addFlag(guid, portalScope[guid].getLatLng(), 4);
  }
}

window.plugin.upcv.delayedUpdatePortalFlag = function(wait) {
  if (window.plugin.upcv.timer === undefined) {
    window.plugin.upcv.timer = setTimeout ( function() {
      window.plugin.upcv.timer = undefined;
      window.plugin.upcv.updatePortalFlag();
    }, wait*1000);

  }
}

window.plugin.upcv.createLayer = function() {
    window.plugin.upcv.upcvLayerGroup = new L.FeatureGroup();
    window.plugin.upcv.scopeLayerGroup = new L.FeatureGroup();

    window.addLayerGroup('UPC/V', window.plugin.upcv.upcvLayerGroup, true);
    window.addLayerGroup('Scope Controler', window.plugin.upcv.scopeLayerGroup, true);


    window.addHook('requestFinished', function() { setTimeout(function(){window.plugin.upcv.delayedUpdatePortalFlag(3.0);},1); });
    window.addHook('mapDataRefreshEnd', function() { window.plugin.upcv.delayedUpdatePortalFlag(0.5); });
    window.map.on('overlayadd overlayremove', function() { setTimeout(function(){window.plugin.upcv.delayedUpdatePortalFlag(1.0);},1); });
}

var setup = function() {
    window.plugin.upcv.createLayer();
}
// PLUGIN END //////////////////////////////////////////////////////////
setup.info = plugin_info;
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
if(window.iitcLoaded && typeof setup === 'function') setup();
}
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


