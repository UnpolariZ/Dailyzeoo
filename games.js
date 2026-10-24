import {lexicon,expandedDrawing,expandedPairs,expandedQuiz,expandedEstimates} from './content-bank.js';
export const games = [
 {id:'quiz',icon:'✦',name:'Quiz Club',tag:'CULTURE GÉNÉRALE',desc:'Une question. Quatre choix. Faites parler votre culture.',color:'#b9a0ff',rounds:5},
 {id:'reflex',icon:'ϟ',name:'Flash Reflex',tag:'RÉFLEXES',desc:'Attendez le vert… puis soyez le premier à dégainer.',color:'#c9f27a',rounds:5},
 {id:'estimate',icon:'≈',name:'À un poil près',tag:'ESTIMATION',desc:'Pas besoin de tout savoir. Il suffit de viser juste.',color:'#ffbd87',rounds:5},
 {id:'words',icon:'Aa',name:'Motus Express',tag:'LETTRES',desc:'Des lettres en vrac. Un mot à retrouver. À vous de jouer.',color:'#8cd7ed',rounds:5}
];
export const quiz = [
 ['Quel langage s’exécute nativement dans un navigateur ?',['Java','JavaScript','Python','C++'],1],
 ['Combien de côtés a un hexagone ?',['5','6','7','8'],1],
 ['Quelle planète est surnommée la planète rouge ?',['Vénus','Jupiter','Mars','Mercure'],2],
 ['Quel océan borde la côte ouest de la France ?',['Pacifique','Indien','Arctique','Atlantique'],3],
 ['Qui a peint La Nuit étoilée ?',['Monet','Van Gogh','Picasso','Dalí'],1],
 ['Combien de joueurs composent une équipe de volley sur le terrain ?',['5','6','7','8'],1],
 ['Quel élément a pour symbole O ?',['Or','Osmium','Oxygène','Oganesson'],2],
 ['Quelle est la capitale du Canada ?',['Toronto','Montréal','Ottawa','Vancouver'],2],
 ['Quel animal est un mammifère ?',['Requin','Dauphin','Truite','Poulpe'],1],
 ['Combien de bits contient un octet ?',['4','8','16','32'],1],
 ['Dans quel pays se trouve Kyoto ?',['Chine','Japon','Corée du Sud','Thaïlande'],1],
 ['Quel instrument mesure la pression atmosphérique ?',['Thermomètre','Baromètre','Anémomètre','Sismographe'],1],
 ['Quelle est la racine carrée de 144 ?',['11','12','13','14'],1],
 ['Qui a écrit Les Misérables ?',['Molière','Victor Hugo','Zola','Camus'],1],
 ['Quel pays a remporté la Coupe du monde de football en 2018 ?',['France','Croatie','Brésil','Allemagne'],0],
 ['Quel est le plus grand organe du corps humain ?',['Foie','Poumon','Peau','Cœur'],2],
 ['Combien de couleurs compte l’arc-en-ciel traditionnel ?',['5','6','7','8'],2],
 ['Quel est le symbole chimique du fer ?',['F','Fe','Fr','Fi'],1],
 ['Quel jeu utilise un plateau de 64 cases ?',['Dames internationales','Échecs','Go','Backgammon'],1],
 ['Quelle ville est surnommée la Ville rose ?',['Lille','Lyon','Toulouse','Nice'],2]
];
export const estimates = [
 ['Combien de minutes y a-t-il dans une journée ?',1440,'minutes'],
 ['Combien d’os compte le squelette humain adulte, généralement ?',206,'os'],
 ['Quelle est la hauteur de la tour Eiffel, antenne comprise (depuis 2022) ?',330,'mètres'],
 ['Combien de kilomètres mesure un marathon ?',42.195,'km'],
 ['En quelle année a eu lieu le premier pas sur la Lune ?',1969,'année'],
 ['Combien de touches possède un piano standard ?',88,'touches'],
 ['Combien de secondes y a-t-il dans une heure ?',3600,'secondes'],
 ['Quelle est la longueur du bassin olympique ?',50,'mètres'],
 ['Combien de cases compte un échiquier ?',64,'cases'],
 ['Combien de dents possède normalement un adulte, dents de sagesse incluses ?',32,'dents'],
 ['En quelle année est tombé le mur de Berlin ?',1989,'année'],
 ['Combien de jours compte une année bissextile ?',366,'jours'],
 ['À combien de kilomètres correspond un mile terrestre (arrondi à 3 décimales) ?',1.609,'km'],
 ['Combien de faces possède un icosaèdre ?',20,'faces'],
 ['Combien de départements comptait la France au 1er janvier 2024 ?',101,'départements']
];
export const words = ['CLAVIER','PLANETE','AVENTURE','SOURIRE','LUMIERE','MYSTERE','VOYAGE','FENETRE','MUSIQUE','ETOILE','CITRON','NUAGE','JARDIN','CHAUSSURE','PAPILLON','ORDINATEUR','CURIOSITE','MONTAGNE','CHOCOLAT','BIBLIOTHEQUE'];

games.push(
 {id:'hangman',icon:'⌁',name:'Pendu Néon',tag:'DÉDUCTION',desc:'Décodez le mot, préservez vos vies et sauvez le réacteur.',color:'#f3a3cb',rounds:5,minPlayers:2},
 {id:'draw',icon:'✎',name:'Sketch Party',tag:'DESSIN',desc:'Un joueur dessine, les autres trouvent le mot.',color:'#f0cf83',rounds:5,minPlayers:2},
 {id:'impostor',icon:'◈',name:'Mot pour Mot',tag:'IMPOSTEURS',desc:'Des mots proches. Des indices. Qui n’a pas le même mot ?',color:'#a7b5ff',rounds:3,minPlayers:3}
);
export const drawingWords={easy:['CHAT','SOLEIL','MAISON','ARBRE','POISSON','FLEUR','BATEAU','ETOILE','COEUR','POMME','LUNE','BONHOMME'],normal:['PARAPLUIE','VELO','CHATEAU','GUITARE','GIRAFE','PIZZA','FUSEE','BONHOMME DE NEIGE','MONTAGNE','PAPILLON','HELICOPTERE','CHAISE'],hard:['EMBOUTEILLAGE','APESANTEUR','ANNIVERSAIRE','ECLIPSE','TELETRAVAIL','ILLUSION','DEVELOPPEUR','ESCALADE','CHANGEMENT CLIMATIQUE','QUIPROQUO','GRAVITE','RECYCLAGE']};
export const wordPairs={easy:[['CANAPE','FAUTEUIL'],['CHAT','CHIEN'],['PIZZA','BURGER'],['PLAGE','PISCINE'],['CAFE','THE'],['TRAIN','AVION'],['GUITARE','PIANO'],['LIVRE','FILM'],['MONTAGNE','FORET'],['POMME','POIRE']],normal:[['COUSSIN','OREILLER'],['HOTEL','CAMPING'],['CINEMA','THEATRE'],['VELO','TROTTINETTE'],['NEIGE','GLACE'],['TABLETTE','TELEPHONE'],['FOURCHETTE','CUILLERE'],['ROBOT','ANDROID'],['BROUILLARD','NUAGE'],['CHOCOLAT','CARAMEL']],hard:[['MOUSSE','ECUME'],['SENTIER','CHEMIN'],['RIVIERE','FLEUVE'],['BALCON','TERRASSE'],['CONFITURE','COMPOTE'],['CROISSANT','BRIOCHE'],['TASSE','MUG'],['COUVERTURE','PLAID'],['ETANG','LAC'],['ROMAN','NOUVELLE']]};
export const defaultSettings=id=>({rounds:id==='impostor'?3:5,seconds:id==='reflex'?5:id==='impostor'?60:id==='draw'?60:id==='hangman'?75:id==='quiz'?16:22,difficulty:'normal',impostors:1,lives:3});

games.push({id:'memory',icon:'▦',name:'Mémo Pulse',tag:'MÉMOIRE',desc:'Observez les lumières, puis reproduisez leur séquence.',color:'#79dfc4',rounds:5,minPlayers:2});
words.push('LAPIN','TIGRE','ROBOT','FLEUR','PLUME','SABLE','POMME','PERLE','ARBRE','BATEAU','ASTRONAUTE','LABYRINTHE','CONSTELLATION','EXPLORATEUR','TELESCOPE','IMAGINATION','ANNIVERSAIRE','HELICOPTERE','MONTGOLFIERE','ARCHEOLOGUE');
wordPairs.hard=[['VOLCAN','GEYSER'],['BOUSSOLE','CARTE'],['PHARE','BALISE'],['BALCON','VERANDA'],['CONFITURE','MIEL'],['CROISSANT','BAGUETTE'],['LAMPE','BOUGIE'],['CASCADE','FONTAINE'],['ETANG','MARAIS'],['ROMAN','JOURNAL']];
wordPairs.normal[7]=['ROBOT','DRONE'];

// Large offline pools, exported for validation and local extensions.
export const quizPools={easy:[...quiz.filter((_,i)=>[0,1,2,3,8,9,12,16,18,19].includes(i)),...expandedQuiz.easy],normal:[...quiz,...expandedQuiz.normal],hard:[...quiz.filter((_,i)=>[4,5,6,7,10,11,13,14,15,17].includes(i)),...expandedQuiz.hard]};
export const estimatePools={easy:[...estimates,...expandedEstimates.easy],normal:[...estimates,...expandedEstimates.normal],hard:[...estimates,...expandedEstimates.hard]};
const byTitle=rows=>[...new Map(rows.map(q=>[q[0],q])).values()];
quiz.splice(0,quiz.length,...byTitle(Object.values(quizPools).flat()));
estimates.splice(0,estimates.length,...byTitle(Object.values(estimatePools).flat()));
words.splice(0,words.length,...new Set([...words,...lexicon]));
for(const d of ['easy','normal','hard']){drawingWords[d]=[...new Set([...drawingWords[d],...expandedDrawing[d]])].filter(s=>s.length<=60);wordPairs[d]=[...new Map([...wordPairs[d],...expandedPairs[d]].map(p=>[[...p].sort().join('|'),p])).values()];}

const menuNames={"quiz": "Quiz'zeoo", "estimate": "C'était pas loin...", "words": "Le p'tit Motus", "impostor": "L'Imposteur", "hangman": "Désamorçage", "draw": "Drawing Party", "reflex": "Ultra Instinct", "memory": "Mémo Pulse"};
const menuOrder=["quiz", "estimate", "words", "impostor", "hangman", "draw", "reflex", "memory"];
games.forEach(g=>{g.name=menuNames[g.id];g.minPlayers=g.id==='impostor'?3:g.id==='draw'?2:1;});games.sort((a,b)=>menuOrder.indexOf(a.id)-menuOrder.indexOf(b.id));
