function checkTestSuccess(string) {
  return string.split('').reduce(function(outputValue, testValue) {
    return outputValue && testValue === '.'
  }, true);
}

function cleanTerminalLines(stdout) {
  return stdout.split("\n").filter(function(line) {
    return line.length > 0
  });
}

function getTestFailures(lines) {
  var testFailures = [];
  lines.forEach(function(line, index) {
    if ( line.match(/Failure/) ) {
      var expected = lines[index +2].replace(/ /g,'');
      var actual = lines[index +3].replace(/ /g,'');
      testFailures.push({
        expected: expected,
        actual: actual
      });
    }
  });
  return testFailures;
}


module.exports = {
  parseStdOut: function(stdout) {
    if (stdout === '')
      return null;
    var lines = cleanTerminalLines(stdout);
    return {
      testSuccess: checkTestSuccess(lines[2]),
      testFailures: getTestFailures(lines)
    }
  },
  parseStdError: function (stderror) {
    return stderror === '' ? null : 'Error';
  }
}

