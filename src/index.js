module.exports = {
    store: {},
    expiresIn: 1000 * 60 * 10,

    get(key) {
        const obj = this.store[key];
        if (obj == null) {
            return null;
        }

        if (isStillValid(obj.expiresAt)) {
            return obj.value;
        } else {
            return null;
        }
    },


    has(key) {
        const obj = this.store[key];

        if (obj == null) {
            return false;
        }

        if (isStillValid(obj.expiresAt)) {
            return true;
        } else {
            delete this.store[key];
            return false;
        }
    },

    set(key, value) {
        this.store[key] = {
            value,
            expiresAt: (Date.now()) + this.expiresIn
        };
    }
}

function isStillValid(expiresAt) {
    return Date.now() < expiresAt;
}