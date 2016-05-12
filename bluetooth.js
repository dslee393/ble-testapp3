const BluetoothDevice = (
    function(){
      'use-strict'
      /**
      *Bluetooth variable initially set to null; will redefine once connected to
      *GATT server.
      */
      var bluetooth = null;
      /** 
      *Regular Expression to check if the uuid parameter for discoverConnect method
      *is correctly formatted .
      */
      var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      /** 
      *Array containing all the valid services. Each value will be checked against
      *the service_name parameter that is passed into the discoverConnect method
      *to ensure that the parameter passed in is a valid service.
      */
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
      /**
      *Method that discovers, and connects to a device with a name/uuid/service_name that 
      *matches the name/uid/service_name that is passed in.
      *@param {string} name - name of device
      *@param {string} uuid - uuid of the device
      *@param {string} service_name - name of service that the device allows
      */
      define_bluetooth.prototype.discoverConnect = function (name, uuid = null, service_name = null) {
        //Throws an error if there are no parameters passed into the method
        if (arguments.length === 0) throw new Error('Not able to connect. Must pass valid Name, UUID, or Service Name.');
        /**
        *Throws an error if the service_name parameter does not match any of the items in
        *the serviceArray defined in lines 13 - 21 .
        */
        if (service_name && serviceArray.indexOf(service_name) < 0) throw new Error('Not a valid service.');
        /**
        *Throws an error if the uuid parameter does not match the format defined by the
        *regular expression in line 9.
        */
        if (uuid && !uuid.match(uuidRegex)) throw new TypeError('Not a valid 16-bit UUID.');
        /**
        *Returns a function that requests a bluetooth device based on the filters
        *specified in the arguments, then connects to the device.
        */
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
      /**
      *Method that disconnects with bluetooth device if a connection is already
      *established.
      */
      define_bluetooth.prototype.disconnect = function() {
        /**
        *Disconnect from device if the connected property in the bluetooth object 
        *evaluates to true.
        */
        if (bluetooth.connected) {
          bluetooth.disconnect();
          /**
          *If the disconnect method is called while the connected property on the
          *bluetooth object evaluates to true and the connected property in the bluetooth 
          *object evaluates to false after disconnect runs, then return the boolean value 
          *true to indicate that the disconnect was successful.
          */
          if (!bluetooth.connected) {
            return true;
          }
          /**
          *If however, the connected property in the bluetooth object evaluates 
          *to true after the disconnect method ran, then display an error stating that there 
          *was a problem disconnecting with the device.
          */
          throw new Error('Issue disconnecting with device.');
        }
        /**
        *If the disconnect method is called while the connected property in the
        *bluetooth object is false, then display an error stating that the device
        *is not connected.
        */
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
