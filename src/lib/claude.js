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

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [{
          parts: [{ text: userMessage }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error('Gemini API error:', error.message);
    return 'Xin lỗi, hiện tại không thể kết nối với AI. Vui lòng thử lại sau. / Sorry, unable to connect to AI. Please try again later.';
  }
}

/**
 * System prompt for Historical Analyst feature
 */
export const historianSystemPrompt = `You are a Vietnamese history professor specializing in the resistance war against American imperialism (1954-1975).
A student is preparing their CQ6 assignment about whether the war was solely Vietnam's or part of a global revolutionary movement.
Provide concise, academically rigorous feedback in both Vietnamese and English.
Evaluate their argument's historical accuracy, suggest supporting evidence from the 1965-1975 period,
and recommend connections to the Party's leadership decisions. Keep responses under 300 words.`;

/**
 * System prompt for Strategy Game hints
 */
export const strategyHintSystemPrompt = `You are a concise military historian. Explain in 2-3 sentences why the historical decision made sense given the strategic context of Vietnam 1965-1975. Be specific with dates and figures.`;

/**
 * System prompt for Timeline summary
 */
export const timelineSummarySystemPrompt = `You are creating a museum exhibit label. Given these historical events the visitor just explored, write a 4-sentence connecting narrative that explains the cause-and-effect relationship between them. Write in both Vietnamese and English, alternating sentences. Tone: dignified, educational, emotionally resonant.`;

export default askClaude;
