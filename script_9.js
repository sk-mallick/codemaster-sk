/* Profile Card & Share Interactive Features */
(function() {
  const shareBtn = document.getElementById('btnShareNative');
  const copyBtn = document.getElementById('btnCopyLink');
  const copyText = document.getElementById('copyText');
  const vcardBtn = document.getElementById('btnSaveVcard');
  const qrBtn = document.getElementById('btnToggleQR');
  const qrPanel = document.getElementById('qrPanel');
  const toast = document.getElementById('shareToast');
  const toastMsg = document.getElementById('toastMsg');
  const navShareBtn = document.getElementById('navShareBtn');

  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._tid);
    toast._tid = setTimeout(function() { toast.classList.remove('show'); }, 3000);
  }

  function getProfileUrl() {
    if (window.location.protocol.startsWith('http')) {
      return window.location.origin + window.location.pathname;
    }
    return 'https://sk-mallick.github.io/codemaster-sk/';
  }

  // Native Web Share API
  async function shareProfile() {
    const profileUrl = getProfileUrl();
    const shareData = {
      title: 'Subham Kumar Mallick | Code Master SK',
      text: 'Subham Kumar Mallick — Founder & Full-Stack Developer at Code Master SK. High-performance websites, learning portals, and AI systems.',
      url: profileUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLink();
        }
      }
    } else {
      copyLink();
    }
  }

  // Copy Link
  function copyLink() {
    const profileUrl = getProfileUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profileUrl).then(function() {
        if (copyText) copyText.textContent = 'Copied! ✓';
        showToast('Profile link copied to clipboard!');
        setTimeout(function() {
          if (copyText) copyText.textContent = 'Copy Link';
        }, 2400);
      }).catch(function() { fallbackCopy(profileUrl); });
    } else {
      fallbackCopy(profileUrl);
    }
  }

  function fallbackCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast('Profile link copied to clipboard!');
    } catch (e) {
      prompt('Copy this link:', text);
    }
    document.body.removeChild(input);
  }

  // Download vCard (.vcf)
  function downloadVCard() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Mallick;Subham;Kumar;;
FN:Subham Kumar Mallick
ORG:Code Master SK
TITLE:Founder & Full-Stack Developer
TEL;TYPE=CELL,VOICE,PREF:+918114963709
EMAIL;TYPE=INTERNET,PREF:subhammallick454@gmail.com
URL:https://sk-mallick.github.io/codemaster-sk/
ADR;TYPE=WORK:;;Sailashree Vihar;Bhubaneswar;Odisha;751021;India
NOTE:Founder of Code Master SK. Full-Stack Developer & AI Automation Builder.
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Subham-Kumar-Mallick-CodeMasterSK.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Contact card (.vcf) downloaded!');
  }

  // Toggle QR Panel
  function toggleQR() {
    if (!qrPanel) return;
    const isHidden = qrPanel.hidden;
    qrPanel.hidden = !isHidden;
    qrPanel.classList.toggle('open', isHidden);
    if (qrBtn) qrBtn.setAttribute('aria-expanded', String(isHidden));
  }

  // Setup Social Direct Links
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  const shareLinkedIn = document.getElementById('shareLinkedIn');
  const shareTwitter = document.getElementById('shareTwitter');

  const currUrl = encodeURIComponent(getProfileUrl());
  const shareText = encodeURIComponent('Check out Subham Kumar Mallick — Founder & Full-Stack Developer at Code Master SK: ');

  if (shareWhatsApp) shareWhatsApp.href = 'https://api.whatsapp.com/send?text=' + shareText + currUrl;
  if (shareLinkedIn) shareLinkedIn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + currUrl;
  if (shareTwitter) shareTwitter.href = 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + currUrl;

  // Attach Event Listeners
  if (shareBtn) shareBtn.addEventListener('click', shareProfile);
  if (copyBtn) copyBtn.addEventListener('click', copyLink);
  if (vcardBtn) vcardBtn.addEventListener('click', downloadVCard);
  if (qrBtn) qrBtn.addEventListener('click', toggleQR);
  if (navShareBtn) {
    navShareBtn.addEventListener('click', function() {
      const card = document.getElementById('card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth' });
        const dc = document.getElementById('digitalProfileCard');
        if (dc) {
          dc.style.outline = '4px solid var(--orange)';
          setTimeout(function() { dc.style.outline = ''; }, 1800);
        }
      } else {
        shareProfile();
      }
    });
  }
})();