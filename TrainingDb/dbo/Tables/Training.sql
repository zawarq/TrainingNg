CREATE TABLE [dbo].[Training] (
    [Id]    BIGINT         IDENTITY (1, 1) NOT NULL,
    [Name]  NVARCHAR (200) NOT NULL,
    [Start] DATE           NOT NULL,
    [End]   DATE           NOT NULL,
    CONSTRAINT [PK_Training] PRIMARY KEY CLUSTERED ([Id] ASC)
);

