import { useState } from 'react';

type Props = {
  dogName: string;
  src: string;
  slice?: 'left' | 'center' | 'right';
  full?: boolean;
  className?: string;
  imgClassName?: string;
};

const POS: Record<string, string> = {
  left: 'object-left',
  center: 'object-center',
  right: 'object-right',
};

/** 顯示狗狗照片，支援左/中/右切片。載入失敗時 fallback 為乾淨占位圖（顯示狗名）。 */
export function DogImage({ dogName, src, slice = 'center', full = false, className = '', imgClassName = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300 text-earth-700 ${className}`}>
        <div className="flex flex-col items-center gap-1 px-2 text-center">
          <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
          <span className="text-sm font-bold leading-tight">{dogName}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={dogName}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${full ? 'object-center' : POS[slice]} ${imgClassName}`}
      />
    </div>
  );
}
