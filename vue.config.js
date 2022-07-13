module.exports = {
    devServer: {
        proxy: {
            '^/api-core': {
                target: 'http://swapit-api-core.herokuapp.com/',
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: { '^/api-core': '/' }
            },
            '^/api-game': {
                target: 'https://swapit-api-game.herokuapp.com/',
                changeOrigin: true,
                logLevel: "debug",
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}