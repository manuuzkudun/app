module.exports =  {
  //returns a crypto-safe random
  randomString: function(size) {
    return require("crypto").randomBytes(size).toString('hex');
  }
}
