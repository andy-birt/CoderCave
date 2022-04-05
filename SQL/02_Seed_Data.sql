USE [CoderCave]
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] ([Id], [Email], [DisplayName], [FirstName], [LastName], [ImageURL], [Bio]) VALUES 
(1, 'wiigiZFQwkQebRm2EdMA2lF653u1', 'admin@mail.com', 'admin', 'Adam', 'Inistrator', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', null),
(2, 'TolVGTUp0QQOgGRIaYnKlVxScpX2', 'author@mail.com', 'author', 'Arthur', 'Whinington', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', null),
(3, 'CqPziif2RWMNigWA0pxpxXVTXrz2', 'bob@mail.com', 'justbob', 'Bob', 'Jones', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', null),
(4, 'MZlkIwnNwifuVgZYbrC6UJlAR7j2', 'sally@mail.com', 'slaps4claps', 'Sally', 'Slappers', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', null),
(5, 'tzEvrR2987VZDyi9pDc7v7kcPnl2', 'dale@mail.com', 'dadimmadomeguy', 'Dale', 'Dimmadome', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', null)
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [UserId], [Name]) VALUES 
(1, 1, 'Admin'), (2, 2, 'Author'), (3, 3, 'Author'), (4, 4, 'Author'), (5, 5, 'Author');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [Inquire] ON
INSERT INTO [Inquire] ([Id], [UserId], [Title], [Content], [CreatedAt]) VALUES 

(1, 1, 'The First Problem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T17:59:39.043Z'),

(2, 2, 'Help me! HELP MEEE!!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T18:59:39.043Z'),

(3, 3, 'I am the Newbz', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T19:59:39.043Z')

SET IDENTITY_INSERT [Inquire] OFF

SET IDENTITY_INSERT [Answer] ON
INSERT INTO [Answer] ([Id], [UserId], [InquireId], [Content], [IsSelected], [CreatedAt]) VALUES 
(1, 2, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T17:59:39.043Z'),
(2, 3, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T18:59:39.043Z'),
(3, 4, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 1, '2022-04-01T19:59:39.043Z'),
(4, 5, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T20:59:39.043Z'),
(5, 2, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T17:59:39.043Z'),
(6, 3, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T18:59:39.043Z'),
(7, 4, 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 0, '2022-04-01T19:59:39.043Z'),
(8, 5, 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', 1, '2022-04-01T20:59:39.043Z')
SET IDENTITY_INSERT [Answer] OFF

SET IDENTITY_INSERT [InquireComment] ON
INSERT INTO [InquireComment] ([Id], [UserId], [InquireId], [Content], [CreatedAt]) VALUES 
(1, 2, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T17:59:39.043Z'),
(2, 3, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T18:59:39.043Z'),
(3, 4, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T19:59:39.043Z'),
(4, 5, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T20:59:39.043Z'),
(5, 2, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T17:59:39.043Z'),
(6, 3, 1, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T18:59:39.043Z'),
(7, 4, 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T19:59:39.043Z'),
(8, 5, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T20:59:39.043Z')
SET IDENTITY_INSERT [InquireComment] OFF

SET IDENTITY_INSERT [AnswerComment] ON
INSERT INTO [AnswerComment] ([Id], [UserId], [AnswerId], [Content], [CreatedAt]) VALUES 
(1, 2, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T17:59:39.043Z'),
(2, 3, 3, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T18:59:39.043Z'),
(3, 4, 2, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T19:59:39.043Z'),
(4, 5, 4, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T20:59:39.043Z'),
(5, 2, 8, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T17:59:39.043Z'),
(6, 3, 5, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T18:59:39.043Z'),
(7, 4, 7, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T19:59:39.043Z'),
(8, 5, 6, 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore', '2022-04-01T20:59:39.043Z')
SET IDENTITY_INSERT [AnswerComment] OFF

SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag] ([Id], [Name], [Description]) VALUES 
(1, 'Front End', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
(2, 'Back End', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
SET IDENTITY_INSERT [Tag] OFF

SET IDENTITY_INSERT [InquireTag] ON
INSERT INTO [InquireTag] ([Id], [TagId], [InquireId]) VALUES 
(1, 1, 1), (2, 2, 2), (3, 2, 3)
SET IDENTITY_INSERT [InquireTag] OFF

SET IDENTITY_INSERT [VoteInquire] ON
INSERT INTO [VoteInquire] ([Id], [Value], [InquireId]) VALUES 
(1, 1, 1), (2, -1, 2)
SET IDENTITY_INSERT [VoteInquire] OFF

SET IDENTITY_INSERT [VoteAnswer] ON
INSERT INTO [VoteAnswer] ([Id], [Value], [AnswerId]) VALUES 
(1, 1, 1), (2, 1, 1), (3, 1, 1)
SET IDENTITY_INSERT [VoteAnswer] OFF