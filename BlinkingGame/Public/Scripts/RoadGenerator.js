// -----JS CODE-----

// SCRIPT IS NO LONGER IN USE

// Variables
//@input Asset.ObjectPrefab roadPrefab {"label":"road prefab"}
//@input vec3 localOffset {"label":"local offset"}
//@input float stepSize {"label":"step size"}
//@input float moveSpeed {"label":"move speed"}


var x = 0;
var roadpieces = [];
var positions = [];
var event = script.createEvent("UpdateEvent");
var minX = -3 * script.stepSize;
var maxX = 5 * script.stepSize;

for(var i = -3; i < 6; i++)
{
    x = i * script.stepSize;
    var trns = spawnRoadPiece(x);
    roadpieces.push(trns);
    positions.push(trns.getLocalPosition);
}


function spawnRoadPiece(x)
{
    if(script.roadPrefab) // like isset?? it works.
    {
        // instantiate as child of scene object
        var instanceObject = script.roadPrefab.instantiate(script.getSceneObject());
        var transform = instanceObject.getTransform();
        var newOffset = script.localOffset.add(new vec3(x, 0, 0));
        transform.setLocalPosition(newOffset);
        
        return transform;
    }
    else
    {
        return undefined;
    }
}

event.bind(
function movePieces(eventData)
{
    var currentPos;
    
    for(var i = 0; i < roadpieces.length; i++)
    {
        currentPos = roadpieces[i].getLocalPosition();
        
        if(currentPos.x < minX)
        {
            // translate back to start
            currentPos.x = maxX;
        }
       else{
                    currentPos.x -= script.moveSpeed * eventData.getDeltaTime();
        }

        roadpieces[i].setLocalPosition(currentPos);
    }
});
