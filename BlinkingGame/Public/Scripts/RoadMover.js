// -----JS CODE-----
//@input float moveSpeed {"label":"move speed"}
//@input float minX {"label":"min X"}
//@input float initialX {"label":"initial X"}
//@input float spdIncreaseFactor {"label":"speed increase factor"}
//@input Component.Text distanceText {"label":"distance text"}


var trns = script.getTransform();
var curSpeed = script.moveSpeed;
var distance = 0;

script.api.speed = curSpeed;

script.api.stop = function()
{
    curSpeed = 0;
    script.spdIncreaseFactor = 0;
}

var event = script.createEvent("UpdateEvent");
event.bind(
function move()
{
    curSpeed += script.spdIncreaseFactor * getDeltaTime();
    
    var pos = trns.getLocalPosition();
    
    if(pos.x < script.minX)
    {
        pos.x = script.initialX;
    }
    
    pos.x -= curSpeed * getDeltaTime();
    trns.setLocalPosition(pos);
    distance += curSpeed * getDeltaTime();
    
    script.distanceText.text = Math.round(distance * 0.1).toString();
}
)
