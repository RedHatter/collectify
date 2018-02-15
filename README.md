# Collectify

Extract text by regular expression and collect it in a file.

## Usage

### Options

  Name  | Required | Default |                       Description
--------|----------|---------|---------------------------------------------------------
file    | Yes      | N/A     | Collect the extracted text in this file.
regex   | Yes      | N/A     | Extract text matching this regular expression.
capture | No       |`0`      | Collect text from capture group instead of entire match.

### Example

We could, for example, extract all style tags and collect the contents into an external css file allowing css to be defined directly in javascript.


    var fs = require("fs");
    var browserify = require("browserify");
    browserify("./script.js")
      .plugin("collectify", {
        file: "./public/styles.css",
        regex: /<style>([\s\S]+?)<\/style>/g,
        capture: 1
      })
      .bundle()
      .pipe(fs.createWriteStream("./public/bundle.js"));
