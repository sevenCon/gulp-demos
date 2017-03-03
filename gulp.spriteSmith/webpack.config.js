/**
 * Created by WangMing on 15/12/9.
 */
var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//webpck插件
var plugins = [
    // //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
        template: "tpl.html",
        filename: "index.html",
        publicPath: '',
        hash: true
    }),
    // 样式发布到style.css中
    new ExtractTextPlugin({
    	filename:"style.css",
        disable: false,
        allChunks: true
    }),
	new webpack.LoaderOptionsPlugin({
		debug: true
	})
];

var entry = ['webpack/hot/dev-server','./main'],
    buildPath = "/assets";

//编译输出路径
module.exports = {
    entry: entry,
    output: {
        path: __dirname + buildPath ,
        filename: '[name].js',
        publicPath: '',
        chunkFilename: "[name].chunk.js" //给require.ensure用
    },
    module: {
		rules:[{
			test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
		},{
			test: /\.(jpg|png|gif)$/,
			loader: "file-loader?name=images/[name].[hash].[ext]"
	    }],
    },
    externals: {},
    resolve: {
    	enforceExtension:false
    },
    plugins: plugins,
    devtool: '#source-map'
};

