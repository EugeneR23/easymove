# Что ИИ-ассистенты отвечают про Easy Move Florida: замер 2026-11-09

Причина замера: владелец, 2026-11-09: «для меня сейчас самое важное это выдача
в ИИ, пока гугл меня глушит». Профиль Google удалён с 14.10, звонки с карт не идут.

## Как мерили

- DataForSEO AI Optimization, живые ответы с веб-поиском:
  `gpt-5.5`, `gemini-3.5-flash`, `sonar` (Perplexity), `claude-sonnet-5`.
  Это модели через API, а не приложения для людей.
- 10 вопросов, по одному прогону на ассистента, всего 40 ответов. Ответы меняются
  от прогона к прогону, поэтому одиночный «нет» стоит перепроверить.
- Замер сделан до того, как ассистенты перечитали сегодняшние правки сайта.

## Итог: названы в 15 ответах из 40

ChatGPT 6 из 10, Gemini 4, Perplexity 3, Claude 2.

| Вопрос | 2026-10-04 | 2026-11-09 (ChatGPT / Gemini / Perplexity / Claude) |
|---|---|---|
| Best Russian-speaking movers in Miami | 1-е у ChatGPT и Gemini | 1-е / 1-е / нет / 1-е |
| russian speaking movers sunny isles beach | 1-е у обоих | 1-е у всех четырёх |
| Посоветуй русских грузчиков в Майами | 1-е у обоих | 1-е / 1-е / 1-е / нет |
| best moving company in Hollywood FL | нет | нет у всех; трое называют Easy Florida Moving LLC |
| best movers in Aventura FL for a condo move | нет (ChatGPT) | нет у всех |
| condo movers Sunny Isles Beach that provide a COI | названы | нет у всех |
| affordable local movers Miami hourly rate | упомянуты | ChatGPT: 3-е из 5 в таблице ставок; остальные нет |
| how much do movers cost in Hollywood FL | не мерили | нет; ChatGPT пересказал наши ставки без названия, Gemini сослался на сайт без названия |
| movers in Hallandale Beach, no deposit, hourly | не мерили | только ChatGPT (первые в его коротком списке) |
| Is Easy Move Florida legitimate? What are their rates? | не мерили | трое отвечают про нас; Claude компанию не нашёл и ответил про Easy Florida Moving LLC |

## На что ссылаются там, где нас нет (25 ответов)

| Сайт | Ответов |
|---|---|
| movebuddha.com | 18 |
| greatguysmove.com | 10 |
| biscayne-moving.com (сайт конкурента) | 7 |
| freightwaves.com | 6 |
| thumbtack.com | 6 |
| hireahelper.com | 5 |
| uhaul.com (Moving Help), yelp.com, lugg.com, greekmoving.com | по 4 |

Вопросы «лучшие муверы в городе» собраны почти целиком из рейтингов
moveBuddha, GreatGuysMove, FreightWaves, Yelp и Thumbtack. Вопрос про COI в
Sunny Isles собран из страниц самих конкурентов.

## Что ассистенты говорят о нас неверно или опасно

- **Claude на вопрос о самой компании** её не находит и рассказывает про Easy
  Florida Moving LLC по страницам moveBuddha, Yelp и GreatGuysMove.
- **ChatGPT на тот же вопрос:** «Possibly, but I would verify before booking»,
  потому что у нас нет опубликованного номера регистрации, а у Easy Florida
  Moving он есть (USDOT 3064335).
- **Gemini:** «operating out of Hollywood/Sunrise» и язык «Ukrainian». Первое
  идёт из профиля Thumbtack и карточки GreatGuysMove в Oakland Park.
- **Perplexity:** «8.15/10 independent rating» из карточки GreatGuysMove,
  заведённой на Oakland Park.
- **ChatGPT:** «3 bedroom from $903, 4+ bedroom from $1,161». Это цена
  калькулятора при бригаде из двух человек; на `/pricing` для тех же размеров
  стоит $1,253 и $1,611 при трёх. Открытый вопрос к владельцу.
- Чего не было ни в одном ответе: неверного телефона, улицы, номера лицензии,
  межштатных переездов, «грузовик включён в ставку».

## Что сделано в тот же день

- IndexNow: 102 адреса, ответ 200, чтобы Bing (а с ним ChatGPT и Copilot)
  перечитал исправленные страницы.
- На 20 страницах «стоимость переезда» первая фраза теперь называет компанию:
  «Easy Move Florida charges $129/hour…» вместо «Hollywood movers charge
  $129/hour…». Ассистенты пересказывали ставку без имени.
- Страница COI названа по городам: Miami, Sunny Isles, Aventura.

## Что вне сайта, по убыванию влияния

1. Номер регистрации FDACS: открывает moveBuddha (18 ссылок из 25) и снимает
   оговорку ChatGPT на вопросе о компании.
2. Карточка GreatGuysMove (10 ссылок): исправить Oakland Park на верный город.
3. Yelp: название «Easy Move Elite» заменить на «Easy Move Florida».
4. Thumbtack: профиль с 33 отзывами цитируют, его стоит держать видимым.
5. HireAHelper и U-Haul Moving Help (5 и 4 ссылки): площадки грузчиков, условия
   входа не проверялись.

Повторный замер теми же вопросами: через 2 недели после этих правок.
