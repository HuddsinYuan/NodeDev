/**
 * Created by Jonassen on 2017/3/21.
 */


$(document).ready(function(){
    $('#btn_off_gpio').click(()=>{
        var dataToBack = {
            sensor: 'gpio',
            command: 'off'
        };
        console.log('btn_off_gpio');
        $.ajax({
            method: 'POST',
            data: {data: JSON.stringify(dataToBack)},
            url: '/cmd',
            success: function(res){
                console.log(res);
            }
        })
    })

    $('#btn_on_gpio').click(()=>{
        var dataToBack = {
            sensor: 'gpio',
            command: 'on'
        };

        $.ajax({
            method: 'POST',
            data: {data: JSON.stringify(dataToBack)},
            url: '/cmd',
            success: function(res){
                console.log(res);
            }
        })
    })

    $('#aircondition_add').click(()=>{
        console.log('Air condition add button.');
    })

    $('#aircondition_minus').click(()=>{
        console.log('Air condition minus button.');
    })
})
