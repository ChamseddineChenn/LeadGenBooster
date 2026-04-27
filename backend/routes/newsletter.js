const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const Newsletter = require('../models/Newsletter');
const { sendMail } = require('../utils/mailer');
const { protect } = require('../middleware/auth');

const FRONTEND_CLIENT_URL =
  process.env.FRONTEND_CLIENT_URL || 'http://localhost:5173';

// Multer: store attachments in memory (max 10 MB per file, max 5 files)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
}).array('attachments', 5);

// ============ PUBLIC ROUTES ============

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "L'adresse email est requise" });
    }

    // Check if already exists
    let subscriber = await Newsletter.findOne({
      email: email.trim().toLowerCase(),
    });

    if (subscriber) {
      if (subscriber.isConfirmed && !subscriber.unsubscribed) {
        return res
          .status(400)
          .json({ message: 'Cette adresse email est déjà inscrite' });
      }
      // Re-subscribe if previously unsubscribed
      if (subscriber.unsubscribed) {
        subscriber.unsubscribed = false;
      }
      // Re-send confirmation if not confirmed yet
      const token = crypto.randomBytes(32).toString('hex');
      subscriber.confirmationToken = token;
      subscriber.confirmationTokenExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000,
      ); // 24h
      await subscriber.save();

      const confirmUrl = `${FRONTEND_CLIENT_URL}/newsletter/confirmer?token=${token}`;
      sendMail({
        to: subscriber.email,
        subject: 'Confirmez votre inscription à la newsletter – LeadGenBooster',
        html: buildConfirmationEmail(confirmUrl),
      }).catch((err) => {
        console.error(
          `Failed to send confirmation email to ${subscriber.email}:`,
          err.message,
        );
      });

      return res.json({
        message: 'Un email de confirmation a été envoyé à votre adresse',
      });
    }

    // New subscriber
    const token = crypto.randomBytes(32).toString('hex');
    subscriber = await Newsletter.create({
      email: email.trim().toLowerCase(),
      confirmationToken: token,
      confirmationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      unsubscribeToken: crypto.randomBytes(32).toString('hex'),
    });

    const confirmUrl = `${FRONTEND_CLIENT_URL}/newsletter/confirmer?token=${token}`;
    sendMail({
      to: subscriber.email,
      subject: 'Confirmez votre inscription à la newsletter – LeadGenBooster',
      html: buildConfirmationEmail(confirmUrl),
    }).catch((err) => {
      console.error(
        `Failed to send confirmation email to ${subscriber.email}:`,
        err.message,
      );
    });

    res.status(201).json({
      message: 'Un email de confirmation a été envoyé à votre adresse',
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Cette adresse email est déjà inscrite' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Confirm email (public)
router.get('/confirm/:token', async (req, res) => {
  try {
    const subscriber = await Newsletter.findOne({
      confirmationToken: req.params.token,
      confirmationTokenExpires: { $gt: new Date() },
    });

    if (!subscriber) {
      return res.status(400).json({ message: 'Lien invalide ou expiré' });
    }

    subscriber.isConfirmed = true;
    subscriber.confirmationToken = null;
    subscriber.confirmationTokenExpires = null;
    await subscriber.save();

    res.json({ message: 'Votre inscription a été confirmée avec succès !' });
  } catch (error) {
    console.error('Newsletter confirm error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Unsubscribe (public)
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const subscriber = await Newsletter.findOne({
      unsubscribeToken: req.params.token,
    });
    if (!subscriber) {
      return res.status(404).json({ message: 'Abonné non trouvé' });
    }

    subscriber.unsubscribed = true;
    await subscriber.save();

    res.json({ message: 'Vous avez été désabonné avec succès' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ============ ADMIN ROUTES ============

// Get all subscribers (admin)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ createdAt: -1 })
      .select('-confirmationToken -confirmationTokenExpires');

    const total = subscribers.length;
    const confirmed = subscribers.filter(
      (s) => s.isConfirmed && !s.unsubscribed,
    ).length;
    const pending = subscribers.filter(
      (s) => !s.isConfirmed && !s.unsubscribed,
    ).length;
    const unsubscribed = subscribers.filter((s) => s.unsubscribed).length;

    res.json({
      subscribers,
      stats: { total, confirmed, pending, unsubscribed },
    });
  } catch (error) {
    console.error('Admin get subscribers error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Export CSV (admin)
router.get('/admin/export-csv', protect, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({
      isConfirmed: true,
      unsubscribed: false,
    })
      .sort({ createdAt: -1 })
      .select('email isConfirmed createdAt');

    const header = "Email,Date d'inscription\n";
    const rows = subscribers
      .map(
        (s) =>
          `${s.email},${new Date(s.createdAt).toLocaleDateString('fr-CA')}`,
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=newsletter-subscribers.csv',
    );
    res.send('\uFEFF' + header + rows); // BOM for Excel UTF-8
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Delete subscriber (admin)
router.delete('/admin/:id', protect, async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Abonné non trouvé' });
    }
    res.json({ message: 'Abonné supprimé' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Send campaign email to all confirmed subscribers (admin)
router.post(
  '/admin/campaign',
  protect,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Erreur fichier : ' + err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { subject, content } = req.body || {};

      if (!subject || !content) {
        return res
          .status(400)
          .json({ message: 'Le sujet et le contenu sont requis' });
      }

      const subscribers = await Newsletter.find({
        isConfirmed: true,
        unsubscribed: false,
      });

      if (subscribers.length === 0) {
        return res.status(400).json({ message: 'Aucun abonné confirmé' });
      }

      // Build nodemailer attachments from uploaded files
      const attachments = (req.files || []).map((file) => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      }));

      // Convert Quill HTML to email-safe HTML (inline styles)
      const emailSafeContent = quillToEmailHtml(content);

      let sent = 0;
      let failed = 0;

      for (const sub of subscribers) {
        try {
          const unsubscribeUrl = `${FRONTEND_CLIENT_URL}/newsletter/desabonner?token=${sub.unsubscribeToken}`;
          await sendMail({
            to: sub.email,
            subject,
            html: buildCampaignEmail(emailSafeContent, unsubscribeUrl),
            attachments,
          });
          sent++;
        } catch (mailErr) {
          console.error(`Failed to send to ${sub.email}:`, mailErr.message);
          failed++;
        }
      }

      res.json({
        message: `Campagne envoyée : ${sent} email(s) envoyé(s), ${failed} échec(s)`,
        sent,
        failed,
        total: subscribers.length,
      });
    } catch (error) {
      console.error('Campaign send error:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },
);

// ============ EMAIL TEMPLATES ============

/**
 * Convert Quill-generated HTML to email-client-safe HTML.
 * Quill uses CSS classes (ql-align-center, ql-indent-*) and <img> tags that
 * are stripped by most email clients. This function converts them to
 * inline styles so alignment and images survive.
 */
function quillToEmailHtml(html) {
  if (!html) return html;

  let result = html;

  // Convert Quill class-based alignment → inline text-align styles.
  // This is a safety net for any content that was created before the
  // AlignStyle attributor was registered on the frontend.
  //
  // Two-pass per alignment value:
  //   Pass A: tag already has style="..." → append to it (no double style attr)
  //   Pass B: tag has no style → add style="text-align:..."
  const alignMap = {
    'ql-align-center': 'center',
    'ql-align-right': 'right',
    'ql-align-justify': 'justify',
  };

  for (const [cls, align] of Object.entries(alignMap)) {
    const clsRe = cls.replace('-', '\\-'); // escape for regex
    // Pass A: merge into existing style attribute
    result = result.replace(
      new RegExp(`(<[a-z][^>]*\\bstyle=")([^"]*)"([^>]*\\b${clsRe}\\b[^>]*>)`, 'gi'),
      (_, tagOpen, existingStyle, rest) =>
        `${tagOpen}${existingStyle};text-align:${align};"${rest}`,
    );
    // Pass B: add new style attribute (only if no style attr already present)
    result = result.replace(
      new RegExp(`(<[a-z][^>]*\\b${clsRe}\\b[^>]*?)(/?>)`, 'gi'),
      (match, tagBody, close) => {
        if (/\bstyle=/i.test(tagBody)) return match; // already handled in Pass A
        return `${tagBody} style="text-align:${align};"${close}`;
      },
    );
  }

  // Make <img> responsive and block-level so it doesn't overflow email templates.
  // Only add style when not already present to avoid duplicating.
  result = result.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    if (/\bstyle=/i.test(attrs)) return match;
    return `<img${attrs} style="max-width:100%;height:auto;display:block;">`;
  });

  return result;
}

function buildConfirmationEmail(confirmUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="background:#D71C1C;padding:30px 40px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;font-size:24px;">LeadGenBooster</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#111;margin:0 0 16px;">Confirmez votre inscription</h2>
                  <p style="color:#555;line-height:1.6;margin:0 0 24px;">
                    Merci de vous être inscrit à notre newsletter ! Pour confirmer votre inscription et recevoir nos dernières actualités, cliquez sur le bouton ci-dessous.
                  </p>
                  <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                    <tr>
                      <td style="background:#D71C1C;border-radius:8px;">
                        <a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;">
                          Confirmer mon inscription
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="color:#999;font-size:13px;margin:24px 0 0;line-height:1.5;">
                    Ce lien est valide pendant 24 heures. Si vous n'avez pas demandé cette inscription, ignorez simplement cet email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background:#f9fafb;padding:20px 40px;text-align:center;">
                  <p style="color:#aaa;font-size:12px;margin:0;">© ${new Date().getFullYear()} LeadGenBooster. Tous droits réservés.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildCampaignEmail(content, unsubscribeUrl) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="background:#D71C1C;padding:30px 40px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;font-size:24px;">LeadGenBooster</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <div style="color:#333;line-height:1.7;font-size:15px;">
                    ${content}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background:#f9fafb;padding:20px 40px;text-align:center;">
                  <p style="color:#aaa;font-size:12px;margin:0 0 8px;">© ${new Date().getFullYear()} LeadGenBooster. Tous droits réservés.</p>
                  <a href="${unsubscribeUrl}" style="color:#999;font-size:11px;text-decoration:underline;">Se désabonner</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

module.exports = router;
