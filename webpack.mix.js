const glob = require('glob-all')
const mix = require('laravel-mix')
const PurgecssPlugin = require('purgecss-webpack-plugin')

require('laravel-mix-tailwind')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}

mix.setPublicPath('./public')
    .js('src/client/index.js', 'public/app.js')
    .sass('src/client/styles/main.scss', 'public/app.css')
    .tailwind()

if (mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, 'src/client/**/*.vue'),
                    path.join(__dirname, 'src/client/**/*.js')
                ]),
                extractors: [
                    {
                        extractor: TailwindExtractor,
                        extensions: ['vue', 'js']
                    }
                ]
            })
        ]
    }).version()
}
