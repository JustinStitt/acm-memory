export function generateLevel(depth) {
    let level = []
    for(let i = 0; i < depth; i++) {
        level.push(Math.floor(Math.random() * 4));
    }
    return level;
}

export function hint(tile) {
    tile.style.filter = "drop-shadow(1px 0px 30px #a69e46)";
}