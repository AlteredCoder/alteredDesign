# Vérifications — 9 septembre 2026

Prototype interactif local, données fictives, thème clair. Chromium / Playwright.

20 scénarios sont passés : état initial, dédoublonnage des onglets, conservation des
recherches/filtres et du défilement, aucun résultat, tri et annulation, archivage d’une
seule capture d’une ressource partagée, fermeture des onglets actifs/inactifs, clavier,
accueil fixe, nouvel onglet, déplacement des groupes par clic et glisser, zoom/ajustement/
réinitialisation, note, synchronisation simulée, URL invalide et ajout échappé, responsive,
réduction des animations et absence d’erreurs JavaScript.

Une vérification complémentaire confirme l’accès aux sources sur mobile, fermeture par
Échap et retour du focus au bouton d’ouverture.

Rendus inspectés : desktop 1440 × 1040, tablette 768 × 920, mobile 375 × 920,
fiche de lecture desktop et mobile. Reflow vérifié à 320 px. Le canvas et les onglets
utilisent un défilement interne intentionnel ; aucune largeur excessive de la page.
Les zones du canvas sont déplaçables et gardent leurs cartes regroupées ; la liste
constitue l’adaptation mobile, pas une reproduction spatiale à petite échelle.

Après correction des contrastes secondaires et séparation des boutons de fermeture du
conteneur ARIA tablist, axe ne signale aucune violation dans les règles A/AA testées
(WCAG 2.x) sur l’accueil, la recherche vide, le tri, la lecture et les sources, avec les
vues mobiles correspondantes. Aucun test isolé ne certifie une conformité WCAG complète.
Pas de test utilisateur ni de test avec un lecteur d’écran physique réalisé.

Échantillons de contraste mesurés : texte principal 13,57:1, action violette avec texte
blanc 6,21:1, descriptions sur fond lavande 5,12:1, abricot 4,97:1 et sauge 4,91:1.
Ces mesures couvrent les paires représentatives, pas toutes les combinaisons possibles.

Les fonds, proportions et cartes ont été comparés aux références Kosmik / Integrity :
regroupements spatiaux colorés, contenus texte / image, note et vues de lecture séparées.
Adaptation volontaire : canvas fini et groupes déplaçables, plutôt qu’un éditeur infini.

Preuves de session : `/private/tmp/xdex-canvas-verification/results.json` et captures PNG
dans ce même dossier. Le dernier contrôle mobile inclut le bouton d’accès aux sources.

## Révision de la surface canvas

Comparaison à fenêtre identique, 1440 × 820 : la surface de défilement passe de
1190 × 500 px à 1226 × 581 px. Avec « Agrandir » : 1440 × 649 px, soit environ
57 % de surface supplémentaire par rapport au cadre initial. Les onglets restent visibles.
L’en-tête est compact, le cadre intérieur a disparu, les outils sont dans une barre
séparée. La vue d’ensemble est centrée et montre réellement tous les groupes ; elle
sert au repérage, le menu des collections ramène à 100 % pour lire.

14 contrôles ciblés passent sur la version finale : surface disponible, déplacement du
fond, défilement clavier, centre du zoom, vue d’ensemble et accès à une collection,
agrandissement et focus, retour aux onglets/Échap, déplacement suivant le pointeur,
extension de la surface avec les groupes, réajustement après redimensionnement,
commandes et navigation à 768 / 375 / 320 px, erreurs et accessibilité automatisée.
Aucun chevauchement des commandes ou débordement de la page à ces dimensions.
Le canvas peut défiler horizontalement ; la liste reste l’entrée mobile par défaut.

Les 20 scénarios de régression existants passent également. Le sélecteur de test du
bouton Sources a été limité au bouton visible, car le prototype possède déjà une
variante mobile. Aucun changement de comportement des sources n’était nécessaire.

Rendus finaux inspectés : canvas normal et agrandi à 1440 × 820, vue d’ensemble,
canvas et liste à 768, 375 et 320 px de large (hauteur 820). Clavier : entrée dans le
mode agrandi, Échap avec retour du focus, flèches dans le canvas ; le parcours des
onglets et la réduction des animations restent couverts par la régression.

Axe ne relève aucune violation A/AA dans les états ciblés. Les contrôles finaux ont
utilisé un serveur HTTP local temporaire pour permettre à axe de relire la feuille CSS :
sur les URL file://, les requêtes CSS supplémentaires de l’audit étaient bloquées,
alors que la feuille du document était chargée. Sur HTTP : aucune requête échouée ni
erreur JavaScript. Le prototype reste ouvrable directement avec index.html.
Les limites de conformité et de test utilisateur décrites plus haut restent applicables.

Preuves : `/private/tmp/xdex-canvas-roomier/results.json`, captures du même dossier,
et `/private/tmp/xdex-canvas-roomier/regression/results.json`.
