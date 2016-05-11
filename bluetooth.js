const BluetoothDevice = (
    function(){
      'use-strict'
      var bluetooth = null;
      var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      const serviceArray = ['alert_notification','automation_io','battery_service','blood_pressure',
                          'body_composition','bond_management','continuous_glucose_monitoring',
                          'current_time','cycling_power','cycling_speed_and_cadence','device_information',
                          'environmental_sensing','generic_access','generic_attribute','glucose',
                          'health_thermometer','heart_rate','human_interface_device',
                          'immediate_alert','indoor_positioning','internet_protocol_support','link_loss',
                          'location_and_navigation','next_dst_change','phone_alert_status',
                          'pulse_oximeter','reference_time_update','running_speed_and_cadence',
                          'scan_parameters','transport_discovery','tx_power','user_data','weight_scale'];
      function define_bluetooth(){
        /* Constructor */
      }
      define_bluetooth.prototype.discoverConnect = function (name, uuid = null, service_name = null) {
        if (arguments.length === 0) throw new Error('Not able to connect. Must pass valid Name, UUID, or Service Name.');
        if (service_name && serviceArray.indexOf(service_name) < 0) throw new Error('Not a valid service.');
        if (uuid && !uuid.match(uuidRegex)) throw new TypeError('Not a valid 16-bit UUID.');
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

      define_bluetooth.prototype.disconnect = function() {
        if (bluetooth.connected) {
          bluetooth.disconnect();
          if (!bluetooth.connected) {
            return true;
          }
          throw new Error('Issue disconnecting with device.');
        }
        throw new Error('Could not disconnect. Device not connected.');
      }

      define_bluetooth.prototype.distance = function () {
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
