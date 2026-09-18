# Переиндексация после V3 — что и в каком порядке

Составлено 2026-09-18, после того как сайт перестал противоречить сам себе.

Порядок важен. Просить переобход раньше, чем изменения живые на проде, — значит
закрепить в кэше ровно те цифры, которые мы убирали.

## Сначала — две проверки на живом сайте

После деплоя, до любых пингов:

    curl -s https://www.easy-move-florida.com/moving-cost-hollywood | grep -c '1,500'
    # ожидается 0

    curl -s -X POST https://www.easy-move-florida.com/api/quotes \
      -H 'Content-Type: application/json' \
      -d '{"moveType":"long-distance","toState":"WA","toCity":"Seattle", …}'
    # в ответе должно быть "quoteMode":"referral" и "total":0

Первая проверяет, что цена за межштатный переезд исчезла со страниц. Вторая —
что её не отдаёт и API, мимо формы. Обе проходили локально на сборке; на проде
их надо повторить, потому что «задержку деплоя уже принимали за неудавшийся
фикс» (`docs/ACTION-PLAN.md`).

## Чем пинговать

Инструмент уже есть и сам проверяет ключ перед отправкой:

    npx tsx scripts/indexnow-ping.ts --dry-run          # посмотреть, что уйдёт
    npx tsx scripts/indexnow-ping.ts                    # весь sitemap — 96 URL
    npx tsx scripts/indexnow-ping.ts /reviews /terms    # точечно

IndexNow кормит Bing (а через него Copilot), Yandex, Naver, Seznam. Google через
IndexNow не работает — туда через Search Console: переотправить `sitemap.xml`, а
для пяти-десяти самых важных URL нажать «Request indexing» вручную, квота там
порядка десятка в сутки.

## Почему не просто «весь sitemap»

Смысл переобхода здесь не в том, чтобы страницы вообще переобошли, а в том, что
в кэше поисковиков и ИИ-ассистентов лежат конкретные цифры, которых больше нет:

- «Long distance — from $1,500» (19 cost-страниц на трёх языках)
- «4.7 from 39 verified reviews» и «обе площадки проверяют, что клиент нас нанимал»
- «$129 per hour **each**» — то есть $258/час
- «суббота и воскресенье — с надбавкой 10%»
- «приблизно кожен третій наш вантажник — україномовний»
- «международный контейнер в Европу»

Ассистент цитирует такие фразы дословно. Их и надо вытеснить первыми. Остальные
страницы тоже изменились — футер, формат `tel:` — но там нечему быть
процитированным неверно.

Списки ниже сгенерированы из данных сайта, а не набраны руками.

---

## 1. Cost-страницы — строка «from $1,500» стала «Custom estimate» (21)

    https://www.easy-move-florida.com/moving-cost-aventura
    https://www.easy-move-florida.com/moving-cost-boca-raton
    https://www.easy-move-florida.com/moving-cost-fort-lauderdale
    https://www.easy-move-florida.com/moving-cost-hallandale-beach
    https://www.easy-move-florida.com/moving-cost-hollywood
    https://www.easy-move-florida.com/moving-cost-miami
    https://www.easy-move-florida.com/moving-cost-miami-beach
    https://www.easy-move-florida.com/moving-cost-pembroke-pines
    https://www.easy-move-florida.com/moving-cost-sunny-isles
    https://www.easy-move-florida.com/ru/moving-cost-aventura
    https://www.easy-move-florida.com/ru/moving-cost-fort-lauderdale
    https://www.easy-move-florida.com/ru/moving-cost-hallandale-beach
    https://www.easy-move-florida.com/ru/moving-cost-hollywood
    https://www.easy-move-florida.com/ru/moving-cost-miami
    https://www.easy-move-florida.com/ru/moving-cost-miami-beach
    https://www.easy-move-florida.com/ru/moving-cost-sunny-isles
    https://www.easy-move-florida.com/ua/moving-cost-aventura
    https://www.easy-move-florida.com/ua/moving-cost-hallandale-beach
    https://www.easy-move-florida.com/ua/moving-cost-hollywood
    https://www.easy-move-florida.com/ua/moving-cost-miami
    https://www.easy-move-florida.com/ua/moving-cost-sunny-isles

## 2. Страницы, где изменилось утверждение о фактах (22)

    https://www.easy-move-florida.com/reviews
    https://www.easy-move-florida.com/terms
    https://www.easy-move-florida.com/services
    https://www.easy-move-florida.com/services/specialty-items
    https://www.easy-move-florida.com/services/storage-solutions
    https://www.easy-move-florida.com/packing-services
    https://www.easy-move-florida.com/miami-beach-movers
    https://www.easy-move-florida.com/north-miami-beach-movers
    https://www.easy-move-florida.com/miami-movers
    https://www.easy-move-florida.com/boca-raton-movers
    https://www.easy-move-florida.com/sunny-isles-movers
    https://www.easy-move-florida.com/bal-harbour-movers
    https://www.easy-move-florida.com/aventura-movers
    https://www.easy-move-florida.com/blog/moving-from-new-york-to-miami-guide
    https://www.easy-move-florida.com/ru
    https://www.easy-move-florida.com/ru/services
    https://www.easy-move-florida.com/ru/fort-lauderdale-movers
    https://www.easy-move-florida.com/ru/hallandale-beach-movers
    https://www.easy-move-florida.com/ru/weston-movers
    https://www.easy-move-florida.com/ru/boynton-beach-movers
    https://www.easy-move-florida.com/llms.txt
    https://www.easy-move-florida.com/llms-full.txt

`llms.txt` и `llms-full.txt` в этом списке не для поисковика — это то, что
ассистенты читают первым, и там правились и рейтинги, и охват, и доля бригады.

## 3. Украинские страницы — убрана доля бригады (7)

    https://www.easy-move-florida.com/ua
    https://www.easy-move-florida.com/ua/miami-movers
    https://www.easy-move-florida.com/ua/sunny-isles-movers
    https://www.easy-move-florida.com/ua/hallandale-beach-movers
    https://www.easy-move-florida.com/ua/hollywood-movers
    https://www.easy-move-florida.com/ua/aventura-movers
    https://www.easy-move-florida.com/ua/fort-lauderdale-movers

## 4. Кластеры hreflang, которые были односторонними (11)

Здесь обязательно переобойти **обе** стороны пары: Google считает связку только
тогда, когда обе страницы ссылаются друг на друга.

    https://www.easy-move-florida.com/boca-raton-movers
    https://www.easy-move-florida.com/ru/boca-raton-movers
    https://www.easy-move-florida.com/ru/bal-harbour-movers
    https://www.easy-move-florida.com/ru/boynton-beach-movers
    https://www.easy-move-florida.com/ru/coral-springs-movers
    https://www.easy-move-florida.com/ru/delray-beach-movers
    https://www.easy-move-florida.com/ru/miami-beach-movers
    https://www.easy-move-florida.com/ru/north-miami-beach-movers
    https://www.easy-move-florida.com/ru/pembroke-pines-movers
    https://www.easy-move-florida.com/ru/sunrise-movers
    https://www.easy-move-florida.com/ru/weston-movers

Английские половины остальных девяти пар (`/weston-movers`, `/sunrise-movers` и
так далее) уйдут вместе с полным sitemap — они и раньше отдавали правильный
кластер, менялась только встречная сторона.

---

## Чего не делать

- Не просить переобход, пока две проверки вверху не прошли на проде.
- Не гонять `indexnow-ping.ts` по нескольку раз в день: повторные пинги одних и
  тех же URL без изменений — сигнал спама, а не свежести.
- Не трогать `/v2` и `/privacy` в GSC — они noindex. `/terms` тоже noindex: он
  поменялся по сути, но его читают люди, а не поиск.

## Через 2–3 недели

Повторить шесть живых выдач из `docs/ACTION-PLAN.md` и отдельно спросить ChatGPT
и Perplexity «how much do movers cost in Miami» и «русские грузчики Майами».
Если оттуда всё ещё выпадает «from $1,500» или старый рейтинг — кэш не
обновился, для первых недель это нормально.

В Search Console отдельно посмотреть отчёт по языкам: ошибки «нет обратных
тегов» по девяти русским страницам и `/boca-raton-movers` должны уйти. Это самый
проверяемый результат всего прохода — либо они исчезли, либо нет.
