
module.exports = {
    devServer: {
        proxy: {
            '/api-core': {
                target: 'http://swapit-api-core.herokuapp.com/',
                pathRewrite: { '^/api-core': '/' }
            },
            "/api-game": {
                target: 'http://swapit-api-game.herokuapp.com/',
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}