CREATE TABLE [dbo].[HopDong] (
    [MaHopDong] INT IDENTITY(1,1) PRIMARY KEY,
    [MaNguoiThue] INT NOT NULL,
    [MaPhong] INT NOT NULL,
    [NgayBatDau] DATE NOT NULL,
    [NgayKetThuc] DATE NULL,
    [GhiChu] NVARCHAR(200) NULL,

    CONSTRAINT [FK_HopDong_NguoiThue] FOREIGN KEY ([MaNguoiThue]) 
        REFERENCES [dbo].[NguoiThue]([MaNguoiThue]),

    CONSTRAINT [FK_HopDong_PhongTro] FOREIGN KEY ([MaPhong]) 
        REFERENCES [dbo].[PhongTro]([MaPhong])
);
