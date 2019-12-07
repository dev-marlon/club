const FirebaseServer = require('firebase-server');

new FirebaseServer(5000, 'localhost', {
    states: {
        CA: 'California',
        AL: 'Alabama',
        KY: 'Kentucky'
    }
});