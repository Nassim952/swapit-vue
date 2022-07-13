
module.exports = {
    devServer: {
        proxy: {
            'https://swapit-vue.herokuapp.com/': {
                target: 'http://swapit-api-core.herokuapp.com/',
                ws: true,
                pathRewrite: { '^https://swapit-vue.herokuapp.com/': '/' }
            },
            'https://swapit-vue.herokuapp.com/api/': {
                target: 'https://swapit-api-game.herokuapp.com/',
                ws: true,
                pathRewrite: { '^https://swapit-vue.herokuapp.com/api/': '/' }
            }
        }
    }
}