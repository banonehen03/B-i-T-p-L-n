CREATE TABLE [dbo].[HoaDon] (
    [MaHoaDon] INT IDENTITY(1,1) PRIMARY KEY,
    [MaHopDong] INT NOT NULL,
    [Thang] INT NOT NULL,
    [Nam] INT NOT NULL,
    [SoDien] INT NULL,
    [SoNuoc] INT NULL,
    [TienDien] DECIMAL(18, 2) NULL,
    [TienNuoc] DECIMAL(18, 2) NULL,
    [TienPhong] DECIMAL(18, 2) NULL,
    [TongTien] AS (ISNULL([TienDien],0) + ISNULL([TienNuoc],0) + ISNULL([TienPhong],0)) PERSISTED,

    CONSTRAINT [FK_HoaDon_HopDong] FOREIGN KEY ([MaHopDong]) 
        REFERENCES [dbo].[HopDong]([MaHopDong])
);
