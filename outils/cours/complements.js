// Pages propres aux documents de cours (absentes des leçons du site) : même format de blocs que site/data/droit.js.
// { raw } : HTML mis tel quel (schémas).
const box = (title, kind, t) => ({ box: t, title, kind });

// Schéma simplifié d'un procès civil (guide d'entraînement des travaux dirigés de droit civil)
const court = (n1, n2) => `<div class="court"><p class="cn1">${n1}</p><p class="cn2">${n2}</p></div>`;
const row = (c, dec, a, b) => `<div class="row">${c}<p class="dec">rend<br>${dec}</p><div class="out"><p>${a}</p><p class="ou">ou</p><p>${b}</p></div></div>`;
const step = t => `<p class="step">${t}</p>`;
const PROCES = `<div class="proc">
${row(court('Tribunal de première instance<br>ou section détachée', 'Pierre : demandeur<br>Jean : défendeur'), 'un jugement', '<b>Déboute Pierre</b> de sa demande (la demande est rejetée)', '<b>Fait droit</b> à la demande de Pierre (Jean est condamné)')}
${step('La partie qui a perdu <b>interjette appel</b>')}
${row(court("Cour d'appel", 'Appelant<br>Intimé'), 'un arrêt', '<b>Confirme</b> le jugement (arrêt confirmatif)', '<b>Infirme</b> le jugement (arrêt infirmatif)')}
${step('La partie qui a perdu <b>forme un pourvoi en cassation</b><br>(ou « se pourvoit en cassation »)')}
${row(court('Cour de cassation', 'Demandeur au pourvoi<br>Défendeur au pourvoi'), 'un arrêt', "<b>Casse</b> la décision de la cour d'appel (arrêt de cassation)", '<b>Rejette</b> le pourvoi (arrêt de rejet)')}
</div>`;

module.exports = {
  proces: { title: "Document : schéma simplifié d'un procès civil", body: [
    { p: "Ce schéma, tiré du guide d'entraînement des travaux dirigés, suit une même affaire civile d'une juridiction à l'autre. Il donne, à chaque degré, **le nom des parties** et **le nom de la décision** : c'est le vocabulaire qu'il faut employer sans faute dans une fiche d'arrêt ou un cas pratique." },
    { raw: PROCES },
    { h: 'Remarques' },
    { ol: [
      "Il s'agit d'un schéma **simplifié** : certaines étapes varient selon le type d'affaire. Une décision rendue **en dernier ressort** (affaire de faible montant, par exemple) ne peut pas faire l'objet d'un appel ; seul le pourvoi en cassation reste ouvert.",
      "**Correspondances entre juridictions ivoiriennes et françaises en matière civile** : le **tribunal de première instance** ivoirien correspond au **tribunal judiciaire** français (l'ancien tribunal de grande instance, remplacé en 2020) ; la **cour d'appel** existe dans les deux pays ; la **Cour de cassation** ivoirienne, qui a succédé à la chambre judiciaire de l'ancienne Cour suprême, correspond à la Cour de cassation française.",
      "Les **sections détachées** des tribunaux sont installées dans les petites villes. Elles dépendent, sur le plan administratif, d'un tribunal de première instance, mais rendent des décisions qui ont **la même valeur** que celles des tribunaux de première instance.",
    ] },
    box('À retenir', 'cle', "Au premier degré, on parle de **jugement** ; devant la cour d'appel et la Cour de cassation, d'**arrêt**. On **interjette appel** d'un jugement ; on **forme un pourvoi** contre un arrêt. La Cour de cassation ne rejuge pas les faits : elle vérifie que le droit a été correctement appliqué."),
  ] },

  biblio: { title: 'Bibliographie du cours', body: [
    { p: 'Les ouvrages et travaux sur lesquels s\'appuie le cours, pour approfondir chaque chapitre.' },
    { ul: [
      "Mohammed Hocine **Benkheira**, « Droit musulman », *Annuaire de l'École pratique des hautes études (EPHE), Section des sciences religieuses*, n° 115, 2008.",
      "A. **Elias**, *Cheikh Youssef al-Qaradâwî et l'islam du juste milieu*, 2018.",
      "Louis **Milliot**, *Introduction à l'étude du droit musulman*, Paris, Recueil Sirey, 1953, p. 12.",
      "François **Déroche**, *La Voix et le Calame. Les chemins de la canonisation du Coran*, leçons du cours « Histoire du Coran. Texte et transmission », Collège de France, 2015-2016.",
      "« Rédaction du Coran », dans Mohammad Ali **Amir-Moezzi** (dir.), *Dictionnaire du Coran*, Paris, Robert Laffont, 2007, p. 735 et suivantes.",
      "Mohammad Ali **Amir-Moezzi**, *Le Coran silencieux et le Coran parlant*, Paris, CNRS Éditions, 2011, p. 76.",
      "Ralph **Stehly**, *Histoire de la formation du Coran*, Université de Strasbourg.",
      "Les travaux de Guillaume **Dye**, islamologue, professeur à l'Université libre de Bruxelles (ULB), sur la formation du texte coranique.",
    ] },
  ] },
};
