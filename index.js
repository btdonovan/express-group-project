const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const tracks = JSON.parse(fs.readFileSync('songs.json'))
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.listen(port, () => console.log(`server started at http://localhost:${port}`))

app.get('/:type', (req, res) => {
  if (req.params.type === 'all') {
    res.send(tracks)
  } else {
    res.send(tracks.filter(song => ((song.kind === req.params.type))))
  }
})

app.get('/:type/byid/:trackId', (req, res) => {
  res.send(tracks.filter(song => ((song.trackId === Number(req.params.trackId)) && (song.kind === req.params.type))))
})

app.get('/:type/byname/:trackName', (req, res) => {
  res.send(tracks.filter(song => ((song.trackName.toLowerCase() === req.params.trackName.toLowerCase()) && (song.kind === req.params.type))))
})

app.get('/:type/byalbumid/:collectionId', (req, res) => {
  res.send(tracks.filter(song => ((song.collectionId === Number(req.params.collectionId)) && (song.kind === req.params.type))))
})

app.get('/:type/byalbumname/:collectionName', (req, res) => {
  let result = tracks.filter(song => {
    let collectionName
    if (!!song.collectionName) {
      collectionName = song.collectionName.toLowerCase()
      return ((collectionName === req.params.collectionName.toLowerCase()) && (song.kind === req.params.type))
    } else {
      return false
    }
  })
  res.send(result)
})

app.patch('/updatetrack/:trackId', (req, res) => {
  let trackIndex
  let track = tracks.filter((track, index) => {
    if (track.trackId === Number(req.params.trackId)) {
      trackIndex = index
      return true
    } else {
      return false
    }
  })
  let newInfo = {...track[0], ...req.body}
  tracks[trackIndex] = newInfo
})

app.put ('/addtrack', (req, res) => {
  let newTrack = req.body
  let oldTracks = tracks.filter(track => track.trackId === req.body.trackId)
  if (oldTracks.length === 0) {
    tracks.push(newTrack)
    res.send('track added')
  } else {
    res.send('no track added')
  }
})

app.delete('/deletetrack/:trackId', (req, res) => {
  let trackIndex
  let found = false
  let track = tracks.filter((track, index) => {
    if (track.trackId === Number(req.params.trackId)) {
      trackIndex = index
      found = true
      return true
    } else {
      return false
    }
  })
  if (found) {
    tracks.splice(trackIndex, 1)
    res.send('track deleted')
  } else {
    res.send('no tracks deleted')
  }
})

app.get('/:type/byartistid/:artistId', (req, res) => {
  res.send(tracks.filter(track => ((track.artistId === Number(req.params.artistId)) && (track.kind === req.params.type))))
})

app.get('/:type/byartistname/:artistName', (req, res) => {
    res.send(tracks.filter(track => ((track.artistName.toLowerCase().includes(req.params.artistName.toLowerCase())) && (track.kind === req.params.type))))
  })