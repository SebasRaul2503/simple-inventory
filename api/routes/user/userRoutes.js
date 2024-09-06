const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sql, poolPromise } = require('../../database/connection');

//For user login (obviously doesn't need admin privileges) - no headers sent
router.post('/userLogin', async(req, res) => {
    try {
        const { USERNAME, USERPASSWORD } = req.body;

        const pool = await poolPromise;
    
        const result = await pool.request()
            .input('userName', sql.NVarChar, USERNAME)
            .execute('sp_GetUserDetails');
    
        const user = result.recordset[0];
    
        if(user && user.USERPASSWORD) {
            const validPassword = await bcrypt.compare(USERPASSWORD, user.USERPASSWORD);
    
            if (validPassword) {
                const token = jwt.sign(
                    {
                        id: user.USERID,
                        userName: user.USERNAME,
                        roleName: user.ROLENAME,
                        canAddProduct: user.CANADDPRODUCT,
                        canEditProduct: user.CANEDITPRODUCT,
                        canDeleteProduct: user.CANDELETEPRODUCT,
                        canEditInventory: user.CANEDITINVENTORY,
                        canViewReports: user.CANVIEWREPORTS,
                        canModifyUsers: user.CANMODIFYUSERS
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '1h'
                    }
                );
                res.status(200).json({
                    message: 'Login succesful! :D',
                    token: token
                });
            }
        } else {
            res.status(401).send('Incorrect user or password')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;