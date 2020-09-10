// -----JS CODE-----
//@input Component.ScriptComponent playerCollider;
//@input Component.ScriptComponent player;
//@input Component.ScriptComponent obstacleGen;
//@input Component.ScriptComponent roadMover;


var playerKilled;
var obstacles = [];

script.api.registerObstacle = function(obstacle)
{
    obstacles.push(obstacle);
}

init();

function init()
{
    for(var i = 0; i < obstacles.length; i++)
    {
        obstacles[i].pop();
    }
}

function onUpdate()
{
    if(playerKilled == true) return;
    
    script.playerCollider.api.updateVariables();

    for(var i = 0; i < obstacles.length; i++)
    {
        if(isNull(obstacles[i]) == false)
        {
            obstacles[i].api.updateVariables();
        
            if(intersection(obstacles[i]))
            {
                // collision, end game immediately
                script.player.api.kill();
                script.obstacleGen.api.stop();
                script.roadMover.api.stop();
                playerKilled = true;
            }
        }

    }
}

// Checks if the player AABB intersects with this obstacle
function intersection(ob)
{
    //print("Player: " + script.playerCollider.api.lane + ", object: " + ob.api.lane);
    //return 
    //(script.playerAABB.api.minX <= ob.api.maxX && script.playerAABB.api.maxX >= ob.api.minX) &&
    //(script.playerAABB.api.minY <= ob.api.maxY && script.playerAABB.api.maxY >= ob.api.minY);
    if(script.playerCollider.api.minX <= ob.api.maxX &&
       script.playerCollider.api.maxX >= ob.api.maxX)
    {
        
        if(script.playerCollider.api.lane === ob.api.lane)
        {
            return true;
        }
    }
    
    return false;
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);










