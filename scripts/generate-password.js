const bcrypt = require('bcryptjs');

// Using a secure default password - you should change this
const password = 'Bhutan@Admin2024';

// Generate salt and hash
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log('\nAdmin Password:', password);
        console.log('Password Hash:', hash);
        console.log('\nNEXTAUTH_SECRET:', require('crypto').randomBytes(32).toString('hex'));
        console.log('\nCopy these values into your .env.local file\n');
    });
}); 