const express = require('express');
const bodyParser = require('body-parser');
const mqtt =require('mqtt');

// Replace <MQTT SERVER> and <MQTT Topic> with your actual MQTT Broker address and topic
const latestTopic = "<MQTT Topic>";
const client = mqtt.connect("mqtt://<MQTT SERVER>"); 

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

var connected = false;

app.post('/webhook', (req, res) => {
    //console.log('Received webhook:', req.body);
    res.sendStatus(200);
    if (connected) {
        client.publish(latestTopic,JSON.stringify(req.body))
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

client.on("connect", () => {
    client.subscribe(latestTopic, (err) => {
        console.log("Connected to MQTT Broker");
        connected = true;
   
        if (err) {
          console.log(err);
        }
      });
  });
