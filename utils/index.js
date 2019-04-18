const uglifyJS = require('uglify-es');
const cleanCSS = require('clean-css');

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
        return code;
    },
    wxml: function (code) {
        //TODO: comporess xml file;
        return code;
    },
    json: function (code) {
        return JSON.stringify(JSON.parse(code));
    }
}

module.exports = {
    compress
}