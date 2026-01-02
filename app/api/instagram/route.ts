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
    // Use a more realistic user agent and headers to avoid blocking
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        Referer: "https://www.instagram.com/",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch Instagram profile: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    if (!html || html.length < 1000) {
      console.error("Received invalid or empty HTML response");
      throw new Error("Invalid HTML response from Instagram");
    }

    const $ = cheerio.load(html);
    
    // Try multiple methods to extract Instagram data
    
    // Method 1: Look for window._sharedData (various formats) - most common
    const sharedDataPatterns = [
      /window\._sharedData\s*=\s*({.+?});/s,
      /window\._sharedData\s*=\s*({[\s\S]+?});/,
      /"_sharedData":\s*({.+?})/s,
      /window\.__additionalDataLoaded\s*\([^,]+,\s*({.+?})\)/s,
    ];
    
    for (const pattern of sharedDataPatterns) {
      const sharedDataMatch = html.match(pattern);
      if (sharedDataMatch && sharedDataMatch[1]) {
        try {
          // Clean up the JSON string - remove trailing commas and fix common issues
          let jsonStr = sharedDataMatch[1].trim();
          // Remove trailing commas before closing braces/brackets
          jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
          
          const sharedData = JSON.parse(jsonStr);
          
          // Try multiple paths to find user data
          const user = 
            sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user ||
            sharedData?.graphql?.user ||
            sharedData?.data?.user ||
            sharedData?.user;
          
          if (user?.edge_owner_to_timeline_media?.edges) {
            const posts = user.edge_owner_to_timeline_media.edges
              .slice(0, 9)
              .map((edge: any, index: number) => {
                const node = edge.node;
                
                let imageUrl = "";
                // Try multiple image URL sources
                if (node.display_url) {
                  imageUrl = node.display_url;
                } else if (node.thumbnail_src) {
                  imageUrl = node.thumbnail_src;
                } else if (node.thumbnail_resources?.length > 0) {
                  // Get the highest quality thumbnail
                  const thumbnails = node.thumbnail_resources;
                  imageUrl = thumbnails[thumbnails.length - 1].src;
                } else if (node.images?.standard_resolution?.url) {
                  imageUrl = node.images.standard_resolution.url;
                } else if (node.images?.thumbnail?.url) {
                  imageUrl = node.images.thumbnail.url;
                }

                const caption =
                  node.edge_media_to_caption?.edges?.[0]?.node?.text ||
                  node.caption ||
                  `Instagram post by @${username}`;

                return {
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: (caption || `Instagram post by @${username}`).substring(0, 100),
                  permalink: `https://www.instagram.com/p/${node.shortcode || node.id}/`,
                  isLarge: index === 0 || index === 4,
                };
              })
              .filter((post: InstagramPost) => post.imageUrl && post.imageUrl.length > 0);

            if (posts.length > 0) {
              console.log(`Successfully fetched ${posts.length} Instagram posts using Method 1`);
              return posts;
            }
          }
        } catch (e) {
          console.warn("Method 1 parsing failed, trying next method:", e);
          continue;
        }
      }
    }

    // Method 2: Look for script tags with JSON data
    const scripts = $('script[type="application/json"], script[type="application/ld+json"]');
    for (let i = 0; i < scripts.length; i++) {
      try {
        const scriptContent = $(scripts[i]).html();
        if (scriptContent && scriptContent.length > 100) {
          // Clean JSON string
          let jsonStr = scriptContent.trim();
          jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
          
          const data = JSON.parse(jsonStr);
          
          // Try to find user data in various structures
          const user = 
            data?.entry_data?.ProfilePage?.[0]?.graphql?.user ||
            data?.graphql?.user ||
            data?.data?.user ||
            data?.user;
          
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
                } else if (node.images?.standard_resolution?.url) {
                  imageUrl = node.images.standard_resolution.url;
                }

                const caption =
                  node.edge_media_to_caption?.edges?.[0]?.node?.text ||
                  node.caption ||
                  `Instagram post by @${username}`;

                return {
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: (caption || `Instagram post by @${username}`).substring(0, 100),
                  permalink: `https://www.instagram.com/p/${node.shortcode || node.id}/`,
                  isLarge: index === 0 || index === 4,
                };
              })
              .filter((post: InstagramPost) => post.imageUrl && post.imageUrl.length > 0);

            if (posts.length > 0) {
              console.log(`Successfully fetched ${posts.length} Instagram posts using Method 2`);
              return posts;
            }
          }
        }
      } catch (e) {
        // Continue to next script
        continue;
      }
    }

    // Method 3: Look for any JSON containing edge_owner_to_timeline_media (greedy search)
    const timelineMediaPatterns = [
      /"edge_owner_to_timeline_media"\s*:\s*\{[^}]*"edges"\s*:\s*\[([\s\S]{100,50000})\]/,
      /edge_owner_to_timeline_media[^}]*edges[^[]*\[([\s\S]{100,50000})\]/,
    ];
    
    for (const pattern of timelineMediaPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        try {
          // Try to extract individual post data from the edges array
          const edgesStr = match[1];
          const nodeMatches = edgesStr.matchAll(/"node"\s*:\s*\{([\s\S]{50,5000}?)\}/g);
          const posts: InstagramPost[] = [];
          let index = 0;
          
          for (const nodeMatch of nodeMatches) {
            if (index >= 9) break;
            
            const nodeStr = `{${nodeMatch[1]}}`;
            try {
              const node = JSON.parse(nodeStr);
              
              let imageUrl = "";
              if (node.display_url) {
                imageUrl = node.display_url;
              } else if (node.thumbnail_src) {
                imageUrl = node.thumbnail_src;
              } else if (node.thumbnail_resources?.length > 0) {
                imageUrl = node.thumbnail_resources[node.thumbnail_resources.length - 1].src;
              }
              
              if (imageUrl) {
                posts.push({
                  id: node.id || node.shortcode || `post-${index}`,
                  imageUrl,
                  alt: (node.edge_media_to_caption?.edges?.[0]?.node?.text || `Instagram post by @${username}`).substring(0, 100),
                  permalink: `https://www.instagram.com/p/${node.shortcode || node.id}/`,
                  isLarge: index === 0 || index === 4,
                });
                index++;
              }
            } catch (e) {
              continue;
            }
          }
          
          if (posts.length > 0) {
            console.log(`Successfully fetched ${posts.length} Instagram posts using Method 3`);
            return posts;
          }
        } catch (e) {
          continue;
        }
      }
    }

    // Method 4: Search for image URLs directly in the HTML (last resort)
    const imageUrlPattern = /"display_url"\s*:\s*"([^"]+)"/g;
    const shortcodePattern = /"shortcode"\s*:\s*"([^"]+)"/g;
    const imageUrls: string[] = [];
    const shortcodes: string[] = [];
    
    let match;
    while ((match = imageUrlPattern.exec(html)) !== null && imageUrls.length < 9) {
      imageUrls.push(match[1]);
    }
    
    while ((match = shortcodePattern.exec(html)) !== null && shortcodes.length < 9) {
      shortcodes.push(match[1]);
    }
    
    if (imageUrls.length > 0) {
      const posts = imageUrls.slice(0, 9).map((imageUrl, index) => ({
        id: shortcodes[index] || `post-${index}`,
        imageUrl: imageUrl.replace(/\\u0026/g, '&'),
        alt: `Instagram post by @${username}`,
        permalink: `https://www.instagram.com/p/${shortcodes[index] || ''}/`,
        isLarge: index === 0 || index === 4,
      })).filter((post: InstagramPost) => post.imageUrl && post.imageUrl.length > 0);
      
      if (posts.length > 0) {
        console.log(`Successfully fetched ${posts.length} Instagram posts using Method 4`);
        return posts;
      }
    }

  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    throw error; // Re-throw to be caught by the route handler
  }

  console.warn("No Instagram posts found using any method");
  return [];
}

export async function GET() {
  const username = "atleliemcgrath";
  
  try {
    const posts = await fetchInstagramPosts(username);
    
    if (posts.length === 0) {
      console.error(`No Instagram posts found for @${username}`);
      return NextResponse.json(
        { 
          posts: [], 
          success: false, 
          error: "No posts found. Instagram may be blocking requests or the profile structure has changed." 
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

