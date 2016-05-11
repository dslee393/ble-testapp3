const eddy1 = new BluetoothDevice();

$(document).ready(function() {
  console.log(eddy1);
});

$('.btn').on('click',(event) => {
  console.log(eddy1.discoverConnect('Apple TV'), (event) => {
    console.log(event);
  });
});
$('.btnDisconnect').on('click',(event) => {
  console.log(eddy1.disconnect());
});

// function connectToBluetooth() {
//   let serviceUuid = '440b58d4-288a-02a0-d877-2c48f6a9ec42';
//   let serviceUuidA = 'ed9ff836-ac51-4448-862c-ab0ccc89f7d6';
//   let mockBeacon = 's:0-1=feaa,m:2-2=00,p:3-3:-41,i:4-13,i:14-19,d:20-21';
//   let serviceArray = ['alert_notification','automation_io','battery_service','blood_pressure',
//                       'body_composition','bond_management','continuous_glucose_monitoring',
//                       'current_time','cycling_power','cycling_speed_and_cadence','device_information',
//                       'environmental_sensing','generic_access','generic_attribute','glucose',
//                       'health_thermometer','heart_rate','human_interface_device',
//                       'immediate_alert','indoor_positioning','internet_protocol_support','link_loss',
//                       'location_and_navigation','next_dst_change','phone_alert_status',
//                       'pulse_oximeter','reference_time_update','running_speed_and_cadence',
//                       'scan_parameters','transport_discovery','tx_power','user_data','weight_scale'];
//   // console.log('function ran');
//   //navigator.bluetooth.requestDevice({filters: [{services: ['generic_attribute']}]})
//   return navigator.bluetooth.requestDevice({filters: [{
//     namePrefix: 'RBDot'
//     // services: [serviceUuid]
//     }]
//   })
//   .then(device => {
//     console.log('Device', device);
//     $('.btn').text('Connecting...');
//     return device.gatt.connect();
//   })
//   .then((server,error) => {
//     console.log('connected');
//     $('#log').append('<p class="message">Connected: ' + server.device.gatt.connected + '</p>');
//     console.log('Server: ',server);
//     $('.btn').text('Disconnect');
//     $('.btn').css('background', 'red');
//     $('.btn').on('tap click',(event) => {
//       server.disconnect();
//       console.log('disconnected');
//       $('.btn').text('Connect');
//       $('.btn').css('background', '#eee');
//     });
//     })
//   .catch(error => {
//     console.log('Argh! ' + error);
//   });
// }

//0x1801
//0x1800
