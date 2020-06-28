const { HttpClient } = require('../src');

const client = new HttpClient('http://localhost:8080');
console.log(client.getAlbumSync('Z211c2ljOmFsYnVtOkJqYXF3ZWlraHRianJuNnVoczMzcHJ3aGdidQ=='));

async function main() {
    const album = await client.getAlbum('ZmlsZTovLy9ob21lL21heC9NdXNpYy9taXh0YXBlL0ZvcnQgTWlub3IgLSBXZSBNYWpvciAoRGF0UGlmZi5jb20pLzAyIC0gMTAwIGRlZ3JlZXMubXAz');
    console.log(album);
}

main()
    .catch(err => console.error(err));
