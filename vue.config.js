
module.exports = {
    devServer: {
        proxy: {
            '/api-core': {
                target: 'https://swapit-api-core.herokuapp.com/',
                pathRewrite: { '^/api-core': '/' }
            },
            "/api-game": {
                target: 'https://swapit-api-game.herokuapp.com/',
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}