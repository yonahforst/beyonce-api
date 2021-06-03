const express = require('express')

const app = express()

app.use(express.json())

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

app.get('/albums', function (req, res) {
  res.send(albumsData);
})

app.get('/albums/:albumId', function (req, res) {
  //get id from request path params
  const albumId = req.params.albumId
  //get album with that id
  const album = albumsData.find(album => album.albumId == albumId)
  //return album
  if (album) {
    res.send(album)
  } else {
    res.status(404).send()
  }
})

app.post('/albums', function (req, res) {
  //get new album object from request
  const album = req.body
  
  //generate and set a new ID for this album
  album.albumId = getNextAlbumId() //generating a new ID might be complex. let's do it in a separate function...

  //add album object to array
  albumsData.push(album)

  //return { success: true }
  res.send({ success: true, id: album.albumId })
})

app.delete('/albums/:albumId', function(req, res) {
    //get id from request path params
    const albumId = req.params.albumId

    //find the INDEX of the album with that id
    const index = albumsData.findIndex(album => album.albumId == albumId)
    
    // findIndex returns -1 if the album is not found
    if (index == -1) {
      res.status(404).send()
      return
    }

    // remove the element at this index from the array
    // (in this case we don't need to replace it with undefined because IDs are not determined by the albums position in the array)
    albumsData.splice(index, 1)

    //return { success: true }
    res.send({ success: true })
})


app.listen(5000, () => console.log('the server has started'))

// returns the next ID in the sequence
function getNextAlbumId() {
  // find the current highest ID (new albums are always added to the end, so we can assume the last one is the highest)
  const highestId = albumsData[albumsData.length-1].albumId
  // add 1 to it (we need to convert it to a number first. For some fun, see what happens if you don't!)
  const nextId = parseInt(highestId) + 1
  // return it as a string
  return nextId.toString()
}