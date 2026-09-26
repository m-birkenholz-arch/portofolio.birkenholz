# Webdesign Birkenholz

Portfolio van Michael Birkenholz voor **birkenholz.nl**.

## Stack
- HTML / CSS / JavaScript
- Netlify
- Netlify Functions
- Resend voor het contactformulier

## Netlify
Koppel deze repository aan Netlify. Er is geen build command nodig; de publish directory is de repository-root.

Voeg in Netlify onder Environment variables toe:

`RESEND_API_KEY` = de Resend API-key

De sleutel hoort nooit in GitHub of frontend-code.

## Contactformulier
De Netlify Function `/.netlify/functions/contact` verstuurt berichten via Resend:
- afzender: `contact@birkenholz.nl`
- ontvanger: `m-birkenholz@hotmail.com`
- Reply-To: e-mailadres van de bezoeker
