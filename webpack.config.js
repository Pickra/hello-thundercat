const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const appTemplate = fs.readFileSync("./app/app-template.html", {encoding: "utf8"});
const appConfig = require("./app-config.json");
const startMockServer = require("./mock-backend/mocker-server");

const stylesLoaders = isDev => {
    return {
        fallback: { loader: "style-loader", options: { sourceMap: isDev }},
        use: [
            { loader: "css-loader", options: { sourceMap: isDev }}
        ]
    };
};

const cdnResources = isDev => {
    const env = isDev ? "development" : "production.min";
    
    return [
        `https://cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.${env}.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.${env}.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.3.1/react-router-dom.min.js`
    ];
};

const externals = {
    "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
    },
    "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
    },
    "react-router-dom": {
        root: "ReactRouterDOM",
        commonjs2: "react-router-dom",
        commonjs: "react-router-dom",
        amd: "react-router-dom"
    }
};

const plugins = (isDev, env) => [
    new HtmlPlugin({
        title: "Hello Thundercat",
        templateContent: appTemplate,
        cdnResources: cdnResources(isDev),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            removeTagWhitespace: true,
            preventAttributesEscaping: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            keepClosingSlash: true,
            caseSensitive: true
        }
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(appConfig[env]) }),
    !isDev ?  new webpack.optimize.UglifyJsPlugin() : false
].filter(Boolean);


module.exports = function(env) {
    const isDev = env === 'dev';

    if (isDev) { startMockServer(); }

    return {
        entry: {
            main: ["./app/entry.tsx"]
        },
        output: {
            path: path.join(__dirname, "public"),
            publicPath: "",
            filename: "app.[hash].js",
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"]
        },
        externals: externals,
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader" },
                { test: /\.html?$/, loader: "html-loader" },
                { test: /\.css$/, use: ExtractTextPlugin.extract(stylesLoaders(isDev)) },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: { limit: 10000 }
                    }]
                }
            ]
        },
        devtool: "source-map",
        devServer: {
            port: 8080,
            proxy: { "*": "http://localhost:3000" },
            contentBase: path.join(__dirname, "public"),
            noInfo: true,
            historyApiFallback: true
        },
        plugins: plugins(isDev, env)
    }
};