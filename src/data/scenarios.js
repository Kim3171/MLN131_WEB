// src/data/scenarios.js
// 5 strategy game scenarios with choices and outcomes

export const scenarios = [
  {
    id: 'tet-offensive',
    titleVi: 'Quyết định Tết Mậu Thân 1968',
    titleEn: 'Tet Offensive Decision 1968',
    year: 1968,
    situationVi: 'Tháng 1 năm 1968, Bộ Chính trị Đảng Lao động Việt Nam phải quyết định có tiến hành Tổng tấn công và nổi dậy Tết Mậu Thân hay không. Cuộc tấn công sẽ bất ngờ với địch nhưng cũng chứa đựng rủi ro lớn về thương vong.',
    situationEn: 'In January 1968, the Politburo of the Workers\' Party of Vietnam had to decide whether to launch the Tet Offensive. The attack would surprise the enemy but also carried great risk of casualties.',
    choices: [
      {
        label: 'A',
        labelVi: 'Tấn công toàn diện',
        labelEn: 'Full Offensive',
        descriptionVi: 'Tiến hành tấn công đồng loạt vào tất cả các thành phố lớn, kể cả Sài Gòn.',
        descriptionEn: 'Launch simultaneous attacks on all major cities, including Saigon.',
        correct: true,
        outcomeVi: 'Quân Giải phóng tấn công hơn 100 thành phố và thị trấn. Dù không đạt mục tiêu về nổi dậy nhưng đã phá vỡ hoàn toàn tuyên bố "ánh sáng ở cuối đường hầm" của Mỹ. Làn sóng phản chiến ở Mỹ mạnh lên chưa từng có.',
        outcomeEn: 'VC forces attacked over 100 cities and towns. While the uprising objective wasn\'t achieved, it completely shattered U.S. claims of "light at the end of the tunnel." The anti-war movement in America reached unprecedented levels.'
      },
      {
        label: 'B',
        labelVi: 'Tấn công hạn chế',
        labelEn: 'Limited Offensive',
        descriptionVi: 'Chỉ tấn công các mục tiêu quân sự, tránh thành phố lớn để giữ lực lượng.',
        descriptionEn: 'Only attack military targets, avoid major cities to preserve forces.',
        outcomeVi: 'Giữ được lực lượng nhưng không tạo được tác động chính trị mạnh. Mỹ tiếp tục chương trình "ánh sáng ở cuối đường hầm" và có thêm thời gian củng cố.',
        outcomeEn: 'Preserved forces but failed to create strong political impact. U.S. continued "light at the tunnel" program and had more time to consolidate.'
      },
      {
        label: 'C',
        labelVi: 'Không tấn công',
        labelEn: 'No Offensive',
        descriptionVi: 'Tiếp tục chiến tranh du kích, tránh đối đầu trực tiếp với quân Mỹ.',
        descriptionEn: 'Continue guerrilla war, avoid direct confrontation with U.S. forces.',
        outcomeVi: 'Giữ được lực lượng nhưng không tạo bước ngoặt. Mỹ có thể rút quân theo kế hoạch mà không chịu áp lực nội政 nội bộ. Chiến tranh có thể kéo dài thêm nhiều năm.',
        outcomeEn: 'Preserved forces but failed to create a turning point. U.S. could withdraw on schedule without domestic political pressure. War could have lasted many more years.'
      }
    ],
    aiContext: 'Why was the Tet Offensive strategically necessary despite the high casualties?'
  },
  {
    id: 'vietnamization',
    titleVi: 'Chính sách Việt Nam hóa chiến tranh 1969',
    titleEn: 'Vietnamization Policy 1969',
    year: 1969,
    situationVi: 'Tổng thống Nixon công bố chính sách Việt Nam hóa chiến tranh, giảm dần quân Mỹ và chuyển giao gánh nặng chiến đấu cho Quân lực Việt Nam Cộng hòa. Bộ Chính trị cần quyết định cách ứng phó.',
    situationEn: 'President Nixon announced Vietnamization policy, gradually reducing U.S. troops and transferring combat burden to ARVN. The Politburo needed to decide how to respond.',
    choices: [
      {
        label: 'A',
        labelVi: 'Tăng cường chiến tranh du kích',
        labelEn: 'Intensify Guerrilla War',
        descriptionVi: 'Tăng cường hoạt động du kích để phân hủy Quân lực VNCH trước khi họ đủ mạnh.',
        descriptionEn: 'Intensify guerrilla operations to weaken ARVN before they become strong enough.',
        correct: true,
        outcomeVi: 'Chiến tranh du kích tiếp tục gây áp lực lên QLVNCH. Mỹ vẫn phải duy trì lực lượng viện trợ đáng kể. Chiến lược "phân hủy từng phần" tỏa hiệu quả.',
        outcomeEn: 'Guerrilla warfare continued to pressure ARVN. U.S. still had to maintain significant support forces. "Progressive exhaustion" strategy proved effective.'
      },
      {
        label: 'B',
        labelVi: 'Chờ đợi và quan sát',
        labelEn: 'Wait and Observe',
        descriptionVi: 'Để Mỹ tự rút quân theo kế hoạch, tập trung xây dựng lực lượng.',
        descriptionEn: 'Let U.S. withdraw according to plan, focus on building forces.',
        outcomeVi: 'QLVNCH có thời gian củng cố với sự hỗ trợ Mỹ. Khi Mỹ rút hoàn toàn, QLVNCH đủ mạnh để gây khó khăn cho Quân Giải phóng trong giai đoạn cuối.',
        outcomeEn: 'ARVN had time to consolidate with U.S. support. When U.S. fully withdrew, ARVN was strong enough to cause difficulties for PAVN in the final phase.'
      },
      {
        label: 'C',
        labelVi: 'Đàm phán song song',
        labelEn: 'Parallel Negotiations',
        descriptionVi: 'Vừa đàm phán vừa chiến đấu, tìm giải pháp chính trị.',
        descriptionEn: 'Negotiate while fighting, seek political solution.',
        outcomeVi: 'Đàm phán kéo dài nhưng không đạt thỏa thuận có lợi. Mỹ sử dụng thời gian để Việt Nam hóa thành công hơn.',
        outcomeEn: 'Negotiations prolonged but no favorable agreement reached. U.S. used time to make Vietnamization more successful.'
      }
    ],
    aiContext: 'How did the strategy of patience while the U.S. withdrew work strategically?'
  },
  {
    id: 'easter-offensive-1972',
    titleVi: 'Cuộc tấn công Phục sinh 1972',
    titleEn: 'Easter Offensive 1972',
    year: 1972,
    situationVi: 'Tháng 3 năm 1972, sau khi Mỹ giảm ném bom theo Hiệp định, Bộ Chính trị quyết định mở cuộc tấn công quân sự lớn vào miền Nam - lần đầu tiên sử dụng xe tăng và pháo binh quy mô.',
    situationEn: 'In March 1972, after U.S. reduced bombing under agreements, the Politburo decided to launch a major military offensive into the South - first large-scale use of tanks and artillery.',
    choices: [
      {
        label: 'A',
        labelVi: 'Tấn công quy mô lớn',
        labelEn: 'Large-Scale Offensive',
        descriptionVi: 'Huy động sức mạnh chính quy với xe tăng, pháo binh để giành lãnh thổ.',
        descriptionEn: 'Deploy conventional forces with tanks and artillery to capture territory.',
        correct: true,
        outcomeVi: 'Quân Giải phóng giành được một số tỉnh miền Trung nhưng gặp sức kháng cự mạnh của không quân Mỹ. Tuy nhiên, đây là bài học quý giá cho chiến dịch cuối cùng.',
        outcomeEn: 'PAVN captured some Central provinces but faced strong U.S. air force resistance. However, it was valuable lessons for the final campaign.'
      },
      {
        label: 'B',
        labelVi: 'Tấn công du kích',
        labelEn: 'Guerrilla Offensive',
        descriptionVi: 'Tiếp tục chiến tranh du kích, tránh đối đầu với không quân Mỹ.',
        descriptionEn: 'Continue guerrilla war, avoid confrontation with U.S. air force.',
        outcomeVi: 'Giữ được lực lượng nhưng không giành được lãnh thổ quan trọng. Mỹ tiếp tục hỗ trợ QLVNCH mà không bị thách thức quân sự.',
        outcomeEn: 'Preserved forces but didn\'t capture important territory. U.S. continued supporting ARVN without military challenge.'
      },
      {
        label: 'C',
        labelVi: 'Tập trung miền Tây',
        labelEn: 'Focus on Western Front',
        descriptionVi: 'Tấn công từ Campuchia vào vùng Tây Nguyên, tránh sức mạnh không quân Mỹ.',
        descriptionEn: 'Attack from Cambodia into Central Highlands, avoid U.S. air power.',
        outcomeVi: 'Giữ được một phần lực lượng nhưng không tạo được áp lực chính trị. Mỹ có thể dễ dàng phản ứng từ các căn cứ không quân.',
        outcomeEn: 'Preserved some forces but failed to create political pressure. U.S. could easily respond from air bases.'
      }
    ],
    aiContext: 'Why was it strategically important to launch conventional offensives in 1972?'
  },
  {
    id: 'paris-negotiations-1972',
    titleVi: 'Đàm phán Paris 1972',
    titleEn: 'Paris Negotiations 1972',
    year: 1972,
    situationVi: 'Tháng 10 năm 1972, đàm phán Paris bế tắc. Kissinger đưa ra đề xuất mà Mỹ gọi là "hòa bình có danh dự". Bộ Chính trị phải quyết định chấp nhận hay tiếp tục chiến đấu.',
    situationEn: 'In October 1972, Paris negotiations were stalled. Kissinger presented a proposal the U.S. called "peace with honor." The Politburo had to decide to accept or continue fighting.',
    choices: [
      {
        label: 'A',
        labelVi: 'Chấp nhận thỏa thuận',
        labelEn: 'Accept Agreement',
        descriptionVi: 'Chấp nhận điều khoản Hiệp định Paris, cho phép Mỹ rút quân có tổ chức.',
        descriptionEn: 'Accept Paris Agreement terms, allow organized U.S. withdrawal.',
        outcomeVi: 'Hiệp định được ký tháng 1/1973, Mỹ rút quân. Tuy nhiên, điều khoản cho phép Mỹ tiếp tục viện trợ QLVNCH và giữ căn cứ không quân.',
        outcomeEn: 'Agreement signed January 1973, U.S. withdrew. However, terms allowed U.S. to continue ARVN support and retain air bases.'
      },
      {
        label: 'B',
        labelVi: 'Yêu cầu điều kiện cứng rắn',
        labelEn: 'Demand Harsher Terms',
        descriptionVi: 'Đòi Mỹ rút hoàn toàn, không cho phép viện trợ quân sự cho QLVNCH.',
        descriptionEn: 'Demand complete U.S. withdrawal, no military aid to ARVN.',
        correct: true,
        outcomeVi: 'Mỹ ném bom trừng phạt (Christmas Bombing) buộc quay lại đàm phán với điều khoản tốt hơn cho ta. Quân Mỹ phải rút hoàn toàn.',
        outcomeEn: 'U.S. conducted punitive bombing (Christmas Bombing) forcing return to negotiations with better terms. U.S. forces had to withdraw completely.'
      },
      {
        label: 'C',
        labelVi: 'Giả đàm phán',
        labelEn: 'Fake Negotiations',
        descriptionVi: 'Tiếp tục đàm phán để gây áp lực thời gian, chuẩn bị chiến dịch quân sự.',
        descriptionEn: 'Continue negotiations to buy time, prepare military campaign.',
        outcomeVi: 'Mỹ nhận ra chiến thuật và tăng cường ném bom. Quân Giải phóng chưa sẵn sàng cho chiến dịch lớn.',
        outcomeEn: 'U.S. recognized the tactic and intensified bombing. PAVN wasn\'t ready for major campaign.'
      }
    ],
    aiContext: 'Why was it strategic to risk the Christmas bombing by demanding better terms?'
  },
  {
    id: 'final-campaign',
    titleVi: 'Chiến dịch giải phóng miền Nam 1974-1975',
    titleEn: 'Liberation Campaign 1974-1975',
    year: 1974,
    situationVi: 'Sau Hiệp định Paris, Mỹ vẫn viện trợ QLVNCH nhưng với quy mô giảm dần. Bộ Chính trị quyết định thời điểm và cách thức tiến hành chiến dịch cuối cùng.',
    situationEn: 'After Paris Agreement, U.S. continued ARVN aid but at decreasing levels. The Politburo decided timing and method for the final campaign.',
    choices: [
      {
        label: 'A',
        labelVi: 'Tấn công sớm 1974',
        labelEn: 'Attack Early 1974',
        descriptionVi: 'Tận dụng thời điểm Mỹ đang rút lui, tấn công trước khi QLVNCH được củng cố.',
        descriptionEn: 'Take advantage of U.S. withdrawal, attack before ARVN consolidates.',
        outcomeVi: 'QLVNCH còn mạnh với viện trợ Mỹ. Chiến dịch có thể thất bại hoặc kéo dài nhiều năm.',
        outcomeEn: 'ARVN was still strong with U.S. support. Campaign could fail or drag on for years.'
      },
      {
        label: 'B',
        labelVi: 'Chờ đợi 1975',
        labelEn: 'Wait Until 1975',
        descriptionVi: 'Đợi đến khi viện trợ Mỹ giảm đáng kể và QLVNCH suy yếu.',
        descriptionEn: 'Wait until U.S. aid significantly decreases and ARVN weakens.',
        correct: true,
        outcomeVi: 'Đến 1975, Quốc hội Mỹ cắt giảm viện trợ. Chiến dịch Mùa Xuân 1975 thành công vượt bậc, giải phóng toàn miền Nam trong thời gian ngắn.',
        outcomeEn: 'By 1975, U.S. Congress cut aid. Spring 1975 campaign was overwhelmingly successful, liberating the entire South in short time.'
      },
      {
        label: 'C',
        labelVi: 'Chuẩn bị kỹ, tấn công 1976',
        labelEn: 'Prepare Thoroughly, Attack 1976',
        descriptionVi: 'Chuẩn bị thật kỹ lưỡng với đủ lực lượng, tấn công năm 1976.',
        descriptionEn: 'Prepare thoroughly with sufficient forces, attack in 1976.',
        outcomeVi: 'QLVNCH có thêm thời gian củng cố. Mỹ có thể can thiệp trở lại nếu tình hình thay đổi. Chiến tranh có thể kéo dài.',
        outcomeEn: 'ARVN had more time to consolidate. U.S. could re-intervene if situation changed. War could prolong.'
      }
    ],
    aiContext: 'Why was waiting until 1975 the strategically correct decision?'
  }
];

export default scenarios;
