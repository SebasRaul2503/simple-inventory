const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../../database/connection');
const verifyToken = require('../../middleware/authMiddleware');

// routes that need admin privileges
// need jwt token on auth headers

router.get('/getAllUsers', verifyToken, async (req, res) => {
    try {
        // verify privileges (need admin role to get all users) with jwt token sent in header
        if (req.user.roleName !== 'Admin') {
            return res.status(403).json({ message: 'You do not have permission to view all users.' });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .execute('sp_GetAllUsers');

        // Devolver los usuarios obtenidos
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// Register a new user on databse
router.post('/addUser', async(req, res) => {
    try {
        const { USERNAME, USERPASSWORD, ROLEID } = req.body;

        const hashedPassword = await bcrypt.hash(USERPASSWORD, 10);

        const pool = await poolPromise;

        const result = await pool.request()
            .input('userName', sql.NVarChar, USERNAME)
            .input('userPassword', sql.NVarChar, hashedPassword)
            .input('roleID', sql.Int, ROLEID)
            .execute('sp_AddUserI');

        const userid = result.recordset[0];
        if (userid && userid.NewUserID){
            res.status(200).json(
                {
                    message: 'User Registered! :D',
                    newuserid: userid.NewUserID
                }
        )
        }
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
});



// Modifies a user in database
router.put('/modifyUser', verifyToken, async (req, res) => {
    try {
        const { action, USERID, USERNAME, USERPASSWORD, ROLEID } = req.body;
        
        // verify privileges (need admin role to modify) with jwt token sent in header
        if (!req.user.canModifyUsers) {
            return res.status(403).json({ message: 'You do not have permission to modify users.' });
        }

        const pool = await poolPromise;
        let hashedPassword = null;

        // on password update, hash again
        if (USERPASSWORD) {
            hashedPassword = await bcrypt.hash(USERPASSWORD, 10);
        }

        const request = pool.request()
            .input('action', sql.NVarChar, action) // 'update' or 'delete'
            .input('userID', sql.BigInt, USERID)
            .input('newUserName', sql.NVarChar, USERNAME || null) //can be sent on the request or not
            .input('newUserPassword', sql.NVarChar, hashedPassword || null)
            .input('newRoleID', sql.Int, ROLEID || null);
        // if a value is not sent in the request, it will be considered as null
        const result = await request.execute('sp_ModifyUser');
        
        if (result.recordset.length > 0) {
            const message = result.recordset[0].Result;
            res.status(200).json({ message: message });
        } else {
            res.status(400).json({ message: 'No changes were made' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;