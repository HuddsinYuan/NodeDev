/**
 * Created by Jonassen on 2017/3/21.
 */
$(document).ready(function(){
    $('#sendtext').click(()=>{
        var dataToBack = {
            sensor: 'GPIO',
            command: 'ON'
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
})
