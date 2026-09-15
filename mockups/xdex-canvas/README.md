# xdex — Le bureau des idées

Prototype HTML interactif, direction **visuel / canvas**, créé de zéro avec le skill
altered-design. Ouvrir `index.html` dans un navigateur ; aucun serveur ni build requis.

- Canvas de collections colorées sur toute la surface sous les commandes. « Agrandir »
  masque la navigation latérale et la barre supérieure, en gardant les onglets de travail.
- Navigation : glisser le fond, faire défiler ou choisir une collection dans le menu du bas.
  « Vue d’ensemble » montre tous les groupes ; un clic sur le pourcentage revient à 100 %.
  Le menu de collections revient aussi à la taille de lecture. Les outils ne masquent pas les cartes.
- Déplacer les groupes par leur poignée ou avec les commandes accessibles au clic ;
  leur espace s’étend si nécessaire. Le bouton de rangement rétablit la disposition initiale.
- Onglets de travail : tableau de bord fixe, bibliothèque et ressources, fermeture,
  ouverture avec « + », dédoublonnage et conservation de l’état des vues.
- Recherche, filtres par source et sujet, tri des sauvegardes, archives et Annuler.
- Fiches de lecture, ressources liées, note modifiable et ajout manuel de lien.
- Sur mobile : liste par défaut et canvas disponible ; onglets à défilement horizontal.

Clavier : Tab et Maj+Tab pour circuler, flèches/Home/End dans les onglets, Suppr pour
fermer un onglet de ressource, Échap pour fermer les dialogues ou réduire le canvas, `/` pour chercher.
Quand le canvas a le focus, les flèches permettent de le faire défiler. Sur écran tactile,
le défilement reste natif. Le zoom conserve le centre de la vue autant que les limites
du canvas le permettent.

Les données sont fictives. La synchronisation et les coûts sont simulés. Les ajouts,
le tri, les notes et les positions restent en mémoire pendant cette session et sont
réinitialisés au rechargement. Les groupes se déplacent ; les cartes restent organisées
à l’intérieur de leur sujet. Ce prototype ne modifie pas l’application xdex.

Crédits : [assets/CREDITS.md](assets/CREDITS.md). Brief : [BRIEF.md](BRIEF.md).
Vérifications : [VERIFICATION.md](VERIFICATION.md).
