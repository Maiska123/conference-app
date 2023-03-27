SELECT [event_id],
      [Subject]
      ,[Organizer]
      ,[Description]
      ,[StartTime]
      ,[EndTime]
      --,[resourceName]
FROM [calendarTest].[dbo].[calendar_events]
	INNER JOIN [calendarTest].[dbo].conference_rooms 
	ON [calendar_events].[room] = [calendarTest].[dbo].[conference_rooms].[conferenceRoomId]    
WHERE   [calendarTest].[dbo].[calendar_events].[room] = @room
      -- Only display events from current date
      AND (
           ([startTime] >= CAST(GETDATE() AS DATE)
            AND [startTime] < DATEADD(DD, 1, CAST(GETDATE() AS DATE)))
      )
ORDER BY
        [startTime];
