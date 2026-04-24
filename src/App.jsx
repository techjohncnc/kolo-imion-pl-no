import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/Button.jsx';
import { Card, CardContent } from './components/ui/Card.jsx';
import { Input } from './components/ui/Input.jsx';

const starterNames = [
  {
    name: 'Aleksander',
    international: 'Alexander / Alex / Sander',
    meaning: 'obrońca ludzi',
    origin: 'Greckie Alexandros: alexo — bronić + aner — człowiek.',
    polishFit: 'Bardzo mocne polskie korzenie. Klasyczne, eleganckie i nadal aktualne.',
    norwayFit: 'Dobre w Norwegii, szczególnie przez skróty Alex i Sander.',
    globalFit: 'Bardzo rozpoznawalne globalnie.',
    pros: ['premium i ponadczasowe', 'łatwy skrót Alex', 'dobrze wygląda w dokumentach'],
    cons: ['dość długie', 'często zmieniane na Alexander', 'mniej lekkie niż Filip lub Emil'],
    tags: ['polskie', 'norweskie', 'globalne', 'premium'],
    pl: 10, no: 8, global: 10, unique: 5, power: 10,
  },
  {
    name: 'Filip',
    international: 'Filip / Philip',
    meaning: 'miłośnik koni',
    origin: 'Greckie Philippos: philos — przyjaciel + hippos — koń.',
    polishFit: 'Bardzo naturalne w Polsce i bez polskich znaków.',
    norwayFit: 'Dobrze działa w Norwegii i Skandynawii.',
    globalFit: 'Wariant Philip jest powszechnie rozpoznawalny.',
    pros: ['krótkie i przyjazne', 'łatwe w wymowie', 'dobry balans Polska/Norwegia'],
    cons: ['czasem zapisywane jako Philip', 'dość popularne', 'mniej charakterne niż Oskar'],
    tags: ['polskie', 'norweskie', 'globalne', 'krótkie'],
    pl: 9, no: 9, global: 9, unique: 6, power: 9,
  },
  {
    name: 'Oskar',
    international: 'Oskar / Oscar',
    meaning: 'przyjaciel jeleni albo boska włócznia',
    origin: 'Imię łączone z tradycją irlandzko-gaelicką i germańską; popularny wariant skandynawski to Oskar.',
    polishFit: 'Popularne w Polsce, proste i bez znaków specjalnych.',
    norwayFit: 'Bardzo dobrze przyjęte w Norwegii.',
    globalFit: 'Oscar/Oskar jest znane w wielu krajach.',
    pros: ['mocne i krótkie', 'świetne w Norwegii', 'charakterne'],
    cons: ['rośnie popularność', 'dwie pisownie', 'może brzmieć twardo'],
    tags: ['polskie', 'norweskie', 'globalne', 'krótkie', 'modne'],
    pl: 9, no: 10, global: 9, unique: 5, power: 9,
  },
  {
    name: 'Leon',
    international: 'Leon / Leo',
    meaning: 'lew',
    origin: 'Greckie leon — lew; blisko łacińskiego Leo.',
    polishFit: 'Polskie, modne i krótkie, z dobrym znaczeniem.',
    norwayFit: 'Zrozumiałe w Norwegii; Leo brzmi bardzo naturalnie.',
    globalFit: 'Bardzo łatwe w wielu językach.',
    pros: ['krótkie', 'mocne znaczenie', 'dobry wariant Leo'],
    cons: ['mniej norweskie niż Oskar/Emil', 'może być mylone z Leo', 'coraz modniejsze'],
    tags: ['polskie', 'globalne', 'krótkie', 'modne'],
    pl: 9, no: 7, global: 9, unique: 7, power: 10,
  },
  {
    name: 'Emil',
    international: 'Emil / Émile',
    meaning: 'ambitny, rywalizujący',
    origin: 'Od łacińskiego Aemilius, rzymskiego nazwiska rodowego.',
    polishFit: 'Znane w Polsce, proste i bez znaków specjalnych.',
    norwayFit: 'Bardzo naturalne w Norwegii i Skandynawii.',
    globalFit: 'Dobre w Europie, szczególnie północnej i środkowej.',
    pros: ['krótkie', 'ciepłe', 'świetne w Norwegii'],
    cons: ['mniej mocne niż Oskar', 'w angielskim mniej oczywiste', 'dość delikatne'],
    tags: ['polskie', 'norweskie', 'krótkie'],
    pl: 8, no: 10, global: 8, unique: 5, power: 8,
  },
  {
    name: 'Kasper',
    international: 'Kasper / Kacper / Casper',
    meaning: 'skarbnik',
    origin: 'Skandynawska forma imienia Jasper; polski wariant to Kacper.',
    polishFit: 'Kacper ma bardzo polski charakter, Kasper jest kompromisem norweskim.',
    norwayFit: 'Kasper brzmi naturalnie w Norwegii.',
    globalFit: 'Rozpoznawalne, choć ma kilka pisowni.',
    pros: ['dobry most PL/NO', 'mniej oklepane', 'przyjazne'],
    cons: ['trzy pisownie', 'Kacper trudniejszy dla Norwegów', 'Casper może kojarzyć się z duszkiem'],
    tags: ['polskie', 'norweskie', 'unikalne'],
    pl: 9, no: 9, global: 7, unique: 8, power: 8,
  },
  {
    name: 'Adam',
    international: 'Adam',
    meaning: 'człowiek',
    origin: 'Hebrajskie adam — człowiek; powiązane z ziemią i stworzeniem człowieka.',
    polishFit: 'Bardzo polskie i tradycyjne, bez problemów z pisownią.',
    norwayFit: 'Łatwe do wymówienia w Norwegii.',
    globalFit: 'Jedno z najbardziej uniwersalnych imion świata.',
    pros: ['prosta pisownia', 'globalne', 'bezpieczny wybór'],
    cons: ['bardzo tradycyjne', 'mniej unikatowe', 'biblijne skojarzenie'],
    tags: ['polskie', 'norweskie', 'globalne', 'krótkie'],
    pl: 9, no: 8, global: 10, unique: 4, power: 8,
  },
  {
    name: 'Daniel',
    international: 'Daniel / Dan',
    meaning: 'Bóg jest moim sędzią',
    origin: 'Hebrajskie Daniyyel: din — sądzić + el — Bóg.',
    polishFit: 'Dobrze znane w Polsce i neutralne.',
    norwayFit: 'Używane i zrozumiałe w Norwegii.',
    globalFit: 'Bardzo rozpoznawalne w Europie i świecie.',
    pros: ['stabilne', 'profesjonalne', 'łatwe międzynarodowo'],
    cons: ['popularne', 'skracane do Dan', 'religijne pochodzenie'],
    tags: ['polskie', 'norweskie', 'globalne'],
    pl: 8, no: 8, global: 10, unique: 4, power: 8,
  },
  {
    name: 'Gabriel',
    international: 'Gabriel / Gabe',
    meaning: 'Bóg jest moim mocarzem',
    origin: 'Hebrajskie Gavri’el: gever — silny mężczyzna + el — Bóg.',
    polishFit: 'Eleganckie i dobrze znane w Polsce.',
    norwayFit: 'Znane w Norwegii i krajach nordyckich.',
    globalFit: 'Bardzo międzynarodowe.',
    pros: ['eleganckie', 'ładne znaczenie', 'globalne'],
    cons: ['religijne', 'może być skracane do Gabe/Gabi', 'kojarzy się z archaniołem'],
    tags: ['polskie', 'norweskie', 'globalne', 'premium'],
    pl: 8, no: 8, global: 10, unique: 6, power: 8,
  },
  {
    name: 'Sebastian',
    international: 'Sebastian / Seb / Bastian',
    meaning: 'czcigodny, dostojny',
    origin: 'Łacińskie Sebastianus; greckie sebastos oznacza czcigodny.',
    polishFit: 'Znane w Polsce, eleganckie i dojrzałe.',
    norwayFit: 'Rozpoznawalne w Norwegii.',
    globalFit: 'Silnie międzynarodowe.',
    pros: ['dojrzałe', 'dobre skróty', 'europejskie'],
    cons: ['długie', 'może być skracane', 'mniej świeże niż Leon'],
    tags: ['polskie', 'norweskie', 'globalne', 'premium'],
    pl: 8, no: 8, global: 10, unique: 5, power: 8,
  },
  {
    name: 'Lucas',
    international: 'Lucas / Lukas / Łukasz',
    meaning: 'pochodzący z Lukanii',
    origin: 'Łacińskie Lucas od greckiego Loukas; powiązane z regionem Lucania.',
    polishFit: 'Nawiązuje do polskiego Łukasza, ale zapis jest bardziej międzynarodowy.',
    norwayFit: 'Bardzo popularne i naturalne w Norwegii.',
    globalFit: 'Silnie globalne.',
    pros: ['świetne w Norwegii', 'łatwe w wymowie', 'nowoczesne'],
    cons: ['mniej polskie wizualnie', 'bardzo popularne', 'kilka pisowni'],
    tags: ['norweskie', 'globalne', 'modne'],
    pl: 7, no: 10, global: 10, unique: 3, power: 9,
  },
  {
    name: 'Elias',
    international: 'Elias / Eliasz / Eli',
    meaning: 'moim Bogiem jest Jahwe',
    origin: 'Forma imienia Elijah/Eliasz, przez tradycję grecko-łacińską.',
    polishFit: 'Blisko polskiego Eliasza, ale łatwiejsze międzynarodowo.',
    norwayFit: 'Bardzo naturalne w Norwegii.',
    globalFit: 'Modne i europejskie.',
    pros: ['eleganckie', 'dobrze brzmi po norwesku', 'nowoczesne'],
    cons: ['religijne', 'mniej typowo polskie w tej pisowni', 'skrót Eli'],
    tags: ['norweskie', 'globalne', 'modne'],
    pl: 7, no: 10, global: 9, unique: 5, power: 8,
  },
  {
    name: 'Noah',
    international: 'Noah / Noa',
    meaning: 'odpoczynek, spokój',
    origin: 'Hebrajskie Noaḥ — odpoczynek, spokój.',
    polishFit: 'Znane w Polsce, choć mniej tradycyjne niż Jan lub Adam.',
    norwayFit: 'Bardzo mocne w Norwegii i obecnych trendach.',
    globalFit: 'Globalny hit.',
    pros: ['bardzo łatwe', 'nowoczesne', 'świetne w Norwegii'],
    cons: ['bardzo popularne', 'mniej polskie', 'biblijne'],
    tags: ['norweskie', 'globalne', 'modne', 'krótkie'],
    pl: 6, no: 10, global: 10, unique: 2, power: 8,
  },
  {
    name: 'Jan',
    international: 'Jan / John / Johan / Jon',
    meaning: 'Bóg jest łaskawy',
    origin: 'Od hebrajskiego Yochanan przez Johannes.',
    polishFit: 'Bardzo silne polskie korzenie.',
    norwayFit: 'Znane w Norwegii, ale wymowa może się różnić.',
    globalFit: 'Warianty John, Johan, Jon są globalne.',
    pros: ['krótkie', 'bardzo polskie', 'klasyczne'],
    cons: ['różna wymowa', 'w angielskim Jan bywa żeńskie', 'tradycyjne'],
    tags: ['polskie', 'norweskie', 'krótkie'],
    pl: 10, no: 7, global: 8, unique: 5, power: 8,
  },
  {
    name: 'Jakub',
    international: 'Jakub / Jakob / Jacob / Kuba',
    meaning: 'forma imienia Jacob/James',
    origin: 'Hebrajskie Ya’aqov; w Polsce tradycyjnie Jakub.',
    polishFit: 'Bardzo polskie i naturalne.',
    norwayFit: 'W Norwegii naturalniejsza jest pisownia Jakob.',
    globalFit: 'Silne przez warianty Jacob/Jakob.',
    pros: ['bardzo polskie', 'ma światowy odpowiednik', 'Kuba brzmi przyjaźnie'],
    cons: ['Jakub może być źle czytane w Norwegii', 'wymaga wyjaśnienia', 'lepszy kompromis to Jakob'],
    tags: ['polskie', 'globalne'],
    pl: 10, no: 6, global: 8, unique: 5, power: 8,
  },
];

const twinIdeas = [
  ['Aleksander', 'Filip', 'klasyczny duet: moc + lekkość'],
  ['Leon', 'Oskar', 'krótko, silnie i charakterne'],
  ['Filip', 'Emil', 'najbardziej naturalny duet polsko-norweski'],
  ['Oskar', 'Kasper', 'skandynawski duet z polskim mostem'],
  ['Lucas', 'Elias', 'bardzo norweski i nowoczesny duet'],
  ['Jan', 'Adam', 'krótko, tradycyjnie i polsko'],
  ['Gabriel', 'Sebastian', 'elegancki duet europejski'],
];

const modes = {
  balanced: 'Balans PL + NO',
  polish: 'Najbardziej polskie',
  norwegian: 'Najlepsze w Norwegii',
  global: 'Globalne',
  unique: 'Mniej typowe',
  short: 'Krótkie',
};

const filters = ['wszystkie', 'polskie', 'norweskie', 'globalne', 'krótkie', 'modne', 'unikalne', 'premium'];

function norm(value) {
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function randomItem(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function balance(name) {
  return Math.round((name.pl * 0.32 + name.no * 0.34 + name.global * 0.26 + name.power * 0.08) * 10) / 10;
}

function mainScore(name, mode) {
  if (mode === 'polish') return name.pl;
  if (mode === 'norwegian') return name.no;
  if (mode === 'global') return name.global;
  if (mode === 'unique') return name.unique;
  return balance(name);
}

function scorePair(a, b) {
  if (!a || !b || a.name === b.name) return 0;
  let score = Math.round((balance(a) + balance(b)) / 2);
  if (a.name[0] !== b.name[0]) score += 1;
  if (Math.abs(a.name.length - b.name.length) <= 3) score += 1;
  if (a.tags.some((tag) => b.tags.includes(tag))) score += 1;
  return Math.min(score, 12);
}

function findName(list, name) {
  return list.find((item) => norm(item.name) === norm(name));
}

function makePair(list, mode) {
  if (list.length < 2) return null;
  const ideas = twinIdeas
    .map(([a, b, reason]) => ({ a: findName(list, a), b: findName(list, b), reason }))
    .filter((item) => item.a && item.b && item.a.name !== item.b.name)
    .sort((x, y) => scorePair(y.a, y.b) - scorePair(x.a, x.b));
  if (ideas.length) {
    const pick = randomItem(ideas.slice(0, 4));
    return { names: [pick.a, pick.b], reason: pick.reason };
  }
  const sorted = [...list].sort((a, b) => mainScore(b, mode) - mainScore(a, mode));
  return { names: [sorted[0], sorted.find((n) => n.name !== sorted[0].name)], reason: 'dobrane automatycznie z aktywnego filtra' };
}

function Icon({ children }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center">{children}</span>;
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-600"><span>{label}</span><b>{value}/10</b></div>
      <div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-slate-950" style={{ width: `${value * 10}%` }} /></div>
    </div>
  );
}

function Wheel({ names, rotation, selected }) {
  const safeNames = names.length ? names : [{ name: 'Brak' }];
  const angle = 360 / safeNames.length;
  const colors = ['#0f172a', '#1f2937', '#334155', '#475569', '#78350f', '#92400e'];
  const gradient = safeNames.map((_, i) => `${colors[i % colors.length]} ${i * angle}deg ${(i + 1) * angle}deg`).join(', ');
  return (
    <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-2 text-4xl">▼</div>
      <motion.div animate={{ rotate: rotation }} transition={{ duration: 2.2, ease: 'easeOut' }} className="relative h-full w-full overflow-hidden rounded-full border-8 border-white shadow-2xl" style={{ background: `conic-gradient(from 0deg, ${gradient})` }}>
        {safeNames.map((item, i) => (
          <div key={`${item.name}-${i}`} className="absolute left-1/2 top-1/2 flex h-1/2 w-28 origin-top-left items-start justify-center text-center text-xs font-black text-white" style={{ transform: `rotate(${i * angle + angle / 2}deg) translateX(-50%)` }}>
            <span className="mt-4 max-w-[85px] rotate-90 rounded-full bg-black/25 px-2 py-1 leading-tight">{item.name}</span>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 m-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-center text-slate-950 shadow-xl">
        <div><div className="text-xl">✨</div><div className="text-xs font-bold">LOS</div><div className="max-w-20 truncate text-[10px] text-slate-500">{selected || 'imię'}</div></div>
      </div>
    </div>
  );
}

function Details({ selected, twins, reason, onSave }) {
  if (!selected && !twins) return <div className="rounded-2xl border border-dashed border-white/20 p-8 text-center text-white/60">Kliknij „Losuj imię”, „Bliźniaki” albo wybierz imię z listy.</div>;

  if (twins) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-6 text-slate-950 shadow-xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div><div className="text-sm font-bold uppercase tracking-wider text-amber-600">Duet dla bliźniaków</div><div className="text-sm text-slate-500">{reason}</div></div>
          <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-white"><div className="text-xs text-white/60">Zgodność</div><div className="text-3xl font-black">{scorePair(twins[0], twins[1])}/12</div></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {twins.map((item) => <NameCard key={item.name} item={item} compact />)}
        </div>
        <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm"><b>Dlaczego działa:</b> para brzmi jak duet, ale każde imię zachowuje osobną tożsamość.</div>
        <Button onClick={() => onSave(`${twins[0].name} + ${twins[1].name}`)} className="mt-5 gap-2"><Icon>❤️</Icon> Zapisz duet</Button>
      </motion.div>
    );
  }

  return <NameCard item={selected} onSave={onSave} />;
}

function NameCard({ item, onSave, compact = false }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-6 text-slate-950 shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className={compact ? 'text-4xl font-black' : 'text-5xl font-black'}>{item.name}</div><div className="mt-2 text-sm font-semibold text-slate-500">{item.international}</div></div>
        <div className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-white"><div className="text-xs text-white/60">Balans</div><div className="text-3xl font-black">{balance(item)}</div></div>
      </div>
      <p className="mt-5 text-lg font-medium">{item.meaning}</p>
      <div className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm"><b>Pochodzenie:</b> {item.origin}</div>
      {!compact && <div className="mt-5 grid gap-4 md:grid-cols-3"><Info title="Polska" text={item.polishFit} /><Info title="Norwegia" text={item.norwayFit} /><Info title="Świat" text={item.globalFit} /></div>}
      {!compact && <div className="mt-5 grid gap-5 md:grid-cols-2"><List title="Zalety" items={item.pros} positive /><List title="Na co uważać" items={item.cons} /></div>}
      <div className="mt-5 grid gap-3 md:grid-cols-4"><ScoreBar label="Polska" value={item.pl} /><ScoreBar label="Norwegia" value={item.no} /><ScoreBar label="Globalnie" value={item.global} /><ScoreBar label="Unikatowość" value={item.unique} /></div>
      {onSave && <Button onClick={() => onSave(item.name)} className="mt-5 gap-2"><Icon>❤️</Icon> Zapisz</Button>}
    </motion.div>
  );
}

function Info({ title, text }) { return <div className="rounded-2xl border border-slate-200 p-4"><div className="mb-1 text-xs font-bold uppercase text-slate-400">{title}</div><p className="text-sm">{text}</p></div>; }
function List({ title, items, positive }) { return <div className={positive ? 'rounded-2xl bg-emerald-50 p-4' : 'rounded-2xl bg-amber-50 p-4'}><div className="mb-2 font-bold">{title}</div><ul className="space-y-1 text-sm">{items.map((item) => <li key={item}>{positive ? '✓' : '•'} {item}</li>)}</ul></div>; }

function runSelfTests() {
  const pair = makePair(starterNames, 'balanced');
  console.assert(starterNames.length >= 14, 'dataset should be expanded');
  console.assert(randomItem([]) === null, 'randomItem handles empty lists');
  console.assert(pair?.names?.length === 2, 'twin pair returns two names');
  console.assert(balance(starterNames.find((n) => n.name === 'Filip')) >= 8, 'Filip should be high balance');
  console.assert(starterNames.every((n) => n.origin && n.pros.length && n.cons.length), 'every name has research fields');
}
if (typeof window !== 'undefined' && !window.__NAME_APP_TESTED__) { window.__NAME_APP_TESTED__ = true; runSelfTests(); }

export default function App() {
  const [names, setNames] = useState(starterNames);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('wszystkie');
  const [mode, setMode] = useState('balanced');
  const [selected, setSelected] = useState(null);
  const [twins, setTwins] = useState(null);
  const [reason, setReason] = useState('');
  const [rotation, setRotation] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [copied, setCopied] = useState(false);

  const visible = useMemo(() => {
    const q = norm(query);
    return names
      .filter((n) => (filter === 'wszystkie' || n.tags.includes(filter)) && (!q || norm(`${n.name} ${n.international} ${n.meaning} ${n.origin}`).includes(q)))
      .sort((a, b) => mode === 'short' ? a.name.length - b.name.length : mainScore(b, mode) - mainScore(a, mode));
  }, [names, query, filter, mode]);

  const top = useMemo(() => [...names].sort((a, b) => balance(b) - balance(a)).slice(0, 5), [names]);
  const resultTitle = twins ? `${twins[0].name} + ${twins[1].name}` : selected?.name;

  const spinOne = () => {
    if (!visible.length) return;
    setRotation((r) => r + 1440 + Math.floor(Math.random() * 720));
    setTimeout(() => { setSelected(randomItem(visible.slice(0, Math.min(10, visible.length)))); setTwins(null); }, 900);
  };

  const spinTwins = () => {
    if (visible.length < 2) return;
    setRotation((r) => r + 1440 + Math.floor(Math.random() * 720));
    setTimeout(() => { const pair = makePair(visible, mode); setTwins(pair.names); setReason(pair.reason); setSelected(null); }, 900);
  };

  const saveFavorite = (label) => { if (label && !favorites.includes(label)) setFavorites([label, ...favorites]); };
  const addName = () => {
    const name = newName.trim();
    if (!name || names.some((n) => norm(n.name) === norm(name))) return;
    setNames([...names, { name, international: name, meaning: newMeaning || 'własna propozycja', origin: 'dodane ręcznie', polishFit: 'do sprawdzenia', norwayFit: 'do sprawdzenia', globalFit: 'do sprawdzenia', pros: ['własna propozycja'], cons: ['wymaga sprawdzenia'], tags: ['unikalne'], pl: 7, no: 7, global: 7, unique: 9, power: 7 }]);
    setNewName(''); setNewMeaning('');
  };
  const copy = async () => {
    const text = twins ? `${twins[0].name} + ${twins[1].name}` : selected ? `${selected.name}: ${selected.meaning}` : 'Brak wyniku';
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { setCopied(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">👶 Polskie korzenie + norweskie dzieciństwo + światowa przyszłość</div>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Koło imion <span className="text-amber-300">PL‑NO</span></h1>
            <p className="mt-4 max-w-3xl text-white/70">Profesjonalne losowanie imion dla chłopców i bliźniaków. Program pokazuje znaczenie, pochodzenie, zalety, wady oraz dopasowanie do Polski, Norwegii i świata.</p>
          </div>
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-4"><div className="mb-3 text-sm font-semibold text-white/70">Tryb oceny</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{Object.entries(modes).map(([id, label]) => <Button key={id} variant={mode === id ? 'default' : 'secondary'} onClick={() => setMode(id)} className="text-xs">{label}</Button>)}</div></CardContent></Card>
        </header>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold ${filter === f ? 'bg-amber-300 text-black' : 'bg-white/10 text-white/70'}`}>{f}</button>)}</div>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Szukaj: np. greckie, krótkie, Norwegia..." className="bg-white text-black" />
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-5">{top.map((n, i) => <button key={n.name} onClick={() => { setSelected(n); setTwins(null); }} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left hover:bg-white/15"><div className="text-xs font-bold text-amber-300">TOP {i + 1}</div><div className="mt-1 text-2xl font-black">{n.name}</div><div className="mt-1 text-xs text-white/60">Balans {balance(n)}/10</div></button>)}</div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><Wheel names={visible} rotation={rotation} selected={resultTitle} /><div className="mt-6 grid grid-cols-2 gap-3"><Button onClick={spinOne} disabled={!visible.length} className="h-12 gap-2">🔀 Losuj imię</Button><Button onClick={spinTwins} disabled={visible.length < 2} variant="amber" className="h-12 gap-2">🪄 Bliźniaki</Button></div><div className="mt-3 grid grid-cols-2 gap-3"><Button variant="secondary" onClick={copy}>{copied ? '✅ Skopiowano' : '📋 Kopiuj wynik'}</Button><Button variant="secondary" onClick={() => { setSelected(null); setTwins(null); }}>↩️ Reset</Button></div><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/60">Widoczne imiona: <b className="text-white">{visible.length}</b></div></CardContent></Card>
          <div className="grid gap-6"><Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">✨ Wynik i analiza</h2><AnimatePresence mode="wait"><Details selected={selected} twins={twins} reason={reason} onSave={saveFavorite} /></AnimatePresence></CardContent></Card><div className="grid gap-6 xl:grid-cols-2"><Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><h2 className="mb-4 text-xl font-bold">Dodaj własne imię</h2><div className="grid gap-3"><Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Np. Bruno" className="bg-white text-black" /><Input value={newMeaning} onChange={(e) => setNewMeaning(e.target.value)} placeholder="Znaczenie / opis" className="bg-white text-black" /><Button onClick={addName}>➕ Dodaj do koła</Button></div></CardContent></Card><Card className="border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><h2 className="mb-4 text-xl font-bold">Ulubione</h2>{favorites.length ? <div className="flex flex-wrap gap-2">{favorites.map((f) => <button key={f} onClick={() => setFavorites(favorites.filter((x) => x !== f))} className="rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-black">{f} ×</button>)}</div> : <div className="text-sm text-white/60">Zapisane imiona i duety pojawią się tutaj.</div>}</CardContent></Card></div></div>
        </div>

        <Card className="mt-6 border-white/10 bg-white/10 text-white backdrop-blur"><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Lista imion w kole</h2><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <button key={item.name} onClick={() => { setSelected(item); setTwins(null); }} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-black/30"><div className="flex items-start justify-between gap-3"><div><div className="text-xl font-black">{item.name}</div><div className="text-xs text-amber-200">{item.international}</div></div><div className="rounded-xl bg-white/10 px-3 py-2 text-center"><div className="text-[10px] text-white/50">balans</div><div className="font-black">{balance(item)}</div></div></div><p className="mt-3 text-sm text-white/70">{item.meaning}</p><div className="mt-3 text-xs text-white/50">{item.origin}</div></button>)}</div></CardContent></Card>
      </div>
    </div>
  );
}
