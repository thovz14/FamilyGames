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

const SECRET_MISSIONS = [
  "De Naprater: Zorg dat iemand een gek woord (bijv. 'pannenkoek') 3 keer herhaalt.",
  "De Wisseltruc: Verwissel onopvallend bestek of glazen van twee personen.",
  "Het Applaus: Krijg de groep aan het klappen zonder zelf als eerste te beginnen.",
  "De Mode-adviseur: Zorg dat iemand een kledingstuk uit- of aantrekt door een opmerking.",
  "De Fotobom: Sta op 3 foto's van anderen met exact dezelfde vreemde pose.",
  "De Liedjesdief: Neurie een liedje tot iemand anders het hardop gaat zingen.",
  "De Stoelendans: Zit binnen 10 minuten op 3 verschillende stoelen met een smoesje.",
  "De Naamsverwarring: Noem iemand 3 keer bij de verkeerde naam zonder te verbeteren.",
  "De Helpende Hand: Krijg iemand zover dat hij/zij iets voor je haalt uit de keuken.",
  "De Stilte-regisseur: Krijg de hele groep 30 seconden stil zonder te zeggen dat het een spel is.",
  "De Complimentenregen: Geef 5 mensen een compliment over hun humor of talent.",
  "De Verzamelaar: Zorg dat er 3 voorwerpen van anderen voor je neus liggen (niet gevraagd).",
  "De Ja-knikker: Stel 3 vragen aan verschillende mensen waar ze 'Ja' op moeten antwoorden.",
  "De Klokkijker: Zorg dat 3 mensen tegelijk op hun klok kijken door een opmerking.",
  "De Proever: Krijg iemand zover dat hij/zij een hapje van jouw eten of drinken 'test'.",
  "De Mysterieuze Wijzer: Wijs naar een hoek en zorg dat 4 mensen omdraaien om te kijken.",
  "De Woordkunstenaar: Gebruik 'extravagant' of 'hypothetisch' 3 keer in een normaal gesprek.",
  "De Schaduw: Loop 3 keer een rondje om iemand heen terwijl je 'iets zoekt'.",
  "De High-Five: Krijg een high-five van de oudste persoon na een duidelijke leugen."
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