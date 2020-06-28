const {async} = require("./util");
const {native, getAlbumCallback} = require('./ffi');

class Client {
    getAlbumSync(cursor) {
        const ptr = native.client_get_album_blocking(this.client, cursor);

        return toAlbum(ptr);
    }

    getAlbum(cursor) {
        return async(getAlbumCallback, toAlbum, callback => native.client_get_album_cb(this.client, cursor, callback));
    }
}

class HttpClient extends Client {
    constructor(url) {
        super();
        this.client = native.connect_http_client(url);
    }
}

function toAlbum(albumPtr) {
    const album = albumPtr.deref();
    return {
        ...album.toObject(),
        artist: album.artist.deref().toObject(),
    }
}

module.exports = {
    HttpClient
}
