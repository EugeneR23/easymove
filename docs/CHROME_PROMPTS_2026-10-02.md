# Промты для браузера: Search Console, Bing, профили, отзывы

Составлено 2026-10-02. Всё, что осталось от SEO/GEO-прохода
(`docs/SEO_GEO_PLAN_2026-10-01.md`), упирается в ваши аккаунты Google, Wix и
соцсетей. Эти промты делают это в браузере.

Работают в Gemini in Chrome, Comet или любом браузерном агенте.
**Залогиньтесь заранее** в Google (тот аккаунт, где Search Console и профиль
компании) и в Wix. Агент сам не пройдёт вход и коды подтверждения.

Порядок: 1 → 2 → 3. Промты 4 и 5 независимы, их можно когда угодно.
Ответ агента в конце каждого промта пришлите мне в чат как есть.

---

# ПРОМТ 1 — Domain-property в Search Console через DNS в Wix

Сейчас владение подтверждено только для `https://easy-move-florida.com/` (без
www). Сайт отдаёт всё с www, поэтому Search Console не видит ни одной
настоящей страницы. Domain-property закрывает www и без-www одной записью.

```
Ты работаешь в моём браузере. Задача — подтвердить в Google Search Console
весь домен easy-move-florida.com через DNS-запись в Wix.

ВАЖНО:
— Ничего не удаляй в DNS. Только ДОБАВЬ одну TXT-запись.
— Существующие TXT-записи Zoho (zoho-verification и v=spf1) не трогай.
— Если что-то просит оплату или код подтверждения — остановись и спроси меня.

ШАГ 1. Search Console
1. Открой https://search.google.com/search-console
2. Открой выпадающий список ресурсов слева сверху → «Добавить ресурс».
3. Выбери ЛЕВУЮ карточку «Доменный ресурс» (Domain), введи
   easy-move-florida.com  (без https, без www) → «Продолжить».
4. Google покажет TXT-запись вида google-site-verification=XXXX.
   Скопируй её целиком. Окно НЕ закрывай.

ШАГ 2. Wix
5. В новой вкладке открой https://manage.wix.com/account/domains
6. У домена easy-move-florida.com открой меню «⋯» → «Управление DNS-записями»
   (Manage DNS Records).
7. В разделе TXT нажми «Добавить запись» (+ Add Record):
   Host Name: оставь пустым или @ (что Wix предлагает для корня домена)
   Value: строка google-site-verification=XXXX из шага 4
   TTL: по умолчанию
8. Сохрани. Убедись, что в списке TXT теперь три записи: две старые Zoho и
   новая Google.

ШАГ 3. Подтверждение
9. Вернись во вкладку Search Console и нажми «Подтвердить» (Verify).
10. Если пишет «не найдено» — подожди 10 минут и нажми ещё раз. Не создавай
    запись повторно. Через час — остановись и скажи мне.

ШАГ 4. Sitemap в новом ресурсе
11. В ресурсе «easy-move-florida.com» (доменный, без https) открой
    «Файлы Sitemap» и добавь: https://www.easy-move-florida.com/sitemap.xml
12. Запиши статус, который покажет Google.

ОТЧЁТ: подтвердился ли доменный ресурс (да/нет, с какой попытки); сколько
TXT-записей теперь в Wix и какие; статус sitemap. Ничего не выдумывай.
```

После подтверждения я проверю его сам: в списке ресурсов должен появиться
`sc-domain:easy-move-florida.com`, и запросы по www перестанут отдавать 403.

---

# ПРОМТ 2 — почистить старый ресурс без www

Четыре страницы когда-то были отправлены как sitemap и висят с ошибкой.
MCP-сервер отказывается удалять их без отдельной настройки, поэтому руками.

```
Ты работаешь в моём браузере, в Google Search Console.

ВАЖНО: удаляем только четыре записи ниже. Ресурсы не удаляем.
Файл https://easy-move-florida.com/sitemap.xml НЕ трогаем.

1. Открой ресурс https://easy-move-florida.com/ (URL-префикс, без www).
2. Раздел «Файлы Sitemap». Для каждой из этих записей нажми «⋮» →
   «Удалить файл Sitemap»:
     https://easy-move-florida.com/ru/miami-movers
     https://easy-move-florida.com/ru/aventura-movers
     https://easy-move-florida.com/ru/sunny-isles-movers
     https://easy-move-florida.com/pricing
3. Открой ресурс https://www.easy-move-florida.com/ (с www). У меня там
   статус «не подтверждён». Открой «Настройки» → «Пользователи и
   разрешения» и перепиши, кто там владелец (email или «нет доступа»).
   Ничего не меняй и никого не удаляй.

ОТЧЁТ: какие из четырёх записей удалены; что осталось в списке Sitemap;
кто владелец ресурса с www.
```

---

# ПРОМТ 3 — Bing Webmaster Tools (только после промта 1)

Bing кормит Copilot и часть ответов ChatGPT. Сайт можно импортировать из
Search Console одной кнопкой, без отдельной верификации.

```
Ты работаешь в моём браузере.

1. Открой https://www.bing.com/webmasters и войди моим Google-аккаунтом.
2. Если сайта easy-move-florida.com там нет — выбери «Import from Google
   Search Console», разреши доступ и импортируй ТОЛЬКО easy-move-florida.com
   (и его ресурсы). Другие сайты не импортируй.
3. Если сайт уже есть — ничего не добавляй.
4. Открой раздел Sitemaps и проверь, что там есть
   https://www.easy-move-florida.com/sitemap.xml. Если нет — добавь.
5. Открой Site Explorer или URL Inspection для
   https://www.easy-move-florida.com/ и перепиши статус индексации.

ОТЧЁТ: импортирован ли сайт или уже был; статус sitemap; что Bing пишет
про главную страницу.
```

---

# ПРОМТ 4 — ссылки на настоящие профили компании

Для разметки sameAs нужны адреса профилей, которые реально принадлежат
компании. Придумывать или создавать новые нельзя.

```
Ты работаешь в моём браузере. Задача — найти ПУБЛИЧНЫЕ профили компании
Easy Move Florida, которые принадлежат нам, и собрать их адреса.

ВАЖНО:
— Ничего не создавай и не редактируй. Только найди и перепиши адреса.
— Не путай с «Easy Florida Moving» (easyfloridamoving.com) — это другая
  компания в Hallandale Beach. И с Easy Move Sacramento — это наш филиал,
  его НЕ включай.
— Наш телефон (786) 305-1844, сайт www.easy-move-florida.com. Профиль
  считается нашим, только если там стоит этот телефон или этот сайт.

Проверь по очереди:
1. Facebook — страница компании.
2. Instagram.
3. LinkedIn — страница компании (Company Page), не личный профиль.
4. Yelp — yelp.com/biz/easy-move-florida-hollywood-2 (проверь, наша ли).
5. Nextdoor, BBB, Angi, Google Business Profile (ссылка «поделиться»).
6. YouTube или TikTok, если есть.

ОТЧЁТ: таблица — площадка | точный адрес профиля | стоит ли там наш телефон
или сайт (да/нет) | кто управляет (я вошёл как админ / не знаю). Если
профиля нет — так и напиши «нет». Ничего не выдумывай.
```

---

# ПРОМТ 5 — свежие цифры отзывов и текст отзывов Google

На сайте сейчас: Google 5.0 из 8 отзывов (обновлено 2026-09-18), Thumbtack
4.7 из 33 (сверено 2026-09-05) — `src/lib/data/credentials.ts`. Устаревший рейтинг в разметке хуже,
чем никакой. Тексты отзывов — для решения, показывать ли их на `/reviews`;
сам по себе сбор ничего на сайте не меняет.

```
Ты работаешь в моём браузере. Задача — переписать текущий рейтинг и отзывы
компании Easy Move Florida. Только читать, ничего не отвечать и не менять.

1. Открой мой профиль компании в Google (business.google.com или поиск
   «Easy Move Florida Hollywood» → карточка справа). Перепиши:
   — средний рейтинг (число, например 5.0)
   — количество отзывов
2. Открой список отзывов Google. Для КАЖДОГО отзыва перепиши дословно, без
   исправлений и сокращений:
   — имя автора так, как показано
   — дату (как показано: «2 месяца назад» или точная)
   — количество звёзд
   — полный текст отзыва (если есть «Ещё» — раскрой)
   — есть ли ответ владельца (да/нет)
3. Открой https://www.thumbtack.com/profile/services/474342774303219734/reviews
   и перепиши только средний рейтинг и количество отзывов.

ОТЧЁТ: две строки с рейтингом и количеством (Google, Thumbtack) и таблица
отзывов Google. Ничего не выдумывай и не пересказывай — только дословно.
```

---

## Что я сделаю, когда пришлёте ответы

| Ответ | Что делаю |
|---|---|
| Промт 1: доменный ресурс подтверждён | Сниму данные GSC по www: показы, клики и запросы по каждой странице, проверка индексации 100 URL, ошибки hreflang. Составлю план по реальным цифрам |
| Промт 2 | Отмечу закрытым |
| Промт 3 | Проверю, видит ли Bing sitemap |
| Промт 4 | Добавлю в sameAs только профили, где стоит наш телефон или сайт |
| Промт 5 | Обновлю рейтинг и число в `credentials.ts` (оттуда берут разметка, llms.txt и страницы). По отзывам Google спрошу, показывать ли их на `/reviews` |

---

# Раунд 2 — после отчётов 2026-10-02

Что уже сделано по отчётам: доменный ресурс подтверждён, четыре записи в
старом ресурсе удалены, `www`-sitemap переотправлен в доменный ресурс через
API, ссылка на Thumbtack исправлена (старая вела гостя на экран входа),
рейтинг Google обновлён до 9 отзывов, Nextdoor добавлен в разметку, девять
отзывов Google — на `/reviews`, страница North Miami создана.

Главная находка: многие ключевые страницы Google **ни разу не обходил**
(«Discovered – currently not indexed» или «URL is unknown to Google»). Причина,
скорее всего: `www`-sitemap Google последний раз скачивал 2024-12-07, ещё во
времена Wix, а sitemap на адресе без www перечисляет страницы с www — чужой
хост, такие адреса Google не принимает. Sitemap уже переотправлен; промт 6
ускоряет индексацию самых важных страниц.

---

# ПРОМТ 6 — запросить индексацию (сегодня 10, завтра ещё 10)

У Google лимит около десяти запросов в сутки. Порядок — по важности.

```
Ты работаешь в моём браузере, в Google Search Console.

Для каждого адреса из списка:
1. Вставь его в строку «Проверить URL» вверху (ресурс выбери
   sc-domain:easy-move-florida.com или https://www.easy-move-florida.com/).
2. Дождись результата и нажми «Запросить индексирование».
3. Если пишет, что квота исчерпана — остановись и запиши, на каком адресе.
Больше ничего не меняй.

День 1:
https://www.easy-move-florida.com/miami-movers
https://www.easy-move-florida.com/pricing
https://www.easy-move-florida.com/services
https://www.easy-move-florida.com/north-miami-movers
https://www.easy-move-florida.com/fort-lauderdale-movers
https://www.easy-move-florida.com/ru/russkie-gruzchiki-miami
https://www.easy-move-florida.com/about
https://www.easy-move-florida.com/boca-raton-movers
https://www.easy-move-florida.com/dania-beach-movers
https://www.easy-move-florida.com/ru/miami-movers

День 2:
https://www.easy-move-florida.com/services/residential-moving
https://www.easy-move-florida.com/packing-services
https://www.easy-move-florida.com/contact
https://www.easy-move-florida.com/coral-gables-movers
https://www.easy-move-florida.com/ru/pricing
https://www.easy-move-florida.com/services/long-distance-moving
https://www.easy-move-florida.com/miramar-movers
https://www.easy-move-florida.com/pembroke-park-movers
https://www.easy-move-florida.com/lauderdale-lakes-movers
https://www.easy-move-florida.com/blog

ОТЧЁТ: по каждому адресу — что показала проверка до запроса (индексирован /
не индексирован / неизвестен) и удалось ли отправить запрос.
```

---

# ПРОМТ 7 — убрать мусорные записи sitemap (Google и Bing)

Эти записи не страницы сайта и не карты сайта, это старые ошибки. Сайт они
не затрагивают; удаляем, чтобы в отчётах не висели постоянные ошибки.

```
Ты работаешь в моём браузере.

ВАЖНО: удаляем только перечисленное. Ресурсы и сайты не удаляем.
https://www.easy-move-florida.com/sitemap.xml НЕ удаляем нигде.

Google Search Console:
1. Ресурс sc-domain:easy-move-florida.com → «Файлы Sitemap» → у записи
   https://www.easy-move-florida.com/locate «⋮» → «Удалить файл Sitemap».
2. Ресурс https://www.easy-move-florida.com/ → то же для
   https://www.easy-move-florida.com/locate (если там осталась).

Bing Webmaster Tools (https://www.bing.com/webmasters, сайт
easy-move-florida.com) → Sitemaps. Удали записи:
   https://easy-move-florida.com/ru/sunny-isles-movers
   https://easy-move-florida.com/ru/aventura-movers
   https://easy-move-florida.com/ru/miami-movers
   https://easy-move-florida.com/pricing

ОТЧЁТ: что удалено и что осталось в списках Sitemap в Google и в Bing.
```

---

# ПРОМТ 8 — исправить карточку Yelp

Отчёт показал: ссылка на нашу карточку перенаправляет на
`yelp.com/biz/easy-move-elite-sunny-isles-beach` — старое название и чужой
город. Страницей управляешь ты («You manage this page»), значит, её можно
исправить. Полный разбор и канонический NAP — в
`docs/DIRECTORY_FIX_PROMPTS.md`, промт 1; ниже короткая версия.

```
Ты работаешь в моём браузере, я залогинен в Yelp for Business.

ВАЖНО: не создавай новую карточку. Ничего не покупай, от платных пакетов
откажись. Если нужен код подтверждения — остановись и спроси меня.

1. Открой https://biz.yelp.com и выбери страницу
   yelp.com/biz/easy-move-elite-sunny-isles-beach
2. В Business Information приведи к виду:
   Название:  Easy Move Florida
   Телефон:   (786) 305-1844
   Сайт:      https://www.easy-move-florida.com
   Адрес:     2130 Stirling Rd, Hollywood, FL 33020 — если Yelp разрешает
              скрыть адрес и указать зону обслуживания, выбери зону:
              Miami-Dade, Broward, Palm Beach
   Часы:      Пн–Пт 9:00–19:00, Сб–Вс 10:00–18:00
   Категория: Movers
3. Если есть пометка «Unclaimed» и кнопка «Claim this business» —
   иди по ней и скажи мне, что она просит.
4. Поищи на Yelp «Eugene Romanov» на 2130 Stirling Rd — это второй листинг
   с нашим телефоном. Ничего с ним не делай, только перепиши его адрес
   на Yelp.

ОТЧЁТ: какие поля удалось изменить, что ушло на модерацию, статус claim,
адрес второго листинга.
```

---

# ПРОМТ 9 — ответить на отзывы Google (тексты готовы)

**Статус 2026-10-02: не запускается.** Google не даёт отвечать, пока профиль
не прошёл верификацию по видео (см. последний раздел). После верификации —
запустить как есть.

По таблице из отчёта без ответа пять отзывов (в тексте отчёта сказано «6»,
но в таблице ответ стоит у Ivan, Andrei, Tatiana и Andrey). Ответы короткие,
от первого лица, без обещаний и цифр. Прочитайте и поправьте до запуска —
это публикация от имени компании.

```
Ты работаешь в моём браузере, в профиле компании Easy Move Florida в Google
(business.google.com → Отзывы). Ответь на отзывы ниже ТОЧНО этими текстами.
На другие отзывы не отвечай, ничего не удаляй и не редактируй.

Ekaterina Bykova:
Ekaterina, thank you! Glad the move between apartments went smoothly from the first call to the last box. If you ever need us again, you have my number. — Eugene

Bianca Sa:
Thank you, Bianca! It was a pleasure to help. — Eugene

Katerina Ko:
Katerina, thank you so much for the kind words! Happy to help anytime. — Eugene

Owen Parker:
Thanks, Owen! Glad everything arrived safe and the day went fast. — Eugene

Raha Mad:
Thank you, Raha! We appreciate you trusting us with your move. — Eugene

ОТЧЁТ: на какие отзывы ответ опубликован.
```

---

## Верификация профиля Google — это не для агента

Отчёт показал: «Verification not successful. To get verified, submit another
recording.» Непроверенный профиль может не показываться в Картах и в
локальной выдаче — а оттуда идёт большая часть звонков местной компании.
Видео записывается с телефона в приложении Google Maps или Google Business,
одним непрерывным дублем. Точный список того, что должно быть в кадре,
Google показывает в приложении перед записью; следуйте ему. Сделайте это в
первую очередь — это важнее любого промта выше.
