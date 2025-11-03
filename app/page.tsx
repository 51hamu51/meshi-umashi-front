
"use client";

import Image from "next/image"; // ロゴを配置するために Image をインポート
import { useState, useEffect } from "react";

// 検索欄に表示するプレースホルダーの配列
const placeholders = [
  "食べたい気分や苦手な食べ物で検索...",
  "人数やシチュエーションで検索...",
  "予算やエリアで検索...",
];
// プレースホルダーのローテーション間隔（ミリ秒）
const PLACEHOLDER_ROTATION_MS = 10000;

export default function Home() {
  // ランダム切り替えのロジック
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  // ★追加: 検索クエリ（入力テキスト）を管理するstate
  const [query, setQuery] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setCurrentPlaceholder(placeholders[randomIndex]);
    }, PLACEHOLDER_ROTATION_MS); // 10秒ごと -> 定数に置き換え

    return () => clearInterval(intervalId);
  }, []);

  // ★追加: フォーム送信時の処理
  const handleSubmit = async (e) => {
    // フォーム送信のデフォルト動作（ページリロード）を防ぐ
    e.preventDefault();

    // 入力が空の場合は何もしない
    if (!query.trim()) {
      return;
    }

    // バックエンドに送るJSONデータを作成
    const jsonData = {
      query: query, // 入力されたテキストを "query" というキーで保持
    };

    try {
      // バックエンドのAPIエンドポイントにJSONをPOSTリクエストで送信
      // 送信先のエンドポイントは '/api/search' としています（適宜変更してください）
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // レスポンス（検索結果など）を処理
      const result = await response.json();
      console.log("バックエンドからの応答:", result);

      // (オプション) 送信後に検索欄をクリアする場合
      // setQuery("");

    } catch (error) {
      console.error("検索リクエストの送信に失敗しました:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* ロゴとサイト名  */}
        <div className="w-full mb-10 flex flex-col items-center sm:items-start">
          <Image
            src="/logo.png"
            alt="Meshi Umatch Logo"
            width={400}
            height={400}
            className="rounded-full mb-4"
          />
        </div>
        {/* ロゴとサイト名ここまで */}

        {/* 検索欄 */}
        {/* ★変更: onSubmitイベントハンドラを追加 */}
        <form className="flex w-full items-center gap-3" onSubmit={handleSubmit}>
          <label htmlFor="search-input" className="sr-only">
            自然言語で飲食店を検索
          </label>
          <input
            type="text"
            id="search-input"
            // placeholderを記憶された変数に変更
            placeholder={currentPlaceholder}
            // ★追加: stateと連携
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow h-12 w-full rounded-full border border-solid border-black/[.08] px-5 text-base text-black transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black/50 dark:border-white/[.145] dark:bg-zinc-900 dark:text-white dark:focus:ring-white/50"
          />
          <button
            type="submit"
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full 
              bg-orange-500 
              text-white 
              transition-colors 
              hover:bg-orange-600 
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

