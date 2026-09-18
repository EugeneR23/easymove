# Промты для браузера: Yelp и MapQuest

Составлено 2026-09-18 по итогам проверки живой выдачи. Обе карточки уже
существуют и обе отдают неверные данные — это не создание с нуля, а
исправление чужого текста о вашем бизнесе.

Работают в Gemini in Chrome, Comet, Opera Neon или любом браузерном агенте.
**Залогиньтесь заранее** — агент сам не пройдёт верификацию.

## Канонический NAP — сверять символ в символ

Везде и всегда одинаково. Любое расхождение размывает сущность в поиске.

    Easy Move Florida
    2130 Stirling Rd
    Hollywood, FL 33020
    (786) 305-1844
    romanov@easy-move-florida.com
    https://www.easy-move-florida.com

**Без «Apt 204».** Без «EasyMove», «Easy Move FL», «Изи Мув». Часы: Пн–Пт
9:00–19:00, Сб–Вс 10:00–18:00.

---

# ПРОМТ 1 — забрать и оформить Yelp

Карточка уже есть: `yelp.com/biz/easy-move-florida-hollywood-2`. Текст на ней
(«Professional Movers with 3+ years experience») написан не нами. Значит, её
либо создал Yelp автоматически, либо её заводили раньше и забыли.

**Забрать существующую, не создавать новую.** Вторая карточка на тот же бизнес
хуже, чем одна чужая: они делят отзывы и сигналы между собой.

```
Ты работаешь в моём браузере. Задача — забрать под контроль существующую
карточку бизнеса на Yelp и привести её в порядок.

ВАЖНО:
— Не создавай новую карточку. Нужная уже существует, работаем только с ней.
— Ничего не покупай. Yelp будет предлагать рекламу и Yelp Ads на каждом шаге —
  отказывайся, пропускай, выбирай бесплатный вариант.
— Не проси и не пиши отзывы. Yelp прямо запрещает бизнесу просить отзывы, за
  это фильтруют и понижают карточку. Даже если интерфейс что-то предложит —
  не трогай.
— Если потребуется код подтверждения на телефон или почту — остановись и
  скажи мне, я продиктую.

ШАГ 1. Найти и забрать
1. Открой https://www.yelp.com/biz/easy-move-florida-hollywood-2
2. Найди ссылку «Claim this business» / «Заявить права на бизнес».
   Если её нет — значит карточка уже кем-то заявлена: остановись, сделай
   скриншот и скажи мне. Дальше не иди.
3. Пройди процесс подтверждения. Обычно это звонок или SMS на номер бизнеса.
   Когда дойдёт до кода — остановись и спроси меня.

ШАГ 2. Привести данные в порядок (после подтверждения)
4. Открой раздел «Business Information». Приведи поля ровно к этому виду:

   Название:  Easy Move Florida
   Адрес:     2130 Stirling Rd, Hollywood, FL 33020
              (без «Apt 204», без номера квартиры вообще)
   Телефон:   (786) 305-1844
   Сайт:      https://www.easy-move-florida.com
   Email:     romanov@easy-move-florida.com

5. Часы работы:
   Пн–Пт 9:00 AM – 7:00 PM
   Сб–Вс 10:00 AM – 6:00 PM

6. Категория: основная — «Movers». Если предложит вторую, поставь
   «Packing Services». Больше двух не добавляй.

7. Зона обслуживания: Miami-Dade, Broward, Palm Beach. Если Yelp просит
   радиус — поставь Hollywood FL и радиус около 40 миль.

ШАГ 3. Описание
8. Найди поле «Business Description» / «About the Business» и замени текст
   целиком на этот. Текущий текст про «3+ years experience» написан не нами,
   его надо убрать:

Owner-operated moving company based in Hollywood, FL, serving Miami-Dade,
Broward and Palm Beach counties. Crews work in English and Russian. Local
moves are billed hourly — $129/hr for 2 movers, $179/hr for 3, $219/hr for 4 —
with a 3-hour minimum and the truck as its own line at the crew rate. No
weekend, seasonal, fuel or stairs surcharges: access costs time, not fees.
Free certificate of insurance issued to building management within 24 hours of
booking. High-rise and condo specialists: freight elevator reservations,
loading dock scheduling, gated-community paperwork. No deposit, and free
cancellation more than 48 hours out. Long-distance within Florida is quoted
per job. We do not do interstate moves.

9. Если есть отдельное поле «Specialties» — впиши:
   High-rise and condo moves, COI for building management, packing and custom
   crating, piano and specialty items, Russian-speaking crews.

10. Если есть поле «History» или «Meet the Owner» — впиши:
    Owner Evgenii Romanov runs every job personally and answers the phone.

ШАГ 4. Фото
11. Открой раздел загрузки фото и скажи мне, сколько сейчас на карточке и
    что на них. Я пришлю нормальные — сам ничего не загружай и ничего не
    удаляй без моего слова.

ШАГ 5. Отчёт
12. Напиши: удалось ли забрать карточку, на каком шаге остановился, какие
    поля изменил, сколько там фото, есть ли уже отзывы и какие.
    Ничего не выдумывай.
```

### Почему нельзя просить отзывы на Yelp

Это не перестраховка. У Yelp в правилах прямой запрет на запрос отзывов, и
фильтр понижает те, что пришли всплеском. Google просить **можно** — там
запрещено только вознаграждение и фильтрация по оценке. Поэтому кнопка запроса
отзыва в админке ведёт на Google, а не на Yelp, и так и должно остаться.

---

# ПРОМТ 2 — починить MapQuest

Карточка `mapquest.com/us/florida/easy-move-florida-646251298` содержит **три
неверных факта**: ставка «$99 per hour for two movers» (на самом деле $129),
адрес с «Apt 204», и упоминание long-distance без оговорки про межштат.

Отдельно важно: MapQuest обычно берёт данные не сам, а от поставщиков
бизнес-данных. Поэтому правка на самом MapQuest может не удержаться, если
ошибка живёт выше по цепочке. Промт учитывает оба варианта.

```
Ты работаешь в моём браузере. Задача — исправить неверные данные о бизнесе в
карточке MapQuest.

ВАЖНО:
— Ничего не покупай и не оформляй платных подписок. Если предложат платный
  «premium listing» — откажись.
— Не создавай вторую карточку.
— Если потребуется код подтверждения — остановись и спроси меня.

ЧТО СЕЙЧАС НЕВЕРНО (это надо исправить):
  1. «rates starting at $99 per hour for two movers» — ставка $129 в час
     за двоих. $99 не существует и никогда не публиковалась на сайте.
  2. Адрес указан как «2130 Stirling Rd, Apt 204» — номер квартиры надо
     убрать, канонический адрес просто «2130 Stirling Rd».
  3. Упомянуты long-distance услуги без оговорки. Компания возит по Флориде,
     но НЕ делает межштатные переезды.

ШАГ 1. Понять, кто владеет карточкой
1. Открой https://www.mapquest.com/us/florida/easy-move-florida-646251298
2. Найди ссылку вроде «Claim this business», «Edit this listing»,
   «Suggest an edit» или «Report a problem». Скажи мне, что именно нашёл —
   от этого зависит дальнейшее.
3. Если есть «Claim» — иди по нему. Если только «Suggest an edit» — иди туда.

ШАГ 2. Исправить данные
4. Приведи поля к этому виду:

   Название:  Easy Move Florida
   Адрес:     2130 Stirling Rd
   Город:     Hollywood, FL 33020
   Телефон:   (786) 305-1844
   Сайт:      https://www.easy-move-florida.com
   Категория: Movers / Moving Company
   Часы:      Пн–Пт 9:00 AM – 7:00 PM, Сб–Вс 10:00 AM – 6:00 PM

5. Если есть поле описания — замени текст целиком:

Owner-operated moving company in Hollywood, FL, serving Miami-Dade, Broward
and Palm Beach. Local moves billed hourly: $129/hr for 2 movers, $179/hr for
3, $219/hr for 4, with a 3-hour minimum and the truck billed per day at the
crew rate. No weekend, fuel or stairs surcharges. Free COI to building
management within 24 hours. Long-distance within Florida quoted per job; we do
not do interstate moves. English and Russian.

6. Если поле с ценой отдельное — там должно стоять $129, а не $99.
   Если поле не редактируется — запиши это и скажи мне.

ШАГ 3. Найти источник ошибки
7. После правки поищи в Google: "Easy Move Florida" "$99" — и отдельно
   "Easy Move Florida" "Apt 204". Мне нужно знать, на каких ещё сайтах
   висят эти же неверные данные. Просто собери список URL, ничего там не меняй.
8. Загляни в Foursquare (foursquare.com) и Data Axle — поищи там тот же
   бизнес. MapQuest часто берёт данные оттуда, и если ошибка живёт там,
   правка на MapQuest откатится. Скажи мне, нашёл ли карточку и что в ней.

ШАГ 4. Отчёт
9. Напиши: получилось ли править напрямую или только «предложить
   изменение», какие поля удалось изменить, где ещё нашлись $99 и «Apt 204»,
   и что обнаружил в Foursquare. Ничего не выдумывай.
```

---

## Что делать после

Обе правки не мгновенные: Yelp применяет изменения сразу после верификации, а
MapQuest через «suggest an edit» может думать неделями. Через две недели
проверить обе карточки и поискать `"Easy Move Florida" "$99"` — если где-то
осталось, значит источник выше по цепочке и его надо чинить отдельно.

Обновить `docs/ACTION-PLAN.md`: пункт 1 (Yelp) и пункт 6 (MapQuest) закрываются
этими двумя промтами.
