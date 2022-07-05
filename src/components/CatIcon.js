import L from "leaflet";

const CatIcon = new L.Icon({
  iconUrl: require("../img/cat.svg"),
  iconRetinaUrl: require("../img/cat.svg"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export { CatIcon };
