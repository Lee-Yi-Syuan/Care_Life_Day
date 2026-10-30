import { useEffect, useRef, useState } from 'react';

export const SOUNDS = {
  bgm: '/audio/bgm.mp3',
  spin: '/audio/spin.mp3',
  win: '/audio/win.mp3',
} as const;

/** 播放一次性音效（抽獎中、抽中）。檔案缺失或瀏覽器阻擋時靜默略過。 */
export function playSound(src: string, volume = 1) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}

/** 循環背景音樂。瀏覽器需要使用者先互動（點擊或按鍵）才會開始播放。 */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(SOUNDS.bgm);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const start = () => {
      audioRef.current?.play().catch(() => {});
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  return { muted, toggleMuted: () => setMuted((m) => !m) };
}
