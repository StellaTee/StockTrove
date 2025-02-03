const express = require('express');
const pg = require('pg');
const app = express();
const fs = require('fs');
const cors = require('cors');
const {spawn} = require('child_process')



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
        const query = 'INSERT INTO users (userid, email, userpassword, notificationtypes, registrationdate) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *';
        const values = [email, password, [0,0] , now];
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
    try {
        const { email, companyname, symbol, companydescription, employeecount, logourl } = req.body;
        const now = new Date();

        // Check if the company with the given symbol exists
        const checkCompanyQuery = 'SELECT * FROM companies WHERE symbol = $1;';
        const checkCompanyValues = [symbol];
        const companyResult = await pool.query(checkCompanyQuery, checkCompanyValues);

        let companyId;

        if (companyResult.rows.length > 0) {
            companyId = companyResult.rows[0].companyid;
        } else {
            // If the company doesn't exist, create a new company and get its ID
            const createCompanyQuery = 'INSERT INTO companies (companyname, symbol, companydescription, employeecount, logourl) VALUES ($1, $2, $3, $4, $5) RETURNING companyid;';
            const createCompanyValues = [companyname, symbol, companydescription, employeecount, logourl];
            const createCompanyResult = await pool.query(createCompanyQuery, createCompanyValues);

            if (createCompanyResult.rows.length > 0) {
                companyId = createCompanyResult.rows[0].companyid;
            } else {
                throw new Error('Failed to create a new company');
            }
        }

        // Insert into user_companies table
        const userCompanyQuery = 'INSERT INTO user_companies (userid, companyid, datefollowed) VALUES ((SELECT userid FROM users WHERE email = $1), $2, $3) RETURNING *;';
        const userCompanyValues = [email, companyId, now];
        const result = await pool.query(userCompanyQuery, userCompanyValues);

        if (result.rows.length > 0) {
            res.status(201).send('Company followed');
        } else {
            res.status(500).send('Follow failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Unfollow Company (DELETE request)
app.delete('/companies/unfollow', async (req, res) => {
    try{
        const{email, symbol} = req.body;
        const query = 'SELECT userid, companyid FROM user_companies WHERE userid = (SELECT userid FROM users WHERE email = $1) AND companyid = (SELECT companyid FROM companies WHERE symbol = $2);';
        const values = [email, symbol];
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
        const query = 'SELECT symbol FROM user_companies JOIN companies ON user_companies.companyid = companies.companyid WHERE user_companies.userid = (SELECT userid FROM users WHERE email = $1)';
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
app.delete('/users/delete', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Manually delete associated records in user_companies table
      const deleteCompaniesQuery = 'DELETE FROM user_companies WHERE userid = (SELECT userid FROM users WHERE email = $1)';
      const deleteCompaniesValues = [email];
      await pool.query(deleteCompaniesQuery, deleteCompaniesValues);
  
      // Now, delete the user
      const deleteUserQuery = 'DELETE FROM users WHERE email = $1 RETURNING *';
      const deleteUserValues = [email];
      const result = await pool.query(deleteUserQuery, deleteUserValues);
  
      if (result.rows.length > 0) {
        res.status(200).send('Account deletion successful');
      } else {
        res.status(500).send('Account deletion unsuccessful');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// Change account email (PUT request)
app.put('/users/updateemail', async (req, res) =>{
    try{
        const{email, newemail} = req.body;
        const query = 'UPDATE users SET email = $1 WHERE email = $2';
        const values = [newemail, email];
        const result = await pool.query(query, values);
        res.status(200).send('Email updated');
            
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

// Change account password (PUT request)
app.put('/users/updatepassword', async (req, res) =>{
    try{
        const{email, password} = req.body;
        const query = 'UPDATE users SET userpassword = $1 WHERE email = $2';
        const values = [password, email];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            res.status(200).send('Password updated');
        } else{
            res.status(500).send('Update unsuccessful');
        }
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});

// Change account email and password (put request)
app.put('/users/updateinfo', async (req, res) =>{
    try{
        const{email, newemail, password} = req.body;
        const query = 'UPDATE users SET email = $1, userpassword = $2 WHERE email = $3';
        const values = [newemail, password, email];
        const result = await pool.query(query, values);
        res.status(200).send('Email and password updated');

    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'});
    }
});
app.put('/users/updatenotificationtypes', async (req, res) => {
    try {
        const { email, type1, type2 } = req.body;
        const query = 'UPDATE users SET notificationtypes = $1 WHERE email = $2 RETURNING *';
        const intType1 = parseInt(type1, 10);
        const intType2 = parseInt(type2, 10);
        const values = [[intType1, intType2], email];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0].notificationtypes);
        } else {

            res.status(500).send('Update unsuccessful');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Get Notification Types (GET request)
app.get('/users/getnotificationtypes', async (req, res) => {
    try {
        const { email } = req.query;
        const query = 'SELECT notificationtypes FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0].notificationtypes);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Generate recommendations (GET request)
app.get('/users/recommendations', async(req, res) =>{
    try{
        const{email} = req.query;
        const query = 'SELECT userid FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);
        if (result.rows.length > 0){
            const id = result.rows[0].userid;
            const query2 = 'SELECT * FROM user_recommendations WHERE userid = $1';
            const values2 = [id];
            const result2 = await pool.query(query2, values2);
            if (result2.rows.length > 0){
                const query3 = 'DELETE FROM user_recommendations WHERE userid = $1';
                const result3 = await pool.query(query3, values2);
            }
            let dataToSend;
            const python = spawn('python', ['recommendations.py', id]);
            python.on('error', (error) => {
                console.error(`Error spawning Python script: ${error.message}`);
            });
            python.stdout.on('data', function (data){
                dataToSend = data.toString();
            });
            python.stderr.on('data', (data) => {
                console.error(`Error from Python script: ${data}`);
            });
            python.on('close', (code) => {
                const query4 = 'SELECT companyname, symbol FROM user_recommendations JOIN companies ON user_recommendations.companyid = companies.companyid WHERE userid = $1';
                pool.query(query4, values2, (err, result4) =>{
                    if (err){
                        console.error('Error running query: ', err);
                        res.status(500).send('An error occurred');
                    }
                    console.log(result4.rows);
                    res.status(200).send(result4.rows);
                });
            });
        } else{
            res.status(400).send('User not found');
        }
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occurred'})
    }
});

// Starts Express server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});