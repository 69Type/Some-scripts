alert('File was executed.\nThis file from my github.\nYou can change that file anytime you want.');
alert('For example here is the script of mine packet replacer');

console.log(`%cMade by Doctor Death D. Dracula`, 'background-color:yellow;border:2px solid #000;font-weight:bold;font-size:14px;font-family:monospace;padding:0px 20px;');

function hash(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array(length).fill().map(i => characters[Math.floor(Math.random() * characters.length)]).join('');
}

let _system_SAFE_KEY = true,
    sVAL = hash(Math.round(Math.random() * (16 - 8)) + 8),
    scene,
    animationFrame,
    players,
    me,
    cam,
    rotation,
    mouse;


Object.defineProperty(Object.prototype, "_systems", {
    set(val){
        console.log(this);
        this[sVAL] = val;
        setTimeout(init.bind(this, val), 5e3);
    },
    get(){
        return this[sVAL];
    }
});

Object.prototype.hasOwnProperty = new Proxy(Object.prototype.hasOwnProperty, {
    apply(target, thisArg, args){
        if (args[0] === '_systems' && _system_SAFE_KEY) return false;
        return Reflect.apply(...arguments);
    }
});

Object.defineProperty = new Proxy(Object.defineProperty, {
    apply(target, thisArg, args){
        if (args[1] === "_systems") _system_SAFE_KEY = false;
        return Reflect.apply(...arguments);
    }
});

function init(system){
    scene = system.find(o => o.wnNm).mWnwM;
    cam = system.find(o => o.wnNm).mWnwM.wnNmM.parent;
    me = system.find(o => o.wnNm).wnNm.wnWmN;
    players = system.find(o => o._queries?.animationEntities?.entities)._queries.animationEntities.entities;
    mouse = system.find(o => o.wnNm).mouse;
    rotation = system[0]._queries.player.entities[0]._components[44];

    console.log(players);

    const send = system.find(o => o.mWnwM).mWnwM.room.send.bind(system.find(o => o.mWnwM).mWnwM.room);
    system.find(o => o.mWnwM).mWnwM.room.send = function(commandCode, packet) {

        if (commandCode === 2) {
            let target = getNearestPlayer();
            if (target){
                let pos = target._components[0].value.position.clone();

                let relX = pos.x - me.pos.x,
                    relY = pos.y - me.pos.y,
                    relZ = pos.z - me.pos.z;

                let yaw = Math.atan2(-relX, -relZ),
                    pitch = Math.asin(relY / Math.hypot(relX, relY, relZ));

                let vector = anglesToDirVec(yaw, pitch);

                packet.b = [`${vector.x},${vector.y},${vector.z}`];
            }
        }

        return send(commandCode, packet);
    }
}


function getNearestPlayer(){
    return players.find(function(player){
        return player._components[50].isAlive && (!player._components[50].team || player._components[50].team !== me.team) && inAimFovInfi(player);
    });
}


function world2ScreenInfi(posVec, camera) {
    let vector = posVec.clone();
    vector.project(camera);

    let width = window.innerWidth, height = window.innerHeight;
    let widthHalf = width / 2, heightHalf = height / 2;

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return vector;
}


function inAimFovInfi(target) {
    const targetPos = target._components[0].value.position.clone();
    targetPos.y += 1.6;
    const screenPos = world2ScreenInfi(targetPos, cam);
    return screenPos.z < 1 && screenPos.x > (window.innerWidth / 2) - 100 && screenPos.x < (window.innerWidth / 2) + 100 && screenPos.y > (window.innerHeight / 2) - 80 && screenPos.y < (window.innerHeight / 2) + 80;

}

function anglesToDirVec(yaw, pitch) {
    let dX = -Math.sin(yaw) * Math.cos(pitch)
    let dY = Math.sin(pitch)
    let dZ = -Math.cos(yaw) * Math.cos(pitch)

    return {x: dX, y: dY, z: dZ};
}
