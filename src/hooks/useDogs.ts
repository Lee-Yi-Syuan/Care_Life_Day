import { useCallback, useEffect, useState } from 'react';
import { buildInitialDogs, INITIAL_COUNT, type Dog } from '@/types';

const STORAGE_KEY = 'huai-sheng-dogs-v1';

function loadDogs(): Dog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialDogs();
    const parsed = JSON.parse(raw) as Dog[];
    if (!Array.isArray(parsed) || parsed.length === 0) return buildInitialDogs();
    return parsed;
  } catch {
    return buildInitialDogs();
  }
}

export function useDogs() {
  const [dogs, setDogs] = useState<Dog[]>(loadDogs);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dogs));
    } catch {
      /* ignore quota errors */
    }
  }, [dogs]);

  const decrement = useCallback((id: number) => {
    setDogs((prev) =>
      prev.map((d) => (d.id === id && d.count > 0 ? { ...d, count: d.count - 1 } : d))
    );
  }, []);

  const updateCounts = useCallback((updates: { id: number; count: number }[]) => {
    setDogs((prev) =>
      prev.map((d) => {
        const u = updates.find((x) => x.id === d.id);
        return u ? { ...d, count: Math.max(0, Math.floor(u.count)) } : d;
      })
    );
  }, []);

  const reset = useCallback(() => {
    setDogs(buildInitialDogs());
  }, []);

  return { dogs, decrement, updateCounts, reset, INITIAL_COUNT };
}

/** 加權隨機抽獎：機率 = 該狗剩餘數量 / 總剩餘數量 */
export function weightedPick(dogs: Dog[]): Dog | null {
  const pool = dogs.filter((d) => d.count > 0);
  const total = pool.reduce((s, d) => s + d.count, 0);
  if (total <= 0 || pool.length === 0) return null;
  let r = Math.random() * total;
  for (const d of pool) {
    r -= d.count;
    if (r < 0) return d;
  }
  return pool[pool.length - 1];
}

export function totalRemaining(dogs: Dog[]): number {
  return dogs.reduce((s, d) => s + d.count, 0);
}

export function probability(dog: Dog, dogs: Dog[]): number {
  const t = totalRemaining(dogs);
  if (t <= 0 || dog.count <= 0) return 0;
  return (dog.count / t) * 100;
}
