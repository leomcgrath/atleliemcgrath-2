import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface InstagramPost {
  id: string;
  imageUrl: string;
  alt: string;
  permalink: string;
  isLarge?: boolean;
}

// Fetch Instagram posts from public profile using HTML parsing
async function fetchInstagramPosts(username: string): Promise<InstagramPost[]> {
  try {
    // Method: Fetch the profile page HTML and extract JSON data from script tags
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.instagram.com/",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Failed to fetch Instagram profile: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Try multiple methods to extract Instagram data
    
    // Method 1: Look for window._sharedData (various formats)
    const sharedDataPatterns = [
      /window\._sharedData\s*=\s*({.+?});/s,
      /window\._sharedData\s*=\s*({[\s\S]+?});/,
      /"_sharedData":\s*({.+?})/s,
    ];
    
    for (const pattern of sharedDataPatterns) {
      const sharedDataMatch = html.match(pattern);
      if (sharedDataMatch) {
        try {
          const sharedData = JSON.parse(sharedDataMatch[1]);
          const user = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
          
          if (user?.edge_owner_to_timeline_media?.edges) {
            const posts = user.edge_owner_to_timeline_media.edges
              .slice(0, 9)
              .map((edge: any, index: number) => {
                const node = edge.node;
                
                let imageUrl = "";
                if (node.display_url) {
                  imageUrl = node.display_url;
                } else if (node.thumbnail_src) {
                  imageUrl = node.thumbnail_src;
                } else if (node.thumbnail_resources?.length > 0) {
                  imageUrl = node.thumbnail_resources[node.thumbnail_resources.length - 1].src;
                }

                const caption =
                  node.edge_media_to_caption?.edges?.[0]?.node?.text ||
                  `Instagram post by @${username}`;

                return {
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: caption.substring(0, 100),
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  isLarge: index === 0 || index === 4,
                };
              })
              .filter((post: InstagramPost) => post.imageUrl);

            if (posts.length > 0) {
              return posts;
            }
          }
        } catch (e) {
          // Try next pattern
          continue;
        }
        break; // Success, exit loop
      }
    }

    // Method 2: Look for script tags with JSON data
    const scripts = $('script[type="application/json"]');
    for (let i = 0; i < scripts.length; i++) {
      try {
        const scriptContent = $(scripts[i]).html();
        if (scriptContent) {
          const data = JSON.parse(scriptContent);
          
          // Try to find user data in various structures
          const user = 
            data?.entry_data?.ProfilePage?.[0]?.graphql?.user ||
            data?.graphql?.user ||
            data?.data?.user;
          
          if (user?.edge_owner_to_timeline_media?.edges) {
            const posts = user.edge_owner_to_timeline_media.edges
              .slice(0, 9)
              .map((edge: any, index: number) => {
                const node = edge.node;
                
                let imageUrl = "";
                if (node.display_url) {
                  imageUrl = node.display_url;
                } else if (node.thumbnail_src) {
                  imageUrl = node.thumbnail_src;
                } else if (node.thumbnail_resources?.length > 0) {
                  imageUrl = node.thumbnail_resources[node.thumbnail_resources.length - 1].src;
                }

                return {
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: `Instagram post by @${username}`,
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  isLarge: index === 0 || index === 4,
                };
              })
              .filter((post: InstagramPost) => post.imageUrl);

            if (posts.length > 0) {
              return posts;
            }
          }
        }
      } catch (e) {
        // Continue to next script
      }
    }

    // Method 3: Look for __additionalDataLoaded (various formats)
    const additionalDataPatterns = [
      /window\.__additionalDataLoaded\s*\([^,]+,\s*({.+?})\)/s,
      /__additionalDataLoaded\([^,]+,\s*({.+?})\)/s,
      /"additionalData":\s*({.+?})/s,
    ];
    
    for (const pattern of additionalDataPatterns) {
      const additionalDataMatch = html.match(pattern);
      if (additionalDataMatch) {
        try {
          const additionalData = JSON.parse(additionalDataMatch[1]);
          const user = additionalData?.graphql?.user;
          
          if (user?.edge_owner_to_timeline_media?.edges) {
            const posts = user.edge_owner_to_timeline_media.edges
              .slice(0, 9)
              .map((edge: any, index: number) => {
                const node = edge.node;
                
                let imageUrl = "";
                if (node.display_url) {
                  imageUrl = node.display_url;
                } else if (node.thumbnail_src) {
                  imageUrl = node.thumbnail_src;
                } else if (node.thumbnail_resources?.length > 0) {
                  imageUrl = node.thumbnail_resources[node.thumbnail_resources.length - 1].src;
                }

                return {
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: `Instagram post by @${username}`,
                  permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                  isLarge: index === 0 || index === 4,
                };
              })
              .filter((post: InstagramPost) => post.imageUrl);

            if (posts.length > 0) {
              return posts;
            }
          }
        } catch (e) {
          // Try next pattern
          continue;
        }
        break; // Success, exit loop
      }
    }
    
    // Method 4: Try to find any JSON data with "edge_owner_to_timeline_media"
    const timelineMediaMatch = html.match(/"edge_owner_to_timeline_media":\s*({.+?"edges":\s*\[.+?\].+?})/s);
    if (timelineMediaMatch) {
      try {
        // Try to extract and parse the media data
        const mediaData = JSON.parse(`{${timelineMediaMatch[1]}}`);
        if (mediaData?.edges) {
          const posts = mediaData.edges
            .slice(0, 9)
            .map((edge: any, index: number) => {
              const node = edge.node;
              
              let imageUrl = "";
              if (node.display_url) {
                imageUrl = node.display_url;
              } else if (node.thumbnail_src) {
                imageUrl = node.thumbnail_src;
              } else if (node.thumbnail_resources?.length > 0) {
                imageUrl = node.thumbnail_resources[node.thumbnail_resources.length - 1].src;
              }

              return {
                id: node.id || node.shortcode || `post-${index}`,
                imageUrl,
                alt: `Instagram post by @${username}`,
                permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                isLarge: index === 0 || index === 4,
              };
            })
            .filter((post: InstagramPost) => post.imageUrl);

          if (posts.length > 0) {
            return posts;
          }
        }
      } catch (e) {
        console.error("Error parsing timeline media:", e);
      }
    }

  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
  }

  return [];
}

export async function GET() {
  const username = "atleliemcgrath";
  
  try {
    const posts = await fetchInstagramPosts(username);
    
    // Log for debugging (remove in production)
    if (posts.length === 0) {
      console.warn(`No Instagram posts found for @${username}. Instagram may be blocking requests.`);
    }

    return NextResponse.json(
      { posts, success: posts.length > 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Error in Instagram API route:", error);
    return NextResponse.json(
      { posts: [], success: false, error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}

