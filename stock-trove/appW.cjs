const express = require('express');
const pg = require('pg');
const app = express();
const fs = require('fs');
const cors = require('cors');



// Database connection details with SSL 
const pool = new pg.Pool({
    user: 'doadmin',
    host: 'db-stocktrove-do-user-15904210-0.c.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'AVNS_qYk117_9WLfyoiGLK4b',
    port: 25060,
    ssl: {
        ca: fs.readFileSync('ca-certificate.crt').toString(),
    },
});

// Helps convert JSON to JavaScript object
app.use(express.json());
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
// Create User (POST request) 
app.post('/users/create', async (req, res) => {
    try{
        const{email, password} = req.body;
        const now = new Date();
        const query = 'INSERT INTO users (userid, email, userpassword, registrationdate) VALUES (DEFAULT, $1, $2, $3) RETURNING *';
        const values = [email, password, now];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            res.status(200).json(result.rows[0]);
        } else{
            res.status(400).send('Creation failed');
        } 
    } catch (err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
})


// Authenticate USER (GET request)
app.get('/users/authenticate', async (req, res) => {
    try {
        const { email, password } = req.query; // Use req.query to get parameters from the URL
        const query = 'SELECT email, userpassword FROM users WHERE email = $1;';
        const values = [email];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.email === email && user.userpassword === password) {
                res.status(200).send('User authenticated');
            } else {
                res.status(401).send('Invalid password');
            }
        } else {
            res.status(401).send('Account doesn\'t exist');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// Follow Company (POST request)
app.post('/companies/follow', async (req, res) => {
    try{
        const{email, companyname} = req.body;
        const now = new Date();
        const query = 'INSERT INTO user_companies (userid, companyid, datefollowed) VALUES ((SELECT userid FROM users WHERE email = $1), (SELECT companyid FROM companies WHERE companyname = $2), $3) RETURNING *;';
        const values = [email, companyname, now];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            res.status(201).send('Company followed');
        } else{
            res.status(500).send('Follow failed');
        }
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
})

// Unfollow Company (DELETE request)
app.delete('/companies/unfollow', async (req, res) => {
    try{
        const{email, companyname} = req.body;
        const query = 'SELECT userid, companyid FROM user_companies WHERE userid = (SELECT userid FROM users WHERE email = $1) AND companyid = (SELECT companyid FROM companies WHERE companyname = $2);';
        const values = [email, companyname];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            const query2 = 'DELETE FROM user_companies WHERE userid = $1 AND companyid = $2 RETURNING *';
            const values2 = [result.rows[0].userid, result.rows[0].companyid];
            const result2 = await pool.query(query2, values2);
            if (result2.rows.length > 0){
                res.status(200).send('Company unfollowed');

            } else{
                res.status(500).send('Unfollow failed')
            }
        } else{
            res.status(500).send('Company already unfollowed')
        }

    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    
    }
})

// Get followed companies (GET request)
app.get('/users/getfollows', async (req, res) => {
    try {
        const { email } = req.query; // Use req.query to get parameters from the URL
        const query = 'SELECT companyname FROM user_companies JOIN companies ON user_companies.companyid = companies.companyid WHERE user_companies.userid = (SELECT userid FROM users WHERE email = $1)';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(500).send('User doesn\'t follow any companies');
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Delete account (DELETE request)
app.delete('/users/delete', async (req, res) =>{
    try{
        const{email} = req.body;
        const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
        const values = [email];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            res.status(200).send('Account deletion successful');
        } else{
            res.status(500).send('Account deletion unsuccessful');
        }
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

// // Change account email (UPDATE request)
// app.update('/users/updateemail', async (req, res) =>{
//     try{
//         const{email, newemail} = req.body;
//         const query = 'UPDATE users SET email = $1 WHERE email = $2';
//         const values = [newemail, email];
//         const result = await pool.query(query, values);
//         if (result.rows.length > 0){
//             res.status(200).send('Email updated');
//         } else{
//             res.status(500).send('Update unsuccessful');
//         }
//     } catch(err){
//         console.error(err);
//         res.status(500).json({error: 'An error occurred'});
//     }
// });

// // Change account password (UPDATE request)
// app.update('/users/updatepassword', async (req, res) =>{
//     try{
//         const{email, password} = req.body;
//         const query = 'UPDATE users SET userpassword = $1 WHERE email = $2';
//         const values = [password, email];
//         const result = await pool.query(query, values);
//         if (result.rows.length > 0){
//             res.status(200).send('Password updated');
//         } else{
//             res.status(500).send('Update unsuccessful');
//         }
//     } catch(err){
//         console.error(err);
//         res.status(500).json({error: 'An error occurred'});
//     }
// });

// // Change account email and password (UPDATE request)
// app.update('/users/updateinfo', async (req, res) =>{
//     try{
//         const{email, newemail, password} = req.body;
//         const query = 'UPDATE users SET email = $1, userpassword = $2 WHERE email = $3';
//         const values = [newemail, password, email];
//         const result = await pool.query(query, values);
//         if (result.rows.length > 0){
//             res.status(200).send('Email and password updated');
//         } else{
//             res.status(500).send('Update unsuccessful');
//         }
//     } catch(err){
//         console.error(err);
//         res.status(500).json({error: 'An error occurred'});
//     }
// });

// Starts Express server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});