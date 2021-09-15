import client from "./kafka.js";

async function consume () {
    try {
        // const topic = '';
        const consumer = client.consumer({ groupId: 'testing' })
        await consumer.connect();
        await consumer.subscribe({ topic: 'ncdf', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                console.log(topic, partition, message)
            }
        })
    } catch (e) {
        console.log(e.message, e)
    }
}

consume()
