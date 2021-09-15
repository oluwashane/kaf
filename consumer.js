import kafka from "./kafka.js";

const consumer = kafka.consumer({ groupId: 'group-id' })

async function consume () {
        await consumer.connect();

        await consumer.subscribe({ 
            topic: 'npm-package-published', 
            fromBeginning: true 
        });

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log('Received message',{
                topic, 
                partition, 
                key:message.key.toString(),
                value: message.value.toString()
            })
        }
    })
}

consume().catch(async error => {
    console.error(error)
    try {
        await consumer.disconnect()
    } catch(e) {
        console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
})
