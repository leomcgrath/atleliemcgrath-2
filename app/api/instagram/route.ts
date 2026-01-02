import { NextResponse } from "next/server";

interface InstagramPost {
  id: string;
  imageUrl: string;
  alt: string;
  permalink: string;
  isLarge?: boolean;
}

interface InstagramMediaResponse {
  data: Array<{
    id: string;
    caption?: string;
    media_type: string;
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
  }>;
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

// Fetch Instagram posts using the official Instagram Graph API
async function fetchInstagramPosts(): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "INSTAGRAM_ACCESS_TOKEN environment variable is not set. " +
      "Please set it in your .env.local file. " +
      "To get an access token, you need to:\n" +
      "1. Convert your Instagram account to a Business or Creator account\n" +
      "2. Create a Facebook App at https://developers.facebook.com/\n" +
      "3. Add the Instagram Graph API product to your app\n" +
      "4. Generate an access token with 'instagram_basic' and 'pages_show_list' permissions"
    );
  }

  try {
    // Fetch media from Instagram Graph API
    // Fields: id, caption, media_type, media_url, permalink, thumbnail_url
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=9&access_token=${accessToken}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Instagram API Error:", errorData);
      
      if (response.status === 401) {
        throw new Error(
          "Invalid or expired access token. Please regenerate your access token in the Facebook Developers portal."
        );
      }
      
      throw new Error(
        `Instagram API error: ${response.status} ${response.statusText}. ${errorData.error?.message || ""}`
      );
    }

    const data: InstagramMediaResponse = await response.json();

    if (!data.data || data.data.length === 0) {
      console.warn("No Instagram posts found in API response");
      return [];
    }

    // Transform API response to our InstagramPost format
    const posts: InstagramPost[] = data.data
      .slice(0, 9)
      .map((item, index) => {
        // Use thumbnail_url for videos, media_url for images
        const imageUrl = 
          item.media_type === "VIDEO" && item.thumbnail_url
            ? item.thumbnail_url
            : item.media_url;

        return {
          id: item.id,
          imageUrl,
          alt: item.caption 
            ? item.caption.substring(0, 100)
            : "Instagram post",
          permalink: item.permalink,
          isLarge: index === 0 || index === 4, // Make first and fifth posts larger
        };
      })
      .filter((post) => post.imageUrl && post.imageUrl.length > 0);

    console.log(`Successfully fetched ${posts.length} Instagram posts from Graph API`);
    return posts;
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const posts = await fetchInstagramPosts();
    
    if (posts.length === 0) {
      return NextResponse.json(
        { 
          posts: [], 
          success: false, 
          error: "No Instagram posts found. Please check your access token and account settings." 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { posts, success: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error in Instagram API route:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch Instagram posts";
    return NextResponse.json(
      { 
        posts: [], 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

