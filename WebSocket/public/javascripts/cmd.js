/**
 * Created by Jonassen on 2017/3/21.
 */
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "/sensordata/sensordata.csv",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });

    $('#btn_off_gpio1').click(()=> {
        var dataToBack = {
            sensor: 'gpio',
            number: '1',
            command: 'off'
        };
    console.log('btn_off_gpio---------');
    $.ajax({
        type: 'POST',
        data: {data: JSON.stringify(dataToBack)},
        url: '/cmd',
        success: function (res) {
            console.log(res);
        }
    })
})

    $('#btn_on_gpio1').click(()=> {
        var dataToBack = {
            sensor: 'gpio',
            number: '1',
            command: 'on'
        };

    console.log('btn_on_gpio------------');
    $.ajax({
        type: 'POST',
        data: {data: JSON.stringify(dataToBack)},
        url: '/cmd',
        success: function (res) {
            console.log(res);
        }
    })
})

    $('#btn_off_gpio2').click(()=> {
        var dataToBack = {
            sensor: 'gpio',
            number: '2',
            command: 'off'
        };
    console.log('btn_off_gpio---------');
    $.ajax({
        type: 'POST',
        data: {data: JSON.stringify(dataToBack)},
        url: '/cmd',
        success: function (res) {
            console.log(res);
        }
    })
})

    $('#btn_on_gpio2').click(()=> {
        var dataToBack = {
            sensor: 'gpio',
            number: '2',
            command: 'on'
        };

    console.log('btn_on_gpio------------');
    $.ajax({
        type: 'POST',
        data: {data: JSON.stringify(dataToBack)},
        url: '/cmd',
        success: function (res) {
            console.log(res);
        }
    })
})

    $('#aircondition_add').click(function () {
        console.log('Air condition add button.');
    });

    $('#aircondition_minus').click(function () {
        console.log('Air condition minus button.');
    });

    $('#aircondition_sw').click(function () {
        console.log('Air condition sw button.');
    });

    function showChart() {
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = Chart.Line(ctx, {
            data: lineChartData,
            options: {
                responsive: true,
                hoverMode: 'index',
                stacked: false,
                title: {
                    display: true,
                    text: 'Info'
                },
                scales: {
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "axis-temperature"
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "axis-humidity",

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    }],
                }
            }
        });

        window.myLine.update();
    }



    var timeLabels;
    var humidityDatas;
    var temperatureDatas;

    var firstsensortimeLabels = [];
    var firstsensortemperatureDatas = [];
    var firstsensorhumidityDatas = [];

    var secondsensortimeLabels = [];
    var secondsensortemperatureDatas = [];
    var secondsensorhumidityDatas = [];


    var lastest_temp = 0;
    var lastest_humdity = 0;
    var lastest_led = 0;

    var lineChartData;

    function processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var totalrecord = allTextLines.length;
        var last100Lines = allTextLines.slice(totalrecord - 96);
        for (var i = 1; i < last100Lines.length; i++) {
            var data = last100Lines[i].split(',');
            if (data.length == 6) {
                if (data[1] == 'ABCD') {
                    var b = data[5].slice(13, 16);
                    var c = data[5].slice(11, 13);
                    c = (parseInt(c) + 8) % 24;
                    firstsensortimeLabels.push(c + b);
                    firstsensortemperatureDatas.push(data[2]);
                    firstsensorhumidityDatas.push(data[3]);
                    lastest_temp = data[2];
                    lastest_humdity = data[3];
                    lastest_led = data[4];
                }
                else if (data[1] == 'WXYZ') {
                    var b = data[5].slice(13, 16);
                    var c = data[5].slice(11, 13);
                    c = (parseInt(c) + 8) % 24;
                    secondsensortimeLabels.push(c + b);
                    secondsensortemperatureDatas.push(data[2]);
                    secondsensorhumidityDatas.push(data[3]);
                }
            }
        }
        $('#index_temp').html('<h3> ' + lastest_temp +' C </h3>');
        $('#index_humidity').html('<h3> ' + lastest_humdity + ' %RH</h3>');
        $('#index_led').html('<h3> ' + lastest_led + ' </h3>');

    }

    $('#GetAData').click(function () {
        timeLabels = firstsensortimeLabels;
        humidityDatas = firstsensorhumidityDatas;
        temperatureDatas = firstsensortemperatureDatas;
        lineChartData = {
            labels: timeLabels,
            datasets: [{
                label: "Temperature",
                borderColor: window.chartColors.red,
                backgroundColor: window.chartColors.red,
                fill: false,
                data: temperatureDatas,
                yAxisID: "axis-temperature",
            }, {
                label: "Humidity",
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                fill: false,
                data: humidityDatas, //randomfactor
                yAxisID: "axis-humidity"
            }]
        };

        showChart();
    });

    $('#GetBData').click(function () {
        timeLabels = secondsensortimeLabels;
        humidityDatas = secondsensorhumidityDatas;
        temperatureDatas = secondsensortemperatureDatas;
        lineChartData = {
            labels: timeLabels,
            datasets: [{
                label: "Temperature",
                borderColor: window.chartColors.red,
                backgroundColor: window.chartColors.red,
                fill: false,
                data: temperatureDatas,
                yAxisID: "axis-temperature",
            }, {
                label: "Humidity",
                borderColor: window.chartColors.blue,
                backgroundColor: window.chartColors.blue,
                fill: false,
                data: humidityDatas, //randomfactor
                yAxisID: "axis-humidity"
            }]
        };
        showChart();
    });

    //document.getElementById('GetBData').addEventListener('click', function () {
    //
    //});

//    $('#another_login_button').click(()=> {
//        console.log('click');
//        var dataToBack = {
//            username: $('#login_user').value,
//            password: $('#login_password').value
//        };
//    console.log('another_login_button');
//    $.ajax({
//        type: 'POST',
//        data: {data: JSON.stringify(dataToBack)},
//        url: '/info',
//        success: function (res) {
//            console.log(res);
//        }
//    })
//
//
//})
//
//    $('#login_button').click(()=> {
//        var dataToBack = {
//            username: $('#login_user').value,
//            password: $('#login_password').value
//        };
//        console.log('login_button');
//        $.ajax({
//            type: 'POST',
//            data: {data: JSON.stringify(dataToBack)},
//            url: '/info',
//            success: function (res) {
//                console.log(res);
//            }
//        })
//
//
//    })
})
