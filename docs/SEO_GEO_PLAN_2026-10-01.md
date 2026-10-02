# План SEO/GEO-работ — easy-move-florida.com

Собрано 2026-10-01 (UTC 2026-10-02 03:00) по данным Search Console (MCP gsc), geo-optimizer (MCP) и живому сайту (curl). Ничего не изменено и не задеплоено. Все числа — из ответа инструмента, который указан рядом.

Второй блок задания (oriumstudios.com) здесь **не выполнен**: это другой репозиторий со своим CLAUDE.md и своим mem0-scope, его нужно запускать из `E:\AI Projects\oriumstudios` отдельной сессией.

---

## 0. Что показали данные

### Search Console — property `https://easy-move-florida.com/` (URL-prefix, без www)

Главное ограничение: сайт отдаёт всё с `www.` (bare → 301 → www, проверено curl на 8 URL, одна цепочка, без петли). Property без www видит только URL на голом домене, то есть **не видит ни одной реальной страницы сайта**. Всё ниже — взгляд через замочную скважину.

| Метрика (get_performance_overview, 28 дней, 2026-09-03…10-01) | Значение |
|---|---|
| Клики | 0 |
| Показы | 291 |
| CTR | 0 |
| Средняя позиция | 4.7 |

- get_search_analytics по страницам: **одна строка** — `https://easy-move-florida.com/`, 291 показ. Других страниц property не видит.
- Топ-30 запросов (get_search_analytics, query): всё английское; кириллицы нет ни в одном из 49 рядов query×country. Вывод о русскоязычном спросе по этим данным сделать нельзя — он, если есть, лежит в www-property.
- Кластеры с позицией 1 и нулём кликов: `pembroke pines movers` 12 показов, `dania beach movers` 9, `movers pembroke pines fl` 6, `easy state moving` 6, `easy move` 5, `easy movers` 5, `moving companies pembroke pines fl` 5, `movers hollywood fl` 5, `dania beach commercial movers` 4 (поз. 1.2), `movers in pembroke pines` 4.
- Запросы с показами на 2-й и дальше странице: `hollywood fl moving and storage` 9 показов поз. 22, `local moving company pembroke pines` 4 / 21, `hollywood fl movers` 3 / 21, `miramar movers` 2 / 21, `lauderdale lakes commercial movers` 2 / 21, `north miami commercial movers` 2 / 41, `long distance movers pembroke pines` 1 / 41, `movers broward` 1 / 46.
- У Dania Beach, Miramar, Lauderdale Lakes, Pembroke Park **нет своих страниц** (список роутов в `src/app`), у Pembroke Pines есть.

Sitemaps (get_sitemaps + get_sitemap_details):

| Путь | Статус | Submitted / indexed |
|---|---|---|
| `https://easy-move-florida.com/sitemap.xml` | Valid, скачан 2026-09-28 | 96 / **0** |
| `https://easy-move-florida.com/ru/miami-movers` | Has errors (1) | — |
| `https://easy-move-florida.com/ru/aventura-movers` | Has errors (1) | — |
| `https://easy-move-florida.com/ru/sunny-isles-movers` | Has errors (1) | — |
| `https://easy-move-florida.com/pricing` | Has errors (1) | — |

Четыре нижних — это страницы, отправленные как sitemap. 0 из 96 проиндексированных — потому что все 96 URL в sitemap на www и к этой property не относятся; это не «сайт не в индексе».

URL inspection (batch_url_inspection + check_indexing_issues, 10+5 URL):

| URL (bare) | coverage_state | last crawl |
|---|---|---|
| `/` | Page with redirect | 2026-09-16 |
| `/services/*` (5 шт.), `/ru`, `/ua/miami-movers` | URL is unknown to Google | never |
| `/miami-movers`, `/ru/miami-movers` | Redirect error | 2026-09-18 |
| `/pricing`, `/hollywood-movers`, `/aventura-movers` | Redirect error | 2026-05-12 |
| `www.…/`, `www.…/miami-movers`, `www.…/ru/miami-movers` | HTTP 403 «You do not own this site, or the inspected URL is not part of this property» | — |

Сводка check_indexing_issues: total 10, indexed 0, canonical_issues 0, robots_blocked 0, fetch_issues 9. «Redirect error» сегодня не воспроизводится: curl даёт один 301 на www и 200 на www. Что было 09-18 и 05-12 — по API не видно; перепроверять надо уже из www/domain-property (часть C).

### geo-optimizer

| Замер | Результат | Источник |
|---|---|---|
| `geo_audit https://easy-move-florida.com/` | **79/100**, band good — **совпало с базой 2026-10-01** | geo_audit |
| `geo_audit https://www.easy-move-florida.com/ru` | **73/100**, band good | geo_audit |
| `geo_check_bots` | allowed 26, blocked 1 (PetalBot — заблокирован намеренно в `src/app/robots.ts:48`), missing 0, citation_bots_ok true | geo_check_bots |
| `geo_ai_discovery` | endpoints_found 0: нет `/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json`, `/ai/service.json` | geo_ai_discovery; curl подтверждает 404 на всех четырёх |

Разбивка по категориям (score_breakdown из geo_audit; максимумы инструмент не сообщает):

| Категория | EN `/` | RU `/ru` |
|---|---|---|
| robots | 18 | 18 |
| llms | 16 | 16 |
| schema | 13 | 10 |
| meta | 14 | 14 |
| content | 12 | 10 |
| signals | 3 | 3 |
| ai_discovery | 0 | 0 |
| brand_entity | 6 | 5 |
| negative_penalty | −3 | −3 |

Что именно падает (поля geo_audit, подтверждённые curl по 4 живым страницам `/`, `/ru`, `/miami-movers`, `/ru/miami-movers`):

- `has_date_modified: false` на обеих; в HTML четырёх страниц `dateModified` встречается 0 раз. Есть только в Article блога (`src/app/blog/[slug]/page.tsx:93`). Это же отмечают perplexity (50 на RU, 62 на EN) и google_ai (79) в platform_citation и trust_stack.consistency.
- `signals.lang_value: "en"` **на `/ru`**; curl: `<html lang="en">` на `/ru` и `/ru/miami-movers`. RU-поддерево помечено `<div lang="ru">` (`src/app/ru/layout.tsx:38`), но инструменты и часть краулеров читают атрибут `<html>`.
- `has_rss: false`; `/feed.xml`, `/rss.xml` → 404.
- ai_discovery = 0 (см. выше).
- EN: `prompt_injection.hidden_text_count 14`, `aria_hidden_injection_count 14`, severity suspicious, penalty −3. Все 14 — ответы FAQ-аккордеона (`src/components/home/FAQSection.tsx:137`, `aria-hidden={!isOpen}`). Не клоакинг, но штраф реальный и его снимает смена разметки.
- RU: `has_faq: false`, `faq_depth 0`, `has_heading_hierarchy: false`, word_count 756 против 3054 на EN, `has_keyword_stuffing: "movers" 9.6%`; EN — `"move" 2.7%`.
- Обе: `kg_pillar_count 0`, sameAs — 3 уникальных URL (Google Maps ×2, Thumbtack), каждый продублирован в Organization и MovingCompany.
- Обе: `schema_desc_matches_meta: false`.
- Обе: `has_potential_action false` — инструмент просит SearchAction. **Не делаем**: поиска на сайте нет, комментарий в `src/app/layout.tsx:305` уже объясняет, что это ложный сигнал.
- hreflang и canonical **в порядке**: `has_hreflang true, hreflang_count 4` (en/ru/uk/x-default), canonical на всех четырёх страницах, International GEO 3/3. Sitemap несёт alternates из `src/lib/seo/routes.ts`.
- alt: `image_alt_quality 5/5`, generic 0, missing 0 на обеих страницах (инструмент видит 2 картинки на страницу).
- cdn_check EN: все 6 ботов получили 301 с телом 15 байт — аудит EN-версии фактически по редиректу с apex; схемы и контент он дочитал по www (http_status 200, page_size 218777). В следующий раз запускать по `https://www.easy-move-florida.com/`.

Найдено curl/грепом помимо аудита:

- `/images/about.png` → **404**; файл в репо `public/images/About.png` (200). Ссылки: `src/app/about/page.tsx:133`, `src/app/ru/about/page.tsx:120`. Vercel регистрозависим.
- Переключатель языка: на `/ru/russkie-gruzchiki-miami` две ссылки ведут на `/russkie-gruzchiki-miami` → **404** (curl). На `/russian-speaking-movers-miami` RU-ссылка ведёт на `/ru`, а не на `/ru/russkie-gruzchiki-miami`. Причина: `src/components/layout/Header.tsx:60-72` берёт голый slug и не знает про `CUSTOM` в `routes.ts`; там же уже есть `keyForSlug()` и `pathFor()`, которыми это чинится.
- Sitemap lastmod: 32 URL с датой 2026-07-30, 20 — 08-24, 15 — 08-25, 12 — 08-30, 6 — 09-05, 1 — 09-15, 10 — май/март. Правки V3 от 2026-09-18 (`docs/REINDEX_AFTER_V3.md`, 50 URL) в lastmod **не отражены** — таблица `LASTMOD` в `src/app/sitemap.ts:13-68` ведётся руками.
- `og:image` на `/` и `/ru` — `/images/Hero.png`, объявлен 1200×630; при этом в `src/app/` лежат `opengraph-image.png` / `twitter-image.png` 1200×630, которые проигрывают явному `metadata.openGraph.images`. Реальный размер Hero.png — по отчёту субагента 1024×1536, перепроверить при реализации.
- `WebSite.inLanguage: ['en-US','ru-RU']` — украинской версии нет (`src/app/layout.tsx:313`); `page.tsx` главной: `openGraph.alternateLocale` только `ru_RU`.
- `src/app/services/[slug]/page.tsx:143` — голый `<img>` (правило CLAUDE.md: только `next/image`).
- alt на страницах городов: шаблон «Professional movers in {city}» при том, что одна и та же фотография (`Miami.jpg`, `Fort-Lauderdale.jpg`, `Boca-Raton.jpg`) переиспользуется на разных городах (`src/lib/data/cities.ts`, `citiesRu.ts`, `citiesUa.ts`). alt заявляет город, которого на фото нет.
- `src/app/robots.ts:35,58` — комментарии «no other locales exist / RU at /ru/», UA уже живёт. `scripts/claims-guard.mjs` сканирует `public/llms.txt`, которого больше нет (llms.txt — route handler).
- DNS: NS `ns14.wixdns.net`, `ns15.wixdns.net` (nslookup) — TXT для domain-property добавлять в Wix. `google-site-verification` meta на www сейчас **не рендерится** (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` не задан); файл `google98271d5d4916dc9d.html` на www отдаётся с 200.

---

## A. Техническое — смысл для клиента не меняет

Порядок выбран так: сначала то, что 100 % безопасно и проверяется одним curl; потом «один источник» для дат; потом новые endpoint'ы; в конце — единственная структурная правка (lang на `<html>`). Каждый шаг — отдельный коммит в `main`, пуш = деплой (1–3 мин), и **проверка на живом адресе до следующего шага**. Перед каждым пушем `npm run build` зелёный (четыре гарда на prebuild). IndexNow-пинг — один раз, в самом конце, не после каждого шага (`docs/REINDEX_AFTER_V3.md`: повторные пинги без изменений — спам).

Как понять, что деплой уже новый, а не старый кэш: `curl -sI https://www.easy-move-florida.com/ | grep -i x-vercel-id` до и после — id должен смениться, и только потом грепать содержимое.

### A1. `About.png` — 404 на странице «О нас»
- Файлы: `src/app/about/page.tsx:133`, `src/app/ru/about/page.tsx:120` → `src="/images/About.png"`.
- Зачем: картинка на /about и /ru/about сейчас не грузится.
- Проверка: `curl -s https://www.easy-move-florida.com/about | grep -c 'About.png'` ≥ 1; `curl -sI …/images/About.png` → 200 image/png. GSC/geo это не меряют, это просто сломанная страница.

### A2. Переключатель языка — 404 на русском лендинге
- Файл: `src/components/layout/Header.tsx:60-72`. Вместо `bare && PAIRED_PATHS.ru.includes(bare)` — `keyForSlug(bare, currentLocale)` → `pathFor(key, 'ru'|'uk')` из `src/lib/seo/routes.ts:116,182`. `PAIRED_PATHS` после этого может стать не нужен (проверить `scripts/links.test.ts`).
- Зачем: внутренняя ссылка на 404 на единственной странице, по которой сайт №1 («russian speaking movers miami», `docs/AI_VISIBILITY_AUDIT_2026-09-05.md`).
- Проверка: `curl -s …/ru/russkie-gruzchiki-miami | grep -c 'href="/russkie-gruzchiki-miami"'` → 0; `grep -c 'href="/russian-speaking-movers-miami"'` ≥ 1; на `/russian-speaking-movers-miami` ссылка на `/ru/russkie-gruzchiki-miami` есть. `npm run build` (links.test).

### A3. Один источник дат: sitemap lastmod + `dateModified` в JSON-LD
- Сейчас дата страницы живёт только в `src/app/sitemap.ts:13-68` и не попадает в schema. Вынести таблицу в `src/lib/seo/lastmod.ts` (рядом с `routes.ts`), ключ — тот же route key, что в `routes.ts`; `sitemap.ts` и схемы читают оттуда.
- Эмитить `dateModified` (и `datePublished`, если дата известна) в: `cityPageNode` (`src/lib/seo/schema.ts:61`, WebPage на 41 странице городов), `CostPage.tsx`, `pricing/page.tsx`, `services/[slug]/page.tsx`, FAQPage главной; на `/` и `/ru` добавить WebPage-узел с `dateModified` и `isPartOf: /#website`. В `WebSite` дату не ставить — она про сайт, а не страницу.
- Даты: заполнить по факту. Для 50 URL из `docs/REINDEX_AFTER_V3.md` — 2026-09-18; остальные оставить как есть. Не ставить «сегодня» всем подряд — именно от этого ушли в комментарии `sitemap.ts:10`.
- Гард: в `scripts/links.test.ts` (или новый `lastmod.test.ts`) — у каждого URL в sitemap есть явная запись, fallback `'2026-07-30'` в `lastmod()` убрать. Тест должен сначала упасть на текущем коде (у `/quote`, `/reviews`, cost-страниц дат нет в таблице).
- Зачем: `has_date_modified false` — единственный пункт, который называют сразу schema, trust_stack, content_freshness, perplexity и google_ai в geo_audit; у Google lastmod, который не меняется при реальных правках, перестаёт учитываться.
- Проверка: `curl -s …/miami-movers | grep -o '"dateModified":"[^"]*"'` → `2026-09-18`; `curl -s …/sitemap.xml | grep -A1 '<loc>…/miami-movers</loc>' | grep lastmod` → та же дата (один источник — одна дата); `geo_audit https://www.easy-move-florida.com/` → `schema.has_date_modified: true`, `content_freshness.freshness_level` ≠ `stale`; через 1–2 недели в GSC (после части C) — `last_crawled` у этих URL новее 09-18.

### A4. AI discovery endpoints из существующих данных
- Новые route handlers (`export const dynamic = 'force-static'`, как `src/app/llms.txt/route.ts`):
  - `src/app/.well-known/ai.txt/route.ts` — текст с теми же правилами, что `robots.ts` (allow всем AI-ботам из `AI_BOTS`, sitemap, llms.txt, контакт для вопросов). Один источник: импортировать `AI_BOTS` из `robots.ts`, не переписывать список.
  - `src/app/ai/summary.json/route.ts` — name, description (из `layout.tsx` metadata), url, phone (`contact.ts`), hours (`hours.ts`), languages, services (имена из `data/services.json`), sameAs (из `credentials.ts`). **Ни одного нового факта** — только то, что уже рендерится.
  - `src/app/ai/faq.json/route.ts` — вопросы/ответы из FAQ. Сейчас 14 Q&A живут внутри `FAQSection.tsx`; вынести в `src/lib/data/faq.ts`, компонент и `faq.json` читают из него (иначе будет вторая копия).
  - `src/app/ai/service.json/route.ts` — список услуг из `data/services.json` без цен (цены — часть B4).
- `next.config.mjs:92` — добавить эти пути в правило `max-age=3600, must-revalidate`.
- Формат — по спецификации geo-checklist.dev (ресурс `geo://ai-discovery-spec` у MCP-сервера); `geo_fix --only ai_discovery` даёт черновик, но пишем сами из data-файлов.
- Зачем: категория ai_discovery = 0 на обеих страницах; это самая дешёвая категория из восьми.
- Проверка: `geo_ai_discovery` → `endpoints_found 4`, `summary_valid true`, `faq_count 14`; `curl -sI …/ai/summary.json` → 200 `application/json`; `geo_audit` по www и по `/ru` — ai_discovery > 0; `claims-guard` на prebuild (новые файлы в `src` он сканирует).

### A5. RSS-лента блога
- `src/app/feed.xml/route.ts` из `getAllBlogPosts()` (11 постов); в `src/app/layout.tsx` metadata → `alternates.types['application/rss+xml']`. Заголовки кэша — туда же, в `next.config.mjs:92`.
- Зачем: `has_rss false`, рекомендация №8 geo_audit на обеих страницах; у двух русских постов в ленте указать язык.
- Проверка: `curl -s …/feed.xml | grep -c '<item>'` = число постов в `src/lib/data/blog.ts` (сравнить с `grep -c slug`); `curl -s …/ | grep -c 'application/rss+xml'` = 1; `geo_audit` → `signals.has_rss true`.

### A6. Гигиена schema и OG без фактов о бизнесе
- `src/app/layout.tsx:313` `WebSite.inLanguage` → добавить `uk-UA`; `src/app/page.tsx` `openGraph.alternateLocale` → `['ru_RU','uk_UA']`.
- `openGraph.images`: либо убрать явный `images` в `layout.tsx`, `ru/layout.tsx`, `ua/layout.tsx`, чтобы работали `src/app/opengraph-image.png` / `twitter-image.png` (1200×630 по файловой конвенции), либо указать их явно; объявленные width/height должны совпадать с реальными (`Hero.png` сейчас объявлен 1200×630 и не является логотипом — `Organization.logo` см. B14).
- `src/components/home/FAQSection.tsx` FAQPage → `inLanguage: 'en'` (у `/ua` уже есть, `faqNode` в `schema.ts:43` умеет).
- sameAs: оставить один список на `/#organization` (Organization и MovingCompany делят `@id`, дубль ничего не добавляет).
- `src/app/packing-services/page.tsx:14` — удвоенное «Call 786-305-1844.» в description.
- `src/app/robots.ts:35,58` — комментарии про локали; `scripts/claims-guard.mjs` — убрать несуществующий `public/llms.txt` из списка сканирования.
- Проверка: `curl -s …/ | grep -o '"inLanguage":\[[^]]*\]'` содержит `uk-UA`; `grep -o '<meta property="og:image"[^>]*>'` → новый файл, и `curl -sI` по нему 200 image/png; `geo_schema_validate` без ошибок.

### A7. FAQ-аккордеон без `aria-hidden` на тексте
- `src/components/home/FAQSection.tsx:135-137`: заменить `max-height + aria-hidden={!isOpen}` на нативные `<details>/<summary>` (контент в DOM, не скрыт для AT и краулера) или оставить ответ видимым для скринридера и прятать только визуально.
- Зачем: `prompt_injection.hidden_text_count 14`, penalty −3 на EN. Это 3 балла из 79 ровно за разметку.
- Риск: UI. Проверить на 375 px, шрифты не трогать (правила CLAUDE.md).
- Проверка: `geo_audit` www → `prompt_injection.severity clean`, `negative_penalty 0`; визуально на телефоне аккордеон открывается/закрывается.

### A8. `<html lang>` по локали (структурная правка — последней)
- Сейчас: один root layout с `lang="en"`, RU/UA — `<div lang>` (`src/app/ru/layout.tsx:34-38` объясняет, почему: `headers()` выбил бы все роуты из static).
- Правильный путь в Next 14 без динамики — **несколько root layout'ов**: `src/app/(en)/layout.tsx` (`<html lang="en">`, туда переезжают все английские папки), `src/app/ru/layout.tsx` и `src/app/ua/layout.tsx` становятся root (`<html lang="ru">` / `"uk"`). Общее (шрифты, Clarity, JSON-LD организации, `<Analytics/>`, `DeferredTagManager`) — в один компонент `src/components/layout/RootShell.tsx`, чтобы не было трёх копий. Верхний `app/layout.tsx` удаляется; `not-found.tsx`, `opengraph-image.png`, `robots.ts`, `sitemap.ts`, `llms.txt` остаются на верхнем уровне. URL не меняются. Переход между языками станет полной перезагрузкой — для языкового переключателя это нормально.
- Зачем: `signals.lang_value "en"` на `/ru`; International GEO уже 3/3, но lang читают Bing, Yandex и часть AI-краулеров именно с `<html>`.
- Риск: самый большой из списка — `git mv` ~45 папок. Делать на ветке, `npm run build` + обойти все 96 URL из sitemap curl'ом (ожидать 96×200) **до** пуша в `main`.
- Проверка после деплоя: `curl -s …/ru | grep -o '<html[^>]*lang="[a-z]*"'` → `ru`; `/ua` → `uk`; `/` → `en`; `for u in $(curl -s …/sitemap.xml | grep -oP '(?<=<loc>)[^<]+'); do curl -so /dev/null -w "%{http_code} $u\n" "$u"; done | grep -vc '^200'` → 0; hreflang на тех же 4 страницах не изменился; `geo_audit …/ru` → `signals.lang_value "ru"`.
- Дешёвая альтернатива, если не хочется двигать папки: оставить как есть. Клиентский скрипт, который переписывает `document.documentElement.lang`, geo_audit не увидит (он читает сырой HTML), поэтому как «фикс» не предлагаю.

### A9. alt на страницах городов — описывать фото, а не город страницы
- `src/components/city/CityMoversPage.tsx:187/217/249` (`heroAlt`): если `heroImage` — общая `Miami.jpg`, alt не должен утверждать «movers in Weston». Вариант: alt из поля картинки (`src/lib/data/cities.ts` — добавить `heroAlt` рядом с `heroImage`, один раз на файл), а не из имени города.
- Зачем: geo_audit ставит alt 5/5, но это проверка «не пустой/не generic», а не «правдивый». Правило CLAUDE.md — alt описательный; описательный про Майами на странице Weston — неправда в разметке.
- Проверка: `curl -s …/weston-movers | grep -o 'alt="[^"]*"' | head` — нет «Weston» на `Miami.jpg`; то же для `/ru/weston-movers`.

### A10. Мелочи, можно в один коммит с A6
- `src/app/services/[slug]/page.tsx:143` голый `<img>` → `next/image` (2 МБ PNG).
- `src/app/services/page.tsx:162` — путь `'/images/Long distance.png'` с пробелом; переименовать файл и ссылку.

### После всего A
1. `npx tsx scripts/indexnow-ping.ts --dry-run`, затем без флага — один раз (Bing/Copilot/Yandex).
2. Google — только через Search Console после части C: переотправить sitemap, Request indexing для `/`, `/ru`, `/pricing`, `/miami-movers`, `/russian-speaking-movers-miami`, `/ru/russkie-gruzchiki-miami`.
3. Контрольный замер: `geo_audit` по `https://www.easy-move-florida.com/` и `/ru`, записать оба числа рядом с 79 и 73 в `docs/` (где — см. ниже), с датой и названием инструмента.
4. Записать строки в `docs/EASYMOVE_REQUESTS.md` (или тот `docs/*_REQUESTS.md`, что заведён) — коммит на каждый пункт.

---

## B. Меняет смысл для клиента — только на согласование, не реализовывать

| # | Что и где | Почему спрашиваю |
|---|---|---|
| B1 | `areaServed` в `src/app/layout.tsx` — 17 городов. Нет 7 с собственными страницами (Pembroke Pines, Weston, Coral Springs, Sunrise, Boynton Beach, Bal Harbour, North Miami Beach); есть 5 без страниц (Brickell, Dania Beach, Pompano Beach, Palm Beach, North Miami). | Зона выезда — факт о бизнесе. GSC: Dania Beach даёт 17 показов на позиции 1 без страницы; какой список официальный — решаешь ты. |
| B2 | `foundingDate: '2021'` (`layout.tsx:160`, помечено TODO confirm). | Непроверенный факт в schema. Подтвердить год или убрать поле. |
| B3 | `GeoCoordinates 26.0038, -80.158` (`src/lib/data/contact.ts`, TODO). | Взять точку из Google Business Profile, а не приблизительную. |
| B4 | Цены в Service/Offer, которых нет в прайсе: residential-moving `450 flat-rate`, storage-solutions `200 per-month` (`data/services.json:38-39, 205-206`), packing `237` (`packing-services/page.tsx:37-58`, строки 69-70 говорят «не подтверждено»). Минимальный чек по llms.txt — $516. | Либо подтвердить, либо убрать Offer у этих трёх услуг. Это именно то, что ассистент цитирует дословно. |
| B5 | `/ru/pricing` schema: названия ставок «2/3/4 грузчика + грузовик» (`src/app/ru/pricing/page.tsx:145-213`). llms.txt прямо запрещает описывать трак как включённый в час. | Нужна твоя формулировка на русском. |
| B6 | `/pricing` Service: `offerCount: 3`, а строки с бригадой из 4 ($219) нет (`src/app/pricing/page.tsx:150-217`). | Цена уже на сайте, но добавление строки в schema = публикация цены; подтверди. |
| B7 | `sameAs`: 3 ссылки, `kg_pillar_count 0`. Добавить можно только реальные профили (LinkedIn / Facebook / Instagram / Yelp — Yelp отсутствует по `docs/AI_VISIBILITY_AUDIT_2026-09-05.md`). | Нужны URL от тебя; придумывать нельзя. |
| B8 | `/ru` главная: FAQ нет (`has_faq false`), 756 слов против 3054 EN, `has_heading_hierarchy false`, «movers» 9.6 % (geo_audit). Перевод 14 EN-вопросов на русский + подзаголовки. | Новый текст на странице клиента — утверждать формулировки. |
| B9 | Страницы для городов из GSC без страниц: Dania Beach (17 показов, поз. 1), Miramar, Lauderdale Lakes, Pembroke Park. | Это обещание «мы туда ездим». Решение твоё. |
| B10 | Открытые пункты `docs/CLAIMS_TO_CONFIRM.md`: #16, #19 (антиквариат XVIII века, Steinway/Yamaha/Bösendorfer, винные коллекции — `serviceContent.ts:224`), #17 (цены NY→Miami в блоге). | Там и лежат. |
| B11 | `/reviews`: `REVIEWS = []`, ItemList не рендерится; при заполнении `ratingValue` захардкожен `'5'` (`reviews/page.tsx:89`). | Отзывы — только реальные, с согласием. |
| B12 | «hollywood fl moving and storage» — 9 показов на позиции 22. Страница storage есть, но с ценой из B4 и формулировкой «свой/партнёрский склад» (CLAIMS). | Позиционирование storage. |
| B13 | `contactPoint.availableLanguage: English, Russian`, а `knowsLanguage: ['en','ru','uk']` — расходятся. | Говорят ли по-украински по телефону — факт. |
| B14 | `Organization.logo` = `Hero.png` (фото, не логотип). | Нужен файл логотипа; если его нет — убрать поле. |
| B15 | `ru/about/page.tsx:121` alt «премиум-бригада переездов…» — маркетинговое утверждение в alt. | Твоя формулировка. |

---

## C. Вне репозитория — Search Console

Факты (list_properties): `https://easy-move-florida.com/` — siteOwner; `https://www.easy-move-florida.com/` — **siteUnverifiedUser**; `sc-domain:easy-move-florida.com` — нет. DNS домена — Wix (`ns14/ns15.wixdns.net`).

### C1. Domain-property (закрывает www, bare, http, https одним махом) — рекомендую
1. search.google.com/search-console → выпадающий список property → **Add property** → левая карточка **Domain** → `easy-move-florida.com` → Continue.
2. Google покажет TXT-запись вида `google-site-verification=…`. Скопировать.
3. Wix: wix.com → Domains → `easy-move-florida.com` → **Advanced** → **Edit DNS** → TXT (Text) → Add record: Host `@`, Value — строка из п. 2, TTL по умолчанию → Save.
4. Проверить, что запись видна: `nslookup -type=TXT easy-move-florida.com` (сейчас — ни одной google-строки). Обычно минуты, Wix — до часа.
5. Вернуться в Search Console → **Verify**. Если «не найдено» — подождать и нажать ещё раз, не пересоздавать запись.
6. В новой property: **Sitemaps** → добавить `https://www.easy-move-florida.com/sitemap.xml`. Отчёты по домену появятся через 1–3 дня; история до верификации у Google есть, подтянется.

### C2. Быстрый вариант для www URL-prefix (если C1 ждёт DNS)
- В списке property выбрать `https://www.easy-move-florida.com/` → Settings → **Ownership verification**.
- **HTML file**: файл `google98271d5d4916dc9d.html` уже отдаётся с www (curl 200). Если Google предлагает именно это имя — просто Verify. Если имя другое — положить новый файл в `public/` (это правка в репо, но без смысла для клиента — можно в A).
- **HTML tag**: альтернатива — в Vercel добавить env `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (его читает `src/app/layout.tsx:93`), Redeploy, затем Verify. Сейчас meta не рендерится.
- Вариант «siteUnverifiedUser» означает, что property создана другим аккаунтом (вероятно, эпоха Wix). После верификации проверить **Users and permissions** — кто там ещё owner.

### C3. Убрать четыре ложных sitemap
- В property `https://easy-move-florida.com/` → Sitemaps → у `…/ru/miami-movers`, `…/ru/aventura-movers`, `…/ru/sunny-isles-movers`, `…/pricing` → ⋮ → **Remove**. Это страницы, а не sitemap; «Has errors» будет висеть вечно. (Могу сделать через MCP `delete_sitemap` по твоему слову — это уже запись, поэтому не трогал.)

### C4. После верификации — что проверить первым
1. URL inspection по www: `/`, `/miami-movers`, `/pricing`, `/ru/miami-movers` — ожидать «Indexed», а не «Redirect error».
2. Performance: должны появиться строки по 96 страницам, а не одна. Сравнить с 291 показом / 0 кликов bare-property — тогда станет видно, где на самом деле клики.
3. International targeting / hreflang: ошибки «нет обратных тегов» по 9 русским страницам и `/boca-raton-movers` должны отсутствовать (`docs/REINDEX_AFTER_V3.md`, последний абзац).
4. Request indexing — лимит около десятка в день, список в «После всего A».

---

## Что я не смог проверить и почему
- Любые данные по www-URL в GSC — HTTP 403, пока нет части C.
- Русскоязычный спрос — в bare-property кириллических запросов нет (49 рядов); вывода нет, пока нет www/domain-property.
- История «Redirect error» (09-18, 05-12) — API отдаёт только текущее состояние; curl сегодня редиректов-ошибок не находит.
- geo_audit EN шёл с apex и получил 301 в cdn_check; контент дочитан по www. Контрольный замер — по www.
- Размеры `Hero.png` / `Miami.jpg` — из чтения файлов субагентом, при реализации A6 перемерить (`identify` или `sharp`).

---

## Исполнение части A — 2026-10-01

Всё ниже уже на проде; каждый шаг проверялся на живом адресе после деплоя.

| Шаг | Коммит | Чем проверено |
|---|---|---|
| A1 `About.png` | `8cc5821` | `/about`, `/ru/about` ссылаются на `About.png`, оптимизатор отдаёт 200 image/png |
| A2 переключатель языка | `8cc5821` | на `/ru/russkie-gruzchiki-miami` ссылок на `/russkie-gruzchiki-miami` 0, EN ведёт на `/russian-speaking-movers-miami` |
| — найдено при проверке A2: `/russian-speaking-movers-miami` считался русской страницей (префикс `/ru`) | `c7de68b` | RU-переключатель на английской странице ведёт на `/ru/russkie-gruzchiki-miami` |
| A3 даты: `lastmod.ts`, `dateModified` | `ef09fd5` | `dateModified` 2026-09-18 на `/`, `/ru`, `/ua`, `/miami-movers`, `/ru/miami-movers`, `/pricing`; sitemap: 88 URL на 09-18, 8 постов блога со своими датами |
| A4 `ai.txt`, `/ai/*.json` | `1520123` | `geo_ai_discovery`: endpoints_found 4, summary_valid true, faq_count 14 |
| A5 RSS | `7cfff2c` | `/feed.xml` 200, 11 item на 11 постов |
| A6 share-картинки с реальными размерами | `a692d84` | 83 файла через `ogImage`/`ogCard`; `/` отдаёт `opengraph-image.png` 1200×630 |
| A6 гигиена schema/meta | `7291944` | `inLanguage` с `uk-UA`, FAQ `inLanguage: en`, один `SAME_AS` |
| A7 FAQ без `aria-hidden` | `9e8162d` | детектор geo-optimizer на живой главной: было 14/14 suspicious, стало 0/0 clean; 375 px — аккордеон открывается и закрывается |
| A8 `<html lang>` по языку | `9c7027a` | 96 из 96 URL sitemap на проде: 200 и `lang` = en/ru/uk по сегменту |
| A9 alt по содержанию фото | `a82718b` | `/weston-movers` больше не называет фото Форт-Лодердейла «movers in Weston» |
| A10 `next/image` на страницах услуг | `e18f62d` | все пять героев услуг отдаются оптимизатором, 200 |
| IndexNow | — | 96 URL, HTTP 200 |

Не сделано из A10: файлы с пробелами в имени (`Long distance.png` и др.) не
переименованы — они работают как `%20`, имена лежат в админских данных, а
переименование сломало бы уже проиндексированные адреса картинок.

### geo_audit до и после (www, 2026-10-02 05:09 UTC)

| Страница | До | После |
|---|---|---|
| `/` | 79 | 88 |
| `/ru` | 73 | 83 |

| Категория | `/` до → после | `/ru` до → после |
|---|---|---|
| signals | 3 → 6 | 3 → 6 |
| ai_discovery | 0 → 6 | 0 → 6 |
| brand_entity | 6 → 6 | 5 → 6 |
| negative_penalty | −3 → −3 | −3 → −3 |

`negative_penalty` остался: его теперь дают «keyword stuffing» (`move` 2.7 % на
главной, `movers` 9.7 % на `/ru`) и «overlay» — это текст и разметка, часть B8.

Часть B (15 вопросов) и часть C (Search Console) ждут владельца.

### Решения владельца по части B — 2026-10-01

- **B4** жилой переезд: почасово, как на `/pricing` (`5ce611a`). Хранение: $200/мес верно, оставлено. Упаковка: $237 за студию верно, TODO снят, таблица считается из `PACKING_HOURLY_RATE`.
- **B5** `/ru/pricing`: «2/3/4 грузчика» без «+ грузовик» на карточках и в разметке (`5ce611a`).
- **B1** 24 города, **B2** 2021 подтверждён, **B6** строка $219 в `/pricing`, **B13** en/ru, **B14** логотип убран (`7ccad82`).
- About.png убран с `/about` и `/ru/about` и удалён: ИИ-картинка с надписью «EASY MOVE ELITE NATIONWIDE», стала видна после фикса A1 (`7ccad82`).
- **B8** FAQ на `/ru`: черновик перевода `docs/RU_FAQ_DRAFT_2026-10-01.md`, ждёт утверждения.
- **B9** четыре страницы городов (`10d3094`). **B10** №16/№19 закрыты ответом владельца (`76fc59e`). **B15** снят вместе с картинкой.
- **B3** координаты убраны, адрес Hollywood 33020 подтверждён; **B8** русский FAQ опубликован (`790d168`). geo_audit `/ru`: 83 → 87.
- Ждут: **B7** ссылки на реальные профили для sameAs, **B11** реальные отзывы для `/reviews`; часть **C** (TXT в Wix) и удаление четырёх ложных sitemap в GSC руками.
