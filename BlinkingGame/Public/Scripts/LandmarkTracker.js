// -----JS CODE-----
//@input int faceLandmarkIndex = 30 {"min": 0, "max": 92}
//@input Component.Head headBinding
//@input Component.ScreenTransform screenImage
var isFaceTracking = false;
var landmarksPosition = vec3.zero();
var screenImage = script.screenImage;
function onUpdate()
{
   if(!isFaceTracking)
   {
       return;
   }
   landmarksPosition = script.headBinding.getLandmark(script.faceLandmarkIndex);
   var parentPos = screenImage.screenPointToParentPoint(landmarksPosition);
   screenImage.anchors.setCenter(parentPos);
}
function onFaceFound()
{
   isFaceTracking = true;
}
function onFaceLost()
{
   isFaceTracking = false;
}
var faceFoundEvent = script.createEvent("FaceFoundEvent");
faceFoundEvent.bind(onFaceFound);
var faceLostEvent = script.createEvent("FaceLostEvent");
faceLostEvent.bind(onFaceLost);
var updateEvent = script.createEvent( "UpdateEvent" );
updateEvent.bind( onUpdate );