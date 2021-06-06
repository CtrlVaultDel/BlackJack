Use [master]

IF db_id('BlackJack') IS NULL
	CREATE DATABASE [BlackJack]
GO

USE [BlackJack]
GO

DROP TABLE IF EXISTS [UserProfile];
GO


CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY,
  [username] varchar(255) UNIQUE NOT NULL,
  [email] varchar(255) UNIQUE NOT NULL,
  [password] varchar(255) NOT NULL,
  [firebaseId] varchar(28) UNIQUE NOT NULL,
  [gamesPlayed] int NOT NULL DEFAULT (0),
  [gamesWon] int NOT NULL DEFAULT (0),
  [money] int NOT NULL DEFAULT (1000)
)
GO