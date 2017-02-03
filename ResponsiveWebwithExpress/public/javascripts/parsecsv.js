/**
 * Created by Jonassen on 17/2/3.
 */


function ParserCSV(app) {
    this.app = app;
    this.filepath = '/Users/Jonassen/Project/NodeDev/';
    this.dataset = [];
    this.init();

}

ParserCSV.prototype.init = function () {

    //this.processLine(theline);
    this.GetdataFromCSV();
};


//ParserCSV.prototype.processLine = function(theline) {
//    var temperature = theline[0];
//    var time = theline[2];
//    var humidity = theline[1];
//    var data = [temperature, humidity, time];
//    self.dataset.push(data);
//    console.log(temperature + '\t' + humidity + '\t' + time);
//};

var processLine = function (theline) {
    var temperature = theline[0];
    var time = theline[2];
    var humidity = theline[1];
    var data = [temperature, humidity, time];
    self.dataset.push(data);
    console.log(temperature + '\t' + humidity + '\t' + time);
};



ParserCSV.prototype.GetdataFromCSV = function (filename){
    var parser = this.app.csv.parse({delimiter: ','}, function (err, lines) {
        app.async.each(lines, function (line) {
            processLine(line);
        });
    });

    var totalPath = self.filepath + filename + '.csv';
    app.fs.createReadStream(totalPath).pipe(parser);
};

module.exports= ParserCSV;