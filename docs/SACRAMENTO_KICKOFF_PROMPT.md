# Easy Move Sacramento — как запустить второй сайт

**Дата:** 2026-09-03 · **Решения Евгения:** отдельный форк-репо `E:\AI Projects\easymovesc`; домен ещё не куплен; EN + RU + UA с первого релиза.

Документ из трёх частей: (A) как создать папку и откуда запускать, (B) промт, который вставляется в Claude Code в новой папке, (C) что может дать только Евгений. Часть B — самодостаточна: она рассчитана на то, что Claude в новой папке ничего не помнит об этом разговоре.

Почему форк, а не второй деплой из этого репо: easy-move-florida.com живой, цитируется в ChatGPT и приносит заявки. Любая правка под Сакраменто в общем репо — риск для Флориды, а весь флоридский контент (3 300 строк городских данных, 1 159 строк блога) поехал бы в калифорнийский бандл. Конфиг рынка с ветки `feat/multi-market-foundation` при этом переносим: он и был написан как единый источник фактов.

---

## Часть A. Создать папку

Выполнить в PowerShell один раз, до первого запуска Claude:

```powershell
# 1. Локальный клон с полной историей: blame, ветки и аудиты остаются доступны
git clone "E:\AI Projects\easymove" "E:\AI Projects\easymovesc"
cd "E:\AI Projects\easymovesc"

# 2. Отвязать от флоридского remote, чтобы случайный push не ушёл в easymove
git remote rename origin florida
git remote set-url --push florida DISABLED

# 3. Забрать конфиг рынка одним коммитом (не сливать всю ветку)
git fetch florida feat/multi-market-foundation
git checkout -b feat/sacramento-foundation
git cherry-pick 89c94d5

# 4. Новый GitHub-репо и origin (после создания репо на GitHub)
gh repo create easymovesc --private --source=. --remote=origin
```

Потом:

1. Claude Code desktop → **Open folder** → `E:\AI Projects\easymovesc` (или в терминале `cd` в папку и `claude`).
2. Включить **Plan mode** (Shift+Tab). Промт сам содержит стоп после аудита и плана, plan mode — вторая страховка.
3. Вставить Часть B целиком.
4. Claude получит `CLAUDE.md` репо (клонирован) и глобальный `~/.claude/CLAUDE.md`. Оба действуют.

Vercel: **новый проект**, не второй домен на флоридском. Переменные окружения заводятся с нуля (список в Части C).

---

## Часть B. Промт

Скопировать всё между ограничителями.

````markdown
# Kickoff: Easy Move Sacramento

Ты работаешь в `E:\AI Projects\easymovesc` — это клон репо `E:\AI Projects\easymove`
(сайт easy-move-florida.com: живой, приносит заявки, цитируется в ChatGPT). Из него нужно
сделать **второй, независимый сайт для филиала в Сакраменто, Калифорния**. Флоридский репо —
только справочник, его не менять; remote `florida` — read-only.

## Цель бизнеса

№1 по органическому выводу в AI-чатах (ChatGPT, Perplexity, Claude, Google AI Overviews,
Яндекс/Алиса, Bing Copilot) по запросам о переезде в метро Сакраменто **на русском и
украинском**, плюс английский. Механика, доказанная во Флориде (`audit/AI-VISIBILITY.md`,
`docs/TWO_STATE_SEO_STRATEGY.md`): серверный рендеринг, открытые роботы для AI-краулеров,
`llms.txt` с фактами и ценами, FAQPage-схема, страницы формулы «язык + город + районы», и
главное — **ни одной цифры, которая противоречит другой**. Единственная позиция №1 во Флориде —
«russian speaking movers aventura». В Сакраменто больше украинцев, чем в любом другом метро
Калифорнии, и первое место в США по их доле. Это и есть стратегия.

## Что прочитать ПЕРВЫМ, до любого кода

1. `~/.claude/CLAUDE.md` (глобальные правила) и `./CLAUDE.md` (правила проекта). Учти:
   раздел «Section Order» в `./CLAUDE.md` устарел — называет компоненты, которых нет
   в `src/components/` (StatsBar, HomepageCalculator, WorkGallery, ProcessSection). Не
   восстанавливать их: они удалены аудитом за ложные «4.9★» и «truck included».
2. `docs/TWO_STATE_SEO_STRATEGY.md`, разделы 4–8: закон Калифорнии, домены, связь
   сущностей в schema, приоритет городов по диаспоре, что CA-сайту запрещено на старте,
   что даёт только владелец.
3. `audit/AI-VISIBILITY.md`, `audit/SITE-AUDIT.md`, `audit/CONTENT-FACT-CHECK.md`,
   `audit/CHANGELOG.md` — почему сайт такой и какие ошибки уже стоили денег.
4. `src/config/markets/types.ts`, `src/config/markets/ca.ts`, `src/config/markets/fl.ts`,
   `src/config/market.ts`, `src/lib/market-guard.ts`, `scripts/market-check.ts` — конфиг
   рынка (cherry-pick `89c94d5`). Инварианты: в CA **нет `rating`**, `doubleDriveTime: true`,
   `licence.permitNumber: null`, `nap.streetAddress: null`. На ветке ничего из этого не
   подключено ни к одной странице, `marketOnly()` нигде не вызывается, а упомянутый в `ca.ts`
   файл `docs/SACRAMENTO_LAUNCH_PLAN.md` не существует — ты его напишешь (см. Фазу 1).
5. `src/lib/data/credentials.ts` — контракт «null = сайт не делает это заявление».
6. `src/lib/pricing.ts` (515 строк) и `scripts/pricing.test.ts`. Три флоридские таблицы,
   которые в CA не работают: `CITY_COORDS` (~70 городов Южной Флориды, смещения от Homestead),
   `LD_CITY_COORDS`, таблица пар штатов в `estimateDistance()`. Ставки в `main` уже ушли от
   снимка в `ca.ts`: `HOURLY_RATE {2:129, 3:179, 4:219}`, `TRUCK_FEE` по бригаде
   `{2:129, 3:179, 4:219}`; в `ca.ts` стоит `{4: 229}` и плоский `truckFee: 129`.
7. `src/lib/data/{cities,citiesRu,citiesUa,costPages,localePairs,serviceContent,blog}.ts`
   и `scripts/links.test.ts`. Устройство: данные в массивах, но **маршрут — отдельный файл на
   город** (`src/app/<city>-movers/page.tsx`, 19 EN + 16 RU + 6 UA), каждый с абсолютными
   canonical/og/hreflang-URL, захардкоженными строкой. `[city]`-сегмента нет. Рендерят всё
   два компонента: `src/components/city/CityMoversPage.tsx` и `CostPage.tsx`.
8. `src/app/layout.tsx` (schema-граф ~390 строк, 17 узлов `City` для Флориды в строках
   ~134–150), `src/app/robots.ts` (23 AI-краулера; **`ALLOW_PATHS` не включает `/ua/`** —
   исправить в CA), `src/app/sitemap.ts` (ручной список EN/RU + производные), `public/llms.txt`,
   `src/app/llms-full.txt/route.ts` (собирается из данных при билде — этот приём сохранить),
   `src/lib/indexnow.ts` (ключ и хост захардкожены), `scripts/indexnow-ping.ts`.
9. `docs/EASYMOVE_REQUESTS.md` — формат журнала запросов. Заведёшь такой же для Сакраменто.
10. `.claude/commands/*.md` — четыре агента-аудитора всё ещё ссылаются на мёртвый бренд
    «EasyMove Elite» / easymoveelite.com. Переписать под Сакраменто в Фазе 3.

Масштаб механической части, чтобы не недооценить: телефон `786-305-1844` — 227 вхождений
в 50 файлах; домен — ~30 файлов; hreflang-блоки — 56 файлов. Именно это `src/config/market.ts`
и был написан устранить: сначала подключить конфиг, потом чистить, а не наоборот.

## Железные правила (нарушение = переделка)

- **Никаких выдуманных чисел.** Ставки, лимиты страховки, адрес, телефон 916, номер
  разрешения, цены конкурентов, численность диаспоры — только из
  `docs/TWO_STATE_SEO_STRATEGY.md` с указанным там источником, из конфига, или
  `null` / `[TODO: owner]`. Если цифру нельзя проверить — переписать фразу так, чтобы цифра
  была не нужна.
- **Флоридские отзывы — флоридские.** На CA-сайте нет `AggregateRating`, нет `Review`-схемы,
  нет testimonials. Разрешено и нужно: текстовый блок вида «Мы — филиал Easy Move Florida,
  которая работает с 2021 года и держит 5.0 из 32 отзывов на Thumbtack (ссылка на профиль).
  В Сакраменто мы только открылись — первые отзывы появятся после первых переездов.»
  Честно, со ссылкой, без schema-рейтинга. Формулировка обязана явно приписывать рейтинг
  Флориде. Цифры 5.0 / 32 берутся из `credentials.ts` (`THUMBTACK`), не переписываются.
- **Связь компаний в schema только через `parentOrganization` / `subOrganization`.**
  Не `sameAs`: это означало бы «одно юрлицо» и склеило бы рейтинги.
- **Ни одного заявления о лицензии или страховке**, пока `licence.permitNumber === null`.
  Разрешено «подаём заявку на Household Mover permit в BHGS» — только если владелец подтвердил.
- **Закон Калифорнии в движке цен:** local-переезд при расстоянии ≥5 миль считает
  **удвоенное время в пути** (Maximum Rate Tariff 4, Item 320). Это тариф, не опция.
  `scripts/market-check.ts` обязан падать, если это выключено. Ставки — плейсхолдер до сверки
  с Max 4: добавь в `MarketPricing` флаг `ratesVerifiedAgainstTariff: boolean`, в `ca.ts`
  поставь `false`, а `market-check` пусть падает при `false`, когда `VERCEL_ENV=production`.
- **Телефон** — флоридский 786-305-1844, пока нет 916 (на него отвечает тот же владелец).
  Через `MARKET.phone`, не литералом.
- **Ничего флоридского не рендерится на CA-домене**: ни один `/miami-movers`, ни один
  флоридский RU/UA-пост, ни одна фраза про Miami-Dade, COI высоток, ураганы. Дубли контента
  на двух доменах вредят обоим. В блоге нет поля `lang` — добавь, если оставляешь блог.
- Домен ещё не куплен: везде `NEXT_PUBLIC_SITE_URL`, дефолт
  `https://www.easy-move-sacramento.com`. Ключ IndexNow — новый, под этот хост.
- Правила `CLAUDE.md`: `next/image`, gold `#C9A84C`, Playfair/Inter, inputs ≥16px, тест на
  375px, никакого `Math.random()` в ценах, rate-limit на API, без эмодзи в UI.
- Не пушить и не деплоить без явной команды. Работать в ветках `feat/…`.

## Фаза 0 — Изучить (только чтение, никаких правок)

Прочитай файлы из списка. Затем составь инвентаризацию:
- дерево `src/app/**` — для каждого маршрута класс: **оставить / параметризовать через
  MARKET / переписать под CA / удалить**;
- флоридские литералы (grep: `Florida|Miami|Broward|Palm Beach|\bFL\b|786-305|Hollywood|
  Aventura|Sunny Isles|FDACS|Hurricane|Brickell|COI`) — файл, число вхождений, класс правки;
- компоненты с флоридскими фактами внутри (hero, FounderBlock «since 2021», BuildingHOASection,
  ServiceAreasSection, Footer, Header);
- `public/images/Real/*` — какие фото универсальны (грузовик, бригада, упаковка), какие выдают
  Майами (пальмы, высотки, океан). Вторые в CA не использовать;
- env-переменные (`grep -r "process.env"`) и сервисы: Telegram, Resend, Twilio, Airtable,
  admin-auth, Clarity, верификации Google/Yandex/Bing. Заметь: `.env.local.example` устарел
  (описывает Gmail/nodemailer, а код на Resend), `nodemailer` — неиспользуемая зависимость,
  `tsx` не в devDependencies, `npm test` не существует;
- тесты и guard-скрипты для адаптации: `links.test.ts` (сверяет `localePairs` с массивами
  городов), `pricing.test.ts`, `market-check.ts`.

Результат → `docs/SACRAMENTO_AUDIT.md`. Таблицы, не проза. Каждая строка — путь и класс правки.

## Фаза 1 — Спланировать

Три документа.

### `docs/SACRAMENTO_PLAN.md` (это и есть `SACRAMENTO_LAUNCH_PLAN.md`, на который ссылается `ca.ts` — поправь ссылку)

1. **Архитектура.** Один рынок = один деплой: `NEXT_PUBLIC_MARKET=ca`. Все компоненты
   читают бренд, телефон, регион, города, siteUrl из `MARKET`. Реши и обоснуй: оставить `fl.ts`
   только как источник `sibling` или удалить и захардкодить ссылку на флоридский `#organization`.
   Реши: оставить по файлу на город или ввести `[city]`-сегмент с `generateStaticParams`
   (рекомендация — сегмент: 14 городов × 3 языка × 2 типа страниц = 84 файла-стаба иначе).
2. **Карта URL** (EN / RU / UA). Города по приоритету диаспоры из стратегии:
   Citrus Heights → Carmichael → Fair Oaks → North Highlands → Natomas → Sacramento →
   Roseville → Elk Grove → Folsom → Rancho Cordova → West Sacramento → Rocklin → Davis →
   El Dorado Hills. Для каждого: `/<city>-movers`, `/ru/<city>-movers`, `/ua/<city>-movers`,
   `/moving-cost-<city>` × 3 языка. Плюс страницы-«победители»:
   `/russian-speaking-movers-sacramento`, `/ukrainian-speaking-movers-sacramento` и их
   RU/UA-версии. Slug-и латиницей, заголовки и текст — на языке страницы.
   Релиз 1 — минимум Sacramento + 4 диаспорных города × 3 языка; остальное — релиз 2.
3. **Формула страницы** = формула Авентуры: язык бригады + названные районы + типы жилья
   (в Сакраменто это частные дома, таунхаусы, апартаменты, а не высотки с COI) + FAQ
   ответ-first. Для каждого города — районы и ориентиры, которые **можно проверить**
   (Wikipedia, OSM, сайт города). Никаких выдуманных правил ЖК и HOA.
4. **Schema-граф:** `MovingCompany`/`LocalBusiness` `#organization` с `parentOrganization` →
   `https://www.easy-move-florida.com/#organization`; `areaServed` из
   `MARKET.areaServedCities`; `PostalAddress` без `streetAddress`; **без** `AggregateRating`;
   `Person #founder` с `knowsLanguage: ["en","ru","uk"]`; `FAQPage` на каждой странице на её
   языке. Один общий helper для metadata и JSON-LD (сейчас его нет — каждая страница строит
   своё).
5. **hreflang:** `en-US` / `ru-US` / `uk-US` + `x-default` для каждой тройки;
   `localePairs.ts` — единственный источник парности; `links.test.ts` ловит рассинхрон.
6. **`llms.txt`** — три языковых секции в одном файле, плюс `/llms-full.txt`, собираемый из
   данных при билде. Честный заголовок: «новый филиал, открыт 2026, дочерняя компания
   Easy Move Florida (работает с 2021)». Секция «как цитировать»: имя, телефон, регион,
   языки, отличие от любых похожих имён. Блок цен — только после подтверждения ставок
   владельцем; до этого — «ставки публикуем после сверки с Maximum Rate Tariff 4».
7. **Движок цен:** `calculatePricing` читает `MARKET.pricing`; при `doubleDriveTime` и
   `miles >= doubleDriveTimeMinMiles` время в пути ×2; тесты на оба случая (4 мили — один
   раз, 5 миль — дважды). `CITY_COORDS` → таблица метро Сакраменто с реальными расстояниями
   (источник назвать). Long-distance во Флориде удалён как услуга (`fix/remove-long-distance`);
   в CA по умолчанию тоже не продаём — вопрос владельцу.
8. **robots / sitemap / IndexNow:** список 23 краулеров переносится, `/ua/` в `ALLOW_PATHS`;
   `sitemap.ts` строится из `MARKET` и данных, а не из ручного списка; новый ключ IndexNow.
9. **Сервисы и env** — таблица из раздела «Что может дать только Евгений» ниже.
10. **Off-site, что делает Евгений** (не код): домен, GBP на адрес в Сакраменто, номер 916,
    BHGS permit, NAP в Yelp / Angi / Nextdoor / Thumbtack / moveBuddha / Apple Maps /
    Bing Places, Yandex Справочник, посев в славянских сообществах (slavicsac.com, церкви,
    группы). Ежемесячно — пять контрольных запросов в ChatGPT / Perplexity / AI Overviews на
    трёх языках, лог кого процитировали. Это единственная реальная метрика канала.

### `docs/SACRAMENTO_BACKLOG.md`

Упорядоченный лист разработки. Каждый пункт: ID, задача, файлы, критерий приёмки (какая
команда запускается и что печатает), зависимость от владельца (да/нет). Порядок по риску:

- **B0 фундамент:** `NEXT_PUBLIC_MARKET=ca`, `market-check` в `prebuild`, флаг
  `ratesVerifiedAgainstTariff`, `tsx` в devDependencies, `npm test` = links + pricing +
  market-check, общий helper metadata/JSON-LD, все литералы бренда/телефона/домена → `MARKET`.
- **B1 чистка:** удалить флоридские маршруты, данные, посты, картинки Майами. Guard-тест
  «в собранном `.next` нет строк `Miami`, `Florida`, `786-305`». Сначала запустить его на
  текущем коде и убедиться, что он падает (правило: guard-тест сначала должен упасть).
- **B2 движок цен CA** + таблица расстояний + тесты double drive time.
- **B3 данные городов** EN → RU → UA по приоритету диаспоры, `localePairs`, cost-страницы.
- **B4 страницы:** главная, about (первое лицо, «филиал»), pricing, services, contact,
  quote-wizard (города CA, штат CA по умолчанию), страницы «русскоязычные / україномовні».
- **B5 SEO/GEO:** schema, hreflang, llms.txt × 3, llms-full, robots, sitemap, IndexNow,
  OG-картинки без Майами.
- **B6 API/env:** Telegram-чат CA, Resend from-адрес, admin, rate-limit — проверить
  реальным POST-запросом и полученным сообщением.
- **B7 верификация:** `tsc --noEmit`, `npm test`, `next build`, 375px, три языка на каждой
  странице, JSON-LD валиден (Rich Results Test или `schema-dts`), `market-check` зелёный,
  guard из B1 зелёный, `.claude/commands/*` переписаны под Сакраменто, `CLAUDE.md` обновлён.
- **B8 preview-деплой** на Vercel (новый проект), затем прогон контрольных запросов после
  индексации.

### `docs/SACRAMENTO_REQUESTS.md`

Формат `docs/EASYMOVE_REQUESTS.md`. Первая строка — этот kickoff. Раздел «Открыто — ждёт
ответа Евгения» — вопросы S1–S10 ниже.

## Фаза 2 — СТОП

После трёх документов **остановись**. Покажи: резюме аудита (5–10 строк), карту URL релиза 1,
список открытых вопросов. Ничего не строй, пока Евгений не напишет «строй».

## Фаза 3 — Строить (только после «строй»)

Идти по `SACRAMENTO_BACKLOG.md` сверху вниз. Один пункт — одна ветка `feat/…` или один
коммит с внятным сообщением. После каждого пункта — критерий приёмки выполнен и показан
выводом команды, не словами «должно работать». Перед словом «готово» — правило «Verify before
reporting done»: запусти, покажи вывод, назови то, что не проверено. Записывай каждый
выполненный пункт в `docs/SACRAMENTO_REQUESTS.md` с коммитом.

## Что может дать только Евгений

| # | Что | Зачем без этого нельзя |
|---|---|---|
| S1 | Домен: купить `easy-move-sacramento.com` (проверить доступность) | canonical, ключ IndexNow, `@id` в schema |
| S2 | Телефон 916, или оставить 786 на старте | NAP в GBP и на сайте должны совпадать |
| S3 | Адрес в Сакраменто, или SAB без адреса | `PostalAddress`, GBP |
| S4 | Ставки после сверки с Max 4: 2/3/4 грузчика, truck, минимум часов | калькулятор, `/pricing`, llms.txt |
| S5 | Продаём ли в CA long-distance, packing-only, storage | набор services |
| S6 | Статус BHGS permit: подано? номер? | единственное допустимое заявление о лицензии |
| S7 | Страховка: публиковать лимиты? | `INSURANCE` в credentials |
| S8 | Telegram: тот же бот, новый чат? домен Resend для писем? | env нового проекта |
| S9 | Какие фото из `/public/images/Real` можно использовать | hero и галерея без Майами |
| S10 | Формулировка: «филиал», «сестринская компания», «второй офис» | schema-связь и копирайт |

Env нового Vercel-проекта: `NEXT_PUBLIC_MARKET=ca`, `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_PHONE_E164`, `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_PHONE_WHATSAPP`,
`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_STREET_ADDRESS`, `NEXT_PUBLIC_POSTAL_CODE`,
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_WEBHOOK_SECRET`, `RESEND_API_KEY`,
`RESEND_FROM`, `NOTIFY_EMAIL`, `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` /
`TWILIO_PHONE_NUMBER` (если SMS), `AIRTABLE_API_KEY` / `AIRTABLE_BASE_ID` /
`AIRTABLE_TABLE_NAME` (если подключать), `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`,
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`,
`NEXT_PUBLIC_BING_VERIFICATION`, `NEXT_PUBLIC_CLARITY_ID`, `GOOGLE_REVIEW_URL` (пусто до GBP).
````

---

## Часть C. Что делать Евгению параллельно с кодом

Из `docs/TWO_STATE_SEO_STRATEGY.md`, раздел 7, в порядке зависимости:

1. Купить домен (S1). Без него нет canonical и ключа IndexNow.
2. Сверить ставки с Maximum Rate Tariff 4 (S4). Без этого калькулятор не выходит в production: `market-check` его не пустит.
3. После переезда: BHGS permit (офис в Сакраменто), GBP на калифорнийский адрес, номер 916.
4. Ответить на S1–S10 в `docs/SACRAMENTO_REQUESTS.md` нового репо: каждая пустая строка там — это заявление, которого сайт не делает.
