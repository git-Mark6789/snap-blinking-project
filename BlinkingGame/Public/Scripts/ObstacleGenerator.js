// -----JS CODE-----
//@input Asset.ObjectPrefab obstaclePrefab
//@input Asset.ObjectPrefab carPrefab;
//@input vec3 spawnPosition1
//@input vec3 spawnPosition2
//@input Component.ScriptComponent roadMover;
//@input Component.ScriptComponent collisionManager;
//@input float spawnRate;
//@input float carSpeed;


var obstacles = [];
var cars = [];
var t = 0;
var stopped;


function onUpdate(eventData)
{
    if(stopped) return;
    
    if(t >= script.spawnRate)
    {
        spawnObstacle();
        t = 0;
    }
    else
    {
        t += eventData.getDeltaTime();
    }
    
    moveObstacles(eventData);
    moveCars(eventData);
}

function spawnObstacle() 
{
    var instance;
    var trs;
    
    if(Math.random() < 0.85)
    {
        instance = script.obstaclePrefab.instantiate(script.getSceneObject());
        trs = instance.getTransform();
        obstacles.push(trs);
    }
    else
    {
        instance = script.carPrefab.instantiate(script.getSceneObject());
        trs = instance.getTransform();
        cars.push(trs);
    }


    var collider = instance.getComponent("Component.ScriptComponent");
    var lane = Math.round(Math.random());
    
    var pos = (lane < 0.5) ? script.spawnPosition1 : script.spawnPosition2;

    trs.setLocalPosition(pos);
    
    collider.api.lane = lane;
    
    script.collisionManager.api.registerObstacle(collider);
}

function moveObstacles(eventData)
{
    var curPos;
    
    for(var i = 0; i < obstacles.length; i++)
    {
        curPos = obstacles[i].getLocalPosition();
        // IT WORKSSS
        curPos.x -= script.roadMover.api.speed * eventData.getDeltaTime();
        obstacles[i].setLocalPosition(curPos);
    }
}

function moveCars(eventData)
{
    var curPos;
    
    for(var i = 0; i < cars.length; i++)
    {
        curPos = cars[i].getLocalPosition();
        // IT WORKSSS
        curPos.x -= (script.roadMover.api.speed + script.carSpeed) * eventData.getDeltaTime();
        cars[i].setLocalPosition(curPos);
    }
}

script.api.stop = function()
{
    stopped = true;
}

var udpateEvent = script.createEvent("UpdateEvent");
udpateEvent.bind(onUpdate);