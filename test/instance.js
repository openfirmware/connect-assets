var expect = require("expect.js");
var mocha = require("mocha");
var connectAssets = require("..");

describe("instance", function () {
  it("exposes the mincer environment", function () {
    var assets = connectAssets();

    expect(assets.environment).to.be.an("object");
  });

  it("exposes the mincer object", function () {
    var assets = connectAssets();

    expect(assets.mincer).to.be.an("object");
  });
});
