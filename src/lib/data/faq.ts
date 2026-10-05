/**
 * The homepage FAQ. Rendered by FAQSection, emitted as its FAQPage schema, and
 * served as /ai/faq.json, all from this one array.
 */
import { SERVICE_SCOPE } from '@/lib/data/scope';
import { hoursSentence } from '@/lib/data/hours';

export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: 'How much does a local move cost with Easy Move Florida?',
    a: 'A crew of two movers is $129/hour and a crew of three is $179/hour, with a three-hour minimum, plus a truck fee per day charged at the same figure as the crew rate — $129 with two movers, $179 with three. Fuel, tolls and mileage are inside it; there is no separate fuel surcharge. The smallest possible invoice is therefore $516: three hours with two movers plus the truck. A typical 1-bedroom runs $516–$774 all-in, a 2-bedroom $645–$1,253, and a 3-bedroom $1,253–$1,611. The rate is the same seven days a week, year-round: it does not go up for weekends or peak season.',
  },
  {
    q: 'What is included in the hourly rate, and what is billed separately?',
    a: 'The hourly rate covers your crew, furniture pads, stretch wrap and mattress bags on loan, dollies and straps, and basic disassembly and reassembly of standard items like bed frames, dining tables and sectional sofas. Billed as their own lines on the estimate: the truck at $129 per day, packing materials you keep (boxes, TV cartons, corner protectors, mattress bags left in storage) as flat packages rather than per-item markups, specialty items such as a piano, safe or marble slab, and upgraded valuation coverage if you want it. Loaner pads and wrap return with the truck at no charge; anything left permanently in storage is billed.',
  },
  {
    q: 'Do stairs, elevators or a long carry cost extra?',
    a: 'No. There is no stairs fee, no heavy item fee, no elevator fee and no long carry fee. On an hourly job those things cost time, not extra fees, so they are priced into the hours we estimate. Tell us about stairs, long carries and freight elevator rules up front and the estimate will be accurate. If we find out on move day the hours go up, but the rate and the fee structure never change.',
  },
  {
    q: 'What happens if the job runs longer than the estimate?',
    a: 'The same hourly rate continues and you pay for the hours actually worked — no surge pricing, no penalty for going past the estimate. We bill in 15-minute increments after the three-hour minimum, so finishing early makes the invoice smaller rather than rounding up to the next hour. If the crew leader sees the job heading past the estimate, you are told at that moment with the current hour count so you can decide whether to continue. And if something turns up that is not on the estimate at all — a garage nobody mentioned, an extra room, a piece that needs crating — work pauses until you approve the revised number.',
  },
  {
    q: 'What is a COI and why does my building need one?',
    a: 'A Certificate of Insurance is a one-page document proving the moving company carries insurance and naming your building as an additional insured party, which protects the HOA if a mover damages a lobby, elevator or common area. Most condominiums in Miami, Aventura, Sunny Isles Beach, Brickell and Fort Lauderdale will refuse elevator access or turn a crew away at the dock without one. We issue COIs within 24 hours of booking at no charge — send the building name, the management company and any coverage minimums they specify, and the certificate goes straight to management with a copy to you.',
  },
  {
    q: 'How do freight elevator reservations work?',
    a: 'Your building assigns a fixed window — commonly two to four hours on a weekday — and only one move can use the elevator in that window, so it books out first at the end and beginning of each month. We call your management office once the date is set, reserve the window, and schedule the crew to arrive before it opens so the clock starts on loading rather than on waiting. Buildings that require elevator padding or floor protection tell us at reservation time and we bring it. If your building only allows moves on weekdays, tell us early: those slots are the constraint, not our availability.',
  },
  {
    q: 'How is a move into or out of storage handled?',
    a: 'It is billed the same way as any other hourly move, with the storage facility as one of the addresses. Two things are worth knowing before you book. First, drive time between your home, the facility and the destination is on the clock, so a move that goes home-to-storage-to-home costs more hours than a direct move. Second, anything left permanently in the unit is billed rather than loaned: pads or blankets that stay wrapped around your furniture in storage are charged, because they do not come back on the truck. If you want your goods padded in storage, say so and we will put the materials on the estimate up front.',
  },
  {
    // [TODO: Evgenii — confirm insurance carrier, coverage limits and claim
    // turnaround, then state them here. Do not publish specifics until verified.]
    q: 'How does valuation coverage work if something is damaged?',
    a: 'Every move carries our standard liability terms at no extra cost, and for high-value pieces — fine art, antiques, designer furniture, instruments, electronics — you can add upgraded valuation coverage priced on the declared replacement value and quoted in writing before the move, rather than the per-pound federal default most national van lines apply. Damage claims come directly to the owner, not to a third-party claims processor: call 786-305-1844 and you are talking to the person who can settle it.',
  },
  {
    q: 'Can you handle a last-minute or same-week move?',
    a: `Often yes — being owner-run rather than a franchise with a central dispatch queue means short-notice jobs get answered directly. Send the move date, both addresses, an approximate inventory (bedrooms, any specialty items) and any building requirements such as COI deadlines or elevator windows to WhatsApp at +1 786-305-1844. We reply during business hours, ${hoursSentence('en')}, with a written quote and a confirmed crew.`,
  },
  {
    q: 'Is the moving crew Russian-speaking?',
    a: 'Yes — the founder, the dispatch coordinator, and most of the crew at Easy Move Florida speak Russian fluently, which makes the company a practical choice for the Russian-speaking communities concentrated in Sunny Isles Beach, Aventura, Hallandale Beach, Hollywood, North Miami Beach, and parts of Miami Beach. Quotes can be issued in Russian or English, the on-site walkthrough on move day can be conducted in Russian, and any sensitive logistics conversations — about pricing, valuation, or building access — can be handled in whichever language the client prefers. The website is published in both English and Russian (`/ru/`). For clients who specifically need a fully Russian-speaking crew rather than just a Russian-speaking crew leader, ask when booking and the dispatcher will confirm availability for the requested date; this is usually available with 5+ days of notice.',
  },
  { ...SERVICE_SCOPE.en.faq },
  {
    q: 'Can you do small handyman work alongside the move?',
    a: 'Yes — Easy Move Florida bundles small handyman services with moves so you do not have to coordinate a second visit after the truck leaves. Common requests include TV mounting (single or multi-screen, including soundbar wiring), wall-anchor picture and mirror hanging, IKEA or Wayfair furniture assembly, curtain rod installation, floating shelf installation, baby gates, and minor furniture repairs from transit. When handyman work is bundled with a same-day move, the handyman portion is discounted versus standalone pricing and is billed in the same continuous hourly window, not as a separate trip. Easy Move Florida does NOT perform licensed plumbing or electrical work, gas line installation, HVAC, or anything requiring a permit pull — for those, we refer to vetted local licensed trades. Mention any handyman needs at quote time so the right tools and anchors are loaded on the truck.',
  },
  {
    q: 'Is a tip expected for the moving crew?',
    a: 'No — tips are optional and never a condition of service, because the hourly rate already pays the crew a competitive South Florida wage. If you do tip, the local standard for a move that went well is 15–20% of the labour portion split across the crew: on a $900 two-bedroom move that is roughly $45–$60 per mover on a three-person crew. Tips can go on the card at the end of the job, in cash to the crew, or by Zelle to the crew leader; the company takes no cut. If the move had problems, skipping the tip is fair signal — and call the owner directly at +1 786-305-1844 so it gets fixed.',
  },
  {
    q: "What's the cancellation and rescheduling policy?",
    a: 'Free — cancel or reschedule at no charge any time more than 48 hours before the start time, and there is no deposit to book in the first place (deposit-required policies are one of the most common red flags among South Florida movers). A reschedule moves to the next date that works for both of us. Inside 48 hours we handle it case by case depending on whether the slot can be filled; if the crew has already been dispatched to your address, the three-hour minimum applies.',
  },
  {
    q: 'Is Easy Move Florida the same company as Easy Florida Moving?',
    a: 'No. Easy Florida Moving (easyfloridamoving.com, Hallandale Beach) is a different company. Easy Move Florida is owner-run by Evgenii Romanov and based in Hollywood, FL, and our only phone number is 786-305-1844. If a listing shows another number or a Hallandale address under our name, it belongs to the other company.',
  },
];

/**
 * The same 14 questions for /ru, translated as written (owner, 2026-10-01:
 * "Publish as is" after reading docs/RU_FAQ_DRAFT_2026-10-01.md). Question 11
 * is the already approved Russian scope answer, and the hours come from the
 * same constant as the English list.
 */
export const HOME_FAQS_RU: { q: string; a: string }[] = [
  {
    q: "Сколько стоит локальный переезд с Easy Move Florida?",
    a: "Бригада из двух грузчиков стоит $129 в час, из трёх — $179 в час, минимум три часа. Плюс трак: оплата за день по той же ставке, что у бригады, — $129 с двумя грузчиками, $179 с тремя. Топливо, платные дороги и пробег входят в эту сумму, отдельной надбавки за топливо нет. Поэтому минимальный возможный счёт — $516: три часа работы двух грузчиков плюс трак. Типичная 1-комнатная квартира обходится в $516–$774 со всем, 2-комнатная — в $645–$1,253, 3-комнатная — в $1,253–$1,611. Ставка одинакова семь дней в неделю и круглый год: в выходные и в высокий сезон она не растёт.",
  },
  {
    q: "Что входит в почасовую ставку, а что оплачивается отдельно?",
    a: "Ставка покрывает работу бригады, мебельные одеяла, стрейч-плёнку и чехлы для матрасов на время переезда, тележки и ремни, а также простую разборку и сборку стандартной мебели: каркасов кроватей, обеденных столов, угловых диванов. Отдельными строками в смете идут: трак — $129 за день; упаковочные материалы, которые остаются у вас (коробки, коробки для телевизоров, уголки, чехлы для матрасов, оставленные на хранении), — готовыми наборами, а не наценкой за каждую единицу; специальные предметы вроде пианино, сейфа или мраморной плиты; расширенное страховое покрытие, если оно вам нужно. Одеяла и плёнка на время переезда уезжают с траком бесплатно; всё, что остаётся на хранении насовсем, оплачивается.",
  },
  {
    q: "Лестницы, лифт или долгий перенос стоят дороже?",
    a: "Нет. Платы за лестницы, за тяжёлые предметы, за лифт и за долгий перенос нет. При почасовой оплате всё это стоит времени, а не отдельных сборов, поэтому учитывается в часах, которые мы закладываем в смету. Расскажите о лестницах, долгом переносе и правилах грузового лифта заранее — и смета будет точной. Если мы узнаем об этом только в день переезда, часов станет больше, но ставка и порядок оплаты не меняются.",
  },
  {
    q: "Что будет, если работа займёт больше времени, чем в смете?",
    a: "Действует та же почасовая ставка, и вы платите за фактически отработанные часы — без повышенных тарифов и без штрафа за выход за рамки сметы. После трёхчасового минимума время считается шагами по 15 минут, так что если мы закончим раньше, счёт будет меньше, а не округлится до следующего часа. Если старший бригады видит, что работа выходит за пределы сметы, вам сразу сообщают, сколько часов уже прошло, чтобы вы решили, продолжать ли. А если обнаруживается то, чего в смете нет вообще, — гараж, о котором никто не сказал, лишняя комната, вещь, которой нужен ящик, — работа останавливается, пока вы не одобрите новую сумму.",
  },
  {
    q: "Что такое COI и зачем он моему зданию?",
    a: "Certificate of Insurance (COI) — одностраничный документ, который подтверждает, что у мувинговой компании есть страховка, и вписывает ваше здание дополнительным застрахованным лицом. Он защищает ассоциацию (HOA), если грузчик повредит лобби, лифт или общие помещения. Большинство кондоминиумов в Майами, Авентуре, Санни-Айлс-Бич, Брикелле и Форт-Лодердейле без него не дадут лифт или развернут бригаду у погрузочной площадки. Мы оформляем COI в течение 24 часов после бронирования бесплатно — пришлите название здания, управляющую компанию и минимальные суммы покрытия, если они указаны, и сертификат уйдёт прямо в управление, а копия — вам.",
  },
  {
    q: "Как бронируется грузовой лифт?",
    a: "Здание выделяет фиксированное окно — обычно от двух до четырёх часов в будний день, — и в это окно лифтом пользуется только один переезд, поэтому в конце и начале месяца его разбирают первым. Как только дата назначена, мы звоним в управление, бронируем окно и планируем приезд бригады до его начала, чтобы время шло на погрузку, а не на ожидание. Если здание требует обшивки лифта или защиты пола, нам говорят об этом при бронировании, и мы привозим всё нужное. Если ваше здание разрешает переезды только в будни, скажите заранее: ограничение — эти окна, а не наша загрузка.",
  },
  {
    q: "Как проходит переезд на склад или со склада?",
    a: "Он оплачивается так же, как любой почасовой переезд, а склад — просто один из адресов. Перед бронированием полезно знать две вещи. Во-первых, время в пути между домом, складом и новым адресом тоже оплачивается, поэтому переезд «дом — склад — дом» занимает больше часов, чем прямой. Во-вторых, всё, что остаётся на складе насовсем, оплачивается, а не выдаётся на время: одеяла, в которые мебель будет завёрнута на складе, оплачиваются, потому что они не возвращаются с траком. Если хотите хранить вещи в одеялах, скажите — и мы сразу внесём материалы в смету.",
  },
  {
    q: "Как работает страховое покрытие, если что-то повреждено?",
    a: "Каждый переезд идёт на наших стандартных условиях ответственности без доплаты, а для ценных вещей — искусства, антиквариата, дизайнерской мебели, музыкальных инструментов, электроники — можно добавить расширенное покрытие. Его цена считается от заявленной стоимости замены и фиксируется письменно до переезда, а не по федеральной ставке за фунт веса, которую применяет большинство национальных перевозчиков. Претензии по повреждениям идут напрямую к владельцу, а не к стороннему обработчику: позвоните на 786-305-1844 — и вы говорите с человеком, который может решить вопрос.",
  },
  {
    q: "Возьмётесь за срочный переезд или переезд на этой неделе?",
    a: `Часто да: компанией управляет владелец, а не франшиза с центральной очередью диспетчеров, поэтому на срочные заявки отвечают напрямую. Пришлите в WhatsApp на +1 786-305-1844 дату переезда, оба адреса, примерный список вещей (сколько комнат, есть ли особые предметы) и требования здания — сроки по COI или окна лифта. Мы отвечаем в рабочее время, ${hoursSentence('ru')}, письменной сметой и подтверждённой бригадой.`,
  },
  {
    q: "Бригада говорит по-русски?",
    a: "Да — основатель, координатор-диспетчер и бо́льшая часть бригады Easy Move Florida свободно говорят по-русски, поэтому компания удобна русскоязычным жителям Санни-Айлс-Бич, Авентуры, Халландейл-Бич, Голливуда, Норт-Майами-Бич и части Майами-Бич. Смету можно получить на русском или английском, осмотр в день переезда — провести на русском, а любые деликатные вопросы — о цене, страховании или доступе в здание — обсудить на удобном вам языке. Сайт работает на английском и русском. Если нужна полностью русскоязычная бригада, а не только русскоязычный старший, скажите при бронировании — диспетчер подтвердит наличие на нужную дату; обычно это возможно, если предупредить за 5 дней и больше.",
  },
  { ...SERVICE_SCOPE.ru.faq },
  {
    q: "Можете заодно сделать мелкие работы мастера?",
    a: "Да — Easy Move Florida совмещает мелкие работы мастера с переездом, чтобы вам не пришлось назначать второй визит после отъезда трака. Чаще всего просят: повесить телевизор (один или несколько экранов, включая проводку саундбара), повесить картины и зеркала на анкеры, собрать мебель IKEA или Wayfair, установить карнизы и навесные полки, поставить защитные ворота для детей, сделать мелкий ремонт мебели после перевозки. Если работа мастера идёт в один день с переездом, она стоит дешевле, чем отдельный вызов, и оплачивается в том же непрерывном почасовом окне, а не отдельным выездом. Easy Move Florida НЕ выполняет лицензируемые сантехнические и электромонтажные работы, подключение газа, HVAC и всё, что требует разрешения, — для этого мы рекомендуем проверенных местных лицензированных мастеров. Скажите о работах мастера при расчёте сметы, чтобы на трак загрузили нужные инструменты и крепёж.",
  },
  {
    q: "Нужно ли оставлять чаевые бригаде?",
    a: "Нет — чаевые по желанию и никогда не условие работы, потому что почасовая ставка уже платит бригаде конкурентную для Южной Флориды зарплату. Если всё же хотите оставить, местная норма после удачного переезда — 15–20 % от стоимости работы, поделённые на бригаду: при переезде 2-комнатной квартиры за $900 это примерно $45–$60 на грузчика при бригаде из трёх. Чаевые можно добавить к оплате картой в конце работы, отдать наличными бригаде или перевести через Zelle старшему; компания ничего из них не берёт. Если с переездом были проблемы, не оставить чаевые — нормальный сигнал; и позвоните владельцу напрямую на +1 786-305-1844, чтобы это исправить.",
  },
  {
    q: "Какие условия отмены и переноса?",
    a: "Бесплатно — отменить или перенести можно без оплаты в любой момент больше чем за 48 часов до начала, а депозита для бронирования нет вовсе (требование депозита — один из самых частых тревожных признаков у мувинговых компаний Южной Флориды). Перенос — на ближайшую дату, удобную обеим сторонам. Если до начала меньше 48 часов, решаем по ситуации — смотря, удастся ли занять это время; если бригада уже выехала к вам, действует трёхчасовой минимум.",
  },
  {
    q: 'Easy Move Florida и Easy Florida Moving — это одна компания?',
    a: 'Нет. Easy Florida Moving (easyfloridamoving.com, Халландейл-Бич) — другая компания. Easy Move Florida ведёт владелец Евгений Романов, база в Голливуде, Флорида, и наш единственный номер — 786-305-1844. Если в каталоге под нашим названием стоит другой номер или адрес в Халландейле — это данные другой компании.',
  },
];
