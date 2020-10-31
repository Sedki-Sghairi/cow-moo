import express from 'express'
import cowsay from 'cowsay'
import cors from 'cors'
import path from 'path'

const app = express()
// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})
// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})
//serve static files from frontend app
app.use(express.static(path.join(__dirname,'client/build')))
//anything that doesnt match the above, send back index.html
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname + 'client/build/index.html'))
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})