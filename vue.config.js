
module.exports = {
    devServer: {
        proxy: {
            '/api-core': {
                target: 'http://localhost:81/',
                pathRewrite: { '^/api-core': '/' }
            },
            "/api-game": {
                target: 'https://localhost/api',
                pathRewrite: { '^/api-game': '/' }
            }
        }
    }
}