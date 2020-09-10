// -----JS CODE-----
//@input Component.Head headBinding
//@input float blinkDstThreshold
//@input float topLaneY
//@input float bottomLaneY
//@input float depth
//@input Component.ScriptComponent collider




const upperEyeLidIndex = 78;
const lowerEyeLidIndex = 82;
const jumpDelay = 10; // wait this many frames until processing another blink event, prevents jittering

var tracking;
var cachedTransform = script.getTransform();

var playerY;
var playerYTarget;

var curFrame = 0;
var curLane = 1;
var trueLane = 0;
var killed;

var initialized = false;

// FIX API availability
script.api.kill = function()
{
    print("Dead");
    killed = true;
}

function onUpdate()
{
    if(tracking == false || killed) return;
    
    var pos1 = script.headBinding.getLandmark(upperEyeLidIndex);
    var pos2 = script.headBinding.getLandmark(lowerEyeLidIndex);
    
    if(curFrame == jumpDelay)
    {
        if(Math.abs(pos1.y - pos2.y) < script.blinkDstThreshold) // inputs should ideally be stored in a buffer
        {
            jump();
            curFrame = 0;
        }
    }
    else
    {
        curFrame++;
    }
}

function onFaceFound()
{
    tracking = true;
}

function onFaceLost()
{
    tracking = false;
}


function jump()
{   
    if(initialized == true)
    {
        if(curLane == 1)
            curLane = 0;
        else if(curLane == 0)
            curLane = 1;
    }
    
    trueLane = (curLane == 1) ? 0 : 1;
    
    script.collider.api.lane = trueLane;
    
    var start = new vec3(0, 0, script.depth);
    var end =  new vec3(0, 0, script.depth);
    
    start.y = curLane == 0 ? script.topLaneY : script.bottomLaneY;
    end.y = curLane == 0 ? script.bottomLaneY : script.topLaneY;
    
    var obj = script.getSceneObject();
    
    global.tweenManager.setStartValue(obj, "carJump", start);
    global.tweenManager.setEndValue(obj, "carJump", end);
    global.tweenManager.startTween(obj, "carJump");
    
    initialized = true;
}


var faceFoundEvent = script.createEvent("FaceFoundEvent");
faceFoundEvent.bind(onFaceFound);
var faceLostEvent = script.createEvent("FaceLostEvent");
faceLostEvent.bind(onFaceLost);
var updateEvent = script.createEvent( "UpdateEvent" );
updateEvent.bind(onUpdate);