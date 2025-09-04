import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, prompt, platforms } = await request.json();

    if (!imageUrl || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate ad variations using AI
    const variations = [];
    
    for (let i = 0; i < 3; i++) {
      // Create platform-specific prompt
      const platformPrompt = platforms.includes('tiktok') && platforms.includes('instagram')
        ? 'Create an ad suitable for both TikTok and Instagram'
        : platforms.includes('tiktok')
        ? 'Create a TikTok-style ad with trendy, energetic appeal'
        : 'Create an Instagram-style ad with aesthetic, polished visuals';

      const fullPrompt = `${platformPrompt}. ${prompt || 'Modern, engaging product advertisement'}. Variation ${i + 1}.`;

      // Generate ad copy using AI
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'user',
            content: `Create an engaging social media ad caption for this product. Style: ${fullPrompt}. Keep it concise, catchy, and include relevant hashtags. Max 150 characters.`
          }
        ],
        max_tokens: 100,
      });

      const caption = completion.choices[0]?.message?.content || `🔥 Amazing product alert! Get yours now! #trending #product #musthave`;

      variations.push({
        id: `ad-${Date.now()}-${i}`,
        imageUrl: imageUrl, // In a real app, this would be the AI-generated image
        prompt: fullPrompt,
        caption: caption.trim(),
        platform: platforms.length > 1 ? 'both' : platforms[0],
      });
    }

    return NextResponse.json({
      success: true,
      variations,
    });

  } catch (error) {
    console.error('Error generating ads:', error);
    return NextResponse.json(
      { error: 'Failed to generate ads' },
      { status: 500 }
    );
  }
}
