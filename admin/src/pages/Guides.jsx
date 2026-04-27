import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  CalendarCheck,
  FileSpreadsheet,
  Mail,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Settings,
} from 'lucide-react';

// ─── Guide data ────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    color: 'text-gray-700',
    topics: [
      {
        id: 'dashboard-overview',
        title: 'Comprendre le tableau de bord',
        content: [
          {
            type: 'intro',
            text: "Le Dashboard est la première page que vous voyez après la connexion. Il vous donne une vision instantanée de l'activité de la plateforme.",
          },
          {
            type: 'heading',
            text: 'Les 4 statistiques en haut',
          },
          {
            type: 'list',
            items: [
              '<strong>Total rendez-vous</strong> — nombre total de rendez-vous reçus depuis le début.',
              '<strong>Rendez-vous planifiés</strong> — rendez-vous dont le statut est "planifié" ou "confirmé" (donc à venir et actifs).',
              '<strong>Demandes de devis</strong> — nombre total de demandes de devis reçues.',
              '<strong>Articles ce mois</strong> — articles de blog publiés ou créés durant le mois calendaire en cours.',
            ],
          },
          {
            type: 'heading',
            text: 'Prochains rendez-vous',
          },
          {
            type: 'text',
            text: "Ce tableau affiche les rendez-vous non annulés des 7 prochains jours, triés du plus proche au plus lointain (maximum 5). S'il n'y en a pas, un message vide s'affiche.",
          },
          {
            type: 'heading',
            text: 'Derniers devis',
          },
          {
            type: 'text',
            text: 'Ce tableau affiche les 5 demandes de devis les plus récentes avec leur statut coloré (nouveau, en cours, terminé, rejeté). Cliquez sur "Tous les devis" pour accéder à la liste complète.',
          },
        ],
      },
    ],
  },
  {
    id: 'blogs',
    icon: FileText,
    label: 'Blogs',
    color: 'text-blue-600',
    topics: [
      {
        id: 'blogs-list',
        title: 'Gérer la liste des articles',
        content: [
          {
            type: 'intro',
            text: 'La page Blogs liste tous les articles créés. Vous pouvez les filtrer, rechercher, prévisualiser, modifier ou supprimer.',
          },
          {
            type: 'heading',
            text: 'Filtres disponibles',
          },
          {
            type: 'list',
            items: [
              '<strong>Tous</strong> — affiche tous les articles.',
              '<strong>Publiés</strong> — articles visibles sur le site public.',
              '<strong>Brouillons</strong> — articles sauvegardés mais non visibles publiquement.',
            ],
          },
          {
            type: 'heading',
            text: 'Actions sur chaque article',
          },
          {
            type: 'list',
            items: [
              "<strong>Œil (aperçu)</strong> — ouvre une prévisualisation de l'article tel qu'il apparaîtra sur le site.",
              "<strong>Crayon (modifier)</strong> — ouvre le formulaire d'édition avec toutes les données existantes pré-remplies.",
              "<strong>Corbeille (supprimer)</strong> — demande une confirmation puis supprime définitivement l'article et son image de couverture sur Cloudinary.",
            ],
          },
          {
            type: 'note',
            text: "La suppression est irréversible. L'image de couverture hébergée sur Cloudinary est également supprimée.",
          },
        ],
      },
      {
        id: 'blogs-create',
        title: 'Créer un article de blog',
        content: [
          {
            type: 'intro',
            text: 'Cliquez sur le bouton "Nouvel article" en haut à droite de la page Blogs pour ouvrir le formulaire de création.',
          },
          {
            type: 'heading',
            text: 'Étape 1 — Informations de base',
          },
          {
            type: 'steps',
            items: [
              "<strong>Titre principal</strong> — titre de l'article, affiché en grand sur la page de l'article et dans les cartes de liste. Champ obligatoire.",
              '<strong>Extrait</strong> — résumé court (1-2 phrases) affiché dans les cartes de prévisualisation sur le site. Champ obligatoire.',
            ],
          },
          {
            type: 'heading',
            text: 'Étape 2 — Image de couverture',
          },
          {
            type: 'steps',
            items: [
              'Cliquez sur la zone "Choisir une image de couverture".',
              'Sélectionnez une image depuis votre ordinateur (JPG, PNG, WebP recommandés).',
              "Dimensions optimales : <strong>800 × 400 px</strong> (ratio 2:1). C'est la taille exacte des cartes du blog sur le site.",
              "Une miniature de prévisualisation apparaît. Cliquez sur le <strong>×</strong> pour changer l'image.",
            ],
          },
          {
            type: 'warning',
            text: "L'image de couverture est obligatoire. Vous ne pouvez pas sauvegarder sans elle.",
          },
          {
            type: 'heading',
            text: 'Étape 3 — Catégorie et auteur',
          },
          {
            type: 'steps',
            items: [
              '<strong>Catégorie</strong> — choisissez parmi : Conseils, Tendances, Études de cas, Guide, Technologie, Législation.',
              '<strong>Auteur</strong> — nom de la personne ou entité qui signe l\'article (ex. : "Équipe LeadGen Booster").',
            ],
          },
          {
            type: 'heading',
            text: 'Étape 4 — Construire le contenu',
          },
          {
            type: 'text',
            text: 'Le contenu est composé de blocs que vous ajoutez un par un. Cliquez sur le bouton "+ Ajouter un bloc" pour choisir le type :',
          },
          {
            type: 'list',
            items: [
              "<strong>Titre (H2)</strong> — sous-titre de section dans l'article. Vous pouvez personnaliser sa couleur.",
              '<strong>Paragraphe</strong> — texte riche avec éditeur Quill (gras, italique, listes, liens, etc.).',
              "<strong>Image</strong> — image insérée dans le corps de l'article, hébergée sur Cloudinary.",
            ],
          },
          {
            type: 'text',
            text: "Chaque bloc peut être réordonné (flèches ↑↓) et supprimé (×). Il n'y a pas de limite de blocs.",
          },
          {
            type: 'heading',
            text: 'Étape 5 — Publier ou sauvegarder',
          },
          {
            type: 'steps',
            items: [
              'Le toggle <strong>"Publié"</strong> en haut à droite détermine si l\'article est visible sur le site. Désactivé = brouillon.',
              'Cliquez sur <strong>"Sauvegarder"</strong>. L\'image de couverture et les images de blocs sont uploadées sur Cloudinary avant l\'enregistrement.',
              'Après sauvegarde, vous pouvez cliquer sur <strong>"Aperçu"</strong> pour voir le rendu final.',
            ],
          },
        ],
      },
      {
        id: 'blogs-edit',
        title: 'Modifier un article existant',
        content: [
          {
            type: 'intro',
            text: "Depuis la liste des articles, cliquez sur l'icône crayon d'un article pour l'ouvrir en mode édition.",
          },
          {
            type: 'list',
            items: [
              'Tous les champs sont pré-remplis avec les données existantes.',
              "L'image de couverture actuelle est affichée en miniature. Si vous en téléversez une nouvelle, l'ancienne sera supprimée de Cloudinary automatiquement.",
              "Les blocs de contenu existants sont chargés dans l'ordre. Vous pouvez les modifier, en ajouter ou en supprimer.",
              'Seuls les blocs images <em>modifiés</em> (nouvelle image choisie) seront re-uploadés — les autres images existantes sont conservées.',
              'Cliquez sur <strong>"Sauvegarder"</strong> pour enregistrer les modifications.',
            ],
          },
          {
            type: 'note',
            text: 'Modifier le toggle "Publié" et sauvegarder dépublie ou publie immédiatement l\'article sur le site.',
          },
        ],
      },
    ],
  },
  {
    id: 'careers',
    icon: Briefcase,
    label: 'Carrières',
    color: 'text-purple-600',
    topics: [
      {
        id: 'careers-list',
        title: "Gérer les offres d'emploi",
        content: [
          {
            type: 'intro',
            text: "La page Carrières liste toutes les offres d'emploi créées. Vous pouvez les filtrer par statut, les prévisualiser, modifier ou supprimer.",
          },
          {
            type: 'list',
            items: [
              '<strong>Publiées</strong> — offres visibles sur la page Carrières du site public.',
              '<strong>Brouillons</strong> — offres sauvegardées mais non visibles.',
              "<strong>Aperçu (œil)</strong> — prévisualise la fiche de poste telle qu'elle apparaîtra sur le site.",
              "<strong>Modifier (crayon)</strong> — ouvre le formulaire d'édition pré-rempli.",
              '<strong>Supprimer (corbeille)</strong> — confirmation puis suppression définitive.',
            ],
          },
        ],
      },
      {
        id: 'careers-create',
        title: "Créer une offre d'emploi",
        content: [
          {
            type: 'intro',
            text: 'Cliquez sur "Nouvelle offre" pour ouvrir le formulaire de création.',
          },
          {
            type: 'heading',
            text: 'Champs obligatoires',
          },
          {
            type: 'steps',
            items: [
              '<strong>Titre du poste</strong> — ex. : "Développeur Full-Stack React/Node.js".',
              '<strong>Catégorie</strong> — sélectionnez une catégorie existante dans le menu déroulant, ou activez "Autre catégorie" pour en saisir une nouvelle qui sera enregistrée pour les prochaines offres.',
              '<strong>Localisation</strong> — par défaut "Montréal, QC". Modifiez selon le lieu réel.',
              '<strong>Type de contrat</strong> — Temps plein, Temps partiel, Contrat, ou Stage.',
              '<strong>Description</strong> — présentation générale du poste (texte libre).',
            ],
          },
          {
            type: 'heading',
            text: 'Listes de points',
          },
          {
            type: 'text',
            text: 'Trois sections avec des champs dynamiques. Chaque ligne est un point. Cliquez sur "+ Ajouter" pour ajouter une ligne, sur la croix pour la supprimer.',
          },
          {
            type: 'list',
            items: [
              '<strong>Responsabilités</strong> — ce que le candidat devra faire au quotidien.',
              '<strong>Exigences</strong> — compétences et qualifications requises.',
              "<strong>Avantages</strong> — ce que l'entreprise offre (télétravail, assurances, etc.).",
            ],
          },
          {
            type: 'heading',
            text: 'Options facultatives',
          },
          {
            type: 'list',
            items: [
              '<strong>Salaire</strong> — fourchette min/max (ex. : 60 000 $ – 80 000 $). Le toggle "Afficher le salaire" contrôle sa visibilité publique.',
              "<strong>Date de clôture</strong> — date limite de candidature. Passé cette date, l'offre peut rester en ligne mais sera clairement expirée.",
              "<strong>Publié</strong> — toggle pour rendre l'offre visible sur le site immédiatement.",
            ],
          },
          {
            type: 'steps',
            items: [
              'Une fois tous les champs remplis, cliquez sur <strong>"Sauvegarder"</strong>.',
              'Un message de confirmation s\'affiche. Vous pouvez ensuite cliquer sur <strong>"Aperçu"</strong> pour vérifier le rendu.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'applications',
    icon: Users,
    label: 'Candidatures',
    color: 'text-orange-500',
    topics: [
      {
        id: 'applications-list',
        title: 'Consulter les candidatures',
        content: [
          {
            type: 'intro',
            text: "La page Candidatures regroupe toutes les candidatures reçues via le site. Chaque candidature est liée à une offre d'emploi.",
          },
          {
            type: 'heading',
            text: 'Filtres et recherche',
          },
          {
            type: 'list',
            items: [
              'Filtrez par statut : <strong>Tous, Nouveau, Vu, Entretien, Accepté, Rejeté</strong>.',
              'La barre de recherche filtre par nom, prénom, email ou titre du poste.',
            ],
          },
          {
            type: 'heading',
            text: 'Informations affichées',
          },
          {
            type: 'list',
            items: [
              'Nom complet du candidat, email et téléphone.',
              "Poste visé (titre de l'offre liée).",
              'Date de candidature.',
              'Statut actuel (badge coloré).',
            ],
          },
          {
            type: 'text',
            text: 'Cliquez sur l\'icône "œil" pour ouvrir la fiche détaillée de la candidature.',
          },
        ],
      },
      {
        id: 'applications-detail',
        title: 'Traiter une candidature',
        content: [
          {
            type: 'intro',
            text: "La page détail d'une candidature affiche toutes les informations du candidat et vous permet de gérer son suivi.",
          },
          {
            type: 'heading',
            text: 'Cycle de statuts',
          },
          {
            type: 'list',
            items: [
              '<strong>Nouveau</strong> (bleu) — candidature reçue, pas encore consultée.',
              '<strong>Vu</strong> (gris) — candidature ouverte et lue.',
              '<strong>Entretien</strong> (violet) — candidat sélectionné pour un entretien.',
              '<strong>Accepté</strong> (vert) — candidat retenu.',
              '<strong>Rejeté</strong> (rouge) — candidat non retenu.',
            ],
          },
          {
            type: 'steps',
            items: [
              "Pour changer le statut, cliquez sur l'un des boutons de statut en haut de la fiche. Le changement est enregistré immédiatement.",
              'Pour télécharger le CV, cliquez sur le bouton <strong>"Télécharger le CV"</strong> (si le candidat en a fourni un).',
              'Pour ajouter une note interne, rédigez-la dans le champ <strong>"Commentaire admin"</strong> et cliquez sur <strong>"Sauvegarder"</strong>. Ce commentaire n\'est visible que par vous.',
              'Pour supprimer la candidature, cliquez sur le bouton rouge "Supprimer" et confirmez.',
            ],
          },
          {
            type: 'note',
            text: 'Les candidats ne reçoivent pas de notification lors du changement de statut — la communication reste manuelle (email direct).',
          },
        ],
      },
    ],
  },
  {
    id: 'meetings',
    icon: CalendarCheck,
    label: 'Rendez-vous',
    color: 'text-teal-600',
    topics: [
      {
        id: 'meetings-list',
        title: 'Consulter les rendez-vous',
        content: [
          {
            type: 'intro',
            text: 'La page Rendez-vous affiche tous les rendez-vous demandés par les visiteurs du site.',
          },
          {
            type: 'heading',
            text: 'Statistiques en haut',
          },
          {
            type: 'list',
            items: [
              '<strong>Total</strong> — nombre total de rendez-vous toutes périodes confondues.',
              '<strong>En attente</strong> — rendez-vous avec statut "planifié" (non encore confirmés).',
              '<strong>Confirmés</strong> — rendez-vous confirmés par vous.',
              '<strong>Annulés</strong> — rendez-vous annulés.',
            ],
          },
          {
            type: 'heading',
            text: 'Filtres',
          },
          {
            type: 'list',
            items: [
              'Filtrez par statut : <strong>Tous, Planifié, Confirmé, Annulé</strong>.',
              'La barre de recherche filtre par nom, entreprise ou email.',
            ],
          },
        ],
      },
      {
        id: 'meetings-status',
        title: 'Gérer un rendez-vous',
        content: [
          {
            type: 'intro',
            text: "Depuis la liste, chaque rendez-vous affiche les informations du client et des boutons d'action rapide.",
          },
          {
            type: 'heading',
            text: 'Cycle de statuts',
          },
          {
            type: 'list',
            items: [
              '<strong>Planifié</strong> (jaune) — état initial, le client a demandé un créneau.',
              '<strong>Confirmé</strong> (vert) — vous avez confirmé la réunion.',
              '<strong>Annulé</strong> (rouge) — la réunion est annulée.',
            ],
          },
          {
            type: 'steps',
            items: [
              'Pour confirmer : cliquez sur le bouton <strong>"Confirmer"</strong> (icône ✓ verte) sur la ligne du rendez-vous.',
              'Pour annuler : cliquez sur le bouton <strong>"Annuler"</strong> (icône ✗ rouge).',
              'Pour supprimer définitivement : cliquez sur la corbeille et confirmez la suppression.',
            ],
          },
          {
            type: 'text',
            text: 'Chaque rendez-vous affiche : nom complet, entreprise, email, téléphone, date, créneau horaire et statut.',
          },
        ],
      },
      {
        id: 'meetings-availability',
        title: 'Configurer les disponibilités',
        content: [
          {
            type: 'intro',
            text: 'Cliquez sur le bouton <strong>"Paramètres"</strong> (icône engrenage) en haut de la page Rendez-vous pour ouvrir le panneau de configuration.',
          },
          {
            type: 'heading',
            text: 'Jours actifs',
          },
          {
            type: 'text',
            text: 'Cochez les jours de la semaine où vous acceptez des rendez-vous (Lun, Mar, Mer, Jeu, Ven, Sam, Dim). Les jours décochés ne seront pas disponibles pour les visiteurs.',
          },
          {
            type: 'heading',
            text: 'Plage horaire',
          },
          {
            type: 'list',
            items: [
              '<strong>Heure de début</strong> — ex. : 09:00 — première heure de disponibilité.',
              '<strong>Heure de fin</strong> — ex. : 17:00 — dernière heure de disponibilité.',
              '<strong>Pause déjeuner de / à</strong> — ex. : 12:00 – 13:00 — créneau retiré automatiquement du calendrier.',
            ],
          },
          {
            type: 'heading',
            text: 'Créneaux',
          },
          {
            type: 'list',
            items: [
              "<strong>Durée d'un créneau</strong> — en minutes (ex. : 30 ou 60). Détermine la granularité des créneaux proposés.",
              "<strong>Réservation max à l'avance</strong> — nombre de jours maximum que les visiteurs peuvent réserver à l'avance.",
            ],
          },
          {
            type: 'heading',
            text: 'Dates bloquées',
          },
          {
            type: 'text',
            text: "Ajoutez des dates spécifiques où vous n'êtes pas disponible (congés, jours fériés, etc.). Ces dates seront grisées dans le calendrier des visiteurs.",
          },
          {
            type: 'steps',
            items: [
              'Après avoir ajusté tous les paramètres, cliquez sur <strong>"Sauvegarder"</strong>.',
              'Les changements prennent effet immédiatement pour les nouveaux visiteurs.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'quotations',
    icon: FileSpreadsheet,
    label: 'Devis',
    color: 'text-indigo-600',
    topics: [
      {
        id: 'quotations-list',
        title: 'Consulter les demandes de devis',
        content: [
          {
            type: 'intro',
            text: 'La page Devis liste toutes les demandes reçues via le formulaire de devis du site.',
          },
          {
            type: 'heading',
            text: 'Statistiques',
          },
          {
            type: 'list',
            items: [
              '<strong>Nouveau</strong> (bleu) — reçu, non encore ouvert.',
              "<strong>Vu</strong> (gris) — ouvert par l'admin.",
              '<strong>En cours</strong> (violet) — traitement en cours.',
              '<strong>Terminé</strong> (vert) — devis finalisé ou projet conclu.',
              '<strong>Rejeté</strong> (rouge) — demande refusée.',
            ],
          },
          {
            type: 'heading',
            text: 'Filtres et recherche',
          },
          {
            type: 'list',
            items: [
              'Filtrez par statut avec les onglets en haut de la liste.',
              'La barre de recherche filtre par nom, email ou service demandé.',
            ],
          },
          {
            type: 'text',
            text: 'Cliquez sur l\'icône "œil" pour ouvrir le détail d\'une demande.',
          },
        ],
      },
      {
        id: 'quotations-detail',
        title: 'Traiter une demande de devis',
        content: [
          {
            type: 'intro',
            text: 'La fiche détail affiche toutes les informations soumises par le client : coordonnées, service souhaité, budget, délai, description du projet.',
          },
          {
            type: 'heading',
            text: 'Changer le statut',
          },
          {
            type: 'steps',
            items: [
              'Les boutons de statut sont affichés en haut de la fiche.',
              'Cliquez sur le statut souhaité. Le changement est immédiat et visible dans la liste.',
              'Progression typique : <strong>Nouveau → Vu → En cours → Terminé</strong> (ou Rejeté).',
            ],
          },
          {
            type: 'heading',
            text: 'Commentaire admin',
          },
          {
            type: 'steps',
            items: [
              'Rédigez vos notes internes dans le champ "Commentaire admin" (ex. : montant proposé, détails de l\'échange).',
              'Cliquez sur <strong>"Sauvegarder"</strong> pour enregistrer.',
              "Ce commentaire est uniquement visible par vous dans l'admin.",
            ],
          },
          {
            type: 'heading',
            text: 'Supprimer une demande',
          },
          {
            type: 'steps',
            items: [
              'Cliquez sur le bouton rouge <strong>"Supprimer"</strong>.',
              'Une confirmation vous est demandée.',
              'La suppression est définitive.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'newsletter',
    icon: Mail,
    label: 'Newsletter',
    color: 'text-pink-600',
    topics: [
      {
        id: 'newsletter-subscribers',
        title: 'Gérer les abonnés',
        content: [
          {
            type: 'intro',
            text: 'La page Newsletter affiche tous les abonnés avec leur statut de confirmation.',
          },
          {
            type: 'heading',
            text: 'Statuts des abonnés',
          },
          {
            type: 'list',
            items: [
              "<strong>Confirmé</strong> (vert) — l'abonné a cliqué sur le lien de confirmation dans l'email reçu. Il recevra les campagnes.",
              '<strong>En attente</strong> (jaune) — inscription soumise mais email non encore confirmé.',
              "<strong>Désabonné</strong> (rouge) — abonné qui s'est désinscrit. Ne reçoit plus rien.",
            ],
          },
          {
            type: 'heading',
            text: 'Filtres et recherche',
          },
          {
            type: 'list',
            items: [
              'Filtrez par statut : Tous, Confirmés, En attente, Désabonnés.',
              'La barre de recherche filtre par email.',
            ],
          },
          {
            type: 'heading',
            text: 'Supprimer un abonné',
          },
          {
            type: 'steps',
            items: [
              "Cliquez sur la corbeille à côté de l'abonné.",
              "Confirmez la suppression dans la fenêtre qui s'ouvre.",
              "L'abonné est retiré définitivement de la base de données.",
            ],
          },
          {
            type: 'heading',
            text: 'Exporter la liste',
          },
          {
            type: 'text',
            text: 'Cliquez sur le bouton <strong>"Exporter"</strong> (icône téléchargement) pour télécharger la liste des abonnés au format CSV. Utile pour des envois via des outils externes.',
          },
        ],
      },
      {
        id: 'newsletter-campaign',
        title: 'Envoyer une campagne email',
        content: [
          {
            type: 'intro',
            text: 'La campagne est envoyée uniquement aux abonnés avec le statut <strong>"Confirmé"</strong>.',
          },
          {
            type: 'steps',
            items: [
              'Cliquez sur le bouton <strong>"Envoyer une campagne"</strong> (icône avion en papier) en haut de la page.',
              "Une fenêtre modale s'ouvre avec deux champs.",
              'Dans <strong>"Sujet"</strong>, saisissez l\'objet de l\'email (ce que les destinataires verront dans leur boîte de réception).',
              'Dans <strong>"Contenu"</strong>, rédigez le corps de l\'email avec l\'éditeur de texte riche (titres, gras, listes, liens, images).',
              'Cliquez sur <strong>"Envoyer"</strong>.',
              "Un résumé s'affiche : nombre d'emails envoyés avec succès et nombre d'échecs éventuels.",
            ],
          },
          {
            type: 'warning',
            text: "L'envoi est immédiat et ne peut pas être annulé. Relisez soigneusement le contenu avant de confirmer.",
          },
          {
            type: 'note',
            text: 'Les abonnés "En attente" et "Désabonnés" ne reçoivent jamais les campagnes, même si vous les voyez dans la liste.',
          },
        ],
      },
    ],
  },
];

// ─── Block renderers ────────────────────────────────────────────────────────────

const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'intro':
      return (
        <p
          className="text-gray-600 text-sm leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case 'heading':
      return (
        <h4 className="font-semibold text-black text-sm mt-5 mb-2">
          {block.text}
        </h4>
      );
    case 'text':
      return (
        <p
          className="text-gray-600 text-sm leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
    case 'list':
      return (
        <ul className="space-y-1.5 mb-4 pl-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D71C1C] flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="space-y-2 mb-4 pl-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-gray-600"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D71C1C] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ol>
      );
    case 'note':
      return (
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p
            className="text-sm text-blue-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        </div>
      );
    case 'warning':
      return (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p
            className="text-sm text-amber-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        </div>
      );
    case 'success':
      return (
        <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <p
            className="text-sm text-green-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.text }}
          />
        </div>
      );
    default:
      return null;
  }
};

// ─── Topic accordion item ────────────────────────────────────────────────────────

const TopicItem = ({ topic, isOpen, onToggle }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
    >
      <span className="font-medium text-black text-sm">{topic.title}</span>
      {isOpen ? (
        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
      )}
    </button>
    {isOpen && (
      <div className="px-5 py-4 bg-white border-t border-gray-100">
        {topic.content.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>
    )}
  </div>
);

// ─── Main component ─────────────────────────────────────────────────────────────

const Guides = () => {
  const [openSection, setOpenSection] = useState('blogs');
  const [openTopics, setOpenTopics] = useState({});
  const sectionRefs = useRef({});

  // Auto-open first topic when section opens
  useEffect(() => {
    const section = SECTIONS.find((s) => s.id === openSection);
    if (section && section.topics.length > 0) {
      const firstTopicId = section.topics[0].id;
      setOpenTopics((prev) => ({
        ...prev,
        [firstTopicId]:
          prev[firstTopicId] !== undefined ? prev[firstTopicId] : true,
      }));
    }
  }, [openSection]);

  const toggleTopic = (topicId) => {
    setOpenTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const handleSectionClick = (sectionId) => {
    setOpenSection(sectionId);
    setTimeout(() => {
      sectionRefs.current[sectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  const activeSection = SECTIONS.find((s) => s.id === openSection);

  return (
    <div className="flex gap-6 min-h-full">
      {/* ── Left nav ── */}
      <aside className="w-56 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D71C1C]" />
              <span className="font-semibold text-black text-sm">Guides</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Sélectionnez un module
            </p>
          </div>
          <nav className="py-2">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = openSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                    isActive
                      ? 'bg-[#D71C1C]/8 text-[#D71C1C] font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D71C1C]' : section.color}`}
                  />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* ── Content area ── */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            {activeSection && (
              <activeSection.icon
                className={`w-6 h-6 ${activeSection.color}`}
              />
            )}
            <h1 className="text-2xl font-bold text-black">
              {activeSection?.label}
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            {activeSection?.topics.length} guide
            {activeSection?.topics.length !== 1 ? 's' : ''} disponible
            {activeSection?.topics.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Topics */}
        <div className="space-y-3">
          {activeSection?.topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              isOpen={!!openTopics[topic.id]}
              onToggle={() => toggleTopic(topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guides;
