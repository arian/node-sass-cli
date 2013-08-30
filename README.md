node-sass-cli
=============

This is an improved CLI for [node-sass](https://github.com/andrew/node-sass), the libsass binding for node.

Usage
-----

```
Compile .scss files with node-sass.
Usage: node ./bin/sass-cli.js [options] <input.scss>

Options:
  --output-style     CSS output style (nested|expanded|compact|compressed)  [default: "nested"]
  --source-comments  Include debug info in output (none|normal|map)         [default: "none"]
  --include-path     Path to look for @import-ed files                      [default: current working directory]
  --watch, -w        Watch this directory
  --output, -o       Output css file
  --stdout           Print the resulting CSS to stdout
  --help, --help     Print usage info
```
