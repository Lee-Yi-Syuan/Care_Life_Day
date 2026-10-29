import { useCallback, useState } from 'react';
import { SlotMachine } from '@/components/SlotMachine';
import { InventoryBoard } from '@/components/InventoryBoard';
import { WinnerModal } from '@/components/WinnerModal';
import { AdminPanel, PasswordModal } from '@/components/AdminPanel';
import { useDogs } from '@/hooks/useDogs';
import { totalRemaining } from '@/hooks/useDogs';
import { type Dog } from '@/types';
import { Settings, PawPrint } from 'lucide-react';

function App() {
  const { dogs, decrement, updateCounts, reset } = useDogs();
  const [winner, setWinner] = useState<Dog | null>(null);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  // 後台狀態
  const [showPassword, setShowPassword] = useState(false);
  const [authed, setAuthed] = useState(false);

  const total = totalRemaining(dogs);

  const handleWin = useCallback(
    (dog: Dog) => {
      decrement(dog.id);
      setHighlightId(dog.id);
      setWinner(dog);
    },
    [decrement]
  );

  const handleCloseModal = useCallback(() => {
    setWinner(null);
    setHighlightId(null);
  }, []);

  // 後台視圖
  if (authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 px-4 py-8">
        <AdminPanel
          dogs={dogs}
          onSave={updateCounts}
          onReset={reset}
          onBack={() => setAuthed(false)}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200">
      {/* 背景裝飾：飄動的掌印 */}
      <BackgroundPaws />

      {/* 後台管理按鈕（右上角，低調精緻） */}
      <button
        onClick={() => setShowPassword(true)}
        className="fixed right-4 top-4 z-30 flex items-center gap-2 rounded-full border border-earth-500/20 bg-white/70 px-4 py-2 text-sm font-medium text-earth-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-earth-700 hover:shadow-md"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">後台管理</span>
      </button>

      {/* 主內容 */}
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-10 sm:py-14">
        {/* 標題區 */}
        <header className="text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-grass-500/10 px-4 py-1 text-sm font-medium text-grass-600">
            <PawPrint className="h-4 w-4" />
            清大關懷生命社 · 懷生週活動
          </div>
          <h1 className="font-display text-3xl text-carrot-600 sm:text-5xl">
            🐾 懷生週校狗大頭貼拉霸機 🐾
          </h1>
          <p className="mt-3 flex items-center justify-center gap-1.5 max-w-xl text-sm text-earth-600 sm:text-base">
            －－ 一抽二十塊 阿梅胸背帶 －－
            <img src="/logo.png" alt="logo" className="h-20 w-20 object-contain inline-block" />
          </p>
        </header>

        {/* 拉霸機 */}
        <SlotMachine dogs={dogs} onWin={handleWin} />

        {/* 剩餘用盡提示 */}
        {total <= 0 && (
          <div className="animate-pop-in rounded-2xl border-2 border-carrot-500 bg-carrot-500/10 px-6 py-4 text-center font-bold text-carrot-600">
            🎉 所有大頭貼已被抽完囉！感謝大家的參與～
          </div>
        )}

        {/* 即時剩餘看板 */}
        <div className="w-full">
          <InventoryBoard dogs={dogs} highlightId={highlightId} />
        </div>

        {/* 頁尾 */}
        <footer className="mt-4 text-center text-xs text-earth-500">
          <p>清華大學關懷生命社 · 懷生週 2026</p>
          <p className="mt-1">關心校園動物，以領養代替購買 🐾</p>
        </footer>
      </main>

      {/* 抽中彈窗 */}
      {winner && (
        <WinnerModal
          dog={dogs.find((d) => d.id === winner.id) ?? winner}
          remainingAfterDraw={dogs.find((d) => d.id === winner.id)?.count ?? 0}
          onClose={handleCloseModal}
        />
      )}

      {/* 密碼驗證彈窗 */}
      {showPassword && (
        <PasswordModal
          onSuccess={() => {
            setAuthed(true);
            setShowPassword(false);
          }}
          onCancel={() => setShowPassword(false)}
        />
      )}
    </div>
  );
}

/** 背景飄動的掌印裝飾 */
function BackgroundPaws() {
  const spots = [
    { top: '8%', left: '6%', size: 28, delay: '0s' },
    { top: '22%', left: '88%', size: 22, delay: '1.2s' },
    { top: '55%', left: '4%', size: 24, delay: '0.6s' },
    { top: '70%', left: '92%', size: 30, delay: '2s' },
    { top: '40%', left: '50%', size: 18, delay: '1.8s' },
    { top: '85%', left: '40%', size: 26, delay: '0.3s' },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {spots.map((s, i) => (
        <PawPrint
          key={i}
          className="paw-drift absolute text-carrot-500/15"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default App;
