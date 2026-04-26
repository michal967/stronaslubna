# Wedding Page – v3.1 (RSVP via Tally)

## NOWOŚĆ — Sekcja RSVP (Tally.so)

Dodana sekcja **„Potwierdź obecność"** z osadzonym formularzem Tally:
- Link RSVP w sticky nav
- Pływający przycisk „POTWIERDŹ OBECNOŚĆ" (lewy dolny róg, pojawia się po przewinięciu hero)
- Sekcja `id="rsvp"` z embeddem Tally (auto-resize)
- Deadline (28.02.2027) wyświetlony pod tytułem
- Fallback / placeholder gdy `formId` nie jest skonfigurowany

## Pliki nowe
- `public/favicon.svg`, `public/og-image.jpg`, `public/robots.txt`
- `vercel.json` (nagłówek `X-Robots-Tag: noindex`)
- `src/data/wedding.js` (dane + Tally `formId`)
- `CHANGES.md` (ten plik)

## Pliki zmodyfikowane
- `public/index.html` — meta OG/Twitter, noindex, favicon, theme-color
- `src/pages/WeddingPage.jsx` — sticky nav + back-to-top + lazy mapy + reverse countdown + floral dividers + RSVP + Tally embed + floating CTA
- `src/pages/WeddingPage.css` — style sticky nav, lazy map, floral, back-to-top, RSVP, floating CTA
- `package.json` — usunięte: `tailwindcss`, `postcss`, `autoprefixer`, `tailwindcss-animate`

## Pliki usunięte
- `tailwind.config.js`, `src/pages/WeddingPage.min.css`, `src/images/hero-bg.jpeg`

---

# 🚀 KONFIGURACJA TALLY.SO (5 minut, darmowe, bez karty)

## 1. Załóż konto
Wejdź na **https://tally.so** → Sign up (Google / email).

## 2. Stwórz formularz
W panelu kliknij **"Create new form"** → wybierz "Start from scratch".

Dodaj **dokładnie te pola** (kolejność dowolna):

| Pole | Typ Tally | Wymagane |
|---|---|---|
| **Imię i nazwisko** | Short answer | ✅ Tak |
| **Czy weźmiesz udział w naszym ślubie?** | Multiple choice → 2 opcje: `Tak, będę ❤️` / `Niestety, nie mogę przyjść` | ✅ Tak |
| **Liczba osób (razem z Tobą)** | Multiple choice: `1`, `2`, `3`, `4`, `5` *(lub Number)* | ✅ Tak — z **Logic** „pokaż gdy odpowiedź = Tak, będę" |
| **Preferencje żywieniowe / alergie** | Long answer (np. *„Wegetarianizm, alergie pokarmowe — opisz krótko"*) | ❌ Opcjonalne — Logic „pokaż gdy = Tak, będę" |
| **Wiadomość dla pary młodej** *(bonus)* | Long answer | ❌ Opcjonalne |

### Logic conditional fields (ważne!)
W Tally w lewym panelu pola: **"Logic"** → wybierz pole „Liczba osób":
- `Show this question if` → "Czy weźmiesz udział..." → `is` → "Tak, będę ❤️"

Powtórz dla pola „Preferencje żywieniowe".

### Email z powiadomieniami
W zakładce **"Integrations"** włącz **"Email notifications"** → wpisz swoje maile (np. michalokozak@gmail.com, kingawojcik5252@gmail.com). Każde nowe RSVP poleci na maila.

### Wszystkie odpowiedzi w jednym miejscu
Zakładka **"Submissions"** w Tally pokazuje wszystkie odpowiedzi w tabeli. Można też podpiąć Google Sheets (Integrations → Google Sheets) dla wygodnego eksportu.

## 3. Opublikuj formularz
Prawy górny róg → **"Publish"**. Dostaniesz URL typu:

```
https://tally.so/r/abc1XY
                    ^^^^^^
                Twoje formId
```

Skopiuj **te 6 znaków po `/r/`**.

## 4. Wklej formId do strony
Otwórz `src/data/wedding.js` i podmień:

```js
export const tally = {
  formId: 'PASTE_TALLY_FORM_ID_HERE',  // ← zmień na np. 'abc1XY'
};
```

## 5. Zbuduj i wdróż
```bash
yarn install
yarn build
git add -A && git commit -m "RSVP via Tally" && git push
```

Vercel zrobi auto-deploy. Gotowe!

---

# Jednorazowo — czyszczenie node_modules z Gita

```bash
git rm -r --cached node_modules
git commit -m "stop tracking node_modules"
git push
```
