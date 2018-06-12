- [ ] Figure out a table_mobile mixin
- [ ] Add some fancy image optimization
- [ ] Make notifications of server and client build both run, or find out why they aren't.
- [ ] Investigate compression other resources such as images in webpack
- [ ] Add isProduction helper and general server helpers folder
- [ ] 404 routes don't seem to actually be returning a 404 error code
- [ ] Auto generate sitemap
 
Css extraction currently isn't available. Follow these threads for updates:
https://github.com/webpack-contrib/mini-css-extract-plugin/issues/90
https://github.com/webpack-contrib/mini-css-extract-plugin/issues/173

If we really want http2, implement fastify or restify.
This will probably require some changes to ssr and hmr