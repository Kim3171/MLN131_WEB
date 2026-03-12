// src/data/battleZones.js
// Map clickable zones — x/y coordinates match SVG viewBox 0 0 1664 2688

export const battleZones = [
  {
    id: 'hanoi',
    nameVi: 'Hà Nội',
    nameEn: 'Hanoi',
    x: 860, y: 476,
    type: 'political',
    factsVi: [
      'Thủ đô của Việt Nam Dân chủ Cộng hòa',
      'Trung tâm chỉ huy chiến lược của Đảng Lao động',
      'Mục tiêu chính của Chiến dịch Sấm Rền (Operation Rolling Thunder)'
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
    id: 'dienbienphu',
    nameVi: 'Điện Biên Phủ',
    nameEn: 'Dien Bien Phu',
    x: 640, y: 390,
    type: 'military',
    factsVi: [
      'Trận Điện Biên Phủ (1954) kết thúc thực dân Pháp tại Đông Dương',
      'Tướng Võ Nguyên Giáp chỉ huy chiến dịch lịch sử này',
      'Dẫn đến Hiệp định Geneva phân chia Việt Nam ở vĩ tuyến 17'
    ],
    factsEn: [
      'Battle of Dien Bien Phu (1954) ended French colonialism in Indochina',
      'General Vo Nguyen Giap commanded this historic campaign',
      'Led to the Geneva Agreement dividing Vietnam at the 17th Parallel'
    ],
    strategicImportance: 5,
    imageKey: 'hoChiMinhTrail'
  },
  {
    id: 'tonkin-gulf',
    nameVi: 'Vịnh Bắc Bộ',
    nameEn: 'Gulf of Tonkin',
    x: 1230, y: 600,
    type: 'diplomatic',
    factsVi: [
      'Sự kiện Vịnh Bắc Bộ (8/1964) dẫn đến can thiệp trực tiếp của Mỹ',
      'Nghị quyết Vịnh Bắc Bộ mở đường cho chiến tranh toàn diện',
      'Vị trí chiến lược về hàng hải'
    ],
    factsEn: [
      'Gulf of Tonkin Incident (August 1964) led to direct U.S. intervention',
      'Gulf of Tonkin Resolution opened the way for full-scale war',
      'Strategic maritime location'
    ],
    strategicImportance: 5,
    imageKey: 'gulfOfTonkin'
  },
  {
    id: 'dmz',
    nameVi: 'Vĩ tuyến 17 (DMZ)',
    nameEn: '17th Parallel (DMZ)',
    x: 1060, y: 1060,
    type: 'military',
    factsVi: [
      'Ranh giới quân sự tạm thời từ 1954–1975 chia đôi đất nước',
      'Khu vực trung lập theo Hiệp định Geneva 1954',
      'Bị vi phạm nhiều lần; là chiến trường khốc liệt nhất'
    ],
    factsEn: [
      'Temporary military demarcation line 1954–1975 splitting the country',
      'Neutral zone established by Geneva Agreement 1954',
      'Violated repeatedly; site of the most intense fighting'
    ],
    strategicImportance: 4,
    imageKey: 'hoChiMinhTrail'
  },
  {
    id: 'hue',
    nameVi: 'Huế',
    nameEn: 'Hue',
    x: 1050, y: 1175,
    type: 'military',
    factsVi: [
      'Cố đô triều Nguyễn, thành phố chiến lược miền Trung',
      'Trận Huế (2/1968) là trận đánh khốc liệt nhất của Tết Mậu Thân',
      'Nhiều di sản văn hóa thế giới bị tàn phá trong chiến tranh'
    ],
    factsEn: [
      'Ancient Nguyen Dynasty capital, strategic Central Vietnam city',
      'Battle of Hue (February 1968) was the fiercest Tet Offensive battle',
      'Many UNESCO heritage sites destroyed during the war'
    ],
    strategicImportance: 4,
    imageKey: 'usMarines'
  },
  {
    id: 'danang',
    nameVi: 'Đà Nẵng',
    nameEn: 'Da Nang',
    x: 1100, y: 1270,
    type: 'military',
    factsVi: [
      'Căn cứ quân sự lớn nhất của Mỹ tại miền Trung Việt Nam',
      'Nơi lính Thủy quân Lục chiến Mỹ đổ bộ đầu tiên (3/1965)',
      'Sân bay quân sự lớn nhất tại miền Nam'
    ],
    factsEn: [
      'Largest U.S. military base in Central Vietnam',
      'First U.S. Marine landing (March 1965)',
      'Largest military airport in the South'
    ],
    strategicImportance: 4,
    imageKey: 'usMarines'
  },
  {
    id: 'dak-to',
    nameVi: 'Đắk Tô – Tây Nguyên',
    nameEn: 'Dak To – Central Highlands',
    x: 1100, y: 1460,
    type: 'military',
    factsVi: [
      'Vùng núi Tây Nguyên — chiến trường khốc liệt giữa hai miền',
      'Trận Đắk Tô (11/1967) là một trong những trận đánh lớn nhất',
      'Biên giới với Lào — đầu mối tuyến đường vận tải HCM'
    ],
    factsEn: [
      'Central Highlands mountain region — fierce contested battleground',
      'Battle of Dak To (November 1967) was one of the largest battles',
      'Border with Laos — junction of Ho Chi Minh supply route'
    ],
    strategicImportance: 4,
    imageKey: 'battleOfDakTo'
  },
  {
    id: 'cu-chi',
    nameVi: 'Củ Chi',
    nameEn: 'Cu Chi Tunnels',
    x: 1020, y: 2040,
    type: 'military',
    factsVi: [
      'Hệ thống 250km đường hầm chiến lược của Mặt trận Giải phóng',
      'Khu vực hoạt động du kích hiệu quả nhất quanh Sài Gòn',
      'Mỹ đặt tên "Iron Triangle" do không thể kiểm soát'
    ],
    factsEn: [
      '250km strategic tunnel system of the National Liberation Front',
      'Most effective guerrilla operational zone around Saigon',
      'U.S. named it "Iron Triangle" due to inability to control'
    ],
    strategicImportance: 4,
    imageKey: 'vietCongTunnels'
  },
  {
    id: 'saigon',
    nameVi: 'Sài Gòn',
    nameEn: 'Saigon',
    x: 1040, y: 2084,
    type: 'political',
    factsVi: [
      'Thủ đô của Chính quyền Việt Nam Cộng hòa (VNCH)',
      'Trung tâm kinh tế và chính trị miền Nam Việt Nam',
      'Ngày 30/4/1975: Giải phóng, thống nhất đất nước'
    ],
    factsEn: [
      'Capital of the Republic of Vietnam (South Vietnam)',
      'Economic and political center of South Vietnam',
      'April 30, 1975: Liberation, country reunified'
    ],
    strategicImportance: 5,
    imageKey: 'tankSaigon'
  },
  {
    id: 'mekong',
    nameVi: 'Đồng bằng sông Cửu Long',
    nameEn: 'Mekong Delta',
    x: 910, y: 2230,
    type: 'military',
    factsVi: [
      'Vựa lúa lớn nhất Việt Nam — nguồn lương thực chiến lược',
      'Chiến trường quan trọng của cả hai phía với địa hình kênh rạch phức tạp',
      'Nơi diễn ra nhiều chiến dịch quân sự lớn 1965–1972'
    ],
    factsEn: [
      'Vietnam\'s largest rice basket — strategic food source',
      'Important battlefield for both sides with complex canal terrain',
      'Site of many major military operations 1965–1972'
    ],
    strategicImportance: 3,
    imageKey: 'vietCongTunnels'
  },
  {
    id: 'hcm-trail',
    nameVi: 'Đường mòn Hồ Chí Minh',
    nameEn: 'Ho Chi Minh Trail',
    x: 590, y: 1380,
    type: 'supply',
    factsVi: [
      'Tuyến đường vận tải huyết mạch xuyên qua Lào và Campuchia',
      'Vận chuyển hơn 1 triệu tấn vũ khí, đạn dược và quân nhu',
      'Bị Mỹ ném bom liên tục nhưng vẫn duy trì hoạt động suốt chiến tranh'
    ],
    factsEn: [
      'Vital supply route running through Laos and Cambodia',
      'Transported over 1 million tons of weapons, ammunition and supplies',
      'Continuously bombed by the U.S. but remained operational throughout the war'
    ],
    strategicImportance: 5,
    imageKey: 'hoChiMinhTrail'
  }
];

export default battleZones;
