const store = require("./index");

store.expiresIn = 5000;

store.set("dd", "TOKEN!!!");



console.log(store.get("dd"));
console.log(store.has("dd"));


setTimeout( () => {
    console.log(store.get("dd"));
    console.log(store.has("dd"));

    console.log(store);
}, 6000);
