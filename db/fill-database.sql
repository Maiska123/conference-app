USE [calendarTest]
GO
/****** Object:  Table [dbo].[calendar_events]    Script Date: 18.11.2020 20.11.17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[calendar_events]
(
  [event_id] [int] IDENTITY(1,1) NOT NULL,
  [subject] [nvarchar](50) NOT NULL,
  [organizer] [nvarchar](50) NOT NULL,
  [description] [nvarchar](1000) NULL,
  [startTime] [datetime] NOT NULL,
  [endTime] [datetime] NOT NULL,
  [room] [int] NULL,
  PRIMARY KEY CLUSTERED
(
	[event_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[conference_rooms]    Script Date: 18.11.2020 20.11.17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[conference_rooms]
(
  [conferenceRoomId] [int] IDENTITY(1,1) NOT NULL,
  [resourceId] [nvarchar](50) NULL,
  [resourceName] [nvarchar](50) NULL,
  [capacity] [int] NULL,
  [roomInfo] [nvarchar](50) NULL,
  PRIMARY KEY CLUSTERED
(
	[conferenceRoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[event_participants]    Script Date: 18.11.2020 20.11.17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[event_participants]
(
  [id] [int] IDENTITY(1,1) NOT NULL,
  [event_id] [int] NOT NULL,
  [email] [nvarchar](50) NULL,
  [displayName] [nvarchar](50) NULL,
  PRIMARY KEY CLUSTERED
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[calendar_events] ON
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (1, N'Erilaisuus etätöissä -webinaarit', N'Paavo Kaurismäki', N'Erilaisuus etätöissä haastaa sekä työyhteisöjä että esimiehiä. Koronavirus on aiheuttanut usealla työpaikalla tilanteen, jossa etätyöt ovat välttämättömiä. Nämä webinaarit on suunniteltu tueksi ja avuksi erilaisuuden ymmärtämiseen ja huomioimiseen etätöiden näkökulmasta. Webinaarit sopivat niin etätöitä tekeville kuin etätyötä johtaville ja ohjaaville. Olitpa jo kokenut konkari tai vasta-alkaja, opit varmasti uutta itsestäsi ja muista!', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('07:30' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('08:00' AS DATETIME)) AS DateTime), 1)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (2, N'Samanlaisuus etätöissä -webinaarit', N'Antti Peltonen', N'Samanlaisuus etätöissä haastaa sekä työyhteisöjä että esimiehiä. Koronavirus on aiheuttanut usealla työpaikalla tilanteen, jossa etätyöt ovat välttämättömiä. Nämä webinaarit on suunniteltu tueksi ja avuksi samanlaisuuden ymmärtämiseen ja huomioimiseen etätöiden näkökulmasta. Webinaarit sopivat niin etätöitä tekeville kuin etätyötä johtaville ja ohjaaville. Olitpa jo kokenut konkari tai vasta-alkaja, opit varmasti uutta itsestäsi ja muista!', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('07:00' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('08:00' AS DATETIME)) AS DateTime), 2)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (3, N'Testi toisen huoneen ovella', N'Develoopperi Mijäs', N'Ihan puhdasta testausta tämä vain on...', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('08:00' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('09:30' AS DATETIME)) AS DateTime), 1)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (4, N'Lisää testiä...', N'Develoopperi Mijäs', N'...koska pitää olla tapahtumia', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('10:00' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('10:30' AS DATETIME)) AS DateTime), 1)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (5, N'Lisää testiä...', N'Develoopperi Mijäs', N'...koska pitää olla tapahtumia', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('10:30' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('12:00' AS DATETIME)) AS DateTime), 1)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (6, N'Lisää testiä...', N'Develoopperi Mijäs', N'...koska pitää olla tapahtumia, hah', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('12:30' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('12:45' AS DATETIME))AS DateTime), 2)
INSERT [dbo].[calendar_events]
  ([event_id], [subject], [organizer], [description], [startTime], [endTime], [room])
VALUES
  (7, N'Lisää testiä...', N'Develoopperi Mijäs', N'...koska pitää olla tapahtumia, hah', CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('19:00' AS DATETIME)) AS DateTime), CAST((DATEADD(DAY,DATEDIFF(DAY,0,GETDATE()),0) + CAST('20:30' AS DATETIME)) AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[calendar_events] OFF
SET IDENTITY_INSERT [dbo].[conference_rooms] ON

INSERT [dbo].[conference_rooms]
  ([conferenceRoomId], [resourceId], [resourceName], [capacity], [roomInfo])
VALUES
  (1, N'242', N'Koistinen', 6, N'No katoppa poekaa')
INSERT [dbo].[conference_rooms]
  ([conferenceRoomId], [resourceId], [resourceName], [capacity], [roomInfo])
VALUES
  (2, N'253', N'Parantainen', 8, N'Kukkuluuruu mitäpä sinne?')
SET IDENTITY_INSERT [dbo].[conference_rooms] OFF
SET IDENTITY_INSERT [dbo].[event_participants] ON

INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (1, 2, N'guywithnoemail@email.com', N'Im Ur Guy')
INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (2, 2, N'definitelycoder@email.com', N'I Can Solve Ur Mysteries')
INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (3, 2, N'fugdat@email.com', N'My Oh Mypleasure')
INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (4, 1, N'guywithnoemail@email.com', N'Im Ur Guy')
INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (5, 1, N'definitelycoder@email.com', N'I Can Solve Ur Mysteries')
INSERT [dbo].[event_participants]
  ([id], [event_id], [email], [displayName])
VALUES
  (6, 1, N'fugdat@email.com', N'My Oh Mypleasure')
SET IDENTITY_INSERT [dbo].[event_participants] OFF
ALTER TABLE [dbo].[calendar_events]  WITH CHECK ADD FOREIGN KEY([room])
REFERENCES [dbo].[conference_rooms] ([conferenceRoomId])
GO
ALTER TABLE [dbo].[calendar_events]  WITH CHECK ADD FOREIGN KEY([room])
REFERENCES [dbo].[conference_rooms] ([conferenceRoomId])
GO
ALTER TABLE [dbo].[event_participants]  WITH CHECK ADD FOREIGN KEY([event_id])
REFERENCES [dbo].[calendar_events] ([event_id])
GO
/****** Object:  Trigger [dbo].[tr_check_date_overlap]    Script Date: 18.11.2020 20.11.17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Miska H.
-- Create date: 10.11.2020
-- Description:	For overlapping inserts to room
-- =============================================
CREATE TRIGGER [dbo].[tr_check_date_overlap] ON [dbo].[calendar_events]
   INSTEAD OF INSERT
AS
BEGIN
  -- SET NOCOUNT ON added to prevent extra result sets from
  -- interfering with SELECT statements.
  SET NOCOUNT ON;

  --IF @@ROWCOUNT = 0
  --   RETURN

  DECLARE @subject nvarchar(50),
			@organizer nvarchar(50),
			@description nvarchar(1000),
			@startTime datetime,
			@endTime datetime,
			@room int,
			@event_id int;

  BEGIN TRY

      SELECT @subject = INSERTED.[subject],
    @organizer = INSERTED.[organizer],
    @description = INSERTED.[description],
    @startTime = INSERTED.[startTime],
    @endTime = INSERTED.[endTime],
    @room = INSERTED.[room],
    @event_id = INSERTED.[event_id]
  FROM INSERTED

        -- check for overlaps in table 'INSERTED'
        IF EXISTS(
              SELECT event_id
  FROM [calendar_events]
  WHERE
                  (@endTime > [startTime]
    AND [endTime] > @startTime)
    AND @room = [room])
    BEGIN
    DECLARE @message VARCHAR(200) = 'No way that is going in there Br0. There is something already between ' + convert(VARCHAR,@startTime,120) + ' - ' + convert(VARCHAR,@endTime,120)+'.';
    RAISERROR(@message,10,1);
  -- ROLLBACK TRANSACTION
  END
    ELSE BEGIN
    -- Jos kyseessä update, poistetaan aiempi insertti -> mahd. eriytetään
    --IF ((SELECT COUNT(*) FROM INSERTED) <> 0 AND (SELECT COUNT(*) FROM DELETED) <> 0)
    --BEGIN
    --	IF EXISTS(SELECT event_id FROM [calendar_events] WHERE event_id = (SELECT event_id FROM DELETED))
    --	BEGIN
    --		DELETE FROM [calendar_events] WHERE event_id = @event_id
    --	END
    --END
    BEGIN TRANSACTION

    IF @event_id IS NOT NULL AND @event_id > 0 BEGIN
      SET IDENTITY_INSERT [dbo].[calendar_events] ON
      INSERT INTO [dbo].[calendar_events]
        ([event_id],
        [subject]
        ,[organizer]
        ,[description]
        ,[startTime]
        ,[endTime]
        ,[room])
      VALUES
        (@event_id,
          @subject,
          @organizer,
          @description,
          @startTime,
          @endTime,
          @room);
      SET IDENTITY_INSERT [dbo].[calendar_events] OFF
    END ELSE BEGIN
      INSERT INTO [dbo].[calendar_events]
        ([subject]
        ,[organizer]
        ,[description]
        ,[startTime]
        ,[endTime]
        ,[room])
      VALUES
        (@subject,
          @organizer,
          @description,
          @startTime,
          @endTime,
          @room);
    END

    IF @@TRANCOUNT > 0
        COMMIT TRANSACTION;

  END

  END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
    END CATCH;
END
GO
ALTER TABLE [dbo].[calendar_events] ENABLE TRIGGER [tr_check_date_overlap]
GO
