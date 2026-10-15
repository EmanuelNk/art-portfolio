import React, { useState } from 'react';
import Header from '../Header/Header';
import {
  ORDERS_EMAIL,
  printsAvailable,
  otherPaintings,
  COMMISSION_SIZES,
  SUBJECTS,
  formatSize,
  scaleToLongSide,
} from '../../data/commissions';
import './PrintsPage.css';

const thumb = (url) => url.replace('/upload/', '/upload/w_360,f_auto,q_auto,c_limit/');

// FormSubmit relays the form to the inbox; the first submission sends an
// activation email to ORDERS_EMAIL that must be confirmed once.
async function sendRequest(subject, fields) {
  const res = await fetch(`https://formsubmit.co/ajax/${ORDERS_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _replyto: fields.Email,
      ...fields,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message || 'Request failed');
  }
}

function PaintingPicker({ paintings, selected, onSelect }) {
  return (
    <div className="pc-paintings">
      {paintings.map((p) => (
        <button
          type="button"
          key={p.url}
          className={`pc-painting${selected?.url === p.url ? ' is-selected' : ''}`}
          onClick={() => onSelect(p)}
          aria-pressed={selected?.url === p.url}
        >
          <img src={thumb(p.url)} alt="" loading="lazy" />
          <span className="pc-painting-title">{p.title}</span>
        </button>
      ))}
    </div>
  );
}

function ContactFields({ contact, setContact, messageLabel, messagePlaceholder }) {
  const update = (key) => (e) => setContact({ ...contact, [key]: e.target.value });
  return (
    <div className="pc-fields">
      <label className="pc-field">
        <span>Name</span>
        <input required value={contact.name} onChange={update('name')} autoComplete="name" />
      </label>
      <label className="pc-field">
        <span>Email</span>
        <input required type="email" value={contact.email} onChange={update('email')} autoComplete="email" />
      </label>
      <label className="pc-field">
        <span>Phone <em>(optional)</em></span>
        <input type="tel" value={contact.phone} onChange={update('phone')} autoComplete="tel" />
      </label>
      <label className="pc-field pc-field--wide">
        <span>{messageLabel} <em>(optional)</em></span>
        <textarea rows={4} value={contact.message} onChange={update('message')} placeholder={messagePlaceholder} />
      </label>
    </div>
  );
}

const emptyContact = { name: '', email: '', phone: '', message: '' };

function Status({ status }) {
  if (status === 'sent') {
    return <p className="pc-status pc-status--ok">Thank you! Your request was sent. I'll get back to you by email soon.</p>;
  }
  if (status === 'error') {
    return (
      <p className="pc-status pc-status--error">
        Something went wrong sending your request. Please try again, or email me at{' '}
        <a href={`mailto:${ORDERS_EMAIL}`}>{ORDERS_EMAIL}</a>.
      </p>
    );
  }
  return null;
}

function PrintForm() {
  const [mode, setMode] = useState('available');
  const [painting, setPainting] = useState(null);
  const [printSize, setPrintSize] = useState('');
  const [longSide, setLongSide] = useState({ length: '', unit: 'cm' });
  const [contact, setContact] = useState(emptyContact);
  const [status, setStatus] = useState('idle');

  const original = painting?.original;
  const scaled = original && longSide.length > 0
    ? scaleToLongSide(original, Number(longSide.length), longSide.unit)
    : '';
  let sizeText = '';
  if (printSize === 'original') {
    sizeText = original ? `True to original, ${formatSize(original)}` : 'True to original';
  } else if (printSize === 'custom' && longSide.length > 0) {
    sizeText = `Long side ${longSide.length} ${longSide.unit}${scaled ? ` (about ${scaled})` : ''}`;
  }
  const ready = painting && sizeText;

  const switchMode = (m) => {
    setMode(m);
    setPainting(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus('sending');
    try {
      await sendRequest(
        `${mode === 'available' ? 'Print order' : 'Print request'}: ${painting.title}`,
        {
          Type: mode === 'available' ? 'Order an available print' : 'Request a print of another painting',
          Painting: `${painting.title} (${painting.collection})`,
          Image: painting.url,
          'Print size': sizeText,
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone || '-',
          Message: contact.message || '-',
        }
      );
      setStatus('sent');
      setPainting(null);
      setPrintSize('');
      setLongSide({ length: '', unit: 'cm' });
      setContact(emptyContact);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="pc-form" onSubmit={submit}>
      <fieldset className="pc-step">
        <legend>1. Choose a painting</legend>
        <div className="pc-choices">
          <button type="button" className={`pc-chip${mode === 'available' ? ' is-selected' : ''}`} onClick={() => switchMode('available')}>
            Prints available
          </button>
          <button type="button" className={`pc-chip${mode === 'request' ? ' is-selected' : ''}`} onClick={() => switchMode('request')}>
            Request a print of another painting
          </button>
        </div>
        {mode === 'available' && (
          <div className="pc-note">
            <strong>Fine-art giclée prints on canvas</strong>
            <p>
              Scanned and printed by a professional fine-art print studio. Each print starts from a
              high-resolution, color-calibrated scan of the original painting, so its colors, tones
              and brushwork stay true to the original. It's then printed with archival pigment inks
              on museum-grade canvas, made to last for generations without fading.
            </p>
          </div>
        )}
        <PaintingPicker
          paintings={mode === 'available' ? printsAvailable : otherPaintings}
          selected={painting}
          onSelect={setPainting}
        />
      </fieldset>

      <fieldset className="pc-step">
        <legend>2. Print size</legend>
        <div className="pc-print-sizes">
          <button
            type="button"
            className={`pc-size${printSize === 'original' ? ' is-selected' : ''}`}
            onClick={() => setPrintSize('original')}
            aria-pressed={printSize === 'original'}
          >
            <span>True to original</span>
            <small>{original ? formatSize(original) : 'same size as the painting'}</small>
          </button>
          <button
            type="button"
            className={`pc-size${printSize === 'custom' ? ' is-selected' : ''}`}
            onClick={() => setPrintSize('custom')}
            aria-pressed={printSize === 'custom'}
          >
            <span>Choose the long side</span>
            <small>type the length you want</small>
          </button>
        </div>
        {printSize === 'custom' && (
          <div className="pc-custom">
            <input
              type="number" min="1" inputMode="decimal" required placeholder="Long side" aria-label="Long side length"
              value={longSide.length} onChange={(e) => setLongSide({ ...longSide, length: e.target.value })}
            />
            <select aria-label="Unit" value={longSide.unit} onChange={(e) => setLongSide({ ...longSide, unit: e.target.value })}>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
            {scaled && <span className="pc-custom-note">Print size about {scaled}</span>}
          </div>
        )}
      </fieldset>

      <fieldset className="pc-step">
        <legend>3. Your details</legend>
        <ContactFields
          contact={contact}
          setContact={setContact}
          messageLabel="Notes"
          messagePlaceholder="Framing, shipping country, anything else…"
        />
      </fieldset>

      <div className="pc-submit-row">
        <p className="pc-summary">
          {ready
            ? <><strong>{painting.title}</strong>, {sizeText.charAt(0).toLowerCase() + sizeText.slice(1)}</>
            : painting ? <>Selected: <strong>{painting.title}</strong>. Choose a print size</> : 'Select a painting above'}
        </p>
        <button className="pc-submit" type="submit" disabled={!ready || status === 'sending'}>
          {status === 'sending' ? 'Sending…' : mode === 'available' ? 'Order print' : 'Request print'}
        </button>
      </div>
      <Status status={status} />
    </form>
  );
}

function CommissionForm() {
  const [size, setSize] = useState('');
  const [custom, setCustom] = useState({ width: '', height: '', unit: 'cm' });
  const [subject, setSubject] = useState('');
  const [faces, setFaces] = useState(1);
  const [contact, setContact] = useState(emptyContact);
  const [status, setStatus] = useState('idle');

  const isCustom = size === 'custom';
  const customReady = custom.width && custom.height;
  const sizeText = isCustom
    ? customReady && `${custom.width}x${custom.height} ${custom.unit} (custom)`
    : size && `${size.cm} (${size.inches})`;
  const ready = sizeText && subject;

  const submit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setStatus('sending');
    try {
      await sendRequest(`Commission request: ${subject}, ${sizeText}`, {
        Type: 'Commission',
        Size: sizeText,
        Subject: subject,
        ...(subject === 'Portrait' && { Faces: String(faces) }),
        Name: contact.name,
        Email: contact.email,
        Phone: contact.phone || '-',
        Details: contact.message || '-',
      });
      setStatus('sent');
      setSize('');
      setCustom({ width: '', height: '', unit: 'cm' });
      setSubject('');
      setFaces(1);
      setContact(emptyContact);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="pc-form" onSubmit={submit}>
      <fieldset className="pc-step">
        <legend>1. Size</legend>
        <div className="pc-sizes">
          {COMMISSION_SIZES.map((s) => (
            <button
              type="button"
              key={s.cm}
              className={`pc-size${size === s ? ' is-selected' : ''}`}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
            >
              <span>{s.cm}</span>
              <small>{s.inches}</small>
            </button>
          ))}
          <button
            type="button"
            className={`pc-size${isCustom ? ' is-selected' : ''}`}
            onClick={() => setSize('custom')}
            aria-pressed={isCustom}
          >
            <span>Custom size</span>
            <small>type your own</small>
          </button>
        </div>
        {isCustom && (
          <div className="pc-custom">
            <input
              type="number" min="1" inputMode="decimal" required placeholder="Width" aria-label="Custom width"
              value={custom.width} onChange={(e) => setCustom({ ...custom, width: e.target.value })}
            />
            <span>x</span>
            <input
              type="number" min="1" inputMode="decimal" required placeholder="Height" aria-label="Custom height"
              value={custom.height} onChange={(e) => setCustom({ ...custom, height: e.target.value })}
            />
            <select aria-label="Unit" value={custom.unit} onChange={(e) => setCustom({ ...custom, unit: e.target.value })}>
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        )}
      </fieldset>

      <fieldset className="pc-step">
        <legend>2. Subject</legend>
        <div className="pc-choices">
          {SUBJECTS.map((s) => (
            <button
              type="button"
              key={s}
              className={`pc-chip${subject === s ? ' is-selected' : ''}`}
              onClick={() => setSubject(s)}
              aria-pressed={subject === s}
            >
              {s}
            </button>
          ))}
        </div>
        {subject === 'Portrait' && (
          <div className="pc-faces">
            <span>How many faces will the portrait include?</span>
            <div className="pc-stepper">
              <button type="button" onClick={() => setFaces((f) => Math.max(1, f - 1))} aria-label="Fewer faces">−</button>
              <output aria-live="polite">{faces}</output>
              <button type="button" onClick={() => setFaces((f) => Math.min(20, f + 1))} aria-label="More faces">+</button>
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className="pc-step">
        <legend>3. Your details</legend>
        <ContactFields
          contact={contact}
          setContact={setContact}
          messageLabel="Tell me about your idea"
          messagePlaceholder="Who or what you'd like painted, deadline, links to reference photos…"
        />
      </fieldset>

      <div className="pc-submit-row">
        <p className="pc-summary">
          {ready ? <><strong>{subject}</strong>, {sizeText}{subject === 'Portrait' && `, ${faces} face${faces > 1 ? 's' : ''}`}</> : 'Choose a size and subject above'}
        </p>
        <button className="pc-submit" type="submit" disabled={!ready || status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request commission'}
        </button>
      </div>
      <Status status={status} />
    </form>
  );
}

function PrintsPage() {
  const [tab, setTab] = useState('prints');

  return (
    <div className="pc-page">
      <Header />
      <section className="pc-section">
        <h1 className="pc-title">Prints &amp; Commissions</h1>
        <div className="pc-tabs" role="tablist">
          <button role="tab" aria-selected={tab === 'prints'} className={`pc-tab${tab === 'prints' ? ' is-active' : ''}`} onClick={() => setTab('prints')}>
            Order a print
          </button>
          <button role="tab" aria-selected={tab === 'commission'} className={`pc-tab${tab === 'commission' ? ' is-active' : ''}`} onClick={() => setTab('commission')}>
            Commission a painting
          </button>
        </div>
        {tab === 'prints' ? <PrintForm /> : <CommissionForm />}
      </section>
    </div>
  );
}

export default PrintsPage;
