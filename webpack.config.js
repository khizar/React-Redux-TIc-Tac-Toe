/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const babelConfig = Object.assign({}, pkg.babel, {
    babelrc: false,
    cacheDirectory: useHMR
});

// Webpack configuration (main.js => public/dist/main.{hash}.js)
const config = {
    // The base directory for resolving the entry option
    context: __dirname,

    // The entry point for the bundle
    entry: [
        './main.jsx'
    ],

    // Options affecting the output of the compilation
    output: {
        path: path.resolve(__dirname, './public/dist'),
        publicPath: '/dist/',
        filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
        chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
        sourcePrefix: '  '
    },

    // Switch loaders to debug or release mode
    debug: isDebug,

    // Developer tool to enhance debugging, source maps
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: isDebug ? 'source-map' : false,

    // What information should be printed to the console
    stats: {
        colors: true,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose
    },

    // Load ESLint configuration
    eslint: {
        configFile: path.join(__dirname, './.eslintrc')
    },

    // The list of plugins for Webpack compiler
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            __DEV__: isDebug
        }),
        // Emit a JSON file with assets paths
        // https://github.com/sporto/assets-webpack-plugin#options
        new AssetsPlugin({
            path: path.resolve(__dirname, './public/dist'),
            filename: 'assets.json',
            prettyPrint: true
        }),
        new ExtractTextPlugin('[name].css'),
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            files: '**/[^_]*.scss',
            syntax: 'scss',
            failOnError: false
        })
    ],


    // Babel conf Transpile ES6 and JSX
    module: {
        preLoaders: [
            // Lint JavaScript & JSX
            { test: /\.jsx$/, loader: 'eslint-loader', exclude: /node_modules/ },
            { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ }
        ],
        loaders: [
            // JavaScript
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './main.js')
                ],
                loader: `babel-loader?${JSON.stringify(babelConfig)}`
            },
            // Stylesheets
            { test: /\.s(a|c)ss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap') },
            // HTML
            { test: /\.html/, loader: 'file?name=[name].[ext]' },
            // Font Definitions
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            // Images
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader?limit=10000'
            },
            // Audio
            {
                test: /\.(wav|mp3)$/,
                loader: 'file-loader'
            }
        ],
        noParse: [
            /node_modules(\\|\/)video\.js/
        ]
    },
    resolve: {
        modulesDirectories: [
            'node_modules', 'src', 'test'
        ],
        extensions: ['', '.js', '.jsx', '.min.js']
    },
    sassLoader: {
        includePaths: ['./styles']
    },

    // The list of plugins for PostCSS
    // https://github.com/postcss/postcss
    postcss(bundler) {
        return {
            defaults: [
                // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
                // https://github.com/postcss/postcss-import
                require('postcss-import')({ addDependencyTo: bundler }),
                // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
                // https://github.com/postcss/postcss-custom-properties
                require('postcss-custom-properties')(),
                // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
                // https://github.com/postcss/postcss-custom-media
                require('postcss-custom-media')(),
                // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
                // https://github.com/postcss/postcss-media-minmax
                require('postcss-media-minmax')(),
                // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
                // https://github.com/postcss/postcss-custom-selectors
                require('postcss-custom-selectors')(),
                // W3C calc() function, e.g. div { height: calc(100px - 2em); }
                // https://github.com/postcss/postcss-calc
                require('postcss-calc')(),
                // Allows you to nest one style rule inside another
                // https://github.com/jonathantneal/postcss-nesting
                require('postcss-nesting')(),
                // W3C color() function, e.g. div { background: color(red alpha(90%)); }
                // https://github.com/postcss/postcss-color-function
                require('postcss-color-function')(),
                // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
                // https://github.com/iamvdo/pleeease-filters
                require('pleeease-filters')(),
                // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
                // https://github.com/robwierzbowski/node-pixrem
                require('pixrem')(),
                // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
                // https://github.com/postcss/postcss-selector-matches
                require('postcss-selector-matches')(),
                // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
                // https://github.com/postcss/postcss-selector-not
                require('postcss-selector-not')(),
                // Postcss flexbox bug fixer
                // https://github.com/luisrudge/postcss-flexbugs-fixes
                require('postcss-flexbugs-fixes')(),
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')()
            ],
            sass: [
                require('autoprefixer')()
            ]
        };
    }

};

// Optimize the bundle in release (production) mode
if (!isDebug) {
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: isVerbose } }));
    config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
    babelConfig.plugins.unshift('react-hot-loader/babel');
    config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
