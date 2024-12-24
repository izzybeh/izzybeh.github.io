const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config);

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }));
  }
});