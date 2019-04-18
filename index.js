const { compress } = require('./utils');

module.exports = function({ queues = [], exportCode = '' }, map, meta) {
    queues.forEach(({ code, type, path: filePath }, index) => {
        type = type || filePath.match(/\.(\w+)$/)[1];
        queues[index].code = typeof compress[type] === 'function' && compress[type](code) || code;
    });
    
    this.callback(null, {
        queues,
        exportCode
    }, map, meta);
};