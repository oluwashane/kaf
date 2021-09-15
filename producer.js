import client from './kafka.js';

async function Producer() {
    try {
        const producer = client.producer();
        const admin = client.admin();
        await admin.connect()
        await producer.connect();
        await admin.createTopics({
          waitForLeaders: true,
          topics: [{topic: 'ncdf'}]
        })
        const getRandomNumber = () => Math.round(Math.random(10) * 1000)
        const topicMessages = [
            {
              topic: 'ncdf',
              messages: [{ key: 'key', value: JSON.stringify({name:'mike'}) }],
            },
            {
              topic: 'ncdf',
              messages: [{ key: 'key', value: JSON.stringify({name:'shane'}) }],
            },
            {
              topic: 'ncdf',
              messages: [
                {
                  key: 'key',
                  messages: [{ key: 'key', value: JSON.stringify({name:'andrew'}) }],
                }
              ],
            }
          ]
        // console.log(topicMessages)
        await producer.sendBatch({topicMessages})
        await producer.disconnect()
    } catch (e) {
        console.log(e)
    } 
}


export default Producer
