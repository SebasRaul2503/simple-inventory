
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



CREATE PROCEDURE sp_GetAllUsers --gets all users on database (admin privilege needed)
AS
BEGIN 
	SELECT 
        U.USERID,
        U.USERNAME,
        UR.ROLENAME
    FROM 
        "USER" U
    JOIN 
        USERPRIVILEGES UP ON U.USERID = UP.USERID
    JOIN 
        USERROLE UR ON UP.ROLEID = UR.ROLEID
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
        -- Iniciar la transacción
        BEGIN TRANSACTION;

        -- Insertar en la tabla USER
        INSERT INTO "USER" (USERNAME, USERPASSWORD)
        VALUES (@userName, @userPassword);

        -- Obtener el USERID del usuario recién insertado
        SET @newUserID = SCOPE_IDENTITY();

        -- Insertar en la tabla USERPRIVILEGES
        INSERT INTO USERPRIVILEGES (USERID, ROLEID)
        VALUES (@newUserID, @roleID);

        -- Confirmar la transacción
        COMMIT TRANSACTION;

        -- Devolver el USERID del nuevo usuario
        SELECT @newUserID AS NewUserID;
    END TRY
    BEGIN CATCH
        -- Si ocurre un error, revertir la transacción
        ROLLBACK TRANSACTION;

        -- Retornar el error
        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
GO
-- executed
