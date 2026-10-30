import { useState } from 'react';
import { DogImage } from './DogImage';
import { probability, totalRemaining } from '@/hooks/useDogs';
import { type Dog } from '@/types';
import { Lock, AlertCircle, Save, RotateCcw, ArrowLeft, CheckCircle2 } from 'lucide-react';

type Props = {
  dogs: Dog[];
  onSave: (updates: { id: number; count: number }[]) => void;
  onReset: () => void;
  onBack: () => void;
};

/** 後台管理介面：編輯庫存、顯示中獎機率、重置庫存。 */
export function AdminPanel({ dogs, onSave, onReset, onBack }: Props) {
  const [draft, setDraft] = useState<Record<number, string>>(
    () => Object.fromEntries(dogs.map((d) => [d.id, String(d.count)]))
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const updates = dogs.map((d) => ({
      id: d.id,
      count: Math.max(0, parseInt(draft[d.id] ?? '0', 10) || 0),
    }));
    onSave(updates);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const fresh = Object.fromEntries(dogs.map((d) => [d.id, '16']));
    setDraft(fresh);
    onReset();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-earth-500/20 bg-white/90 p-6 shadow-xl backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-2xl text-earth-700">🛠️ 後台庫存管理</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-earth-500/30 px-4 py-2 text-sm font-medium text-earth-700 transition hover:bg-earth-500/10"
        >
          <ArrowLeft className="h-4 w-4" />
          返回抽獎頁面
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-earth-500/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-200 text-earth-700">
            <tr>
              <th className="px-4 py-3 font-bold">大頭貼</th>
              <th className="px-4 py-3 font-bold">狗名</th>
              <th className="px-4 py-3 font-bold">剩餘數量</th>
              <th className="px-4 py-3 font-bold">中獎機率</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-500/10 bg-white">
            {dogs.map((d) => {
              const prob = probability(d, dogs);
              const val = draft[d.id] ?? '0';
              return (
                <tr key={d.id} className="transition hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <DogImage
                      dogName={d.name}
                      src={d.image}
                      slice="center"
                      className="h-12 w-12 overflow-hidden rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 font-bold text-earth-700">{d.name}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      value={val}
                      onChange={(e) => setDraft((p) => ({ ...p, [d.id]: e.target.value }))}
                      className="w-20 rounded-lg border border-earth-500/30 px-2 py-1 text-center font-medium focus:border-carrot-500 focus:outline-none focus:ring-2 focus:ring-carrot-400/30"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-display ${prob > 0 ? 'text-carrot-600' : 'text-gray-400'}`}>
                      {prob.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-grass-400 to-grass-500 px-6 py-2.5 font-bold text-earth-900 shadow-md transition hover:scale-105 active:scale-95"
        >
          <Save className="h-4 w-4" />
          儲存更新
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-full border-2 border-carrot-500 bg-white px-6 py-2.5 font-bold text-carrot-600 transition hover:bg-carrot-500/10 active:scale-95"
        >
          <RotateCcw className="h-4 w-4" />
          一鍵重置庫存（每隻 16 份）
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-grass-600 animate-pop-in">
            <CheckCircle2 className="h-4 w-4" />
            已更新！
          </span>
        )}
        <span className="ml-auto text-xs text-earth-500">
          目前總剩餘 {totalRemaining(dogs)} 份
        </span>
      </div>
    </div>
  );
}

/** 密碼驗證彈窗。通關 Key：nunu */
export function PasswordModal({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === 'nunu') {
      onSuccess();
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm" onClick={onCancel} />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm animate-pop-in rounded-3xl border-4 border-carrot-500 bg-gradient-to-b from-cream-50 to-cream-200 p-6 text-center shadow-2xl"
      >
        <div className="mb-3 text-4xl">🔐</div>
        <h2 className="mb-1 font-display text-xl text-earth-700">後台管理登入</h2>
        <p className="mb-4 text-sm text-earth-500">
          提示：全部小寫，好像是一個醫療站的垂耳狗
        </p>
        <div className="relative mb-3">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400" />
          <input
            type="password"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            placeholder="請輸入通關密碼"
            className={`w-full rounded-full border-2 px-10 py-2.5 text-center font-medium transition focus:outline-none
              ${error ? 'border-red-500 bg-red-50 animate-pop-in' : 'border-earth-500/30 focus:border-carrot-500 focus:ring-2 focus:ring-carrot-400/30'}
            `}
          />
        </div>
        {error && (
          <p className="mb-3 flex items-center justify-center gap-1.5 text-sm font-medium text-red-500">
            <AlertCircle className="h-4 w-4" />
            密碼錯誤，請再試一次！
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-earth-500/30 px-4 py-2 text-sm font-medium text-earth-600 transition hover:bg-earth-500/10"
          >
            取消
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-gradient-to-r from-grass-400 to-grass-500 px-4 py-2 text-sm font-bold text-earth-900 shadow-md transition hover:scale-105 active:scale-95"
          >
            進入
          </button>
        </div>
      </form>
    </div>
  );
}
