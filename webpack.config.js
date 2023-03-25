const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist/compiled');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  devtool: 'eval-source-map',
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is
   * for browser (client side). Default is "web"
   */
  target: 'web',
  devServer: {
    /** "port"
     * port of dev server
    */
    port: '3001',
    /** "static"
     * This property tells Webpack what static file it should serve
    */
    static: ['./client'],
    /** "open"
     * opens the browser after server is successfully started
    */
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/, // kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, // folder to be excluded
        use: 'babel-loader', // loader which we are going to use
      },
    ],
  },
};
