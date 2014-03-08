/** Database Configuration
  * Used to build the URL to access the postgres database, form:
  * postgres://<username>:<password>@<location>
  */
exports.username = '';
exports.password = '';
exports.location = 'localhost/postgres';

/** Client Configuration
  * Used to configure information the client needs to create a socket.io
  * connection to the server
  */
exports.host = 'http://192.168.0.10';
