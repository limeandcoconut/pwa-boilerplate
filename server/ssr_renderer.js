const {createBundleRenderer} = require('vue-server-renderer')
const compressStream = require('iltorb').compressStream
const accepts = require('accepts')

const createRenderer = (serverBundle, clientManifest, template) => {
    return createBundleRenderer(serverBundle, {
        template,
        clientManifest,
        inject: false,
        runInNewContext: false,
        // cache: require('lru-cache')({
        //     max: 1000,
        //     maxAge: 1000 * 60 * 15,
        // }),
    })
}

const ssrRenderer = function(clientManifest, serverBundle, template) {
    let renderer = createRenderer(serverBundle, clientManifest, template)

    const render = (req, res, context) => {
        let doCompress = accepts(req).encoding(['br'])
        res.header('Content-Type', 'text/html')

        // TODO I don't know if :authority always comes through. Add some error handling.
        // TODO fullUrl is gotten before this function is called. Why is this needed?
        const fullUrl = 'https://' + req.headers[':authority'] + req.headers[':path']

        let stream = renderer.renderToStream(context)
        stream.on('error', (err) => {
            if (err.code === 404) {
                res.statusCode = 404
                render(req, res, {url: '/404', fullUrl})
            } else {
                console.error(err)
                res.send('Unknown error rendering content')
            }
        })

        if (doCompress) {
            res.header('Content-Encoding', 'br')
            res.send(stream.pipe(compressStream()))
        } else {
            res.send(stream)
        }
    }

    return render
}

module.exports = ssrRenderer
