function runExchange(id){
    $.ajax({
        type: 'GET',
        url: '/exchange/run/'+id,
        success: function(result) {
             alert(result);
        }
      });
}

function stopExchange(id){
    $.ajax({
        type: 'GET',
        url: '/exchange/run/'+id,
        success: function(result) {
            alert(result);
        }
      });
}