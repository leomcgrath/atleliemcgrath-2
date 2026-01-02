"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  imageUrl: string;
  alt: string;
  permalink: string;
  isLarge?: boolean; // For featured/larger posts in the grid
}

export default function Instagram() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/instagram");
        const data = await response.json();

        if (data.posts && data.posts.length > 0) {
          setInstagramPosts(data.posts);
        } else {
          // Fallback to placeholder images if API fails
          setInstagramPosts([
            {
              id: "1",
              imageUrl: "/atle-cowboy.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
              isLarge: true,
            },
            {
              id: "2",
              imageUrl: "/atle-standing.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "3",
              imageUrl: "/atle-half-shave.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "4",
              imageUrl: "/atle-cowboy.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "5",
              imageUrl: "/atle-standing.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
              isLarge: true,
            },
            {
              id: "6",
              imageUrl: "/atle-half-shave.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "7",
              imageUrl: "/atle-cowboy.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "8",
              imageUrl: "/atle-standing.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
            {
              id: "9",
              imageUrl: "/atle-half-shave.png",
              alt: "Instagram post",
              permalink: "https://www.instagram.com/atleliemcgrath/",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching Instagram posts:", err);
        setError("Failed to load Instagram posts");
        // Set fallback images on error
        setInstagramPosts([
          {
            id: "1",
            imageUrl: "/atle-cowboy.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
            isLarge: true,
          },
          {
            id: "2",
            imageUrl: "/atle-standing.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "3",
            imageUrl: "/atle-half-shave.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "4",
            imageUrl: "/atle-cowboy.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "5",
            imageUrl: "/atle-standing.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
            isLarge: true,
          },
          {
            id: "6",
            imageUrl: "/atle-half-shave.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "7",
            imageUrl: "/atle-cowboy.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "8",
            imageUrl: "/atle-standing.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
          {
            id: "9",
            imageUrl: "/atle-half-shave.png",
            alt: "Instagram post",
            permalink: "https://www.instagram.com/atleliemcgrath/",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);
  return (
    <section className="w-full bg-[#0a0e27] py-16 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            FOLLOW @ATLELIEMCGRATH
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <a
            href="https://www.instagram.com/atleliemcgrath/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-[#FFD700] transition-colors duration-300 group"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-lg md:text-xl font-bold uppercase tracking-wider">
              @atleliemcgrath
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 auto-rows-fr">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-white/10 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* Instagram Grid - Collage Style */}
        {!isLoading && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 auto-rows-fr">
            {instagramPosts.map((post, index) => {
            // Create a more dynamic layout - some posts span multiple columns/rows
            const getGridClasses = () => {
              if (index === 0) return "md:col-span-2 md:row-span-2"; // Large featured post
              if (index === 4) return "md:col-span-2 md:row-span-2"; // Another large post
              return "";
            };

            return (
            <a
              key={post.id}
              href={post.permalink || "https://www.instagram.com/atleliemcgrath/"}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden rounded-lg aspect-square group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 ${getGridClasses()}`}
            >
              <div className="absolute inset-0">
                <Image
                  src={post.imageUrl}
                  alt={post.alt}
                  fill
                  className="object-cover"
                  sizes={
                    post.isLarge
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>

              {/* Instagram Icon Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 rounded-full p-4">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </a>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
}

