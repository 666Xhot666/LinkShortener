const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.json({ extended: true}))


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routs'))

if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 9080
mongoose.connect(config.get('mongoURI'),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  const server = app.listen(PORT, () => {
    console.log(`[CORE] Server has been started at port ${PORT}`)
  })
  process.send('ready')

  process.on('SIGINT', () => {
    console.info('[CORE] SIGINT signal received')


    server.close(err => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })


  })

})
.catch( err => {
  console.log(`[CORE][DATABASE] ${err}`)
})
