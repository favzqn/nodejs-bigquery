'use strict';

function main() {
    const {BigQuery} = require('@google-cloud/bigquery');

    async function queryShakespeare() {
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
        };
        const [rows] = await bigqueryClient.query(options);

        console.log('Rows:');
        rows.forEach(row => console.log(row));
    }

    queryShakespeare();
  }

main();