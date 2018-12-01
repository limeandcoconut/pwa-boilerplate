const url = require('url')
const path = require('path')
const fs = require('fs')
const accepts = require('accepts')

const mimeType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
}

/**
 * @function serveFile
 * @param  {type} request  {description}
 * @param  {type} response {description}
 * @param  {type} basePath {description}
 */
function serveFile(request, response, basePath) {
    const parsedUrl = url.parse(request.url)
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
    let pathname = path.join(basePath, sanitizePath)

    fs.stat(pathname, (err, stats) => {
        if (err) {
            response.statusCode = 404
            response.end(`File not found ${pathname}`)
            return
        }

        if (stats.isFile()) {
            if (accepts(request).encoding(['br'])) {
                try {
                    if (fs.statSync(pathname + '.br')) {
                        pathname += '.br'
                        response.setHeader('Content-Encoding', 'br')
                    }
                } catch (e) {

                }
            }

            fs.readFile(pathname, (err, data) => {
                if (err) {
                    response.statusCode = 500
                    response.end(`Error serving file ${err}`)
                } else {
                    const ext = path.parse(pathname).ext
                    // Send the corresponding mime type if known, otherwise 'text/data'
                    response.setHeader('Content-Type', mimeType[ext] || 'text/data')
                    response.end(data)
                }
            })
        } else {
            response.statusCode = 500
            response.end(`Error serving file ${err}`)
        }
    })
}

module.exports = serveFile
