<<<<<<< HEAD
var path = require('path')
var fs = require('fs')
var os = require('os')
var webpack = require('webpack')
=======
var path = require('path');
var fs = require('fs');
var os = require('os');
var webpack = require('webpack');
>>>>>>> 17b9a7a8ddf56b68fd9c64135101a2becae4e999

var recursiveReadSync = require('recursive-readdir-sync')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var UglifyJsParallelPlugin = require('webpack-uglify-parallel')

var mkdir = require('mkdir')
var marked = require('marked')
var ejs = require('ejs')
var highlight = require('highlight.js')
var Viz

var WebpackOnBuildPlugin = require('on-build-webpack')

var prod = process.argv.indexOf('--prod') !== -1
process.env.NODE_ENV = prod ? 'production' : 'development'

function cssLoaders(options) {
<<<<<<< HEAD
    options = options || {}
    // generate loader string to be used with extract text plugin
    function generateLoaders(loaders) {
        var sourceLoader = loaders
            .map(function(loader) {
                var extraParamChar
                if (/\?/.test(loader)) {
                    loader = loader.replace(/\?/, '-loader?')
                    extraParamChar = '&'
                } else {
                    loader = loader + '-loader'
                    extraParamChar = '?'
                }
                return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
            })
            .join('!')

        return ExtractTextPlugin.extract(sourceLoader)
    }

    return {
        css: generateLoaders(['css']),
        less: generateLoaders(['css', 'less']),
        sass: generateLoaders(['css', 'sass'])
    }
}

function styleLoaders(options) {
    var output = []
    var loaders = cssLoaders(options)

    for (var extension in loaders) {
        var loader = loaders[extension]
        if (extension === 'sass') extension = 'scss'
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }
    return output
}

marked.setOptions({
    highlight: function(code, lang) {
        var res

        if (lang)
            try {
                res = highlight.highlight(lang, code).value
            } catch (e) {}

        if (!res)
            try {
                res = highlight.highlightAuto(code).value
            } catch (e) {}

        if (!res) res = code

        var lines = res.split('\n').length
        var nums = []

        for (var i = 0; i < lines; i++) nums.push(i + 1)

        return '<div class="line-numbers">' + nums.join('\n') + '</div>' + res
    }
})

marked.Renderer.prototype.heading = function(text, level, raw) {
    return (
        '<h' +
        level +
        ' id="' +
        this.options.headerPrefix +
        raw.replace(/\s+/g, '-') +
        '">' +
        text +
        '</h' +
        level +
        '>\n'
    )
}

function build_docs() {
    var config = {
        from: 'docs',
        dist: 'web/dist',
        to: 'docs',
        groups: {
            "guide": {
                etitle: 'Guide',
                title: '开发指南',
                path: "guide"
            },
            "module": {
                etitle: 'Module',
                title: '基础模块',
                path: "manual/module"
            },
            "object": {
                etitle: 'Object',
                title: '内置对象',
                path: "manual/object"
            },
            awesome: {
                etitle: 'Awesome',
                title: '社区文档',
                path: 'awesome'
            }
        }
    }

    var render = {
        dot: (txt, lang, code) => {
            var svg = old_dot_cache[code]
            if (!svg) {
                if (Viz === undefined) Viz = require('viz.js')
                svg = Viz(code)
                has_new = true
            }
            dot_cache[code] = svg

            svg = svg.replace(/^<\?xml(.|\n)*?\?>(.|\n)*?<!DOCTYPE(.|\n)*?>/, '')
            return '<div class="dot">' + svg + '</div>'
        }
=======
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders
      .map(function(loader) {
        var extraParamChar;
        if (/\?/.test(loader)) {
          loader = loader.replace(/\?/, '-loader?');
          extraParamChar = '&';
        } else {
          loader = loader + '-loader';
          extraParamChar = '?';
        }
        return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
      })
      .join('!');

    return ExtractTextPlugin.extract(sourceLoader);
  }

  return {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass'])
  };
}

function styleLoaders(options) {
  var output = [];
  var loaders = cssLoaders(options);

  for (var extension in loaders) {
    var loader = loaders[extension];
    if (extension === 'sass') extension = 'scss';
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    });
  }
  return output;
}

marked.setOptions({
  highlight: function(code, lang) {
    var res;

    if (lang)
      try {
        res = highlight.highlight(lang, code).value;
      } catch (e) {}

    if (!res)
      try {
        res = highlight.highlightAuto(code).value;
      } catch (e) {}

    if (!res) res = code;

    var lines = res.split('\n').length;
    var nums = [];

    for (var i = 0; i < lines; i++) nums.push(i + 1);

    return '<div class="line-numbers">' + nums.join('\n') + '</div>' + res;
  }
});

marked.Renderer.prototype.heading = function(text, level, raw) {
  return (
    '<h' +
    level +
    ' id="' +
    this.options.headerPrefix +
    raw.replace(/\s+/g, '-') +
    '">' +
    text +
    '</h' +
    level +
    '>\n'
  );
};

function build_docs() {
  var config = {
    from: 'docs',
    dist: 'web/dist',
    to: 'docs',
    groups: {
      basic: {
        etitle: 'Basic',
        title: '基础入门',
        path: 'guide/basic'
      },
      development: {
        etitle: 'Development',
        title: '业务开发',
        path: 'guide/development'
      },
      advanced: {
        etitle: 'Advanced',
        title: '深入理解',
        path: 'guide/advanced'
      },
      community: {
        etitle: 'Community',
        title: '其他支持',
        path: 'guide/community'
      },
      // guide: {
      //   etitle: 'Guide',
      //   title: '开发指南',
      //   path: 'guide'
      // },
      module: {
        etitle: 'Module',
        title: '基础模块',
        path: 'manual/module'
      },
      object: {
        etitle: 'Object',
        title: '内置对象',
        path: 'manual/object'
      }
      // awesome: {
      //   etitle: 'Awesome',
      //   title: '社区文档',
      //   path: 'awesome'
      // },
>>>>>>> 17b9a7a8ddf56b68fd9c64135101a2becae4e999
    }
  };

  var render = {
    dot: (txt, lang, code) => {
      var svg = old_dot_cache[code];
      if (!svg) {
        if (Viz === undefined) Viz = require('viz.js');
        svg = Viz(code);
        has_new = true;
      }
      dot_cache[code] = svg;

      svg = svg.replace(/^<\?xml(.|\n)*?\?>(.|\n)*?<!DOCTYPE(.|\n)*?>/, '');
      return '<div class="dot">' + svg + '</div>';
    }
  };

<<<<<<< HEAD
    var groups = config.groups

    var old_dot_cache = {}
    var dot_cache = {}
    var has_new = false

    try {
        old_dot_cache = JSON.parse(fs.readFileSync(path.join(__dirname, 'web/dot_cache.json')).toString())
    } catch (e) {}

    var _tmpl = ejs.compile(fs.readFileSync(path.join(config.dist, 'docs.html')).toString())

    function read_doc(p) {
        var md = fs.readFileSync(p).toString()

        md = md.replace(/```\s*(\S+)((.|\n)*?)```/g, (txt, lang, code) => {
            return render[lang] ? render[lang](txt, lang, code) : txt
        })

        var html = marked(md)

        html = html.replace(/href=\"([^"]*\.md)(#\w+)?\"/g, (s, s1, s2) => {
            var so = s1
            if (so.indexOf('http') == 0) return s

            so = so.toLowerCase() + '.html'
            if (s2) so += s2
            so = '/' + path.join(path.dirname(p), so)
            so = 'href="' + so + '"'
            return so
        })

        return html
    }

    for (var g in groups) {
        groups[g].url = '/' + path.join(config.from, groups[g].path, 'readme.md.html')
        groups[g].toc = read_doc(path.join(config.from, groups[g].path, 'SUMMARY.md'))
    }

    function test_group(p) {
        for (var g in groups) if (p.indexOf(groups[g].path) != -1) return g

        return ''
    }

    recursiveReadSync(config.from).forEach(function(file) {
        var basename = path.basename(file)
        if (basename.charAt(0) !== '.') {
            var p = path.relative(config.from, file.toLowerCase())
            p = path.join(config.to, p)
            var file1 = path.join(config.dist, p)

            mkdir.mkdirsSync(path.dirname(file1))

            if (path.extname(file) == '.md') {
                file1 += '.html'

                var doc = read_doc(file)
                var r = /<h[1-9]?.*>(.*)<\/h[1-9]?>/.exec(doc)
                var title = r ? r[1] : ''

                var html = _tmpl({
                    title: title || 'blank',
                    group: test_group(p),
                    groups: groups,
                    doc: doc
                })

                var re = new RegExp('href="/' + config.from + '/([^"> ]*)"', 'g')

                html = html.replace(re, (s, u) => {
                    u = path.join('/', config.to, u)
                    return 'href="' + u + '"'
                })

                fs.writeFileSync(file1, html)
            } else fs.writeFileSync(file1, fs.readFileSync(file))
        }
    })
=======
  var groups = config.groups;

  var old_dot_cache = {};
  var dot_cache = {};
  var has_new = false;

  try {
    old_dot_cache = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'web/dot_cache.json')).toString()
    );
  } catch (e) {}

  var _tmpl = ejs.compile(
    fs.readFileSync(path.join(config.dist, 'docs.html')).toString()
  );

  function read_doc(p) {
    var md = fs.readFileSync(p).toString();

    md = md.replace(/```\s*(\S+)((.|\n)*?)```/g, (txt, lang, code) => {
      return render[lang] ? render[lang](txt, lang, code) : txt;
    });

    var html = marked(md);

    html = html.replace(/href=\"([^"]*\.md)(#\w+)?\"/g, (s, s1, s2) => {
      var so = s1;
      if (so.indexOf('http') == 0) return s;

      so = so.toLowerCase() + '.html';
      if (s2) so += s2;
      so = '/' + path.join(path.dirname(p), so);
      so = 'href="' + so + '"';
      return so;
    });

    return html;
  }

  for (var g in groups) {
    groups[g].url =
      '/' + path.join(config.from, groups[g].path, 'readme.md.html');
    groups[g].toc = read_doc(
      path.join(config.from, groups[g].path, 'SUMMARY.md')
    );
  }

  function test_group(p) {
    for (var g in groups) if (p.indexOf(groups[g].path) != -1) return g;

    return '';
  }

  recursiveReadSync(config.from).forEach(function(file) {
    var basename = path.basename(file);
    if (basename.charAt(0) !== '.') {
      var p = path.relative(config.from, file.toLowerCase());
      p = path.join(config.to, p);
      var file1 = path.join(config.dist, p);

      mkdir.mkdirsSync(path.dirname(file1));

      if (path.extname(file) == '.md') {
        file1 += '.html';

        var doc = read_doc(file);
        var r = /<h[1-9]?.*>(.*)<\/h[1-9]?>/.exec(doc);
        var title = r ? r[1] : '';
        var html = _tmpl({
          title: title,
          group: test_group(p),
          groups: groups,
          doc: doc
        });

        var re = new RegExp('href="/' + config.from + '/([^"> ]*)"', 'g');

        html = html.replace(re, (s, u) => {
          u = path.join('/', config.to, u);
          return 'href="' + u + '"';
        });

        fs.writeFileSync(file1, html);
      } else fs.writeFileSync(file1, fs.readFileSync(file));
    }
  });
>>>>>>> 17b9a7a8ddf56b68fd9c64135101a2becae4e999

  if (has_new)
    fs.writeFileSync(
      path.join(__dirname, 'web/dot_cache.json'),
      JSON.stringify(dot_cache)
    );
}

function relative() {
<<<<<<< HEAD
    var baseFolder = 'web/dist'
    var re = new RegExp('(href|src)="?(/[^"> ]*)"?', 'g')

    recursiveReadSync(baseFolder).forEach(function(file) {
        if (path.extname(file) == '.html') {
            var file1 = '/' + path.relative(baseFolder, file)
            var p = path.dirname(file1)
            var html = fs.readFileSync(file).toString()

            html = html.replace(/<li><a href=\"([^"]*\.md.html)\"/g, (s, s1) => {
                if (file1 === s1) return '<li class="active"><a href="' + s1 + '"'
                return s
            })

            html = html.replace(re, (s, t, u) => {
                u = path.relative(p, u)
                return t + '=' + u
            })

            fs.writeFileSync(file, html)
        }
    })
}

var webpack_config = {
    entry: {},
    output: {
        path: 'web/dist',
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js'
    },
    resolve: {
        root: [path.resolve('./web/src/')]
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg)$/,
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'imgs/[name].[ext]'
                },
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(html|htm|shtml)$/,
                loader: 'includes'
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            styleLoaders({
                extract: true
            })
        ]
    },
    includes: {
        extensions: ['', '.html', '.shtml', '.htm'],
        pattern: {
            re: /<!--\s*?include\s+?("|')(.+?)\1\s*?\-->/,
            index: 2
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('css/[name].css'),
        new CopyWebpackPlugin([
            {
                from: path.resolve('./web/src/imgs'),
                to: path.resolve('./web/dist/imgs')
            }
        ]),
        new WebpackOnBuildPlugin(() => {
            build_docs()
            relative()
        })
    ]
}

if (prod) {
    webpack_config.plugins.push(
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            comments: false,
            compressor: {
                warnings: false,
            },
            output: {
                comments: false,
                keep_quoted_props: true // fix ie8 property name error
            },
            mangle: {
                keep_fnames: true // fix ie8 function name error
            }
        })
    )
} else webpack_config.devtool = 'source-map'
=======
  var baseFolder = 'web/dist';
  var re = new RegExp('(href|src)="?(/[^"> ]*)"?', 'g');

  recursiveReadSync(baseFolder).forEach(function(file) {
    if (path.extname(file) == '.html') {
      var file1 = '/' + path.relative(baseFolder, file);
      var p = path.dirname(file1);
      var html = fs.readFileSync(file).toString();

      html = html.replace(/<li><a href=\"([^"]*\.md.html)\"/g, (s, s1) => {
        if (file1 === s1) return '<li class="active"><a href="' + s1 + '"';
        return s;
      });

      html = html.replace(re, (s, t, u) => {
        u = path.relative(p, u);
        return t + '=' + u;
      });

      fs.writeFileSync(file, html);
    }
  });
}

var webpack_config = {
  entry: {},
  output: {
    path: 'web/dist',
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js'
  },
  resolve: {
    root: [path.resolve('./web/src/')]
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'imgs/[name].[ext]'
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(html|htm|shtml)$/,
        loader: 'includes'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      styleLoaders({
        extract: true
      })
    ]
  },
  includes: {
    extensions: ['', '.html', '.shtml', '.htm'],
    pattern: {
      re: /<!--\s*?include\s+?("|')(.+?)\1\s*?\-->/,
      index: 2
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([
      {
        from: path.resolve('./web/src/imgs'),
        to: path.resolve('./web/dist/imgs')
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve('./web/src/i18n'),
        to: path.resolve('./web/dist/i18n')
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve('./web/src/js/lib'),
        to: path.resolve('./web/dist/js/lib')
      }
    ]),
    new WebpackOnBuildPlugin(() => {
      build_docs();
      relative();
    })
  ]
};

if (prod) {
  webpack_config.plugins.push(
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      comments: false,
      compressor: {
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false,
        keep_quoted_props: true // fix ie8 property name error
      },
      mangle: {
        keep_fnames: true // fix ie8 function name error
      }
    })
  );
} else webpack_config.devtool = 'source-map';
>>>>>>> 17b9a7a8ddf56b68fd9c64135101a2becae4e999

var pages = path.resolve('./web/src/pages')

recursiveReadSync(pages).forEach(function(file) {
<<<<<<< HEAD
    file = path.relative(pages, file)
    var basename = path.basename(file)

    if (basename.charAt(0) !== '.') {
        if (/\.(html|htm|shtml)$/.test(file)) {
            webpack_config.plugins.push(
                new HtmlWebpackPlugin({
                    filename: file,
                    template: path.resolve(pages, file),
                    inject: true,
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true
                        // more options:
                        // https://github.com/kangax/html-minifier#options-quick-reference
                    },
                    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                    chunksSortMode: 'dependency',
                    chunks: ['common', file.replace(/\.(html|htm|shtml)$/, '')]
                })
            )
        } else if (/.jsx?$/.test(file)) {
            webpack_config.entry[file.replace(/.jsx?$/, '')] = path.resolve(pages, file)
        } else {
            webpack_config.plugins.push(
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(path.join('./web/src/pages/' + file)),
                        to: path.resolve(path.join('./web/dist/' + file))
                    }
                ])
            )
        }
    }
})
=======
  file = path.relative(pages, file);
  var basename = path.basename(file);

  if (basename.charAt(0) !== '.') {
    if (/\.(html|htm|shtml)$/.test(file)) {
      webpack_config.plugins.push(
        new HtmlWebpackPlugin({
          filename: file,
          template: path.resolve(pages, file),
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'dependency',
          chunks: ['common', file.replace(/\.(html|htm|shtml)$/, '')]
        })
      );
    } else if (/.jsx?$/.test(file)) {
      webpack_config.entry[file.replace(/.jsx?$/, '')] = path.resolve(
        pages,
        file
      );
    } else {
      webpack_config.plugins.push(
        new CopyWebpackPlugin([
          {
            from: path.resolve(path.join('./web/src/pages/' + file)),
            to: path.resolve(path.join('./web/dist/' + file))
          }
        ])
      );
    }
  }
});
>>>>>>> 17b9a7a8ddf56b68fd9c64135101a2becae4e999

module.exports = webpack_config
