const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const tracks = JSON.parse(fs.readFileSync('songs.json'))
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.listen(port, () => console.log(`server started at http://localhost:${port}`))


app.get('/songs', (req, res) => {
  res.send(tracks.filter(song => ((song.kind === 'song'))))
})

app.get('/songbyid/:trackId', (req, res) => {
    res.send(tracks.filter(song => ((song.trackId === Number(req.params.trackId)) && (song.kind === 'song'))))
})

app.get('/songbyname/:trackName', (req, res) => {
  res.send(tracks.filter(song => ((song.trackName.toLowerCase() === req.params.trackName.toLowerCase()) && (song.kind === 'song'))))
})

app.get('/songsbyalbumid/:collectionId', (req, res) => {
  res.send(tracks.filter(song => ((song.collectionId === Number(req.params.collectionId)) && (song.kind === 'song'))))
})

app.get('/songsbyalbumname/:collectionName', (req, res) => {
  let result = tracks.filter(song => {
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
  let track = tracks.filter((song, index) => {
    if (song.trackId === Number(req.params.trackId)) {
      trackIndex = index
      return true
    } else {
      return false
    }
  })
  let newInfo = {...track[0], ...req.body}
  tracks[trackIndex] = newInfo
})

app.put ('/newsong', (req, res) => {
  let newSong = req.body
  let oldSongs = tracks.filter(song => song.trackId === req.body.trackId)
  if (oldSongs.length === 0) {
    tracks.push(newSong)
    res.send('song added')
  } else {
    res.send('no song added')
  }
})

app.delete('/songbyid/:trackId', (req, res) => {
  let trackIndex
  let found = false
  let track = tracks.filter((song, index) => {
    if (song.trackId === Number(req.params.trackId)) {
      trackIndex = index
      found = true
      return true
    } else {
      return false
    }
  })
  if (found) {
    tracks.splice(trackIndex, 1)
    res.send('confirmed')
  } else {
    res.send('failed')
  }
})

app.get('/songsbyartistid/:artistId', (req, res) => {
  res.send(tracks.filter(song => ((song.artistId === Number(req.params.artistId)) && (song.kind === 'song'))))
})

app.get('/songsbyartistname/:artistName', (req, res) => {
    res.send(tracks.filter(song => ((song.artistName.toLowerCase().includes(req.params.artistName.toLowerCase())) && (song.kind === 'song'))))
  })


  //video 'music-video'
app.get('/videos', (req, res) => {
  res.send(tracks.filter(video => ((video.kind === 'music-video'))))
})

app.get('/videobyid/:trackId', (req, res) => {
    res.send(tracks.filter(video => ((video.trackId === Number(req.params.trackId)) && (video.kind === 'music-video'))))
})

app.get('/videobyname/:trackName', (req, res) => {
  res.send(tracks.filter(video => ((video.trackName.toLowerCase() === req.params.trackName.toLowerCase()) && (video.kind === 'music-video'))))
})

app.get('/videosbyalbumid/:collectionId', (req, res) => {
  res.send(tracks.filter(video => ((video.collectionId === Number(req.params.collectionId)) && (video.kind === 'music-video'))))
})

app.get('/videosbyalbumname/:collectionName', (req, res) => {
  let result = tracks.filter(video => {
    let collectionName
    if (!!video.collectionName) {
      collectionName = video.collectionName.toLowerCase()
      return ((collectionName === req.params.collectionName.toLowerCase()) && (video.kind === 'music-video'))
    } else {
      return false
    }
  })
  res.send(result)
})

app.patch('/videobyid/:trackId', (req, res) => {
  let trackIndex
  let track = tracks.filter((video, index) => {
    if (video.trackId === Number(req.params.trackId)) {
      trackIndex = index
      return true
    } else {
      return false
    }
  })
  let newInfo = {...track[0], ...req.body}
  tracks[trackIndex] = newInfo
})

app.put ('/newvideo', (req, res) => {
  let newvideo = req.body
  let oldvideos = tracks.filter(video => video.trackId === req.body.trackId)
  if (oldvideos.length === 0) {
    tracks.push(newvideo)
    res.send('video added')
  } else {
    res.send('no video added')
  }
})

app.delete('/videobyid/:trackId', (req, res) => {
  let trackIndex
  let found = false
  let track = tracks.filter((video, index) => {
    if (video.trackId === Number(req.params.trackId)) {
      trackIndex = index
      found = true
      return true
    } else {
      return false
    }
  })
  if (found) {
    tracks.splice(trackIndex, 1)
    res.send('confirmed')
  } else {
    res.send('failed')
  }
})

app.get('/videosbyartistid/:artistId', (req, res) => {
  res.send(tracks.filter(video => ((video.artistId === Number(req.params.artistId)) && (video.kind === 'music-video'))))
})

app.get('/videosbyartistname/:artistName', (req, res) => {
  res.send(tracks.filter(video => ((video.artistName.toLowerCase().includes(req.params.artistName.toLowerCase())) && (video.kind === 'music-video'))))
})