'use strict';

function main() {
    const {BigQuery} = require('@google-cloud/bigquery');

    async function queryShakespeareDisableCache() {
        const bigqueryClient = new BigQuery();
        const sqlQuery = `SELECT word, word_count
            FROM \`bigquery-public-data.samples.shakespeare\`
            WHERE corpus = @corpus
            AND word_count >= @min_word_count
            ORDER BY word_count DESC`;
        const options = {
            query: sqlQuery,
            location: 'US',
            params: {corpus: 'romeoandjuliet', min_word_count: 250},
            useQueryCache: false,
        };

        const [job] = await bigqueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        const [rows] = await job.getQueryResults();

        console.log('Rows:');
        rows.forEach(row => console.log(row));

        console.log('JOB STATISTICS:')
        console.log(`Status: ${job.metadata.status.state}`);
        console.log(`Creation time: ${job.metadata.statistics.creationTime}`);
        console.log(`Start time: ${job.metadata.statistics.startTime}`);
        console.log(`Statement type: ${job.metadata.statistics.query.statementType}`);
    }
    queryShakespeareDisableCache();
}

main();