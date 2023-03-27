 SELECT TOP 1
      [resourceName] AS Name
      ,[roomInfo] AS Subtitle
  FROM [calendarTest].[dbo].[conference_rooms]
  WHERE   [calendarTest].[dbo].[conference_rooms].[conferenceRoomId] = @room

