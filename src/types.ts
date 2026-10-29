export type Dog = {
  id: number;
  name: string;
  count: number;
  image: string;
};

export const DOG_NAMES = [
  '巧巧',
  '牛排',
  '白居易',
  '梅太郎',
  '努努',
  '黑糖',
  '粉圓',
  '焦糖',
  '小愛',
  '小熊',
] as const;

export const INITIAL_COUNT = 10;
// 圖片放置位置：請將 10 張狗狗照片放在 public/dogs/ 目錄下，
// 檔名須與上方狗名完全相同，副檔名為 .jpg，例如 public/dogs/努努.jpg
export const IMG_EXT = 'jpg';

export function buildInitialDogs(): Dog[] {
  return DOG_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    count: INITIAL_COUNT,
    image: `/dogs/${name}.${IMG_EXT}`,
  }));
}
