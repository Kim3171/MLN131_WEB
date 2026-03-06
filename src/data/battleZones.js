// src/data/battleZones.js
// Map clickable zones with facts

export const battleZones = [
  {
    id: 'hanoi',
    nameVi: 'Hà Nội',
    nameEn: 'Hanoi',
    x: 200,
    y: 120,
    type: 'political',
    factsVi: [
      'Thủ đô của Việt Nam Dân chủ Cộng hòa',
      'Trung tâm chỉ huy chiến lược của Đảng Lao động',
      'Mục tiêu chính của Chiến dịch Sấm Rền'
    ],
    factsEn: [
      'Capital of the Democratic Republic of Vietnam',
      'Strategic command center of the Workers\' Party',
      'Primary target of Operation Rolling Thunder'
    ],
    strategicImportance: 5,
    imageKey: 'bombHanoi'
  },
  {
    id: 'hcm-trail',
    nameVi: 'Đường mòn Hồ Chí Minh',
    nameEn: 'Ho Chi Minh Trail',
    x: 220,
    y: 350,
    type: 'supply',
    factsVi: [
      'Tuyến đường vận tải xuyên qua Lào và Campuchia',
      'Vận chuyển hơn 1 triệu tấn vũ khí và quân nhu',
      'Bị Mỹ ném bom liên tục nhưng vẫn hoạt động'
    ],
    factsEn: [
      'Supply route running through Laos and Cambodia',
      'Transported over 1 million tons of weapons and supplies',
      'Continuously bombed by U.S. but remained operational'
    ],
    strategicImportance: 5,
    imageKey: 'hoChiMinhTrail'
  },
  {
    id: 'dmz',
    nameVi: 'Vĩ tuyến 17',
    nameEn: '17th Parallel (DMZ)',
    x: 180,
    y: 220,
    type: 'military',
    factsVi: [
      'Ran giới quân sự tạm thời từ 1954-1975',
      'Khu vực trung lập theo Hiệp định Geneva 1954',
      'Bị vi phạm nhiều lần trong chiến tranh'
    ],
    factsEn: [
      'Temporary military demarcation line from 1954-1975',
      'Neutral zone according to Geneva Agreement 1954',
      'Violated multiple times during the war'
    ],
    strategicImportance: 4,
    imageKey: 'hoChiMinhTrail'
  },
  {
    id: 'hue',
    nameVi: 'Huế',
    nameEn: 'Hue',
    x: 210,
    y: 260,
    type: 'military',
    factsVi: [
      'Cố đô triều Nguyễn, thành phố chiến lược miền Trung',
      'Trận Huế (tháng 2/1968) là trận đánh khốc liệt nhất của Tết Mậu Thân',
      'Nhiều di sản văn hóa bị tàn phá trong chiến tranh'
    ],
    factsEn: [
      'Ancient capital of Nguyen Dynasty, strategic Central city',
      'Battle of Hue (February 1968) was the fiercest battle of Tet Offensive',
      'Many cultural heritage sites destroyed in the war'
    ],
    strategicImportance: 4,
    imageKey: 'usMarines'
  },
  {
    id: 'danang',
    nameVi: 'Đà Nẵng',
    nameEn: 'Da Nang',
    x: 225,
    y: 280,
    type: 'military',
    factsVi: [
      'Căn cứ quân sự lớn nhất của Mỹ tại miền Trung',
      'Nơi lính Thủy quân Lục chiến Mỹ đổ bộ đầu tiên (3/1965)',
      'Sân bay quân sự lớn nhất miền Nam'
    ],
    factsEn: [
      'Largest U.S. military base in Central Vietnam',
      'First landing of U.S. Marines (March 1965)',
      'Largest military airport in the South'
    ],
    strategicImportance: 4,
    imageKey: 'usMarines'
  },
  {
    id: 'saigon',
    nameVi: 'Sài Gòn',
    nameEn: 'Saigon',
    x: 190,
    y: 420,
    type: 'political',
    factsVi: [
      'Thủ đô của Chính quyền Việt Nam Cộng hòa',
      'Trung tâm kinh tế và chính trị của miền Nam',
      'Ngày 30/4/1975: Giải phóng hoàn toàn'
    ],
    factsEn: [
      'Capital of the Republic of Vietnam',
      'Economic and political center of the South',
      'April 30, 1975: Fully liberated'
    ],
    strategicImportance: 5,
    imageKey: 'tankSaigon'
  },
  {
    id: 'mekong',
    nameVi: 'Đồng bằng sông Cửu Long',
    nameEn: 'Mekong Delta',
    x: 150,
    y: 460,
    type: 'military',
    factsVi: [
      'Vựa lúa lớn nhất Việt Nam',
      'Chiến trường quan trọng của cả hai phía',
      'Nơi diễn ra nhiều chiến dịch quân sự lớn'
    ],
    factsEn: [
      'Vietnam\'s largest rice basket',
      'Important battlefield for both sides',
      'Site of many major military operations'
    ],
    strategicImportance: 3,
    imageKey: 'vietCongTunnels'
  },
  {
    id: 'dak-to',
    nameVi: 'Đắk Tô',
    nameEn: 'Dak To',
    x: 230,
    y: 320,
    type: 'military',
    factsVi: [
      'Vùng núi Tây Nguyên, chiến trường khốc liệt',
      'Trận Đắk Tô (11/1967) là một trong những trận đánh lớn nhất',
      'Biên giới với Lào - tuyến vận tải quan trọng'
    ],
    factsEn: [
      'Central Highlands mountain region, fierce battlefield',
      'Battle of Dak To (November 1967) was one of the largest battles',
      'Border with Laos - important supply route'
    ],
    strategicImportance: 4,
    imageKey: 'battleOfDakTo'
  },
  {
    id: 'cu-chi',
    nameVi: 'Củ Chi',
    nameEn: 'Cu Chi',
    x: 180,
    y: 400,
    type: 'military',
    factsVi: [
      'Hệ thống đường hầm chiến lược của Viet Cong',
      'Khu vực hoạt động du kích hiệu quả nhất',
      'Mỹ đặt tên là "Bộ bao gạch" do không thể kiểm soát'
    ],
    factsEn: [
      'Strategic tunnel system of Viet Cong',
      'Most effective guerrilla operational area',
      'U.S. called it "Iron Triangle" due to inability to control'
    ],
    strategicImportance: 4,
    imageKey: 'vietCongTunnels'
  },
  {
    id: 'tonkin-gulf',
    nameVi: 'Vịnh Bắc Bộ',
    nameEn: 'Gulf of Tonkin',
    x: 250,
    y: 100,
    type: 'diplomatic',
    factsVi: [
      'Sự kiện Vịnh Bắc Bộ (8/1964) dẫn đến can thiệp trực tiếp của Mỹ',
      'Nghị quyết Vịnh Bắc Bộ mở đường cho chiến tranh',
      'Vị trí chiến lược về hàng hải'
    ],
    factsEn: [
      'Gulf of Tonkin Incident (August 1964) led to direct U.S. intervention',
      'Gulf of Tonkin Resolution opened the way for war',
      'Strategic maritime location'
    ],
    strategicImportance: 5,
    imageKey: 'gulfOfTonkin'
  }
];

export default battleZones;
