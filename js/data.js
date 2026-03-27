/**
 * Krishna's Travels — Location & Story Dataset
 * Each entry represents a key location in the divine pastimes of Lord Krishna,
 * drawn from the Srimad Bhagavatam and Mahabharata.
 *
 * phase: "childhood" | "youth" | "king" — controls marker color tint
 * xp: quest mode points awarded on completion
 * demonType: shape hint for battle theater SVG
 * battleScenes: array of {narration, krishnaAction, demonAction, effect}
 */

const KRISHNA_LOCATIONS = [
  {
    id: 1,
    name: "Mathura",
    subtitle: "The Sacred Birthplace",
    demon: "Birth of Krishna & Slaying of Kamsa",
    demonSanskrit: "कंसवध",
    lat: 27.4924,
    lng: 77.6737,
    phase: "childhood",
    xp: 100,
    demonType: "humanoid",
    summary: "The holy city where Krishna was born in the prison of King Kamsa, and where He later returned to slay the tyrant.",
    battleScenes: [
      { narration: "In the wrestling arena of Mathura, the tyrant Kamsa watches from his throne as his champions prepare to destroy the young cowherd.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "The mighty elephant Kuvalayapida charges at Krishna, but the boy seizes its tusks and hurls the beast aside like a toy.", krishnaAction: "grab", demonAction: "charge", effect: "impact" },
      { narration: "Krishna enters the arena. The wrestlers Chanura and Mushtika attack — but Krishna and Balarama dispatch them with devastating blows.", krishnaAction: "strike", demonAction: "attack", effect: "shockwave" },
      { narration: "Krishna leaps onto the royal dais, seizes Kamsa by the hair, and drags the tyrant to the arena floor.", krishnaAction: "leap", demonAction: "flee", effect: "glow" },
      { narration: "With a single mighty blow, Krishna ends the reign of Kamsa. The chains of Devaki and Vasudeva shatter. Dharma is restored!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Mathura, the ancient city on the banks of the Yamuna, holds the most sacred of all events — the birth of Lord Krishna. On the eighth day of the dark fortnight of the month of Shravana, amidst thunderstorms and cosmic upheaval, Krishna appeared in the prison cell of King Kamsa as the eighth son of Devaki and Vasudeva.</p>

<p>Kamsa, the tyrannical king of the Bhoja dynasty, had been warned by a divine prophecy that Devaki's eighth child would be his destroyer. Consumed by fear, he had imprisoned both Devaki and Vasudeva and killed six of their newborn sons. The seventh child, Balarama, was mystically transferred to the womb of Rohini in Gokul.</p>

<p>When Krishna appeared, the prison guards fell into deep slumber, the chains broke, and the gates opened of their own accord. Vasudeva carried the newborn across the flooding Yamuna to Gokul, where he exchanged the child with the newborn daughter of Yashoda and Nanda Maharaja. This daughter, Yogamaya, when seized by Kamsa, slipped from his hands and ascended to the sky, warning him that his destroyer had already been born.</p>

<p class="story-section-title">The Return to Mathura</p>

<p>Years later, Krishna and Balarama were invited to Mathura by Kamsa, who planned to kill them through a series of traps. Upon entering the city, Krishna broke the great sacrificial bow of Shiva, alarming Kamsa. In the wrestling arena, Krishna first defeated the mighty elephant Kuvalayapida that was set upon them at the gate. Then He faced and vanquished the champion wrestlers Chanura and Mushtika, who fought on Kamsa's behalf.</p>

<p>Finally, Krishna leaped onto the royal dais, seized Kamsa by his hair, and dragged him to the arena floor. With a single blow, He ended the reign of the tyrant. Krishna then freed His parents and restored Kamsa's father, King Ugrasena, to the throne. The city of Mathura rejoiced, and dharma was restored.</p>`
  },

  {
    id: 2,
    name: "Gokul",
    subtitle: "The Pastoral Sanctuary",
    demon: "Putana, Trinavarta & Shakatasura",
    demonSanskrit: "पूतना · तृणावर्त · शकटासुर",
    lat: 27.4500,
    lng: 77.7167,
    phase: "childhood",
    xp: 100,
    demonType: "giant",
    summary: "Where infant Krishna was raised in secret and defeated three fearsome demons sent by Kamsa during His earliest days.",
    battleScenes: [
      { narration: "The demoness Putana, disguised as a beautiful woman, enters Gokul and approaches baby Krishna with poisoned breasts.", krishnaAction: "stand", demonAction: "approach", effect: "none" },
      { narration: "Baby Krishna suckles fearlessly — drawing not just the poison but Putana's very life force from her body.", krishnaAction: "grab", demonAction: "stagger", effect: "drain" },
      { narration: "Putana screams, revealing her monstrous true form. She collapses, her gigantic body stretching across the fields.", krishnaAction: "glow", demonAction: "fall", effect: "burst" },
      { narration: "The whirlwind demon Trinavarta snatches Krishna into the sky — but the child becomes heavier than a mountain!", krishnaAction: "stand", demonAction: "charge", effect: "glow" },
      { narration: "Trinavarta crashes to earth, unable to bear the divine weight. Baby Krishna sits peacefully upon the fallen demon.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Gokul, the simple cowherd village across the Yamuna from Mathura, became the sanctuary where baby Krishna was secretly raised by Nanda Maharaja and Mother Yashoda. But Kamsa, learning that the child who would destroy him had been spirited away, sent a series of demons to find and kill the divine infant.</p>

<p class="story-section-title">Putana — The Poisonous Demoness</p>

<p>The first to come was Putana, a fearsome Rakshasi who could assume any form at will. Disguising herself as a beautiful and charming woman, she entered Gokul and approached baby Krishna, offering to nurse Him. She had smeared deadly poison on her breasts. But when infant Krishna suckled, He drew not only the poison but her very life force. Putana assumed her horrific true form — a gigantic demoness — and fell dead, her body stretching across the fields. The cowherd women, finding baby Krishna playfully crawling on her body, scooped Him up in relief. Despite her murderous intent, because she had offered her breast to the Supreme Lord, Putana was granted liberation.</p>

<p class="story-section-title">Shakatasura — The Cart Demon</p>

<p>When Krishna was only a few months old, Yashoda placed Him beneath a large wooden cart during a celebration. The demon Shakatasura entered the cart, making it loom threateningly over the infant. Baby Krishna, with one small kick of His lotus feet, shattered the massive cart into pieces, sending its contents flying in all directions. The cowherd folk were astonished, unable to comprehend how an infant could possess such extraordinary power.</p>

<p class="story-section-title">Trinavarta — The Whirlwind Demon</p>

<p>Kamsa next sent Trinavarta, a demon who could assume the form of a devastating whirlwind. The demon swept through Gokul, creating a terrible dust storm that blinded everyone, and snatched baby Krishna into the sky. But as Trinavarta ascended, the child became impossibly heavy — heavier than a mountain. The demon could not bear the weight and, unable to release the child who had seized his throat, Trinavarta crashed to the earth and perished. Baby Krishna was found sitting peacefully on the demon's chest.</p>`
  },

  {
    id: 3,
    name: "Vrindavan",
    subtitle: "The Forest of Divine Play",
    demon: "Bakasura, Aghasura, Kaliya, Keshi & Vyomasura",
    demonSanskrit: "बकासुर · अघासुर · कालिय · केशी · व्योमासुर",
    lat: 27.5800,
    lng: 77.7000,
    phase: "youth",
    xp: 150,
    demonType: "serpent",
    summary: "The enchanted forest where cowherd boy Krishna vanquished five mighty demons while tending the cows with His friends.",
    battleScenes: [
      { narration: "The great serpent Kaliya poisons the Yamuna river. Birds fall dead from the toxic fumes. Krishna dives into the deadly pool.", krishnaAction: "leap", demonAction: "taunt", effect: "none" },
      { narration: "Kaliya coils around Krishna with crushing force, his many hoods hissing venom. The cowherd boys cry out in terror.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "Krishna expands His body, breaking free of the coils! He leaps atop the serpent's central hood.", krishnaAction: "grab", demonAction: "stagger", effect: "shockwave" },
      { narration: "Krishna dances upon Kaliya's hoods — each step striking with the weight of the entire universe. The serpent begins to submit.", krishnaAction: "strike", demonAction: "stagger", effect: "glow" },
      { narration: "Kaliya's wives pray for mercy. Krishna, ever compassionate, spares the serpent and banishes him to the ocean. The Yamuna is purified!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Vrindavan, the forest of Tulasi groves along the winding Yamuna, was the stage for Krishna's most beloved childhood pastimes. Here, as a young cowherd boy, He would venture into the forests with His friends and the calves, and here the demons of Kamsa met their end in extraordinary ways.</p>

<p class="story-section-title">Bakasura — The Crane Demon</p>

<p>While the cowherd boys were playing near a lake, the monstrous crane demon Bakasura appeared. Enormous in size, with a beak like two mountain peaks, he swallowed Krishna whole. But within the demon's throat, Krishna became so scorching hot that Bakasura was forced to spit Him out. As the demon lunged again with his massive beak, Krishna seized both halves and tore him apart with the ease of splitting a blade of grass. The demigods showered flowers from the heavens.</p>

<p class="story-section-title">Aghasura — The Serpent Demon</p>

<p>Aghasura, the brother of Putana and Bakasura, assumed the form of a colossal python, stretching his body across a mountain pass with his mouth gaping like a cavern. The innocent cowherd boys, thinking it a natural cave, walked straight into his mouth. Krishna, understanding the peril, entered last. Inside the demon's body, He expanded Himself until Aghasura suffocated and his life force departed through the top of his skull as a brilliant light, which merged into Krishna — granting him liberation.</p>

<p class="story-section-title">Kaliya — The Serpent of the Yamuna</p>

<p>The most dramatic of Vrindavan's pastimes was the subduing of Kaliya, a great multi-hooded serpent who had poisoned the waters of the Yamuna. The river boiled with venom; birds flying overhead fell dead from the fumes. Krishna dove into the deadly pool and, after a fierce struggle, danced upon Kaliya's many hoods, His lotus feet striking with the weight of the entire universe. Kaliya's wives, the Nagapatnis, prayed for mercy, and Krishna, ever compassionate, spared the serpent on the condition that he leave the Yamuna and return to the ocean. The waters of the Yamuna were purified, and the land was restored to life.</p>

<p class="story-section-title">Keshi — The Horse Demon</p>

<p>Keshi arrived in Vrindavan in the form of a terrifying horse of enormous proportions, his hooves tearing up the earth and his neighing shattering the sky. He charged at Krishna with his mouth open wide. Krishna thrust His left arm into the demon's mouth, and the arm expanded like a red-hot iron rod. Keshi's teeth shattered, and the arm swelled within him until the demon split apart and fell lifeless. It was after this victory that the sage Narada bestowed upon Krishna the name "Keshava" — the slayer of Keshi.</p>

<p class="story-section-title">Vyomasura — The Sky Demon</p>

<p>Vyomasura, a son of the demon Maya, infiltrated the cowherd boys' games by disguising himself as one of them. During a game of "cops and robbers," he began secretly abducting the boys playing the role of "cattle" and hiding them in a mountain cave. When Krishna realized that many of His friends had vanished, He seized Vyomasura, who revealed his massive demonic form. Krishna wrestled him to the ground and slew him, then freed all the captured boys from the cave.</p>`
  },

  {
    id: 4,
    name: "Talavana",
    subtitle: "The Palm Forest",
    demon: "Dhenukasura — The Donkey Demon",
    demonSanskrit: "धेनुकासुर",
    lat: 27.5200,
    lng: 77.6800,
    phase: "youth",
    xp: 150,
    demonType: "beast",
    summary: "A forbidden palm grove guarded by a ferocious donkey demon, liberated by Krishna and Balarama.",
    battleScenes: [
      { narration: "Balarama shakes the palm trees of Talavana. The sound of falling fruits draws out the furious demon Dhenukasura.", krishnaAction: "stand", demonAction: "charge", effect: "none" },
      { narration: "The donkey demon kicks with devastating force! Balarama catches its hind legs with one hand.", krishnaAction: "grab", demonAction: "attack", effect: "impact" },
      { narration: "Balarama whirls Dhenukasura overhead and hurls him into a palm tree with such force that both shatter!", krishnaAction: "strike", demonAction: "stagger", effect: "shockwave" },
      { narration: "The remaining donkey demons charge in a herd. Krishna and Balarama dispatch them all, their bodies breaking the trees.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Talavana, the lush palm forest near Vrindavan, was filled with ripe Tala fruits whose fragrance wafted throughout the region. Yet no one dared enter, for the forest was guarded by the terrible demon Dhenukasura, who had assumed the form of a wild donkey of immense strength, along with his herd of demonic followers.</p>

<p>The cowherd boys, enticed by the sweet smell of the ripe palm fruits, told Krishna and Balarama about the forbidden forest. The two brothers, fearless and eager to please Their friends, led everyone to Talavana. Balarama shook the palm trees, causing a rain of delicious fruits.</p>

<p>The sound drew out Dhenukasura in a fury. The demon charged at Balarama, turning around to deliver devastating kicks with his powerful hind legs. Balarama calmly caught the demon's legs, whirled him around with one hand, and hurled him into the top of a palm tree with such force that the demon perished and the tree was uprooted. One by one, the remaining donkey demons attacked and were similarly dispatched by Krishna and Balarama, their bodies breaking the palm trees as they were flung skyward.</p>

<p>With Dhenukasura destroyed, Talavana became a place of beauty and abundance, and the cowherd community could freely enjoy its fruits. The forest, once a place of terror, became another playground for Krishna's divine pastimes.</p>`
  },

  {
    id: 5,
    name: "Govardhana Hill",
    subtitle: "The Sacred Mountain",
    demon: "Defiance of Indra's Wrath",
    demonSanskrit: "गोवर्धन लीला",
    lat: 27.4978,
    lng: 77.4603,
    phase: "youth",
    xp: 150,
    demonType: "celestial",
    summary: "Where young Krishna lifted an entire mountain on His little finger for seven days to shelter Vrindavan from Indra's devastating storm.",
    battleScenes: [
      { narration: "Indra, king of the gods, enraged by Krishna's defiance, unleashes the apocalyptic Samvartaka storm clouds upon Vrindavan.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Torrential rain, hailstones and violent winds lash the village. Rivers flood. The people cry out in despair.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "Seven-year-old Krishna calmly walks to Govardhana Hill and lifts the entire mountain on the little finger of His left hand!", krishnaAction: "leap", demonAction: "stagger", effect: "glow" },
      { narration: "For seven days and nights, Krishna holds the hill aloft like a vast umbrella. All of Vrindavan takes shelter beneath it.", krishnaAction: "glow", demonAction: "attack", effect: "shockwave" },
      { narration: "Indra, humbled and ashamed, withdraws his storm. He descends and offers prayers of repentance to the Supreme Lord.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>The lifting of Govardhana Hill stands among the most celebrated of all Krishna's pastimes, a demonstration of divine power that humbled the king of the celestials himself.</p>

<p>Each year, the people of Vrindavan performed a grand yajna (sacrifice) in honor of Indra, the king of the demigods and lord of rain. Young Krishna, however, questioned this tradition. He argued that the people's livelihood depended not on Indra but on the land, the cows, and Govardhana Hill — which provided pastures, water, herbs, and shelter. He persuaded Nanda Maharaja and the cowherd community to redirect their worship to Govardhana Hill instead.</p>

<p>Indra, enraged by what he saw as insolence, summoned the most devastating clouds of cosmic destruction — the Samvartaka clouds, which are unleashed only at the time of universal annihilation. Torrential rains, hailstones, and violent winds lashed Vrindavan without mercy. Rivers flooded, and the people and animals faced certain destruction.</p>

<p>Krishna, then a boy of seven years, calmly walked to Govardhana Hill and lifted the entire mountain upon the little finger of His left hand, as effortlessly as a child picks up a mushroom. He held it aloft like a vast umbrella, and all the residents of Vrindavan — men, women, children, and animals — took shelter beneath it. For seven days and seven nights, Krishna stood motionless, holding the hill, while Indra poured his full fury upon them to no avail.</p>

<p>At last, humbled and ashamed, Indra withdrew the storm clouds and descended from his celestial abode. Accompanied by Surabhi, the divine cow, he approached Krishna and offered prayers of repentance. He performed an abhisheka (ceremonial bathing) of Krishna and acknowledged His supreme position. Krishna gently set the hill back in its place, and the people of Vrindavan, overflowing with love and gratitude, celebrated the victory with great festivity.</p>

<p>To this day, the circumambulation of Govardhana Hill (Govardhan Parikrama) remains one of the most cherished pilgrimages in the Vaishnava tradition.</p>`
  },

  {
    id: 6,
    name: "Dwaraka",
    subtitle: "The Golden City in the Sea",
    demon: "Shalva & the Flying City of Saubha",
    demonSanskrit: "शाल्ववध · सौभनगर",
    lat: 22.2376,
    lng: 68.9674,
    phase: "king",
    xp: 200,
    demonType: "celestial",
    summary: "Krishna's magnificent island kingdom in the western sea, which withstood the aerial assault of the demon king Shalva.",
    battleScenes: [
      { narration: "The iron flying fortress Saubha appears over Dwaraka, raining boulders and serpents upon the golden city.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "Shalva projects an illusion of Vasudeva's severed head. For a moment, even Krishna is moved — then recognizes the maya.", krishnaAction: "stand", demonAction: "taunt", effect: "glow" },
      { narration: "Krishna mounts His chariot and unleashes a volley of divine arrows at the flying citadel, piercing its defenses.", krishnaAction: "strike", demonAction: "stagger", effect: "shockwave" },
      { narration: "The Sudarshana Chakra blazes forth and shatters the Saubha fortress! Shalva falls from the sky.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>After the events in Mathura, and facing repeated attacks from Jarasandha's armies, Krishna made the momentous decision to establish a new kingdom far to the west. Through His divine power, He had the celestial architect Vishwakarma construct the magnificent city of Dwaraka — a golden metropolis built upon an island in the western sea, complete with crystal palaces, jeweled gardens, wide boulevards, and impregnable fortifications.</p>

<p>Dwaraka became the seat of Krishna's kingdom, from which He governed with wisdom and justice as the king of the Yadavas. The city was so splendid that it rivaled the capital of Indra himself.</p>

<p class="story-section-title">The Attack of Shalva</p>

<p>King Shalva, a friend of Shishupala, had vowed to destroy Dwaraka to avenge Shishupala's death. Through severe penances to Lord Shiva, he obtained the Saubha — a massive flying city forged of iron, capable of becoming invisible and raining destruction from the skies.</p>

<p>Shalva attacked Dwaraka while Krishna was away at Indraprastha. The flying fortress rained boulders, serpents, storms, and weapons upon the city. The Yadava warriors, led by Pradyumna (Krishna's son), mounted a fierce defense but could not bring down the airborne citadel. Pradyumna was struck unconscious by Shalva's commander Dyuman, though he recovered and continued fighting.</p>

<p>When Krishna returned and saw the devastation, He engaged Shalva directly. The battle was intense — Shalva employed illusions, at one point projecting a false image of Vasudeva (Krishna's father) being beheaded. For a moment, even Krishna appeared moved, but He quickly recognized the maya (illusion) for what it was. With His Sudarshana Chakra, Krishna destroyed the Saubha fortress and then slew Shalva, ending the aerial terror once and for all.</p>`
  },

  {
    id: 7,
    name: "Rajgir",
    subtitle: "Fortress of the Magadha Empire",
    demon: "Jarasandha — The Unkillable King",
    demonSanskrit: "जरासन्धवध",
    lat: 25.0267,
    lng: 85.4167,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "The mountain-ringed capital where Jarasandha, who attacked Mathura seventeen times, was finally slain through Krishna's divine strategy.",
    battleScenes: [
      { narration: "Disguised as Brahmanas, Krishna, Bhima, and Arjuna enter the fortress of Rajgir to challenge the unkillable Jarasandha.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Bhima and Jarasandha lock in a titanic wrestling match that rages for twenty-seven days without rest.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "Each time Bhima tears Jarasandha apart, the halves magically rejoin! Bhima grows frustrated.", krishnaAction: "stand", demonAction: "stagger", effect: "glow" },
      { narration: "Krishna picks up a twig, splits it in two, and throws the halves in opposite directions — the signal!", krishnaAction: "strike", demonAction: "stagger", effect: "shockwave" },
      { narration: "Bhima tears Jarasandha in half and hurls the pieces apart — they cannot rejoin! The unkillable king finally falls.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Rajgir (Rajagriha), the ancient capital of the Magadha kingdom, was a fortress city encircled by five hills, and it was the seat of the most formidable enemy Krishna ever faced through conventional warfare — King Jarasandha.</p>

<p>Jarasandha was the father-in-law of Kamsa. When Krishna slew Kamsa, Jarasandha swore vengeance. He assembled the largest armies the world had ever seen — including forces from vassal kings across the subcontinent — and attacked Mathura not once, not twice, but seventeen times. Each time, Krishna and Balarama defeated his armies, but Jarasandha himself could not be killed, for he had been born in two halves that were magically joined together by the demoness Jara, making him nearly invincible.</p>

<p>It was partly to protect the people of Mathura from these relentless assaults that Krishna relocated His kingdom to the island fortress of Dwaraka. But the threat of Jarasandha remained — he had imprisoned 20,800 kings in his dungeons, planning a massive human sacrifice.</p>

<p class="story-section-title">The Strategic Duel</p>

<p>When Yudhishthira wished to perform the Rajasuya sacrifice, Krishna knew that Jarasandha had to be eliminated first, for no king could claim universal sovereignty while Jarasandha lived. Rather than wage all-out war, Krishna devised a brilliant strategy: He, Bhima, and Arjuna would go to Rajgir disguised as Brahmanas seeking charity.</p>

<p>Jarasandha, bound by his vow to never refuse a Brahmana's request, agreed to a wrestling duel with Bhima. The two fought for twenty-seven days without rest, evenly matched in strength. Bhima grew frustrated — each time he tore Jarasandha's body apart, the halves would rejoin and the king would rise again.</p>

<p>Krishna, watching from the sidelines, picked up a twig and split it in two, then threw each half in opposite directions. Bhima understood the signal: he tore Jarasandha in half and threw the two halves in opposite directions so they could not rejoin. The unkillable king finally fell. Krishna then freed all the imprisoned monarchs, who became devoted allies of the Pandavas.</p>`
  },

  {
    id: 8,
    name: "Pragjyotishpura",
    subtitle: "City of Eastern Sorcery",
    demon: "Narakasura & Mura",
    demonSanskrit: "नरकासुरवध · मुरवध",
    lat: 26.6338,
    lng: 92.7926,
    phase: "king",
    xp: 200,
    demonType: "serpent",
    summary: "The eastern demon stronghold where Krishna earned the name 'Murari' by slaying the five-headed demon Mura, and then defeated the tyrant Narakasura.",
    battleScenes: [
      { narration: "Riding the divine eagle Garuda, Krishna approaches Pragjyotishpura and destroys its layered defenses one by one.", krishnaAction: "leap", demonAction: "taunt", effect: "none" },
      { narration: "The five-headed demon Mura rises from the depths, unleashing weapons from all five mouths!", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "The Sudarshana Chakra blazes in a great arc, severing all five of Mura's heads in a single throw! Krishna earns the name Murari.", krishnaAction: "strike", demonAction: "stagger", effect: "shockwave" },
      { narration: "Narakasura charges on his war elephant, hurling the divine Shakti lance. Krishna destroys it mid-flight.", krishnaAction: "grab", demonAction: "charge", effect: "glow" },
      { narration: "With the Sudarshana Chakra, Krishna dispatches Narakasura. 16,100 captive princesses are freed!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Pragjyotishpura (modern-day Tezpur in Assam) was the capital of the demon king Narakasura (also known as Bhaumasura, the son of the Earth goddess Bhumi). Despite his divine parentage, Narakasura had become a terror to the three worlds. He had defeated Indra, stolen the earrings of Aditi (the mother of the gods), seized Indra's royal canopy and the sacred mountain Maniparvata, and abducted 16,100 princesses whom he held captive in his fortress.</p>

<p class="story-section-title">The Demon Mura</p>

<p>Pragjyotishpura was guarded by elaborate defenses — mountains, weapons of fire, water, wind, and an impenetrable noose of Mura. Mura was a fearsome five-headed demon who served as Narakasura's chief guardian. He wielded a devastating trident and could fight with superhuman ferocity.</p>

<p>Krishna, riding the divine eagle Garuda with Satyabhama at His side, systematically destroyed each layer of defense. When Mura rose from the depths to attack, unleashing a shower of weapons from his five mouths, Krishna calmly dispatched him with His Sudarshana Chakra, severing all five heads in a single blazing arc. It was this victory that earned Krishna the celebrated name "Murari" — the enemy of Mura.</p>

<p class="story-section-title">The Fall of Narakasura</p>

<p>Mura's seven sons attacked in a rage but were all destroyed. Finally, Narakasura himself emerged, mounted on his war elephant and wielding the divine lance Shakti. The battle shook the earth. Narakasura hurled his Shakti lance at Krishna, but the Lord destroyed it mid-flight. Riding Garuda, Krishna unleashed a volley of divine arrows and finally dispatched the demon king with His Sudarshana Chakra.</p>

<p>Before dying, Narakasura, humbled at last, requested that the day of his death be celebrated with joy. This day is commemorated as Naraka Chaturdashi, the day before Diwali. Krishna freed all 16,100 captive princesses, and at their request, married each one of them, restoring their honor and dignity. He returned Aditi's earrings and Indra's canopy to their rightful owners.</p>`
  },

  {
    id: 9,
    name: "Shonitpur",
    subtitle: "City of Blood",
    demon: "Banasura — The Thousand-Armed Demon",
    demonSanskrit: "बाणासुरवध",
    lat: 26.6500,
    lng: 92.8000,
    phase: "king",
    xp: 200,
    demonType: "giant",
    summary: "Where Krishna battled the thousand-armed devotee of Shiva and even faced Lord Shiva Himself in combat.",
    battleScenes: [
      { narration: "Krishna marches on Shonitpur to rescue His grandson Aniruddha. Lord Shiva himself rides out to defend Banasura.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Krishna and Shiva engage in direct combat! The Supreme Lord and the Great Destroyer clash, shaking the universe.", krishnaAction: "strike", demonAction: "attack", effect: "shockwave" },
      { narration: "Shiva unleashes the Shiva-jvara fever weapon. Krishna counters with the Vishnu-jvara. Shiva withdraws, exhausted.", krishnaAction: "glow", demonAction: "stagger", effect: "glow" },
      { narration: "Krishna turns to the thousand-armed Banasura and the Sudarshana Chakra begins its merciless work, severing arms by the hundred.", krishnaAction: "strike", demonAction: "stagger", effect: "impact" },
      { narration: "At Shiva's intercession, Krishna spares Banasura's life, leaving him with four arms. Aniruddha is freed!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Shonitpur (also in the Tezpur region) was the capital of Banasura, a powerful Asura king with one thousand arms. Banasura was the son of the great King Bali and a devoted worshipper of Lord Shiva. So pleased was Shiva with Banasura's devotion that he served as the personal guardian of Banasura's city, and Shiva's bull Nandi guarded the gates.</p>

<p>Banasura had a beautiful daughter named Usha, who fell in love with Krishna's grandson Aniruddha after seeing him in a dream. With the help of her friend Chitralekha, a skilled artist and mystic who could identify any person from a drawing, Usha had Aniruddha magically transported to her chambers. When Banasura discovered this, he was enraged and captured Aniruddha, binding him with serpent ropes.</p>

<p class="story-section-title">War Against the Gods</p>

<p>When Krishna learned that His grandson had been captured, He marshaled the Yadava army and marched on Shonitpur. What followed was one of the most extraordinary battles in Hindu scripture — a war in which mortal, demon, and god fought on the same battlefield.</p>

<p>Lord Shiva himself rode out to defend Banasura, accompanied by his son Kartikeya and the Shiva-ganas (attendants). Krishna and Shiva engaged in direct combat — a battle between the Supreme Personality of Godhead and the Great Destroyer that caused the universe to tremble. Krishna neutralized Shiva's divine weapons one by one: when Shiva unleashed the Shiva-jvara (the fever weapon), Krishna countered with the Vishnu-jvara. Eventually, Shiva, exhausted, withdrew.</p>

<p>Krishna then turned to Banasura and methodically severed his thousand arms with His Sudarshana Chakra, leaving only four. When Shiva approached Krishna and interceded on behalf of his devotee, Krishna, honoring Shiva's request, spared Banasura's life and granted him freedom from fear. Aniruddha was freed, and he and Usha were married with blessings from both sides. This episode beautifully demonstrates that even in conflict, the relationship between Vishnu and Shiva is one of mutual love and respect.</p>`
  },

  {
    id: 10,
    name: "Indraprastha",
    subtitle: "Capital of the Pandavas",
    demon: "Shishupala — The Hundred Offenses",
    demonSanskrit: "शिशुपालवध",
    lat: 28.6139,
    lng: 77.2090,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "At Yudhishthira's Rajasuya sacrifice, Krishna fulfilled an ancient promise by slaying Shishupala after the hundredth offense.",
    battleScenes: [
      { narration: "At the great Rajasuya sacrifice, Shishupala rises and hurls insult after insult at Krishna before the assembled kings.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Krishna sits calm and smiling, silently counting each offense. The court watches in stunned silence.", krishnaAction: "stand", demonAction: "taunt", effect: "glow" },
      { narration: "'Your offenses have reached their limit.' Krishna's voice rings through the hall as He raises His hand.", krishnaAction: "glow", demonAction: "stagger", effect: "shockwave" },
      { narration: "The Sudarshana Chakra blazes across the hall like a second sun and severs Shishupala's head in one blazing arc!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Indraprastha, the magnificent capital built by the Pandavas on the banks of the Yamuna (in the region of modern Delhi), was the setting for one of the most dramatic confrontations in the Mahabharata — the slaying of Shishupala at the great Rajasuya sacrifice.</p>

<p>Shishupala, the king of Chedi, was born with three eyes and four arms. A divine voice at his birth had proclaimed that his extra features would disappear when he was placed in the lap of the person destined to kill him — and so it happened when baby Shishupala was placed in Krishna's lap. His mother, Shrutashrava (Krishna's aunt), extracted a promise from Krishna that He would forgive one hundred offenses from Shishupala before taking action.</p>

<p class="story-section-title">The Rajasuya Sacrifice</p>

<p>When Yudhishthira performed the grand Rajasuya yajna to declare his sovereignty, the assembled kings were asked to decide who should receive the first honor (agra-puja). Bhishma, the patriarch, nominated Krishna, and the assembly agreed. This enraged Shishupala, who had long harbored hatred toward Krishna, partly because Krishna had taken Rukmini — whom Shishupala considered his betrothed.</p>

<p>Shishupala rose and delivered a venomous public denunciation of Krishna, hurling insult after insult. He mocked Krishna's birth as a cowherd, questioned His kshatriya status, ridiculed the decision to honor Him, and challenged His divinity. The assembled kings sat in shocked silence as the tirade continued.</p>

<p>Krishna remained seated, calm and smiling, silently counting each offense. When Shishupala uttered his hundredth insult, Krishna simply said, "Your offenses have reached their limit." He released His Sudarshana Chakra, which blazed across the hall like a second sun and severed Shishupala's head. A radiant light emerged from Shishupala's body and merged into Krishna — for Shishupala was actually Jaya, the gatekeeper of Vaikuntha, fulfilling his third and final cursed birth, now liberated forever.</p>`
  },

  {
    id: 11,
    name: "Near Indraprastha",
    subtitle: "On the Road from Chedi",
    demon: "Dantavakra — The Loyal Avenger",
    demonSanskrit: "दन्तवक्रवध",
    lat: 28.4500,
    lng: 77.0000,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "Shishupala's loyal friend charged Krishna single-handedly in revenge, armed with only a mace, and met his liberation.",
    battleScenes: [
      { narration: "Dantavakra, consumed by grief for Shishupala, charges alone toward Krishna wielding a massive mace.", krishnaAction: "stand", demonAction: "charge", effect: "none" },
      { narration: "'Today I shall repay the debt I owe my friend!' He swings his mace at Krishna's head with tremendous force.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "Krishna raises the divine mace Kaumodaki and strikes Dantavakra squarely on the chest.", krishnaAction: "strike", demonAction: "stagger", effect: "shockwave" },
      { narration: "The blow shatters his heart. A brilliant light emerges and merges into Krishna — the gatekeeper Vijaya is liberated forever.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Dantavakra, the king of Karusha, was a close friend and ally of Shishupala. Upon learning of Shishupala's death at the Rajasuya sacrifice, he was consumed with grief and rage. Unlike other opponents who marshaled vast armies, Dantavakra's fury was so immediate and personal that he charged toward Krishna alone, on foot, armed with nothing but a massive mace.</p>

<p>According to the Bhagavatam, Dantavakra was, like Shishupala, a reincarnation of Vijaya, the second gatekeeper of Vaikuntha. The two gatekeepers, Jaya and Vijaya, had been cursed by the four Kumaras to take three births in the material world as enemies of Vishnu. Their first births were as Hiranyaksha and Hiranyakashipu, their second as Ravana and Kumbhakarna, and their third and final births were as Shishupala and Dantavakra.</p>

<p>When Dantavakra appeared before Krishna, he raised his mace and proclaimed, "Today I shall repay the debt I owe my friend by killing you!" He swung his mace at Krishna's head with tremendous force. But Krishna, wielding His own mace Kaumodaki, struck Dantavakra squarely on the chest. The blow shattered Dantavakra's heart, and he fell to the earth, blood flowing from his mouth.</p>

<p>As with Shishupala, a brilliant light emerged from Dantavakra's body and entered into Krishna, signifying the final liberation of Vijaya. The celestial gatekeepers had completed their cursed sojourn in the material world and returned to their eternal posts at the gates of Vaikuntha, never to fall again. Those who witnessed the event marveled at the visible proof that even those who opposed the Lord with hatred attained liberation through their intense, unwavering focus on Him.</p>`
  },

  {
    id: 12,
    name: "Kashi (Varanasi)",
    subtitle: "City of Light",
    demon: "Paundraka — The False Vasudeva",
    demonSanskrit: "पौण्ड्रकवध",
    lat: 25.3176,
    lng: 82.9739,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "Where a deluded king impersonated Krishna, demanding that the real Krishna surrender His identity — and paid the ultimate price.",
    battleScenes: [
      { narration: "Paundraka, dressed in absurd imitation of Krishna's divine symbols, stands on the battlefield demanding surrender.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "'You demand I surrender my symbols? Very well — I shall send them to you.' Krishna smiles and raises His hand.", krishnaAction: "glow", demonAction: "stagger", effect: "glow" },
      { narration: "The real Sudarshana Chakra blazes across the battlefield, decapitating the impostor and his ally the King of Kashi!", krishnaAction: "strike", demonAction: "fall", effect: "shockwave" },
      { narration: "A fiery demon summoned for revenge is turned back by the Chakra. The false Vasudeva's line is ended forever.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Paundraka Vasudeva was the king of Pundra (Bengal region) who had convinced himself — aided by the flattery of foolish courtiers — that he was the true Vasudeva, the Supreme Personality of Godhead. He dressed himself to imitate Krishna in every detail: he carried an imitation Sudarshana Chakra, a fake Sharnga bow, a mock Kaumodaki mace, wore artificial Kaustubha gem and Vanamala garland, and even had artisans create artificial extra arms to mimic Krishna's four-armed Vishnu form.</p>

<p>Emboldened by his delusion and supported by his ally, the King of Kashi (Varanasi), Paundraka sent an audacious message to Krishna at Dwaraka: "I am the true Vasudeva. You are an impostor who has falsely assumed my symbols and titles. Surrender them at once, or face me in battle."</p>

<p>Krishna, greatly amused, accepted the challenge and rode to confront Paundraka on the battlefield near Kashi. When He saw Paundraka arrayed in his ridiculous imitation of divine symbols, Krishna laughed and said, "You have demanded that I surrender my symbols to you. Very well — I shall now send them to you." He released the real Sudarshana Chakra, which blazed across the battlefield, decapitated Paundraka, and then turned on the king of Kashi, severing his head as well.</p>

<p class="story-section-title">The Fire of Kashi</p>

<p>The son of the King of Kashi, seeking revenge, performed a ritual to invoke a terrifying fiery demon (Kritya) to destroy Krishna. The blazing apparition marched toward Dwaraka, scorching everything in its path. But Krishna dispatched the Sudarshana Chakra, which turned the Kritya back upon its creator. The fiery being returned to Kashi and destroyed the prince and his priests. The Sudarshana Chakra then set the entire city ablaze before returning to Krishna's hand. Later, Kashi was rebuilt and purified, continuing its sacred role as the city of Lord Shiva.</p>`
  },

  {
    id: 13,
    name: "Kurukshetra",
    subtitle: "The Field of Dharma",
    demon: "The Bhagavad Gita & The Great War",
    demonSanskrit: "भगवद्गीता · धर्मक्षेत्र",
    lat: 29.9695,
    lng: 76.8783,
    phase: "king",
    xp: 200,
    demonType: "celestial",
    summary: "The sacred battlefield where Krishna delivered the Bhagavad Gita and guided the Pandavas to victory in the great war for dharma.",
    battleScenes: [
      { narration: "On the vast plain of Kurukshetra, two enormous armies face each other. Arjuna asks Krishna to drive between them.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Arjuna sees his kin arrayed for slaughter and casts down his bow in despair. 'I shall not fight.'", krishnaAction: "stand", demonAction: "stagger", effect: "none" },
      { narration: "Krishna reveals the Bhagavad Gita — the Song of God. He teaches dharma, karma, and the immortal nature of the soul.", krishnaAction: "glow", demonAction: "stagger", effect: "glow" },
      { narration: "Krishna reveals His cosmic Vishvarupa form — all of creation contained within His body! Arjuna trembles in awe.", krishnaAction: "glow", demonAction: "fall", effect: "shockwave" },
      { narration: "Arjuna takes up his Gandiva bow once more. The eighteen-day war begins — and dharma shall prevail.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Kurukshetra, the "Field of Dharma," was the site of the climactic eighteen-day war of the Mahabharata — the greatest conflict of the ancient world, in which Krishna played the pivotal role not as a warrior but as the divine charioteer and spiritual guide of Arjuna.</p>

<p>The war erupted after all attempts at peace between the Pandavas and Kauravas failed, largely due to the intransigence of Duryodhana. Armies from across Bharatavarsha assembled on the vast plain, with eleven akshauhini divisions on the Kaurava side and seven on the Pandava side. Krishna, honoring a choice He had offered, served as Arjuna's charioteer, having vowed not to pick up weapons Himself.</p>

<p class="story-section-title">The Bhagavad Gita</p>

<p>On the morning of the first day, as the two armies faced each other, Arjuna asked Krishna to drive his chariot between the opposing forces. Seeing his grandsire Bhishma, his guru Drona, his cousins, and countless kinsmen arrayed for mutual slaughter, Arjuna was overcome with despair. He cast down his Gandiva bow and declared he would not fight.</p>

<p>What followed was the Bhagavad Gita — the "Song of God" — a discourse of 700 verses in which Krishna revealed the deepest truths of existence to Arjuna. He taught the nature of the soul (atman), the paths of karma yoga, jnana yoga, and bhakti yoga, the structure of material nature, and ultimately revealed His universal form (Vishvarupa) — a vision so overwhelming that Arjuna trembled in awe. Krishna's central teaching was that Arjuna must perform his duty (svadharma) without attachment to results, surrendering all actions to the Supreme.</p>

<p class="story-section-title">The Eighteen Days</p>

<p>Throughout the war, Krishna served as the supreme strategist. Though He had vowed not to fight, His guidance was decisive: it was Krishna who devised the strategy to fell Bhishma (using Shikhandi as a shield), who counseled the half-truth that brought down Drona, who warned Arjuna against Karna's divine weapons, and who protected Arjuna from Ashwatthama's Narayanastra by advising everyone to lay down their weapons.</p>

<p>On the final day, after Duryodhana fell to Bhima's mace, the war ended. The Pandavas, guided by Krishna's wisdom, had triumphed — but at a staggering cost. The field of Kurukshetra stood as an eternal reminder that dharma must be upheld, even when the price is beyond measure.</p>`
  },

  {
    id: 14,
    name: "Hastinapura",
    subtitle: "City of the Elephant Throne",
    demon: "Intrigues of the Kauravas",
    demonSanskrit: "हस्तिनापुर",
    lat: 29.1604,
    lng: 78.0243,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "The Kuru capital where Krishna served as peace ambassador and where His divine diplomacy nearly averted the great war.",
    battleScenes: [
      { narration: "Krishna enters the Kuru court as peace ambassador. He asks Duryodhana for just five villages for the Pandavas.", krishnaAction: "stand", demonAction: "taunt", effect: "none" },
      { narration: "Duryodhana refuses — not even the land on a needle's tip! He orders his soldiers to seize Krishna.", krishnaAction: "stand", demonAction: "charge", effect: "impact" },
      { narration: "Krishna laughs and reveals a glimpse of His universal form! His body blazes with the light of a thousand suns.", krishnaAction: "glow", demonAction: "stagger", effect: "shockwave" },
      { narration: "From His form emerge all the gods, all creation. The courtiers fall back in terror. Even Bhishma and Drona bow.", krishnaAction: "glow", demonAction: "fall", effect: "glow" },
      { narration: "Krishna withdraws His divine form and departs. Peace has been rejected — war is now inevitable.", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Hastinapura, the capital of the Kuru dynasty built on the banks of the Ganga, was the epicenter of the political drama that led to the Mahabharata war. It was here that Krishna demonstrated His role not merely as a warrior or king, but as the supreme diplomat and upholder of dharma.</p>

<p class="story-section-title">The Peace Embassy</p>

<p>Before the war, when all other negotiations had failed, Krishna Himself volunteered to go to Hastinapura as the Pandavas' peace ambassador. He entered the Kuru court and, in the presence of Dhritarashtra, Bhishma, Drona, Vidura, and the assembled nobles, made a final appeal for peace. He asked only for five villages for the five Pandavas — a modest request that would avert catastrophic bloodshed.</p>

<p>Duryodhana, drunk with pride, refused even this. He declared he would not give the Pandavas enough land to place the tip of a needle, let alone five villages. More dangerously, he attempted to capture Krishna Himself, believing that if he could bind Krishna, the Pandavas would be powerless.</p>

<p class="story-section-title">The Vishvarupa in the Court</p>

<p>When Duryodhana's soldiers moved to seize Him, Krishna laughed and revealed a glimpse of His universal form right there in the Kuru court. His body blazed with the light of a thousand suns. From His form emerged Brahma, Shiva, Indra, the Adityas, the Rudras, and all the armies of the cosmos. Fire and radiance filled the hall, and the courtiers fell back in terror, shielding their eyes. Even Bhishma and Drona bowed in awe.</p>

<p>Only Duryodhana, blinded by ego, remained unmoved. Krishna withdrew His divine form, declared that peace had been rejected, and departed. He stopped at Vidura's humble home for a meal — honoring devotion over opulence — and then visited Kunti, the Pandavas' mother, carrying her message of courage to her sons.</p>

<p>The failure of the peace embassy made the war inevitable, but Krishna's effort ensured that the moral burden fell entirely upon the Kauravas. History would remember that the Lord Himself had walked into the enemy's court and offered peace, and it was refused.</p>`
  },

  {
    id: 15,
    name: "Gomantaka",
    subtitle: "The Mountain Fortress",
    demon: "Jarasandha's First Siege",
    demonSanskrit: "गोमन्तक पर्वत",
    lat: 15.4000,
    lng: 73.8700,
    phase: "king",
    xp: 200,
    demonType: "humanoid",
    summary: "When Jarasandha first besieged Them with a massive army, Krishna and Balarama leaped from this mountain fortress and escaped to establish Dwaraka.",
    battleScenes: [
      { narration: "Jarasandha's massive army surrounds Gomantaka mountain. He sets the entire mountain ablaze, trapping Krishna and Balarama.", krishnaAction: "stand", demonAction: "attack", effect: "impact" },
      { narration: "The flames roar upward. Jarasandha is confident the brothers will perish in the inferno.", krishnaAction: "stand", demonAction: "taunt", effect: "glow" },
      { narration: "Unharmed by the flames, Krishna and Balarama leap from the summit — a distance of eighty-eight miles!", krishnaAction: "leap", demonAction: "stagger", effect: "shockwave" },
      { narration: "The brothers escape to the western sea. This strategic retreat will lead to the founding of glorious Dwaraka!", krishnaAction: "finish", demonAction: "fall", effect: "burst" }
    ],
    fullStory: `<p>Gomantaka (identified with a mountain in the Goa region) plays a pivotal role in the transition of Krishna's story from Mathura to Dwaraka. After slaying Kamsa, Krishna faced the wrath of Kamsa's father-in-law Jarasandha, who assembled an enormous coalition army to avenge his son-in-law.</p>

<p>Jarasandha's first assault on Mathura was repelled by Krishna and Balarama, but the Magadha king was relentless. He attacked again and again, each time with larger forces, burning the countryside and terrorizing the people. After the seventeenth siege, Krishna made the strategic decision to withdraw from Mathura, not from fear, but to protect the innocent citizens from endless warfare.</p>

<p>Krishna and Balarama retreated to Gomantaka mountain, with Jarasandha's forces in hot pursuit. The demon king surrounded the mountain and set it ablaze, confident that the brothers would perish in the inferno. But Krishna and Balarama, unharmed by the flames, leaped from the summit — a distance of eighty-eight miles according to the texts — and escaped.</p>

<p>This strategic withdrawal led directly to the founding of Dwaraka. Krishna understood that sometimes wisdom lies not in standing and fighting, but in choosing the right battlefield. By establishing an island fortress far from Jarasandha's reach, He protected His people while biding time for the day when Jarasandha's strength could be broken through stratagem rather than open war. The people of Mathura were safely relocated, and Dwaraka rose as one of the most glorious cities in the world.</p>`
  }
];

/**
 * Historical paintings and artwork from Wikimedia Commons (Public Domain)
 * mapped to each location by ID.
 */
var LOCATION_IMAGES = {
  1:  { url: 'images/mathura-kamsa.jpg',             caption: 'Krishna Slaying Kamsa \u2014 Indian lithograph, c.\u00a01910' },
  2:  { url: 'images/gokul-putana.jpg',              caption: 'The Death of the Demoness Putana \u2014 Bhagavata Purana, Bikaner, c.\u00a01610' },
  3:  { url: 'images/vrindavan-kaliya.jpg',           caption: 'Krishna Quelling the Serpent King Kaliya \u2014 Bhagavata Purana, Marwar, 1718' },
  4:  { url: 'images/talavana-dhenuka.jpg',           caption: 'Krishna Killing Dhenukasura \u2014 Bhagavata Purana, Malwa, c.\u00a01650' },
  5:  { url: 'images/govardhana-hill.jpg',            caption: 'Krishna Lifting Mount Govardhan, c.\u00a01800 \u2014 National Museum, New Delhi' },
  6:  { url: 'images/dwaraka-palace.jpg',             caption: 'Sudama Beholds Krishna\u2019s Golden Palace in Dwaraka \u2014 Garhwal, c.\u00a01775\u20131790' },
  7:  { url: 'images/rajgir-jarasandha.jpg',          caption: 'Bhima and Jarasandha Wrestling \u2014 Raja Ravi Varma' },
  8:  { url: 'images/pragjyotishpura-naraka.jpg',     caption: 'Krishna Battles the Armies of Demon Naraka, c.\u00a01520 \u2014 Metropolitan Museum' },
  9:  { url: 'images/shonitpur-usha.jpg',             caption: 'Aniruddha and Usha \u2014 Colour lithograph, 19th century' },
  10: { url: 'images/indraprastha-vishvarupa.jpg',    caption: 'Krishna Reveals His Universal Form \u2014 Indian print, c.\u00a01940s' },
  11: { url: 'images/dantavakra-chariot.jpg',         caption: 'Krishna and Rukmini in a Celestial Chariot \u2014 LACMA' },
  12: { url: 'images/kashi-chakra.jpg',               caption: 'The Sudarshana Chakra in Action \u2014 Harivamsha, Mughal court, c.\u00a01585\u20131590' },
  13: { url: 'images/kurukshetra-chariot.jpg',        caption: 'Krishna and Arjuna on the Chariot \u2014 18th\u201319th century' },
  14: { url: 'images/hastinapura-mediation.jpg',      caption: 'Krishna Mediating between Pandavas and Kauravas \u2014 Mughal painting, c.\u00a01600' },
  15: { url: 'images/gomantaka-journey.jpg',          caption: 'Krishna and Balarama on Their Journey \u2014 Colour lithograph, c.\u00a01895' }
};

var FORMS_IMAGES = {
  1:  { url: 'images/form-bala-krishna.jpg',   caption: 'Yashoda with Krishna \u2014 Watercolor, 1914' },
  2:  { url: 'images/form-makhan-chor.jpg',    caption: 'Krishna and the Cowherds on a Picnic \u2014 Bhagavata Purana, LACMA' },
  3:  { url: 'images/form-govinda.jpg',        caption: 'Krishna Playing the Flute with the Cowherd Girls \u2014 Wellcome Collection' },
  4:  { url: 'images/form-murlidhar.jpg',      caption: 'Krishna with Flute \u2014 Pahari School, c.\u00a01790\u20131800' },
  5:  { url: 'images/govardhana-hill.jpg',     caption: 'Krishna Lifting Mount Govardhan, c.\u00a01800 \u2014 National Museum, New Delhi' },
  6:  { url: 'images/gomantaka-journey.jpg',   caption: 'Krishna and Balarama on Their Journey \u2014 Colour lithograph, c.\u00a01895' },
  7:  { url: 'images/form-dwarakadhish.jpg',   caption: 'Krishna and Rukmini Ride Away in a Chariot \u2014 Lithograph, c.\u00a01895' },
  8:  { url: 'images/kurukshetra-chariot.jpg',  caption: 'Krishna and Arjuna on the Chariot \u2014 18th\u201319th century' },
  9:  { url: 'images/indraprastha-vishvarupa.jpg', caption: 'Krishna Reveals His Universal Form \u2014 Indian print, c.\u00a01940s' },
  10: { url: 'images/form-yogeshwara.jpg',     caption: 'Kama Disturbs Krishna\u2019s Meditation \u2014 Gita Govinda, c.\u00a01650\u201360' }
};

/**
 * Gallery card art for Divine Avatars (dashavatara) \u2014 Wikimedia Commons, public domain or open license.
 */
var AVATARS_IMAGES = {
  1:  { url: 'images/avatar-matsya.jpg',     caption: 'Matsya avatar \u2014 painting on paper, British Museum, c.\u00a01820' },
  2:  { url: 'images/avatar-kurma.jpg',     caption: 'Kurma avatar \u2014 Indian painting (Vishnu as tortoise), Wikimedia Commons' },
  3:  { url: 'images/avatar-varaha.jpg',    caption: 'The Emergence of Var\u0101ha \u2014 Bhagavata Purana folio attributed to Manaku of Guler, c.\u00a01740' },
  4:  { url: 'images/avatar-narasimha.jpg', caption: 'Narasimha avatar \u2014 Indian painting, Wikimedia Commons' },
  5:  { url: 'images/avatar-vamana.jpg',    caption: 'V\u0101mana avatar \u2014 Indian painting, Wikimedia Commons' },
  6:  { url: 'images/avatar-parashurama.jpg', caption: 'Para\u015bur\u0101ma \u2014 sculpture depiction, photo Wikimedia Commons' },
  7:  { url: 'images/avatar-rama.jpg',      caption: 'R\u0101ma with bow and arrows \u2014 chromolithograph, Wikimedia Commons' },
  8:  { url: 'images/mathura-kamsa.jpg',    caption: 'Krishna Slaying Kamsa \u2014 Indian lithograph, c.\u00a01910 (Krishna l\u012bl\u0101vat\u0101ra)' },
  9:  { url: 'images/avatar-buddha.jpg',   caption: 'Buddha, Dashavatara ganjifa card \u2014 LACMA collections' },
  10: { url: 'images/avatar-kalki.jpg',     caption: 'Kalki avatar \u2014 Indian painting, Wikimedia Commons' }
};

/**
 * Gallery card art for Hindu Deities \u2014 museums and Wikimedia Commons.
 */
var DEITIES_IMAGES = {
  1:  { url: 'images/deity-vishnu.jpg',     caption: 'Vishnu on Garu\u1e0da \u2014 photo, Wikimedia Commons' },
  2:  { url: 'images/deity-shiva.jpg',      caption: '\u015aiva Na\u1e6dar\u0101ja (Lord of Dance) \u2014 bronze, LACMA' },
  3:  { url: 'images/deity-devi.jpg',       caption: 'The Goddess Durg\u0101 slaying Mahisha \u2014 painting, Metropolitan Museum of Art' },
  4:  { url: 'images/deity-brahma.jpg',     caption: 'Brahm\u0101 on the swan \u2014 Company school painting, Wikimedia Commons' },
  5:  { url: 'images/deity-lakshmi.jpg',    caption: 'Vishnu and Lak\u1e63m\u012b \u2014 Pahari (Bilaspur), c.\u00a01810' },
  6:  { url: 'images/deity-saraswati.jpg',  caption: 'Goddess Sarasvat\u012b \u2014 Raja Ravi Varma' },
  7:  { url: 'images/deity-ganesha.jpg',    caption: 'Ga\u1e47e\u015ba \u2014 Kalighat painting, 19th c.' },
  8:  { url: 'images/deity-kartikeya.jpg',  caption: 'Somaskanda: Shiva, Uma, and Skanda \u2014 South Indian bronze, Wikimedia Commons' },
  9:  { url: 'images/deity-hanuman.jpg',    caption: 'Hanuman finds Sita in Ashoka vana \u2014 from the Akbar Ramayana, c.\u00a016th c.' },
  10: { url: 'images/deity-surya.jpg',      caption: 'Mandala of Surya, the Sun God \u2014 Nepal, Walters Art Museum' }
};
