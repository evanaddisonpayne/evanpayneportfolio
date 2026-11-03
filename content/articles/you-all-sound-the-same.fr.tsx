import Footer from "@/components/Footer";
import Share from "@/components/Share";

export const title = "Vous vous ressemblez tous. Ça coûte des millions.";
export const deck = "La Work Tech a un problème d’uniformité. Et non, un énième atelier messaging ne va pas le régler.";

const taglines = [
  "“Empowering people to do their best work”",
  "“Unlock the full potential of your workforce”",
  "“The platform that puts people first”",
  "“Helping organizations build a better workplace”",
  "“Where people thrive and business grows”",
];

export default function Article() {
  return (
    <>
      <section className="ar-head dark">
        <div className="wrap ar-head-row">
          <div className="ar-head-text">
            <p className="ar-crumb">
              <span>Écrits</span>
              <span className="dot" aria-hidden>·</span>
              <span>Positionnement</span>
            </p>
            <h1 className="ar-title">Vous vous ressemblez tous. Ça coûte des&nbsp;millions.</h1>
            <p className="ar-dek">La Work Tech a un problème d’uniformité. Et non, un énième atelier messaging ne va pas le&nbsp;régler.</p>
            <div className="ar-byline">
              <img src="/art/seal.webp" alt="" width={44} height={44} />
              <div>
                <p className="name">Evan Addison&nbsp;Payne</p>
                <p className="meta">avril 2026&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;6 min de&nbsp;lecture</p>
              </div>
            </div>
          </div>
          <img className="ar-tarot" src="/art/tarot_1.webp" alt="Carte de tarot (I), « The Crowd »" width={216} height={360} />
        </div>
      </section>

      <article className="ar-body light">
        <div className="wrap ar-col">
          <p className="ar-open">
            J’ai 14 onglets ouverts en ce moment. Chacun affiche la page d’accueil d’une entreprise Work Tech différente. Et il faut que vous compreniez une chose : les
            audits concurrentiels, c’est mon métier. C’est une part essentielle de mon travail chez The Starr Conspiracy. Et je viens de cliquer trois fois de suite sur le
            mauvais onglet. Pas par négligence. Parce que ces entreprises portent les vêtements les unes des autres. Même titre de hero sur « l’autonomisation des
            collaborateurs ». Même photo de banque d’images d’une équipe qui rit devant un ordinateur portable comme si quelqu’un venait de raconter la meilleure blague de
            toute l’histoire du monde corporate. Même palette bleu, turquoise, violet. Mêmes promesses. Je passe d’une entreprise à l’autre, avec des produits réellement
            différents, des capacités différentes, des raisons d’exister totalement différentes, et vues de l’extérieur, ce pourrait tout aussi bien être la même entreprise
            déclinée en 14 polices&nbsp;différentes.
          </p>
          <p>C’en serait presque drôle. Presque. Jusqu’à ce que vous mesuriez combien d’argent part en fumée à cause de&nbsp;ça.</p>

          <h2 className="ar-sub">La taxe de&nbsp;l’uniformité</h2>
          <p>
            Voici ce que personne ne pose correctement : quand toutes les entreprises de votre catégorie disent la même chose, vous n’avez pas un problème de branding. Vous
            avez un <em>problème de chiffre d’affaires</em> déguisé en problème de branding. Pensez à ce qui se passe vraiment quand un acheteur n’arrive pas à vous
            distinguer de la concurrence. Il ne creuse pas davantage. Il ne fouille pas plus loin dans vos pages produit. Il se rabat sur deux critères pour vous
            départager, le prix, et celui dont il a déjà entendu parler. C’est tout. Voilà toute la grille de&nbsp;décision.
          </p>
          <p>
            Toute votre machine go-to-market, le travail de positionnement, le programme de contenus, les campagnes ABM, le sponsoring événementiel à 200&nbsp;k$ où vous avez
            distribué des chaussettes à votre logo, tout cela se réduit à « qui est le moins cher » et « qui je connais&nbsp;déjà ».
          </p>
          <p>
            J’appelle ça la taxe de l’uniformité. Vous payez plein tarif un marketing qui tourne à une fraction de ses capacités, parce que votre marque ne donne aux
            acheteurs aucune raison de vous <em>préférer</em>.
          </p>
          <p className="ar-punch">
            Pas vous choisir. <span>Vous&nbsp;préférer.</span>
          </p>
          <p>Ce sont deux verbes très différents, et c’est dans l’écart entre les deux que votre pipeline va&nbsp;mourir.</p>

          <figure className="ar-exhibit">
            <figcaption>
              <span className="lbl">Pièce A</span>
              <span>De vraies taglines de vraies entreprises Work Tech. Allez-y, retrouvez qui dit&nbsp;quoi.</span>
            </figcaption>
            <ul>
              {taglines.map((t) => (
                <li key={t}>
                  <span>{t}</span>
                  <span className="slot" aria-hidden />
                </li>
              ))}
            </ul>
          </figure>
          <p className="ar-after">Vous n’y arrivez pas. Vos acheteurs non plus. Et si l’une d’elles est la vôtre ? Prenez une seconde pour digérer&nbsp;ça.</p>

          <h2 className="ar-sub">Comment on en est arrivé&nbsp;là</h2>
          <p>
            J’ai passé assez de temps à l’intérieur du processus de stratégie de marque pour savoir exactement comment ça se produit, et je tiens à être clair : ce n’est pas
            parce que les marketeurs sont paresseux ou bêtes. C’est parce que le système est magnifiquement, presque élégamment conçu pour produire exactement ce&nbsp;résultat.
          </p>
          <p>L’histoire se déroule&nbsp;ainsi.</p>
          <p>
            Une entreprise lève des fonds, recrute un nouveau CMO, ou finit par admettre que son site semble dater de l’époque où l’on disait encore « transformation
            digitale » sans rire. Elle décide qu’il est temps de faire un rebranding. Elle engage une agence ou monte une équipe interne et lance un processus fait
            d’entretiens avec les parties prenantes, d’audits concurrentiels et d’ateliers messaging. Il y a des post-it. Il y a un tableau Miro grand comme un terrain de
            foot. Vers la sixième semaine, tout le monde se met d’accord sur un discours techniquement exact, stratégiquement défendable, et parfaitement impossible à
            distinguer de celui de n’importe quelle autre entreprise de la&nbsp;catégorie.
          </p>
          <p>
            Pourquoi ? Parce que le processus est optimisé pour le consensus interne, pas pour la différenciation externe. Chaque partie prenante laisse ses empreintes sur
            le message. Le juridique lime les angles. Le CEO ajoute « et l’IA » à la proposition de valeur parce qu’il rentre d’un salon. Au moment de la mise en ligne, le
            tout a été poncé jusqu’à devenir quelque chose qui ne gêne personne. Et ce n’est pas un hasard si c’est aussi quelque chose dont personne ne se&nbsp;souvient.
          </p>
          <blockquote className="ar-quote">
            <p>La phrase la plus dangereuse en stratégie de marque n’est pas « il faut qu’on soit plus innovants ». C’est « je pense que tout le monde peut s’en&nbsp;accommoder ».</p>
          </blockquote>
          <p>
            Dès que vous entendez cette phrase dans une salle, c’est déjà perdu. « Tout le monde peut s’en accommoder », c’est le bruit de la différenciation qui meurt. Ça
            veut dire que vous avez écrit votre message en comité, ce qui revient à composer une playlist en comité : techniquement inoffensive, mais personne ne monte le&nbsp;son.
          </p>

          <h2 className="ar-sub">L’IA comme&nbsp;accélérateur</h2>
          <p>
            Et voici la partie qui devrait sincèrement vous inquiéter. L’IA aggrave le problème de l’uniformité de façon exponentielle, et les plus enthousiastes de l’IA en
            marketing sont souvent ceux qui en ont le moins&nbsp;conscience.
          </p>
          <p>
            Quand toutes les entreprises utilisent les mêmes LLM pour générer les textes de leur site, leurs articles de blog, leurs contenus social media et leurs decks
            commerciaux, le résultat converge vers la médiane. Vers la moyenne. Vers exactement ce qu’un modèle de langage <em>pense</em> qu’un texte B2B doit être, d’après
            tous les textes B2B sur lesquels il a été entraîné, qui, on l’a vu, se ressemblent déjà tous. C’est une boucle de rétroaction de la médiocrité, des textes
            générés par IA, entraînés sur des textes indifférenciés, qui produisent encore plus de textes indifférenciés. Une photocopieuse braquée sur un&nbsp;miroir.
          </p>
          <p>
            Je dois être transparent. Je travaille dans une agence qui s’est littéralement réinventée pour devenir nativement IA. Nous utilisons l’IA tous les jours. Je ne
            suis pas le type qui prêche « l’IA va prendre votre job » perché sur son estrade. Je suis celui qui a vu ce qui se passe quand des entreprises utilisent l’IA
            pour <em>remplacer</em> la réflexion de marque au lieu de s’en servir pour l’<em>accélérer</em>. Les entreprises qui ont trouvé quelque chose de tranchant et de
            réellement différenciant à dire, et qui ont <em>ensuite</em> braqué l’IA dessus ? Elles gagnent. Celles qui ont sauté l’étape difficile pour passer directement à
            « génère 40 articles de blog par mois » ? Elles produisent juste du bruit à plus fort volume. Bravo, votre machine à contenus tourne à merveille, c’est
            simplement que tout le monde se fiche de ce qu’elle&nbsp;raconte.
          </p>

          <h2 className="ar-sub">Le test</h2>
          <p>
            Si vous avez lu jusqu’ici, vous faites l’une de ces deux choses, soit vous hochez la tête, soit vous préparez mentalement la défense de votre propre marque. Si
            c’est la seconde, et je le dis avec affection, essayez ceci avant de fermer&nbsp;l’onglet.
          </p>
          <p>
            Allez sur votre page d’accueil. Tout de suite. Lisez le titre du hero et les trois ou quatre phrases en dessous. Puis posez-vous une seule&nbsp;question.
          </p>
          <div className="ar-box">
            <div className="inner">
              <p className="lbl">La question</p>
              <p className="q">Un concurrent pourrait-il coller exactement ce texte sur son site, et que ce soit tout aussi vrai ?</p>
            </div>
          </div>
          <p>
            Si la réponse est oui, et pour la plupart des entreprises Work Tech, c’est clairement oui, alors vous n’avez pas de marque. Vous avez une description de
            catégorie avec votre logo dessus. Ce n’est pas grave. Ce n’est pas une condamnation. Mais appelons les choses par leur nom, pour pouvoir enfin y faire quelque&nbsp;chose.
          </p>
          <p>
            Parce que voici ce que je vois trop souvent, des entreprises qui traitent un problème de positionnement comme un problème de demand gen. Le pipeline s’essouffle ?
            Il faut plus de contenu, forcément. Plus de campagnes. Plus de budget. Alors que le vrai problème, c’est que personne n’arrive à vous distinguer des quatre autres
            fournisseurs de la shortlist. Vous ne manquez pas de marketing. Vous manquez de différenciation. Aucun budget ne réglera&nbsp;ça.
          </p>

          <h2 className="ar-sub">Alors, on fait&nbsp;quoi ?</h2>
          <p>Je vais faire simple, parce que je pense que la solution est plus simple qu’on ne le croit. Pas facile. Je n’ai pas dit facile.&nbsp;Simple.</p>
          <ol className="ar-list">
            <li>
              <span className="num">(I)</span>
              <p>
                <strong>Dites ce que vous seul pouvez dire. </strong>Pas quelque chose de vrai à votre sujet. Quelque chose de vrai <em>uniquement</em> à votre sujet. Si
                votre concurrent peut revendiquer la même chose sans rire, ce n’est pas de la différenciation, c’est le ticket d’entrée de la catégorie. Trouvez ce qui, dans
                votre produit, votre approche, votre vision du monde ou les résultats de vos clients, vous appartient vraiment, et construisez tout votre récit autour. Une
                idée tranchante bat cinq messages prudents à chaque fois. À. Chaque.&nbsp;Fois.
              </p>
            </li>
            <li>
              <span className="num">(II)</span>
              <p>
                <strong>Tuez le processus de consensus. </strong>Je ne dis pas d’ignorer l’avis des parties prenantes. Je dis d’arrêter de faire de la stratégie de marque
                une démocratie. Le meilleur positionnement sur lequel j’aie jamais travaillé avait un seul décideur, avec une vision claire et le cran de trancher. Le pire
                avait douze personnes avec une voix égale et un Google Doc partagé qui semblait écrit par un robot poli en pleine crise&nbsp;d’identité.
              </p>
            </li>
            <li>
              <span className="num">(III)</span>
              <p>
                <strong>Laissez votre marque avoir une vraie opinion. </strong>Le chemin le plus court vers la différenciation, c’est de croire quelque chose sur votre
                marché et de le dire tout haut. Pas enterré dans un livre blanc de thought leadership qui prend neuf mois à produire et récolte 200 téléchargements. Sur votre
                page d’accueil. Dans votre pitch deck. Dans les 30 premières secondes d’un appel commercial. Les entreprises Work Tech sont assises sur des points de vue
                solides, précis, parfois franchement provocateurs sur l’avenir du travail, et elles cachent tout ça derrière de la langue de bois corporate, par peur de
                s’aliéner un acheteur qui, je vous le promets, n’aurait jamais acheté chez elles de toute&nbsp;façon.
              </p>
            </li>
          </ol>
          <p>
            Écoutez. La différenciation fait peur. Je comprends. Elle oblige à faire un choix, donc à fermer une porte, donc quelqu’un dans l’équipe de direction va lever la
            main et demander « mais l’acheteur grand compte qui a besoin de nous entendre dire synergie ? ». Et vous allez devoir sourire et l’accepter. Parce que
            l’alternative, ressembler exactement à tout le monde, n’a rien de prudent. C’est être&nbsp;invisible.
          </p>
          <p className="ar-close">Et être invisible, c’est ce qui coûte le plus cher à une&nbsp;marque.</p>

          <hr className="ar-rule" />
          <div className="ar-sign">
            <div className="signed">
              <span className="seal" aria-hidden />
              <div>
                <p className="name">Evan Addison&nbsp;Payne</p>
                <p className="filed">Classé dans{"   "}Positionnement{"   "}·{"   "}Marque{"   "}·{"   "}IA</p>
              </div>
            </div>
            <Share locale="fr" />
          </div>
        </div>
      </article>

      <Footer locale="fr" />
    </>
  );
}
