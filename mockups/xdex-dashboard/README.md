# xdex — quiet minimalist

Maquette interactive du dashboard de `../xdex`, réalisée avec le skill altered-design.
Direction choisie : quiet minimalist. La composition met le tri au centre, avec les
sujets, les sources et le budget dans une colonne secondaire.

## Ouvrir

Le fichier `index.html` peut être ouvert directement dans un navigateur. Pour servir
la maquette depuis ce répertoire :

```sh
python3 -m http.server 4190 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:4190. Arrêter ce serveur avec Ctrl+C dans son terminal.

## Explorer

- Vue d’ensemble, liste complète à trier, bibliothèque et archives.
- Recherche globale avec le bouton en haut ou Cmd/Ctrl+K ; accents facultatifs.
- Filtres par source et par sujet, recherche locale et ordre chronologique.
- Garder, archiver, restaurer et annuler la dernière action ; compteurs cohérents.
- Fiche de ressource avec résumé et sujets associés.
- Sources, budget illustratif, affichage compact et réinitialisation de la démo.
- Navigation mobile et fenêtres utilisables au clavier.

Les 24 ressources, leurs auteurs et les montants sont fictifs. L’état de tri reste en
mémoire et repart de zéro au rechargement. La synchronisation et les connexions sont
simulées ; la maquette n’accède à aucune API ni à la base de données de xdex.

Aucune dépendance de construction ni ressource réseau externe. Police système, SVG
intégrés et fichiers HTML/CSS/JavaScript locaux. Les résultats des contrôles sont dans
`VERIFICATION.md`. Le contexte et les choix de composition sont dans `BRIEF.md`.
