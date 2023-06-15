function getHash(string) {
    const a = 1000,
        m = 123987123;
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = ((hash + string.charCodeAt(i)) * (i === string.length - 1 ? 1 : a)) % m;
    }
    return hash;
}

function generateString(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const map = new Map();

while (true) {
    const str = generateString(10);
    const hash = getHash(str);
    if (map.get(hash) && map.get(hash) !== str) {
        console.log(map.get(hash), str);
        break;
    } else {
        map.set(hash, str);
    }
}
