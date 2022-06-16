'use strict';

function main() {

    const {BigQuery} = require('@google-cloud/bigquery');

    async function queryGitHub() {
        const bigqueryClient = new BigQuery();
        const sqlQuery = `SELECT subject AS subject, COUNT(*) AS num_duplicates
        FROM \`bigquery-public-data.github_repos.commits\`
        GROUP BY subject 
        ORDER BY num_duplicates 
        DESC LIMIT 10`;
        const options = {
        query: sqlQuery,
        location: 'US',
        };
        const [rows] = await bigqueryClient.query(options);

        console.log('Rows:');
        rows.forEach(row => console.log(`${row.subject}: ${row.num_duplicates}`));
    }
    
    queryGitHub();
}

main();