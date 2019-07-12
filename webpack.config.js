const path = require('path')
    //导入在内存生成html插件
    // 只要是插件，都一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
    // 这个插件2个作用
    // 1.自动在内存中根据指定页面生成一个内存页面
    // 2.自动把打包好的bundle.js追加到页面中去

// 这个配置文件，起始就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口，表示，要使用webpack打爆哪个文件
    output: {
        path: path.join(__dirname, './dist'), //指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' //指定输出文件的名称
    },
    plugins: [
        new htmlWebpackPlugin({ //创建一个在内存中生成html页面的插件
            template: path.join(__dirname, './src/index.html'), //指定模板页面，将来会根据指定的路径，去生成内存中的页面
            filename: 'index.html' //指定生成页面的名称
        })
    ],
    module: { //这个节点用于配置所有的第三方模块加载器
        rules: [ //所有第三方的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理，css文件的第三方loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, //处理字体文件的loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=228205&name=[hash:8]-[name].[ext]' }, //处理图片路径的loader
            //limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，则不会被转为base64格式的字符串
            // 如果图片小于给定的limit值，则会被转为base64的字符串
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //这是配置babel来转换高级的es语法
            { test: /\.vue$/, use: 'vue-loader' }, //这是处理.vue文件的
        ]
    },
    resolve: {
        alias: { //这是修改设置vue被导入时候的包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}

//当在控制台，直接输入 webpack 命令执行的时候，webpack做了以下几步
// 1.搜想，webpack发现，我们并没有通过命令的形式，给它指定的入口和出口
// 2.webpack就会去项目的根目录中，查找一个叫做‘webpack.config.js’的配置文件
// 3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完后，就得到了。配置文件中导出配置对象
// 4.当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建