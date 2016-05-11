const BluetoothDevice = (
    function(){
      'use-strict'
      var bluetooth = null;
      function define_bluetooth(){
        /* Constructor */
      }
      define_bluetooth.prototype.discoverConnect = (name, uuid, service_name) => {
        return navigator.bluetooth.requestDevice(
      		{
      			filters: [{
              name,
              uuid,
              service_name
            }]
      		})
          .then(device => {
      			return device.gatt.connect();
      		})
          .then(server => {
            bluetooth = server;
            console.log(server);
          });
      }
      define_bluetooth.prototype.connect = () => {

      }
      define_bluetooth.prototype.disconnect = function() {
        bluetooth.disconnect();
      }
      define_bluetooth.prototype.distance = () => {
        console.log(bluetooth.device.adData.rssi);
        let rssi = bluetooth.device.adData.rssi;
        let txPower = bluetooth.device.adData.txPower;
        if (rssi === 0) {
          return -1.0;
        }
        let ratio = rssi/txPower;
        if (ratio < 1) {
          return Math.pow(ratio,10);
        }
        else {
          let accuracy = (0.89976) * Math.pow(ratio,7.7095) + 0.111;
          return accuracy;
        }
      }
      return define_bluetooth;
    })();
