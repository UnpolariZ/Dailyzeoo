# Dailyzeoo — version 12

Arcade multijoueur locale pour 1 à 12 joueurs : huit jeux, salon 3D, invitations, réglages de l’hôte et classements persistants. L’Imposteur nécessite au moins 3 joueurs et Drawing Party au moins 2.

## Lancer en local

1. Installez Node.js 20 ou supérieur (Node 22 conseillé). Avec nvm : `nvm install 22` puis `nvm use 22`.
2. Décompressez entièrement le ZIP.
3. Dans le dossier `dailyzeoo`, exécutez `npm start` puis ouvrez http://localhost:3000.

Sous Windows, double-cliquez sur `LANCER-WINDOWS.bat`. Aucun `npm install` n’est nécessaire : Three.js et GSAP sont inclus. Une fois Node installé, le jeu fonctionne sans Internet. Il faut lancer le serveur Node, pas `npx serve .` ni le HTML directement.

## Inviter les joueurs

Le terminal affiche l’adresse réseau du PC hôte, par exemple http://192.168.1.42:3000. Les invités sur le même réseau utilisent cette adresse, pas localhost. Ouvrez aussi cette adresse sur le PC hôte avant de copier le lien d’invitation. Autorisez Node sur le réseau privé si Windows le demande. Les arrivées sont possibles à tout moment tant que le salon contient moins de 12 joueurs. Pendant une partie, les nouveaux joueurs attendent dans le salon et rejoignent la prochaine partie (revanche comprise), sans participer aux manches ni au classement de la partie en cours. Pour tester sur un seul PC, plusieurs onglets du même navigateur sont maintenant pris en charge. Un onglet dupliqué doit rejoindre à nouveau le salon avec son personnage indépendant.

## Mise à jour — verdict solo

- Après une partie jouée seul, les votes « Revanche » et « Accepter le jeu du vote », ainsi que leur compteur, sont masqués. Les commandes « Relancer », « Choisir un autre jeu » et « Retour au salon » restent disponibles.

## Mise à jour — votes de revanche unifiés

- Une revanche est également un vote pour le jeu précédent. Le sélecteur montre ce jeu comme sélectionné.
- Voter pour un autre jeu retire la revanche ; voter pour le jeu précédent l’active.
- L’unanimité relance automatiquement ; sinon l’hôte peut accepter le jeu majoritaire, en comptant les revanches. Les réglages de la partie précédente sont conservés pour une revanche.

## Mise à jour — solo, votes et rotation tactile

- Six jeux jouables dès une personne ; Drawing Party conserve deux joueurs minimum et L’Imposteur trois.
- Le compteur du verdict inclut les votes de revanche et de changement de jeu. Le sélecteur se ferme après un choix enregistré, dans le salon comme au verdict.
- Rotation tactile proportionnelle à la largeur de l’écran, lissée et sans interception du geste par le défilement de la page.

## Mise à jour — retour individuel au salon

- En fin de partie, chaque joueur et l’hôte disposent d’un bouton « Retour au salon » pleine largeur. Le bouton d’accueil est retiré de cet écran.
- Ce retour concerne seulement la personne qui clique ; les autres peuvent rester sur le verdict. Tout lancement par l’hôte entraîne tous les joueurs dans la nouvelle partie.

## Mise à jour — secrets et résultats

- Mot privé : masque flouté de longueur fixe, sans reproduire la forme du mot réel. Maintenir affiche toujours le mot.
- Verdict de L’Imposteur : instruction retirée et cartes redondantes supprimées pour éviter les chevauchements. Les rôles des éliminés restent dans « Voir les rôles ».
- Fin de partie : seule la liste des joueurs défile, les options restent visibles sous le classement.

## Mise à jour — vote lisible à 12 joueurs

- L’Imposteur : suppression de la réduction globale du panneau, décor remonté, disposition centrée sur une seule colonne. Le mot privé est masqué pendant le vote pour libérer de la place.
- Noms et indices agrandis, abstention toujours dans une zone distincte. Sur petit écran ou faible hauteur, les suspects sont répartis en pages de six.
- L’historique des éliminés est consultable dans une fenêtre dédiée sans comprimer les votes.

## Mise à jour — bonnes lettres de Désamorçage

- Une bonne lettre fait passer temporairement le panneau de jeu au vert, pendant 900 ms, comme le retour rouge des erreurs. Compatible avec les thèmes clair et sombre.

## Mise à jour — annonces et éliminations

- L’Imposteur : animation plein écran personnelle « Vous êtes éliminé ! », puis passage en spectateur. Le verdict public affiche en grand le pseudo et le rôle du joueur désigné.
- Désamorçage et Drawing Party : annonces de tour centrées sur l’écran entier, indépendamment de la position du panneau de jeu.

## Mise à jour — proportions de Motus et lisibilité du vote

- Le décor de Motus est plafonné à 62 pixels de hauteur de lettre et 560 pixels de largeur, avec adaptation aux petits écrans.
- Désamorçage : annonce animée « À vous de jouer ! » à l’arrivée de votre tour, identique à celle de Drawing Party et sans répétition à chaque actualisation.
- L’Imposteur : décor réduit et légèrement remonté, zone de jeu agrandie, panneau du mot compacté, pseudonymes et indices de vote agrandis. Le nombre de colonnes correspond au nombre de suspects jusqu’à quatre, pour ne plus réserver une colonne vide avec trois joueurs.

## Mise à jour — décors lisibles et L’Imposteur

- Échelle 3D adaptée aux proportions réelles de chaque objet : les lettres de Motus utilisent désormais la hauteur d’une rangée de lettres, sans dépasser la largeur disponible sur mobile. Mémo Pulse et L’Imposteur sont également agrandis.
- Mémo Pulse : quatre touches carrées centrées, espacées pour contenir les halos. L’ordre des couleurs du décor 3D correspond au clavier de saisie.
- Désamorçage : mot et clavier centrés, touches compactes et lettres agrandies.
- L’Imposteur : décor visible au-dessus du panneau, grand encadré « Personne n’est éliminé ! » quand aucun joueur ne sort. Aucun décompte avant les indices ; décompte synchronisé de trois secondes avant le vote uniquement. La durée du vote commence après le décompte.

## Mise à jour — cadrage et lisibilité

- Miniatures de l’accueil centrées dans une scène de taille fixe, quel que soit l’espace disponible dans la carte.
- Aucun décor 3D ou de secours pendant le décompte.
- En jeu : décor centré au-dessus du panneau, formulaire pleine largeur, classement dans une ligne distincte. La position de l’objet 3D suit la zone réservée à l’écran ; les panneaux se redimensionnent sans chevauchement.
- Réussites visibles en cours de manche : badge vert et annonce du pseudo, sans transmettre la réponse aux autres joueurs. Les séquences partielles et faux départs ne déclenchent pas ce badge.
- Salon : « Changer de jeu » ouvre le sélecteur visuel également disponible en fin de partie.

## Mise à jour — jeux renommés et préparation des manches

- Ordre et noms identiques partout : Quiz’zeoo, C’était pas loin..., Le p’tit Motus, L’Imposteur, Désamorçage, Drawing Party, Ultra Instinct, Mémo Pulse.
- Décompte animé de 3 secondes avant chaque manche, synchronisé par le serveur, sans dévoiler les questions ni consommer le temps de jeu. L’hôte peut le passer.
- Drawing Party : zone libérée pour le dessin, mot agrandi et centré au-dessus de la toile, annonce « À vous de dessiner ! » pour le dessinateur.
- Les menus de vote et le choix de l’hôte utilisent les mêmes miniatures que l’accueil. Mémo Pulse est recentré.
- Ultra Instinct : tous les temps entre les manches, avec mise en évidence du meilleur ou des meilleurs ex æquo ; faux départs et absences identifiés.
- L’Imposteur : bouton d’abstention, compté comme une participation sans désigner de suspect.
- Classement général retiré de l’interface. Seuls restent les classements de la partie et du salon. Le stockage historique existant est conservé.

### Mise en ligne de la mise à jour
Remplacez les fichiers du projet dans votre dépôt GitHub, puis déployez cette révision sur Render (automatiquement si l’option est activée, sinon via le déploiement manuel du dernier commit). Conservez le dossier de données existant. Évitez de redéployer pendant une partie : les salons restent en mémoire et un redémarrage les ferme.

## Nouveautés V23

- Flash Reflex : réponse envoyée dès l’appui (`pointerdown`), à la souris comme au tactile. Le clic généré au relâchement est ignoré. Clavier : validation à l’enfoncement d’Espace ou Entrée, sans répétition lors d’un maintien.

## Nouveautés V22

- Molette du carrousel : les distances des événements rapprochés s’additionnent dans une destination unique. Les grands gestes ne redémarrent plus des animations natives concurrentes qui perdaient la distance demandée.
- Lissage indépendant de la fréquence des événements, limites bornées, inversion immédiate et arrêt de l’animation dès le début d’un clic-glissé.

## Nouveautés V21

- Distance de défilement à la molette multipliée par 2,8.
- Retour au salon : couverture opaque avant le changement d’interface et de scène 3D, puis révélation du salon déjà installé. Les mises à jour reçues pendant la couverture sont regroupées, et une transition annulée par le masquage de l’onglet ne bloque pas la reprise.

## Nouveautés V20

- Carrousel libre, sans recalage automatique sur les cartes ni déplacement déclenché par leur focus. Molette vers le bas : avance vers les jeux à droite ; vers le haut : retour vers la gauche.
- Sketch Party : les propositions ne révèlent plus de lettres. Des indices communs apparaissent progressivement selon le temps, avec un plafond strict de `floor(nombre de lettres / 4)` pendant la manche. Les espaces et la ponctuation ne comptent pas. Les mots de moins de quatre lettres restent entièrement masqués ; la solution complète apparaît au résultat.
- Espacement ajouté entre le dessin et le champ de réponse. Les indices se mettent à jour même quand aucun joueur n’agit.

## Nouveautés V19

- L’animation de particules et le décor de l’intro continuent pendant la combustion, jusqu’à leur disparition derrière le front de feu.
- Combustion enrichie : front irrégulier à plusieurs échelles, bord carbonisé, flammes de tailles et durées variées, fumée diffuse et braises ascendantes. Textures de flammes et fumée préparées une seule fois, puis réutilisées.

## Nouveautés V18

- Bris de verre supprimé. Après son arrivée, l’intro brûle du bas vers le haut pendant 2,3 secondes, avec bord incandescent, flammes et braises. L’accueil apparaît derrière le contenu HTML d’origine, sans copie du titre.
- Notifications en haut de l’écran.
- Carrousel contrôlé par molette verticale depuis l’accueil, flèches, tactile et clic-glissé à la souris. Un glissement n’ouvre pas la carte au relâchement.

## Nouveautés V17

- La molette fait défiler le carrousel depuis toute la page d’accueil. Les champs, le zoom et les fenêtres modales conservent leurs interactions.
- Correction du raccord HTML/canvas : même géométrie du lapin, position du texte calculée sur la ligne de base de la police, couleur du titre et préparation après stabilisation des lettres.
- Pause avant la chute réduite de 330 à 100 ms ; raccord plus direct, arrivée conservée.

## Nouveautés V16 — Bris de verre

- Impact centré et fissures radiales, avec un bref arrêt avant la chute.
- 36 fragments irréguliers qui tournent et tombent vers le bas sous l’effet d’une gravité accélérée.
- Rendu sur un seul canvas : les morceaux sont préparés avant l’impact, à résolution plafonnée. Aucune copie de l’interface par morceau. Libération des images et arrêt du rendu en fin d’intro ou si l’onglet est masqué.
- Les miniatures de jeux sont mises en pause pendant l’intro pour réduire la charge simultanée.

## Nouveautés V14

- Intro raccourcie à 3 secondes puis vitre brisée pendant environ 2 secondes, dont 0,45 seconde de fissures visibles avant la dispersion. Le titre reste net, sans flou de sortie. L’arrivée du lapin et du nom est conservée.
- Accueil dans la hauteur de l’écran : carrousel de jeux avec flèches, balayage tactile, molette, clavier et indicateur de position. Aucune barre native ne surgit en fin d’intro. Les panneaux secondaires sont compactés ou masqués sur les petits écrans ; le classement reste accessible dans l’en-tête.
- Le salon n’est créé qu’après confirmation des réglages. Annuler ou Échap n’en crée aucun.
- Jusqu’à 12 participants dans chacun des huit jeux, avec 12 sièges, classement et scène de célébration adaptés. Un treizième joueur est refusé.

## Nouveautés V13

- Mot pour Mot : mot centré et flouté, maintien souris/tactile (ou Espace/Entrée) pour le voir. Il se remasque au relâchement et au changement de fenêtre.
- Résultats par équipe : noms des gagnants et accord de « remporte / remportent ».
- Les trois joueurs du podium célèbrent avec le même saut.
- Salon : affichage maintenu à jour même sans focus et copie du code indépendante des actions en cours.
- Intro : dissipation conservée, puis retrait diagonal de la feuille avec pli lumineux et ombre, avant de libérer les commandes de l’accueil.

## Nouveautés V12 — Dailyzeoo

- **Nom** : Dailyzeoo remplace l’ancienne marque dans le titre, l’en-tête, le pied de page, les transitions et le message du serveur. L’archive et son dossier principal portent aussi le nom Dailyzeoo.
- **Lapin** : emblème vectoriel original, anguleux, vert néon et violet, utilisé dans l’en-tête et dans l’intro. Sa version SVG reste nette à toutes les tailles.
- **Icônes** : favicon SVG et ICO pour l’onglet, PNG de 32/180/192/512 pixels, icône Apple et manifeste. Aucun téléchargement externe n’est nécessaire.
- **Intro** : séquence d’environ 4,7 secondes à l’arrivée sans partie active : lapin en perspective, anneaux orbitaux, grille, particules qui accélèrent, nom Dailyzeoo dévoilé lettre par lettre puis fondu vers l’accueil. Le bouton Passer l’intro et la touche Échap permettent de la quitter immédiatement.
- Une partie déjà reprise ne déclenche pas l’intro. Revenir à l’accueil depuis le salon ne la rejoue pas ; recharger l’accueil sans session la relance. La réduction des mouvements remplace la séquence par un affichage court de 650 ms. L’intro se termine aussi si l’onglet passe à l’arrière-plan et possède une sécurité de huit secondes afin de ne pas bloquer la navigation.
- Les profils, scores et préférences déjà enregistrés restent compatibles. Les noms internes des anciennes clés de sauvegarde sont conservés pour éviter une remise à zéro.

## Fonctions V11 conservées

- **Podium** : le gagnant conserve ses sauts de joie. Les deux autres joueurs placés sur le podium sautillent aussi. Le public en dehors du podium applaudit au lieu de pleurer. Les couronnes, médailles et la coupe restent présentes.
- **Pendu** : dès que toutes les lettres du mot ont été révélées, la manche est clôturée immédiatement. Le joueur ayant posé la dernière lettre est prioritaire parmi les solveurs de cette étape ; les autres joueurs encore actifs reçoivent la résolution comme aide collective. Une complétion par les lettres affiche le noyau maîtrisé pour tous. Hors de ce cas collectif, chaque solveur voit la cage et chaque joueur n’ayant pas trouvé voit sa propre explosion, même si un autre joueur a réussi.
- **Clair / sombre** : le bouton soleil/lune remplace le bouton de réduction des animations. Le choix est conservé dans le navigateur et s’applique aux panneaux, formulaires, verdicts et fond 3D. La préférence système de réduction des mouvements reste respectée automatiquement.
- **Interfaces de jeu** : les contenus prennent leur hauteur naturelle puis s’adaptent, comme un ensemble, à l’espace disponible. Cette adaptation évite les blocs qui se chevauchent et le défilement intérieur. La toile de Sketch garde son propre redimensionnement pour conserver ses proportions.
- **Mot pour Mot** : les trois figurines décoratives et la colonne de décoration sont retirées pendant le jeu. L’interface utilise toute la largeur de la carte et les résultats, rôles et votes disposent de blocs séparés.
- **Salon** : Jouer apparaît au-dessus de Changer de jeu. Cliquer sur le code copie uniquement le code ; le bouton voisin copie toujours le lien d’invitation complet. Le jeu sélectionné remplace l’orbe sur la table, y compris dans le décor CSS de secours.
- **Explorer à la souris** : cliquez-glissez dans une zone libre du salon pour le faire tourner. Les boutons, formulaires, cartes de vote et panneau des joueurs conservent leurs interactions normales. Les boutons d’exploration restent disponibles.

## Fonctions V10 conservées

- **Résultat de Mot pour Mot** : le camp gagnant est conservé par le serveur et affiché explicitement : Les innocents ont gagné ! ou Les imposteurs ont gagné ! Une égalité de scores entre les membres de ce camp n’est plus présentée comme une égalité entre les camps.
- **Élimination** : les cartes affichent uniquement Innocent ou Imposteur, jamais le mot du joueur éliminé. Le joueur éliminé voit lui aussi son rôle à la place de son ancien mot. Les indices et mots des survivants restent protégés comme auparavant.
- **Historique de votes** : le nombre de votes qui a provoqué une élimination et le numéro du tour restent affichés dans une liste dédiée pendant les tours suivants. Les nouveaux bulletins des survivants repartent normalement à zéro, sans effacer les comptes historiques des éliminés.
- **Interface de Mot pour Mot** : carte agrandie, grille de suspects compacte, historique des éliminés fixe, suppression du défilement intérieur et bandeau spectateur avec texte clair sur fond sombre. Le décor garde sa zone à droite sur ordinateur.
- **Passer le délai**, réservé à l’hôte, est disponible pendant les huit jeux. Le bouton indique l’action correspondant à l’étape : clôturer la manche, passer aux votes, clôturer le vote ou passer à la suite. Pour Mémo Pulse, passer l’observation ouvre la saisie ; pour Flash Reflex, passer l’attente déclenche le signal. Un second clic permet ensuite de clôturer la manche si nécessaire.
- Un passage forcé utilise les règles normales de l’étape : les réponses déjà reçues sont comptées, les absents ne reçoivent pas de réponse automatique. Le serveur refuse les demandes des invités et les demandes périmées pour éviter qu’un double clic saute aussi la manche suivante. Les anciens minuteurs sont annulés.

## Fonctions V9 conservées

- **Sketch privé** : chaque devineur remplit uniquement son propre masque avec ses lettres bien placées. Les indices sont cumulatifs et conservés à la reprise de l’onglet, mais ils ne sont jamais transmis dans le masque d’un autre joueur. La solution complète reste privée au dessinateur jusqu’à la révélation de fin de manche.
- **Normal** : 940 noms ou groupes nominaux de trois mots maximum, comme FER A CHEVAL. Aucune scène générée avec « qui ».
- **Difficile** : 23 190 mots et scènes variées. L’historique anti-répétition reste actif entre parties et redémarrages.
- **Onglets indépendants** : un onglet dupliqué ne réutilise plus le jeton d’un joueur déjà présent. Il revient à l’accueil avec un profil de test indépendant et le code du salon prérempli : cliquez sur Rejoindre pour ajouter ce personnage. Un nouvel onglet normal reçoit lui aussi un profil distinct si le profil par défaut est déjà utilisé. Le pseudo est conservé par onglet.
- **Réseau multi-onglets** : le client interroge le serveur toutes les 500 ms, avec une seule requête à la fois par onglet, plutôt que d’ouvrir une connexion SSE permanente. Cela évite la limite de connexions HTTP simultanées d’un navigateur sur localhost. Les actions et scores sont toujours validés par le serveur. Les sessions expirées sont signalées proprement et reviennent à l’accueil au lieu de laisser tourner une boucle de reconnexion.

Après remplacement des fichiers, redémarrez le serveur puis actualisez les anciens onglets. Les salons en mémoire sont réinitialisés au redémarrage. Rejoignez le même code dans chaque onglet pour tester plusieurs personnages. Ajoutez les joueurs avant de lancer la partie : les arrivées en cours de jeu restent interdites.

## Fonctions V8 conservées

- **Sketch Party sans défilement intérieur** : la toile prend la place restante entre les commandes, avec un ratio 16:9 conservé par redimensionnement. Les outils, le champ de réponse et le masque restent visibles. La dernière proposition suffit à donner le contexte ; l’historique déroulant a été remplacé par ce rappel compact. Les éléments de révélation redondants sont supprimés sur ce jeu.
- **Mot à trous individuel** : pour les devineurs, les espaces et tirets restent visibles, le nombre de lettres exclut ces séparateurs. Chaque proposition acceptée révèle les lettres exactement à leur place dans la formulation attendue. Ces indices sont cumulatifs et propres à chaque devineur ; une mauvaise proposition ne les efface pas. Il faut encore proposer le mot complet pour marquer les points.
- **Votes** : le bouton des invités devient Voter pour un autre jeu. Celui de l’hôte devient Accepter le jeu du vote ; il accepte uniquement la proposition de jeu la plus votée, indépendamment des votes de revanche. Une égalité entre jeux est départagée au hasard.
- **Flash Reflex** : le meilleur temps valide obtient un verdict vert ; les autres joueurs ont un verdict rouge, même s’ils marquent des points. Les ex æquo au meilleur temps sont tous verts. Les faux départs et absences de clic sont rouges.
- **Mot pour Mot** : la partie s’arrête aussi lorsqu’il ne reste que deux joueurs, un civil et un imposteur : les imposteurs gagnent. Plus aucun imposteur signifie victoire civile ; uniquement des imposteurs signifie victoire des imposteurs. Le décor dispose maintenant d’un espace réservé à côté de la carte sur ordinateur, et au-dessus sur mobile.
- **Pendu** : 75 secondes par défaut. Chaque nouvelle bonne lettre ajoute 3 secondes au minuteur commun ; une mauvaise lettre retire 3 secondes et 1 PV à son auteur. Les propositions de mots entiers erronées coûtent toujours 1 PV, sans modifier le temps. Les paramètres de l’hôte peuvent toujours remplacer la durée de base.

## Revanche et choix de l’hôte

Aux résultats, l’hôte dispose d’abord de **Relancer** et **Choisir un autre jeu**, côte à côte. Relancer démarre directement le dernier jeu avec ses réglages. Choisir un autre jeu ouvre les huit jeux ; après sélection, les options s’affichent et **Lancer ce jeu** applique les réglages et démarre la partie en une seule action validée par le serveur.

En dessous, les actions communes sont :

1. **Revanche** : proposition personnelle pour rejouer le dernier jeu. Dès que tous les joueurs du salon sont connectés et ont voté pour la revanche, elle démarre automatiquement avec les réglages précédents, sans validation de l’hôte. Un seul vote ou une majorité ne suffit pas. Un joueur déconnecté reste réservé 30 secondes et bloque l’unanimité tant qu’il fait partie du salon.
2. **Voter pour un autre jeu** pour les invités, **Accepter le jeu du vote** pour l’hôte. Les jeux votés utilisent les réglages par défaut. L’hôte peut aussi choisir et régler lui-même un autre jeu via son premier bouton.
3. **Retour au salon** : visible et autorisé uniquement pour l’hôte. Il ramène tout le groupe au salon. Pendant une partie, il l’interrompt sans résultat enregistré.
4. **Retour à l’accueil** : quitte personnellement la session.

Le retour au salon n’est jamais soumis au vote. Le serveur refuse aussi les anciens appels de retour salon provenant d’un invité. Dans le salon, l’hôte peut régler son jeu, lancer sa sélection ou valider le vote du groupe. Choisir une proposition de jeu remplace le vote de revanche et inversement.

## Les huit jeux

| Jeu | Règles |
| --- | --- |
| Quiz Club | Une seule réponse parmi quatre. Bonne réponse : 500 à 1 000 points selon la rapidité. Culture, géographie, nature, sciences, vocabulaire et calcul. |
| Flash Reflex | Attendez le vert, puis cliquez. Faux départ : zéro. Le serveur mesure le temps : la latence influence ce jeu. |
| À un poil près | Estimez une valeur : jusqu’à 1 000 points selon l’écart relatif. Questions et situations numériques variées. |
| Motus Express | Trouvez le mot mélangé. En fin de manche, les cubes se remettent dans l’ordre avec une animation. Les longs mots du décor restent sur une ligne avec une taille adaptée. |
| Pendu Néon | Lettres communes proposées à tour de rôle, 3 PV par joueur. Mot entier possible à tout moment. Lettre absente ou mot erroné : perte de 1 PV. |
| Sketch Party | Le dessinateur reçoit seul le mot ou la scène à dessiner. Les autres devinent. Le dessinateur change chaque manche. |
| Mot pour Mot | Une minorité reçoit un mot proche, sans connaître son rôle. Indices simultanés, débat puis vote : un suspect éliminé par tour, personne en cas d’égalité. |
| Mémo Pulse | Observez les lumières puis reproduisez la séquence. La difficulté fixe la longueur initiale, qui augmente à chaque manche jusqu’à 10. |

Accents et casse sont ignorés. Les jeux classiques se règlent de 1 à 10 manches et de 10 à 180 secondes. Pour Flash Reflex, la durée de réaction est de 3 à 10 secondes. La difficulté modifie les banques, les longueurs ou le barème de réaction. Les imposteurs doivent être strictement minoritaires au lancement : jusqu’à 1 pour 3–4 joueurs, 2 pour 5–6, 3 pour 7–12.

### Pendu et confinement

Les joueurs ayant trouvé ou épuisé leurs PV ne choisissent plus de lettres. Une lettre fait passer le tour au joueur suivant. Proposer un mot hors tour ne change pas le tour, sauf si le joueur courant trouve ou épuise ses PV. Révéler toutes les lettres compte comme une résolution pour le joueur qui choisit la dernière.

Une bonne lettre ajoute 3 secondes, une mauvaise en retire 3. La durée de base par défaut est de 75 secondes.

Le premier solveur gagne 1 000 points, le suivant 800, le troisième 600 et les autres 500. Les PV sont réinitialisés à chaque manche. Le noyau filaire du décor bouge à chaque erreur et explose si personne n’a trouvé. En cas de réussite, les deux moitiés d’une cage lumineuse se referment autour du noyau et l’annonce **NOYAU MAÎTRISÉ** apparaît. Aucun avatar ni rayon n’intervient dans ce confinement.

### Mot pour Mot

Les mots et imposteurs restent identiques pendant toute la partie. Les mots sont liés thématiquement sans être des synonymes. Les éliminés suivent la suite en spectateurs. Seul le rôle des éliminés est dévoilé entre les tours. La partie continue jusqu’à la victoire d’un camp, avec victoire des imposteurs au duel final civil/imposteur ; il n’y a pas de limite arbitraire de tours. Chaque membre du camp gagnant reçoit 1 000 points, même s’il avait été éliminé. Les rôles des survivants sont alors révélés.

### Sketch Party

La toile partagée prend en charge souris, toucher, stylet, couleurs, gomme et épaisseur. N’écrivez pas le mot. Le dessinateur gagne 250 points par bonne réponse, jusqu’à 1 000. Les devineurs gagnent de 500 à 1 000 points selon la rapidité. Les scènes normales et difficiles peuvent contenir plusieurs mots : il faut retrouver la formulation complète, sans tenir compte des accents ou de la casse. La toile est limitée en nombre de segments ; effacez-la si elle est pleine.

### Mémo Pulse

La durée de saisie commence après l’observation. Recommencer efface uniquement une saisie encore incomplète. Le bouton est désactivé pendant l’envoi, après validation et lors de la révélation. La combinaison validée reste visible. Les chiffres deviennent verts ou rouges selon leur position. Une séquence exacte rapporte de 500 à 1 000 points ; un préfixe correct peut rapporter jusqu’à 400 points même si la combinaison est incorrecte.

## Diversité et anti-répétition

La V7 contient **1 166 mots** pour Motus et le Pendu, **24 370 propositions de dessin** selon les difficultés, environ **500 paires** de Mot pour Mot en difficulté normale, **11 287 questions de Quiz** et **23 636 questions ou variantes d’estimation**. Les scènes de dessin et situations numériques utilisent des combinaisons procédurales ; les mots individuels restent de vrais mots français. Les niveaux utilisent des sous-ensembles de ces banques.

Les séquences de mémoire et délais de réaction sont aléatoires. Les banques linguistiques sont grandes mais **finies**, elles ne constituent pas un dictionnaire infini ni une génération par IA en ligne. Les variantes d’une situation peuvent partager des mots ou une réponse numérique, mais pas la même question complète dans une partie.

Le fichier `data/content-history.json` conserve l’historique de contenu sur le serveur. Les sélections privilégient les éléments jamais proposés, puis les plus anciens si la banque applicable a été épuisée. L’historique de contenu est partagé entre salons et survit aux redémarrages. Les mots de Motus et du Pendu partagent cet historique. Aucune répétition exacte n’est autorisée entre manches d’une même partie. Gardez le dossier `data` lors d’une mise à jour pour conserver l’historique et le palmarès. Les mêmes mots conservés pendant les tours d’une partie de Mot pour Mot sont une exception volontaire.

## Interface et animations

Les écrans de jeu tiennent dans la hauteur de la fenêtre. L’en-tête et les scores restent visibles ; sur une petite fenêtre, le contenu intérieur se redimensionne pour garder les commandes disponibles sans défilement. La page complète ne défile pas. Les tableaux de scores se répartissent sur plusieurs lignes.

Les verdicts personnels utilisent un cadre vert, rouge ou ambre, un texte explicite et le nombre de points. Une estimation partielle est distinguée d’une réponse exacte. Au Quiz, la bonne proposition devient verte et le choix incorrect rouge. Les erreurs de mots produisent un cadre rouge temporaire.

Aux résultats, seul le panneau de droite défile. Le podium et les titres restent en place. Le dernier objet de jeu disparaît au profit de la scène de célébration : tous les joueurs, trois marches, coupe, médailles, couronnes des gagnants, sauts de joie, petits bonds sur le podium et applaudissements du public. Sur mobile, le panneau défile sous la zone de célébration.

Le bouton soleil/lune change le thème. La préférence système réduit les animations. En l’absence de WebGL, un décor CSS permet de jouer. Les changements de phase, manche ou jeu sont reconstruits à la reprise d’un onglet masqué, sans actualisation manuelle.

## Sessions et classement

Le bouton Classement affiche la partie actuelle, le cumul du salon ou le palmarès conservé dans `data/leaderboard.json`. Le navigateur conserve une identité aléatoire ; un autre navigateur ou la suppression des données crée une autre identité. Aucun compte ni audio n’est intégré.

Les salons sont en mémoire : arrêter le serveur efface les sessions actives, pas le palmarès ni l’historique de contenu. Avec le client en interrogation périodique, les joueurs cessant de contacter le serveur sont retirés après au moins 90 secondes, lors du contrôle périodique. Cela laisse une marge aux onglets en arrière-plan. Les anciens clients SSE disposent toujours de leur réserve de 30 secondes. L’hôte est transféré si nécessaire. Si le dessinateur quitte son tour ou si un joueur actif quitte Mot pour Mot, la manche est annulée sans points. Une partie entièrement à zéro n’attribue pas de victoire au palmarès.

## Vérification

Exécutez `npm test`. **109 tests** couvrent les huit jeux, les droits de l’hôte, le lancement depuis les paramètres, l’unanimité de revanche, les verdicts, les vies et éliminations, le dessin partagé, les banques, l’historique persistant, les sessions dupliquées, huit clients en interrogation périodique, les passages de délais dans tous les jeux, les victoires par camp, les comptes de votes des éliminés, la complétion du Pendu par les lettres, les effets personnels du noyau, la copie du code, le glissement de scène, les réactions du podium, l’intro skippable, la reprise sans intro, les icônes et leurs types MIME, ainsi que le classement. Certaines durées sont réduites ou simulées uniquement dans les tests.

Le navigateur de contrôle reste indisponible pour cette version. Les tests serveur et les tests d’interface avec DOM simulé passent ; le cadrage, le défilement et les animations Three.js/CSS restent à vérifier visuellement sur votre PC avec accélération graphique.

## Fichiers et mise en ligne ultérieure

- `server.js`, `engine.js` : réseau, droits, manches et points.
- `games.js`, `content-bank.js`, `content-history.js` : banques, variantes et historique.
- `ranking-store.js` : palmarès persistant.
- `public/app.js`, `extra-ui.js`, `host-controls.js`, `feedback.js`, `tab-session.js`, `round-state.js`, `fit-interface.js`, `lobby-interactions.js` : navigation, jeux, paramètres et verdicts.
- `public/scene.js`, `ceremony.js` : décor, cage et podium.
- `public/intro.js`, `brand.css`, `assets/rabbit-mark.svg` : identité et intro Dailyzeoo.
- `public/favicon.svg`, `favicon.ico`, `site.webmanifest`, `assets/icon-*.png`, `assets/apple-touch-icon.png` : icônes locales.
- `public/vendor/` : Three.js 0.180.0 et GSAP 3.13.0 avec licences.

Le serveur écoute sur toutes les interfaces, port 3000 par défaut. Pour changer le port, utilisez `PORT=4000 npm start` sous Linux/macOS ou `$env:PORT=4000; npm start` dans PowerShell. `npm run dev` sert un aperçu sur le port 4173.

Pour jouer hors du réseau local, il faudra un hébergement Node.js avec connexions SSE et stockage durable, ou un tunnel. GitHub Pages seul ne peut pas exécuter le serveur multijoueur. Aucune publication n’est effectuée : cette livraison reste locale.
