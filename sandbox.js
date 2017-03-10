const exec = require('child_process').exec;
const fs = require('fs');

const DockerSandbox = function(args) {
    this.timeout_value = args["timeout"];
    this.path = args["path"];
    this.folder = args["folder"];
    this.vm_name = args["vmName"];
    this.compiler_name = args["compiler"];
    this.codeFilename= args["codeFilename"];
    this.code = args["code"];
    this.testFilename = args["testFilename"];
    this.testCode = args["testCode"];
    this.langName = args["languageName"];
    this.stdin_data = args["stdIn"];
}

DockerSandbox.prototype.run = function(success) {
  const sandbox = this;
  sandbox.prepare(function(){
    sandbox.execute(success);
  });
}

// TO-DO: implement promises
DockerSandbox.prototype.prepare = function(success) {
  const sandbox = this;
  // Create a folder to mount the docker container
  var command = "sudo mkdir " + this.path + this.folder;
  console.log(command);
  exec(command);
  // copy the content of the payload folder to the folder to be mounted
  command = "sudo cp " + this.path + "payload/script.sh " + this.path + this.folder;
  console.log(command);
  exec(command);
  // Set up permissions to the folder
  command = "sudo chmod 777 " + this.path+this.folder;
  console.log(command);
  exec(command,function(st){

    const codeFilename = sandbox.path + sandbox.folder + "/" + sandbox.codeFilename;
    fs.writeFile(codeFilename, sandbox.code);
    console.log(sandbox.langName + " file was saved!");
    exec("sudo chmod 777 \'"+sandbox.path+sandbox.folder+"/"+sandbox.codeFilename+"\'");

    const inputFilename = sandbox.path + sandbox.folder+"/inputFile";
    fs.writeFile(inputFilename, sandbox.stdin_data);
    console.log("Input file was saved!");

    if (sandbox.testCode) {
      const testFilename = sandbox.path + sandbox.folder + "/" + sandbox.testFilename;
      fs.writeFile(testFilename, sandbox.testCode);
      console.log("Test file was saved!");
      exec("sudo chmod 777 \'"+sandbox.path+sandbox.folder+"/"+sandbox.testFilename+"\'");
    }
    success();
  });
}

DockerSandbox.prototype.execute = function(success) {
  var myC = 0; //variable to enforce the timeout_value
  var sandbox = this;
  var command = "sudo " + this.path +'run_docker_container.sh ';
  command += this.path + this.folder;
  command += " usercode ";
  command += this.vm_name + ' ';
  command += this.compiler_name + ' ';
  command += sandbox.testCode ? sandbox.testFilename : sandbox.codeFilename;
  console.log(command);

  //execute the Docker, This is done ASYNCHRONOUSLY
  exec(command, function() {
    console.log("running docker");
  });
  console.log("------------------------------")

  //Check For File named "completed" after every 1 second
  var intid = setInterval(function() {
    myC += 1;
    var compiledFile = sandbox.path + sandbox.folder + '/completed';
    fs.readFile(compiledFile, 'utf8', function(err, data) {
      //if file is not available yet and the file interval is not yet up carry on
      if (err && myC < sandbox.timeout_value) {
        return;
      } else if (myC < sandbox.timeout_value) {//if file is found simply display a message and proceed
        console.log("DONE");
        //check for possible errors
        var errorsFile = sandbox.path + sandbox.folder + '/errors';
        fs.readFile(errorsFile, 'utf8', function(err2, data2) {
          if(!data2) data2=""
          var lines = data.toString().split('*-COMPILEBOX::ENDOFOUTPUT-*');
          data = lines[0];
          var time=lines[1];
          success(data,time,data2)
        });
      } else { //if time is up. Save an error message to the data variable
        //Since the time is up, we take the partial output and return it.
        var logFile = sandbox.path + sandbox.folder + '/logfile.txt';
        fs.readFile(logFile, 'utf8', function(err, data) {
          if (!data) data = "";
          data += "\nExecution Timed Out";
          console.log("Timed Out: " + sandbox.folder + " " + sandbox.langName);
          fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', function(err2, data2) {
  	        if(!data2) data2 = "";
            var lines = data.toString().split('*---*');
            data=lines[0];
            var time=lines[1];
            success(data,data2)
          });
        });
      }
      // now remove the temporary directory
      console.log("ATTEMPTING TO REMOVE: " + sandbox.folder);
      console.log("------------------------------");
      //exec("sudo rm -r " + sandbox.folder);
      clearInterval(intid);
    });
  }, 1000);
}

module.exports = DockerSandbox;
