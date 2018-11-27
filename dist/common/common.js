/* show spinner */
$(document)
    .ajaxStart(function () {
        $('#loader').show();
    });
/* hide spinner */
$(document).ajaxStop(function () {
    $('#loader').hide();
});

function startExchange(id) {
    $.ajax({
        type: 'GET',
        url: '/exchange/start/' + id,
        success: function (result) {
            $('#result').html(result);
        }
    });
}

function stopExchange(id) {
    $.ajax({
        type: 'GET',
        url: '/exchange/stop/' + id,
        success: function (result) {
            $('#result').html(result);
        }
    });
}