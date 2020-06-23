const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const songs = JSON.parse(fs.readFileSync('songs.json'))
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.listen(port, () => console.log(`server started at http://localhost:${port}`))


app.get('/', (req, res) => {
  res.send(songs)
})

app.get('/songbyid/:trackId', (req, res) => {
    res.send(songs.filter(song => ((song.trackId === Number(req.params.trackId)) && (song.kind === 'song'))))
})

app.get('/songbyname/:trackName', (req, res) => {
  res.send(songs.filter(song => ((song.trackName.toLowerCase() === req.params.trackName.toLowerCase()) && (song.kind === 'song'))))
})

app.get('/songsbyalbumid/:collectionId', (req, res) => {
  res.send(songs.filter(song => ((song.collectionId === Number(req.params.collectionId)) && (song.kind === 'song'))))
})

app.get('/songsbyalbumname/:collectionName', (req, res) => {
  // console.log(decodeURIComponent(req.params))
  // console.log(req.params.collectionName.toLowerCase())
  let result = songs.filter(song => {
    let collectionName
    if (!!song.collectionName) {
      collectionName = song.collectionName.toLowerCase()
      return ((collectionName === req.params.collectionName.toLowerCase()) && (song.kind === 'song'))
    } else {
      return false
    }
  })
  res.send(result)
})

app.patch('/songbyid/:trackId', (req, res) => {
  let trackIndex
  let track = songs.filter((song, index) => {
    if (song.trackId === Number(req.params.trackId)) {
      trackIndex = index
      return true
    } else {
      return false
    }
  })
  let newInfo = {...track[0], ...req.body}
  songs[trackIndex] = newInfo
})

app.get('/artistbyid/:artistId', (req, res) => {
  let artistSongs = []
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].artistId === Number(req.params.artistId)) {
      artistSongs.push(songs[i])
    }
  }
  res.send(artistSongs)
})