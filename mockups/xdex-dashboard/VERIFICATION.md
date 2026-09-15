# Vérification de la maquette xdex

Contrôles relancés le 9 septembre 2026 après la seconde passe visuelle, avec Chromium,
Playwright et axe-core.
Les données sont fictives ; ces résultats concernent uniquement la maquette locale.

## Résultats

- 16 scénarios validés : recherche globale sans distinction d’accents, recherche
  locale, filtres par source et sujet, tri chronologique, détails, Garder, Archiver,
  Restaurer, annulation, compteurs, boîte de réception vide, affichage compact,
  réinitialisation, synchronisation simulée, navigation mobile et ouverture directe.
- Aucun débordement horizontal observé aux largeurs 320, 375, 768 et 1440 px.
  Captures finales inspectées visuellement à 375, 768 et 1440 px.
- Navigation clavier vérifiée : focus visible, parcours Tab et Maj+Tab dans les
  fenêtres, fermeture avec Échap et retour du focus. Après le tri depuis une fiche,
  le focus rejoint la ressource suivante lorsque le déclencheur a disparu.
- Préférence de réduction des animations vérifiée ; le retour d’état de la
  synchronisation reste disponible.
- Aucun échec de requête ni erreur JavaScript pendant les scénarios.
- Ouverture directe de `index.html` et action de tri validées, sans requête réseau
  externe. Aucune installation ni compilation nécessaire.

## Accessibilité

Quatre analyses axe-core avec les règles WCAG sélectionnées n’ont signalé aucune
violation : vue d’ensemble sur ordinateur, fiche de ressource, recherche globale
vide et bibliothèque sur mobile. Le bouton de recherche mobile possède un nom
accessible explicite.

L’outil a laissé certains contrastes à examiner manuellement. Dix combinaisons de
couleur de texte et de fond ont donc été calculées à partir des styles rendus :
ratios de **4,81:1 à 14,20:1**. Cet échantillon ne constitue pas un audit exhaustif.
Ces vérifications ne valent pas déclaration de conformité WCAG ; aucun test avec
lecteur d’écran ni contrôle sur tous les navigateurs n’a été effectué.

Le comportement des fenêtres s’appuie sur le [modèle de dialogue modal WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
et la [documentation MDN de l’élément dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).

## Éléments conservés

- [Version précédente — 1440 px](verification/before-1440.png)
- [Capture ordinateur — 1440 px](verification/dashboard-1440.png)
- [Capture tablette — 768 px](verification/dashboard-768.png)
- [Capture mobile — 375 px](verification/dashboard-375.png)
- [Résultats détaillés des contrôles](verification/results.json)

La comparaison visuelle montre les métriques sans carte extérieure, le cadre
d’application en retrait, les sujets sans cadres individuels et une typographie
plus grande. Sur mobile, les sujets et les sources passent sur une colonne pour
préserver la taille des libellés. Le document devient plus long : le tri reste avant
les informations secondaires. Cette appréciation visuelle reste distincte des tests.

Les analyses axe ont été effectuées via un serveur HTTP local, arrêté après les
contrôles. Un premier passage du harnais sous `file://` avait signalé quatre échecs
de lecture CSS pendant les analyses. Le passage HTTP final ne signale aucun échec ;
l’ouverture directe et le tri hors ligne ont été vérifiés séparément.

La maquette utilise un état en mémoire, réinitialisé au rechargement. Les connexions,
la synchronisation et le budget sont illustratifs ; aucune intégration avec le
serveur ou la base de données de xdex n’a été testée.
