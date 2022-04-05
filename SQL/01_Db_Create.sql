USE [master]

IF db_id('CoderCave') IS NULL
  CREATE DATABASE [CoderCave]
GO

USE [CoderCave]
GO

DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [InquireComment];
DROP TABLE IF EXISTS [AnswerComment];
DROP TABLE IF EXISTS [InquireTag];
DROP TABLE IF EXISTS [VoteInquire];
DROP TABLE IF EXISTS [VoteAnswer];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Answer];
DROP TABLE IF EXISTS [Inquire];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Email] nvarchar(255) UNIQUE NOT NULL,
  [DisplayName] nvarchar(255) UNIQUE NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [ImageURL] nvarchar(255),
  [Bio] text
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Name] nvarchar(25) NOT NULL
)
GO

CREATE TABLE [Inquire] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [Answer] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [InquireId] int NOT NULL,
  [Content] text NOT NULL,
  [IsSelected] bit NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [InquireComment] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Content] text NOT NULL,
  [CreatedAt] datetime NOT NULL,
  [InquireId] int NOT NULL
)
GO

CREATE TABLE [AnswerComment] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [Content] text NOT NULL,
  [CreatedAt] datetime NOT NULL,
  [AnswerId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Description] text NOT NULL
)
GO

CREATE TABLE [InquireTag] (
  [Id] int PRIMARY KEY IDENTITY,
  [InquireId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [VoteInquire] (
  [Id] int PRIMARY KEY IDENTITY,
  [Value] int NOT NULL,
  [InquireId] int NOT NULL
)
GO

CREATE TABLE [VoteAnswer] (
  [Id] int PRIMARY KEY IDENTITY,
  [Value] int NOT NULL,
  [AnswerId] int NOT NULL
)
GO

ALTER TABLE [UserType] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Inquire] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Answer] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Answer] ADD FOREIGN KEY ([InquireId]) REFERENCES [Inquire] ([Id])
GO

ALTER TABLE [InquireComment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [InquireComment] ADD FOREIGN KEY ([InquireId]) REFERENCES [Inquire] ([Id])
GO

ALTER TABLE [AnswerComment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [AnswerComment] ADD FOREIGN KEY ([AnswerId]) REFERENCES [Answer] ([Id])
GO

ALTER TABLE [InquireTag] ADD FOREIGN KEY ([InquireId]) REFERENCES [Inquire] ([Id])
GO

ALTER TABLE [InquireTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO

ALTER TABLE [VoteInquire] ADD FOREIGN KEY ([InquireId]) REFERENCES [Inquire] ([Id])
GO

ALTER TABLE [VoteAnswer] ADD FOREIGN KEY ([AnswerId]) REFERENCES [Answer] ([Id])
GO
