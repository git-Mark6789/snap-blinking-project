// -----JS CODE-----
//@input float width;

// A collider can be highly simplified in a scenario such as this
script.api.minX = 0;
script.api.maxX = 0;
script.api.lane;

//script.api.minY = 0;
//script.api.maxY = 0;


//script.api.updateAABB = function()
//{
//    var center = getCenter();
//    var halfWidth = script.width / 2;
//    var halfHeight = script.height / 2;
//    
//    script.api.minX = center.x - halfWidth;
//    script.api.minY = center.y - halfHeight;
//    script.api.maxX = center.x + halfWidth;
//    script.api.maxY = center.y + halfHeight;
//}

script.api.updateVariables = function()
{
    var pos = getCenter();
    
    script.api.minX = pos.x - script.width / 2;
    script.api.maxX = pos.x + script.width / 2;
}

function getCenter()
{
    return script.getSceneObject().getTransform().getWorldPosition();
}

