import { useCallback, useEffect, useRef, useState } from 'react';
import { SlotColumn, type Slice } from './SlotColumn';
import { weightedPick, totalRemaining } from '@/hooks/useDogs';
import { type Dog } from '@/types';
import { Sparkles, Loader2 } from 'lucide-react';

type Props = {
  dogs: Dog[];
  onWin: (dog: Dog) => void;
};

export function SlotMachine({ dogs, onWin }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Dog | null>(null);
  // 每欄是否已停止
  const [colStopped, setColStopped] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const timers = useRef<number[]>([]);

  const total = totalRemaining(dogs);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handleDraw = useCallback(() => {
    if (spinning) return;
    const picked = weightedPick(dogs);
    if (!picked) return;

    clearTimers();
    setWinner(picked);
    setSpinning(true);
    setColStopped([false, false, false]);

    // 依序停止：第 1 欄先停，第 2 欄間隔 0.4s，第 3 欄再 0.4s
    const t1 = window.setTimeout(() => setColStopped((s) => [true, s[1], s[2]]), 1100);
    const t2 = window.setTimeout(() => setColStopped((s) => [s[0], true, s[2]]), 1500);
    const t3 = window.setTimeout(() => setColStopped((s) => [s[0], s[1], true]), 1900);
    // 全部停止後延遲 0.3s 觸發 onWin
    const t4 = window.setTimeout(() => {
      setSpinning(false);
      onWin(picked);
    }, 2200);
    timers.current = [t1, t2, t3, t4];
  }, [dogs, spinning, onWin, clearTimers]);

  const slices: Slice[] = ['left', 'center', 'right'];
  const allStopped = colStopped[0] && colStopped[1] && colStopped[2];
  const disabled = spinning || total <= 0;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 拉霸機視窗外框 */}
      <div className="relative rounded-[2rem] border-4 border-carrot-500 bg-gradient-to-b from-cream-200 to-cream-100 p-5 shadow-[0_18px_40px_-12px_rgba(93,74,51,0.5)] sm:p-6">
        {/* 裝飾燈泡 */}
        <Bulbs active={spinning} />
        {/* 三欄視窗 */}
        <div className="relative rounded-2xl bg-earth-900/90 p-3 shadow-inner">
          <div className="flex gap-2">
            {slices.map((s, i) => (
              <SlotColumn
                key={i}
                dogs={dogs}
                winner={winner}
                slice={s}
                spinning={spinning}
                stopped={colStopped[i]}
              />
            ))}
          </div>
          {/* 中央分隔光暈 */}
          <div className="pointer-events-none absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-carrot-400/20" />
        </div>
        {/* 剩餘總數顯示 */}
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-earth-700">
          <Sparkles className="h-4 w-4 text-carrot-500" />
          <span>剩餘總份數：<b className="text-carrot-600">{total}</b> 份</span>
        </div>
      </div>

      {/* 抽獎按鈕 */}
      <button
        onClick={handleDraw}
        disabled={disabled}
        className={`group relative flex items-center gap-3 rounded-full px-10 py-4 text-lg font-display tracking-wider transition-all duration-300
          ${disabled
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-gradient-to-r from-carrot-500 to-carrot-600 text-white shadow-[0_10px_25px_-6px_rgba(217,100,26,0.6)] hover:scale-105 hover:shadow-[0_14px_30px_-6px_rgba(217,100,26,0.7)] active:scale-95'}
        `}
      >
        {spinning ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>抽獎中...</span>
          </>
        ) : total <= 0 ? (
          <span>🐾 全部抽完囉！</span>
        ) : (
          <span className="text-stroke-warm">🐾 點擊抽獎 🐾</span>
        )}
      </button>
    </div>
  );
}

function Bulbs({ active }: { active: boolean }) {
  const colors = ['bg-carrot-400', 'bg-grass-400', 'bg-paw-pink', 'bg-cream-300'];
  return (
    <div className="pointer-events-none absolute -inset-1 flex flex-wrap justify-around gap-1 opacity-70">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${colors[i % colors.length]} ${active ? 'animate-pulse' : ''}`}
        />
      ))}
    </div>
  );
}
