USE [CoderCave]
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] ([Id], [FirebaseUserId], [Email], [DisplayName], [FirstName], [LastName], [ImageURL], [Bio], [IsActive]) VALUES 
(1, 'wiigiZFQwkQebRm2EdMA2lF653u1', 'admin@mail.com', 'admin', 'Adam', 'Inistrator', 'https://robohash.org/1.png?size=150x150&set=set1', null, 1),
(2, 'TolVGTUp0QQOgGRIaYnKlVxScpX2', 'author@mail.com', 'author', 'Arthur', 'Whinington', 'https://robohash.org/2.png?size=150x150&set=set1', null, 1),
(3, 'CqPziif2RWMNigWA0pxpxXVTXrz2', 'bob@mail.com', 'justbob', 'Bob', 'Jones', 'https://robohash.org/3.png?size=150x150&set=set1', null, 1),
(4, 'MZlkIwnNwifuVgZYbrC6UJlAR7j2', 'sally@mail.com', 'slaps4claps', 'Sally', 'Slappers', 'https://robohash.org/youhey.png?size=150x150&set=set1', null, 1),
(5, 'i3be7hAQvVVaKJu24lhwRsEndoB3', 'brent@mail.com', 'bgriffz', 'Brent', 'Griffith', 'https://robohash.org/weed.png?size=150x150&set=set1', null, 1),
(6, 'i1XMIQVDdoMx84xu8TGK9fVdeez1', 'steven@mail.com', 'awesomepossum', 'Steven', 'Powers', 'https://robohash.org/warm.png?size=150x150&set=set1', null, 1),
(7, 'espzGToPUHgq7a7BaW5L7bPRtCt2', 'nick@mail.com', 'eyeh8tomhanks', 'Nick', 'Perry', 'https://robohash.org/newforce.png?size=150x150&set=set1', null, 1),
(8, 'TrZ86avkBZRPmpZCh6GOK1dQwSj1', 'jordan@mail.com', 'manjordan', 'Jordan', 'Twyman', 'https://robohash.org/imdone.png?size=150x150&set=set1', null, 1),
(9, '8XfFrNXRcxTCKaBZWbefXakOUNi1', 'cameron@mail.com', 'cammerz', 'Cameron', 'Resuta', 'https://robohash.org/skyrim.png?size=150x150&set=set1', null, 1),
(10, 'tjQSXDYPeeSPJeLjZUIalSY1q013', 'jonah@mail.com', 'ramjam', 'Jonah', 'Moore', 'https://robohash.org/bloody.png?size=150x150&set=set1', null, 1),
(11, 'dVfeESf3ArOveGavVCydwBi486W2', 'mel@mail.com', 'tipsycattypewriter', 'MelQuan', 'Green', 'https://robohash.org/magic.png?size=150x150&set=set1', null, 1),
(12, 'Uze8WKYOjlQi4ZAzJ5J1lqcB6yq2', 'gary@mail.com', 'ironman', 'Gary', 'Clayton', 'https://robohash.org/necro.png?size=150x150&set=set1', null, 1),
(13, 'j8dOY8CND1XWtSSEosPtHNC644s2', 'aki@mail.com', 'bonzaidreams', 'Aki', 'Endo', 'https://robohash.org/cat.png?size=150x150&set=set1', null, 1),
(14, 'vyxxDssA5eQKJv5Dxd2z2ctKQSS2', 'amanda@mail.com', 'starfox', 'Amanda', 'Ball', 'https://robohash.org/teapot.png?size=150x150&set=set1', null, 1),
(15, 'PEQMX2IYHGa1CZHyWAR0EgVHwtx2', 'heaven@mail.com', 'superchargerheaven', 'Heaven', 'Burdette', 'https://robohash.org/music.png?size=150x150&set=set1', null, 1),
(16, 'IVqIQ5syOfOIQWWVa8nQpK8XMAc2', 'brandon@mail.com', 'digregz', 'Brandon', 'Di Gregorio', 'https://robohash.org/artificial.png?size=150x150&set=set1', null, 1),
(17, 'II0mOi7bqUU8FTlh0IK1njM6aAq2', 'nima@mail.com', 'elbandidochimichanga', 'Nima', 'Shahab Shahmir', 'https://robohash.org/intelligence.png?size=150x150&set=set1', null, 1),
(18, 'WNsjpwXt8RhpUClOKeSmtU0LI5p1', 'brandi@mail.com', 'breakerofthings', 'Brandi', 'Dimitroff', 'https://robohash.org/what.png?size=150x150&set=set1', null, 1),
(19, 'MVwIqGD9u8RfcvSCVhotoV7DRnD2', 'andy@mail.com', 'birtman', 'Andy', 'Birt', 'https://robohash.org/s.png?size=150x150&set=set1', null, 1)
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [UserId], [Name]) VALUES 
(1, 1, 'Admin'), (2, 2, 'Author'), (3, 3, 'Author'), (4, 4, 'Author'), 
(5, 5, 'Author'), (6, 6, 'Author'), (7, 7, 'Author'), (8, 8, 'Author'), 
(9, 9, 'Author'), (10, 10, 'Author'), (11, 11, 'Author'), (12, 12, 'Author'), 
(13, 13, 'Author'), (14, 14, 'Author'), (15, 15, 'Author'), (16, 16, 'Author'), 
(17, 17, 'Author'), (18, 18, 'Author'), (19, 19, 'Author');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [Inquire] ON
INSERT INTO [Inquire] ([Id], [UserId], [Title], [Content], [CreatedAt], [IsArchived]) VALUES 

(1, 1, 'The First Problem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T17:59:39.043Z', 0),

(2, 2, 'Help me! HELP MEEE!!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T18:59:39.043Z', 0),

(3, 3, 'I am the Newbz', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-01T19:59:39.043Z', 0),

(4, 8, 'Errooz wahhh!!!!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-11T17:59:39.043Z', 0),

(5, 4, 'How do I do a thing?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-12T18:59:39.043Z', 0),

(6, 10, 'What is the answer?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-12T19:59:39.043Z', 0),

(7, 14, 'Well well well, another problem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-13T17:59:39.043Z', 0),

(8, 13, 'Stuck between a rock and a hard place', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-13T18:59:39.043Z', 0),

(9, 13, 'OH OH ANOTHER QUESTION', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-13T19:59:39.043Z', 0),

(10, 16, 'My rig is on fire', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-14T17:59:39.043Z', 0),

(11, 9, 'I have 27 errors', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-14T18:59:39.043Z', 0),

(12, 7, 'Infinite loops', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-14T19:59:39.043Z', 0),

(13, 5, 'I can''t iterate cow bell', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-15T17:59:39.043Z', 0),

(14, 2, 'Help me! HELP MEEE!! again...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-15T18:59:39.043Z', 0),

(15, 3, 'I am the less Newbz', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-15T19:59:39.043Z', 0),

(16, 11, 'The Not First Problem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-16T17:59:39.043Z', 0),

(17, 6, 'My code fell down and it can''t get up', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-16T18:59:39.043Z', 0),

(18, 12, 'How do I un-rm -rf', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-16T19:59:39.043Z', 0),

(19, 11, 'My code is crying I think it''s hungry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-17T17:59:39.043Z', 0),

(20, 14, 'I nerfed it', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-17T18:59:39.043Z', 0),

(21, 17, 'I''m having this problem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-17T19:59:39.043Z', 0),

(22, 10, 'Is this even possbile?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-18T17:59:39.043Z', 0),

(23, 9, 'Well, now what?', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-18T18:59:39.043Z', 0),

(24, 19, 'This is not how I planned today', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-18T19:59:39.043Z', 0),

(25, 14, 'I created chaos but not as a feature', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-19T17:59:39.043Z', 0),

(26, 18, 'OH NO NOT AGAIN!!!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-19T18:59:39.043Z', 0),

(27, 15, 'Well it''s dead', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
'2022-04-19T19:59:39.043Z', 0)

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
(1, 'HTML', 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.

HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as <img /> and <input /> directly introduce content into the page. Other tags such as <p> surround and provide information about document text and may include other tags as sub-elements. Browsers do not display the HTML tags but use them to interpret the content of the page.

HTML can embed programs written in a scripting language such as JavaScript, which affects the behavior and content of web pages. Inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), former maintainer of the HTML and current maintainer of the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997. A form of HTML, known as HTML5, is used to display video and audio, primarily using the <canvas> element, in collaboration with javascript.

'),
(2, 'CSS', 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.

CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts. This separation can improve content accessibility; provide more flexibility and control in the specification of presentation characteristics; enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, which reduces complexity and repetition in the structural content; and enable the .css file to be cached to improve the page load speed between the pages that share the file and its formatting.

Separation of formatting and content also makes it feasible to present the same markup page in different styles for different rendering methods, such as on-screen, in print, by voice (via speech-based browser or screen reader), and on Braille-based tactile devices. CSS also has rules for alternate formatting if the content is accessed on a mobile device.

The name cascading comes from the specified priority scheme to determine which style rule applies if more than one rule matches a particular element. This cascading priority scheme is predictable.

The CSS specifications are maintained by the World Wide Web Consortium (W3C). Internet media type (MIME type) text/css is registered for use with CSS by RFC 2318 (March 1998). The W3C operates a free CSS validation service for CSS documents.[5]

In addition to HTML, other markup languages support the use of CSS including XHTML, plain XML, SVG, and XUL.'),
(3, 'JavaScript', 'JavaScript (/ˈdʒɑːvəskrɪpt/), often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users'' devices.

JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).

The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.

JavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.

Although Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.'),
(4, 'Git', 'Git (/ɡɪt/) is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows (thousands of parallel branches running on different systems).

Git was originally authored by Linus Torvalds in 2005 for development of the Linux kernel, with other kernel developers contributing to its initial development. Since 2005, Junio Hamano has been the core maintainer. As with most other distributed version control systems, and unlike most client–server systems, every Git directory on every computer is a full-fledged repository with complete history and full version-tracking abilities, independent of network access or a central server. Git is free and open-source software distributed under the GPL-2.0-only license.'),
(5, 'Bash', 'Bash is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell. First released in 1989, it has been used as the default login shell for most Linux distributions. A version is also available for Windows 10 via the Windows Subsystem for Linux. It is also the default user shell in Solaris 11. Bash was also the default shell in all versions of Apple macOS prior to the 2019 release of macOS Catalina, which changed the default shell to zsh, although Bash remains available as an alternative shell.

Bash is a command processor that typically runs in a text window where the user types commands that cause actions. Bash can also read and execute commands from a file, called a shell script. Like most Unix shells, it supports filename globbing (wildcard matching), piping, here documents, command substitution, variables, and control structures for condition-testing and iteration. The keywords, syntax, dynamically scoped variables and other basic features of the language are all copied from sh. Other features, e.g., history, are copied from csh and ksh. Bash is a POSIX-compliant shell, but with a number of extensions.

The shell''s name is an acronym for Bourne Again Shell, a pun on the name of the Bourne shell that it replaces and the notion of being "born again".'),
(6, 'React', 'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality.'),
(7, 'C#', 'C# (/si ʃɑːrp/ see sharp) is a general-purpose, multi-paradigm programming language. C# encompasses static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines.

C# was designed by Anders Hejlsberg from Microsoft in 2000 and was later approved as an international standard by Ecma (ECMA-334) in 2002 and ISO (ISO/IEC 23270) in 2003. Microsoft introduced C# along with .NET Framework and Visual Studio, both of which were closed-source. At the time, Microsoft had no open-source products. Four years later, in 2004, a free and open-source project called Mono began, providing a cross-platform compiler and runtime environment for the C# programming language. A decade later, Microsoft released Visual Studio Code (code editor), Roslyn (compiler), and the unified .NET platform (software framework), all of which support C# and are free, open-source, and cross-platform. Mono also joined Microsoft but was not merged into .NET.

As of 2021, the most recent version of the language is C# 10.0, which was released in 2021 in .NET 6.0.'),
(8, '.NET', '.NET (pronounced as "dot net"; previously named .NET Core) is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems. It is a cross-platform successor to .NET Framework. The project is primarily developed by Microsoft employees by way of the .NET Foundation, and released under the MIT License.')
SET IDENTITY_INSERT [Tag] OFF

SET IDENTITY_INSERT [InquireTag] ON
INSERT INTO [InquireTag] ([Id], [TagId], [InquireId]) VALUES 
(1, 1, 1), (2, 2, 2), (3, 3, 3),
(4, 2, 1), (5, 3, 2), (6, 4, 3),
(7, 3, 1), (8, 4, 2), (9, 5, 3),
(10, 4, 4), (11, 5, 4), (12, 6, 4),
(13, 4, 5), (14, 5, 5), (15, 6, 5),
(16, 4, 6), (17, 5, 6), (18, 6, 6),
(19, 7, 7), (20, 8, 7), (21, 8, 10),
(22, 7, 8), (23, 8, 8), (24, 8, 11),
(25, 1, 9), (26, 2, 19), (27, 3, 3),
(28, 1, 12), (29, 2, 22), (30, 3, 13),
(31, 1, 13), (32, 2, 23), (33, 3, 13),
(34, 4, 1), (35, 5, 16), (36, 6, 23),
(37, 4, 11), (38, 5, 17), (39, 6, 13),
(40, 4, 12), (41, 5, 18), (42, 6, 23),
(43, 7, 13), (44, 7, 26), (45, 8, 13),
(46, 7, 14), (47, 7, 27), (48, 8, 23)
SET IDENTITY_INSERT [InquireTag] OFF

SET IDENTITY_INSERT [VoteInquire] ON
INSERT INTO [VoteInquire] ([Id], [Value], [InquireId]) VALUES 
(1, 1, 1), (2, -1, 2)
SET IDENTITY_INSERT [VoteInquire] OFF

SET IDENTITY_INSERT [VoteAnswer] ON
INSERT INTO [VoteAnswer] ([Id], [Value], [AnswerId]) VALUES 
(1, 1, 1), (2, 1, 1), (3, 1, 1)
SET IDENTITY_INSERT [VoteAnswer] OFF
