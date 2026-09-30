# Slike za landing stranicu

Stranica radi i bez ovih slika: dok slike nema, u okviru telefona se prikazuje
HTML maketa. Kad ubaciš sliku s tačnim imenom, ona automatski zamijeni maketu
(ništa u kodu ne treba mijenjati). Poslije dodavanja pokreni `npm run generate`.

**Hero je izuzetak.** Tamo stoji `hero-discover.webp` — gotov render telefona,
sa svojim okvirom i sjenom — pa ga `HeroSection.vue` prikazuje direktno, bez
`PhoneFrame` komponente. Nacrtani okvir bi oko njega bio drugi telefon.
Zamjena te slike znači zamijeniti sam fajl; ime i omjer nisu vezani za
1179 × 2556 kao kod ostalih. Mora ostati format s prozirnošću (.webp ili
.png) — render nema pozadinu, pa bi je JPEG popunio bijelim pravougaonikom.

## 1. Screenshotovi aplikacije → `app/assets/images/`

Format: **.webp** (može i .png/.jpg), portret, **1179 × 2556 px** (iPhone 15/16,
omjer 9:19,5). Bez okvira telefona i bez status bara ako možeš; okvir crta stranica.

| Ime fajla | Gdje se pojavljuje | Šta treba biti na ekranu |
|---|---|---|
| `mahrem-portal.webp` | Sekcija Mahrem | **Mahrem portal** iz ugla oca/brata: razgovor koji samo čita, vidljivo da se ne može pisati. |
| `pitanja-prije-razgovora.webp` | Sekcija Pitanja prije razgovora | Ekran s odgovorima na 3 pitanja i dugmadima „Sviđa mi se" / „Ne sviđa mi se". |
| `profil-detalji.webp` | Sekcija Profil | Detalji profila: vjera, planovi za brak, djeca, selidba, i po mogućnosti jedan odgovor iz **Situacija**. |
| `zajednica.webp` | Sekcija Zajednica | Feed **Pitaj sestre** ili **Pitaj braću** s anonimnom objavom i reakcijama (Korisno, Ima smisla…). |

**Engleska verzija:** isti ekran na engleskom dodaj s `.en` prije ekstenzije,
npr. `mahrem-portal.en.webp`. Ako ga nema, i engleska stranica koristi bosanski.

**Važno za screenshotove:** koristi testne profile, ne prave korisnike (ime,
lice i poruke stvarnih ljudi ne smiju na stranicu bez njihove dozvole).
Fotografije: pristojno odjeveni, pojedinačno, bez parova u zagrljaju.

## 2. Bedževi trgovina → `app/assets/images/` (tek kad aplikacija izađe)

| Ime fajla | Izvor |
|---|---|
| `badge-app-store.svg` | Službeni „Download on the App Store" bedž (developer.apple.com/app-store/marketing/guidelines) |
| `badge-google-play.png` | Službeni „Get it on Google Play" bedž (play.google.com/intl/en_us/badges) |

## 3. Slika za dijeljenje (Facebook, WhatsApp, Viber…) → `public/`

| Ime fajla | Veličina | Sadržaj |
|---|---|---|
| `og-image.jpg` | **1200 × 630 px**, ispod 300 KB | Tamnoplava pozadina, „Niyyah" i „Brak, tražen s namjerom.", eventualno telefon s karticom profila. Tekst drži u sredini (rubovi se nekad odsijeku). |

Dok ga nema, koristi se `favicon-512.jpg`.

## 4. Logo (preporuka)

Trenutni `public/logo.png` na dnu piše „HALAL DATING APP", a brief kaže da se
riječ „dating" ne koristi. Ako postoji verzija bez tog teksta, zamijeni
`public/logo.png` (kvadrat, najmanje 480 × 480 px, providna pozadina) i
`public/favicon-512.jpg`.
