// script.js – Wonder Games shared game logic
// Auth is handled by js/auth.js which creates window.pb.
// This file only creates pb if it wasn't already initialised
// (for pages that don't load auth.js, e.g. tv.html).

if (!window.pb) {
  window.pb = new PocketBase('https://db.wonderdev.nl/');
}
var pb = window.pb; // var allows co-existence with auth.js's const pb

console.log('script.js: PocketBase ready.');

const IMPOSTER_WORDS = [
  "Boerenkool", "Pizza", "Hagelslag", "Watermeloen", "Pannenkoek", "Snert", "Kapsalon", "Frikandel",
  "Stofzuiger", "Grasmaaier", "Handdoek", "Bril", "Koffiezetapparaat", "Wasmachine", "Tandenborstel",
  "Giraffe", "Pinguïn", "Goudvis", "Olifant", "Kameleon", "Kangoeroe", "Hamster",
  "De Efteling", "Het Strand", "De Supermarkt", "School", "Schiphol", "De Bioscoop", "De Dierentuin"
];

const HOUSEHOLD_OBJECTS = [
  "Stamppotstamper", "Draadjesvlees", "Juslepel", "Soepterrine", "Puntzeef", "Keukentouw", "Houten snijplank", "Zoutvaatje", "Pepermolen", "Mosterdpotje", "Eierdopje", "Suikerpot", "Melkkannetje", "Theelichtje", "Warmhoudplaatje", "Ovenschaal", "Braadpan", "Snelkookpan", "Soeppan", "Koekenpan", "Vleesmes", "Broodmes", "Schilmesje", "Appelboor", "Kaasschaaf", "Blikopener", "Kurkentrekker", "Flessenopener", "Pannenlap", "Theedoek", "Keukenschort", "Kookwekker", "Keukenweegschaal", "Maatbeker", "Vergiet", "Beslagkom", "Deegroller", "Garde", "Pollepel", "Spatel", "Vleesvork", "Opscheplepel", "Soeplepel", "Gebaksvorkje", "Taartschep", "Dessertlepel", "Theelepeltje", "Koffiekopje", "Theeglas", "Wijnglas", "Bierglas", "Limonadeglas", "Waterkaraf", "Onderzetter", "Tafelkleed", "Servet", "Placemat", "Broodmandje", "Fruitmand", "Fruitschaal", "Voorraadbus", "Koektrommel", "Snoeppot", "Beschuitbus", "Koffieblik", "Theedoos", "Havermout", "Paneermeel", "Bakmeel", "Poedersuiker", "Stroop", "Honing", "Jam", "Pindakaas", "Hagelslag", "Vruchtenhagel", "Appelstroop", "Augurkenpot", "Zilveruitjes", "Mayonaise", "Ketchup", "Sambal", "Maggi", "Bouillonblokjes", "Laurierblaadjes", "Kruidnagels", "Kaneelstokjes", "Nootmuskaat", "Kerriepoeder", "Paprikapoeder", "Zonnebloemolie", "Olijfolie", "Azijn", "Koffiefilters", "Theezakjes", "Suikerklontjes", "Koffiemelk", "Zilverpoets", "Allesreiniger", "Afwasmiddel", "Schuurmiddel", "Spiritus", "Soda", "Waspoeder", "Wasverzachter", "Strijkijzer", "Strijkplank", "Wasrek", "Wasknijpers", "Wasmand", "Stofzuiger", "Stofzuigerzakken", "Bezem", "Handveger", "Stofblik", "Dweil", "Emmer", "Zeem", "Schoonmaakdoekje", "Schuursponsje", "Schuurborstel", "Toiletborstel", "Luchtverfrisser", "Vuilniszakken", "Batterijen", "Zaklamp", "Verlengsnoer", "Stekkerdoos", "Gloeilamp", "Schoenpoets", "Schoenborstel", "Schoenlepel", "Paraplu", "Regenjas", "Pantoffels", "Sloffen", "Kussensloop", "Hoeslaken", "Dekbedovertrek", "Sprei", "Wollen deken", "Sierkussen", "Vloerkleed", "Deurmat", "Kapstok", "Kledinghanger", "Schoenenrek", "Wandklok", "Wekker", "Barometer", "Thermometer", "Fotolijstje", "Vaas", "Bloempot", "Gieter", "Plantenspuit", "Snoeischaar", "Hark", "Schoffel", "Schep", "Tuinslang", "Buitenlamp", "Deurbel", "Brievenbus", "Huisnummer", "Fietspomp", "Fietsbel", "Fietsslot", "Fietstassen", "Gereedschapskist", "Hamer", "Schroevendraaier", "Nijptang", "Waterpomptang", "Rolmaat", "Duimstok", "Zaag", "Schuurpapier", "Lijm", "Plakband", "Touw", "Elastiekjes", "Paperclips", "Nietmachine", "Perforator", "Schaar", "Pen", "Potlood", "Gum", "Liniaal", "Notitieblok", "Adresboekje", "Agenda", "Kalender", "Postzegels", "Enveloppen", "Briefpapier", "Wenskaarten", "Zakdoeken", "Brillendoekje", "Vergrootglas", "Speelkaarten", "Puzzelboekje", "Krant", "Tijdschrift", "Leesbril", "Pillendoosje", "Thermometer", "Pleisters", "Verbandgaas", "Ontsmettingsmiddel", "Paracetamol", "Keeltabletten", "Hoestdrank", "Tandpasta", "Tandenborstel", "Mondwater", "Zandloper", "Badmat", "Douchegordijn", "Handdoek", "Washandje", "Stuk zeep", "Vloeibare zeep", "Shampoo", "Conditioner", "Douchegel", "Bodylotion", "Handcrème", "Gezichtscrème", "Zonnebrandcrème", "Aftersun", "Deodorant", "Parfum", "Aftershave", "Scheerapparaat", "Scheermesje", "Scheerschuim", "Haargel", "Haarspray", "Kam", "Haarborstel", "Nagelknipper", "Nagelvijl", "Pincet", "Wattenstaafjes", "Watten schijfjes", "Toiletpapier", "Maandverband", "Inlegkruisjes", "Zakdoekjes", "Keukenrol", "Servetjes", "Aluminiumfolie", "Vershoudfolie", "Bakpapier", "Diepvrieszakjes", "Boterhamzakjes", "Pedaalemmerzakjes"
];

const PHOTO_CHALLENGE_ITEMS = [
  "Iets Levends", "De Groene Duim", "Huisnummer-Bingo", "Spiegelbeeld", "Hoogtepunt",
  "Kleur-Explosie", "De Tijdlijn", "Schaduw-Kunst", "Luchtig", "De Klassieker",
  "Een Dier", "Iets Geks", "Iets Buiten", "Een Selfie", "Iets Oranje",
  "Een Glimlach", "Iets Oud", "Iets Grappigs", "Iets Klein", "Iets Groot",
  "Een Kunstwerk", "Iets Blauw", "Iets Rond", "Iets Houten", "Iets Lekkers",
  "Iets Zachts", "Iets Hards", "Iets Transparants", "Iets Gevlekt", "Iets Glimmends",
  "Een Schaduw", "Iets Rood", "Iets Groen", "Iets Geel", "Iets Hoog",
  "Iets Op De Grond", "Een Letter", "Een Cijfer", "Iets Nat", "Iets Droog"
];

const SECRET_MISSIONS = [
  "Zeg een random woord en zorg dat iemand het meteen herhaalt zonder na te denken.",
  "Ruil onopvallend van plek met iemand anders in de groep.",
  "Doe alsof je een dringende aankondiging hebt en trek 3 seconden alle aandacht.",
  "Zeg iets alsof het breaking news is en laat iemand reageren alsof het belangrijk is.",
  "Laat iemand je naam zeggen door jezelf 2 keer subtiel te introduceren in gesprek.",
  "Zorg dat iemand naar zijn/haar telefoon kijkt door ‘oh wacht even’ te zeggen.",
  "Start een gesprek en laat binnen 20 seconden minstens 2 mensen erin meegaan.",
  "Roep ineens ‘oké luister!’ en kijk of iemand automatisch stopt met praten.",
  "Laat iemand een rare pose doen door zelf eerst heel subtiel die pose te doen.",
  "Doe een overdreven serieuze uitspraak en kijk wie het serieus neemt.",
  "Laat iemand lachen door alleen je gezichtsuitdrukking (zonder te praten).",
  "Zeg een zin en zorg dat iemand hem automatisch afmaakt zonder dat je stopt.",
  "Wijs ergens heen en kijk of iemand automatisch kijkt zonder te vragen waarom.",
  "Begin te klappen en kijk wie meteen meedoet zonder context.",
  "Zeg iets random als “dat is echt niet normaal” en kijk wie vraagt wat er is.",
  "Laat iemand jouw toon of manier van praten nadoen zonder dat ze het doorhebben.",
  "Zeg “wacht even” en kijk wie automatisch stopt met wat ze doen.",
  "Start een mini hype (zoals “ohhh!”) en kijk wie meedoet zonder reden."
];

const EMOJI_MYSTERIES = [
  { answer: "THE LION KING", emojis: "🦁👑🐗" },
  { answer: "TITANIC", emojis: "🚢🧊💔" },
  { answer: "FINDING NEMO", emojis: "🐠🔍🌊" },
  { answer: "HARRY POTTER", emojis: "⚡🧙‍♂️🦉" },
  { answer: "SPIDERMAN", emojis: "🕷️🕸️🏙️" },
  { answer: "JURASSIC PARK", emojis: "🦖🚙⚡" },
  { answer: "HOME ALONE", emojis: "🏠👦😱" },
  { answer: "PIRATES OF THE CARIBBEAN", emojis: "🏴‍☠️⚓🍺" },
  { answer: "THE MATRIX", emojis: "💊🕶️💻" },
  { answer: "E.T.", emojis: "👽🚲🌕" },
  { answer: "JAWS", emojis: "🦈🏊‍♂️🌊" },
  { answer: "BACK TO THE FUTURE", emojis: "🚗⚡⏰" },
  { answer: "GHOSTBUSTERS", emojis: "👻🚫🚐" },
  { answer: "TOP GUN", emojis: "✈️🕶️🔥" },
  { answer: "THE TERMINATOR", emojis: "🤖🔫🔥" },
  { answer: "INDIANA JONES", emojis: "🤠🐍🏺" }
];


// Auth state kept in sync with PocketBase (if auth.js is not loaded)
if (!window.isUserLoggedIn) {
  window.isUserLoggedIn = function () { return pb.authStore.isValid; };
}
if (!window.getDisplayName) {
  window.getDisplayName = function () {
    const m = pb.authStore.model;
    if (!m) return 'Gast';
    return m.username || m.name || m.email?.split('@')[0] || 'Gast';
  };
}
if (!window.logoutUser) {
  window.logoutUser = function () {
    pb.authStore.clear();
    window.location.href = 'index.html';
  };
}

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function createNewRoomCode() {
  const code = generateRoomCode();
  await updateGameState({ roomCode: code });
  return code;
}

async function validateRoomCode(inputCode) {
  const state = await getGameState();
  if (!state) return false;
  return state.roomCode === inputCode && inputCode !== "";
}

async function checkPlayerExists(name) {
  try {
    const id = playerDocId(name);
    await pb.collection("players").getOne(id);
    return true;
  } catch (e) { return false; }
}

function playerDocId(name) {
  if (!name) return `player${Date.now()}`.substring(0,15);
  // Pocketbase IDs must be exactly 15 chars alphanumeric
  let id = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  while(id.length < 15) id += "x";
  if(id.length > 15) id = id.substring(0, 15);
  return id;
}

function showError(message) {
  const ids = ["errorMessage", "errorMessageTV"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
      el.classList.remove("hidden");
    }
  });
}

async function ensureGameState() {
  try {
    const initial = {
      id: "currentstate123", // exactly 15 chars
      status: "lobby",
      isLocked: false,
      page: 1,
      message: "",
      gamePhase: "lobby",
      activeGameId: "",
      activeGameName: "",
      activeGameDescription: "",
      activeGameDuration: 0,
      timerEnd: "",
      showBetween: false,
      roomCode: "",
      teamScores: { wolves: 0, chickens: 0 },
      isPaused: false,
      pausedTimeRemaining: 0
    };
    try {
      await pb.collection("game_state").getOne("currentstate123");
    } catch (e) {
      if (e.status === 404) {
        await pb.collection("game_state").create(initial);
      }
    }
    return initial;
  } catch (error) {
    console.error("ensureGameState error:", error);
    showError("PocketBase error: " + error.message);
    return null;
  }
}

async function getGameState() {
  try {
    const doc = await pb.collection("game_state").getOne("currentstate123");
    return doc;
  } catch (error) {
    if (error.status === 404) return await ensureGameState();
    console.error("getGameState error:", error);
    showError("PocketBase error: " + error.message);
    return null;
  }
}

async function updateGameState(updates) {
  try {
    await pb.collection("game_state").update("currentstate123", updates);
  } catch (error) {
    if (error.status === 404) {
      const initial = await ensureGameState();
      await pb.collection("game_state").update("currentstate123", updates);
    } else {
      console.error("updateGameState error:", error);
      showError("PocketBase error: " + error.message);
    }
  }
}

async function addPlayer(name, icon) {
  try {
    const id = playerDocId(name);
    const allPlayers = await getPlayers();
    const wolvesCount = allPlayers.filter(p => p.team === "wolves").length;
    const chickensCount = allPlayers.filter(p => p.team === "chickens").length;
    const assignedTeam = wolvesCount <= chickensCount ? "wolves" : "chickens";
    const randomMission = SECRET_MISSIONS[Math.floor(Math.random() * SECRET_MISSIONS.length)];

    await pb.collection("players").create({
      id: id,
      name: name,
      icon: icon,
      email: pb.authStore.model ? pb.authStore.model.email : `gast_${Date.now()}@familie.nl`,
      score: 0,
      team: assignedTeam,
      ready: false,
      secretMission: randomMission,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    if (error.status === 400) {
        // Record exists or invalid ID? Let's just update if it exists
        try {
            const id = playerDocId(name);
            await pb.collection("players").update(id, { LastAction: new Date().toISOString() });
        } catch(e){}
    } else {
        console.error("addPlayer error:", error);
        showError("PocketBase error: " + error.message);
    }
  }
}

async function getPlayers() {
  try {
    return await pb.collection("players").getFullList();
  } catch (error) {
    console.error("getPlayers error:", error);
    return [];
  }
}

let playersSubscription = null;
function listenToPlayers(callback) {
  // First, fetch current state
  getPlayers().then(callback);

  // Then subscribe to changes
  pb.collection("players").subscribe('*', async function (e) {
    // PocketBase real-time events send only the changed record, 
    // so we re-fetch the full list to give the callback what it expects
    const allPlayers = await getPlayers();
    callback(allPlayers);
  }).then(unsub => {
    playersSubscription = unsub;
  });

  return () => {
    if (playersSubscription) {
      pb.collection("players").unsubscribe('*');
      playersSubscription = null;
    }
  };
}

let gameStateSubscription = null;
function listenToGameState(callback) {
  // First, fetch current state
  getGameState().then(doc => { if (doc) callback(doc); });

  // Then subscribe to changes
  pb.collection("game_state").subscribe('currentstate123', function (e) {
    callback(e.record);
  }).then(unsub => {
    gameStateSubscription = unsub;
  });

  return () => {
    if (gameStateSubscription) {
      pb.collection("game_state").unsubscribe('currentstate123');
      gameStateSubscription = null;
    }
  };
}

async function updatePlayerScore(playerName, scoreChange) {
  try {
    const id = playerDocId(playerName);
    const snap = await pb.collection("players").getOne(id);
    const current = snap.score || 0;
    await pb.collection("players").update(id, {
      score: current + scoreChange,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("updatePlayerScore error:", error);
  }
}

async function setPlayerScore(playerName, newScore) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").update(id, {
      score: newScore,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("setPlayerScore error:", error);
  }
}

async function removePlayer(playerName) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").delete(id);
  } catch (error) {
    console.error("removePlayer error:", error);
  }
}

async function setPlayerReady(playerName, ready) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").update(id, {
      ready: ready,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("setPlayerReady error:", error);
  }
}

async function setLocked(lock) {
  try {
    await updateGameState({ isLocked: lock });
  } catch (error) {
    console.error("setLocked error:", error);
  }
}

async function clearAllPlayers() {
  try {
    const players = await getPlayers();
    for (let p of players) {
      await pb.collection("players").delete(p.id);
    }
  } catch (error) {
    console.error("clearAllPlayers error:", error);
  }
}

async function resetAllScores() {
  try {
    const players = await getPlayers();
    for (let p of players) {
      await pb.collection("players").update(p.id, { score: 0, LastAction: new Date().toISOString() });
    }
  } catch (error) {
    console.error("resetAllScores error:", error);
  }
}

async function updatePlayerPhotoSprintCount(playerName, count) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").update(id, {
      photoSprintCheckedCount: count,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("updatePlayerPhotoSprintCount error:", error);
  }
}

async function updatePlayerPhotoChallengeCount(playerName, count, checkedArray) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").update(id, {
      photoChallengeCheckedCount: count,
      photoChallengeCheckedArray: checkedArray,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("updatePlayerPhotoChallengeCount error:", error);
  }
}

async function submitPlayerVote(playerName, vote) {
  try {
    const id = playerDocId(playerName);
    await pb.collection("players").update(id, {
      vote: vote,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("submitPlayerVote error:", error);
  }
}

async function clearAllVotes() {
  try {
    const players = await getPlayers();
    for (let p of players) {
      await pb.collection("players").update(p.id, { vote: null });
    }
  } catch (error) {
    console.error("clearAllVotes error:", error);
  }
}

// -------------------------------------------------------------
// Wonder ID Avatar Presets & HTML Universal Renderer
// -------------------------------------------------------------
const AVATARS = {
  avatar1: {
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
  },
  avatar2: {
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },
  avatar3: {
    gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>`
  },
  avatar4: {
    gradient: "linear-gradient(135deg, #ef4444, #f59e0b)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
  },
  avatar5: {
    gradient: "linear-gradient(135deg, #ec4899, #ef4444)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><circle cx="12" cy="12" r="6"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
  },
  avatar6: {
    gradient: "linear-gradient(135deg, #14b8a6, #10b981)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; display: block;"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`
  }
};

function getAvatarHTML(iconValue, customStyle = "") {
  if (!iconValue) return `👤`;
  if (AVATARS[iconValue]) {
    const av = AVATARS[iconValue];
    return `<div style="display:inline-flex; align-items:center; justify-content:center; width:1.3em; height:1.3em; border-radius:50%; background:${av.gradient}; color:white; padding:0.15em; box-sizing:border-box; vertical-align:middle; line-height:0; ${customStyle}">${av.svg}</div>`;
  } else if (iconValue.startsWith('data:image/') || iconValue.startsWith('http')) {
    return `<img src="${iconValue}" style="width:1.3em; height:1.3em; border-radius:50%; object-fit:cover; vertical-align:middle; display:inline-block; border:1px solid rgba(255,255,255,0.25); ${customStyle}" alt="Avatar">`;
  } else {
    return `<span style="font-family:'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; vertical-align:middle; line-height:1; ${customStyle}">${iconValue}</span>`;
  }
}

// Make globally accessible
window.AVATARS = AVATARS;
window.getAvatarHTML = getAvatarHTML;