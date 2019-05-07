const uglifyJS = require('uglify-es');
const cleanCSS = require('clean-css');
const minifier = require('html-minifier').minify;

const compress = {
    js: function (code) {
        let result = uglifyJS.minify(code);
        if (result.error) {
            return code;
        }
        return result.code;
    },
    npm: function (code) {
        return this.js.call(this, code);
    },
    css: function (code) {
        let result = new cleanCSS().minify(code);
        if (result.errors.length) {
            return code;
        }
        return result.styles;
    },
    ux: function (code) {
        return this.html.call(this, code);
    },
    html: function (code) {
        code = minifier(code, {
            keepClosingSlash: true,
            html5: false,
            caseSensitive: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: function(code) {
                return compress.js(code);
            },
            removeScriptTypeAttributes: true
        });
        return code;
    },
    json: function (code) {
        return JSON.stringify(JSON.parse(code));
    }
}

module.exports = {
    compress
}