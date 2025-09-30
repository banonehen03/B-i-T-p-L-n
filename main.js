// Toggle sidebar
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Hàm đổi nội dung
function loadContent(title, content) {
  mainContent.innerHTML = `<h2>${title}</h2>${content}`;
}

// Dashboard
document.getElementById("menu-dashboard").addEventListener("click", () => {
  loadContent("Dashboard", "<p>Đây là trang tổng quan của hệ thống.</p>");
});

// Quản lý phòng
document.getElementById("menu-rooms").addEventListener("click", () => {
  loadContent("Danh sách phòng", `
    <div class="room-list">
      <div class="room-card">
        <h3>Phòng 1.01</h3>
        <p>Người thuê: Vũ Linh Chi </p>
        <p class="price">1,800,000 VNĐ</p>
        <div class="buttons">
          <button class="pay">Trả</button>
          <button class="view">Xem</button>
          <button class="edit">Sửa</button>
          <button class="delete">Xóa</button>
        </div>
      </div>

      <div class="room-card">
        <h3>Phòng 1.02</h3>
        <p>Người thuê: Trần Mai Chi </p>
        <p class="price">1,800,000 VNĐ</p>
        <div class="buttons">
          <button class="pay">Trả</button>
          <button class="view">Xem</button>
          <button class="edit">Sửa</button>
          <button class="delete">Xóa</button>
        </div>
      </div>
    </div>
  `);
});

// Quản lý khách
document.getElementById("menu-customers").addEventListener("click", () => {
  loadContent("Quản lý khách", "<p>Tại đây bạn có thể quản lý thông tin khách thuê.</p>");
});

// Hóa đơn
document.getElementById("menu-bills").addEventListener("click", () => {
  loadContent("Hóa đơn", "<p>Tại đây bạn có thể quản lý hóa đơn và thanh toán.</p>");
});
