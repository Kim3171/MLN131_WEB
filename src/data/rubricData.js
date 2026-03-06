// src/data/rubricData.js
// Full rubric data for CQ6 assignment

export const rubricData = {
  part1: {
    titleVi: 'Phần 1 — Sản phẩm sáng tạo',
    titleEn: 'Part 1 — Creative Product',
    totalPoints: 20,
    color: 'crimson',
    criteria: [
      {
        id: '1-1',
        nameVi: 'Nội dung kiến thức lịch sử',
        nameEn: 'Historical Knowledge Content',
        points: 5,
        descriptionVi: 'Thể hiện hiểu biết sâu sắc về vai trò lãnh đạo của Đảng Cộng sản Việt Nam trong cuộc kháng chiến chống Mỹ (1954-1975).',
        descriptionEn: 'Demonstrates deep understanding of the leadership role of the Communist Party of Vietnam in the resistance war against the U.S. (1954-1975).'
      },
      {
        id: '1-2',
        nameVi: 'Tính sáng tạo trong hình thức',
        nameEn: 'Creativity in Form',
        points: 5,
        descriptionVi: 'Sử dụng hình thức trình bày độc đáo, hấp dẫn, phù hợp với nội dung và đối tượng.',
        descriptionEn: 'Uses unique, engaging presentation forms appropriate to content and audience.'
      },
      {
        id: '1-3',
        nameVi: 'Chất lượng hình ảnh và tài liệu',
        nameEn: 'Quality of Images and Documents',
        points: 5,
        descriptionVi: 'Hình ảnh, tài liệu lịch sử phong phú, có nguồn gốc rõ ràng, được sử dụng hợp lý.',
        descriptionEn: 'Rich historical images and documents with clear origins, used appropriately.'
      },
      {
        id: '1-4',
        nameVi: 'Kết nối thực tiễn',
        nameEn: 'Practical Connection',
        points: 5,
        descriptionVi: 'Liên hệ được với thực tiễn xây dựng đất nước hiện nay, rút ra bài học có giá trị.',
        descriptionEn: 'Connects to current nation-building practice, draws valuable lessons.'
      }
    ]
  },
  part2: {
    titleVi: 'Phần 2 — Thuyết trình và phản biện',
    titleEn: 'Part 2 — Presentation and Defense',
    totalPoints: 20,
    color: 'gold',
    criteria: [
      {
        id: '2-1',
        nameVi: 'Trình bày rõ ràng, mạch lạc',
        nameEn: 'Clear and Coherent Presentation',
        points: 5,
        descriptionVi: 'Trình bày lưu loát, logic, có khả năng thuyết phục người nghe.',
        descriptionEn: 'Fluent, logical presentation with ability to persuade audience.'
      },
      {
        id: '2-2',
        nameVi: 'Trả lời câu hỏi phản biện',
        nameEn: 'Answering Counter Questions',
        points: 5,
        descriptionVi: 'Phản hồi tốt các câu hỏi phản biện, thể hiện kiến thức vững chắc.',
        descriptionEn: 'Responds well to counter questions, demonstrates solid knowledge.'
      },
      {
        id: '2-3',
        nameVi: 'Sử dụng công nghệ thông tin',
        nameEn: 'Use of Information Technology',
        points: 5,
        descriptionVi: 'Sử dụng hiệu quả các phương tiện hỗ trợ thuyết trình (PowerPoint, video,...).',
        descriptionEn: 'Effectively uses presentation aids (PowerPoint, video, etc.).'
      },
      {
        id: '2-4',
        nameVi: 'Phân bổ thời gian hợp lý',
        nameEn: 'Appropriate Time Allocation',
        points: 5,
        descriptionVi: 'Quản lý tốt thời gian, trình bày đủ nội dung trong thời gian quy định.',
        descriptionEn: 'Manages time well, presents sufficient content within allocated time.'
      }
    ]
  },
  aiUsage: {
    titleVi: 'Tiêu chí sử dụng AI',
    titleEn: 'AI Usage Criteria',
    color: 'olive',
    criteria: [
      {
        id: '4-1',
        nameVi: 'Sử dụng AI để tìm kiếm và tổng hợp thông tin',
        nameEn: 'Use AI to search and synthesize information',
        descriptionVi: 'Sinh viên sử dụng các công cụ AI để thu thập, tổng hợp thông tin lịch sử từ nhiều nguồn.',
        descriptionEn: 'Students use AI tools to collect and synthesize historical information from multiple sources.'
      },
      {
        id: '4-2',
        nameVi: 'Sử dụng AI để phân tích và đánh giá',
        nameEn: 'Use AI to analyze and evaluate',
        descriptionVi: 'Sử dụng AI để phân tích, đánh giá các góc nhìn lịch sử khác nhau.',
        descriptionEn: 'Use AI to analyze and evaluate different historical perspectives.'
      },
      {
        id: '4-3',
        nameVi: 'Sử dụng AI để cải thiện chất lượng sản phẩm',
        nameEn: 'Use AI to improve product quality',
        descriptionVi: 'Sử dụng AI để nâng cao chất lượng trình bày, hình ảnh, nội dung.',
        descriptionEn: 'Use AI to enhance presentation quality, images, and content.'
      },
      {
        id: '4-4',
        nameVi: 'Ghi nhận và trích dẫn nguồn AI',
        nameEn: 'Acknowledge and cite AI sources',
        descriptionVi: 'Công khai các công cụ AI đã sử dụng và cách sử dụng trong bài làm.',
        descriptionEn: 'Disclose AI tools used and how they were used in the assignment.'
      }
    ]
  }
};

export default rubricData;
