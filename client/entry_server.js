import createApp from './create_app.js'

export default (context) => {
    const {app, router, store} = createApp()

    return new Promise((resolve, reject) => {
        router.push(context.url)

        router.onReady(() => {
            // If the component being loaded is named fourohfour and we aren't loading the 404 page, throw an error
            // This lets the SSR renderer to know it should send a status code of 404
            const matchedComponents = router.getMatchedComponents()
            matchedComponents.forEach(({name}) => {
                if (name === 'fourohfour' && context.url !== '/404') {
                    return reject({code: 404})
                }
            })

            Promise.all(matchedComponents.map(({asyncData}) => asyncData && asyncData({
                store,
                route: router.currentRoute,
            })))
            .then(() => {
                context.state = store.state
                resolve(app)
            })
            .catch(reject)
        }, reject)
    })
}
