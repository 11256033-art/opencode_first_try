# LIN GUAN-YI / 作品集

單頁個人作品集，深色石墨底、單一玫瑰訊號色、手寫 SVG 圖表。純 HTML + CSS + 原生 JavaScript，沒有框架、沒有建置步驟、沒有追蹤碼。

> **示範內容警告**：姓名與信箱已換成目前使用的資料；公司、職稱細節、專案、數字與社群連結仍是示範。寄給招募方之前，請先照下方清單替換成真實內容。四篇案例（GRIDWATCH、LEDGERLINE、FIELDNOTES、TYPE/SCALE）全部是虛構的。

---

## 預覽

直接雙擊 `index.html` 即可。若要用本機伺服器（例如測試相對路徑或 PWA 行為）：

```powershell
npx serve .
# 或
python -m http.server 8000
```

字型從 Google Fonts 載入，第一次開啟需要網路；離線時會退回系統的 sans-serif 與 monospace。

---

## 檔案結構

```
index.html          頁面結構、SVG sprite、四份案例 <template>
css/styles.css      設計 token、版面、元件、動態、響應式
js/main.js          時鐘、進場動畫、專案對話框、複製信箱、選單、章節導覽
PRODUCT.md          產品脈絡：對象、目的、個性、反例、無障礙目標
DESIGN.md           實際設計系統：色彩、字階、版面、元件、動態
shots/              驗證用截圖（可刪除）
```

---

## 需要替換的示範內容

### 身分與聯絡

| 位置 | 目前值 | 說明 |
| --- | --- | --- |
| `<title>`、meta description | LIN GUAN-YI / AI 規劃師 | 搜尋結果與分享預覽 |
| Header `.brand-name` / `aria-label` | LIN GUAN-YI | 品牌字樣 |
| Hero `<h1>` | LIN / GUAN-YI | 兩行顯示；若要改姓氏拆行，記得同步 `.line-2` |
| Hero `.hero-name` | 林冠益 / AI 規劃師 | 中文姓名與職稱 |
| Hero `.hero-kicker` | 台北 · AI 規劃師 · 開放正職與合作 | 地點與狀態 |
| Hero `.hero-intro` | 七年、能源調度⋯⋯ | 自我介紹 |
| Specimen `ROLE` / `BASE` / `STATUS` | AI 規劃師 / 台北 · TPE | 規格板資料 |
| 信箱（4 處） | `ten961028@gmail.com` | `mailto:`、顯示文字、`data-copy`、索取履歷連結 |
| `contact-links` | GitHub / LinkedIn 首頁 | 換成實際個人頁網址 |
| Footer | © 2026 LIN GUAN-YI | 年份與姓名 |

信箱在這些地方出現，替換時要全部改：

- `.hero-actions` 的 `mailto:`
- `.contact-mail` 的 `href` 與文字
- `.copy-btn` 的 `data-copy`
- 「索取履歷」的 `mailto:`

### 經歷

`#experience` 的四個 `.entry` 全是示範：公司名、職稱、期間、描述、使用工具。請換成真實經歷，並保留「年份 → 職稱 → 公司 → 一兩句實際負責的事 → 工具」的節奏。

### 能力

`#capabilities` 的 `.ds-row` 五列（介面工程、資料視覺化、AI 整合、設計系統、原型與測試）與左側 `.cap-note` 的段落，請依實際能力調整。`SINCE` 年份也要一起改。

### 專案

每篇案例需要改三個地方：

1. `index.html` 的 `.project` 按鈕：`data-project`、`data-code`、標題、副標、描述、標籤、年份、縮圖 SVG。
2. 對應的 `<template id="tpl-…">`：案例標題、角色、期間、團隊、兩段背景、三條關鍵決策、技術列。
3. `index.html` 上方 `<svg class="svg-sprite">` 裡的 `<symbol id="fig-…">`：圖表本身與 `figcaption`。

如果新增或刪除案例，記得同步：

- `.project-list` 的 `<li>` 數量
- `#work` 標頭的 `04 ENTRIES / 2023 – 2026`
- 每個按鈕的 `data-code`（對話框左上角顯示）
- `<template>` 的 id 與 `data-project` 對應

### 其他小地方

- Hero 底部座標 `25.0330° N / 121.5654° E`。
- 頁尾 `REV. 2026.11`、規格板 `REV. 2026.11`、案例年份。
- `#work` 的 `04 ENTRIES`、`#capabilities` 的 `05 DISCIPLINES`。
- 狀態文案「開放正職與合作」共出現兩次（hero 與規格板）。
- `.work-foot` 的「其他專案、程式碼樣本與推薦人」可保留或改寫。

---

## 互動與行為

- **台北時鐘**：`Intl.DateTimeFormat` 固定 `Asia/Taipei`，每秒更新。
- **專案對話框**：原生 `<dialog>`，點背景、按 Esc、按 CLOSE 都會關閉；關閉後焦點回到原本的專案列。
- **複製信箱**：優先用 `navigator.clipboard`，失敗時退回 `document.execCommand('copy')`；結果透過 `role="status"` 播報。
- **行動選單**：`<details>` + `summary`，點外面或按 Esc 會關閉。
- **目前章節**：捲動時以 `aria-current="true"` 標記導覽。
- **進場動畫**：`IntersectionObserver`，只對尚未出現在視窗內的列加動畫，避免載入時閃動。

---

## 無障礙

- 目標 WCAG 2.2 AA；內文對比 ≥ 4.5:1，大字 ≥ 3:1。
- 完整鍵盤操作、可見焦點框、skip link、單一 `<h1>`。
- 尊重 `prefers-reduced-motion`：所有動畫與過場關閉，內容預設可見。
- 關閉 JavaScript 時：內容仍完整顯示，手機版導覽改為橫向列表。
- 圖表以 `role="img"` + `title` / `desc` 描述，案例圖表可聚焦並水平捲動。

---

## 瀏覽器支援

使用了 OKLCH 色彩、`<dialog>`、`svh` 單位與 `text-wrap`。建議：

- Chrome / Edge 111+
- Safari 15.4+
- Firefox 113+

舊瀏覽器會退回近似色或忽略部分排版微調，內容仍可讀。

---

## 驗證紀錄

以 headless Chrome 在 1440 / 1180 / 1024 / 768 / 390 / 320px 測過：

- 無頁面水平溢出、無 console error。
- 無重複 ID、所有按鈕與連結都有可讀名稱、SVG `<use>` 參照都存在。
- 四篇案例皆可開啟，標題與編號正確，對話框內無水平溢出。
- Esc 可關閉對話框，焦點正確回到觸發列。
- 複製信箱在真實點擊下成功（`file://` 與合成點擊的限制不影響實際瀏覽）。
- 無 JS 時內容可見、導覽可用。

截圖保存在 `shots/`，僅供檢查，可安全刪除。

---

## 字型授權

Archivo、Noto Sans TC、Martian Mono 皆為 SIL Open Font License，透過 Google Fonts 載入。若需完全離線，請自行下載字型檔並改為 `@font-face` 本機參照。
