// Kiểm tra trạng thái đăng nhập ngay khi tải trang
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
      // Nếu chưa đăng nhập, đá về trang login
      window.location.href = './LoginForm/login.html';
    }

   //chức năng đăng xuất
const logoutButton = document.getElementById('logout-button'); // Giả sử nút có id này
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'LoginForm/login.html'; // Quay về trang đăng nhập
});


//quản lý phòng
document.addEventListener('DOMContentLoaded', function () {
    // --- PHẦN MỚI: LOGIC CHUYỂN ĐỔI GIAO DIỆN ---
    const dashboardLink = document.getElementById('dashboard-link'); // Link về dashboard
    const quanLyPhongLink = document.getElementById('quan-ly-phong-link'); // Link quản lý phòng

    const dashboardView = document.getElementById('dashboard-view'); // Màn hình dashboard
    const roomListView = document.getElementById('room-list-view'); // Màn hình danh sách phòng

    // Khi click vào link "Trang chủ"
    dashboardLink.addEventListener('click', function(e) {
        e.preventDefault();
        dashboardView.classList.remove('d-none'); // Hiện dashboard
        roomListView.classList.add('d-none'); // Ẩn danh sách phòng
    });

    // Khi click vào link "Quản lý phòng"
    quanLyPhongLink.addEventListener('click', function(e) {
        e.preventDefault();
        dashboardView.classList.add('d-none'); // Ẩn dashboard
        roomListView.classList.remove('d-none'); // Hiện danh sách phòng
    });

});




   document.addEventListener('DOMContentLoaded', function () {

    // Đặt đoạn mã này bên trong hàm DOMContentLoaded của bạn

const searchInput = document.querySelector('form[role="search"] input');
searchInput.addEventListener('keyup', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const roomListView = document.getElementById('room-list-view');
    const allRooms = roomListView.querySelectorAll('.col-md-3');

    allRooms.forEach(room => {
        const roomContent = room.textContent.toLowerCase();
        if (roomContent.includes(searchTerm)) {
            room.style.display = 'block'; // Hiện phòng nếu khớp
        } else {
            room.style.display = 'none'; // Ẩn phòng nếu không khớp
        }
    });
});
    // --- KHAI BÁO BIẾN TOÀN CỤC ---
    const roomListRow = document.getElementById('room-container').querySelector('.row');
    
    // Modal cho thuê
    const addTenantModal = new bootstrap.Modal(document.getElementById('addTenantModal'));
    const vacantRoomSelect = document.getElementById('vacant-room-select');
    
    // Modal chỉnh sửa
    const editRoomModal = new bootstrap.Modal(document.getElementById('editRoomModal'));
    const editRoomForm = document.getElementById('edit-room-form');

    // Modal xóa
    const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    const deleteModalBody = document.getElementById('delete-modal-body');

    // Biến tạm để lưu phòng đang được xử lý
    let roomToProcess = null;

    // --- PHẦN 1: HÀM LƯU/TẢI DỮ LIỆU ---
    function saveRoomsToLocalStorage() {
        localStorage.setItem('roomManagementData', roomListRow.innerHTML);
    }

    function loadRoomsFromLocalStorage() {
        const savedData = localStorage.getItem('roomManagementData');
        if (savedData) {
            roomListRow.innerHTML = savedData;
        }
    }

    // --- PHẦN 2: HÀM CẬP NHẬT GIAO DIỆN ---
    function updateRoomStats() { /* ... Giữ nguyên hàm này ... */ }
    
    // --- PHẦN 3: XỬ LÝ SỰ KIỆN ---

    roomListRow.addEventListener('click', function(event) {
        const target = event.target;
        // Tìm nút bấm gần nhất, tránh trường hợp click vào icon <i> bên trong nút
        const button = target.closest('button');
        if (!button) return;

        const roomCardWrapper = button.closest('.col-md-3');
        if (!roomCardWrapper) return;

        // Xử lý nút XÓA PHÒNG
        if (button.classList.contains('btn-danger')) {
            roomToProcess = roomCardWrapper;
            const card = roomToProcess.querySelector('.card');
            
            // Cập nhật nội dung modal tùy theo trạng thái phòng
            if (card.classList.contains('bg-success')) {
                deleteModalBody.textContent = 'Bạn có muốn xóa khách thuê và chuyển phòng này về trạng thái "Trống" không?';
            } else {
                deleteModalBody.textContent = 'Bạn có chắc chắn muốn XÓA VĨNH VIỄN phòng này không? Hành động này không thể hoàn tác.';
            }
            deleteConfirmModal.show();
        }

        // Xử lý nút CHỈNH SỬA hoặc CHO THUÊ
        if (button.classList.contains('btn-warning') || button.classList.contains('btn-primary')) {
            roomToProcess = roomCardWrapper;
            const card = roomToProcess.querySelector('.card');
            const roomName = card.querySelector('h2').textContent;
            const priceText = card.querySelector('h6') ? card.querySelector('h6').textContent.replace(' VNĐ', '') : '0';
            const isOccupied = card.classList.contains('bg-success');

            document.getElementById('editing-room-name').textContent = roomName;
            document.getElementById('edit-tenant-price').value = priceText;
            
            const statusSelect = document.getElementById('edit-room-status');
            const tenantInfoWrapper = document.getElementById('tenant-info-wrapper');

            if (isOccupied) {
                statusSelect.value = 'occupied';
                tenantInfoWrapper.style.display = 'block';
                document.getElementById('edit-tenant-name').value = card.querySelector('p i.fa-user').nextSibling.textContent.trim();
                document.getElementById('edit-tenant-occupants').value = card.querySelector('p span').textContent;
            } else { // Phòng trống
                statusSelect.value = 'vacant';
                tenantInfoWrapper.style.display = 'none';
                document.getElementById('edit-tenant-name').value = '';
                document.getElementById('edit-tenant-occupants').value = '';
            }
            editRoomModal.show();
        }
    });

    // ... (Giữ nguyên các sự kiện change và save-edit-button) ...
    
    // **CẬP NHẬT LOGIC NÚT XÁC NHẬN XÓA**
    confirmDeleteButton.addEventListener('click', function() {
        if (!roomToProcess) return;

        const card = roomToProcess.querySelector('.card');
        
        // Nếu phòng đang có người thuê (màu xanh), chuyển về trạng thái trống
        if (card.classList.contains('bg-success')) {
            const roomName = card.querySelector('h2').textContent;
            const price = card.querySelector('h6').textContent;

            card.className = 'card p-3 bg-secondary text-white'; // Đổi màu
            card.innerHTML = `
                <h2>${roomName}</h2>
                <p><i class="fa-solid fa-door-open"></i> <strong>Trạng thái: Trống</strong></p>
                <h6>${price}</h6>
                <p>Số lượng người: <span>Trống</span></p>
                <div class="mt-2">
                    <button class="btn btn-primary">Cho thuê</button>
                    <button class="btn btn-danger">Xóa phòng</button>
                </div>`;
        } 
        // Nếu phòng đang trống (màu xám), thì xóa vĩnh viễn
        else {
            roomToProcess.remove();
        }
        
        saveRoomsToLocalStorage();
        if (document.getElementById('room-stats-summary')) updateRoomStats();
        deleteConfirmModal.hide();
    });

    // ... (Giữ nguyên các hàm và sự kiện cũ khác như lưu, thêm phòng, thống kê) ...

    // --- PHẦN 4: KHỞI CHẠY ---
    loadRoomsFromLocalStorage();
});



      //thêm sửa xóa phòng
   document.addEventListener('DOMContentLoaded', function () {
        // --- Khai báo các biến chính ---
        const quanLyPhongLink = document.getElementById('quan-ly-phong-link');
        const roomContainer = document.getElementById('room-container');
        const roomListRow = roomContainer.querySelector('.row'); // Thẻ .row chứa danh sách phòng
        const showAddTenantModalLink = document.getElementById('show-add-tenant-modal');
        const addTenantModalElement = document.getElementById('addTenantModal');
        const addTenantModal = new bootstrap.Modal(addTenantModalElement);
        const vacantRoomSelect = document.getElementById('vacant-room-select');
        const saveTenantButton = document.getElementById('save-tenant-button');
        const addTenantForm = document.getElementById('add-tenant-form');

        // --- PHẦN 1: CÁC HÀM LƯU VÀ TẢI DỮ LIỆU ---

        /**
         * Lấy toàn bộ HTML của danh sách phòng và lưu vào LocalStorage.
         * Hàm này sẽ được gọi mỗi khi có sự thay đổi.
         */
        function saveRoomsToLocalStorage() {
            const currentRoomsHTML = roomListRow.innerHTML;
            localStorage.setItem('roomManagementData', currentRoomsHTML);
            console.log('Đã lưu trạng thái các phòng vào LocalStorage.');
        }

        /**
         * Kiểm tra LocalStorage khi tải trang.
         * Nếu có dữ liệu, dùng nó để dựng lại danh sách phòng.
         */
        function loadRoomsFromLocalStorage() {
            const savedRoomsHTML = localStorage.getItem('roomManagementData');
            if (savedRoomsHTML) {
                roomListRow.innerHTML = savedRoomsHTML;
                console.log('Đã tải trạng thái các phòng từ LocalStorage.');
            }
        }


        // --- PHẦN 2: CÁC CHỨC NĂNG CỦA TRANG ---

        /**
         * Cập nhật bảng thống kê phòng.
         */
       

        quanLyPhongLink.addEventListener('click', function (event) {
            event.preventDefault();
            updateRoomStats();
        });

        // Xử lý việc mở modal
        showAddTenantModalLink.addEventListener('click', function(event) {
            event.preventDefault();
            const vacantRooms = roomContainer.querySelectorAll('.card.bg-secondary');
            vacantRoomSelect.innerHTML = '';

            if (vacantRooms.length === 0) {
                vacantRoomSelect.add(new Option('Không có phòng trống nào', '', false, true));
            } else {
                vacantRooms.forEach(card => {
                    const roomName = card.querySelector('h2').textContent;
                    vacantRoomSelect.add(new Option(roomName, roomName));
                });
            }
            addTenantModal.show();
        });

        // Xử lý việc lưu thông tin khách thuê
        saveTenantButton.addEventListener('click', function() {
            const selectedRoomName = vacantRoomSelect.value;
            const tenantName = document.getElementById('tenant-name').value;
            const tenantOccupants = document.getElementById('tenant-occupants').value;
            const tenantPrice = document.getElementById('tenant-price').value;

            if (!selectedRoomName || !tenantName || !tenantOccupants) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }

            const allCards = roomListRow.querySelectorAll('.card');
            allCards.forEach(card => {
                const roomNameH2 = card.querySelector('h2');
                if (roomNameH2 && roomNameH2.textContent === selectedRoomName) {
                    card.classList.remove('bg-secondary');
                    card.classList.add('bg-success');
                    card.innerHTML = `
                        <h2>${selectedRoomName}</h2>
                        <p><i class="fa-solid fa-user"></i> ${tenantName}</p>
                        <h6>${tenantPrice} VNĐ</h6>
                        <p>Số lượng người: <span>${tenantOccupants}</span></p>
                        <div class="mt-2">
                            <button class="btn btn-warning">Chỉnh sửa</button>
                            <button class="btn btn-danger">Xóa phòng</button>
                        </div>
                    `;
                    // SAU KHI THAY ĐỔI, GỌI HÀM LƯU LẠI
                    saveRoomsToLocalStorage();
                }
            });

            addTenantModal.hide();
            addTenantForm.reset();

            if (document.getElementById('room-stats-summary')) {
                updateRoomStats();
            }
        });

        // --- PHẦN 3: KHỞI CHẠY ---
        // KHI TRANG VỪA TẢI XONG, GỌI HÀM ĐỂ TẢI DỮ LIỆU
        loadRoomsFromLocalStorage();
    });


const showAddTenantModalLink = document.getElementById('show-add-tenant-modal');
const addTenantModal = new bootstrap.Modal(document.getElementById('addTenantModal'));
const vacantRoomSelect = document.getElementById('vacant-room-select');

showAddTenantModalLink.addEventListener('click', (e) => {
  e.preventDefault();
  // Tìm các phòng trống (bg-secondary)
  const vacantRooms = document.querySelectorAll('#room-container .card.bg-secondary');
  vacantRoomSelect.innerHTML = '';

  if (vacantRooms.length === 0) {
    vacantRoomSelect.add(new Option('Không có phòng trống nào', '', false, true));
  } else {
    vacantRooms.forEach(card => {
      const roomName = card.querySelector('h2').textContent;
      vacantRoomSelect.add(new Option(roomName, roomName));
    });
  }

  addTenantModal.show();
});



