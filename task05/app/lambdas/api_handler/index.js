const AWS = require("aws-sdk");

const { v4: uuidv4 } = require("uuid");
 
// Initialize DynamoDB client

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.target_table || "Events";
 
exports.handler = async (event) => {

    try {

        // Parse request body

        const body = JSON.parse(event.body);

        const principalId = body.principalId;

        const content = body.content;
 
        // Create an event object

        const eventItem = {

            id: uuidv4(),

            principalId: principalId,

            createdAt: new Date().toISOString(),

            body: content

        };
 
        // Save event to DynamoDB

        await dynamoDB.put({

            TableName: TABLE_NAME,

            Item: eventItem

        }).promise();
 
        // Return response

        return {

            statusCode: 201,

            body: JSON.stringify({ event: eventItem })

        };
 
    } catch (error) {

        return {

            statusCode: 500,

            body: JSON.stringify({ error: error.message })

        };

    }

};

 