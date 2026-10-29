import { useEffect, useState } from 'react';
import { DogImage } from './DogImage';
import { totalRemaining } from '@/hooks/useDogs';
import { type Dog } from '@/types';

type Props = {
  dogs: Dog[];
  /** 剛被抽中的狗 id，用來高亮 */
  highlightId?: number | null;
};

/** 即時剩餘看板：列出 10 隻狗名稱與目前剩餘份數，0 份顯示灰階 + SOLD OUT。 */
export function InventoryBoard({ dogs, highlightId }: Props) {
  const total = totalRemaining(dogs);

  return (
    <div className="rounded-3xl border border-earth-500/20 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl text-earth-700 flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6 w-6 object-contain inline-block" />
          剩餘大頭貼即時看板
        </h3>
        <span className="rounded-full bg-carrot-500/10 px-3 py-1 text-sm font-bold text-carrot-600">
          合計 {total} 份
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {dogs.map((d) => (
          <DogCard key={d.id} dog={d} highlighted={d.id === highlightId} />
        ))}
      </div>
    </div>
  );
}

function DogCard({ dog, highlighted }: { dog: Dog; highlighted: boolean }) {
  const soldOut = dog.count <= 0;
  const [bump, setBump] = useState(false);
  const [prevCount, setPrevCount] = useState(dog.count);

  useEffect(() => {
    if (dog.count !== prevCount) {
      setBump(true);
      setPrevCount(dog.count);
      const t = setTimeout(() => setBump(false), 450);
      return () => clearTimeout(t);
    }
  }, [dog.count, prevCount]);

  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all duration-300
        ${soldOut
          ? 'border-gray-200 bg-gray-50 opacity-50 grayscale'
          : highlighted
          ? 'border-carrot-500 bg-carrot-500/10 ring-2 ring-carrot-400/60'
          : 'border-earth-500/15 bg-cream-50 hover:border-carrot-400/50 hover:shadow-md'}
      `}
    >
      <DogImage
        dogName={dog.name}
        src={dog.image}
        slice="center"
        className="h-14 w-14 overflow-hidden rounded-xl"
      />
      <div className="text-center">
        <div className={`text-sm font-bold ${soldOut ? 'text-gray-400' : 'text-earth-700'}`}>{dog.name}</div>
        <div className={`text-xs font-medium ${soldOut ? 'text-gray-400' : 'text-earth-500'}`}>
          剩餘&nbsp;
          <span className={`inline-block font-display text-base ${bump ? 'animate-count-bump' : ''} ${soldOut ? 'text-gray-400' : 'text-carrot-600'}`}>
            {dog.count}
          </span>
          &nbsp;份
        </div>
      </div>
      {soldOut && (
        <span className="absolute -top-1 -right-1 rounded-full bg-gray-400 px-2 py-0.5 text-[10px] font-bold text-white shadow">
          SOLD OUT
        </span>
      )}
    </div>
  );
}
