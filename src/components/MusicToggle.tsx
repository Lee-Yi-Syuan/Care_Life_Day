import { Volume2, VolumeX } from 'lucide-react';

type Props = {
  muted: boolean;
  onToggle: () => void;
};

/** 背景音樂開關按鈕 */
export function MusicToggle({ muted, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={muted ? '開啟背景音樂' : '靜音背景音樂'}
      className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-grass-500/20 bg-white/70 text-grass-600 shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white hover:shadow-md active:scale-95"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}
