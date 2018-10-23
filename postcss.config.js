module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'autoprefixer': { browsers: ['last 2 versions', 'iOS >= 8'] },
        'cssnano': {}
    }
}