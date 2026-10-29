import { useEffect, useRef } from 'react';
import { DogImage } from './DogImage';
import type { Dog } from '@/types';

export type Slice = 'left' | 'center' | 'right';

type Props = {
  dogs: Dog[];
  winner: Dog | null;
  slice: Slice;
  spinning: boolean;
  /** true = 仍在滾動；false = 已定格顯示 winner */
  stopped: boolean;
  className?: string;
};

/** 產生滾動時的隨機片段序列（排除 count=0 的狗）。 */
function shuffledDogs(dogs: Dog[]): Dog[] {
  const pool = dogs.filter((d) => d.count > 0);
  if (pool.length === 0) return dogs;
  const out = [...pool];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function SlotColumn({ dogs, winner, slice, spinning, stopped, className = '' }: Props) {
  const reelRef = useRef<HTMLDivElement>(null);

  // 當 spinning 為 true 時，加入滾動動畫；停止時移除並定位到 winner。
  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;
    if (spinning) {
      el.classList.add('reel-spinning');
      el.classList.remove('reel-settled');
    } else {
      el.classList.remove('reel-spinning');
      el.classList.add('reel-settled');
    }
  }, [spinning]);

  const spinDogs = shuffledDogs(dogs);
  // 滾動時顯示多份重複序列以營造連續滾動感
  const reelItems = spinning ? [...spinDogs, ...spinDogs, ...spinDogs] : [winner].filter(Boolean) as Dog[];

  return (
    <div className={`relative h-[110px] w-[110px] overflow-hidden rounded-2xl bg-cream-100 ring-2 ring-earth-500/30 ${className}`}>
      <div ref={reelRef} className="flex flex-col items-center">
        {reelItems.length === 0 ? (
          <div className="flex h-[110px] w-[110px] items-center justify-center text-earth-700/50">—</div>
        ) : (
          reelItems.map((d, idx) => (
            <DogImage
              key={`${d.id}-${idx}`}
              dogName={d.name}
              src={d.image}
              slice={slice}
              className="h-[110px] w-[110px] shrink-0"
            />
          ))
        )}
      </div>
      {!stopped && spinning && (
        <div className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
      )}
    </div>
  );
}
