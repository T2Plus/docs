---
id: preparedb
title: Подготовка БД и данных
sidebarDepth: 0
---

## Создание демонстрационных БД-источника и БД-приемника

В качестве примера интеграции создадим две БД **T2.DemoSourceDB** и **T2.DemoTargetDB** на существующем инстансе **MS SQL Server**. В каждой такой БД будет создана таблица с именем **HelloWorld** с полями **Id** и **Text**. В БД **T2.DemoSourceDB** вставим одну запись со значениями **Id** = *1* и **Text** = *Hello World from T2.DemoSourceDB!*. В БД **T2.DemoTargetDB** таблица **HelloWorld** изначально будет пустой.

Откройте **Microsoft SQL Server Management Studio** и выполните следующий скрипт (у пользователя должны быть соответствующие права на создание баз данных; как вариант - роль **sysadmin**):

    SET NOCOUNT ON
    GO
    
    -- T2.DemoSourceDB
    USE master
    GO
    
    IF EXISTS (SELECT * FROM sysdatabases WHERE name = 'T2.DemoSourceDB')
      DROP DATABASE [T2.DemoSourceDB];
    GO
    
    DECLARE @device_directory NVARCHAR(520);
    
    SELECT
      @device_directory = SUBSTRING(filename, 1, CHARINDEX(N'master.mdf', LOWER(filename)) - 1)
    FROM
      master.dbo.sysaltfiles
    WHERE
      dbid = 1 AND fileid = 1;
    
    EXECUTE 
    ( 
      N'CREATE DATABASE [T2.DemoSourceDB]
        ON PRIMARY (NAME = N''T2.DemoSourceDB'', FILENAME = N''' + @device_directory + N'T2.DemoSourceDB.mdf'')
        LOG ON (NAME = N''T2.DemoSourceDB_log'',  FILENAME = N''' + @device_directory + N'T2.DemoSourceDB.ldf'')'
    )
    GO
    
    IF CAST(SERVERPROPERTY('ProductMajorVersion') AS INT) < 12 
    BEGIN
      EXEC sp_dboption 'T2.DemoSourceDB', 'trunc. log on chkpt.', 'true'
      EXEC sp_dboption 'T2.DemoSourceDB', 'select into/bulkcopy', 'true'
    END
    ELSE
      ALTER DATABASE [T2.DemoSourceDB] SET RECOVERY SIMPLE WITH NO_WAIT
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    USE [T2.DemoSourceDB]
    GO
    
    IF EXISTS (SELECT * FROM sysobjects WHERE id = object_id('dbo.HelloWorld') and sysstat & 0xf = 3)
      DROP TABLE "dbo"."HelloWorld"
    GO
    
    CREATE TABLE "HelloWorld"
    (
      "Id"   INT IDENTITY (1, 1) NOT NULL,
      "Text" NVARCHAR (100) NULL
      CONSTRAINT "PK_HelloWorld" PRIMARY KEY CLUSTERED 
      (
        "Id"
      )
    )
    GO
    
    INSERT "HelloWorld" ("Text") VALUES('Hello World from T2.DemoSourceDB!');
    GO
    
    -- T2.DemoTargetDB
    USE master
    GO
    
    IF EXISTS (SELECT * FROM sysdatabases WHERE name = 'T2.DemoTargetDB')
      DROP DATABASE [T2.DemoTargetDB];
    GO
    
    DECLARE @device_directory NVARCHAR(520);
    
    SELECT
      @device_directory = SUBSTRING(filename, 1, CHARINDEX(N'master.mdf', LOWER(filename)) - 1)
    FROM
      master.dbo.sysaltfiles
    WHERE
      dbid = 1 AND fileid = 1;
    
    EXECUTE 
    ( 
      N'CREATE DATABASE [T2.DemoTargetDB]
        ON PRIMARY (NAME = N''T2.DemoTargetDB'', FILENAME = N''' + @device_directory + N'T2.DemoTargetDB.mdf'')
        LOG ON (NAME = N''T2.DemoTargetDB_log'',  FILENAME = N''' + @device_directory + N'T2.DemoTargetDB.ldf'')'
    )
    GO
    
    IF CAST(SERVERPROPERTY('ProductMajorVersion') AS INT) < 12 
    BEGIN
      EXEC sp_dboption 'T2.DemoTargetDB', 'trunc. log on chkpt.', 'true'
      EXEC sp_dboption 'T2.DemoTargetDB', 'select into/bulkcopy', 'true'
    END
    ELSE
      ALTER DATABASE [T2.DemoTargetDB] SET RECOVERY SIMPLE WITH NO_WAIT
    GO
    
    SET QUOTED_IDENTIFIER ON
    GO
    
    USE [T2.DemoTargetDB]
    GO
    
    IF EXISTS (SELECT * FROM sysobjects WHERE id = object_id('dbo.HelloWorld') and sysstat & 0xf = 3)
      DROP TABLE "dbo"."HelloWorld"
    GO
    
    CREATE TABLE "HelloWorld"
    (
      "Id"   INT IDENTITY (1, 1) NOT NULL,
      "Text" NVARCHAR (100) NULL
      CONSTRAINT "PK_HelloWorld" PRIMARY KEY CLUSTERED 
      (
        "Id"
      )
    )
    GO

Выполните команду чтения данных в БД-источнике:
  
    SELECT * FROM [T2.DemoSourceDB].[dbo].[HelloWorld];

Результатом будет строка следующего вида:

    Id   Text
    ---  ----------------------------------------------
      1  Hello World from T2.DemoSourceDB!

Выполните команду чтения данных в БД-приемнике:

    SELECT * FROM [T2.DemoTargetDB].[dbo].[HelloWorld];

Результат будет пустым:

    Id   Text
    ---  ----------------------------------------------