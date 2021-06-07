Use [master]

IF db_id('BlackJack') IS NULL
    CREATE DATABASE [BlackJack]
GO

USE [BlackJack]
GO

DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
    [id] integer PRIMARY KEY IDENTITY,
    [firebaseId] nvarchar (28)  NOT NULL,
    [email] nvarchar (255) NOT NULL,
    [username] nvarchar (255) NOT NULL,
    [gamesPlayed] integer DEFAULT ((0)) NOT NULL,
    [gamesWon] integer DEFAULT ((0)) NOT NULL,
    [money] integer DEFAULT ((1000)) NOT NULL,
    UNIQUE NONCLUSTERED ([email] ASC),
    UNIQUE NONCLUSTERED ([username] ASC),
    CONSTRAINT [UQ_FirebaseId] UNIQUE NONCLUSTERED ([firebaseId] ASC)
)
GO