# Copy-Paste пакет: Google Business Profile + Apple / Bing / Yandex

**Пересобран 2026-09-15.** Предыдущая версия этого файла была опасна: она
называла компанию старым брендом, предлагала ставку ниже реальной, слово
«Licensed» без номера FDACS, услуги за пределами Флориды и за пределами
страны — которых нет, — и часы, разошедшиеся с профилем. Всё это предназначалось для
вставки в Google-профиль, то есть ошибки уехали бы наружу и разошлись по
каталогам, откуда их уже не отозвать.

Ниже — только то, что подтверждено. Источники правды в коде:

| Факт | Файл |
|---|---|
| Часы | `src/lib/data/hours.ts` |
| Что возим и куда | `src/lib/data/scope.ts` |
| Тарифы | `src/lib/pricing.ts` |
| Рейтинги, лицензии, страховка | `src/lib/data/credentials.ts` |

Если меняется что-то там — этот файл пересобирается, а не правится по памяти.

---

## NAP — везде одинаково, символ в символ

```
Business name: Easy Move Florida
Phone:         (786) 305-1844
Address:       2130 Stirling Rd, Hollywood, FL 33020
Website:       https://www.easy-move-florida.com
Email:         romanov@easy-move-florida.com
```

Не «EasyMove Elite», не «Easy Move FL». Мы уже делим выдачу с чужой
компанией «Easy Florida Moving» из Халландейла — любое расхождение имени
помогает Google их склеить.

---

## Часы работы

```
Monday      9:00 AM – 7:00 PM
Tuesday     9:00 AM – 7:00 PM
Wednesday   9:00 AM – 7:00 PM
Thursday    9:00 AM – 7:00 PM
Friday      9:00 AM – 7:00 PM
Saturday    10:00 AM – 6:00 PM
Sunday      10:00 AM – 6:00 PM
```

Это те часы, что уже стоят в профиле, и с 15.09.2026 они же стоят на сайте и
в schema.org. **Если реальные часы другие — скажи, я поменяю сайт**, но две
разные версии хуже любой одной: Google сверяет сайт, профиль и каталоги
между собой.

---

## Категории

**Основная:** Mover (Перевозочная компания)

**Дополнительные:**
- Moving and storage service
- Packing service
- Piano moving service

Не добавлять «International moving» — такой услуги нет.

---

## Описание (Business Description, 750 знаков)

```
Owner-operated moving company based in Hollywood, FL, serving Miami-Dade,
Broward and Palm Beach. Founder Evgenii Romanov runs dispatch himself and is
reachable on WhatsApp. Crews work in English and Russian.

Local moves are hourly and published: $129/hr for 2 movers, $179/hr for 3,
$219/hr for 4, with a 3-hour minimum and the truck as its own line at the crew
rate. No weekend, fuel, stairs or elevator fees - access costs time, not
surcharges. Written estimate before booking, no deposit.

High-rise and condo specialists: Certificate of Insurance issued to building
management within 24 hours of booking at no charge, freight elevator
reservations, loading dock scheduling, gate-community paperwork.

Long-distance within Florida quoted per job. We do not do interstate moves.
```

**Чего в описании нет и почему:** слова «Licensed» (пока нет номера FDACS —
его нельзя писать), «since 2021» (не подтверждено документом), «international»
и «long-distance relocation» в смысле межштатных (услуги нет).

---

## Услуги (Edit profile → Services)

| Услуга | Описание | Цена |
|---|---|---|
| Local Moving | Apartments, condos and houses across Miami-Dade, Broward, Palm Beach | From $129/hr |
| High-Rise & Condo Moving | COI within 24 hours, elevator and dock coordination | From $129/hr |
| Packing Services | Full or partial packing, materials supplied | From $79/hr |
| Piano & Specialty Items | Upright and grand pianos, art, antiques | By quote |
| Office & Commercial | Evening and weekend windows to keep you trading | By quote |
| Long-Distance Within Florida | Orlando, Tampa, Naples, Jacksonville — quoted per job | By quote |
| Storage Coordination | Short-term and monthly through our storage partner | From $200/mo |

---

## Атрибуты

Ставить: Owner-operated · Online estimates · Language assistance (Russian) ·
LGBTQ+ friendly (если согласен) · Appointment required

**Не ставить:** «Licensed» и «Insured» как атрибуты-галочки, пока нет номера
FDACS. Страховка есть и COI выдаём — это написано словами в описании, а
галочка читается как заявление о регистрации.

---

## Q&A (вставлять парами, вопрос от своего второго аккаунта, ответ — от бизнеса)

**Q: How much does a local move cost?**
A: Hourly and published: $129/hr for 2 movers, $179/hr for 3, $219/hr for 4,
with a 3-hour minimum. The truck is its own line at the same rate as the crew,
and fuel, tolls and mileage sit inside it. The smallest possible invoice is
$516 with two movers. You get a written estimate before booking and there is no
deposit.

**Q: Do you charge extra for weekends or stairs?**
A: No. There is no weekend surcharge, no fuel surcharge, no stairs fee, no
elevator fee and no long-carry fee. Those things cost time, and the time is
already in the estimate.

**Q: Can you provide a Certificate of Insurance for my building?**
A: Yes — within 24 hours of your confirmed booking, free of charge, in the
format your building requires and naming the building as additional insured.
Send us the management office's requirements when you book.

**Q: Do you have Russian-speaking movers?**
A: Yes. The owner and dispatcher take calls in Russian and English, and the
website is published in both. Мы говорим по-русски.

**Q: Do you do long-distance or out-of-state moves?**
A: Inside Florida, yes — Orlando, Tampa, Naples, Jacksonville are quoted
individually in writing, with no deposit. Out of state, no: moving household
goods across a state line needs federal operating authority we do not hold, so
we neither quote nor take those jobs. Call anyway and we will point you to a
licensed carrier — packing and the Florida-side leg are still ours.

**Q: How long does a 2-bedroom move take?**
A: Usually 4–6 hours with 2–3 movers, which works out around $645–$1,253
all-in. Towers take longer than houses because of the elevator and the walk
from the unit to the truck, not because the rate changes.

**Q: Do you take a deposit?**
A: No deposit on any move. Cancel or reschedule free of charge more than 48
hours out.

**Q: When do I pay?**
A: On site, roughly 45–60 minutes before the job wraps, once the final hour
count is clear. You pay for hours actually worked, billed in 15-minute
increments past the 3-hour minimum.

**Q: Can you move on a weekend?**
A: Yes, Saturday and Sunday are ordinary working days at the ordinary rate.
The limit is usually the building: many Brickell and Aventura towers do not
permit Sunday moves at all, so we check your association allows the date.

**Q: Do you do packing only, without the move?**
A: Yes. Packing runs from $79/hour for two packers, studio package from $237.
Common when another company is driving — we box, wrap and label so their crew
loads a home that is ready.

---

## Фото

Только реальные — в `public/images/Real/`. Стоковые в профиль перевозчика не
грузить: клиент в Майами отличает их мгновенно, и это ровно та категория, где
доверие решает.

Минимум: 3 фото трака, 3 бригады за работой, 1 логотип, 1 обложка.
Geo-теги ставить по Hollywood, FL.

---

## Apple Business Connect / Bing Places / Yandex

Тот же NAP, те же часы, то же описание. Ничего не переписывать «своими
словами» — расхождение между площадками и есть проблема, которую мы чиним.

---

## Осталось за владельцем

- **Yelp-профиля нет.** Он появляется в пяти выдачах из шести по нашим
  запросам — это самая большая дыра, которую код закрыть не может.
- **Отзывы Google: 6 → 30+.** Запрос отзыва после каждого удачного переезда,
  без покупки и без стимулов. Ссылку «оставить отзыв» (`g.page/r/.../review`)
  взять в кабинете GBP и прислать — она нужна коду, сейчас там `null`.
- **Номер FDACS IM.** Это требование закона Флориды, и он же разблокирует
  слово «Licensed» и подачу в агрегаторы.
- **Листинг Thumbtack** называется «EASY MOVE. MOVING SERVICES & PACKING» —
  переименовать в «Easy Move Florida».
- **Сверить рейтинг Google.** В `credentials.ts` стоит 5.0 из 6 отзывов. Это одно из двух
  чисел, из которых с 18.09 считается общий рейтинг сайта (`REVIEW_TOTALS`):
  сейчас это **4.7 по 39 отзывам** — взвешенное среднее Google и Thumbtack,
  и именно оно стоит и в schema.org, и в футере на каждой странице. Если в карточке
  уже другое число — скажите, поправлю в `credentials.ts`, и оба места обновятся сами.
