import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { adId, platform } = await request.json();

    if (!adId || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simulate posting to social media platforms
    // In a real implementation, this would use platform APIs
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

    const mockResponse = {
      success: true,
      postId: `${platform}_post_${Date.now()}`,
      url: platform === 'tiktok' 
        ? `https://tiktok.com/@testaccount/video/${Date.now()}`
        : `https://instagram.com/p/${Date.now()}`,
      platform,
      adId,
      postedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Error posting to social:', error);
    return NextResponse.json(
      { error: 'Failed to post to social media' },
      { status: 500 }
    );
  }
}
