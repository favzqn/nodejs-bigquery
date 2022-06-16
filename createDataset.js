'use strict';

function main() {
    const {BigQuery} = require('@google-cloud/bigquery');

    async function createDataset() {
        const datasetId = "my_states_dataset3";
        const bigqueryClient = new BigQuery();
        const options = {
        location: 'US',
        };
        const [dataset] = await bigqueryClient.createDataset(datasetId, options);
        console.log(`Dataset ${dataset.id} created.`);
    }

    createDataset();
}

main();