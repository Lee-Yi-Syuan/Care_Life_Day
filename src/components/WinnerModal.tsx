import { DogImage } from './DogImage';
import type { Dog } from '@/types';
import { X, Gift, RefreshCw } from 'lucide-react';

type Props = {
  dog: Dog;
  remainingAfterDraw: number;
  onClose: () => void;
  onDrawAgain: () => void;
};

/** 抽中結果彈窗 */
export function WinnerModal({ dog, remainingAfterDraw, onClose, onDrawAgain }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* 彈窗本體 */}
      <div className="relative w-full max-w-md animate-pop-in rounded-3xl border-4 border-carrot-500 bg-gradient-to-b from-cream-50 to-cream-200 p-6 shadow-2xl">
        {/* 撒花裝飾 */}
        <Confetti />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-earth-500 transition hover:bg-earth-500/10 hover:text-earth-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 標題 */}
        <div className="mb-4 text-center">
          <div className="mb-1 text-5xl">🎉</div>
          <h2 className="font-display text-2xl text-carrot-600">
            恭喜抽中
          </h2>
          <p className="mt-1 text-xl font-bold text-earth-700">
            【{dog.name}】的大頭貼！
          </p>
        </div>

        {/* 完整照片 */}
        <div className="relative mx-auto mb-4 h-56 w-56 overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-2 ring-carrot-400/50">
          <DogImage
            dogName={dog.name}
            src={dog.image}
            full
            className="h-full w-full"
          />
        </div>

        {/* 剩餘提示 */}
        <p className="mb-5 text-center text-sm text-earth-700">
          這隻狗還剩下&nbsp;
          <span className="font-display text-lg text-carrot-600">{remainingAfterDraw}</span>
          &nbsp;份大頭貼
        </p>

        {/* 按鈕 */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-grass-500 to-grass-600 px-6 py-3 font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
          >
            <Gift className="h-5 w-5" />
            收下大頭貼
          </button>
          <button
            onClick={onDrawAgain}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-carrot-500 bg-white px-6 py-3 font-bold text-carrot-600 transition hover:bg-carrot-500/10 active:scale-95"
          >
            <RefreshCw className="h-5 w-5" />
            再次抽獎
          </button>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 14 });
  const colors = ['bg-carrot-400', 'bg-grass-400', 'bg-paw-pink', 'bg-cream-300', 'bg-yellow-300'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {pieces.map((_, i) => (
        <span
          key={i}
          className={`absolute top-0 h-2 w-2 rounded-sm ${colors[i % colors.length]} animate-confetti-fade`}
          style={{
            left: `${5 + i * 6.8}%`,
            animationDelay: `${(i % 5) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
