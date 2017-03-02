$( document ).ready(function() {
  var langSelect = $('#sel-language')[0];

  // Hide code output panel
  $("#output").hide();

  // Code editor initialization
  var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"),{
    lineNumbers: true,
    mode:  "ruby",
    value: "jfvjgvj",
  });

  // Append options to the select tag
  for (var lang in LANGS) {
    var opt = document.createElement("option");
    opt.value= LANGS[lang][0];
    opt.innerHTML = lang;
    $('#sel-language').append(opt);
  }

  // When the user clicks the 'send' button
  // Send code to compile
  $('#send').on('click', function(event) {
    event.preventDefault();
    $("#output").show();
    $("#output").append("<img src='img/default.gif' class='img-center' width='50'/>")
    var langId = langSelect.options[langSelect.selectedIndex].value
    myCodeMirror.save();
    json = {
      langId: langId,
      code: $('#code').val(),
      stdIn: "",
      test: test_ruby
    };
    $.post("/compile", json, function(data, error, xhr) {
        console.log(data);
        $("#output img").remove();
        document.getElementById("output").innerHTML = "<h3>Output</h3><p>" + data.output
        + "</p>" + "<h3>Errors</h3><p>" + data.errors + "</p>"
    });
  });


});
