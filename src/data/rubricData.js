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
        nameVi: 'Chiều sâu học thuật & Liên kết lý thuyết',
        nameEn: 'Academic Depth & Theoretical Connections',
        points: 3,
        detailVi: 'Sản phẩm vận dụng đúng lý thuyết, phân tích logic, gắn kết với các LO. Nhóm phải trả lời câu hỏi CQ của giảng viên. Trường hợp phải chờ/tra cứu: trừ 0.5 điểm/3 điểm.',
        detailEn: 'Product correctly applies theory, analyzes logically, connects to LOs. Group must answer lecturer CQ questions. Case of waiting/looking up: minus 0.5 points/3 points.'
      },
      {
        id: '1-2',
        nameVi: 'Sáng tạo, Hình thức & Tính trình bày',
        nameEn: 'Creativity, Form & Presentation',
        points: 2,
        detailVi: 'Sản phẩm bày sinh động (video, web, kick...). Không dùng slide thuyết trình. Thời lượng 10-20 phút thuyết trình, 20 phút phản biện.',
        detailEn: 'Product presented vividly (video, web, kick...). No presentation slides. Duration 10-20 minutes presentation, 20 minutes critique.'
      },
      {
        id: '1-3',
        nameVi: 'Tính tương tác',
        nameEn: 'Interactivity',
        points: 2,
        detailVi: 'Có yếu tố thu hút khán giả. Thu hút tối thiểu 80% lớp.',
        detailEn: 'Has elements to engage audience. Engages at least 80% of the class.'
      },
      {
        id: '1-4',
        nameVi: 'Ứng dụng AI có trách nhiệm — minh bạch — sáng tạo — liêm chính học thuật',
        nameEn: 'AI Application: Responsible — Transparent — Creative — Academic Integrity',
        points: 2,
        detailVi: 'Xem chi tiết trong phần "AI Usage" trong Phụ Lục. Chấm điểm: 0.5đ minh bạch + 0.5đ kiểm chứng + 0.5đ cam kết + 0.5đ ứng dụng sáng tạo.',
        detailEn: 'See details in "AI Usage" section in Appendix. Scoring: 0.5pts transparency + 0.5pts verification + 0.5pts commitment + 0.5pts creative application.'
      },
      {
        id: '1-5',
        nameVi: 'Tính cập nhật & Gắn kết thực tiễn',
        nameEn: 'Currency & Practical Connection',
        points: 1,
        detailVi: 'Bổ sung dẫn chứng từ bối cảnh xã hội, kinh tế, chính trị hiện nay.',
        detailEn: 'Add evidence from current social, economic, political context.'
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
        nameVi: 'Kỹ năng trình bày & Tổ chức logic',
        nameEn: 'Presentation Skills & Logical Organization',
        points: 3,
        detailVi: 'Tuân thủ thời lượng. Bố cục mạch lạc, logic. Hình thức thuyết trình liên kết chặt chẽ và làm nổi bật giá trị của sản phẩm sáng tạo.',
        detailEn: 'Follow duration. Logical, coherent layout. Presentation form tightly connects and highlights value of creative product.'
      },
      {
        id: '2-2',
        nameVi: 'Phản biện & trả lời phản biện',
        nameEn: 'Critique & Answering Questions',
        points: 4,
        detailVi: 'Yêu cầu logic, dẫn chứng, tôn trọng đối thoại. Điểm tính là trung bình cộng các lượt phản biện. Có 20 phút phản biện.',
        detailEn: 'Requirements: logical, evidence-based, respectful dialogue. Score is average of critique rounds. 20 minutes critique.'
      },
      {
        id: '2-3',
        nameVi: 'Đánh giá nội bộ',
        nameEn: 'Internal Assessment',
        points: 3,
        detailVi: 'Nhóm chốt phân bổ điểm gửi giảng viên vào slot 9. Mức cao nhất 110%-120%, hoàn thành 90%-100%, trung bình 70%-80%.',
        detailEn: 'Group finalizes point allocation and sends to lecturer in slot 9. Highest 110%-120%, completed 90%-100%, average 70%-80%.'
      }
    ]
  }
};

export default rubricData;
