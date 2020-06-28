const ref = require('ref-napi');
const StructType = require('ref-struct-di')(ref);
const ArrayType = require('ref-array-di')(ref);
const ffi = require('ffi-napi');

const handle = ref.types.void;
const handlePtr = ref.refType(handle);

const Artist = StructType({
    cursor: 'string',
    name: 'string'
});
const artistPtr = ref.refType(Artist);

const Album = StructType({
    cursor: 'string',
    title: 'string',
    artist: artistPtr,
    coverart: 'string',
    in_library: ref.types.bool
});
const albumPtr = ref.refType(Album);

const native = ffi.Library('lib/librustic_ffi_client', {
    connect_http_client: [handlePtr, ['string']],
    client_get_album_blocking: [albumPtr, [handlePtr, 'string']],
    client_get_album_cb: ['void', [handlePtr, 'string', 'pointer']]
});

const getAlbumCallback = cb => ffi.Callback('void', ['string', albumPtr], (err, album) => {
    if (err != null) {
        return cb(err);
    }
    return cb(null, album);
});

module.exports = {
    native,
    getAlbumCallback
};

