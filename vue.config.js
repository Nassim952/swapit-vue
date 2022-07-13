module.exports = {
    devServer: {
        proxy: {
            '/api-core': {
                target: 'http://swapit-api-core.herokuapp.com/',
                ws: true,
                pathRewrite: { '^/api-core': '/' }
            },
            '/api-game': {
                target: 'https://swapit-api-game.herokuapp.com/',
                ws: true,
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}