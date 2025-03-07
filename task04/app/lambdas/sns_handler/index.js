exports.handler = async (event) => {
    console.log("Received SNS message:", JSON.stringify(event, null, 2));
};