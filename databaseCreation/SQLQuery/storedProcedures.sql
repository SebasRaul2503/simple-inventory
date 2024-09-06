
/*
	USER STORED PROCEDURES
*/
CREATE PROCEDURE sp_GetUserDetails -- gets details of one user (used on login)
    @userName NVARCHAR(64)
AS
BEGIN
    SELECT 
        U.USERID,
        U.USERNAME,
        U.USERPASSWORD,
        UR.ROLENAME,
        UR.CANADDPRODUCT,
        UR.CANEDITPRODUCT,
        UR.CANDELETEPRODUCT,
        UR.CANVIEWINVENTORY,
        UR.CANEDITINVENTORY,
        UR.CANVIEWREPORTS,
        UR.CANMODIFYUSERS
    FROM 
        "USER" U
    JOIN 
        USERPRIVILEGES UP ON U.USERID = UP.USERID
    JOIN 
        USERROLE UR ON UP.ROLEID = UR.ROLEID
    WHERE 
        U.USERNAME = @userName;
END
GO --executed



CREATE PROCEDURE sp_GetAllUsers -- returns all users on database (admin privileges needed)
AS
BEGIN
    SELECT 
        U.USERID,
        U.USERNAME,
        UR.ROLEID,
        UR.ROLENAME
    FROM 
        "USER" U
    JOIN 
        USERPRIVILEGES UP ON U.USERID = UP.USERID
    JOIN 
        USERROLE UR ON UP.ROLEID = UR.ROLEID;
END
GO -- executed



CREATE PROCEDURE sp_AddUserI -- Adds a user to the database
    @userName NVARCHAR(64),
    @userPassword NVARCHAR(200),
    @roleID INT
AS
BEGIN
    DECLARE @newUserID BIGINT;
    BEGIN TRY

        BEGIN TRANSACTION;

        INSERT INTO "USER" (USERNAME, USERPASSWORD)
        VALUES (@userName, @userPassword);

        SET @newUserID = SCOPE_IDENTITY();

        INSERT INTO USERPRIVILEGES (USERID, ROLEID)
        VALUES (@newUserID, @roleID);

        COMMIT TRANSACTION;

        SELECT @newUserID AS NewUserID;
    END TRY
    BEGIN CATCH

        ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
GO -- executed

CREATE PROCEDURE sp_ModifyUser -- Modifies a user on the database
    @action NVARCHAR(50),           -- 'delete', 'update'
    @userID BIGINT,
    @newUserName NVARCHAR(64) = NULL,
    @newUserPassword NVARCHAR(200) = NULL,
    @newRoleID INT = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        IF @action = 'delete' -- in case of delete
        BEGIN

            DELETE FROM USERPRIVILEGES
            WHERE USERID = @userID;

            DELETE FROM "USER"
            WHERE USERID = @userID;

            COMMIT TRANSACTION;

            SELECT 'User deleted successfully' AS Result; -- delete message
            RETURN;
        END

        IF @action = 'update' -- in case of update
        BEGIN
            UPDATE "USER"
            SET 
                USERNAME = ISNULL(@newUserName, USERNAME), 
                USERPASSWORD = ISNULL(@newUserPassword, USERPASSWORD)
            WHERE 
                USERID = @userID;

            IF @newRoleID IS NOT NULL
            BEGIN
                UPDATE USERPRIVILEGES
                SET ROLEID = @newRoleID
                WHERE USERID = @userID;
            END

            COMMIT TRANSACTION;

            SELECT 'User updated successfully' AS Result;
            RETURN;
        END
    END TRY
    BEGIN CATCH

        ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
GO

CREATE PROCEDURE sp_GetAllRoles
AS
BEGIN
    SELECT 
        ROLEID,
        ROLENAME
    FROM 
        USERROLE;
END
GO -- executed

