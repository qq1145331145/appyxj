// const url = "https://api.bzqll.com/music/netease/search?key=579621905&s=%E9%82%93%E7%B4%AB%E6%A3%8B&type=singer&limit=100&offset=0"

module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "https://api.bzqll.com",
                    pathRewrite: {
                        "^/api": ""
                    },
                    changeOrigin: true
                },
                "/API": {
                    target: "http://localhost:3000",
                    pathRewrite: {
                        "^/API": ""
                    },
                    changeOrigin: true
                }

            }
        }
    }
}