'use strict';

function main() {
    // Import the Google Cloud client libraries
    const {BigQuery} = require('@google-cloud/bigquery');
    const {Storage} = require('@google-cloud/storage');

    const datasetId = "my_states_dataset3";
    const tableId = "my_states_table";

    async function createTable(datasetId, tableId) {
        const bigqueryClient = new BigQuery();
        const options = {
            location: 'US',
            };
        const [table] = await bigqueryClient
        .dataset(datasetId)
        .createTable(tableId, options);

        console.log(`Table ${table.id} created.`);
    }

    async function loadJSONFromGCS(datasetId, tableId) {
        const bigqueryClient = new BigQuery();
        const storageClient = new Storage();
        const bucketName = 'cloud-samples-data';
        const filename = 'bigquery/us-states/us-states.json';
        const metadata = {
        sourceFormat: 'NEWLINE_DELIMITED_JSON',
        schema: {
            fields: [
            {name: 'name', type: 'STRING'},
            {name: 'post_abbr', type: 'STRING'},
            ],
        },
        location: 'US',
        };

        const [job] = await bigqueryClient
        .dataset(datasetId)
        .table(tableId)
        .load(storageClient.bucket(bucketName).file(filename), metadata);

        console.log(`Job ${job.id} completed.`);

        const errors = job.status.errors;
        if (errors && errors.length > 0) {
        throw errors;
        }
    }

    createTable(datasetId, tableId);
    loadJSONFromGCS(datasetId, tableId);
}

main();