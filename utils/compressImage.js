const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

function compressPNG(content, option = {}) {
    return imageminOptipng(option)(content);
}
function compressSVG(content, option = {}) {
    return imageminSvgo(option)(content);
}
function compressJPG(content, option = {}) {
    return imageminMozjpeg(option)(content);
}
function compressGIF(content, option = {}) {
    return imageminGifsicle(option)(content);
}

module.exports = function(content, type, { png, jpg, gif, svg }) {
    switch(type) {
        case 'png':
            return compressPNG(content, png);
        case 'jpg':
        case 'jpeg':
            return compressJPG(content, jpg);
        case 'gif':
            return compressGIF(content, gif);
        case 'svg':
            return compressSVG(content, svg);
        default:
            return content;
    }
}