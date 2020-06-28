function async(callbackBuilder, map, method) {
    return new Promise((resolve, reject) => {
        let id;
        const callback = callbackBuilder((err, ptr) => {
            clearInterval(id);
            if (err != null) {
                return reject(err);
            }
            return resolve(map(ptr));
        });
        id = setInterval(() => callback, 1000);
        method(callback);
    });
}

module.exports = {
    async
};

