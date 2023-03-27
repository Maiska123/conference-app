SELECT
        [email] AS Title
      ,[displayName] AS Name
  FROM [calendarTest].[dbo].[event_participants]
WHERE   [calendarTest].[dbo].[event_participants].[event_id] = @eventId
ORDER BY
        [displayName];
