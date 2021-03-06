var expect = require("expect.js");
var mocha = require("mocha");
var assets = require("..");

describe("helper functions", function () {
  it("do not pollute global scope if helperContext is passed", function () {
    var ctx = {};
    var instance = assets({ helperContext: ctx });

    expect(ctx.css).to.be.a("function");
    expect(ctx.js).to.be.a("function");
    expect(ctx.assetPath).to.be.a("function");

    expect(global.css).to.equal(undefined);
    expect(global.js).to.equal(undefined);
    expect(global.assetPath).to.equal(undefined);
  });

  it("throw an Error if asset is not found", function () {
    var ctx = {};
    var instance = assets({ helperContext: ctx });

    expect(function () {
      ctx.assetPath("non-existant-asset.js");
    }).to.throwError(/'non-existant-asset.js' not found/i);
  });

  it("returns many paths if options.build is false", function () {
    var ctx = {};
    var instance = assets({ helperContext: ctx, paths: "test/assets/css", build: false });
    var files = ctx.assetPath("depends-on-blank.css");

    expect(files).to.equal(
      '/assets/blank-521e4431621444c7c6cabb98340aee25.css\n' +
      '/assets/depends-on-blank-66b89b263189e7f21205fd54e0552199.css'
    );
  });

  it("returns a single path if options.build is true", function () {
    var ctx = {};
    var instance = assets({ helperContext: ctx, paths: "test/assets/css", build: true });
    var files = ctx.assetPath("depends-on-blank.css");

    expect(files).to.equal('/assets/depends-on-blank-26c758c7db6d4dd5a9d4b683105a9af5.css');
  });

  describe("css", function () {
    it("returns a <link> tag for each asset found (separated by \\n)", function () {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/css" });
      var link = ctx.css("depends-on-blank.css");

      expect(link).to.equal(
        '<link rel="stylesheet" href="/assets/blank-521e4431621444c7c6cabb98340aee25.css" />\n' +
        '<link rel="stylesheet" href="/assets/depends-on-blank-66b89b263189e7f21205fd54e0552199.css" />'
      );
    });

    it("should serve correct asset even if extention is not supplied", function() {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/css" });
      var link = ctx.css("asset");
      expect(link).to.equal(
        '<link rel="stylesheet" href="/assets/asset-521e4431621444c7c6cabb98340aee25.css" />'
      );
    });

    it("should have additional attributes in result tag", function() {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/css" });
      var link = ctx.css("asset", { 'data-turbolinks-track': true });
      expect(link).to.equal(
        '<link rel="stylesheet" href="/assets/asset-521e4431621444c7c6cabb98340aee25.css" data-turbolinks-track />'
      );
    });

  });

  describe("js", function () {
    it("returns a <script> tag for each asset found (separated by \\n)", function () {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/js" });
      var script = ctx.js("depends-on-blank.js");

      expect(script).to.equal(
        '<script src="/assets/blank-90dc8429efe292706496a6ec42fb7d06.js"></script>\n' +
        '<script src="/assets/depends-on-blank-590a78dcc5338ad76a95a7ab4fad7799.js"></script>'
      );
    });

    it("should serve correct asset even if extention is not supplied", function() {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/js" });
      var script = ctx.js("asset.js");

      expect(script).to.equal(
        '<script src="/assets/asset-90dc8429efe292706496a6ec42fb7d06.js"></script>'
      );
    });

    it("should have additional attributes in result tag", function() {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/js" });
      var script = ctx.js("asset.js", { async: true });

      expect(script).to.equal(
        '<script src="/assets/asset-90dc8429efe292706496a6ec42fb7d06.js" async></script>'
      );
    });
  });

  describe("assetPath", function () {
    it("returns a file path for each asset found (separated by \\n)", function () {
      var ctx = {};
      var instance = assets({ helperContext: ctx, paths: "test/assets/js" });
      var path = ctx.assetPath("depends-on-blank.js");

      expect(path).to.equal(
        '/assets/blank-90dc8429efe292706496a6ec42fb7d06.js\n' +
        '/assets/depends-on-blank-590a78dcc5338ad76a95a7ab4fad7799.js'
      );
    });

    it("is accessible from javascript assets");
    it("is accessible from coffeescript assets");
    it("is accessible from stylus assets");
    it("is accessible from less assets");
    it("is accessible from sass assets");
    it("is accessible from haml coffeescript assets");
    it("is accessible from ejs assets");
  });

  describe("asset", function () {
    it("returns the contents of the asset");
    it("is accessible from javascript assets");
    it("is accessible from coffeescript assets");
    it("is accessible from stylus assets");
    it("is accessible from less assets");
    it("is accessible from sass assets");
    it("is accessible from haml coffeescript assets");
    it("is accessible from ejs assets");
  });
});
