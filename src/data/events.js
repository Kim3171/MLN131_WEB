// src/data/events.js
// 12 timeline events from 1954-1975

export const events = [
  {
    id: 'gulf-of-tonkin',
    year: 1964,
    month: 'August',
    titleVi: 'Sự kiện Vịnh Bắc Bộ',
    titleEn: 'Gulf of Tonkin Incident',
    imageKey: 'gulfOfTonkin',
    significance: 4,
    descriptionVi: 'Ngày 2 và 4 tháng 8 năm 1964, Hải quân Mỹ tuyên bố tàu khu trục USS Maddox bị tấn công trong Vịnh Bắc Bộ. Sự kiện này trở thành cái cớ để Quốc hội Mỹ thông qua Nghị quyết Vịnh Bắc Bộ, cho phép Tổng thống Johnson mở rộng can thiệp quân sự trực tiếp vào Việt Nam.',
    descriptionEn: 'On August 2 and 4, 1964, the U.S. Navy claimed the destroyer USS Maddox was attacked in the Gulf of Tonkin. This incident became the pretext for the U.S. Congress to pass the Gulf of Tonkin Resolution, allowing President Johnson to escalate direct military intervention in Vietnam.',
    bulletPoints: [
      'Nghị quyết Vịnh Bắc Bộ được thông qua ngày 7/8/1964 / Gulf of Tonkin Resolution passed August 7, 1964',
      'Mỹ cam kết "tất cả các biện pháp cần thiết" / U.S. committed "all necessary measures"',
      'Bước ngoặt từ cố vấn sang can thiệp trực tiếp / Turning point from advisory to direct intervention'
    ],
    category: 'military'
  },
  {
    id: 'operation-rolling-thunder',
    year: 1965,
    month: 'March',
    titleVi: 'Chiến dịch Sấm Rền',
    titleEn: 'Operation Rolling Thunder',
    imageKey: 'bombHanoi',
    significance: 4,
    descriptionVi: 'Chiến dịch oanh tạc chiến lược của không quân Mỹ nhằm vào miền Bắc Việt Nam bắt đầu tháng 3/1965 và kéo dài đến tháng 10/1968. Đây là chiến dịch ném bom liên tục kéo dài nhất trong lịch sử quân sự thời bình.',
    descriptionEn: 'The U.S. strategic bombing campaign against North Vietnam began in March 1965 and continued until October 1968. It was the longest continuous bombing campaign in military history during peacetime.',
    bulletPoints: [
      'Hơn 900.000 tấn bom được ném xuống miền Bắc / Over 900,000 tons of bombs dropped on North Vietnam',
      'Mục tiêu phá hủy cơ sở hạ tầng và ý chí chiến đấu / Targeted infrastructure destruction and morale',
      'Không đạt được mục tiêu buộc Hà Nội đầu hàng / Failed to force Hanoi to surrender'
    ],
    category: 'military'
  },
  {
    id: 'first-combat-troops',
    year: 1965,
    month: 'March',
    titleVi: 'Lực lượng chiến đấu đầu tiên của Mỹ đổ bộ',
    titleEn: 'First U.S. Combat Troops Arrive',
    imageKey: 'usMarines',
    significance: 5,
    descriptionVi: 'Ngày 8 tháng 3 năm 1965, 3.500 lính Thủy quân Lục chiến Mỹ đổ bộ vào Đà Nẵng, đánh dấu sự chuyển đổi từ vai trò cố vấn sang can thiệp quân sự trực tiếp của Mỹ trong cuộc chiến.',
    descriptionEn: 'On March 8, 1965, 3,500 U.S. Marines landed at Da Nang, marking the shift from advisory role to direct military intervention by the U.S. in the war.',
    bulletPoints: [
      '3.500 Thủy quân Lục chiến Mỹ đổ bộ / 3,500 U.S. Marines landed',
      'Đánh dấu bước ngoặt trong can thiệp Mỹ / Marked turning point in U.S. intervention',
      'Mỹ chính thức tham chiến trực tiếp / U.S. officially entered direct combat'
    ],
    category: 'military'
  },
  {
    id: 'battle-of-ia-drang',
    year: 1965,
    month: 'November',
    titleVi: 'Trận Ia Drang',
    titleEn: 'Battle of Ia Drang',
    imageKey: 'battleOfDakTo',
    significance: 4,
    descriptionVi: 'Trận Ia Drang (14-18/11/1965) là trận đánh lớn đầu tiên giữa quân Mỹ và Quân Giải phóng miền Nam Việt Nam. Dù Mỹ tuyên bố thắng lợi về mặt chiến thuật, nhưng đây là bài học về sức mạnh của chiến tranh du kích.',
    descriptionEn: 'The Battle of Ia Drang (November 14-18, 1965) was the first major battle between U.S. forces and the People\'s Army of Vietnam. Although the U.S. claimed tactical victory, it demonstrated the effectiveness of guerrilla warfare.',
    bulletPoints: [
      'Trận đánh đầu tiên quy mô lớn / First major battle of the war',
      'Cả hai bên đều tuyên bố thắng lợi / Both sides claimed victory',
      'Bài học về chiến tranh du kích / Lesson in guerrilla warfare tactics'
    ],
    category: 'military'
  },
  {
    id: 'battle-of-dak-to',
    year: 1967,
    month: 'November',
    titleVi: 'Trận Đắk Tô',
    titleEn: 'Battle of Dak To',
    imageKey: 'battleOfDakTo',
    significance: 4,
    descriptionVi: 'Trận Đắk Tô (23/11 - 10/12/1967) là một trong những trận đánh khốc liệt nhất trong Chiến tranh Việt Nam. Quân Mỹ và Quân Giải phóng đã chiến đấu ác liệt trong địa hình núi rừng Tây Nguyên.',
    descriptionEn: 'The Battle of Dak To (November 23 - December 10, 1967) was one of the bloodiest battles of the Vietnam War. U.S. and PAVN forces fought fiercely in the Central Highlands mountain terrain.',
    bulletPoints: [
      'Hơn 2.500 lính Mỹ thương vong / Over 2,500 U.S. casualties',
      'Quân Giải phóng phòng ngự kiên cố / PAVN defensive stronghold',
      'Chiến thắng chiến thuật của Mỹ nhưng chiến lược bất phân / U.S. tactical victory but strategic stalemate'
    ],
    category: 'military'
  },
  {
    id: 'tet-offensive',
    year: 1968,
    month: 'January',
    titleVi: 'Tổng tấn công và nổi dậy Tết Mậu Thân',
    titleEn: 'Tet Offensive',
    imageKey: 'tetOffensive',
    significance: 5,
    descriptionVi: 'Đêm 30 Tết (30/1/1968), Quân Giải phóng miền Nam Việt Nam đồng loạt tấn công hơn 100 thành phố và thị trấn trên khắp miền Nam. Cuộc tấn công chứng minh Mỹ không thể bảo vệ an toàn cho các thành phố dù đã đổ nhiều quân.',
    descriptionEn: 'On the night of Tet (January 30, 1968), PAVN and Viet Cong forces launched simultaneous attacks on over 100 cities and towns throughout South Vietnam. The offensive proved the U.S. could not secure cities despite massive troop deployment.',
    bulletPoints: [
      'Tấn công 100+ thành phố và thị trấn / Attacked 100+ cities and towns',
      'Thay đổi cục diện chiến war / Changed the course of the war',
      'Làn sóng phản chiến mạnh mẽ ở Mỹ / Sparked massive anti-war movement in U.S.'
    ],
    category: 'military'
  },
  {
    id: 'presidential-election-1968',
    year: 1968,
    month: 'November',
    titleVi: 'Bầu cử Tổng thống Mỹ 1968',
    titleEn: '1968 U.S. Presidential Election',
    imageKey: 'nixonVisitChina',
    significance: 3,
    descriptionVi: 'Richard Nixon đắc cử Tổng thống Mỹ năm 1968 với lời hứa chấm dứt chiến tranh Việt Nam. Chiến thắng của Nixon phản ánh sự mệt mỏi của người dân Mỹ với cuộc chiến kéo dài.',
    descriptionEn: 'Richard Nixon was elected U.S. President in 1968 with a promise to end the Vietnam War. Nixon\'s victory reflected American public fatigue with the prolonged war.',
    bulletPoints: [
      'Nixon đắc cử với lời hứa "Hòa bình có danh dự" / Nixon elected with "peace with honor" promise',
      'Chiến thuật "Việt Nam hóa chiến tranh" / "Vietnamization" strategy',
      'Phản ánh làn sóng phản chiến trong nước Mỹ / Reflected domestic anti-war sentiment'
    ],
    category: 'political'
  },
  {
    id: 'nixon-doctrine',
    year: 1969,
    month: 'July',
    titleVi: 'Học thuyết Nixon',
    titleEn: 'Nixon Doctrine',
    imageKey: 'nixonVisitChina',
    significance: 3,
    descriptionVi: 'Tháng 7/1969, Tổng thống Nixon công bố Học thuyết Nixon, theo đó Mỹ sẽ cung cấp hỗ trợ quân sự nhưng để các đồng minh tự chiến đấu. Đây là nền tảng cho chính sách Việt Nam hóa chiến tranh.',
    descriptionEn: 'In July 1969, President Nixon announced the Nixon Doctrine, stating the U.S. would provide military aid but allies would do the fighting. This became the foundation of Vietnamization policy.',
    bulletPoints: [
      'Mỹ giảm dần vai trò chiến đấu trực tiếp / U.S. reduces direct combat role',
      'Đồng minh tự chiến đấu với hỗ trợ Mỹ / Allies fight with U.S. support',
      'Nền tảng cho Việt Nam hóa chiến tranh / Foundation for Vietnamization'
    ],
    category: 'political'
  },
  {
    id: 'easter-offensive',
    year: 1972,
    month: 'March',
    titleVi: 'Cuộc tấn công Phục sinh',
    titleEn: 'Easter Offensive',
    imageKey: 'tankSaigon',
    significance: 4,
    descriptionVi: 'Tháng 3/1972, Quân Giải phóng miền Nam Việt Nam mở cuộc tấn công quân sự lớn vào miền Nam trong ba mũi. Đây là chiến dịch tấn công quy mô lớn đầu tiên với sự tham gia của xe tăng.',
    descriptionEn: 'In March 1972, PAVN launched a major military offensive into South Vietnam in three prongs. This was the first large-scale offensive featuring tank units.',
    bulletPoints: [
      'Ba mũi tấn công lớn / Three major offensive prongs',
      'Sử dụng xe tăng lần đầu / First use of tank units',
      'Buộc Mỹ phải ném bom hàng loạt / Forced U.S. to resume massive bombing'
    ],
    category: 'military'
  },
  {
    id: 'paris-peace-accords',
    year: 1973,
    month: 'January',
    titleVi: 'Hiệp định Paris',
    titleEn: 'Paris Peace Accords',
    imageKey: 'parisAccords',
    significance: 5,
    descriptionVi: 'Ngày 27 tháng 1 năm 1973, Hiệp định Hòa bình Paris được ký kết, chấm dứt sự tham gia trực tiếp của quân đội Mỹ trong chiến tranh Việt Nam. Tuy nhiên, chiến sự vẫn tiếp diễn giữa hai miền.',
    descriptionEn: 'On January 27, 1973, the Paris Peace Accords were signed, ending direct U.S. military involvement in the Vietnam War. However, fighting continued between North and South Vietnam.',
    bulletPoints: [
      'Ký ngày 27/1/1973 / Signed January 27, 1973',
      'Mỹ rút quân trong 60 ngày / U.S. withdrew within 60 days',
      'Chấm dứt tham chiến trực tiếp của Mỹ / Ended direct U.S. combat involvement'
    ],
    category: 'diplomatic'
  },
  {
    id: 'christmas-bombing',
    year: 1972,
    month: 'December',
    titleVi: 'Chiến dịch ném bom Giáng sinh',
    titleEn: 'Christmas Bombing',
    imageKey: 'christmasBombing',
    significance: 4,
    descriptionVi: 'Chiến dịch Linebacker II (18-29/12/1972) là cuộc ném bom hàng loạt nhất của Mỹ nhằm vào Hà Nội và Hải Phòng. Mỹ sử dụng B-52 ném bom liên tục để buộc Việt Nam Dân chủ Cộng hòa quay lại đàm phán.',
    descriptionEn: 'Operation Linebacker II (December 18-29, 1972) was the most intensive U.S. bombing campaign against Hanoi and Haiphong. The U.S. used B-52 bombers to force the DRV back to negotiations.',
    bulletPoints: [
      'Hơn 20.000 tấn bom trong 12 ngày / Over 20,000 tons of bombs in 12 days',
      'Gây áp lực để đàm phán Paris / Pressured for Paris negotiations',
      'Thương vong dân sự lớn / Significant civilian casualties'
    ],
    category: 'military'
  },
  {
    id: 'fall-of-saigon',
    year: 1975,
    month: 'April',
    titleVi: 'Ngày Giải phóng Sài Gòn',
    titleEn: 'Fall of Saigon',
    imageKey: 'tankSaigon',
    significance: 5,
    descriptionVi: 'Ngày 30 tháng 4 năm 1975, xe tăng của Quân Giải phóng miền Nam Việt Nam tiến vào Dinh Độc Lập, đánh dấu sự sụp đổ của Chính quyền Sài Gòn và thống nhất đất nước Việt Nam.',
    descriptionEn: 'On April 30, 1975, People\'s Army of Vietnam tanks rolled into the Independence Palace, marking the collapse of the Saigon regime and the reunification of Vietnam.',
    bulletPoints: [
      '30/4/1975 - Ngày thống nhất / April 30, 1975 - Day of Reunification',
      'Kết thúc 21 năm chiến tranh / Ended 21 years of war',
      'Sự kiện lịch sử quan trọng nhất / Most significant historical event'
    ],
    category: 'military'
  }
];

export default events;
