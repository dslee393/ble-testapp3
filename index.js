$(document).on('ready', function(){
  $('button').click(function(e){
    console.log("Discovering devices...");
    $('#result').append(`<p>Looking for devices...</p>`)
    var serviceUuid = '07775dd0-111b-11e4-9191-0800200c9a66';

    navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]})
    // .then(device => {
    //   $('#result').append(`<p>Device Found!</p>`);
    // })
    // .catch(error => {
    //   $('#result').append(`<p>${error}</p>`);
    // })




.then(device => device.gatt.connect())
.then(server => server.getPrimaryService(serviceUuid))
.then(service => service.getCharacteristics())
.then(characteristics => {
  $('#result').value('');
  $('#result').append(`<p>Connected!</p>`)
  log('> Characteristics: ' +
    characteristics.map(c => c.uuid).join('\n' + ' '.repeat(19)));
})
.catch(error => {
  $('#result').append(`<p>${error}</p>`);
  log('Argh! ' + error);
});




  }) //End of button click function
}) //End of document load
