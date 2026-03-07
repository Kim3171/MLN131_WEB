// src/lib/claude.js
// Gemini API wrapper for AI-powered features

/**
 * Call Gemini API with a system prompt and user message
 * @param {string} systemPrompt - The system prompt to set context
 * @param {string} userMessage - The user's message/query
 * @returns {Promise<string>} - The AI's response text
 */
export async function askClaude(systemPrompt, userMessage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Check if API key is set
  if (!apiKey || apiKey === 'your_key_here' || apiKey === 'AIzaSy...') {
    console.error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env.local');
    return 'AI đang chờ cấu hình. Vui lòng thêm API key vào file .env.local / AI awaiting configuration. Please add API key to .env.local';
  }

  // Try models in order of preference (gemini-flash-latest auto-selects available model)
  const models = ['gemini-flash-latest', 'gemini-2.5-flash-lite'];

  // Merge system prompt and user message
  const combinedText = systemPrompt + "\n\n" + userMessage;

  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: combinedText }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error (${model}):`, response.status, errorText);
        // If rate limited, try next model
        if (response.status === 429 || response.status === 503) {
          continue;
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      console.error(`Gemini API error (${model}):`, error.message);
      // Continue to next model
    }
  }

  return 'Xin lỗi, hiện tại không thể kết nối với AI. Vui lòng thử lại sau. / Sorry, unable to connect to AI. Please try again later.';
}

/**
 * System prompt for Historical Analyst feature
 */
export const historianSystemPrompt = `Bạn là một giáo sư lịch sử Việt Nam chuyên sâu về cuộc kháng chiến chống đế quốc Mỹ (1954-1975).
Nhiệm vụ: Hỗ trợ học sinh hoàn thành bài CQ6 về việc cuộc kháng chiến này là của riêng Việt Nam hay là một phần của phong trào cách mạng thế giới.

NGUYÊN TẮC TRẢ LỜI:
1. TRẢ LỜI BẰNG TIẾNG VIỆT là chính. CHỈ trả lời tiếng Anh khi người dùng sử dụng từ khóa tiếng Anh hoặc hỏi bằng tiếng Anh.
2. Đảm bảo tính chính xác lịch sử tuyệt đối - thầy giáo sẽ hỏi những câu hỏi rất khó.
3. Cung cấp bằng chứng cụ thể với ngày tháng, số liệu chính xác từ giai đoạn 1965-1975.
4. Nhấn mạnh các khía cạnh:
   - Bản chất kép của cuộc kháng chiến: vừa là cuộc giải phóng dân tộc, vừa là trung tâm của phong trào chống đế quốc thế giới
   - Sự ủng hộ quốc tế: viện trợ quân sự, kinh tế từ Liên Xô, Trung Quốc và các nước xã hội chủ nghĩa
   - Phong trào phản chiến tại Mỹ và các nước phương Tây
   - Đường lối "Kết hợp sức mạnh dân tộc với sức mạnh thời đại" của Đảng
   - Sự lãnh đạo của Đảng trong việc đảm bảo độc lập tự chủ, không để bị cuốn vào mâu thuẫn Xô-Trung
5. Giữ phong cách học thuật, nghiêm túc, khách quan.
6. Trả lời ngắn gọn, dưới 300 từ.`;

/**
 * System prompt for Strategy Game hints
 */
export const strategyHintSystemPrompt = `Bạn là một nhà sử học quân sự ngắn gọn, súc tích. Giải thích trong 2-3 câu tại sao quyết định lịch sử đó hợp lý trong bối cảnh chiến lược Việt Nam 1965-1975. Cụ thể về ngày tháng và số liệu. TRẢ LỜI BẰNG TIẾNG VIỆT.`;

/**
 * System prompt for Timeline summary
 */
export const timelineSummarySystemPrompt = `Bạn đang viết nhãn cho triển lãm bảo tàng. Dựa trên các sự kiện lịch sử mà người xem vừa khám phá, viết 4 câu liên kết giải thích mối quan hệ nhân quả giữa chúng. TRẢ LỜI BẰNG TIẾNG VIỆT. Ngôn ngữ: trang trọng, giáo dục, cảm xúc. CHỉ viết tiếng Anh khi người dùng yêu cầu.`;

export default askClaude;
