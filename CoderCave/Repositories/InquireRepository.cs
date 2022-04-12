using System.Collections.Generic;
using CoderCave.Models;
using Microsoft.Extensions.Configuration;
using CoderCave.Utils;
using Microsoft.Data.SqlClient;

namespace CoderCave.Repositories
{
    public class InquireRepository : BaseRepository, IInquireRepository
    {
        public InquireRepository(IConfiguration configuration) : base(configuration) { }

        public Result Search(string q, int p, int l)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = $@"
                        SELECT i.Id AS InquireId, i.UserId AS InquireUserId, i.Title, i.Content AS InquireContent, 
                               CAST(i.Content AS NVARCHAR(255)) AS InquireContentSummary, i.CreatedAt AS InquireCreationDate,
                               iu.DisplayName AS InquireUserDisplayName
                        FROM Inquire i
                            LEFT JOIN [User] iu ON i.UserId = iu.Id
                        WHERE i.Title LIKE @q OR i.Content LIKE @q
                        ORDER BY i.CreatedAt DESC
                            OFFSET {(p * l - l)} ROWS
                            FETCH NEXT {l} ROWS ONLY
                    ";

                    DbUtils.AddParameter(cmd, "@q", $"%{q}%");
                    DbUtils.AddParameter(cmd, "@l", l);

                    var reader = cmd.ExecuteReader();

                    Inquire inquire = null;

                    var inquiries = new List<Inquire>();

                    while (reader.Read())
                    {

                        if (!DbUtils.IsDbNull(reader, "InquireId") && !inquiries.Exists(i => i.Id == DbUtils.GetInt(reader, "InquireId")))
                        {
                            inquire = NewSearchResultFromReader(reader);

                            inquiries.Add(inquire);
                        }
                    }

                    reader.Close();

                    cmd.CommandText = $@"
                        SELECT COUNT(*) AS ResultsCount 
                            FROM Inquire i
                        WHERE i.Title LIKE @q1 OR i.Content LIKE @q1
                    ";

                    DbUtils.AddParameter(cmd, "@q1", $"%{q}%");
                    reader = cmd.ExecuteReader();

                    Result result = null;

                    if (reader.Read())
                    {
                        result = new Result()
                        {
                            Data = inquiries,
                            Count = DbUtils.GetInt(reader, "ResultsCount"),
                            StartValue = p * l - 9,
                            EndValue = p * l < DbUtils.GetInt(reader, "ResultsCount") ? p * l : DbUtils.GetInt(reader, "ResultsCount")
                        };
                    }

                    reader.Close();
                    return result;
                }
            }
        }

        public List<Inquire> GetInquiriesByTag(int tagId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id AS TagId, t.[Name] AS TagName, CAST(t.Description AS NVARCHAR(MAX)) AS TagDescription,
                                i.Id AS InquireId, i.UserId AS InquireUserId, i.Title, CAST(i.Content AS NVARCHAR(255)) AS InquireContentSummary, i.CreatedAt AS InquireCreationDate,
                                iu.DisplayName AS InquireUserDisplayName, iu.ImageURL AS InquireUserImageURL,
                                COUNT(DISTINCT vi.Id) AS InquireVotesCount,
                                COUNT(DISTINCT ic.Id) AS InquireCommentsCount,
                                COUNT(DISTINCT a.Id) AS AnswersCount
                            FROM Tag t
                            LEFT JOIN InquireTag it ON t.Id = it.TagId
                            LEFT JOIN Inquire i ON i.Id = it.InquireId
                            LEFT JOIN VoteInquire vi ON i.Id = vi.InquireId
                            LEFT JOIN InquireComment ic ON i.Id = ic.InquireId
                            LEFT JOIN [User] iu ON iu.Id = i.UserId 
	                        LEFT JOIN Answer a ON i.Id = a.InquireId
                        WHERE t.Id = @TagId
                        GROUP BY i.Id, i.UserId, i.Title, i.CreatedAt, iu.DisplayName, iu.ImageURL, vi.InquireId, a.InquireId, ic.InquireId, t.Id, t.[Name], CAST(t.Description AS NVARCHAR(MAX)), CAST(i.Content AS NVARCHAR(255))
                    ";

                    DbUtils.AddParameter(cmd, "@TagId", tagId);

                    var reader = cmd.ExecuteReader();

                    var inquiries = new List<Inquire>();

                    while (reader.Read())
                    {
                        if (!DbUtils.IsDbNull(reader, "InquireId"))
                        {
                            inquiries.Add(NewInquireSummaryFromReader(reader));
                        }
                    }

                    reader.Close();
                    return inquiries;
                }
            }
        }

        public Inquire GetInquirie(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @$"
                        {BeefySelect()}
                        WHERE i.Id = @Id
                        ORDER BY a.IsSelected DESC, AnswerScore DESC
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Inquire inquire = null;

                    var inquireComments = new List<InquireComment>();

                    var inquireAnswers = new List<Answer>();

                    var answerComments = new List<AnswerComment>();

                    var inquireTags = new List<Tag>();

                    while (reader.Read())
                    {
                        if (inquire == null)
                        {
                            inquire = NewInquireFromReader(reader);
                        }

                        if (!DbUtils.IsDbNull(reader, "InquireCommentId") && !inquireComments.Exists(ic => ic.Id == DbUtils.GetInt(reader, "InquireCommentId")))
                        {
                            inquireComments.Add(NewInquireCommentFromReader(reader));
                        }

                        if (!DbUtils.IsDbNull(reader, "AnswerId") && !inquireAnswers.Exists(ia => ia.Id == DbUtils.GetInt(reader, "AnswerId")))
                        {
                            inquireAnswers.Add(NewAnswerFromReader(reader));
                        }

                        if (!DbUtils.IsDbNull(reader, "TagId") && !inquireTags.Exists(it => it.Id == DbUtils.GetInt(reader, "TagId")))
                        {
                            inquireTags.Add(NewTagFromReader(reader));
                        }

                        if (!DbUtils.IsDbNull(reader, "AnswerCommentId") && !answerComments.Exists(ac => ac.Id == DbUtils.GetInt(reader, "AnswerCommentId")))
                        {
                            answerComments.Add(NewAnswerCommentFromReader(reader));
                        }
                    }

                    foreach (var answer in inquireAnswers)
                    {
                        answerComments.ForEach(ac => { 
                            if (ac.AnswerId == answer.Id)
                            {
                                answer.Comments.Add(ac);
                            }
                        });
                    }

                    inquire.Comments = inquireComments;
                    inquire.Answers = inquireAnswers;
                    inquire.Tags = inquireTags;

                    reader.Close();
                    return inquire;
                }
            }
        }

        private Inquire NewSearchResultFromReader(SqlDataReader r)
        {
            return new Inquire()
            {
                Id = DbUtils.GetInt(r, "InquireId"),
                UserId = DbUtils.GetInt(r, "InquireUserId"),
                Title = DbUtils.GetString(r, "Title"),
                Content = DbUtils.GetString(r, "InquireContent"),
                ContentSummary = DbUtils.GetString(r, "InquireContentSummary"),
                CreatedAt = DbUtils.GetDateTime(r, "InquireCreationDate"),
                AuthorName = DbUtils.GetString(r, "InquireUserDisplayName")
            };
        }

        private Inquire NewInquireFromReader(SqlDataReader r)
        {
            return new Inquire()
            {
                Id = DbUtils.GetInt(r, "InquireId"),
                UserId = DbUtils.GetInt(r, "InquireUserId"),
                Title = DbUtils.GetString(r, "Title"),
                Content = DbUtils.GetString(r, "InquireContent"),
                ContentSummary = DbUtils.GetString(r, "InquireContentSummary"),
                CreatedAt = DbUtils.GetDateTime(r, "InquireCreationDate"),
                AuthorName = DbUtils.GetString(r, "InquireUserDisplayName"),
                AuthorImageURL = DbUtils.GetString(r, "InquireUserImageURL"),
                AnswersCount = DbUtils.GetInt(r, "AnswersCount"),
                CommentsCount = DbUtils.GetInt(r, "InquireCommentsCount"),
                VotesCount = DbUtils.GetInt(r, "InquireVotesCount"),
                Score = DbUtils.GetInt(r, "InquireScore")
            };
        }

        private Inquire NewInquireSummaryFromReader(SqlDataReader r)
        {
            return new Inquire()
            {
                Id = DbUtils.GetInt(r, "InquireId"),
                UserId = DbUtils.GetInt(r, "InquireUserId"),
                Title = DbUtils.GetString(r, "Title"),
                ContentSummary = DbUtils.GetString(r, "InquireContentSummary"),
                CreatedAt = DbUtils.GetDateTime(r, "InquireCreationDate"),
                AuthorName = DbUtils.GetString(r, "InquireUserDisplayName"),
                AuthorImageURL = DbUtils.GetString(r, "InquireUserImageURL"),
                AnswersCount = DbUtils.GetInt(r, "AnswersCount"),
                CommentsCount = DbUtils.GetInt(r, "InquireCommentsCount"),
                VotesCount = DbUtils.GetInt(r, "InquireVotesCount")
            };
        }

        private Answer NewAnswerFromReader(SqlDataReader r)
        {
            return new Answer()
            {
                Id = DbUtils.GetInt(r, "AnswerId"),
                UserId = DbUtils.GetInt(r, "AnswerUserId"),
                InquireId = DbUtils.GetInt(r, "InquireId"),
                AuthorName = DbUtils.GetString(r, "AnswerUserDisplayName"),
                AuthorImageURL = DbUtils.GetString(r, "AnswerUserImageURL"),
                Content = DbUtils.GetString(r, "AnswerContent"),
                IsSelected = DbUtils.GetBool(r, "IsSelected"),
                CreatedAt = DbUtils.GetDateTime(r, "AnswerCreationDate"),
                VotesCount = DbUtils.GetInt(r, "AnswerVotesCount"),
                Score = DbUtils.GetInt(r, "AnswerScore")
            };
        }

        private InquireComment NewInquireCommentFromReader(SqlDataReader r)
        {
            return new InquireComment()
            {
                Id = DbUtils.GetInt(r, "InquireCommentId"),
                UserId = DbUtils.GetInt(r, "InquireCommentUserId"),
                AuthorName = DbUtils.GetString(r, "InquireCommentUserDisplayName"),
                AuthorImageURL = DbUtils.GetString(r, "InquireCommentUserImageURL"),
                Content = DbUtils.GetString(r, "InquireCommentContent"),
                InquireId = DbUtils.GetInt(r, "InquireId"),
                CreatedAt = DbUtils.GetDateTime(r, "InquireCommentCreationDate")
            };
        }

        private AnswerComment NewAnswerCommentFromReader(SqlDataReader r)
        {
            return new AnswerComment()
            {
                Id = DbUtils.GetInt(r, "AnswerCommentId"),
                UserId = DbUtils.GetInt(r, "AnswerCommentUserId"),
                AuthorName = DbUtils.GetString(r, "AnswerCommentUserDisplayName"),
                AuthorImageURL = DbUtils.GetString(r, "AnswerCommentUserImageURL"),
                Content = DbUtils.GetString(r, "AnswerCommentContent"),
                AnswerId = DbUtils.GetInt(r, "AnswerId"),
                CreatedAt = DbUtils.GetDateTime(r, "AnswerCommentCreationDate")
            };
        }

        private Tag NewTagFromReader(SqlDataReader r)
        {
            return new Tag()
            {
                Id = DbUtils.GetInt(r, "TagId"),
                Name = DbUtils.GetString(r, "TagName"),
                Description = DbUtils.GetString(r, "TagDescription")
            };
        }

        private string BeefySelect()
        {
            return @"
                        SELECT t.Id AS TagId, t.[Name] AS TagName, CAST(t.Description AS NVARCHAR(MAX)) AS TagDescription,
                               i.Id AS InquireId, i.UserId AS InquireUserId, i.Title, CAST(i.Content AS NVARCHAR(MAX)) AS InquireContent, CAST(i.Content AS NVARCHAR(255)) AS InquireContentSummary, i.CreatedAt AS InquireCreationDate,
                               iu.DisplayName AS InquireUserDisplayName, iu.ImageURL AS InquireUserImageURL,
                               ic.Id AS InquireCommentId, CAST(ic.Content AS NVARCHAR(MAX)) AS InquireCommentContent, ic.CreatedAt AS InquireCommentCreationDate,
                               icu.Id AS InquireCommentUserId, icu.DisplayName AS InquireCommentUserDisplayName, icu.ImageURL AS InquireCommentUserImageURL,
                               a.Id AS AnswerId, a.UserId AS AnswerUserId, CAST(a.Content AS NVARCHAR(MAX)) AS AnswerContent, a.CreatedAt AS AnswerCreationDate, a.IsSelected,
                               ac.Id AS AnswerCommentId, CAST(ac.Content AS NVARCHAR(MAX)) AS AnswerCommentContent, ac.CreatedAt AS AnswerCommentCreationDate,
                               au.DisplayName AS AnswerUserDisplayName, au.ImageURL AS AnswerUserImageURL,
                               acu.Id AS AnswerCommentUserId, acu.DisplayName AS AnswerCommentUserDisplayName, acu.ImageURL AS AnswerCommentUserImageURL,
                               ISNULL(vi.InquireScore, 0) AS InquireScore,
                               ISNULL(va.AnswerScore, 0) AS AnswerScore,
                               ISNULL(icc.InquireCommentsCount, 0) AS InquireCommentsCount,
                               ISNULL(act.AnswersCount, 0) AS AnswersCount,
                               ISNULL(vic.VotesCount, 0) AS InquireVotesCount,
                               ISNULL(vac.VotesCount, 0) AS AnswerVotesCount
                            FROM Inquire i
                            LEFT JOIN InquireTag it ON i.Id = it.InquireId
                            LEFT JOIN Tag t ON t.Id = it.TagId
                            LEFT JOIN InquireComment ic ON i.Id = ic.InquireId
                            LEFT JOIN [User] iu ON iu.Id = i.UserId 
                            LEFT JOIN [User] icu ON icu.Id = ic.UserId
	                        LEFT JOIN Answer a ON i.Id = a.InquireId
                            LEFT JOIN AnswerComment ac ON a.Id = ac.AnswerId
                            LEFT JOIN [User] au ON au.Id = a.UserId
                            LEFT JOIN [User] acu ON acu.Id = ac.UserId
                            LEFT JOIN
                                (
                                    SELECT InquireId, SUM([Value]) AS InquireScore
                                    FROM VoteInquire
                                    GROUP BY InquireId
                                ) vi ON i.Id = vi.InquireId
                            LEFT JOIN
                                (
                                    SELECT AnswerId, SUM([Value]) AS AnswerScore
                                    FROM VoteAnswer
                                    GROUP BY AnswerId
                                ) va ON a.Id = va.AnswerId
                            LEFT JOIN 
                                (
                                    SELECT InquireId, COUNT(InquireId) AS InquireCommentsCount
                                    FROM InquireComment
                                    GROUP BY InquireId
                                ) icc ON icc.InquireId = i.Id
                            LEFT JOIN
                                (
                                    SELECT InquireId, COUNT(InquireId) AS AnswersCount
                                    FROM Answer
                                    GROUP BY InquireId
                                ) act ON act.InquireId = i.Id
                            LEFT JOIN
                                (
                                    SELECT InquireId, COUNT(DISTINCT Id) AS VotesCount
                                    FROM VoteInquire
                                    GROUP BY InquireId
                                ) vic ON i.Id = vic.InquireId
                            LEFT JOIN
                                (
                                    SELECT AnswerId, COUNT(DISTINCT Id) AS VotesCount
                                    FROM VoteAnswer
                                    GROUP BY AnswerId
                                ) vac ON a.Id = vac.AnswerId
                    ";
        }
    }
}
