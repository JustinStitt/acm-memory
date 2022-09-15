export function generateLevel(depth) {
    let level = []
    for(let i = 0; i < depth; i++) {
        level.push(Math.floor(Math.random() * 4));
    }
    return level;
}