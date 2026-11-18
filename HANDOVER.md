# TÀI LIỆU BÀN GIAO HỆ THỐNG WEBSITE CÔNG NGHIỆP & ADMIN CMS
**Dự án:** Website Doanh nghiệp Cơ khí Chính xác, Đồ gá JIG, Xe đẩy Part & Máy Tự Động Hóa  
**Đơn vị phát triển:** ITC Technology Engineering Team  
**Tham khảo cấu trúc chuẩn:** CNC VINA (https://cncvina.com.vn/)  
**Ngày bàn giao:** 19/10/2026  

---

## 1. THÔNG TIN TÀI KHOẢN QUẢN TRỊ (ADMIN CREDENTIALS)

Hệ thống quản trị nội dung (CMS) cho phép quản trị viên tự đăng tải hình ảnh sản phẩm, quản lý danh mục, đăng bài viết kỹ thuật và tiếp nhận yêu cầu báo giá từ khách hàng.

| Thông Tin | Chi Tiết Bàn Giao |
| :--- | :--- |
| **Đường dẫn trang quản trị (URL)** | `http://<domain-hoặc-ip>:3050/admin` hoặc `http://<domain-hoặc-ip>:3050/admin/login.html` |
| **Tài khoản đăng nhập (Username)** | `admin` |
| **Mật khẩu mặc định (Password)** | `admin@123` |
| **Phân quyền (Role)** | `superadmin` (Toàn quyền quản trị) |
| **Đổi mật khẩu** | Đăng nhập &rarr; Vào menu **Cài Đặt & Mật Khẩu** để đổi mật khẩu mới bất kỳ lúc nào. |

---

## 2. KIẾN TRÚC HỆ THỐNG (BACKEND & FRONTEND TÁCH BIỆT)

Hệ thống được thiết kế theo mô hình **Decoupled Architecture (Frontend & Backend tách biệt hoàn toàn)**:
1. **Backend (API Server & Database):**
   - Viết bằng chuẩn **Node.js (ES Module)** hiệu năng cao, độc lập, không phụ thuộc thư viện native nặng nề (`zero-dependency`).
   - Cung cấp toàn bộ RESTful API (`/api/products`, `/api/categories`, `/api/articles`, `/api/quotes`, `/api/upload`, `/api/auth`).
   - Xác thực bảo mật bằng chuẩn **Bearer Token (HMAC-SHA256)** có thời hạn.
   - Cơ chế lưu trữ: Cơ sở dữ liệu JSON nguyên tử (`Atomic File Database`) tại `backend/data/database.json`. Tự động sao lưu `database.backup.json` chống mất dữ liệu khi mất điện hoặc khởi động lại đột ngột.
   - Thư mục lưu trữ hình ảnh tải lên: `backend/uploads/`.
2. **Frontend (Website Khách Hàng):**
   - Đặt tại thư mục `frontend/`, hoàn toàn tách biệt.
   - Giao diện thiết kế theo phong cách công nghiệp hiện đại chuẩn CNC VINA (Deep Industrial Navy `#0b1e36`, Precision Royal Blue `#0052cc`, Safety Orange `#ff6b00`).
   - Tối ưu 100% hiển thị trên mọi thiết bị: Máy tính (Desktop), Máy tính bảng (Tablet), Điện thoại di động (Mobile).
   - Tương tác với Backend thông qua gọi API JSON (`fetch`).
3. **Admin Portal (Trang Quản Trị):**
   - Đặt tại thư mục `admin/`.
   - Giao diện Dashboard chuyên nghiệp, thao tác kéo thả tải ảnh trực tiếp, tạo bảng thông số kỹ thuật động (Dynamic Specs Builder), kiểm soát đơn báo giá.

```
WebITC/
├── backend/
│   ├── data/
│   │   ├── database.json          # Cơ sở dữ liệu chính (Sản phẩm, danh mục, tin tức, báo giá, user)
│   │   └── database.backup.json   # Bản sao lưu tự động
│   ├── utils/
│   │   └── db.js                  # Module xử lý Database, Hash mật khẩu SHA-256, Token Auth
│   └── uploads/                   # Nơi chứa các hình ảnh thực tế được tải lên từ Admin
├── frontend/                      # Toàn bộ mã nguồn giao diện khách hàng
│   ├── css/
│   │   └── main.css               # Hệ thống Style công nghiệp, Responsive
│   ├── js/
│   │   ├── api.js                 # Module giao tiếp REST API
│   │   └── main.js                # Xử lý Slider, Modal Báo giá, Menu mobile
│   ├── index.html                 # Trang chủ (Hero slider, danh mục, sản phẩm tiêu biểu, quy trình 5 bước)
│   ├── products.html              # Trang danh mục sản phẩm & bộ lọc tìm kiếm
│   ├── product-detail.html        # Trang chi tiết sản phẩm & bảng thông số kỹ thuật
│   ├── capabilities.html          # Trang năng lực sản xuất, dàn máy CNC, máy đo CMM, chứng nhận ISO 9001
│   ├── news.html                  # Trang danh sách bài viết & góc kỹ thuật
│   ├── news-detail.html           # Trang chi tiết bài viết
│   └── contact.html               # Trang liên hệ, bản đồ nhà xưởng & form gửi bản vẽ báo giá
├── admin/                         # Toàn bộ mã nguồn trang quản trị CMS
│   ├── css/
│   │   └── admin.css              # Giao diện Dashboard quản trị hiện đại
│   ├── js/
│   │   ├── auth.js                # Kiểm tra phiên đăng nhập & phân quyền
│   │   └── api.js                 # API Client có gắn Bearer Token
│   ├── index.html                 # Dashboard thống kê KPIs
│   ├── login.html                 # Màn hình đăng nhập quản trị
│   ├── products.html              # Quản lý sản phẩm, hình ảnh & bảng thông số kỹ thuật
│   ├── categories.html            # Quản lý danh mục & thể loại
│   ├── articles.html              # Quản lý bài viết & tin tức công nghệ
│   ├── quotes.html                # Quản lý danh sách khách hàng gửi yêu cầu báo giá
│   └── settings.html              # Đổi mật khẩu & cập nhật thông tin công ty
├── server.js                      # Máy chủ điều phối API & tĩnh duy nhất
├── package.json                   # Cấu hình dự án
├── Dockerfile                     # File đóng gói container Docker
├── docker-compose.yml             # Cấu hình chạy nhanh 1 lệnh qua Docker Compose
└── HANDOVER.md                    # Tài liệu bàn giao này
```

---

## 3. DANH MỤC SẢN PHẨM CÔNG NGHIỆP ĐÃ ĐƯỢC XÂY DỰNG

Cấu trúc sản phẩm được thiết lập chuyên sâu theo thực tế ngành cơ khí chế tạo ô tô - xe máy của CNC VINA:

### Nhóm 1: Đồ gá & JIG công nghiệp (`jig-cong-nghiep`)
* **Jig hàn Robot khung vỏ xe ô tô (Body Welding Jig):** Tích hợp kẹp khí nén SMC, chốt định vị SKD11 tôi 60 HRC, dung sai ±0.03mm, buồng hàn an toàn.
* **Jig hàn khung sườn xe máy tích hợp Robot:** Đồ gá hàn khung sườn dòng xe tay ga & xe số, cơ cấu Poka-Yoke chống lắp ngược, kết hợp bàn xoay 2 trục (Positioner).
* **Jig kiểm tra kích thước cánh cửa & chi tiết dập (Checking Fixture):** Cữ đo Go-NoGo, đồng hồ so Mitutoyo, kiểm định tọa độ trên máy đo 3 chiều CMM.
* **Jig lắp ráp cụm động cơ & hộp số:** Tối ưu hóa chu kỳ thao tác công nhân, chốt định vị chống trầy xước chi tiết.

### Nhóm 2: Xe đẩy & Giá kệ chứa Part (`xe-day-gia-ke`)
* **Xe đẩy chứa Part linh kiện ô tô nhiều tầng (Automotive Part Trolley):** Khay đỡ nhựa POM/urethane chống trầy xước bề mặt hoàn thiện, bánh xe PU chịu tải 1000kg.
* **Xe đẩy kéo hàng AGV / Tugger Cart liên hoàn:** Cơ cấu lái 4 bánh đồng bộ (all-wheel steering) bám cua chuẩn xác, cần móc nối Tow-bar kéo thành đoàn xe bằng AGV.
* **Giá kệ con lăn Flow Rack (FIFO) cấp part dây chuyền:** Kệ trượt trọng lực con lăn Placon, cấp part theo nguyên tắc First-In First-Out, tối ưu diện tích line lắp ráp.

### Nhóm 3: Máy tự động & Dây chuyền chuyên dụng (`may-tu-dong`)
* **Máy cấp vít và siết ốc tự động đa trục Servo:** Phễu rung cấp vít tự động Bowl Feeder, kiểm soát lực siết mô-men xoắn Servo chính xác ±2%, truyền dữ liệu lên hệ thống MES.
* **Máy tra keo tự động Robot 3 trục XYZ:** Phun keo silicone, RTV, epoxy chống nước cho đèn pha, cacte động cơ và cụm pin xe điện.
* **Dây chuyền lắp ráp và kiểm tra hoàn thiện:** Băng tải pallet tích hợp các trạm ép thủy lực, kiểm tra rò rỉ khí (Leak test).

### Nhóm 4: Robot công nghiệp & Xe AGV (`robot-agv`)
* **Buồng Robot hàn công nghiệp tích hợp bàn xoay 2 trạm:** Cánh tay Robot Yaskawa/ABB 6 trục kết hợp bàn xoay Station A - B, tăng gấp 3 lần năng suất hàn thủ công.
* **Xe tự hành AGV dẫn đường Laser SLAM tải trọng 1 tấn:** Tự động lập bản đồ nhà xưởng bằng Lidar, không cần dán băng từ, tránh vật cản thông minh và tự động về trạm sạc.

### Nhóm 5: Gia công cơ khí chính xác CNC (`gia-cong-cnc`)
* Dàn máy phay CNC 3-5 trục Makino, Mazak, máy cắt dây Sodick. Nhận gia công chi tiết đồ gá, khuôn mẫu đạt độ chính xác đến ±0.005mm.

### Nhóm 6: Ngành sản xuất Điện tử & Bán dẫn (`cat-elec`)
* **Đồ gá JIG kiểm tra chức năng bo mạch FCT / ICT chuyên dụng:** Kim mạ vàng Pogo pin, khối ép khí nén định vị micro-pitch.
* **Máy tra keo & cấp vít tự động bo mạch SMT:** Bàn trượt trục vít bi độ lặp ±0.01mm.
* **Bàn thao tác chống tĩnh điện ESD phòng sạch:** Khung nhôm định hình, mặt bàn phủ cao su chống tĩnh điện 10^6 - 10^9 Ohm.
* **Robot hàn vi mạch SMT tự động 4 trục:** Mỏ hàn nhiệt độ cao, cấp thiếc tự động triệt tiêu đoản mạch.

### Nhóm 7: Ngành sản xuất Sứ vệ sinh - Xưởng sản xuất thủ công (`cat-ceramic`)
*Toàn bộ danh mục được thiết kế theo phương thức sản xuất thủ công nhà xưởng gốm sứ truyền thống Việt Nam, 100% không dùng robot, hình ảnh xưởng mộc giản dị:*
* **Buồng phun men thủ công bàn xoay trợ lực & màng nước thu hồi men:** Thợ phun dùng súng phun tay, phôi bồn cầu đặt trên bàn xoay 360 độ cơ khí trợ lực nhẹ nhàng; vách màng nước Inox dập 99% bụi silic và thu hồi 90% bùn men tái sử dụng.
* **Xe goòng đẩy tay chuyển phôi sứ mộc & kệ sấy chịu nhiệt:** Bánh xe chịu nhiệt 250°C đẩy tay lăn êm trên ray/sàn xưởng, thanh đỡ đệm silicon giảm chấn chống nứt mép phôi mộc.
* **Bàn con lăn trượt tự do bọc nhựa PU đẩy tay:** Con lăn bọc vỏ PU vàng mềm mại, phôi trượt tự do theo trọng lực hoặc công nhân đẩy nhẹ tay giữa các công đoạn dỡ khuôn, lau bavia, phun men.
* **Bệ thử nước kiểm tra chức năng xả & độ kín bồn cầu thủ công:** Khung Inox 304 gạt tay kẹp gioăng EPDM nhanh, van cấp nước xả đại 6L / xả tiểu 3L, gương soi góc nghiêng kiểm tra rò rỉ đáy bồn cầu trực quan.

---

## 4. HƯỚNG DẪN KHỞI CHẠY & VẬN HÀNH (LOCAL DEPLOYMENT)

Hệ thống được tối ưu hóa để chạy ngay lập tức mà không cần cài đặt SQL Server, MySQL hay cấu hình môi trường phức tạp:

### Cách 1: Khởi chạy 1-Click trên Windows bằng file `start_server.bat` (Tiện lợi nhất)
Chỉ cần mở thư mục `WebITC` và **nhấp đúp chuột vào file `start_server.bat`**. Cửa sổ điều khiển màu xanh sẽ tự động kiểm tra Node.js và khởi động server.

### Cách 2: Chạy trực tiếp bằng dòng lệnh Node.js
Yêu cầu máy tính/máy chủ đã cài Node.js (v18 trở lên):
```bash
# Di chuyển vào thư mục dự án
cd WebITC

# Khởi chạy server
node server.js
```
Kết quả hiển thị trên Terminal:
```
====================================================
  ITC TECHNOLOGY - Industrial Web & Admin Portal   
  Server running at: http://localhost:3050        
  Website:           http://localhost:3050/       
  Admin CMS:         http://localhost:3050/admin  
  Default Admin:     admin / admin@123             
====================================================
```
* Mở trình duyệt truy cập Website: `http://localhost:3050`
* Mở trình duyệt truy cập Admin CMS: `http://localhost:3050/admin`
*(Lưu ý: Nếu cổng 3050 bị ứng dụng khác chiếm dụng, hệ thống sẽ tự động chuyển sang cổng 3051, 3052... và thông báo cụ thể trên terminal)*

---

## 5. HƯỚNG DẪN TRIỂN KHAI LÊN VPS / SERVER THỰC TẾ (PRODUCTION DEPLOYMENT)

### Cách A: Chạy với Docker & Docker Compose (Chuẩn công nghiệp, 1 lệnh duy nhất)
Đã cấu hình sẵn file [Dockerfile](file:///d:/Anti/WebITC/Dockerfile) và [docker-compose.yml](file:///d:/Anti/WebITC/docker-compose.yml):
```bash
# 1. Khởi động container ở chế độ chạy nền
docker compose up -d --build

# 2. Kiểm tra trạng thái
docker compose ps

# 3. Xem nhật ký log server
docker compose logs -f
```
* Toàn bộ dữ liệu database và ảnh upload được map ra ngoài thư mục máy chủ (Persistent Volume), đảm bảo không bao giờ bị mất khi restart container.

### Cách B: Chạy trên VPS Linux (Ubuntu / Debian) với PM2 và Nginx
1. **Cài đặt PM2 để giữ server chạy 24/7:**
   ```bash
   npm install -g pm2
   cd /var/www/WebITC
   pm2 start server.js --name "itc-web"
   pm2 startup
   pm2 save
   ```
2. **Cấu hình Nginx làm Reverse Proxy (Cổng 80/443 SSL):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com.vn www.yourdomain.com.vn;

       location / {
           proxy_pass http://127.0.0.1:3050;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       client_max_body_size 25M;
   }
   ```
3. **Kích hoạt chứng chỉ bảo mật SSL HTTPS miễn phí (Certbot):**
   ```bash
   sudo certbot --nginx -d yourdomain.com.vn -d www.yourdomain.com.vn
   ```

---

## 6. HƯỚNG DẪN SỬ DỤNG TRANG QUẢN TRỊ ADMIN (CMS MANUAL)

### 6.1. Đăng sản phẩm mới & Tải ảnh:
1. Đăng nhập trang quản trị &rarr; Nhấp vào menu **Sản Phẩm & Đồ Gá**.
2. Nhấp nút **+ Thêm Sản Phẩm Mới**.
3. Điền **Mã sản phẩm (SKU)** (ví dụ: `JIG-AUTO-01`), **Tên sản phẩm**, chọn **Danh mục**.
4. **Tải ảnh lên:** Kéo thả ảnh trực tiếp từ máy tính vào ô dropzone hoặc bấm để chọn tệp. Hệ thống sẽ lưu trữ trực tiếp vào thư mục nội bộ `backend/uploads/` trên host web và hiển thị ảnh xem trước ngay lập tức.
5. **Chèn ảnh vào bài giới thiệu kỹ thuật:** Bấm nút **📷 Tải ảnh chèn vào bài viết** ngay phía trên ô nội dung. Hệ thống sẽ tự động upload ảnh lên host và chèn thẻ hình ảnh vào bài viết mà không cần viết code HTML.
6. **Thêm thông số kỹ thuật:** Bấm nút *+ Thêm dòng thông số* để nhập các thông số (ví dụ: *Vật liệu: SKD11*, *Dung sai: ±0.03mm*, *Khí nén: SMC 0.5MPa*). Có thể thêm/bớt bao nhiêu dòng tùy ý.
7. Tích chọn *Đánh dấu là Sản phẩm nổi bật* nếu muốn xuất hiện tại trang chủ.
8. Bấm **Lưu Sản Phẩm**.

### 6.2. Quản lý danh mục & thể loại:
* Vào menu **Danh Mục & Thể Loại** &rarr; Bấm **+ Thêm Danh Mục Mới** để tạo thêm dòng sản phẩm mới theo nhu cầu mở rộng của công ty.

### 6.3. Đăng bài viết kỹ thuật & tin tức:
* Vào menu **Bài Viết & Tin Tức** &rarr; Bấm **+ Đăng Bài Viết Mới** &rarr; Nhập tiêu đề, chọn chuyên mục, tải ảnh bìa trực tiếp từ máy tính.
* **Chèn ảnh vào thân bài viết:** Bấm nút **📷 Tải ảnh chèn vào nội dung bài viết**, chọn ảnh từ máy tính &rarr; Ảnh được lưu ngay vào `backend/uploads/` của host web và tự chèn vào vị trí con trỏ chuột.
* Bấm **Lưu Bài Viết**.

### 6.4. Xử lý yêu cầu báo giá kỹ thuật (RFQ):
* Khi có khách hàng gửi form từ Website (hoặc từ trang chi tiết sản phẩm), thông tin ngay lập tức đổ về menu **Yêu Cầu Báo Giá**.
* Quản trị viên nhấp **Xem & Sửa** để xem số điện thoại, công ty, yêu cầu kỹ thuật và cập nhật trạng thái: *Đang liên hệ* &rarr; *Đã gửi báo giá* &rarr; *Đã chốt hợp đồng*.

---

## 7. SAO LƯU & BẢO TRÌ DỮ LIỆU (BACKUP & RESTORE)

Toàn bộ tài nguyên của hệ thống chỉ nằm gọn trong 2 vị trí:
1. File cơ sở dữ liệu: `backend/data/database.json`
2. Thư mục chứa hình ảnh: `backend/uploads/`

**Cách sao lưu:** Quản trị viên chỉ cần nén (zip) thư mục `backend/data/` và `backend/uploads/` lưu về máy tính hoặc đẩy lên Google Drive hàng tuần.  
**Cách phục hồi:** Khi chuyển sang máy chủ mới, chỉ cần giải nén đè 2 thư mục này vào, hệ thống hoạt động bình thường 100% mà không bị mất dữ liệu.

---

## 8. HỆ THỐNG HÌNH ẢNH CÔNG NGHIỆP THỰC TẾ (INDUSTRIAL IMAGERY)

Hệ thống đã được chuẩn hóa 100% hình ảnh thực tế chuyên ngành cơ khí & tự động hóa công nghiệp:
1. **Loại bỏ triệt để ảnh lỗi & ảnh sai ngữ cảnh:**
   - Đã gỡ bỏ toàn bộ ảnh hacker / cyber placeholder trên trạm robot hàn và bài viết tự động hóa.
   - Đã thay thế link ảnh CNC bị lỗi hiển thị (404 từ Unsplash) sang asset nội bộ chất lượng cao.
2. **Hình ảnh AI độc quyền công nhân Việt Nam:**
   - `welding_jig_fixture.jpg`: Kỹ sư & công nhân Việt Nam mặc đồ bảo hộ công nghiệp (mũ cam, đồng phục xám/xanh) đang căn chỉnh và kiểm tra đồ gá hàn JIG khung xe ô tô.
   - `industrial_trolley_cart.jpg`: Công nhân xưởng lắp ráp thao tác với xe đẩy trolley chứa part ô tô xe máy nhiều tầng đệm xốp chống xước.
3. **Thư viện thiết bị tự động hóa tiêu chuẩn quốc tế:**
   - `welding_robot_cell.jpg`: Dây chuyền buồng robot hàn công nghiệp (hãng Yaskawa/ABB) hàn vỏ xe ô tô.
   - `cnc_machining_center.jpg`: Trung tâm gia công phay CNC 5 trục Makino/Mazak gia công chi tiết chính xác.
   - `tool_trolley_cabinet.jpg`: Xe đẩy và tủ đựng dao cụ dụng cụ CNC chuyên dụng.
   - `agv_automated_vehicle.jpg`: Xe tự hành AGV nhà xưởng dẫn đường Laser SLAM kéo xe kéo part.
   - `automatic_bowl_feeder.jpg`: Phễu rung bát cấp vít và máy siết ốc tự động SPM.
   - `cmm_measuring_machine.jpg`: Máy đo tọa độ 3D CMM Mitutoyo Crysta & Checking Fixture.
4. **Bộ ảnh xưởng gốm sứ thủ công giản dị (100% Không Robot):**
   - `sanitary_manual_glazing.jpg`: Thợ gốm lành nghề cầm súng phun men tay, bàn xoay phôi bồn cầu trợ lực 360 độ và buồng hút màng nước Inox thu hồi men.
   - `sanitary_kiln_car.jpg`: Xe goòng đẩy tay nhiều tầng chở phôi sứ mộc đệm silicon chịu nhiệt lăn êm trên ray vào buồng sấy.
   - `sanitary_roller_conveyor.jpg`: Bàn con lăn trượt tự do đẩy tay bọc nhựa PU vàng mềm chống sứt mẻ men sống.
   - `sanitary_flush_tester.jpg`: Bệ thử nước kiểm tra độ kín và chức năng xả bồn cầu thủ công có van gạt tay và gương phản chiếu đáy.
   - `sanitary_factory_showcase.jpg`: Toàn cảnh nhà xưởng sản xuất thiết bị sứ vệ sinh truyền thống, chân thực và gần gũi.
5. **Cơ chế bảo vệ hình ảnh 3 lớp (Zero Broken Images):**
   - **Lớp 1 (Local Pre-seed):** Khởi tạo sẵn file nội bộ ngay khi server khởi động.
   - **Lớp 2 (Static Fallback):** `server.js` tự động điều hướng sang ảnh dự phòng tương ứng nếu file bất kỳ bị thiếu.
   - **Lớp 3 (Client onerror):** Tất cả thẻ `<img>` trên Frontend và Admin đều có sự kiện `onerror` tự chuyển đổi sang ảnh nội bộ nếu mạng gián đoạn.

---

## 9. THÔNG TIN PHÁP LÝ DOANH NGHIỆP & ĐĂNG KÝ TÊN MIỀN CHÍNH CHỦ
* **Tên doanh nghiệp:** CÔNG TY TNHH CÔNG NGHỆ ITC
* **Thương hiệu truyền thông:** ITC TECHNOLOGY
* **Mã số thuế (MST):** 0102367857
* **Số điện thoại hotline / Zalo:** 0983684968 (0983 684 968)
* **Email tiếp nhận / Sales:** trunghn@thietbicongnghiep-vn.com.vn
* **Địa chỉ văn phòng & xưởng:** Biệt thự số 58, đường Tulip 04, khu đô thị Vinhomes Riverside, phường Phúc Lợi, Thành Phố Hà Nội, Việt Nam
* **Thông tin đăng ký tên miền chính chủ:**
  * Chủ thể: CÔNG TY TNHH CÔNG NGHỆ ITC
  * Mã số thuế: 0102367857
  * Số điện thoại: 0983684968
  * Email liên hệ: trunghn@thietbicongnghiep-vn.com.vn


