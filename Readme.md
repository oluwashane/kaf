enter the zsh and run this command
kafka-console-consumer --topic test-topic --bootstrap-server localhost:9092 --from-beginning

-H "x-npm-signature: sha256=7c0456720f3fdb9b94f5ad5e0c231a61e0fd972230d83eb8cb5062e1eed6ff5c" \
curl -XPOST \
    -H "Content-Type: application/json" \
    -d '{"event":"package:publish","name":"@kafkajs/zstd","version":"1.0.0","hookOwner":{"username":"nevon"},"payload":{"name":"@kafkajs/zstd"},"change":{"version":"1.0.0"},"time":1603444214995}' \
    http://localhost:5000/hook