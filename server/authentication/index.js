//allows calls to Management API to check data
const ManagementClient = require('auth0').ManagementClient;
const management = new ManagementClient({
  domain: 'team-refreshr.auth0.com',
  Production: 'https://refreshr.herokuapp.com',
  clientId: 'CjJZFl4f8C7ktct7cowshupaS5TG6usk',
  clientSecret: 'PGBub45Igzu7THqKD_c3N61mOF_3vwNRIvMBRSLn2zqmQBOmFMc7PEdUxmXD6JwD',
  //Development: LocalHost:9000
  //clientId: '0sARSYV0PTo9IKzgG7XT7cUF3XFqvsd9',
  //clientSecret: 'HpU4jLshkCcjNMv_OwCpQp6JNB5gyViA-UAna13ZddhaRzYWl_Zc1RcQ2_9Zh6Oi',
});


module.exports = management