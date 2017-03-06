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
      console.log(lines);
      var testId = lines[index +1].split(' ')[0].split('#')[1].split('_').join('-');
      var testName = capitalizeFirstLetter(lines[index +1].split(' ')[0].split('#')[1].split('_').join(' '));
      var expected = lines[index +2].replace(/ /g,'').replace(/[+-]/, '');
      var actual = lines[index +3].replace(/ /g,'').replace(/[+-]/, '');
      testFailures.push({
        testName: testName,
        testId: testId,
        expected: expected,
        actual: actual
      });
    }
  });
  return testFailures;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
