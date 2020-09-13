module.exports = {
    store: {},
    expiresIn: 1000 * 60 * 10,

    /**
     * Getting the object value if its still valid
     * @param {any} key 
     */
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

    /**
     * Checks if key is stored, removes it if its invalid
     * @param {any} key 
     */
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

    /**
     * Stores a value under its key with the set default time
     * @param {any} key 
     * @param {any} value 
     */
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