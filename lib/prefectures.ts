export type Prefecture = {
  id: string;
  nameKo: string;
  nameJa: string;
  nameEn: string;
  region: string;
};

export const PREFECTURES: Prefecture[] = [
  { id: "hokkaido", nameKo: "홋카이도", nameJa: "北海道", nameEn: "Hokkaido", region: "홋카이도" },
  { id: "aomori", nameKo: "아오모리", nameJa: "青森県", nameEn: "Aomori", region: "도호쿠" },
  { id: "iwate", nameKo: "이와테", nameJa: "岩手県", nameEn: "Iwate", region: "도호쿠" },
  { id: "miyagi", nameKo: "미야기", nameJa: "宮城県", nameEn: "Miyagi", region: "도호쿠" },
  { id: "akita", nameKo: "아키타", nameJa: "秋田県", nameEn: "Akita", region: "도호쿠" },
  { id: "yamagata", nameKo: "야마가타", nameJa: "山形県", nameEn: "Yamagata", region: "도호쿠" },
  { id: "fukushima", nameKo: "후쿠시마", nameJa: "福島県", nameEn: "Fukushima", region: "도호쿠" },
  { id: "ibaraki", nameKo: "이바라키", nameJa: "茨城県", nameEn: "Ibaraki", region: "간토" },
  { id: "tochigi", nameKo: "도치기", nameJa: "栃木県", nameEn: "Tochigi", region: "간토" },
  { id: "gunma", nameKo: "군마", nameJa: "群馬県", nameEn: "Gunma", region: "간토" },
  { id: "saitama", nameKo: "사이타마", nameJa: "埼玉県", nameEn: "Saitama", region: "간토" },
  { id: "chiba", nameKo: "치바", nameJa: "千葉県", nameEn: "Chiba", region: "간토" },
  { id: "tokyo", nameKo: "도쿄", nameJa: "東京都", nameEn: "Tokyo", region: "간토" },
  { id: "kanagawa", nameKo: "가나가와", nameJa: "神奈川県", nameEn: "Kanagawa", region: "간토" },
  { id: "niigata", nameKo: "니가타", nameJa: "新潟県", nameEn: "Niigata", region: "주부" },
  { id: "toyama", nameKo: "도야마", nameJa: "富山県", nameEn: "Toyama", region: "주부" },
  { id: "ishikawa", nameKo: "이시카와", nameJa: "石川県", nameEn: "Ishikawa", region: "주부" },
  { id: "fukui", nameKo: "후쿠이", nameJa: "福井県", nameEn: "Fukui", region: "주부" },
  { id: "yamanashi", nameKo: "야마나시", nameJa: "山梨県", nameEn: "Yamanashi", region: "주부" },
  { id: "nagano", nameKo: "나가노", nameJa: "長野県", nameEn: "Nagano", region: "주부" },
  { id: "gifu", nameKo: "기후", nameJa: "岐阜県", nameEn: "Gifu", region: "주부" },
  { id: "shizuoka", nameKo: "시즈오카", nameJa: "静岡県", nameEn: "Shizuoka", region: "주부" },
  { id: "aichi", nameKo: "아이치", nameJa: "愛知県", nameEn: "Aichi", region: "주부" },
  { id: "mie", nameKo: "미에", nameJa: "三重県", nameEn: "Mie", region: "간사이" },
  { id: "shiga", nameKo: "시가", nameJa: "滋賀県", nameEn: "Shiga", region: "간사이" },
  { id: "kyoto", nameKo: "교토", nameJa: "京都府", nameEn: "Kyoto", region: "간사이" },
  { id: "osaka", nameKo: "오사카", nameJa: "大阪府", nameEn: "Osaka", region: "간사이" },
  { id: "hyogo", nameKo: "효고", nameJa: "兵庫県", nameEn: "Hyogo", region: "간사이" },
  { id: "nara", nameKo: "나라", nameJa: "奈良県", nameEn: "Nara", region: "간사이" },
  { id: "wakayama", nameKo: "와카야마", nameJa: "和歌山県", nameEn: "Wakayama", region: "간사이" },
  { id: "tottori", nameKo: "돗토리", nameJa: "鳥取県", nameEn: "Tottori", region: "주고쿠" },
  { id: "shimane", nameKo: "시마네", nameJa: "島根県", nameEn: "Shimane", region: "주고쿠" },
  { id: "okayama", nameKo: "오카야마", nameJa: "岡山県", nameEn: "Okayama", region: "주고쿠" },
  { id: "hiroshima", nameKo: "히로시마", nameJa: "広島県", nameEn: "Hiroshima", region: "주고쿠" },
  { id: "yamaguchi", nameKo: "야마구치", nameJa: "山口県", nameEn: "Yamaguchi", region: "주고쿠" },
  { id: "tokushima", nameKo: "도쿠시마", nameJa: "徳島県", nameEn: "Tokushima", region: "시코쿠" },
  { id: "kagawa", nameKo: "가가와", nameJa: "香川県", nameEn: "Kagawa", region: "시코쿠" },
  { id: "ehime", nameKo: "에히메", nameJa: "愛媛県", nameEn: "Ehime", region: "시코쿠" },
  { id: "kochi", nameKo: "고치", nameJa: "高知県", nameEn: "Kochi", region: "시코쿠" },
  { id: "fukuoka", nameKo: "후쿠오카", nameJa: "福岡県", nameEn: "Fukuoka", region: "규슈" },
  { id: "saga", nameKo: "사가", nameJa: "佐賀県", nameEn: "Saga", region: "규슈" },
  { id: "nagasaki", nameKo: "나가사키", nameJa: "長崎県", nameEn: "Nagasaki", region: "규슈" },
  { id: "kumamoto", nameKo: "구마모토", nameJa: "熊本県", nameEn: "Kumamoto", region: "규슈" },
  { id: "oita", nameKo: "오이타", nameJa: "大分県", nameEn: "Oita", region: "규슈" },
  { id: "miyazaki", nameKo: "미야자키", nameJa: "宮崎県", nameEn: "Miyazaki", region: "규슈" },
  { id: "kagoshima", nameKo: "가고시마", nameJa: "鹿児島県", nameEn: "Kagoshima", region: "규슈" },
  { id: "okinawa", nameKo: "오키나와", nameJa: "沖縄県", nameEn: "Okinawa", region: "오키나와" },
];

export function findPrefecture(id: string) {
  return PREFECTURES.find((item) => item.id === id);
}

export function matchesSearch(values: string[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  return values.some((value) => value.toLowerCase().includes(lower) || value.includes(trimmed));
}
