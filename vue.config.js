
module.exports = {
    devServer: {
        proxy: {
            '/api-core': {
                target: 'https://swapit-api-core.herokuapp.com/',
                ws: true,
                pathRewrite: { '^/api-core': '/' }
            },
            "/api-game": {
                target: 'https://swapit-api-game.herokuapp.com/',
                ws: true,
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}