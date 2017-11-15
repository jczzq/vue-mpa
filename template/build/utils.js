var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var App = require('./app.json');
var merge = require('webpack-merge');

exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders('postcss', {
            plugins() {
                return [require('postcss-px2rem')({ remUnit: 37.5 })]
            }
        }),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}


var merge = function (a, b) {
    return {
        css: (a.css || []).concat(b.css || []),
        js: (a.js || []).concat(b.js || [])
    };
};

exports.entries = function () {
    var result = {};
    App.pages.forEach(p => {
        result[p.entry] = path.resolve(App.basePath, p.path);
    });
    return result;
};

exports.templates = function () {
    return App.pages.map(p => {
        return {
            title: p.title,
            filename: p.entry + '.html',
            template: path.join(__dirname, '..', 'index.ejs'),
            cdn: merge(App.cdn, p.cdn),
            chunks: ['vendor', 'manifest', p.entry]
        };
    });
};

exports.externals = function () {
    return App.externals;
};
