/**
 * ITC TECHNOLOGY - Internationalization (i18n) Engine
 * Supported Languages:
 *   - vi: Tiếng Việt (Default)
 *   - en: English
 *   - zh: 简体中文 (Simplified Chinese)
 */

export const SUPPORTED_LANGS = ['vi', 'en', 'zh'];

// Comprehensive Bilingual / Trilingual UI Dictionary
export const DICTIONARY = {
  // Navigation & Topbar
  'Trang chủ': { en: 'Home', zh: '首页' },
  'Giới thiệu & Năng lực': { en: 'About & Capabilities', zh: '公司简介与实力' },
  'Giới thiệu': { en: 'About Us', zh: '关于我们' },
  'Sản phẩm': { en: 'Products', zh: '产品中心' },
  'Tin tức & Kỹ thuật': { en: 'News & Technical', zh: '新闻与技术' },
  'Tin tức': { en: 'News', zh: '新闻资讯' },
  'Liên hệ': { en: 'Contact Us', zh: '联系我们' },
  'Yêu cầu báo giá': { en: 'Request a Quote', zh: '索取报价' },
  'Báo Giá Nhanh': { en: 'Quick Quote', zh: '快速报价' },
  'Báo giá': { en: 'Get Quote', zh: '获取报价' },
  'Hotline:': { en: 'Hotline:', zh: '服务热线:' },
  'Email tiếp nhận:': { en: 'Email:', zh: '电子邮箱:' },
  'Trụ sở chính:': { en: 'Headquarters:', zh: '公司总部:' },
  'Xưởng chế tạo:': { en: 'Factory / Workshop:', zh: '生产基地 / 车间:' },
  'Nhà máy 1 (Trụ sở):': { en: 'Factory 1 (HQ):', zh: '一号厂房 (总部):' },
  'Nhà máy 2 (Xưởng gia công):': { en: 'Factory 2 (Workshop):', zh: '二号厂房 (加工车间):' },
  'Mở Web': { en: 'Open Web', zh: '打开官网' },

  // Slogan & Core Brand
  'GIẢI PHÁP ĐỒ GÁ JIG, XE ĐẨY CÔNG NGHIỆP & MÁY TỰ ĐỘNG HÓA TIÊU CHUẨN QUỐC TẾ': {
    en: 'PRECISION JIG FIXTURES, INDUSTRIAL TROLLEYS & AUTOMATION SPM SOLUTIONS',
    zh: '高精度治具夹具、工业物料推车与非标自动化设备整体解决方案'
  },
  'GIẢI PHÁP ĐỒ GÁ JIG, XE ĐẨY CÔNG NGHIỆP VÀ MÁY TỰ ĐỘNG HÓA TIÊU CHUẨN QUỐC TẾ': {
    en: 'PRECISION JIG FIXTURES, INDUSTRIAL TROLLEYS & AUTOMATION SPM SOLUTIONS',
    zh: '高精度治具夹具、工业物料推车与非标自动化设备整体解决方案'
  },

  // Hero Slider
  'CÔNG NGHỆ CHẾ TẠO CHÍNH XÁC & TỰ ĐỘNG HÓA': {
    en: 'PRECISION MANUFACTURING & AUTOMATION TECHNOLOGY',
    zh: '精密制造与工业自动化技术'
  },
  'Đồ Gá JIG & Thiết Bị Công Nghiệp Tiêu Chuẩn Quốc Tế': {
    en: 'International Standard JIG Fixtures & Industrial Equipment',
    zh: '国际标准高精度治具夹具与工业专用设备'
  },
  'Chuyên sâu thiết kế, chế tạo đồ gá JIG hàn, Jig kiểm tra CMM, xe đẩy part logistics và máy tự động chuyên dụng SPM.': {
    en: 'Specialized in designing and manufacturing welding jigs, CMM checking fixtures, part logistics trolleys, and automated SPM machines.',
    zh: '专业研发制造焊接治具、CMM三坐标检具、物流料车及非标自动化专用机(SPM)。'
  },
  'Khám Phá Giải Pháp': { en: 'Explore Solutions', zh: '探索解决方案' },
  'Yêu Cầu Báo Giá': { en: 'Request a Quote', zh: '索取报价' },

  'GIẢI PHÁP VẬN CHUYỂN NỘI BỘ THÔNG MINH': {
    en: 'SMART INTERNAL LOGISTICS SOLUTIONS',
    zh: '智能厂内物流搬运解决方案'
  },
  'Xe Đẩy Part & Hệ Thống Kệ Giá Logistics Thông Minh': {
    en: 'Industrial Part Trolleys & Smart Logistics Racks',
    zh: '工业料车推车与智能仓储物流货架系统'
  },
  'Tối ưu hóa dòng chảy vật liệu sản xuất, tích hợp kéo tàu AGV/AMR, bảo vệ bề mặt chi tiết phôi theo tiêu chuẩn 5S & Kaizen.': {
    en: 'Optimizing production material flows, integrating with AGV/AMR tugger trains, protecting workpiece surfaces under 5S & Kaizen standards.',
    zh: '优化生产物料流转，无缝对接AGV/AMR无人牵引系统，严格遵循5S与Kaizen精益生产标准。'
  },
  'Xem Danh Mục Xe Đẩy': { en: 'View Trolley Catalog', zh: '查看料车目录' },
  'Tư Vấn Thiết Kế': { en: 'Design Consultation', zh: '设计技术咨询' },

  'TỰ ĐỘNG HÓA NHÀ MÁY THÔNG MINH (SMART FACTORY)': {
    en: 'SMART FACTORY INDUSTRIAL AUTOMATION',
    zh: '智能工厂工业自动化集成'
  },
  'Máy Tự Động Hóa SPM & Tích Hợp Robot Hàn Công Nghiệp': {
    en: 'Automated SPM Machines & Robotic Welding Cell Integration',
    zh: '非标自动化专用机(SPM)与机器人焊接工作站'
  },
  'Giải pháp trọn gói từ tư vấn thiết kế 3D, gia công CNC chính xác, lập trình PLC/HMI đến chuyển giao công nghệ tại nhà máy khách hàng.': {
    en: 'Turnkey solutions from 3D CAD design, precision CNC machining, PLC/HMI programming to turnkey on-site handover.',
    zh: '提供从3D设计、精密CNC加工、PLC/HMI电控编程到现场交钥匙投产的一站式工程服务。'
  },
  'Khảo Sát Tận Nơi': { en: 'On-site Survey', zh: '预约现场勘测' },
  'Xem Năng Lực Sản Xuất': { en: 'Production Capabilities', zh: '查看生产实力' },

  // Stats Bar (Capacity Profile)
  '15+ Năm': { en: '15+ Years', zh: '15+ 年' },
  'Kinh nghiệm chế tạo máy & Jig': { en: 'Experience in Jig & Machine Manufacturing', zh: '治具夹具与专用机制造经验' },
  'Dự án chuyển giao thành công': { en: 'Successfully Delivered Projects', zh: '成功交付工程项目' },
  'Diện tích 02 nhà máy sản xuất': { en: 'Area of 02 Modern Facilities', zh: '两大现代化生产厂房面积' },
  'Hệ thống quản lý chất lượng': { en: 'Certified Quality Management System', zh: '国际质量管理体系认证' },

  // Category Showcase
  'Lĩnh vực hoạt động chính': { en: 'Core Business Areas', zh: '核心业务领域' },
  'Danh Mục Sản Phẩm & Giải Pháp': { en: 'Product Categories & Industrial Solutions', zh: '产品分类与工业解决方案' },
  'Cung cấp trọn gói từ khâu khảo sát, thiết kế 3D, gia công CNC chính xác đến lắp ráp và tích hợp hệ thống điều khiển tự động.': {
    en: 'Turnkey solutions from surveying, 3D design, precision CNC machining to assembly and automated control system integration.',
    zh: '提供从现场测绘、3D仿真设计、精密CNC加工到装配与电气集成的一站式服务。'
  },
  'Đồ gá & JIG công nghiệp': { en: 'Industrial JIGs & Precision Fixtures', zh: '工业治具与高精度夹具' },
  'JIG hàn khung xe, Jig kiểm tra CMM, Jig lắp ráp linh kiện với độ chính xác cao dung sai ±0.01mm.': {
    en: 'Vehicle welding jigs, CMM checking fixtures, and assembly jigs with high precision ±0.01mm tolerance.',
    zh: '车架焊接治具、CMM三坐标检具、高精度装配夹具，公差精度达±0.01mm。'
  },
  'Đồ gá JIG': { en: 'JIG Fixtures', zh: '治具夹具' },
  'Xe đẩy part & Kệ logistics': { en: 'Part Trolleys & Logistics Racks', zh: '物料推车与物流货架' },
  'Xe đẩy part': { en: 'Part Trolleys', zh: '物料推车' },
  'Xe đẩy chuyển part ô tô xe máy, xe kéo AGV, giá kệ Flow Rack FIFO đáp ứng tiêu chuẩn sản xuất tinh gọn Lean 5S.': {
    en: 'Automotive part trolleys, AGV tugger carts, and FIFO Flow Racks conforming to Lean 5S standards.',
    zh: '汽摩零部件物料车、AGV无人料车、精益FIFO流利条货架，符合5S生产标准。'
  },
  'Máy tự động chuyên dụng SPM': { en: 'Special Purpose Machines (SPM)', zh: '非标自动化专用机 (SPM)' },
  'Máy tự động SPM': { en: 'SPM Machines', zh: '自动化专用机' },
  'Máy cấp phôi tự động, máy siết ốc tự động, máy ép thủy lực servo và dây chuyền đóng gói kiểm tra.': {
    en: 'Automatic feeding machines, automated screwdriving, servo hydraulic presses, and inspection lines.',
    zh: '自动送料机、自动锁螺丝机、伺服液压压装机及自动化检验包装流水线。'
  },
  'Robot hàn & Cắt tự động': { en: 'Welding & Cutting Robot Cells', zh: '焊接与切割工业机器人工作站' },
  'Robot công nghiệp': { en: 'Industrial Robots', zh: '工业机器人' },
  'Tích hợp cánh tay robot công nghiệp Yaskawa, ABB, Fanuc ứng dụng hàn CO2, TIG, laser và cắt plasma chính xác.': {
    en: 'Integrating Yaskawa, ABB, Fanuc industrial robot arms for CO2, TIG, laser welding, and precision cutting.',
    zh: '集成安川、ABB、发那科等工业机器人，应用于CO2焊接、氩弧焊、激光焊与等离子切割。'
  },
  'Hệ thống AGV & Kho thông minh': { en: 'AGV Systems & Smart Warehousing', zh: 'AGV无人搬运与智能仓储系统' },
  'Hệ thống AGV': { en: 'AGV Systems', zh: 'AGV系统' },
  'Xe tự hành AGV định vị Laser SLAM, băng tải con lăn tự động và hệ thống kho chứa pallet thông minh.': {
    en: 'Laser SLAM AGVs, automated roller conveyors, and intelligent pallet warehousing systems.',
    zh: '激光SLAM导航AGV无人搬运车、自动化滚筒输送线与智能托盘立体仓储系统。'
  },
  'Gia công cơ khí chính xác': { en: 'Precision CNC Machining', zh: 'CNC精密机械加工' },
  'Gia công CNC': { en: 'CNC Machining', zh: 'CNC精密加工' },
  'Xem các sản phẩm': { en: 'View Products', zh: '查看相关产品' },

  // Featured Products Section
  'Sản phẩm tiêu biểu': { en: 'Featured Products', zh: '精选工业产品' },
  'Sản Phẩm & Thiết Bị Nổi Bật': { en: 'Featured Products & Equipment', zh: '特色设备与重点产品' },
  'Tất cả sản phẩm': { en: 'All Products', zh: '全部产品' },
  'Xem tất cả sản phẩm': { en: 'View All Products', zh: '查看全部产品' },
  'Xem chi tiết': { en: 'View Details', zh: '查看详情' },
  'Mã SP:': { en: 'Code:', zh: '编号:' },
  'Danh mục:': { en: 'Category:', zh: '分类:' },
  'Liên hệ nhận báo giá': { en: 'Contact for Quote', zh: '联系获取报价' },

  // Why Choose Us / Strengths
  'Năng lực cạnh tranh': { en: 'Competitive Strengths', zh: '核心竞争实力' },
  'Tại Sao Doanh Nghiệp Chọn ITC Technology?': { en: 'Why Choose ITC Technology?', zh: '为什么选择 ITC Technology？' },
  'Chúng tôi đồng hành cùng các tập đoàn đa quốc gia và doanh nghiệp FDI hàng đầu tại Việt Nam trong chiến lược nâng cao năng suất và tự động hóa dây chuyền.': {
    en: 'We partner with leading multinational corporations and FDI enterprises in Vietnam to boost productivity and line automation.',
    zh: '我们携手在越跨国企业与大型外资工厂，共同提升产线效率与智能自动化水平。'
  },
  'Thiết Kế 3D Chuyên Nghiệp': { en: 'Professional 3D CAD Engineering', zh: '专业3D工程研发设计' },
  'Mô phỏng động học SolidWorks, Inventor và phân tích ứng suất trước khi gia công, triệt tiêu sai số lắp ráp.': {
    en: 'SolidWorks and Inventor kinematic simulation with FEA stress analysis prior to machining, eliminating assembly errors.',
    zh: '采用SolidWorks与Inventor进行运动学仿真及有限元应力分析，在加工前消除一切装配误差。'
  },
  'Dàn máy phay, tiện CNC Makino, Mazak hiện đại, gia công chi tiết dung sai chặt chẽ đạt ±0.005mm.': {
    en: 'Modern Makino and Mazak CNC milling and turning centers, achieving tight tolerances up to ±0.005mm.',
    zh: '配备日本牧野、马扎克等现代化CNC数控加工中心，零件加工精度严格控制在±0.005mm以内。'
  },
  'Đội Ngũ Kỹ Sư Giàu Kinh Nghiệm': { en: 'Experienced Engineering Team', zh: '资深工程技术团队' },
  'Hơn 15 năm kinh nghiệm thực chiến trong các nhà máy sản xuất ô tô, xe máy, linh kiện điện tử FDI.': {
    en: 'Over 15 years of hands-on experience in automotive, motorcycle, and electronics FDI factories.',
    zh: '拥有15年以上服务国际大型汽车、摩托车及电子外资企业的实战工程经验。'
  },
  'Kiểm Soát Chất Lượng CMM': { en: 'Strict CMM Quality Control', zh: '三坐标CMM精密品质检测' },
  '100% đồ gá được đo kiểm tọa độ 3 chiều (CMM Mitutoyo) trước khi xuất xưởng, cấp chứng thư đo lường chuẩn.': {
    en: '100% of fixtures undergo 3D CMM Mitutoyo inspection before shipping, with certified calibration reports.',
    zh: '100%的治具与检具出厂前均经过日本三丰三坐标CMM检测，附带正式第三方计量检测报告。'
  },
  'Chính Sách Bảo Hành Dài Hạn': { en: 'Long-term Warranty & Support', zh: '长期质保与售后支持' },
  'Bảo hành thiết bị từ 12 - 24 tháng, dịch vụ hỗ trợ kỹ thuật tận nơi và bảo dưỡng định kỳ trọn đời.': {
    en: '12 to 24 months warranty, prompt on-site technical support, and lifetime routine maintenance service.',
    zh: '提供12至24个月整机质保，快速响应现场技术服务并提供终身定期保养支持。'
  },
  'Tiến Độ Bàn Giao Nhanh Chóng': { en: 'Fast Delivery Timelines', zh: '交货迅速严格守时' },
  'Quy trình quản lý dự án tối ưu giúp rút ngắn tiến độ chế tạo 20% so với thị trường mà vẫn đảm bảo độ bền.': {
    en: 'Optimized project management shortens manufacturing lead times by 20% while maintaining superior durability.',
    zh: '标准高效的项目管理流程，比行业平均缩短20%的制造交付周期，同时确保卓越耐用品质。'
  },

  // News & Articles
  'Kiến thức chuyên ngành': { en: 'Technical Insights', zh: '行业动态与技术资讯' },
  'Tin Tức Kỹ Thuật & Hoạt Động Doanh Nghiệp': { en: 'Technical News & Company Activities', zh: '技术专栏与企业新闻' },
  'Cập nhật các xu hướng tự động hóa, cẩm nang chế tạo đồ gá và hoạt động nổi bật tại nhà máy ITC.': {
    en: 'Stay updated on automation trends, fixture manufacturing guides, and featured activities at ITC factories.',
    zh: '实时更新工业自动化趋势、治具制造工艺指南及ITC工厂最新动态与业绩。'
  },
  'Đọc tiếp': { en: 'Read More', zh: '阅读全文' },
  'Xem tất cả bài viết': { en: 'View All Articles', zh: '查看全部文章' },

  // CTA & RFQ Section
  'Khởi Động Dự Án Tự Động Hóa Của Bạn Cùng ITC': {
    en: 'Start Your Automation Project With ITC',
    zh: '携手 ITC 开启工厂自动化与智能化升级'
  },
  'Đội ngũ kỹ sư cơ điện tử của chúng tôi sẵn sàng khảo sát hiện trường, tư vấn giải pháp tối ưu và gửi báo giá trong vòng 24 giờ làm việc.': {
    en: 'Our team of mechatronics engineers is ready to conduct on-site surveys, recommend optimal solutions, and provide official quotes within 24 hours.',
    zh: '我们的资深机电工程团队随时前往工厂实地考察，量身定制最优方案并在24小时内提供正式报价。'
  },
  'Hotline Kỹ Thuật 24/7': { en: '24/7 Technical Hotline', zh: '24/7 技术服务热线' },
  'Email Nhận Bản Vẽ CAD/3D': { en: 'CAD/3D Drawing Email', zh: 'CAD/3D 图纸接收邮箱' },
  'Nhà Máy Chế Tạo': { en: 'Manufacturing Facility', zh: '研发制造基地' },
  'Họ và tên của bạn (*)': { en: 'Your Full Name (*)', zh: '您的姓名 (*)' },
  'Số điện thoại (*)': { en: 'Phone Number (*)', zh: '联系电话 (*)' },
  'Tên công ty / Nhà máy': { en: 'Company / Factory Name', zh: '公司 / 工厂名称' },
  'Lĩnh vực / Thiết bị cần tư vấn': { en: 'Solution / Equipment of Interest', zh: '咨询产品 / 业务领域' },
  'Mô tả yêu cầu kỹ thuật chi tiết...': {
    en: 'Detailed technical requirements, dimensions, cycle time...',
    zh: '请简要描述您的技术要求、规格、生产节拍等...'
  },
  'GỬI YÊU CẦU TƯ VẤN & BÁO GIÁ': {
    en: 'SUBMIT RFQ & CONSULTATION REQUEST',
    zh: '提交咨询与报价申请'
  },
  'Cam kết bảo mật thông tin bản vẽ kỹ thuật 100%': {
    en: '100% Confidentiality guaranteed for technical drawings',
    zh: '100% 签署保密协议，保护技术图纸与商业机密'
  },

  // Footer
  'Về Chúng Tôi': { en: 'About Us', zh: '关于我们' },
  'Danh Mục Sản Phẩm': { en: 'Product Catalog', zh: '产品分类目录' },
  'Hỗ Trợ Khách Hàng': { en: 'Customer Support', zh: '客户支持' },
  'Quy trình thiết kế & chế tạo': { en: 'Design & Manufacturing Workflow', zh: '设计与制造工程流程' },
  'Tiêu chuẩn kiểm định Jig': { en: 'Jig Inspection & CMM Standards', zh: '治具与检具检验标准' },
  'Chính sách bảo hành & bảo trì': { en: 'Warranty & Maintenance Policy', zh: '质保与售后维护政策' },
  'Tải hồ sơ năng lực (Profile)': { en: 'Download Company Profile', zh: '下载企业资质与业绩文件' },
  'Hỏi đáp kỹ thuật (FAQ)': { en: 'Technical FAQ', zh: '技术常见问题 (FAQ)' },
  'Hotline / Zalo:': { en: 'Hotline / Zalo:', zh: '服务热线 / Zalo:' },
  'Email kỹ thuật:': { en: 'Technical Email:', zh: '商务与技术邮箱:' },
  'All Rights Reserved.': { en: 'All Rights Reserved.', zh: '版权所有。' },

  // RFQ Modal
  'Yêu Cầu Báo Giá Nhanh': { en: 'Quick RFQ Request', zh: '快速索取报价' },
  'Điền thông tin bên dưới để nhận tư vấn kỹ thuật và báo giá chi tiết từ kỹ sư ITC trong 24h.': {
    en: 'Fill in the information below to receive technical consultation and a detailed quotation from ITC engineers within 24h.',
    zh: '请填写以下信息，ITC工程师将在24小时内为您提供专业技术咨询与详细报价方案。'
  },
  'Sản phẩm quan tâm': { en: 'Product of Interest', zh: '意向产品 / 设备' },
  'Nội dung yêu cầu kỹ thuật chi tiết': { en: 'Detailed Technical Requirements', zh: '具体技术要求与说明' },
  'GỬI YÊU CẦU BÁO GIÁ': { en: 'SUBMIT QUOTATION REQUEST', zh: '提交报价申请' },

  // Products Page
  'Danh mục sản phẩm': { en: 'Product Categories', zh: '产品分类目录' },
  'Tìm kiếm sản phẩm, thiết bị, mã Jig...': { en: 'Search products, equipment, Jig code...', zh: '搜索产品名称、型号或治具编号...' },
  'Tìm kiếm': { en: 'Search', zh: '搜索' },
  'Bộ lọc danh mục': { en: 'Categories Filter', zh: '分类筛选' },
  'Danh sách sản phẩm & giải pháp': { en: 'Products & Engineering Solutions', zh: '产品与工程解决方案' },

  // Contact Page
  'Liên Hệ Trực Tiếp Với ITC': { en: 'Contact ITC Technology Directly', zh: '直接联系 ITC Technology' },
  'Gửi Tin Nhắn / Yêu Cầu Hợp Tác': { en: 'Send Message / Partnership Inquiry', zh: '在线留言 / 商务合作申请' },
  'GỬI TIN NHẮN': { en: 'SEND MESSAGE', zh: '发送留言' },
  'Tiêu đề tin nhắn': { en: 'Subject', zh: '留言主题' },
  'Nội dung tin nhắn...': { en: 'Your message details...', zh: '请输入您的留言内容...' },

  // Capabilities Page & Sections
  'Hồ Sơ Năng Lực & Cơ Sở Vật Chất': { en: 'Company Profile & Facilities', zh: '企业资质与生产制造基地' },
  'Năng Lực Thiết Kế & Chế Tạo': { en: 'Design & Manufacturing Capabilities', zh: '工程研发与装备制造能力' },
  'Trang thiết bị máy móc hiện đại': { en: 'Modern Machinery & Equipment', zh: '现代化数控机床与检测设备' },
  'Quy trình kiểm soát chất lượng 5 bước': { en: '5-Step Quality Control Workflow', zh: '5步严格质量管控流程' },
  'Cần Tư Vấn Kỹ Thuật?': { en: 'Need Technical Advice?', zh: '需要技术咨询？' },
  'Đội ngũ kỹ sư cơ điện tử của ITC sẵn sàng hỗ trợ bạn 24/7.': { en: 'ITC mechatronics engineering team is ready to support you 24/7.', zh: 'ITC机电工程师团队24/7随时为您提供专业支持。' },
  'Năng lực sản xuất': { en: 'Manufacturing Capabilities', zh: '生产与制造实力' },
  'Hạ Tầng Nhà Máy & Công Nghệ Gia Công': { en: 'Factory Infrastructure & Machining Technology', zh: '工厂基础设施与先进加工技术' },
  'Hệ thống máy móc hiện đại và đội ngũ kỹ sư cơ điện tử giàu kinh nghiệm đảm bảo chất lượng chuẩn xác đến từng micron.': {
    en: 'Modern machinery and experienced mechatronics engineers ensure precision down to each micron.',
    zh: '现代化先进加工设备与经验丰富的机电工程团队，确保精密达微米级品质。'
  },
  'Trung tâm gia công CNC 3 - 5 Trục': { en: '3 - 5 Axis CNC Machining Center', zh: '3 - 5轴CNC数控加工中心' },
  'Phòng Đo Kiểm CMM Chuẩn Xác': { en: 'Precision CMM Inspection Room', zh: '高精度CMM三坐标测量室' },
  'Chứng Nhận ISO 9001:2015': { en: 'ISO 9001:2015 Certification', zh: 'ISO 9001:2015 质量体系认证' },

  // Industries & Sanitary Ware Solutions
  'Ngành sản xuất sứ vệ sinh': { en: 'Sanitary Ware Manufacturing', zh: '卫生陶瓷装备与生产线' },
  'Ngành phụ trợ ô tô, xe máy': { en: 'Automotive & Motorcycle Industry', zh: '汽车与摩托车配套装备' },
  'Ngành sản xuất Điện tử': { en: 'Electronics Manufacturing', zh: '电子制造自动化装备' },
  'Buồng sấy mộc HMI': { en: 'HMI Drying Chamber', zh: 'HMI智能生坯干燥房' },
  'Đúc băng Gantry': { en: 'Gantry Battery Casting', zh: '龙门式石膏模注浆线' },
  'Máy kiểm tra rò khí': { en: 'Leak Testing Machine', zh: '气密性检漏机' },
  'Thử tải nắp EN 997': { en: 'Seat Tester EN 997', zh: 'EN 997标准盖板试验机' },
  'Hệ thống Robot phun men tự động 6 trục': { en: '6-Axis Robotic Glazing System', zh: '6轴工业机器人自动喷釉系统' },
  'Robot phun men 6 trục': { en: '6-Axis Glazing Robot', zh: '6轴喷釉机器人' },
  'Xem sản phẩm ngành sứ vệ sinh': { en: 'View Sanitary Ware Equipment', zh: '查看卫生陶瓷设备' }
};

// Current active language
let currentLang = 'vi';

/**
 * Get currently selected language ('vi', 'en', 'zh')
 */
export function getCurrentLang() {
  return currentLang;
}

/**
 * Translate a text phrase if available in dictionary
 */
export function t(text, targetLang = currentLang) {
  if (!text || targetLang === 'vi') return text;
  const trimmed = text.trim();
  if (DICTIONARY[trimmed] && DICTIONARY[trimmed][targetLang]) {
    // Preserve leading/trailing whitespace
    const leading = text.match(/^\s*/)[0];
    const trailing = text.match(/\s*$/)[0];
    return leading + DICTIONARY[trimmed][targetLang] + trailing;
  }
  return text;
}

/**
 * Walk through all DOM text nodes and translate phrases
 */
export function translateDomNodes(root = document.body, targetLang = currentLang) {
  if (!root) return;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_SKIP;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_SKIP;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE' || tag === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.classList.contains('lang-flag') || parent.classList.contains('lang-btn')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    // Cache original Vietnamese text on first discovery
    if (node._origViText === undefined) {
      node._origViText = node.nodeValue;
    }

    if (targetLang === 'vi') {
      node.nodeValue = node._origViText;
      return;
    }

    const orig = node._origViText;
    const trimmed = orig.trim();

    // Check direct dictionary match
    if (DICTIONARY[trimmed] && DICTIONARY[trimmed][targetLang]) {
      const leading = orig.match(/^\s*/)[0];
      const trailing = orig.match(/\s*$/)[0];
      node.nodeValue = leading + DICTIONARY[trimmed][targetLang] + trailing;
      return;
    }

    // Check substring matches for longer blocks
    let updated = orig;
    let modified = false;
    for (const [key, trans] of Object.entries(DICTIONARY)) {
      if (key.length >= 4 && updated.includes(key) && trans[targetLang]) {
        updated = updated.split(key).join(trans[targetLang]);
        modified = true;
      }
    }
    if (modified) {
      node.nodeValue = updated;
    }
  });

  // Also translate input and textarea placeholders
  root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    if (el._origPlaceholder === undefined) {
      el._origPlaceholder = el.placeholder;
    }
    if (targetLang === 'vi') {
      el.placeholder = el._origPlaceholder;
    } else if (DICTIONARY[el._origPlaceholder.trim()] && DICTIONARY[el._origPlaceholder.trim()][targetLang]) {
      el.placeholder = DICTIONARY[el._origPlaceholder.trim()][targetLang];
    }
  });

  // Also translate button values or titles
  root.querySelectorAll('[title]').forEach(el => {
    if (el.classList.contains('lang-btn')) return;
    if (el._origTitle === undefined) {
      el._origTitle = el.title;
    }
    if (targetLang === 'vi') {
      el.title = el._origTitle;
    } else if (DICTIONARY[el._origTitle.trim()] && DICTIONARY[el._origTitle.trim()][targetLang]) {
      el.title = DICTIONARY[el._origTitle.trim()][targetLang];
    }
  });
}

/**
 * Configure Google Translate Cookie and trigger auxiliary engine
 */
function setGoogleTranslateEngine(lang) {
  const googleLangCode = lang === 'zh' ? 'zh-CN' : (lang === 'en' ? 'en' : 'vi');
  const cookieValue = `/vi/${googleLangCode}`;

  // Set cookies across path and domains
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  const host = window.location.hostname;
  if (host && host !== 'localhost') {
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${host};`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${host};`;
  }

  // Trigger combo if already in DOM
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = googleLangCode;
    select.dispatchEvent(new Event('change'));
  }
}

/**
 * Load Google Translate Element quietly in background
 */
function ensureGoogleTranslateScript() {
  if (document.getElementById('google-translate-script')) return;

  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);
  }

  window.googleTranslateElementInit = function() {
    try {
      new window.google.translate.TranslateElement({
        pageLanguage: 'vi',
        includedLanguages: 'vi,en,zh-CN',
        autoDisplay: false
      }, 'google_translate_element');

      // Sync once initialized
      const saved = localStorage.getItem('webitc_lang') || 'vi';
      if (saved !== 'vi') {
        setTimeout(() => setGoogleTranslateEngine(saved), 300);
      }
    } catch (e) {}
  };

  const s = document.createElement('script');
  s.id = 'google-translate-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

/**
 * Switch Website Language
 */
export function setLanguage(lang, showNotification = true) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'vi';
  currentLang = lang;
  localStorage.setItem('webitc_lang', lang);

  // Update HTML tag lang
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

  // Update switcher buttons UI
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Step 1: Instant Local Synchronous Dictionary Translation (0ms delay)
  translateDomNodes(document.body, lang);

  // Step 2: Background Google Translate synchronization
  setGoogleTranslateEngine(lang);

  // Step 3: Dispatch custom event
  window.dispatchEvent(new CustomEvent('webitc_lang_changed', { detail: { lang } }));

  // Step 4: Toast notification
  if (showNotification && typeof window.showToast === 'function') {
    const msgs = {
      vi: 'Đã chuyển sang Tiếng Việt',
      en: 'Switched to English',
      zh: '已切换至简体中文 (Chinese Simplified)'
    };
    const titles = {
      vi: 'Ngôn Ngữ',
      en: 'Language',
      zh: '语言切换'
    };
    window.showToast(msgs[lang], 'info', titles[lang]);
  }
}

/**
 * Initialize Language Switcher in the topbar on the right
 */
export function initI18n() {
  const savedLang = localStorage.getItem('webitc_lang') || 'vi';
  currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : 'vi';

  // Ensure language switcher exists on topbar-right
  const topbarRight = document.querySelector('.topbar-right');
  if (topbarRight && !document.getElementById('langSwitch')) {
    const switchDiv = document.createElement('div');
    switchDiv.className = 'lang-switch';
    switchDiv.id = 'langSwitch';
    switchDiv.innerHTML = `
      <button type="button" class="lang-btn ${currentLang === 'vi' ? 'active' : ''}" data-lang="vi" title="Tiếng Việt">VI</button>
      <button type="button" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en" title="English">EN</button>
      <button type="button" class="lang-btn ${currentLang === 'zh' ? 'active' : ''}" data-lang="zh" title="简体中文 (Tiếng Trung)">中文</button>
    `;
    topbarRight.appendChild(switchDiv);
  }

  // Bind click handlers on all switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang, true);
      }
    });
  });

  // Apply saved language immediately if not Vietnamese
  if (currentLang !== 'vi') {
    setLanguage(currentLang, false);
  }

  // Prepare Google Translate for auxiliary translation
  ensureGoogleTranslateScript();

  // Listen to dynamic content update events
  window.addEventListener('webitc_content_updated', () => {
    if (currentLang !== 'vi') {
      translateDomNodes(document.body, currentLang);
    }
  });

  // Automatic MutationObserver to translate any newly added elements
  let mutationTimeout = null;
  const observer = new MutationObserver((mutations) => {
    if (currentLang !== 'vi') {
      // Check if mutations are from google translate or our own switch to avoid loop
      const isExternal = mutations.some(m => {
        const target = m.target;
        return target && target.id !== 'google_translate_element' && !target.classList?.contains('skiptranslate');
      });
      if (isExternal) {
        clearTimeout(mutationTimeout);
        mutationTimeout = setTimeout(() => {
          translateDomNodes(document.body, currentLang);
        }, 60);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
