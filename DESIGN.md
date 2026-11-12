# Design

單頁作品集。設計定位是「個人檢體／校準儀器」：深色石墨底、髮絲線、等寬數字讀數，只用一個玫瑰色訊號。沒有霓虹光暈、玻璃擬態、漸層文字或裝飾粒子。

檔案：`index.html`、`css/styles.css`、`js/main.js`。無框架、無建置步驟。

---

## 1. 設計原則

1. **儀器，不是舞台。** 每個元素要攜帶資訊或建立秩序；純裝飾移除。
2. **先給證據。** 專案、決策、限制、結果優先於形容詞。
3. **一個訊號色。** 玫瑰紅只標記狀態、目前位置與關鍵資料點，其餘靠灰階層級。
4. **版面即量測。** 刻度、對齊線、尺寸標註、等寬數字是內容的一部分。
5. **安靜的動態。** 只用來說明狀態變化；`prefers-reduced-motion` 下全部退化為靜態。

避免：cyberpunk 霓虹、粒子爆炸、掃描線、發光邊框、漂浮光球、三欄同尺寸卡片、大字報數字牆、「01 / 02 / 03」章節眉標。

---

## 2. 色彩

所有顏色以 OKLCH 定義在 `:root`，hex 為近似值（僅供非 OKLCH 環境參考）。

| Token | OKLCH | Hex | 用途 |
| --- | --- | --- | --- |
| `--bg` | `oklch(0.175 0.008 255)` | `#0e1114` | 頁面底色 |
| `--bg-deep` | `oklch(0.140 0.008 255)` | `#07090c` | 聯絡區、頁尾 |
| `--surface` | `oklch(0.215 0.010 255)` | `#161a1e` | 規格板、能力區底、專案 hover |
| `--surface-2` | `oklch(0.255 0.010 255)` | `#202328` | 預留（面板層級） |
| `--line` | `oklch(0.335 0.011 255)` | `#33373c` | 區塊分隔線、邊框 |
| `--line-soft` | `oklch(0.265 0.009 255)` | `#22252a` | 列表內分隔線、圖表細格 |
| `--line-strong` | `oklch(0.440 0.012 255)` | `#4e5359` | 虛線、量測線、底線 |
| `--ink` | `oklch(0.965 0.004 255)` | `#f2f4f6` | 標題、主要文字 |
| `--ink-soft` | `oklch(0.875 0.006 255)` | `#d3d6da` | 次級內文 |
| `--muted` | `oklch(0.740 0.010 255)` | `#a7abb1` | 說明文字、導覽 |
| `--faint` | `oklch(0.620 0.010 255)` | `#82878c` | 標籤、座標、註記 |
| `--signal` | `oklch(0.640 0.150 353)` | `#cf6194` | 狀態點、資料點、目前章節 |
| `--signal-fill` | `oklch(0.455 0.160 353)` | `#94215e` | 主要按鈕底、選取底色 |
| `--signal-hover` | `oklch(0.500 0.165 353)` | `#a52e6b` | 主要按鈕 hover |
| `--signal-ink` | `oklch(0.985 0.005 353)` | `#fdf9fa` | 玫瑰底上的文字 |
| `--ice` | `oklch(0.820 0.045 235)` | `#a9c9de` | 次要資料線、焦點框、對照曲線 |

**對比（WCAG 2.2，實測）**

- `ink` / `bg`：17.14:1
- `muted` / `bg`：8.23:1
- `faint` / `bg`：5.21:1
- `signal` / `bg`：5.61:1
- `signal-ink` / `signal-fill`：7.76:1
- 焦點框 `ice` / 深色底：> 10:1

狀態不只靠顏色：`STATUS` 與 `現在` 都同時有方形標記與文字。

---

## 3. 字體與字階

三套字型，全部透過 Google Fonts 載入：

- **Archivo**：拉丁標題與數字，使用可變寬度 `wdth 100–125`。
- **Noto Sans TC**：中文內文與標題。
- **Martian Mono**：資料標籤、座標、年份、程式碼式讀數。

| 角色 | 規格 |
| --- | --- |
| Hero 姓名 | `clamp(3.4rem, 8.6vw, 6rem)` / 0.86 / 700 / wdth 125 / 字距 -0.035em |
| 區塊標題 | `clamp(1.9rem, 4.6vw, 3.5rem)` / 1 / 600 / wdth 112 / -0.03em |
| 案例標題 | `clamp(2rem, 5vw, 3.25rem)` / 1 / 700 / wdth 118 |
| 聯絡信箱 | `clamp(1.75rem, 5.6vw, 3.75rem)` / 1.1 / 600 / wdth 105；≤480px 改 `clamp(1.25rem, 7.2vw, 1.75rem)` |
| Hero 副標 | `clamp(1.3rem, 2.2vw, 1.75rem)` / 1.55 / 500 |
| 內文 | `1.0625rem` / 1.8 |
| 小內文 | `0.9375rem` / 1.85 |
| 等寬讀數 | `0.625rem` / 字距 0.07em / tabular-nums |

中文行長控制在 42–66ch；`text-wrap: pretty` 用於段落，`balance` 用於 hero 副標。

---

## 4. 版面與間距

- 內容寬 `--wrap: 1320px`。
- 頁邊 `--gutter: clamp(1.25rem, 4.5vw, 4.5rem)`。
- 區塊上下 `--section-y: clamp(5rem, 9vw, 8.5rem)`。
- 標頭高 `60px`（`--header-h`），sticky，`scroll-padding-top` 同步。
- 圓角 `--radius: 2px`，只用在按鈕、對話框與標籤，不用在卡片。
- 分隔一律 1px 實線；少量虛線只用於圖表與量測。

**Hero**：`minmax(0, 1.12fr) minmax(340px, 0.88fr)` 兩欄，左文右規格板；≤1024px 改單欄。背景有 25% 間距的垂直量測線，遮罩讓上下淡出。

**Work**：索引式列，不是卡片。桌面欄位 `index / title+sub / desc / meta / thumb / arrow`；縮到 1180px 移除縮圖，980px 改兩列，640px 堆疊。每列是一個真正的 `<button>`，整列可點、可鍵盤操作。

**Capabilities**：左 intro、右 datasheet；900px 以下單欄。datasheet 用三欄 `DISCIPLINE / TOOLS / SINCE`，640px 以下改成兩列。

**Experience**：`9rem / 1fr / 12rem` 三欄時間軸；760px 以下單欄。

**Contact**：深底、巨大信箱、複製按鈕與狀態訊息、三個外部連結。

---

## 5. 元件

- **Header**：品牌方塊、頁面導覽、台北時鐘、行動版 `<details>` 選單。目前章節用 `aria-current="true"`，同時變為玫瑰色。
- **Specimen plate**：`SPECIMEN / 001` 標頭、職涯範圍曲線（SVG，含 `title` / `desc`）、四格資料（ROLE / FOCUS / BASE / STATUS）。
- **Work row**：等寬索引、標題、一句話描述、標籤與年份、72×44 的 SVG 縮圖、箭頭。hover 只做底色、標題位移 4px、箭頭位移。
- **Project dialog**：原生 `<dialog>` + `showModal()`；`::backdrop` 深色遮罩；標頭 sticky；四份 `<template>` 各自帶一張圖表、角色／期間／團隊、兩段背景、三條關鍵決策、技術列。關閉後焦點回到觸發按鈕。
- **Buttons**：主要為玫瑰底白字，次要為 1px 邊框；最小高度 44–46px。
- **Copy button**：`navigator.clipboard`，失敗時退回 `execCommand`，並用 `role="status"` 回報結果。

---

## 6. 圖表

全部手寫 SVG，無圖表函式庫。

- 共用 class：`.fgrid`、`.f-grid-soft`、`.f-area`、`.f-trace`、`.f-trace-ice`、`.f-dash`、`.f-dash-ruby`、`.f-leader`、`.f-alert`、`.f-mono`。
- `vector-effect: non-scaling-stroke` 讓線寬在縮放時保持 1px 級。
- Hero 曲線以 `pathLength="1"` + `stroke-dashoffset` 繪製。
- 案例圖表在寬度足夠時滿版，手機上維持 `min-width: 520px` 並可水平捲動；`figure` 可聚焦（`tabindex="0"`）且提供 `aria-label`，700px 以下顯示「圖表可左右捲動」提示。
- 每張圖都有 `<figcaption>` 說明資料與標記意義。

---

## 7. 動態

- 曲線：`cubic-bezier(0.16, 1, 0.3, 1)`，1.9s 繪製。
- Hero 文字：50–650ms 依序上浮；標題以遮罩上移。
- 列表：`IntersectionObserver` 進入視窗後以 42–55ms 間隔上浮。
- 對話框：0.32s 上浮 + 淡入。
- 狀態燈：2.8s 方框脈衝，僅一處。
- `prefers-reduced-motion: reduce`：所有 animation/transition 縮到 0.001ms，曲線直接顯示，脈衝關閉。

---

## 8. 無障礙

- 目標 WCAG 2.2 AA；內文對比皆 ≥ 4.5:1。
- `skip-link`、單一 `<h1>`、區塊 `aria-labelledby`、SVG `role="img"` + `title` / `desc`。
- 完整鍵盤路徑；`:focus-visible` 用 2px `--ice` 外框。
- 對話框焦點管理與 Esc 關閉由原生 `<dialog>` 處理，關閉後歸還焦點。
- 行動選單使用 `<details>`，Esc 可關閉並把焦點移回 summary。
- 無 JS 時：`.no-js` 讓內容直接可見、手機版導覽展開為橫向列表、隱藏 `<details>` 選單。
- 顏色不是唯一線索；圖表另有文字說明。

---

## 9. 響應式斷點

| 寬度 | 變更 |
| --- | --- |
| ≤1180px | 專案列移除縮圖 |
| ≤1024px | Hero 改單欄，規格板靠左 |
| ≤980px | 專案列改兩列；經歷改兩欄 |
| ≤900px | 能力區改單欄 |
| ≤860px | 桌機導覽換成 `<details>` 選單；隱藏品牌副標 |
| ≤760px | 區塊標題堆疊；經歷單欄；案例決策單欄 |
| ≤700px | 顯示圖表捲動提示 |
| ≤640px | 專案列三列堆疊；datasheet 兩列；頁尾單欄 |
| ≤480px | 姓名與規格板字級微調 |

實測 1440 / 1180 / 1024 / 768 / 390 / 320px 均無頁面水平溢出。

---

## 10. 檔案責任

- `index.html`：語意結構、SVG sprite、四份案例 template。
- `css/styles.css`： tokens、版面、元件、動態、響應式、reduced-motion、no-JS。
- `js/main.js`：時鐘、進場、對話框、複製、選單、目前章節。
