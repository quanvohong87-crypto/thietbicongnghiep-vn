import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'backend/data/database.json');
const rawData = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(rawData);

// 1. Update Category shortDesc
const cerCat = db.categories.find(c => c.id === 'cat-ceramic');
if (cerCat) {
  cerCat.shortDesc = 'Trạm Robot phun men tự động 6 trục, hệ thống buồng sấy mộc tự động khí nóng HMI, dây chuyền đúc băng khuôn thạch cao, máy kiểm tra rò khí QC & thử tải độ bền nắp bồn cầu tiêu chuẩn EN 997 / ASME';
}

// 1.1 Update prod-cer-01 to Robotic Glazing
const prodGlaze = db.products.find(p => p.id === 'prod-cer-01');
if (prodGlaze) {
  prodGlaze.code = 'ROB-GLZ-SAN01';
  prodGlaze.slug = 'he-thong-robot-phun-men-tu-dong-6-truc-su-ve-sinh';
  prodGlaze.name = 'Hệ thống Robot phun men tự động 6 trục cho bồn cầu & lavabo sứ vệ sinh (6-Axis Robotic Glazing System for Sanitary Ware)';
  prodGlaze.thumbnail = '/images/sanitary_glazing_robot.jpg';
  prodGlaze.images = ['/images/sanitary_glazing_robot.jpg'];
  prodGlaze.shortDesc = 'Hệ thống trạm robot phun men tự động 6 trục chuyên dụng cho sứ vệ sinh. Tích hợp bàn xoay định vị đồng bộ trục thứ 7, súng phun men áp lực cao đầu kim béc vonfram chống mài mòn, buồng thu hồi màng nước Inox 304 và phần mềm lập trình quỹ đạo 3D.';
  prodGlaze.content = '<h3>Hệ thống Robot phun men tự động 6 trục chuyên dụng cho ngành sứ vệ sinh</h3><p>Trong các nhà máy sản xuất thiết bị sứ vệ sinh hiện đại, công đoạn tráng men bằng <strong>Robot công nghiệp 6 trục (Robotic Glazing System)</strong> của ITC Technology là bước đột phá công nghệ giúp thay thế hoàn toàn phương pháp phun tay độc hại, đảm bảo lớp men láng mịn tuyệt đối, đồng nhất chiều dày và nâng cao năng suất gấp 3 - 4 lần.</p><h4>Ưu điểm công nghệ & tính năng vượt trội:</h4><ul><li><strong>Cánh tay robot 6 trục độ linh hoạt cao:</strong> Sử dụng robot công nghiệp chuyên dụng cho môi trường bụi ẩm (IP67) với tầm với lớn từ 2,000 - 2,600 mm. Robot dễ dàng luồn sâu đầu súng vào các góc khuất phức tạp như lòng bẫy xiphong, rãnh xả nước rimless và mặt sau của thân bồn cầu.</li><li><strong>Bàn xoay servo đồng bộ (Trục thứ 7):</strong> Cụm bàn xoay định vị servo 2 trạm làm việc (Station A - Station B) liên kết truyền thông đồng bộ với bộ điều khiển robot. Robot vừa phun vừa điều khiển góc xoay của sản phẩm theo quỹ đạo 3D mượt mà.</li><li><strong>Cụm súng phun men áp lực tự động:</strong> Đầu súng phun tự động tích hợp van điều tiết lưu lượng tỉ lệ và béc phun hợp kim siêu cứng Tungsten Carbide chống mài mòn bởi hạt men gốm, tạo chùm tia phun dạng elip mịn màng với độ phủ đồng đều 0.8 - 1.2 mm.</li><li><strong>Buồng màng nước Inox 304 thu hồi men 95%:</strong> Kết hợp buồng phun vách Inox 304 có màng nước chảy tràn liên tục và quạt hút ly tâm công suất lớn, cuốn trôi toàn bộ bụi men thừa xuống bể lắng lọc tái tuần hoàn, bảo vệ 100% môi trường nhà xưởng.</li><li><strong>Phần mềm mô phỏng & dạy học quỹ đạo thông minh:</strong> Hỗ trợ cả phương pháp dắt tay dạy học (Hand Teaching) và lập trình ngoại tuyến (Offline Programming 3D), cho phép lưu trữ hơn 100 chương trình phun cho từng model bồn cầu, két nước, lavabo khác nhau.</li></ul>';
  prodGlaze.specs = [
    { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
    { label: 'Loại cánh tay Robot', value: 'Robot công nghiệp 6 trục chuyên dụng (Cấp bảo vệ IP67 chống bụi nước)' },
    { label: 'Bán kính với / Tải trọng', value: 'Tầm với 2,000 - 2,600 mm / Tải trọng đầu cổ tay 20 - 50 kg' },
    { label: 'Cụm súng phun men', value: 'Súng phun men tự động áp lực cao, kim béc hợp kim Tungsten Carbide' },
    { label: 'Bàn xoay phôi đồng bộ', value: 'Bàn xoay servo 2 trạm (Station A - Station B) tích hợp trục thứ 7' },
    { label: 'Độ dày màng men kiểm soát', value: '0.8 - 1.2 mm (Sai số độ đồng đều bề mặt dưới ±0.05 mm)' },
    { label: 'Năng suất phun', value: '40 - 60 sản phẩm bồn cầu liền khối / giờ (Nâng gấp 3 lần so với phun tay)' },
    { label: 'Buồng thu hồi màng nước', value: 'Vách Inox 304 chảy tràn liên tục, thu hồi 95% lượng men thừa tái sử dụng' },
    { label: 'Hệ thống điều khiển', value: 'Tủ điều khiển Robot tích hợp PLC công nghiệp & màn hình cảm ứng HMI' }
  ];
}

// 1.2 Update art-09 to Robotic Glazing
const artGlaze = db.articles.find(a => a.id === 'art-09');
if (artGlaze) {
  artGlaze.slug = 'cong-nghe-robot-phun-men-tu-dong-6-truc-su-ve-sinh';
  artGlaze.title = 'Công nghệ Robot Phun Men Tự Động 6 Trục trong Dây Chuyền Sản Xuất Sứ Vệ Sinh Công Nghiệp';
  artGlaze.shortDesc = 'Ứng dụng cánh tay robot công nghiệp 6 trục kết hợp bàn xoay servo đồng bộ: kiểm soát độ dày màng men chuẩn xác đến từng micromet, phủ đều góc khuất bẫy xiphong và triệt tiêu 100% bụi men độc hại cho người lao động.';
}

// 2. Define new products based on rendered images
const newProducts = [
  {
    id: 'prod-cer-05',
    code: 'QC-LEAK-SAN05',
    slug: 'may-kiem-tra-ro-khi-ap-suat-bon-cau-qc',
    categoryId: 'cat-ceramic',
    name: 'Máy kiểm tra rò khí bồn cầu phương pháp áp suất khí nén (Sanitary Ware Pneumatic Air Leak Tester)',
    thumbnail: '/images/sanitary_qc_leak_tester.jpg',
    images: ['/images/sanitary_qc_leak_tester.jpg'],
    shortDesc: 'Máy kiểm tra độ kín và phát hiện rò khí bồn cầu phương pháp áp suất khí nén, phát hiện tức thì các vết rỗ nứt vi mô trên thân sứ trước khi xuất xưởng. Trang bị bình tích áp inox, tủ điện điều khiển công nghiệp, đèn cảnh báo và dàn con lăn tiếp nhận.',
    content: '<h3>Máy kiểm tra rò khí bồn cầu áp suất khí nén (Sanitary Ware Pneumatic Leak Tester)</h3><p>Trong quy trình kiểm soát chất lượng xuất xưởng (OQC) của các nhà máy sản xuất thiết bị sứ vệ sinh hiện đại, việc phát hiện các vết nứt ngầm vi mô (micro-cracks) và lỗ rỗ bọt khí trong lòng thân bồn cầu là yếu tố quyết định uy tín thương hiệu. <strong>Máy kiểm tra rò khí áp suất khí nén</strong> do ITC Technology chế tạo cho phép thử nghiệm độ kín 100% bồn cầu chỉ trong vòng 20 giây với độ chuẩn xác tuyệt đối.</p><h4>Đặc điểm kết cấu & công nghệ nổi bật:</h4><ul><li><strong>Khung bệ thép chịu lực sơn màu vàng an toàn:</strong> Kết cấu thép hộp định hình vững chắc, chống rung động khi xi lanh kẹp nén tải cao. Phía trước tích hợp dàn con lăn tiếp nhận sản phẩm giúp công nhân đẩy bồn cầu vào vị trí test nhẹ nhàng.</li><li><strong>Cơ cấu bịt kín khí nén tự động:</strong> Cụm xi lanh khí nén tác động kép ép đệm kín gioăng cao su kỹ thuật EPDM chuyên dụng vào họng xả thải và bẫy nước xiphong, đảm bảo độ kín tuyệt đối không gây hư hại men sứ.</li><li><strong>Tủ điện điều khiển công nghiệp tích hợp:</strong> Trang bị đầy đủ nút nhấn chức năng, công tắc chuyển chế độ Auto/Manual, cụm đồng hồ đo áp suất vi sai và hệ thống đèn chỉ thị trạng thái hoạt động trực quan.</li><li><strong>Bình tích áp inox & tháp đèn cảnh báo đỏ:</strong> Trang bị bình tích áp bằng thép không gỉ giữ áp suất khí nén luôn ổn định, kết hợp đèn tháp cảnh báo đỏ xoay chớp phát tín hiệu rõ ràng khi phát hiện sản phẩm lỗi (NG).</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Phương pháp thử nghiệm', value: 'Bơm áp suất dương khí nén phát hiện rò rỉ (Pneumatic Pressure Leak Test)' },
      { label: 'Áp suất khí nén thử nghiệm', value: '0.05 - 0.2 MPa (Hiệu chuẩn van điều áp & cảm biến vi sai)' },
      { label: 'Thời gian chu kỳ test', value: '15 - 25 giây / sản phẩm bồn cầu' },
      { label: 'Cơ cấu làm kín', value: 'Xi lanh khí nén ép đệm cao su EPDM đàn hồi cao' },
      { label: 'Tủ điều khiển', value: 'Tủ điện thép tấm sơn tĩnh điện, nút bấm công nghiệp, đèn báo LED' },
      { label: 'Bình tích áp', value: 'Thép không gỉ Inox 304 chịu áp suất cao' },
      { label: 'Băng chuyền tiếp nhận', value: 'Dàn con lăn thép mạ kẽm lăn êm, chống trầy xước men sứ' }
    ],
    featured: true,
    views: 195,
    createdAt: '2026-03-25T08:00:00Z'
  },
  {
    id: 'prod-cer-06',
    code: 'QC-VAC-SAN06',
    slug: 'may-thu-khi-chan-khong-kiem-tra-ro-ri-su-ve-sinh',
    categoryId: 'cat-ceramic',
    name: 'Máy thử khí phương pháp hút chân không kiểm tra rò rỉ sứ vệ sinh (Vacuum Leak Testing Machine - Station 2)',
    thumbnail: '/images/sanitary_vacuum_leak_tester.jpg',
    images: ['/images/sanitary_vacuum_leak_tester.jpg'],
    shortDesc: 'Thiết bị kiểm tra rò khí phương pháp hút chân không cao cấp, trang bị đồng hồ đo rò kỹ thuật số độ nhạy 0.1 Pa, tấm chắn an toàn mica trong suốt và đèn chớp cảnh báo kép xanh đỏ.',
    content: '<h3>Máy thử khí phương pháp hút chân không số 2 (Vacuum Leak Testing Machine)</h3><p>Khác với phương pháp bơm áp suất dương thông thường, phương pháp kiểm tra độ kín bằng <strong>hút chân không (Vacuum Leak Detection)</strong> được các hãng sứ vệ sinh tiêu chuẩn Nhật Bản và Châu Âu (Inax, Toto, Kohler) tin dùng vì khả năng phát hiện những vết nứt mao dẫn cực nhỏ mà mắt thường không thể quan sát được. Máy thử khí số 2 do ITC chế tạo mang lại độ tin cậy tuyệt đối cho dây chuyền kiểm định chất lượng.</p><h4>Ưu điểm công nghệ vượt trội:</h4><ul><li><strong>Bộ đo rò khí kỹ thuật số độ nhạy cao:</strong> Thiết bị đo áp suất vi sai kỹ thuật số điện tử có khả năng ghi nhận biến thiên áp suất nhỏ tới 0.1 Pa trong buồng kín, phân loại chuẩn xác sản phẩm Đạt (OK) hoặc Lỗi (NG).</li><li><strong>Bảng điều khiển công tắc xoay & đèn chỉ thị:</strong> Bố trí trực quan theo tiêu chuẩn công nghiệp Nhật Bản, có nhãn hướng dẫn thao tác chi tiết, núm xoay chọn chế độ và nút dừng khẩn cấp.</li><li><strong>Tấm chắn bảo hộ mica an toàn:</strong> Phía trước buồng kiểm tra được trang bị vách mica trong suốt chịu lực cao, vừa giúp công nhân quan sát rõ phôi thử vừa ngăn ngừa tuyệt đối nguy cơ tai nạn cơ học.</li><li><strong>Hệ thống đèn chớp cảnh báo đôi:</strong> Đèn tín hiệu màu đỏ và màu xanh dương công suất lớn thông báo tức thì kết quả đo cho cả khu vực chuyền đóng gói.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Phương pháp thử nghiệm', value: 'Hút chân không tạo chênh áp (Vacuum Differential Pressure Leak Test)' },
      { label: 'Độ nhạy phát hiện', value: '0.1 Pa (Phát hiện tức thì lỗ mọt và vết nứt vi mô sau nung)' },
      { label: 'Dải áp suất chân không', value: '-20 kPa đến -60 kPa (Bơm hút chân không vòng dầu cao cấp)' },
      { label: 'Màn chắn an toàn', value: 'Tấm mica trong suốt dày 8mm chịu va đập bảo hộ công nhân' },
      { label: 'Hệ thống hiển thị', value: 'Đồng hồ số điện tử vi sai kết hợp đèn chớp báo trạng thái OK/NG' },
      { label: 'Bàn trượt nạp phôi', value: 'Bàn trượt dẫn hướng khí nén đưa sản phẩm vào buồng kín' }
    ],
    featured: true,
    views: 182,
    createdAt: '2026-03-25T09:30:00Z'
  },
  {
    id: 'prod-cer-07',
    code: 'TST-SEAT-SAN07',
    slug: 'may-kiem-tra-do-ben-luc-dong-luc-tinh-nap-bon-cau',
    categoryId: 'cat-ceramic',
    name: 'Máy kiểm tra độ bền lực động & lực tĩnh nắp bồn cầu 2 trạm (Toilet Seat Static & Dynamic Endurance Tester)',
    thumbnail: '/images/sanitary_toilet_seat_tester.jpg',
    images: ['/images/sanitary_toilet_seat_tester.jpg'],
    shortDesc: 'Máy thử nghiệm độ bền cơ học nắp đậy và bệ ngồi bồn cầu tiêu chuẩn EN 997 / ASME. Tích hợp 2 trạm kiểm tra độc lập (Trạm thử lực động đa trục và Trạm thử lực tĩnh nén tải trọng cao), điều khiển màn hình cảm ứng HMI Delta.',
    content: '<h3>Máy kiểm tra độ bền lực động & lực tĩnh nắp bồn cầu chuyên dụng</h3><p>Nắp bệ ngồi bồn cầu (Toilet Seat & Cover) là bộ phận chịu lực ma sát và tải trọng trực tiếp của người sử dụng hàng ngày. Để đạt chứng nhận xuất khẩu Châu Âu và Mỹ, sản phẩm phải vượt qua các bài kiểm tra nghiêm ngặt về độ bền uốn, tải trọng tĩnh và chu kỳ va đập động. <strong>Máy kiểm tra độ bền 2 trạm độc lập</strong> của ITC là thiết bị kiểm định phòng Lab chuẩn xác hàng đầu.</p><h4>Cấu tạo 2 trạm kiểm tra chuyên biệt:</h4><ul><li><strong>Trạm 1: Máy kiểm tra lực động (Dynamic Load Tester):</strong> Trang bị 3 xi lanh khí nén độc lập tác động lực tuần hoàn mô phỏng quá trình người ngồi xuống, dịch chuyển và đóng mở nắp bệt liên tục hàng chục ngàn lần.</li><li><strong>Trạm 2: Máy thử nghiệm lực tĩnh (Static Load Tester):</strong> Sử dụng xi lanh tải trọng lớn nén tĩnh với lực từ 1,500 N đến 3,000 N (150kg - 300kg) giữ tải liên tục theo quy chuẩn EN 997 để kiểm tra khả năng biến dạng và nứt gãy của bản lề nắp.</li><li><strong>Tủ điều khiển HMI màn hình cảm ứng:</strong> Màn hình cảm ứng màu trực quan hiển thị số lần dập tải, biểu đồ áp lực, cài đặt thời gian giữ áp và tự động ngắt khi phát hiện hư hại cơ học.</li><li><strong>Kết cấu khung nhôm định hình cao cấp:</strong> Khung máy làm từ nhôm định hình công nghiệp chống rỉ sét, mặt bàn thép không gỉ sáng bóng, tháp đèn báo trạng thái xanh/đỏ cho từng trạm.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Tiêu chuẩn đáp ứng', value: 'EN 997, ASME A112.19.2, TCVN 12649:2020' },
      { label: 'Cấu hình trạm thử', value: '02 trạm độc lập: Trạm thử lực động (3 xi lanh) & Trạm thử lực tĩnh (1 xi lanh tải nặng)' },
      { label: 'Tải trọng nén tĩnh tối đa', value: '3,000 N (300 kg) với cảm biến Loadcell kiểm soát lực chính xác' },
      { label: 'Tần số dập lực động', value: '10 - 20 lần / phút, bộ đếm chu kỳ tự động tới 100,000 lần' },
      { label: 'Hệ thống điều khiển', value: 'PLC Delta kết hợp màn hình cảm ứng HMI màu công nghiệp' },
      { label: 'Khung máy', value: 'Khung nhôm định hình 45x45 & mặt bàn inox 304 dày dặn' }
    ],
    featured: true,
    views: 230,
    createdAt: '2026-03-26T08:15:00Z'
  },
  {
    id: 'prod-cer-08',
    code: 'DRY-CHAM-SAN08',
    slug: 'he-thong-buong-say-moc-tu-dong-tuan-hoan-khi-nong',
    categoryId: 'cat-ceramic',
    name: 'Hệ thống Buồng sấy mộc tự động tuần hoàn khí nóng đa cấp cho bồn cầu & lavabo (Automatic Sanitary Greenware Drying Chamber)',
    thumbnail: '/images/sanitary_dryer_chambers.jpg',
    images: [
      '/images/sanitary_dryer_chambers.jpg',
      '/images/sanitary_dryer_interior.jpg',
      '/images/sanitary_dryer_installation.jpg'
    ],
    shortDesc: 'Hệ thống buồng sấy mộc tự động hóa tuần hoàn khí nóng đa vùng kiểm soát ẩm thông minh. Vách panel cách nhiệt bọc tôn, ray trượt xe gòn, giúp phôi mộc thoát ẩm đồng đều và triệt tiêu 100% nứt ngầm trước nung.',
    content: '<h3>Hệ thống Buồng sấy mộc tự động tuần hoàn khí nóng đa cấp ITC</h3><p>Trong quy trình sản xuất sứ vệ sinh, công đoạn sấy mộc (Greenware Drying) đóng vai trò sống còn. Do thân bồn cầu có cấu trúc phức tạp với độ dày mỏng không đồng nhất (đáy và họng xiphong dày trong khi vành xả và thân ngoài mỏng), việc thoát ẩm không đều sẽ gây ứng suất dư dẫn đến hiện tượng nứt xé phôi mộc hoặc nứt nẻ sau khi nung men. <strong>Buồng sấy mộc tự động ITC</strong> giải quyết triệt để vấn đề này nhờ công nghệ điều khiển đường cong sấy đa cấp.</p><h4>Ưu điểm kỹ thuật nổi bật:</h4><ul><li><strong>Vách panel bảo ôn cách nhiệt cao cấp:</strong> Hệ thống vỏ buồng làm từ panel xốp cách nhiệt PU/EPS bọc tôn mạ kẽm dày, giữ nhiệt độ buồng sấy luôn ổn định và tiết kiệm tối đa nhiên liệu gia nhiệt.</li><li><strong>Hệ thống cửa bifold xếp mở linh hoạt:</strong> Các khoang sấy độc lập với cửa panel cách nhiệt xếp gọn, cho phép xe gòn chở phôi mộc ra vào nhanh chóng mà không làm thất thoát nhiệt sang các khoang lân cận.</li><li><strong>Đường ống gió tuần hoàn đối lưu cưỡng bức:</strong> Hệ thống ống gió bọc bông cách nhiệt bố trí dọc trần buồng kết hợp quạt đảo gió giúp luồng khí nóng tiếp xúc đồng đều 360 độ quanh phôi mộc.</li><li><strong>Đường ray xe gòn âm sàn sạch sẽ:</strong> Mặt sàn buồng sấy được đổ bê tông phẳng mịn phủ sơn epoxy, có rãnh dẫn hướng bánh xe gòn giúp công nhân đẩy phôi vào buồng êm ái, không rung xóc.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Công suất mỗi buồng', value: '120 - 240 sản phẩm bồn cầu mộc / buồng sấy' },
      { label: 'Dải nhiệt độ sấy', value: '35°C - 90°C (Gia nhiệt bằng khí gas, hơi nhiệt hoặc điện trở sấy)' },
      { label: 'Kiểm soát độ ẩm', value: 'Dải đo 15% - 95% RH (Hệ thống phun sương bù ẩm & quạt xả ẩm tự động)' },
      { label: 'Vật liệu vỏ buồng', value: 'Panel cách nhiệt xốp Polyurethane dày 75mm bọc tôn kẽm sơn tĩnh điện' },
      { label: 'Hệ thống thông gió', value: 'Ống dẫn gió bọc bông thủy tinh cách nhiệt, quạt ly tâm chịu nhiệt' },
      { label: 'Cơ chế vận chuyển', value: 'Xe gòn đẩy tay nhiều tầng lăn trên ray dẫn hướng âm sàn' }
    ],
    featured: true,
    views: 310,
    createdAt: '2026-03-26T10:00:00Z'
  },
  {
    id: 'prod-cer-09',
    code: 'HMI-DRY-SAN09',
    slug: 'tu-dieu-khien-tu-dong-hmi-buong-say-moc-su-ve-sinh',
    categoryId: 'cat-ceramic',
    name: 'Tủ điều khiển tự động hóa tích hợp màn hình HMI buồng sấy mộc sứ vệ sinh (Drying Chamber Smart HMI Control Cabinet)',
    thumbnail: '/images/sanitary_dryer_hmi_control.jpg',
    images: ['/images/sanitary_dryer_hmi_control.jpg'],
    shortDesc: 'Tủ điện tự động hóa vỏ inox 304 tích hợp màn hình cảm ứng HMI trực quan. Lập trình điều khiển đường cong sấy 18 bước (DRY1-DRY18), giám sát cảm biến nhiệt ẩm thời gian thực và ghi log lỗi.',
    content: '<h3>Tủ điều khiển thông minh màn hình HMI cho buồng sấy mộc sứ vệ sinh</h3><p>Được thiết kế chuyên biệt cho các buồng sấy mộc công nghiệp hiện đại, <strong>Tủ điều khiển tự động hóa HMI của ITC Technology</strong> đóng vai trò bộ não điều phối toàn bộ chu trình sấy nhiệt ẩm theo đường cong khoa học, thay thế hoàn toàn phương pháp canh chỉnh nhiệt độ thủ công cảm tính trước đây.</p><h4>Tính năng điều khiển thông minh:</h4><ul><li><strong>Màn hình cảm ứng HMI giao diện tiếng Việt thân thiện:</strong> Hiển thị đầy đủ sơ đồ vận hành, trạng thái đầu đốt, van phun sương bù ẩm, hệ thống quạt đảo gió và các nút bấm lệnh Chạy máy, Dừng tải, Cài đặt, Đồ thị, Lịch sử lỗi.</li><li><strong>Lập trình đường cong sấy 18 giai đoạn (DRY1 đến DRY18):</strong> Kỹ sư có thể cài đặt chính xác thời gian (Giờ/Phút), nhiệt độ mục tiêu (°C) và độ ẩm mục tiêu (%RH) cho từng giai đoạn sấy: từ ủ ẩm chống nứt ban đầu đến giai đoạn rút ẩm sâu sấy kiệt trước nung.</li><li><strong>Giám sát cảm biến nhiệt ẩm thời gian thực:</strong> Tự động so sánh giá trị cài đặt SP (Set Point) và giá trị thực tế PV (Process Value), tự động đóng mở van tỉ lệ điều khiển đầu đốt và van xả ẩm.</li><li><strong>Vỏ tủ Inox 304 tiêu chuẩn phòng ẩm:</strong> Toàn bộ vỏ tủ chế tạo từ thép không gỉ Inox 304 xước Hairline chống rỉ sét tuyệt đối trong môi trường hơi ẩm bão hòa của nhà máy sứ.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Màn hình hiển thị', value: 'HMI cảm ứng công nghiệp 10.4 inch độ tương phản cao, giao diện tiếng Việt' },
      { label: 'Số bước sấy lập trình', value: '18 bước sấy độc lập (DRY1 đến DRY18) cài đặt linh hoạt' },
      { label: 'Thông số kiểm soát', value: 'Thời gian (h/m), Nhiệt độ (°C), Độ ẩm (%RH), Áp suất gió buồng sấy' },
      { label: 'Vỏ tủ điện', value: 'Inox 304 xước dày 1.5mm, khóa an toàn và gioăng cao su kín bụi nước' },
      { label: 'Hệ thống đèn báo', value: 'Đèn tháp 3 trạng thái System OK / Alarm / Process Active, nút dừng khẩn' },
      { label: 'Lưu trữ dữ liệu', value: 'Ghi log lịch sử lỗi và dữ liệu nhiệt ẩm từng mẻ sấy phục vụ truy xuất chất lượng' }
    ],
    featured: false,
    views: 165,
    createdAt: '2026-03-27T08:30:00Z'
  },
  {
    id: 'prod-cer-10',
    code: 'FAN-CIRC-SAN10',
    slug: 'cum-ong-dao-gio-tuan-hoan-non-phan-phoi-khi-buong-say',
    categoryId: 'cat-ceramic',
    name: 'Cụm quạt đảo gió tuần hoàn & nón phân phối khí buồng sấy mộc (Oscillating Air Circulation & Heat Distribution Duct)',
    thumbnail: '/images/sanitary_oscillating_ducts.jpg',
    images: ['/images/sanitary_oscillating_ducts.jpg'],
    shortDesc: 'Hệ thống nón đảo gió tuần hoàn treo trần chuyên dụng trong buồng sấy gốm sứ. Cánh chớp hướng dòng chia luồng khí nóng đa hướng, triệt tiêu vùng chết nhiệt độ và giúp phôi khô đều mọi góc.',
    content: '<h3>Cụm quạt đảo gió tuần hoàn và nón phân phối khí buồng sấy mộc</h3><p>Trong buồng sấy gốm sứ mộc có thể tích lớn, hiện tượng phân tầng nhiệt độ (trần nóng, sàn lạnh) và vùng góc chết gió là nguyên nhân chính khiến các thân bồn cầu ở tầng dưới bị ẩm trong khi tầng trên bị khô nứt. <strong>Cụm quạt đảo gió tuần hoàn dạng nón treo trần</strong> của ITC là giải pháp khí động học tối ưu giải quyết triệt để hiện tượng này.</p><h4>Cấu tạo khí động học độc đáo:</h4><ul><li><strong>Dãy chụp nón côn bằng tôn mạ kẽm chịu nhiệt:</strong> Thiết kế hình nón côn ngược giúp tăng vận tốc dòng khí đẩy xuống sàn, chống hiện tượng khí nóng bay bốc ngược lên trần buồng sấy.</li><li><strong>Cửa chớp phân phối gió đa tầng:</strong> Trên thân nón được trổ các khe cửa chớp chia tầng, phân bổ đều luồng gió nóng từ tầng cao nhất đến tầng thấp nhất của xe gòn chở phôi mộc.</li><li><strong>Cơ cấu đảo góc tự động:</strong> Nón gió xoay đảo chiều liên tục qua lại, quét đều luồng khí nóng khắp bề mặt bồn cầu, giúp nước bốc hơi đồng đều mà không làm co kéo cục bộ thành sứ.</li><li><strong>Tương thích vách panel dập nhôm phản xạ:</strong> Bố trí đồng bộ giữa hàng quạt đảo gió và vách buồng sấy ốp nhôm gân dập nổi tăng cường khả năng phản xạ bức xạ nhiệt.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Vật liệu chế tạo', value: 'Tôn mạ kẽm nhúng nóng / Inox 304 chịu nhiệt và chống ẩm' },
      { label: 'Cơ cấu chia gió', value: 'Chụp nón côn giảm áp tích hợp cánh chớp hướng dòng đa tầng' },
      { label: 'Cơ chế đảo gió', value: 'Động cơ giảm tốc đảo góc 60° - 120° quét luồng khí liên tục' },
      { label: 'Vị trí lắp đặt', value: 'Treo thả trần khoang sấy, cách mặt sàn 2.2 - 2.8m' },
      { label: 'Hiệu quả khí động học', value: 'Triệt tiêu 95% vùng chết nhiệt độ giữa các tầng xe gòn phôi mộc' }
    ],
    featured: false,
    views: 142,
    createdAt: '2026-03-27T09:45:00Z'
  },
  {
    id: 'prod-cer-11',
    code: 'CST-AUTO-SAN11',
    slug: 'day-chuyen-duc-bang-khuon-thach-cao-tu-dong-khung-gantry',
    categoryId: 'cat-ceramic',
    name: 'Dây chuyền đúc băng khuôn thạch cao tự động khung dầm Gantry công nghiệp (Automated Gantry Battery Casting Line)',
    thumbnail: '/images/sanitary_cad_casting_line.jpg',
    images: [
      '/images/sanitary_cad_casting_line.jpg',
      '/images/sanitary_casting_orange_line.jpg',
      '/images/sanitary_plaster_molds.jpg',
      '/images/sanitary_battery_casting_view.jpg'
    ],
    shortDesc: 'Dây chuyền đúc băng bán tự động và tự động chuyên dụng sản xuất bồn cầu, két nước và lavabo sứ vệ sinh. Khung dầm thép Gantry chịu lực, cầu trục mở khuôn đối trọng trợ lực, rót và hồi hồ tự động.',
    content: '<h3>Dây chuyền đúc băng khuôn thạch cao tự động khung dầm Gantry</h3><p>Đúc rót khuôn thạch cao (Battery Casting) là công đoạn tạo hình nền tảng trong sản xuất thiết bị sứ vệ sinh. Trước đây, công nhân phải nâng vác các bộ khuôn thạch cao nặng từ 80 - 150kg rất vất vả và nguy hiểm. <strong>Dây chuyền đúc băng tự động khung dầm Gantry</strong> do ITC Technology thiết kế và chế tạo giúp tự động hóa khâu mở khuôn, rót hồ và tách phôi mộc, nâng sản lượng lên gấp 3 lần và chuẩn hóa độ dày phôi mộc đồng đều.</p><h4>Cấu tạo hệ thống dây chuyền:</h4><ul><li><strong>Khung dầm thép Gantry chịu tải siêu bền:</strong> Hệ thống khung cột dầm thép hình I sơn phủ màu cam công nghiệp chống ăn mòn, chịu tải hàng chục tấn khuôn thạch cao và phôi sứ ẩm.</li><li><strong>Cầu trục treo đối trọng mở khuôn trợ lực:</strong> Nửa khuôn thạch cao trên được móc nối với hệ thống cáp treo và cơ cấu đối trọng trợ lực khí nén. Công nhân chỉ cần dẫn hướng nhẹ nhàng là cụm khuôn được nâng mở hoặc hạ đóng chuẩn xác không gây va đập mẻ góc khuôn.</li><li><strong>Đường ống rót hồ và hút xả hồ thừa áp lực:</strong> Hệ thống ống dẫn hồ trung tâm cấp hồ rót đồng thời cho toàn bộ dãy hàng chục bộ khuôn trên băng. Sau khi phôi hình thành đủ độ dày, hệ thống van chân không tự động hút sạch hồ thừa hồi về bể khuấy.</li><li><strong>Băng tải tiếp nhận và chuyển phôi mộc:</strong> Dưới gầm bàn đúc hoặc song song bên cạnh được bố trí dàn con lăn và băng chuyền đón nhận phôi mộc sau khi tách khuôn để chuyển tiếp sang trạm lau mộc.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Sản lượng thiết kế', value: '40 - 100 sản phẩm bồn cầu nguyên khối / ca / dây chuyền' },
      { label: 'Kết cấu khung dầm', value: 'Dầm thép hình I và cột thép hộp SS400 sơn màu cam công nghiệp' },
      { label: 'Cơ cấu nâng mở khuôn', value: 'Cáp treo đối trọng trợ lực khí nén / tời nâng điện điều khiển nút bấm' },
      { label: 'Hệ thống cấp xả hồ', value: 'Đường ống dẫn hồ áp lực PVC/thép chịu mài mòn, van điều tiết tự động' },
      { label: 'Loại khuôn tương thích', value: 'Khuôn thạch cao mao dẫn chuyên dụng đúc bệt, két nước, chậu rửa' },
      { label: 'Băng tải hoàn thiện', value: 'Băng tải con lăn tiếp nhận phôi mộc song song mặt bàn đúc' }
    ],
    featured: true,
    views: 350,
    createdAt: '2026-03-28T08:00:00Z'
  },
  {
    id: 'prod-cer-12',
    code: 'TOOL-ART-SAN12',
    slug: 'bo-dung-cu-thu-cong-cao-bavia-va-sua-phoi-moc-su-ve-sinh',
    categoryId: 'cat-ceramic',
    name: 'Bộ dụng cụ thủ công cạo bavia, tỉa mép và vá sửa phôi mộc gốm sứ (Ceramic Greenware Trimming & Finishing Artisan Toolset)',
    thumbnail: '/images/sanitary_repair_tools.jpg',
    images: ['/images/sanitary_repair_tools.jpg'],
    shortDesc: 'Bộ dụng cụ hoàn thiện phôi sứ mộc thủ công chuyên nghiệp: gương soi góc đáy lòng bồn cầu, chổi quét mộc lông thỏ mềm, dao nạo móc thép định hình và miếng vuốt mộc đàn hồi tạo bề mặt láng mịn.',
    content: '<h3>Bộ dụng cụ thủ công cạo bavia và vá sửa phôi mộc sứ vệ sinh chuyên nghiệp</h3><p>Mặc dù công đoạn tạo hình ngày càng được cơ giới hóa, bàn tay khéo léo của người thợ vá mộc vẫn là yếu tố không thể thay thế để tạo nên những sản phẩm bồn cầu và chậu lavabo đạt độ tinh xảo hoàn mỹ trước khi tráng men. <strong>Bộ dụng cụ vá sửa mộc thủ công chuyên nghiệp</strong> do ITC cung cấp là trang bị tiêu chuẩn tại các phân xưởng hoàn thiện phôi sứ hàng đầu.</p><h4>Chi tiết bộ dụng cụ nghề gốm:</h4><ul><li><strong>Gương soi góc nghiêng cán dài:</strong> Cán inox thanh mảnh dài 450mm với đầu gương phản chiếu góc nghiêng, giúp thợ kiểm tra kỹ lưỡng các vết nứt bavia bên trong lòng ống bẫy xiphong và các góc khuất sâu dưới đáy bệt.</li><li><strong>Bút lông thỏ cán gỗ tự nhiên:</strong> 04 bút lông đầu tròn sợi mềm mịn, dùng để quét sạch các hạt bụi cát thạch cao bám trên phôi mộc mà không làm trầy xước bề mặt đất sét còn non.</li><li><strong>Chổi quét mộc phẳng:</strong> Chổi bản dẹt cán gỗ dùng quét nước hồ kết dính khi ghép mí két nước hoặc xử lý vết nứt rạn mép vành xả.</li><li><strong>Cụm 03 dao nạo móc thép màu xanh:</strong> Lưỡi thép hợp kim mài sắc uốn góc vuông và góc vát chuyên dụng gọt sạch ba via tại đường phân khuôn ghép của khuôn thạch cao.</li><li><strong>Miếng vuốt mộc đàn hồi & thước gạt phẳng:</strong> Tấm vuốt sừng/nhựa dẻo tạo độ cong mượt mà cho vành bồn cầu và thước thép gạt phẳng đáy đế tiếp xúc sàn.</li></ul>',
    specs: [
      { label: 'Ngành công nghiệp', value: 'Ngành sản xuất sứ vệ sinh' },
      { label: 'Gương soi lòng xiphong', value: 'Cán inox không gỉ 450mm, gương soi góc nghiêng kiểm tra góc khuất' },
      { label: 'Bút lông quét mộc', value: '04 bút lông thỏ đầu tròn cán gỗ tự nhiên thân tròn êm tay' },
      { label: 'Chổi quét hồ mộc', value: '01 chổi quét bản rộng lông mềm có bao bọc bảo vệ' },
      { label: 'Dao nạo tỉa bavia', value: '03 dao móc thép định hình màu xanh, mũi gọt bavia sắc ngọt' },
      { label: 'Miếng vuốt định hình', value: '01 miếng vuốt sừng cong đàn hồi & 01 tấm gạt phẳng hợp kim' }
    ],
    featured: false,
    views: 175,
    createdAt: '2026-03-28T10:15:00Z'
  }
];

// Append new products if not already existing
for (const p of newProducts) {
  const existingIdx = db.products.findIndex(prod => prod.id === p.id || prod.slug === p.slug);
  if (existingIdx >= 0) {
    db.products[existingIdx] = p;
    console.log(`Updated existing product: ${p.code}`);
  } else {
    db.products.push(p);
    console.log(`Added new product: ${p.code}`);
  }
}

// 3. Define new articles based on rendered images
const newArticles = [
  {
    id: 'art-11',
    slug: 'quy-trinh-kiem-soat-chat-luong-qc-ro-khi-va-thu-tai-do-ben-su-ve-sinh',
    title: 'Quy trình Kiểm soát Chất lượng QC: Kiểm tra Rò khí Áp suất, Hút chân không và Thử tải Độ bền Nắp bồn cầu Tiêu chuẩn Quốc tế',
    category: 'Ngành sản xuất sứ vệ sinh',
    industry: 'Ngành sản xuất sứ vệ sinh',
    thumbnail: '/images/sanitary_qc_leak_tester.jpg',
    shortDesc: 'Phân tích chuyên sâu phương pháp kiểm tra rò khí áp suất dương, thử khí chân không và quy trình thử nghiệm lực tĩnh - lực động nắp bồn cầu theo tiêu chuẩn ASME/EN 997 trong nhà máy sứ hiện đại.',
    content: '<p>Trong ngành sản xuất sứ vệ sinh, chất lượng hoàn thiện không chỉ nằm ở lớp men sáng bóng bề mặt mà quan trọng hơn cả là <strong>độ kín tuyệt đối của kết cấu thân sứ</strong> và <strong>độ bền cơ học của các cụm chi tiết phụ trợ</strong>. Chỉ một vết nứt mao dẫn vi mô trong lòng bẫy xiphong cũng có thể gây thấm rò nước, bốc mùi hôi thối trong quá trình sử dụng của khách hàng. Bài viết dưới đây chia sẻ quy trình kiểm soát chất lượng QC chuyên sâu áp dụng tại các nhà máy sứ vệ sinh hàng đầu.</p><h3>1. Phương pháp Kiểm tra Rò khí Áp suất dương (Pneumatic Leak Testing)</h3><p>Đây là phương pháp kiểm định nhanh phổ biến ngay trước công đoạn đóng gói:</p><ul><li><strong>Cơ chế làm kín tự động:</strong> Bồn cầu được đưa vào bệ thử trên dàn con lăn. Xi lanh khí nén ép các tấm gioăng EPDM chuyên dụng bịt kín họng xả đáy và vành xả nước.</li><li><strong>Nạp áp suất khí nén:</strong> Khí nén được bơm vào lòng bồn cầu với áp suất kiểm tra từ 0.05 đến 0.15 MPa thông qua van tiết lưu định lượng.</li><li><strong>Phát hiện sụt áp vi sai:</strong> Cảm biến áp suất kỹ thuật số theo dõi độ sụt áp trong thời gian duy trì từ 10 - 15 giây. Nếu áp suất giảm vượt quá ngưỡng cho phép, hệ thống kích hoạt đèn tháp cảnh báo đỏ và khóa chu trình, loại bỏ phế phẩm ngay lập tức.</li></ul><h3>2. Phương pháp Hút chân không siêu nhạy (Vacuum Leak Detection)</h3><p>Đối với các dòng sản phẩm bồn cầu xuất khẩu cao cấp sang thị trường Nhật Bản và Châu Âu, <strong>Máy thử khí phương pháp hút chân không (Máy thử khí số 2)</strong> mang lại độ chính xác vượt trội:</p><ul><li>Bơm chân không hút kiệt không khí bên trong khoang bẫy xiphong xuống mức áp suất âm -40 kPa.</li><li>Đồng hồ đo áp suất chân không kỹ thuật số độ nhạy tới 0.1 Pa ghi nhận biến thiên chênh lệch. Nhờ hiện tượng chênh áp chân không, ngay cả những lỗ mọt rỗng vi mô hay vết nứt ngầm chưa xuyên thủng cũng bị phát hiện dễ dàng.</li><li>Màn chắn mica trong suốt chịu lực cao bảo vệ an toàn tối đa cho kỹ thuật viên thao tác.</li></ul><h3>3. Thử nghiệm độ bền cơ học nắp bồn cầu 2 trạm (EN 997 & ASME)</h3><p>Hệ thống máy thử nghiệm nắp bồn cầu 2 trạm của ITC thực hiện đồng thời 2 bài thử nghiệm khắt khe:</p><ul><li><strong>Thử nghiệm lực động (Dynamic Load Test):</strong> Ba cụm xi lanh khí nén mô phỏng lực ngồi và va đập dập nắp liên tục với tần số 15 lần/phút, kéo dài tới 50,000 - 100,000 chu kỳ để đánh giá độ bền bản lề giảm chấn soft-close.</li><li><strong>Thử nghiệm tải trọng tĩnh (Static Load Test):</strong> Xi lanh thủy lực nén tải trọng tĩnh lên tới 250 - 300 kg lên mặt bệ ngồi và giữ trong 10 phút để kiểm tra độ biến dạng đàn hồi và giới hạn chịu tải gãy vỡ của vật liệu nhựa UF / PP.</li></ul><p>Việc ứng dụng đồng bộ bộ ba thiết bị kiểm tra QC này giúp các nhà máy sứ vệ sinh nâng tỷ lệ đạt chuẩn xuất xưởng lên 99.8%, triệt tiêu hoàn toàn khiếu nại bảo hành từ người tiêu dùng.</p>',
    author: 'Kỹ sư Trưởng Phòng Đảm bảo Chất lượng QC Sứ Vệ Sinh ITC',
    published: true,
    createdAt: '2026-03-27T14:00:00Z'
  },
  {
    id: 'art-12',
    slug: 'cong-nghe-buong-say-moc-tu-dong-kiem-soat-nhiet-am-da-cap-dry1-dry18',
    title: 'Công nghệ Buồng sấy mộc Tự động: Kiểm soát Nhiệt - Ẩm Đa cấp DRY1-DRY18 Triệt tiêu Nứt ngầm Phôi mộc Sứ vệ sinh',
    category: 'Ngành sản xuất sứ vệ sinh',
    industry: 'Ngành sản xuất sứ vệ sinh',
    thumbnail: '/images/sanitary_dryer_chambers.jpg',
    shortDesc: 'Giải pháp buồng sấy mộc tuần hoàn khí nóng đa vùng điều khiển bằng HMI: cơ chế rút ẩm từ từ, chống biến dạng co ngót và triệt tiêu 100% tỷ lệ nứt phôi bồn cầu trước khi nung.',
    content: '<p>Trong chuỗi quy trình sản xuất gốm sứ vệ sinh, giai đoạn phôi mộc (Greenware) sau khi tháo khỏi khuôn thạch cao chứa tới 18% - 22% độ ẩm tự do. Nếu phôi được phơi khô tự nhiên hoặc sấy cưỡng bức không đúng quy trình nhiệt động học, hiện tượng bốc hơi nước cục bộ quá nhanh sẽ tạo ra ứng suất co ngót không đều giữa các thành dày và mỏng, gây nứt toác hoặc biến dạng hình học của thân bồn cầu. <strong>Hệ thống Buồng sấy mộc tự động hóa ITC với chương trình điều khiển 18 bước DRY1-DRY18</strong> mang lại bước đột phá toàn diện.</p><h3>1. Bản chất cơ lý của quá trình thoát ẩm phôi gốm sứ</h3><p>Quá trình sấy phôi mộc bồn cầu trải qua 3 giai đoạn nhiệt ẩm quan trọng:</p><ul><li><strong>Giai đoạn gia nhiệt đồng đều & ủ ẩm:</strong> Duy trì độ ẩm buồng sấy ở mức cao (> 85% RH) và tăng nhiệt độ từ từ lên 40 - 45°C để làm ấm toàn bộ khối phôi từ trong ruột ra ngoài bề mặt mà không cho nước bốc hơi sớm.</li><li><strong>Giai đoạn bốc hơi nước tự do & co ngót thể tích:</strong> Giảm dần độ ẩm buồng xuống 60% RH và nâng nhiệt lên 60°C. Đây là giai đoạn nguy hiểm nhất vì phôi bắt đầu co ngót kích thước. Tốc độ quạt đảo gió phải được điều tiết cực kỳ êm dịu để bề mặt phôi không bị khô cứng trước ruột.</li><li><strong>Giai đoạn sấy kiệt độ ẩm liên kết:</strong> Nâng nhiệt độ lên 80 - 85°C và hạ độ ẩm xuống dưới 20% RH để rút kiệt lượng nước còn lại, đưa độ ẩm phôi mộc về dưới 1% trước khi chuyển sang công đoạn phun tráng men.</li></ul><h3>2. Kiến trúc Buồng sấy cách nhiệt & Quạt đảo gió hình nón</h3><p>Hệ thống buồng sấy ITC được chế tạo từ các cấu kiện cơ điện đồng bộ:</p><ul><li><strong>Vỏ panel bọc tôn bảo ôn:</strong> Panel cách nhiệt Polyurethane dày 75mm khóa ngàm camlock kín khít, mặt trong ốp tôn mạ kẽm dập gân nhôm phản xạ bức xạ nhiệt, giữ hệ số tổn thất nhiệt dưới 3%.</li><li><strong>Dãy nón đảo gió tuần hoàn treo trần:</strong> Chụp nón côn bằng tôn mạ kẽm với các khe hướng gió đa hướng, xoay đảo góc liên tục giúp dòng khí nóng quét đều từ đỉnh két nước xuống tận đáy chân bồn cầu, triệt tiêu 100% hiện tượng đọng khí ẩm lạnh ở sàn.</li><li><strong>Hệ thống xe gòn đẩy tay lăn trên ray âm sàn:</strong> Các tầng xe gòn được tính toán khoảng cách thông gió tối ưu, đệm silicon chống mẻ mép, giúp 1 công nhân có thể dễ dàng vận chuyển 24 thân bệt vào khoang sấy.</li></ul><h3>3. Tủ điều khiển HMI thông minh: Giám sát thời gian thực</h3><p>Màn hình cảm ứng HMI cho phép người vận hành cài đặt độc lập 18 bước sấy (DRY1 đến DRY18) với các tham số: Thời gian sấy (Hour/Min), Nhiệt độ mục tiêu (°C), Độ ẩm mục tiêu (%RH). Bộ điều khiển PLC tự động đóng ngắt đầu đốt gas tỉ lệ, van cấp ẩm phun sương siêu mịn và van xả ẩm đối lưu, đảm bảo mỗi mẻ sấy đều đạt chất lượng hoàn hảo tuyệt đối.</p>',
    author: 'Kỹ sư Tự động hóa Nhiệt & Sấy Công nghiệp ITC',
    published: true,
    createdAt: '2026-03-28T09:00:00Z'
  },
  {
    id: 'art-13',
    slug: 'ky-thuat-day-chuyen-duc-bang-khuon-thach-cao-ban-tu-dong-san-xuat-bon-cau',
    title: 'Kỹ thuật Dây chuyền Đúc băng Khuôn thạch cao Bán tự động: Nâng cao Năng suất & Chuẩn hóa Phôi mộc Sứ vệ sinh',
    category: 'Ngành sản xuất sứ vệ sinh',
    industry: 'Ngành sản xuất sứ vệ sinh',
    thumbnail: '/images/sanitary_casting_orange_line.jpg',
    shortDesc: 'Tổng quan kết cấu dây chuyền đúc băng khung dầm thép: cơ chế rót hồ áp lực, nâng mở khuôn thạch cao đối trọng trợ lực và quy trình cạo tỉa vá mộc hoàn thiện sản phẩm.',
    content: '<p>Tạo hình phôi sứ bằng phương pháp đúc rót hồ trong khuôn thạch cao (Gypsum Plaster Battery Casting) là công nghệ kinh điển nhưng vẫn chiếm vị trí chủ đạo nhờ chi phí khuôn hợp lý và khả năng tạo ra các biên dạng bồn cầu liền khối phức tạp. Để giải phóng sức lao động nặng nhọc cho công nhân và nâng cao độ chính xác kích thước phôi mộc, <strong>Dây chuyền đúc băng bán tự động khung dầm Gantry</strong> của ITC Technology là sự lựa chọn nâng cấp hàng đầu cho các nhà máy sứ vệ sinh hiện nay.</p><h3>1. Kết cấu khung dầm Gantry & Cáp treo đối trọng trợ lực</h3><p>Tại các xưởng thủ công trước đây, việc bê nhấc các mảnh khuôn thạch cao nặng hàng trăm kilogam đòi hỏi 2 - 3 thợ khỏe mạnh. Dây chuyền đúc băng hiện đại đã cơ giới hóa hoàn toàn khâu này:</p><ul><li><strong>Hệ thống dầm thép Gantry sơn màu cam chịu lực:</strong> Kết cấu dầm thép hình chữ I chịu uốn cao kết hợp hàng cột thép hộp vững chắc chạy dọc toàn bộ chiều dài phân xưởng.</li><li><strong>Cáp treo đối trọng trợ lực khí nén:</strong> Cụm nửa khuôn thạch cao phía trên được liên kết với hệ thống cáp treo cân bằng. Người thợ chỉ cần dùng một tay đẩy nhẹ là khối khuôn nặng 100kg được nhấc bổng êm ái, định vị chính xác vào vị trí úp khuôn mà không gây sứt mẻ mặt phân khuôn.</li><li><strong>Băng con lăn trượt phôi tiếp nhận:</strong> Song song với bàn đúc là dàn con lăn dẫn hướng, sau khi tách khuôn, phôi mộc được hạ nhẹ nhàng xuống tấm đế trượt sang khu vực lau bavia.</li></ul><h3>2. Hệ thống cấp hồ áp lực & Thu hồi hồ thừa tự động</h3><p>Chất lượng phôi mộc phụ thuộc vào tốc độ rót hồ và độ ổn định của dòng chảy:</p><ul><li>Đường ống dẫn hồ trung tâm bằng nhựa chịu mài mòn kết nối trực tiếp với từng đầu rót của khuôn thạch cao. Áp lực hồ ổn định từ 0.2 - 0.4 bar giúp hồ điền đầy các ngóc ngách vành xả rimless mà không tạo bọt khí.</li><li>Sau thời gian hút ẩm tạo độ dày thành phôi (khoảng 60 - 90 phút), hệ thống van hút chân không tự động hút ngược toàn bộ lượng hồ lỏng thừa trong lòng bệt hồi về bể khuấy trung tâm, không làm vương vãi hồ ra sàn nhà xưởng.</li></ul><h3>3. Nghệ thuật vá sửa mộc bằng bộ dụng cụ chuyên dụng</h3><p>Sau khi phôi mộc được nhấc ra khỏi khuôn, công nhân sử dụng <strong>Bộ dụng cụ vá mộc chuyên nghiệp</strong> gồm dao nạo thép móc bavia đường ghép mí, chổi lông thỏ quét bụi khuôn và gương soi cán dài để kiểm tra độ thông thoáng của ống bẫy xiphong, đảm bảo 100% phôi mộc đạt chuẩn thẩm mỹ cao nhất trước khi đưa vào buồng sấy.</p>',
    author: 'Chuyên gia Dây chuyền Đúc rót Sứ Vệ Sinh ITC',
    published: true,
    createdAt: '2026-03-29T11:00:00Z'
  }
];

// Append new articles if not already existing
for (const a of newArticles) {
  const existingIdx = db.articles.findIndex(art => art.id === a.id || art.slug === a.slug);
  if (existingIdx >= 0) {
    db.articles[existingIdx] = a;
    console.log(`Updated existing article: ${a.id} (${a.slug})`);
  } else {
    db.articles.push(a);
    console.log(`Added new article: ${a.id} (${a.slug})`);
  }
}

// Write back to database.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('\n================================================================');
console.log(' DATABASE.JSON CAP NHAT THANH CONG!');
console.log(` - Tong so san pham: ${db.products.length}`);
console.log(` - San pham nganh su ve sinh (cat-ceramic): ${db.products.filter(p => p.categoryId === 'cat-ceramic').length}`);
console.log(` - Tong so bai viet: ${db.articles.length}`);
console.log(` - Bai viet nganh su ve sinh: ${db.articles.filter(a => a.category === 'Ngành sản xuất sứ vệ sinh').length}`);
console.log('================================================================');
