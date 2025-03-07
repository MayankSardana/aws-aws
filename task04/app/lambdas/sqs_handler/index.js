exports.handler = async (event) => {
    console.log("Received SQS message:", JSON.stringify(event, null, 2));
};