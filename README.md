# Koło imion PL-NO

Aplikacja React/Vite do losowania męskich imion dla dzieci wychowywanych w Norwegii, z zachowaniem polskich korzeni.

## Co zawiera projekt

- React + Vite
- Tailwind CSS
- Framer Motion
- lokalne komponenty UI bez zależności od `@/components/ui`
- koło losowania imion
- tryb losowania pary dla bliźniaków
- opisy znaczenia i pochodzenia imion
- ocena dopasowania: Polska, Norwegia, globalnie, unikatowość
- wyszukiwarka, filtry, ulubione i dodawanie własnych imion
- GitHub Actions workflow do publikacji na GitHub Pages

## Uruchomienie lokalnie

```bash
npm install
npm run dev
```

## Build lokalny

```bash
npm run build
npm run preview
```

## Publikacja na GitHub Pages

Repozytorium jest obecnie prywatne. Jeżeli chcesz hostować stronę za darmo na GitHub Pages, najprościej ustaw repozytorium jako publiczne.

1. Wejdź w `Settings > Pages`.
2. W sekcji `Build and deployment` ustaw `Source` na `GitHub Actions`.
3. Wejdź w zakładkę `Actions` i uruchom workflow `Deploy to GitHub Pages`, albo zrób dowolny commit na branchu `main`.
4. Po zakończeniu workflow strona powinna być dostępna pod adresem:

```text
https://techjohncnc.github.io/kolo-imion-pl-no/
```

## Uwagi

Projekt jest statyczny. Nie używa bazy danych, logowania, płatności ani kluczy API.
