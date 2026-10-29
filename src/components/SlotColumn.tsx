import { useMemo } from 'react';
import { DogImage } from './DogImage';
import type { Dog } from '@/types';

export type Slice = 'left' | 'center' | 'right';

type Props = {
  dogs: Dog[];
  winner: Dog | null;
  slice: Slice;
  spinning: boolean;
  /** true = 該欄已停止；false = 該欄仍在轉動 */
  stopped: boolean;
  className?: string;
};

const ITEM_HEIGHT = 110; // 單格高度 (px)

/** 產生滾動時的隨機狗狗序列 */
function getShuffledPool(dogs: Dog[]): Dog[] {
  const pool = dogs.filter((d) => d.count > 0);
  const base = pool.length > 0 ? pool : dogs;
  const out = [...base];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function SlotColumn({
  dogs,
  winner,
  slice,
  spinning,
  stopped,
  className = '',
}: Props) {
  // 固定滾動序列，滾動中途不重新洗牌避免畫面閃爍
  const displayList = useMemo(() => {
    if (!winner && !spinning) {
      // 初始靜態狀態：只顯示一隻預設狗狗（例如第一隻）
      return dogs.slice(0, 1);
    }
    const pool = getShuffledPool(dogs);
    // 構造長滾輪序列：多次重複，最底下以抽中的 winner 收尾
    const repeated = [...pool, ...pool, ...pool];
    return winner ? [...repeated, winner] : repeated;
  }, [dogs, winner, spinning]);

  // 目標索引：停止時停在最後一個（即 winner）
  const targetIndex = Math.max(0, displayList.length - 1);

  // 計算位移：
  // 1. 轉動中且尚未停止：保持向上偏移循環捲動
  // 2. 該欄已停止 (stopped === true)：滑到最底部的 winner
  // 3. 初始狀態：在頂部 0px
  const translateY = !spinning && stopped && !winner
    ? 0
    : stopped && winner
    ? -(targetIndex * ITEM_HEIGHT)
    : 0;

  return (
    <div
      className={`relative h-[110px] w-[110px] overflow-hidden rounded-2xl bg-cream-100 ring-2 ring-earth-500/30 ${className}`}
    >
      <div
        className={`flex flex-col items-center will-change-transform ${
          !stopped
            ? 'animate-slot-fast' // 還沒停的時候快速狂轉
            : 'transition-transform duration-700 cubic-bezier(0.15, 0.9, 0.25, 1)' // 停止時平滑減速定格
        }`}
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
      >
        {displayList.map((d, idx) => (
          <DogImage
            key={`${d.id}-${idx}`}
            dogName={d.name}
            src={d.image}
            slice={slice}
            className="h-[110px] w-[110px] shrink-0"
          />
        ))}
      </div>

      {/* 轉動中的動態模糊與反光遮罩 */}
      {!stopped && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 backdrop-blur-[0.5px]" />
      )}
    </div>
  );
}