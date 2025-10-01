CREATE TABLE [dbo].[NguoiThue] (
    [MaNguoiThue] INT IDENTITY(1,1) PRIMARY KEY,
    [HoTen] NVARCHAR(100) NOT NULL,
    [SDT] VARCHAR(15),
    [CMND] VARCHAR(20),
    [DiaChi] NVARCHAR(200)
);