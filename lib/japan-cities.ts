export type JapanCity = {
  id: string;
  prefectureId: string;
  nameKo: string;
  nameJa: string;
  nameEn: string;
  lat: number;
  lon: number;
};

export const JAPAN_CITIES: JapanCity[] = [
  { id: "sapporo", prefectureId: "hokkaido", nameKo: "삿포로", nameJa: "札幌市", nameEn: "Sapporo", lat: 43.0618, lon: 141.3545 },
  { id: "asahikawa", prefectureId: "hokkaido", nameKo: "아사히카와", nameJa: "旭川市", nameEn: "Asahikawa", lat: 43.7706, lon: 142.365 },
  { id: "hakodate", prefectureId: "hokkaido", nameKo: "하코다테", nameJa: "函館市", nameEn: "Hakodate", lat: 41.7688, lon: 140.7289 },
  { id: "otaru", prefectureId: "hokkaido", nameKo: "오타루", nameJa: "小樽市", nameEn: "Otaru", lat: 43.1907, lon: 141.0022 },
  { id: "kushiro", prefectureId: "hokkaido", nameKo: "구시로", nameJa: "釧路市", nameEn: "Kushiro", lat: 42.9849, lon: 144.3817 },
  { id: "obihiro", prefectureId: "hokkaido", nameKo: "오비히로", nameJa: "帯広市", nameEn: "Obihiro", lat: 42.9239, lon: 143.1969 },
  { id: "tomakomai", prefectureId: "hokkaido", nameKo: "도마코마이", nameJa: "苫小牧市", nameEn: "Tomakomai", lat: 42.6369, lon: 141.6033 },
  { id: "chitose", prefectureId: "hokkaido", nameKo: "치토세", nameJa: "千歳市", nameEn: "Chitose", lat: 42.8211, lon: 141.6511 },
  { id: "furano", prefectureId: "hokkaido", nameKo: "후라노", nameJa: "富良野市", nameEn: "Furano", lat: 43.342, lon: 142.3832 },
  { id: "niseko", prefectureId: "hokkaido", nameKo: "니세코", nameJa: "ニセコ町", nameEn: "Niseko", lat: 42.8048, lon: 140.6874 },

  { id: "aomori-city", prefectureId: "aomori", nameKo: "아오모리시", nameJa: "青森市", nameEn: "Aomori", lat: 40.8222, lon: 140.7474 },
  { id: "hirosaki", prefectureId: "aomori", nameKo: "히로사키", nameJa: "弘前市", nameEn: "Hirosaki", lat: 40.6031, lon: 140.4642 },
  { id: "hachinohe", prefectureId: "aomori", nameKo: "하치노헤", nameJa: "八戸市", nameEn: "Hachinohe", lat: 40.5123, lon: 141.4884 },
  { id: "towada", prefectureId: "aomori", nameKo: "도와다", nameJa: "十和田市", nameEn: "Towada", lat: 40.6127, lon: 141.2056 },

  { id: "morioka", prefectureId: "iwate", nameKo: "모리오카", nameJa: "盛岡市", nameEn: "Morioka", lat: 39.7036, lon: 141.1527 },
  { id: "hiraizumi", prefectureId: "iwate", nameKo: "히라이즈미", nameJa: "平泉町", nameEn: "Hiraizumi", lat: 38.9869, lon: 141.1136 },
  { id: "miyako", prefectureId: "iwate", nameKo: "미야코", nameJa: "宮古市", nameEn: "Miyako", lat: 39.6414, lon: 141.9461 },
  { id: "ichinoseki", prefectureId: "iwate", nameKo: "이치노세키", nameJa: "一関市", nameEn: "Ichinoseki", lat: 38.9347, lon: 141.1266 },

  { id: "sendai", prefectureId: "miyagi", nameKo: "센다이", nameJa: "仙台市", nameEn: "Sendai", lat: 38.2682, lon: 140.8694 },
  { id: "ishinomaki", prefectureId: "miyagi", nameKo: "이시노마키", nameJa: "石巻市", nameEn: "Ishinomaki", lat: 38.4345, lon: 141.3029 },
  { id: "matsushima", prefectureId: "miyagi", nameKo: "마쓰시마", nameJa: "松島町", nameEn: "Matsushima", lat: 38.3803, lon: 141.0675 },
  { id: "shiogama", prefectureId: "miyagi", nameKo: "시오가마", nameJa: "塩竈市", nameEn: "Shiogama", lat: 38.3144, lon: 141.022 },

  { id: "akita-city", prefectureId: "akita", nameKo: "아키타시", nameJa: "秋田市", nameEn: "Akita", lat: 39.7186, lon: 140.1024 },
  { id: "kakunodate", prefectureId: "akita", nameKo: "가쿠노다테", nameJa: "角館", nameEn: "Kakunodate", lat: 39.5994, lon: 140.5614 },
  { id: "noshiro", prefectureId: "akita", nameKo: "노시로", nameJa: "能代市", nameEn: "Noshiro", lat: 40.212, lon: 140.0264 },

  { id: "yamagata-city", prefectureId: "yamagata", nameKo: "야마가타시", nameJa: "山形市", nameEn: "Yamagata", lat: 38.2554, lon: 140.3396 },
  { id: "yonezawa", prefectureId: "yamagata", nameKo: "요네자와", nameJa: "米沢市", nameEn: "Yonezawa", lat: 37.9222, lon: 140.1166 },
  { id: "tsuruoka", prefectureId: "yamagata", nameKo: "쓰루오카", nameJa: "鶴岡市", nameEn: "Tsuruoka", lat: 38.7273, lon: 139.8267 },
  { id: "zao", prefectureId: "yamagata", nameKo: "자오", nameJa: "蔵王", nameEn: "Zao", lat: 38.1667, lon: 140.4 },

  { id: "fukushima-city", prefectureId: "fukushima", nameKo: "후쿠시마시", nameJa: "福島市", nameEn: "Fukushima", lat: 37.7608, lon: 140.4733 },
  { id: "aizuwakamatsu", prefectureId: "fukushima", nameKo: "아이즈와카마쓰", nameJa: "会津若松市", nameEn: "Aizuwakamatsu", lat: 37.4948, lon: 139.9298 },
  { id: "koriyama", prefectureId: "fukushima", nameKo: "고리야마", nameJa: "郡山市", nameEn: "Koriyama", lat: 37.4005, lon: 140.3597 },
  { id: "iwaki", prefectureId: "fukushima", nameKo: "이와키", nameJa: "いわき市", nameEn: "Iwaki", lat: 37.0504, lon: 140.8877 },

  { id: "mito", prefectureId: "ibaraki", nameKo: "미토", nameJa: "水戸市", nameEn: "Mito", lat: 36.3659, lon: 140.4714 },
  { id: "tsukuba", prefectureId: "ibaraki", nameKo: "쓰쿠바", nameJa: "つくば市", nameEn: "Tsukuba", lat: 36.0835, lon: 140.0766 },
  { id: "hitachi", prefectureId: "ibaraki", nameKo: "히타치", nameJa: "日立市", nameEn: "Hitachi", lat: 36.599, lon: 140.6515 },
  { id: "kashima", prefectureId: "ibaraki", nameKo: "가시마", nameJa: "鹿嶋市", nameEn: "Kashima", lat: 35.9656, lon: 140.6448 },

  { id: "utsunomiya", prefectureId: "tochigi", nameKo: "우쓰노미야", nameJa: "宇都宮市", nameEn: "Utsunomiya", lat: 36.5551, lon: 139.8828 },
  { id: "nikko", prefectureId: "tochigi", nameKo: "닛코", nameJa: "日光市", nameEn: "Nikko", lat: 36.72, lon: 139.6982 },
  { id: "nasu", prefectureId: "tochigi", nameKo: "나스", nameJa: "那須町", nameEn: "Nasu", lat: 37.0194, lon: 140.1211 },
  { id: "ashikaga", prefectureId: "tochigi", nameKo: "아시카가", nameJa: "足利市", nameEn: "Ashikaga", lat: 36.3402, lon: 139.4497 },

  { id: "maebashi", prefectureId: "gunma", nameKo: "마에바시", nameJa: "前橋市", nameEn: "Maebashi", lat: 36.3895, lon: 139.0634 },
  { id: "takasaki", prefectureId: "gunma", nameKo: "다카사키", nameJa: "高崎市", nameEn: "Takasaki", lat: 36.3219, lon: 139.0033 },
  { id: "kusatsu", prefectureId: "gunma", nameKo: "구사쓰", nameJa: "草津町", nameEn: "Kusatsu", lat: 36.6208, lon: 138.5961 },
  { id: "minakami", prefectureId: "gunma", nameKo: "미나카미", nameJa: "みなかみ町", nameEn: "Minakami", lat: 36.6786, lon: 138.9992 },

  { id: "saitama-city", prefectureId: "saitama", nameKo: "사이타마시", nameJa: "さいたま市", nameEn: "Saitama", lat: 35.8617, lon: 139.6455 },
  { id: "kawagoe", prefectureId: "saitama", nameKo: "가와고에", nameJa: "川越市", nameEn: "Kawagoe", lat: 35.9251, lon: 139.4858 },
  { id: "chichibu", prefectureId: "saitama", nameKo: "지치부", nameJa: "秩父市", nameEn: "Chichibu", lat: 35.9917, lon: 139.0856 },
  { id: "tokorozawa", prefectureId: "saitama", nameKo: "도코로자와", nameJa: "所沢市", nameEn: "Tokorozawa", lat: 35.7995, lon: 139.4687 },

  { id: "chiba-city", prefectureId: "chiba", nameKo: "치바시", nameJa: "千葉市", nameEn: "Chiba", lat: 35.6073, lon: 140.1063 },
  { id: "narita", prefectureId: "chiba", nameKo: "나리타", nameJa: "成田市", nameEn: "Narita", lat: 35.7767, lon: 140.318 },
  { id: "funabashi", prefectureId: "chiba", nameKo: "후나바시", nameJa: "船橋市", nameEn: "Funabashi", lat: 35.6946, lon: 139.9826 },
  { id: "urayasu", prefectureId: "chiba", nameKo: "우라야스", nameJa: "浦安市", nameEn: "Urayasu", lat: 35.6539, lon: 139.902 },
  { id: "kisarazu", prefectureId: "chiba", nameKo: "기사라즈", nameJa: "木更津市", nameEn: "Kisarazu", lat: 35.376, lon: 139.9168 },
  { id: "tateyama", prefectureId: "chiba", nameKo: "다테야마", nameJa: "館山市", nameEn: "Tateyama", lat: 34.9965, lon: 139.87 },

  { id: "chiyoda", prefectureId: "tokyo", nameKo: "지요다구", nameJa: "千代田区", nameEn: "Chiyoda", lat: 35.694, lon: 139.7536 },
  { id: "chuo", prefectureId: "tokyo", nameKo: "주오구", nameJa: "中央区", nameEn: "Chuo", lat: 35.6706, lon: 139.772 },
  { id: "minato", prefectureId: "tokyo", nameKo: "미나토구", nameJa: "港区", nameEn: "Minato", lat: 35.6581, lon: 139.7514 },
  { id: "shinjuku", prefectureId: "tokyo", nameKo: "신주쿠", nameJa: "新宿区", nameEn: "Shinjuku", lat: 35.6938, lon: 139.7034 },
  { id: "shibuya", prefectureId: "tokyo", nameKo: "시부야", nameJa: "渋谷区", nameEn: "Shibuya", lat: 35.6618, lon: 139.7041 },
  { id: "taito", prefectureId: "tokyo", nameKo: "다이토구", nameJa: "台東区", nameEn: "Taito", lat: 35.7126, lon: 139.78 },
  { id: "sumida", prefectureId: "tokyo", nameKo: "스미다구", nameJa: "墨田区", nameEn: "Sumida", lat: 35.7107, lon: 139.8015 },
  { id: "setagaya", prefectureId: "tokyo", nameKo: "세타가야구", nameJa: "世田谷区", nameEn: "Setagaya", lat: 35.6466, lon: 139.6532 },
  { id: "meguro", prefectureId: "tokyo", nameKo: "메구로구", nameJa: "目黒区", nameEn: "Meguro", lat: 35.6333, lon: 139.7161 },
  { id: "shinagawa", prefectureId: "tokyo", nameKo: "시나가와구", nameJa: "品川区", nameEn: "Shinagawa", lat: 35.6092, lon: 139.7302 },
  { id: "toshima", prefectureId: "tokyo", nameKo: "도시마구", nameJa: "豊島区", nameEn: "Toshima", lat: 35.7262, lon: 139.7168 },
  { id: "nakano", prefectureId: "tokyo", nameKo: "나카노구", nameJa: "中野区", nameEn: "Nakano", lat: 35.7074, lon: 139.6638 },
  { id: "ota", prefectureId: "tokyo", nameKo: "오타구", nameJa: "大田区", nameEn: "Ota", lat: 35.5614, lon: 139.7161 },
  { id: "edogawa", prefectureId: "tokyo", nameKo: "에도가와구", nameJa: "江戸川区", nameEn: "Edogawa", lat: 35.7068, lon: 139.8686 },
  { id: "adachi", prefectureId: "tokyo", nameKo: "아다치구", nameJa: "足立区", nameEn: "Adachi", lat: 35.775, lon: 139.8045 },
  { id: "hachioji", prefectureId: "tokyo", nameKo: "하치오지", nameJa: "八王子市", nameEn: "Hachioji", lat: 35.6664, lon: 139.316 },
  { id: "machida", prefectureId: "tokyo", nameKo: "마치다", nameJa: "町田市", nameEn: "Machida", lat: 35.5483, lon: 139.4386 },
  { id: "ome", prefectureId: "tokyo", nameKo: "오메", nameJa: "青梅市", nameEn: "Ome", lat: 35.7881, lon: 139.2758 },

  { id: "yokohama", prefectureId: "kanagawa", nameKo: "요코하마", nameJa: "横浜市", nameEn: "Yokohama", lat: 35.4437, lon: 139.638 },
  { id: "kawasaki", prefectureId: "kanagawa", nameKo: "가와사키", nameJa: "川崎市", nameEn: "Kawasaki", lat: 35.5308, lon: 139.7029 },
  { id: "kamakura", prefectureId: "kanagawa", nameKo: "가마쿠라", nameJa: "鎌倉市", nameEn: "Kamakura", lat: 35.3192, lon: 139.5467 },
  { id: "hakone", prefectureId: "kanagawa", nameKo: "하코네", nameJa: "箱根町", nameEn: "Hakone", lat: 35.2324, lon: 139.1069 },
  { id: "yokosuka", prefectureId: "kanagawa", nameKo: "요코스카", nameJa: "横須賀市", nameEn: "Yokosuka", lat: 35.2813, lon: 139.6721 },
  { id: "odawara", prefectureId: "kanagawa", nameKo: "오다와라", nameJa: "小田原市", nameEn: "Odawara", lat: 35.256, lon: 139.1555 },
  { id: "fujisawa", prefectureId: "kanagawa", nameKo: "후지사와", nameJa: "藤沢市", nameEn: "Fujisawa", lat: 35.3392, lon: 139.4911 },

  { id: "niigata-city", prefectureId: "niigata", nameKo: "니가타시", nameJa: "新潟市", nameEn: "Niigata", lat: 37.9161, lon: 139.0364 },
  { id: "nagaoka", prefectureId: "niigata", nameKo: "나가오카", nameJa: "長岡市", nameEn: "Nagaoka", lat: 37.4462, lon: 138.8511 },
  { id: "sado", prefectureId: "niigata", nameKo: "사도", nameJa: "佐渡市", nameEn: "Sado", lat: 38.0186, lon: 138.3686 },
  { id: "joetsu", prefectureId: "niigata", nameKo: "조에쓰", nameJa: "上越市", nameEn: "Joetsu", lat: 37.1479, lon: 138.2361 },

  { id: "toyama-city", prefectureId: "toyama", nameKo: "도야마시", nameJa: "富山市", nameEn: "Toyama", lat: 36.6953, lon: 137.2113 },
  { id: "takaoka", prefectureId: "toyama", nameKo: "다카오카", nameJa: "高岡市", nameEn: "Takaoka", lat: 36.7541, lon: 137.0257 },
  { id: "tateyama-toyama", prefectureId: "toyama", nameKo: "다테야마", nameJa: "立山町", nameEn: "Tateyama", lat: 36.6633, lon: 137.3136 },

  { id: "kanazawa", prefectureId: "ishikawa", nameKo: "가나자와", nameJa: "金沢市", nameEn: "Kanazawa", lat: 36.5613, lon: 136.6562 },
  { id: "wajima", prefectureId: "ishikawa", nameKo: "와지마", nameJa: "輪島市", nameEn: "Wajima", lat: 37.3906, lon: 136.899 },
  { id: "kaga", prefectureId: "ishikawa", nameKo: "가가", nameJa: "加賀市", nameEn: "Kaga", lat: 36.3028, lon: 136.315 },
  { id: "komatsu", prefectureId: "ishikawa", nameKo: "고마쓰", nameJa: "小松市", nameEn: "Komatsu", lat: 36.4084, lon: 136.4456 },

  { id: "fukui-city", prefectureId: "fukui", nameKo: "후쿠이시", nameJa: "福井市", nameEn: "Fukui", lat: 36.0652, lon: 136.2216 },
  { id: "tsuruga", prefectureId: "fukui", nameKo: "쓰루가", nameJa: "敦賀市", nameEn: "Tsuruga", lat: 35.6452, lon: 136.0556 },
  { id: "obama", prefectureId: "fukui", nameKo: "오바마", nameJa: "小浜市", nameEn: "Obama", lat: 35.4956, lon: 135.7464 },

  { id: "kofu", prefectureId: "yamanashi", nameKo: "고후", nameJa: "甲府市", nameEn: "Kofu", lat: 35.662, lon: 138.5684 },
  { id: "kawaguchiko", prefectureId: "yamanashi", nameKo: "가와구치코", nameJa: "河口湖", nameEn: "Kawaguchiko", lat: 35.497, lon: 138.759 },
  { id: "fujiyoshida", prefectureId: "yamanashi", nameKo: "후지요시다", nameJa: "富士吉田市", nameEn: "Fujiyoshida", lat: 35.4875, lon: 138.8078 },
  { id: "hokuto", prefectureId: "yamanashi", nameKo: "호쿠토", nameJa: "北杜市", nameEn: "Hokuto", lat: 35.7764, lon: 138.4236 },

  { id: "nagano-city", prefectureId: "nagano", nameKo: "나가노시", nameJa: "長野市", nameEn: "Nagano", lat: 36.6486, lon: 138.1948 },
  { id: "matsumoto", prefectureId: "nagano", nameKo: "마쓰모토", nameJa: "松本市", nameEn: "Matsumoto", lat: 36.238, lon: 137.972 },
  { id: "karuizawa", prefectureId: "nagano", nameKo: "가루이자와", nameJa: "軽井沢町", nameEn: "Karuizawa", lat: 36.3486, lon: 138.597 },
  { id: "hakuba", prefectureId: "nagano", nameKo: "하쿠바", nameJa: "白馬村", nameEn: "Hakuba", lat: 36.6983, lon: 137.8619 },
  { id: "ueda", prefectureId: "nagano", nameKo: "우에다", nameJa: "上田市", nameEn: "Ueda", lat: 36.4019, lon: 138.2491 },

  { id: "gifu-city", prefectureId: "gifu", nameKo: "기후시", nameJa: "岐阜市", nameEn: "Gifu", lat: 35.4233, lon: 136.7606 },
  { id: "takayama", prefectureId: "gifu", nameKo: "다카야마", nameJa: "高山市", nameEn: "Takayama", lat: 36.1461, lon: 137.2522 },
  { id: "ogaki", prefectureId: "gifu", nameKo: "오가키", nameJa: "大垣市", nameEn: "Ogaki", lat: 35.3594, lon: 136.6128 },
  { id: "gujo", prefectureId: "gifu", nameKo: "구조", nameJa: "郡上市", nameEn: "Gujo", lat: 35.7486, lon: 136.9644 },

  { id: "shizuoka-city", prefectureId: "shizuoka", nameKo: "시즈오카시", nameJa: "静岡市", nameEn: "Shizuoka", lat: 34.9756, lon: 138.3828 },
  { id: "hamamatsu", prefectureId: "shizuoka", nameKo: "하마마쓰", nameJa: "浜松市", nameEn: "Hamamatsu", lat: 34.7108, lon: 137.7261 },
  { id: "atami", prefectureId: "shizuoka", nameKo: "아타미", nameJa: "熱海市", nameEn: "Atami", lat: 35.0963, lon: 139.0684 },
  { id: "ito", prefectureId: "shizuoka", nameKo: "이토", nameJa: "伊東市", nameEn: "Ito", lat: 34.9658, lon: 139.1019 },
  { id: "numazu", prefectureId: "shizuoka", nameKo: "누마즈", nameJa: "沼津市", nameEn: "Numazu", lat: 35.0956, lon: 138.8636 },
  { id: "fujinomiya", prefectureId: "shizuoka", nameKo: "후지노미야", nameJa: "富士宮市", nameEn: "Fujinomiya", lat: 35.2222, lon: 138.6217 },

  { id: "nagoya", prefectureId: "aichi", nameKo: "나고야", nameJa: "名古屋市", nameEn: "Nagoya", lat: 35.1815, lon: 136.9066 },
  { id: "toyota", prefectureId: "aichi", nameKo: "도요타", nameJa: "豊田市", nameEn: "Toyota", lat: 35.0826, lon: 137.1563 },
  { id: "inuyama", prefectureId: "aichi", nameKo: "이누야마", nameJa: "犬山市", nameEn: "Inuyama", lat: 35.3786, lon: 136.9447 },
  { id: "okazaki", prefectureId: "aichi", nameKo: "오카자키", nameJa: "岡崎市", nameEn: "Okazaki", lat: 34.9543, lon: 137.1744 },
  { id: "toyohashi", prefectureId: "aichi", nameKo: "도요하시", nameJa: "豊橋市", nameEn: "Toyohashi", lat: 34.7692, lon: 137.3915 },

  { id: "tsu", prefectureId: "mie", nameKo: "쓰", nameJa: "津市", nameEn: "Tsu", lat: 34.7303, lon: 136.5086 },
  { id: "ise", prefectureId: "mie", nameKo: "이세", nameJa: "伊勢市", nameEn: "Ise", lat: 34.4875, lon: 136.7092 },
  { id: "toba", prefectureId: "mie", nameKo: "도바", nameJa: "鳥羽市", nameEn: "Toba", lat: 34.4814, lon: 136.8435 },
  { id: "yokkaichi", prefectureId: "mie", nameKo: "욧카이치", nameJa: "四日市市", nameEn: "Yokkaichi", lat: 34.9652, lon: 136.6244 },

  { id: "otsu", prefectureId: "shiga", nameKo: "오쓰", nameJa: "大津市", nameEn: "Otsu", lat: 35.0045, lon: 135.8686 },
  { id: "hikone", prefectureId: "shiga", nameKo: "히코네", nameJa: "彦根市", nameEn: "Hikone", lat: 35.2744, lon: 136.2597 },
  { id: "nagahama", prefectureId: "shiga", nameKo: "나가하마", nameJa: "長浜市", nameEn: "Nagahama", lat: 35.3828, lon: 136.2656 },

  { id: "kyoto-city", prefectureId: "kyoto", nameKo: "교토시", nameJa: "京都市", nameEn: "Kyoto", lat: 35.0116, lon: 135.7681 },
  { id: "uji", prefectureId: "kyoto", nameKo: "우지", nameJa: "宇治市", nameEn: "Uji", lat: 34.8844, lon: 135.7997 },
  { id: "amanohashidate", prefectureId: "kyoto", nameKo: "아마노하시다테", nameJa: "天橋立", nameEn: "Amanohashidate", lat: 35.5697, lon: 135.1919 },
  { id: "maizuru", prefectureId: "kyoto", nameKo: "마이즈루", nameJa: "舞鶴市", nameEn: "Maizuru", lat: 35.4747, lon: 135.3858 },

  { id: "osaka-city", prefectureId: "osaka", nameKo: "오사카시", nameJa: "大阪市", nameEn: "Osaka", lat: 34.6937, lon: 135.5023 },
  { id: "sakai", prefectureId: "osaka", nameKo: "사카이", nameJa: "堺市", nameEn: "Sakai", lat: 34.5733, lon: 135.4831 },
  { id: "suita", prefectureId: "osaka", nameKo: "스이타", nameJa: "吹田市", nameEn: "Suita", lat: 34.7596, lon: 135.5168 },
  { id: "takatsuki", prefectureId: "osaka", nameKo: "다카쓰키", nameJa: "高槻市", nameEn: "Takatsuki", lat: 34.8461, lon: 135.6174 },
  { id: "hirakata", prefectureId: "osaka", nameKo: "히라카타", nameJa: "枚方市", nameEn: "Hirakata", lat: 34.8144, lon: 135.6506 },
  { id: "toyonaka", prefectureId: "osaka", nameKo: "도요나카", nameJa: "豊中市", nameEn: "Toyonaka", lat: 34.7813, lon: 135.4699 },

  { id: "kobe", prefectureId: "hyogo", nameKo: "고베", nameJa: "神戸市", nameEn: "Kobe", lat: 34.6901, lon: 135.1956 },
  { id: "himeji", prefectureId: "hyogo", nameKo: "히메지", nameJa: "姫路市", nameEn: "Himeji", lat: 34.8154, lon: 134.6853 },
  { id: "nishinomiya", prefectureId: "hyogo", nameKo: "니시노미야", nameJa: "西宮市", nameEn: "Nishinomiya", lat: 34.7376, lon: 135.3416 },
  { id: "takarazuka", prefectureId: "hyogo", nameKo: "다카라즈카", nameJa: "宝塚市", nameEn: "Takarazuka", lat: 34.8, lon: 135.3603 },
  { id: "awaji", prefectureId: "hyogo", nameKo: "아와지", nameJa: "淡路市", nameEn: "Awaji", lat: 34.44, lon: 134.9147 },
  { id: "kinosaki", prefectureId: "hyogo", nameKo: "기노사키", nameJa: "城崎", nameEn: "Kinosaki", lat: 35.6236, lon: 134.8064 },

  { id: "nara-city", prefectureId: "nara", nameKo: "나라시", nameJa: "奈良市", nameEn: "Nara", lat: 34.6851, lon: 135.8048 },
  { id: "kashihara", prefectureId: "nara", nameKo: "가시하라", nameJa: "橿原市", nameEn: "Kashihara", lat: 34.5094, lon: 135.7925 },
  { id: "yoshino", prefectureId: "nara", nameKo: "요시노", nameJa: "吉野町", nameEn: "Yoshino", lat: 34.3964, lon: 135.8586 },
  { id: "ikoma", prefectureId: "nara", nameKo: "이코마", nameJa: "生駒市", nameEn: "Ikoma", lat: 34.6919, lon: 135.7006 },

  { id: "wakayama-city", prefectureId: "wakayama", nameKo: "와카야마시", nameJa: "和歌山市", nameEn: "Wakayama", lat: 34.2305, lon: 135.1708 },
  { id: "shirahama", prefectureId: "wakayama", nameKo: "시라하마", nameJa: "白浜町", nameEn: "Shirahama", lat: 33.6781, lon: 135.3481 },
  { id: "koyasan", prefectureId: "wakayama", nameKo: "고야산", nameJa: "高野山", nameEn: "Koyasan", lat: 34.2133, lon: 135.5867 },
  { id: "tanabe", prefectureId: "wakayama", nameKo: "다나베", nameJa: "田辺市", nameEn: "Tanabe", lat: 33.7281, lon: 135.3775 },

  { id: "tottori-city", prefectureId: "tottori", nameKo: "돗토리시", nameJa: "鳥取市", nameEn: "Tottori", lat: 35.5011, lon: 134.2351 },
  { id: "yonago", prefectureId: "tottori", nameKo: "요나고", nameJa: "米子市", nameEn: "Yonago", lat: 35.4281, lon: 133.3311 },
  { id: "kurayoshi", prefectureId: "tottori", nameKo: "구라요시", nameJa: "倉吉市", nameEn: "Kurayoshi", lat: 35.43, lon: 133.8256 },

  { id: "matsue", prefectureId: "shimane", nameKo: "마쓰에", nameJa: "松江市", nameEn: "Matsue", lat: 35.4681, lon: 133.0485 },
  { id: "izumo", prefectureId: "shimane", nameKo: "이즈모", nameJa: "出雲市", nameEn: "Izumo", lat: 35.3668, lon: 132.7547 },
  { id: "hamada", prefectureId: "shimane", nameKo: "하마다", nameJa: "浜田市", nameEn: "Hamada", lat: 34.8992, lon: 132.08 },

  { id: "okayama-city", prefectureId: "okayama", nameKo: "오카야마시", nameJa: "岡山市", nameEn: "Okayama", lat: 34.6551, lon: 133.9195 },
  { id: "kurashiki", prefectureId: "okayama", nameKo: "구라시키", nameJa: "倉敷市", nameEn: "Kurashiki", lat: 34.585, lon: 133.772 },
  { id: "tsuyama", prefectureId: "okayama", nameKo: "쓰야마", nameJa: "津山市", nameEn: "Tsuyama", lat: 35.0692, lon: 134.0044 },

  { id: "hiroshima-city", prefectureId: "hiroshima", nameKo: "히로시마시", nameJa: "広島市", nameEn: "Hiroshima", lat: 34.3853, lon: 132.4553 },
  { id: "miyajima", prefectureId: "hiroshima", nameKo: "미야지마", nameJa: "宮島", nameEn: "Miyajima", lat: 34.2961, lon: 132.3197 },
  { id: "onomichi", prefectureId: "hiroshima", nameKo: "오노미치", nameJa: "尾道市", nameEn: "Onomichi", lat: 34.409, lon: 133.205 },
  { id: "fukuyama", prefectureId: "hiroshima", nameKo: "후쿠야마", nameJa: "福山市", nameEn: "Fukuyama", lat: 34.4859, lon: 133.3624 },
  { id: "kure", prefectureId: "hiroshima", nameKo: "구레", nameJa: "呉市", nameEn: "Kure", lat: 34.249, lon: 132.5658 },

  { id: "yamaguchi-city", prefectureId: "yamaguchi", nameKo: "야마구치시", nameJa: "山口市", nameEn: "Yamaguchi", lat: 34.1783, lon: 131.4737 },
  { id: "shimonoseki", prefectureId: "yamaguchi", nameKo: "시모노세키", nameJa: "下関市", nameEn: "Shimonoseki", lat: 33.9578, lon: 130.9414 },
  { id: "iwakuni", prefectureId: "yamaguchi", nameKo: "이와쿠니", nameJa: "岩国市", nameEn: "Iwakuni", lat: 34.1661, lon: 132.2197 },
  { id: "hagi", prefectureId: "yamaguchi", nameKo: "하기", nameJa: "萩市", nameEn: "Hagi", lat: 34.4081, lon: 131.3992 },

  { id: "tokushima-city", prefectureId: "tokushima", nameKo: "도쿠시마시", nameJa: "徳島市", nameEn: "Tokushima", lat: 34.0703, lon: 134.5548 },
  { id: "naruto", prefectureId: "tokushima", nameKo: "나루토", nameJa: "鳴門市", nameEn: "Naruto", lat: 34.1725, lon: 134.6086 },
  { id: "miyoshi", prefectureId: "tokushima", nameKo: "미요시", nameJa: "三好市", nameEn: "Miyoshi", lat: 34.0258, lon: 133.8072 },

  { id: "takamatsu", prefectureId: "kagawa", nameKo: "다카마쓰", nameJa: "高松市", nameEn: "Takamatsu", lat: 34.3428, lon: 134.0466 },
  { id: "kotohira", prefectureId: "kagawa", nameKo: "고토히라", nameJa: "琴平町", nameEn: "Kotohira", lat: 34.1914, lon: 133.8197 },
  { id: "marugame", prefectureId: "kagawa", nameKo: "마루가메", nameJa: "丸亀市", nameEn: "Marugame", lat: 34.2894, lon: 133.7978 },
  { id: "naoshima", prefectureId: "kagawa", nameKo: "나오시마", nameJa: "直島町", nameEn: "Naoshima", lat: 34.46, lon: 133.9956 },

  { id: "matsuyama", prefectureId: "ehime", nameKo: "마쓰야마", nameJa: "松山市", nameEn: "Matsuyama", lat: 33.8392, lon: 132.7657 },
  { id: "imabari", prefectureId: "ehime", nameKo: "이마바리", nameJa: "今治市", nameEn: "Imabari", lat: 34.0661, lon: 132.9978 },
  { id: "uwajima", prefectureId: "ehime", nameKo: "우와지마", nameJa: "宇和島市", nameEn: "Uwajima", lat: 33.2231, lon: 132.5606 },
  { id: "dogo", prefectureId: "ehime", nameKo: "도고온천", nameJa: "道後温泉", nameEn: "Dogo", lat: 33.8519, lon: 132.7864 },

  { id: "kochi-city", prefectureId: "kochi", nameKo: "고치시", nameJa: "高知市", nameEn: "Kochi", lat: 33.5597, lon: 133.5311 },
  { id: "shimanto", prefectureId: "kochi", nameKo: "시만토", nameJa: "四万十市", nameEn: "Shimanto", lat: 32.9917, lon: 132.9339 },
  { id: "tosashimizu", prefectureId: "kochi", nameKo: "도사시미즈", nameJa: "土佐清水市", nameEn: "Tosashimizu", lat: 32.7817, lon: 132.955 },

  { id: "fukuoka-city", prefectureId: "fukuoka", nameKo: "후쿠오카시", nameJa: "福岡市", nameEn: "Fukuoka", lat: 33.5904, lon: 130.4017 },
  { id: "kitakyushu", prefectureId: "fukuoka", nameKo: "기타큐슈", nameJa: "北九州市", nameEn: "Kitakyushu", lat: 33.8834, lon: 130.8752 },
  { id: "dazaifu", prefectureId: "fukuoka", nameKo: "다자이후", nameJa: "太宰府市", nameEn: "Dazaifu", lat: 33.5128, lon: 130.5239 },
  { id: "kurume", prefectureId: "fukuoka", nameKo: "구루메", nameJa: "久留米市", nameEn: "Kurume", lat: 33.3192, lon: 130.5084 },
  { id: "yanagawa", prefectureId: "fukuoka", nameKo: "야나가와", nameJa: "柳川市", nameEn: "Yanagawa", lat: 33.1631, lon: 130.4058 },

  { id: "saga-city", prefectureId: "saga", nameKo: "사가시", nameJa: "佐賀市", nameEn: "Saga", lat: 33.2494, lon: 130.2988 },
  { id: "karatsu", prefectureId: "saga", nameKo: "가라쓰", nameJa: "唐津市", nameEn: "Karatsu", lat: 33.45, lon: 129.9683 },
  { id: "imari", prefectureId: "saga", nameKo: "이마리", nameJa: "伊万里市", nameEn: "Imari", lat: 33.2647, lon: 129.8808 },
  { id: "takeo", prefectureId: "saga", nameKo: "다케오", nameJa: "武雄市", nameEn: "Takeo", lat: 33.1939, lon: 130.0192 },

  { id: "nagasaki-city", prefectureId: "nagasaki", nameKo: "나가사키시", nameJa: "長崎市", nameEn: "Nagasaki", lat: 32.7503, lon: 129.8777 },
  { id: "sasebo", prefectureId: "nagasaki", nameKo: "사세보", nameJa: "佐世保市", nameEn: "Sasebo", lat: 33.1799, lon: 129.7151 },
  { id: "unzen", prefectureId: "nagasaki", nameKo: "운젠", nameJa: "雲仙市", nameEn: "Unzen", lat: 32.835, lon: 130.1875 },
  { id: "goto", prefectureId: "nagasaki", nameKo: "고토", nameJa: "五島市", nameEn: "Goto", lat: 32.6956, lon: 128.8408 },
  { id: "shimabara", prefectureId: "nagasaki", nameKo: "시마바라", nameJa: "島原市", nameEn: "Shimabara", lat: 32.7881, lon: 130.3703 },

  { id: "kumamoto-city", prefectureId: "kumamoto", nameKo: "구마모토시", nameJa: "熊本市", nameEn: "Kumamoto", lat: 32.8031, lon: 130.7079 },
  { id: "aso", prefectureId: "kumamoto", nameKo: "아소", nameJa: "阿蘇市", nameEn: "Aso", lat: 32.9511, lon: 131.1211 },
  { id: "amakusa", prefectureId: "kumamoto", nameKo: "아마쿠사", nameJa: "天草市", nameEn: "Amakusa", lat: 32.4586, lon: 130.1931 },
  { id: "yatsushiro", prefectureId: "kumamoto", nameKo: "야쓰시로", nameJa: "八代市", nameEn: "Yatsushiro", lat: 32.5075, lon: 130.6017 },

  { id: "oita-city", prefectureId: "oita", nameKo: "오이타시", nameJa: "大分市", nameEn: "Oita", lat: 33.2382, lon: 131.6126 },
  { id: "beppu", prefectureId: "oita", nameKo: "벳푸", nameJa: "別府市", nameEn: "Beppu", lat: 33.2797, lon: 131.4911 },
  { id: "yufuin", prefectureId: "oita", nameKo: "유후인", nameJa: "由布院", nameEn: "Yufuin", lat: 33.2628, lon: 131.3547 },
  { id: "nakatsu", prefectureId: "oita", nameKo: "나카쓰", nameJa: "中津市", nameEn: "Nakatsu", lat: 33.5983, lon: 131.1883 },

  { id: "miyazaki-city", prefectureId: "miyazaki", nameKo: "미야자키시", nameJa: "宮崎市", nameEn: "Miyazaki", lat: 31.9077, lon: 131.4202 },
  { id: "nichinan", prefectureId: "miyazaki", nameKo: "니치난", nameJa: "日南市", nameEn: "Nichinan", lat: 31.6019, lon: 131.3786 },
  { id: "nobeoka", prefectureId: "miyazaki", nameKo: "노베오카", nameJa: "延岡市", nameEn: "Nobeoka", lat: 32.5822, lon: 131.665 },
  { id: "takachiho", prefectureId: "miyazaki", nameKo: "다카치호", nameJa: "高千穂町", nameEn: "Takachiho", lat: 32.7114, lon: 131.3078 },

  { id: "kagoshima-city", prefectureId: "kagoshima", nameKo: "가고시마시", nameJa: "鹿児島市", nameEn: "Kagoshima", lat: 31.5966, lon: 130.5571 },
  { id: "yakushima", prefectureId: "kagoshima", nameKo: "야쿠시마", nameJa: "屋久島", nameEn: "Yakushima", lat: 30.3439, lon: 130.5022 },
  { id: "ibusuki", prefectureId: "kagoshima", nameKo: "이부스키", nameJa: "指宿市", nameEn: "Ibusuki", lat: 31.2528, lon: 130.6331 },
  { id: "amami", prefectureId: "kagoshima", nameKo: "아마미", nameJa: "奄美市", nameEn: "Amami", lat: 28.3772, lon: 129.4939 },
  { id: "kirishima", prefectureId: "kagoshima", nameKo: "기리시마", nameJa: "霧島市", nameEn: "Kirishima", lat: 31.7411, lon: 130.7631 },

  { id: "naha", prefectureId: "okinawa", nameKo: "나하", nameJa: "那覇市", nameEn: "Naha", lat: 26.2124, lon: 127.6809 },
  { id: "nago", prefectureId: "okinawa", nameKo: "나고", nameJa: "名護市", nameEn: "Nago", lat: 26.5917, lon: 127.9775 },
  { id: "onna", prefectureId: "okinawa", nameKo: "온나", nameJa: "恩納村", nameEn: "Onna", lat: 26.4975, lon: 127.8536 },
  { id: "ishigaki", prefectureId: "okinawa", nameKo: "이시가키", nameJa: "石垣市", nameEn: "Ishigaki", lat: 24.3448, lon: 124.1572 },
  { id: "miyakojima", prefectureId: "okinawa", nameKo: "미야코지마", nameJa: "宮古島市", nameEn: "Miyakojima", lat: 24.8055, lon: 125.2811 },
  { id: "uruma", prefectureId: "okinawa", nameKo: "우루마", nameJa: "うるま市", nameEn: "Uruma", lat: 26.3792, lon: 127.8575 },
];

export function citiesInPrefecture(prefectureId: string) {
  return JAPAN_CITIES.filter((city) => city.prefectureId === prefectureId);
}

export function findCity(id: string) {
  return JAPAN_CITIES.find((city) => city.id === id);
}
