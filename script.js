const firebaseConfig = {
  apiKey: "AIzaSyBRpbQS2jN_Zp7XzKWYkM0Png4K4yzA9oc",
  authDomain: "familygames-3d0d2.firebaseapp.com",
  databaseURL: "https://familygames-3d0d2-default-rtdb.firebaseio.com",
  projectId: "familygames-3d0d2",
  storageBucket: "familygames-3d0d2.firebasestorage.app",
  messagingSenderId: "326491635543",
  appId: "1:326491635543:web:1d979ed6ed03351cc20812",
  measurementId: "G-Q3FG5R94GP"
};

console.log("script.js: Loading Firebase...");
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
console.log("script.js: Firebase initialized.");

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
  "Krijg 3 mensen tegelijk aan het lachen binnen 2 minuten.",
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


async function signInWithGoogle() {
  console.log("script.js: signInWithGoogle called");
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.additionalUserInfo.isNewUser) {
      console.warn("script.js: New user detected, deleting...");
      await result.user.delete();
      await auth.signOut();
      throw new Error("Geen account gevonden. Je kunt geen nieuw account aanmaken met Google.");
    }

    return true;
  } catch (error) {
    console.error("script.js: Google Login Error:", error);
    throw error;
  }
}
window.signInWithGoogle = signInWithGoogle; // Expliciet aan window toevoegen

auth.onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", user.email);

    // Probeer eerst de displayName (voor Google accounts)
    // Als die er niet is, gebruik het deel voor de @
    let name = "";
    if (user.displayName) {
      name = user.displayName.split(' ')[0];
    } else {
      name = user.email.split('@')[0];
    }
    localStorage.setItem("displayName", name);
  } else {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("displayName");
  }
});

// signInWithGoogle is verplaatst naar boven

async function verifyLogin(username, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(username, password);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", result.user.email || username);
    return true;
  } catch (error) {
    return false;
  }
}

function isUserLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function getDisplayName() {
  return localStorage.getItem("displayName") || "Gast";
}

function logoutUser() {
  auth.signOut().finally(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("displayName");
    window.location.href = "index.html";
  });
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
    const snap = await db.collection("players").doc(id).get();
    return snap.exists;
  } catch (e) { return false; }
}

function playerDocId(name) {
  if (!name) return `player-${Date.now()}`;
  const id = name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  return id || `player-${Date.now()}`;
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
    const ref = db.collection("game_state").doc("current");
    const snap = await ref.get();
    if (!snap.exists) {
      const initial = {
        status: "lobby",
        isLocked: false,
        page: 1,
        message: "",
        gamePhase: "lobby",
        activeGameId: "",
        activeGameName: "",
        activeGameDescription: "",
        activeGameDuration: null,
        timerEnd: null,
        showBetween: false,
        roomCode: "",
        teamScores: { wolves: 0, chickens: 0 },
        isPaused: false,
        pausedTimeRemaining: 0
      };
      await ref.set(initial);
      return initial;
    }
    return snap.data();
  } catch (error) {
    console.error("ensureGameState error:", error);
    showError("Firestore error: " + error.message);
    return null;
  }
}

async function getGameState() {
  try {
    const snap = await db.collection("game_state").doc("current").get();
    if (!snap.exists) return await ensureGameState();
    return snap.data();
  } catch (error) {
    console.error("getGameState error:", error);
    showError("Firestore error: " + error.message);
    return null;
  }
}

async function updateGameState(updates) {
  try {
    // We gebruiken .update() in plaats van .set(..., {merge:true}) omdat .update() 
    // correct omgaat met "dot-notation" voor geneste velden (bijv. "minigameState.status")
    await db.collection("game_state").doc("current").update(updates);
  } catch (error) {
    // Als de document nog niet bestaat, gebruik set
    if (error.code === 'not-found') {
      await db.collection("game_state").doc("current").set(updates, { merge: true });
    } else {
      console.error("updateGameState error:", error);
      showError("Firestore error: " + error.message);
    }
  }
}

async function addPlayer(name, icon) {
  try {
    const id = playerDocId(name);

    // Bepaal automatisch het team op basis van het huidige aantal spelers
    const allPlayers = await getPlayers();
    const wolvesCount = allPlayers.filter(p => p.team === "wolves").length;
    const chickensCount = allPlayers.filter(p => p.team === "chickens").length;

    // Als wolves <= chickens, voeg toe aan wolves. Anders aan chickens.
    const assignedTeam = wolvesCount <= chickensCount ? "wolves" : "chickens";

    const randomMission = SECRET_MISSIONS[Math.floor(Math.random() * SECRET_MISSIONS.length)];

    await db.collection("players").doc(id).set({
      name: name,
      icon: icon,
      email: auth.currentUser ? auth.currentUser.email : "gast@familie.nl",
      score: 0,
      team: assignedTeam,
      ready: false,
      secretMission: randomMission,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("addPlayer error:", error);
    showError("Firestore error: " + error.message);
  }
}

async function getPlayers() {
  try {
    const snap = await db.collection("players").get();
    const players = [];
    snap.forEach((doc) => players.push(doc.data()));
    return players;
  } catch (error) {
    console.error("getPlayers error:", error);
    return [];
  }
}

function listenToPlayers(callback) {
  return db.collection("players").onSnapshot(
    (snap) => {
      const players = [];
      snap.forEach((doc) => players.push(doc.data()));
      callback(players);
    },
    (error) => {
      console.error("listenToPlayers error:", error);
      showError("Firestore error: " + error.message);
    }
  );
}

function listenToGameState(callback) {
  return db.collection("game_state").doc("current").onSnapshot(
    (doc) => {
      if (doc.exists) callback(doc.data());
    },
    (error) => {
      console.error("listenToGameState error:", error);
      showError("Firestore error: " + error.message);
    }
  );
}

async function updatePlayerScore(playerName, scoreChange) {
  try {
    const ref = db.collection("players").doc(playerDocId(playerName));
    const snap = await ref.get();
    if (snap.exists) {
      const current = snap.data().score || 0;
      await ref.update({
        score: current + scoreChange,
        LastAction: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("updatePlayerScore error:", error);
  }
}

async function setPlayerScore(playerName, newScore) {
  try {
    const ref = db.collection("players").doc(playerDocId(playerName));
    await ref.update({
      score: newScore,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("setPlayerScore error:", error);
  }
}

async function removePlayer(playerName) {
  try {
    await db.collection("players").doc(playerDocId(playerName)).delete();
  } catch (error) {
    console.error("removePlayer error:", error);
  }
}

async function setPlayerReady(playerName, ready) {
  try {
    await db.collection("players").doc(playerDocId(playerName)).update({
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
    const snap = await db.collection("players").get();
    const batch = db.batch();
    snap.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  } catch (error) {
    console.error("clearAllPlayers error:", error);
  }
}

async function resetAllScores() {
  try {
    const snap = await db.collection("players").get();
    const batch = db.batch();
    snap.forEach((doc) => {
      batch.update(doc.ref, { score: 0, LastAction: new Date().toISOString() });
    });
    await batch.commit();
  } catch (error) {
    console.error("resetAllScores error:", error);
  }
}

async function updatePlayerPhotoSprintCount(playerName, count) {
  try {
    await db.collection("players").doc(playerDocId(playerName)).update({
      photoSprintCheckedCount: count,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("updatePlayerPhotoSprintCount error:", error);
  }
}

async function updatePlayerPhotoChallengeCount(playerName, count, checkedArray) {
  try {
    await db.collection("players").doc(playerDocId(playerName)).update({
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
    await db.collection("players").doc(playerDocId(playerName)).update({
      vote: vote,
      LastAction: new Date().toISOString()
    });
  } catch (error) {
    console.error("submitPlayerVote error:", error);
  }
}

async function clearAllVotes() {
  try {
    const snap = await db.collection("players").get();
    const batch = db.batch();
    snap.forEach((doc) => {
      batch.update(doc.ref, { vote: null });
    });
    await batch.commit();
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