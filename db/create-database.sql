CREATE DATABASE calendarTest;
GO
USE calendarTest;
GO


USE [master];
GO


CREATE LOGIN backendUser
    WITH PASSWORD    = N'backend123',
    CHECK_POLICY     = OFF,
    CHECK_EXPIRATION = OFF;
GO

EXEC sp_addsrvrolemember 
    @loginame = N'backendUser', 
    @rolename = N'sysadmin';

Use [calendarTest];
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = N'backendUser')
BEGIN
    CREATE USER [backendUser] FOR LOGIN [backendUser]
    EXEC sp_addrolemember N'db_owner', N'backendUser'
END;
GO