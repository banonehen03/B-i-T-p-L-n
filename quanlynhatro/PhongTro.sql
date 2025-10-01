CREATE TABLE [dbo].[PhongTro] (
    [MaPhong] INT IDENTITY(1,1) PRIMARY KEY,
    [TenPhong] NVARCHAR(50) NOT NULL,
    [GiaPhong] DECIMAL(18, 2) NOT NULL,
    [DienTich] FLOAT NULL,
    [TrangThai] NVARCHAR(50) NULL  -- VD: 'Trống', 'Đang thuê', 'Đang sửa'
);
