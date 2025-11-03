"use client";

import Image from "next/image"; // ロゴを配置するために Image をインポート
import { useState, useEffect } from "react";

// 検索欄に表示するプレースホルダーの配列
const placeholders = [
  "食べたい気分や苦手な食べ物で検索...",
  "人数やシチュエーションで検索...",
  "予算やエリアで検索...",
];

export default function Home() {
  // ランダム切り替えのロジック
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setCurrentPlaceholder(placeholders[randomIndex]);
    }, 10000); // 10秒ごとに切り替え

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        {/*  ロゴとサイト名  */}
        <div className="w-full mb-10 flex flex-col items-center sm:items-start">
          <Image
            src="/meshimatch_logo.png"
            alt="Meshi Umatch Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          
          {/* サイト名 */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Meshi Umatch
          </h1>
        </div>
        {/* ロゴとサイト名ここまで */}


        {/* 検索欄 */}
        <form className="flex w-full items-center gap-3">
          <label htmlFor="search-input" className="sr-only">
            自然言語で飲食店を検索
          </label>
          <input
            type="text"
            id="search-input"
            // placeholderを記憶された変数に変更
            placeholder={currentPlaceholder}
            className="flex-grow h-12 w-full rounded-full border border-solid border-black/[.08] px-5 text-base text-black transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black/50 dark:border-white/[.145] dark:bg-zinc-900 dark:text-white dark:focus:ring-white/50"
          />
          <button
            type="submit"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full 
              bg-orange-500 {/* 変更: 背景をオレンジに */}
              text-white {/* 変更: アイコンの色を白に */}
              transition-colors 
              hover:bg-orange-600 {/* 変更: ホバー時もオレンジの濃い色に */}
              dark:hover:bg-orange-600" 
            aria-label="検索"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
        {/* 検索欄ここまで */}

      </main>
    </div>
  );
}