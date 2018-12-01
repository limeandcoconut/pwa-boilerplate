const http = require('http')
const path = require('path')
const fs = require('fs')

const app = http.createServer()
const {frontendPort} = require('../config.js')

let clientManifest = JSON.parse(fs.readFileSync('./dist/vue-ssr-client-manifest.json', 'utf8'))
let serverBundle = JSON.parse(fs.readFileSync('./dist/vue-ssr-server-bundle.json', 'utf8'))
let template = fs.readFileSync(path.resolve('./dist/index.html'), 'utf8')
let render = require('./ssr_renderer.js')(clientManifest, serverBundle, template)

const serveFile = require('./static.js')
app.on('request', (req, res) => {
    if (req.url.substr(0, 5) === '/dist') {
        let basePath = path.resolve(__dirname, '../')
        serveFile(req, res, basePath)
    } else if (req.url.substr(0, 6) === '/fonts') {
        let basePath = path.resolve(__dirname, '../public/')
        serveFile(req, res, basePath)
    } else if (req.url.substr(0, 6) === '/icons') {
        let basePath = path.resolve(__dirname, '../public/')
        serveFile(req, res, basePath)
    } else {
        const context = {
            url: req.url,
            fullUrl: 'https://' + req.headers.host + req.url,
        }
        render(req, res, context)
    }
})

app.listen(frontendPort, (err) => {
    if (err) {
        throw err
    }
    console.log(`Running in ${process.env.NODE_ENV} mode`)
    console.log(`Listening on port ${frontendPort}`)
})
