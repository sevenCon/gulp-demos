/**
 * Created by WangMing on 15/12/9.
 */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取组件中的样式
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插入代码

//webpck插件
var plugins = [
  //提公用js到common.js文件中
  new HtmlWebpackPlugin({
	template: "tpl.html",
	filename: "index.html",
	publicPath: '',
	hash: true
  }),
  //样式发布到style.css中
  new ExtractTextPlugin("style.css", {
	allChunks: true,
	disable: false
  });
];

var entry = ['main'],
	buildPath = "/assets/";
	
//编译输出路径
module.exports = {
  debug: true,
  entry: entry,
  output: {
	path: __dirname + buildPath,
	filename: 'build.js',
	publicPath: '',
	chunkFilename: "[name].chunk.js" //给require.ensure用
  },
  module: {
	loaders: [{
	  test: /\.css$/,
	  loader: ExtractTextPlugin.extract(
		"style-loader", "css-loader?sourceMap!cssnext-loader")
	}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&root=src/assets/css!less-loader?sourceMap')
	},
	preLoaders: [{
	  test: /\.js$/,
	  loader: "require-css-preloader"
	}]
  },
  externals:{
  },
  resolve: {
	root: path.resolve('.'),
	extension: ['', '.js', '.css','.less',".coffee","json"],
	alias: {}
  },
  plugins: plugins,
  devtool: '#source-map'
};