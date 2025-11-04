// ユーザーの入力を受け付けるため、クライアントコンポーネントにします
"use client";

// 状態管理(useState)と、副作用(useEffect)をインポートします
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// 💡TypeScriptを使用する場合、ここで型定義をすると便利です
type Store = {
  id: number;
  store_name: string;
  taste: number;
  cleanliness: number;
  atmosphere: number;
  price: number;
  appeal_point: string;
  url: string;
  image_path: string;
};

// コンポーネント名は 'View' にします
export default function View() {
  const router = useRouter();
  // 💡 APIから取得した「すべてのお店」のデータを保持するstate
  const [allStores, setAllStores] = useState<Store[]>([]); // 初期値は空の配列 // 検索ボックスの入力値を管理するためのstate
  const [searchQuery, setSearchQuery] = useState(""); // 💡 画面が最初に読み込まれた時に一度だけ実行される

  useEffect(() => {
    // APIからデータを取得する非同期関数
    const fetchStores = async () => {
      // --- 本来のAPIリクエスト ---
      // try {
      //  const res = await fetch("/api/stores"); // (例) Next.jsのAPIルート
      //  const data = await res.json();
      //  setAllStores(data);
      // } catch (error) {
      //  console.error("データの取得に失敗しました:", error);
      // }

      // --- 動作確認用のモックデータ (DBスキーマ準拠) ---
      const mockData = [
        {
          id: 1,
          store_name: "絶品！Next.jsカフェ",
          taste: 5,
          cleanliness: 4,
          atmosphere: 5,
          price: 3,
          appeal_point: "席が広く、雰囲気が静かで作業に集中できます。",
          url: "https://nextjs.org/docs",
          image_path: "next.jpg",
        },
        {
          id: 2,
          store_name: "Reactラーメン 恵比寿店",
          taste: 5,
          cleanliness: 5,
          atmosphere: 3,
          price: 2,
          appeal_point: "とにかくスープが絶品。店内も清潔です。",
          url: "https://react.dev/",
          image_path: "react.webp",
        },
        {
          id: 3,
          store_name: "Tailwindビストロ",
          taste: 4,
          cleanliness: 3,
          atmosphere: 4,
          price: 4,
          appeal_point: "おしゃれな内装でデートにぴったり。",
          url: "https://tailwindcss.com/",
          image_path: "tail.png",
        },
      ];
      setAllStores(mockData); // 取得したデータでstateを更新 // --- ここまでモックデータ ---
    };

    fetchStores(); // 関数を実行
  }, []); // 空の配列 [] を指定すると、コンポーネントのマウント時に1回だけ実行される // 💡 検索クエリに基づいて、`allStores` から表示用のデータをフィルタリング

  const filteredItems = allStores.filter(
    (item) =>
      item.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.appeal_point && // appeal_point が null でないことを確認
        item.appeal_point.toLowerCase().includes(searchQuery.toLowerCase()))
  ); // 予約ボタンがクリックされたときの処理

  const handleReservationClick = (storeName: string) => {
    alert(`${storeName} を予約します`);
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100 font-sans dark:bg-zinc-900">
      <main className="flex w-full max-w-3xl flex-col items-start gap-8 p-4 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-orange-600 dark:text-orange-400">
          検索結果
        </h1>
        <button
          onClick={() => router.push("/")}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 
                       shadow-sm transition-colors hover:bg-gray-300 dark:bg-zinc-800 
                       dark:text-white dark:hover:bg-zinc-700"
        >
          ← トップに戻る
        </button>

        <div className="w-full">
          {/* 💡 APIからデータを取得するまでは filteredItems.length は 0 */}
          {filteredItems.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 md:flex-row"
                >
                  {/* 1. 画像 */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image_path} // 💡 DBスキーマ (image_path)
                      alt={item.store_name} // 💡 DBスキーマ (store_name)
                      className="h-32 w-32 rounded-md object-cover"
                    />
                  </div>
                  {/* 2. 情報（右側） */}
                  <div className="flex-grow">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <h3 className="text-lg font-bold text-blue-700 group-hover:underline dark:text-blue-400 md:text-xl">
                        {item.store_name} {/* 💡 DBスキーマ (store_name) */}
                      </h3>
                    </a>
                    {/* 💡 評価（星など）の表示を削除 */}
                    {/* 💡 DBスキーマ (appeal_point) を表示 */}
                    <p className="mt-2 text-sm font-medium text-gray-800 dark:text-zinc-200">
                      {item.appeal_point}
                    </p>
                    {/* 💡 description の表示を削除 */}
                  </div>
                  {/* 3. 予約ボタン */}
                  <div className="flex-shrink-0 self-center md:self-start">
                    <button
                      type="button"
                      onClick={() => handleReservationClick(item.store_name)} // 💡 store_name
                      className="rounded-lg bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                      予約する
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            // 結果が0件の場合のメッセージ
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-md dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-lg font-semibold text-gray-700 dark:text-zinc-300">
                {searchQuery
                  ? "一致するお店が見つかりませんでした。"
                  : "お店を検索してください。"}
              </p>
              <p className="mt-2 text-gray-500 dark:text-zinc-400">
                （例：Reactラーメン、おしゃれ）
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
