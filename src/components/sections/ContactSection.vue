<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import ObfuscatedContact from '../ObfuscatedContact.vue'

const form = reactive({ name: '', phone: '', email: '', message: '' })
const botField = ref('')
const submitted = ref(false)
const submitting = ref(false)
const error = ref(false)

// Netlify Forms expects an x-www-form-urlencoded POST to any path on the site,
// with a `form-name` matching the form declared in index.html.
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
}

async function onSubmit() {
  if (submitting.value) return
  submitting.value = true
  error.value = false
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        'bot-field': botField.value,
        ...form,
      }),
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    submitted.value = true
  } catch {
    error.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section id="kontakt" class="section contact">
    <div class="container">
      <div class="contact__card">
        <div class="contact__info">
          <h2 class="contact__title">Máte dotaz?<br />Ozvěte se nám.</h2>
          <p class="contact__lead">
            Rádi vám poradíme s technickým stavem vašeho vrtu nebo připravíme
            nezávaznou cenovou nabídku na míru.
          </p>

          <ObfuscatedContact
            type="phone"
            v-slot="{ value, href, ready, buildLink }"
          >
            <a
              :href="href"
              class="contact__row"
              @mouseenter="buildLink"
              @focus="buildLink"
              @pointerdown="buildLink"
            >
              <span class="contact__row-icon"><AppIcon name="phone" :size="22" /></span>
              <span>
                <span class="contact__row-label">Telefonický kontakt</span>
                <span class="contact__row-value">{{
                  ready ? value : 'Zobrazit číslo'
                }}</span>
              </span>
            </a>
          </ObfuscatedContact>

          <ObfuscatedContact
            type="email"
            v-slot="{ value, href, ready, buildLink }"
          >
            <a
              v-if="ready"
              :href="href"
              class="contact__row"
              @mouseenter="buildLink"
              @focus="buildLink"
              @pointerdown="buildLink"
            >
              <span class="contact__row-icon"><AppIcon name="mail" :size="22" /></span>
              <span>
                <span class="contact__row-label">E-mailová adresa</span>
                <span class="contact__row-value">{{ value }}</span>
              </span>
            </a>
            <span v-else class="contact__row">
              <span class="contact__row-icon"><AppIcon name="mail" :size="22" /></span>
              <span>
                <span class="contact__row-label">E-mailová adresa</span>
                <span class="contact__row-value">Zobrazit e-mail</span>
              </span>
            </span>
          </ObfuscatedContact>

          <p class="contact__guarantee">
            <AppIcon name="shield-check" :size="18" />
            Garantujeme profesionální přístup a čistotu práce.
          </p>
        </div>

        <div class="contact__form-wrap">
          <div v-if="submitted" class="contact__success">
            <AppIcon name="shield-check" :size="40" />
            <h3>Děkujeme za vaši poptávku!</h3>
            <p>Ozveme se vám co nejdříve.</p>
          </div>

          <form
            v-else
            class="contact__form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            @submit.prevent="onSubmit"
          >
            <input type="hidden" name="form-name" value="contact" />
            <!-- Honeypot: hidden from users, catches bots that auto-fill fields. -->
            <p class="contact__hp" aria-hidden="true">
              <label>
                Nevyplňujte prosím:
                <input
                  v-model="botField"
                  name="bot-field"
                  tabindex="-1"
                  autocomplete="off"
                />
              </label>
            </p>

            <label class="field">
              <span class="field__label">Jméno a příjmení</span>
              <input
                v-model="form.name"
                name="name"
                type="text"
                placeholder="Jan Novák"
                required
              />
            </label>

            <div class="field-row">
              <label class="field">
                <span class="field__label">Telefon</span>
                <input
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  placeholder="+420 123 456 789"
                />
              </label>
              <label class="field">
                <span class="field__label">E-mail</span>
                <input
                  v-model="form.email"
                  name="email"
                  type="email"
                  placeholder="novak@seznam.cz"
                  required
                />
              </label>
            </div>

            <label class="field">
              <span class="field__label">Vaše zpráva</span>
              <textarea
                v-model="form.message"
                name="message"
                rows="4"
                placeholder="O jakou službu máte zájem? Jak je studna stará a hluboká?"
              ></textarea>
            </label>

            <button
              type="submit"
              class="btn btn--navy btn--block"
              :disabled="submitting"
            >
              {{ submitting ? 'Odesílám…' : 'Odeslat nezávaznou poptávku' }}
            </button>

            <p v-if="error" class="contact__error" role="alert">
              Odeslání se nezdařilo. Zkuste to prosím znovu, nebo nám zavolejte.
            </p>

            <p class="contact__consent">
              Odesláním formuláře souhlasíte se zpracováním osobních údajů pro
              účely vyřízení poptávky.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--bg-alt);
}
.contact__card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 48px;
  overflow: hidden;
  box-shadow: var(--shadow);
  background: var(--surface);
  border: 1px solid var(--card-border);
}
.contact__info {
  background: var(--blue);
  color: #fff;
  padding: 4rem;
}
.contact__title {
  color: #fff;
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  line-height: 1.15;
}
.contact__lead {
  margin-top: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}
.contact__row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
  cursor: pointer;
}
.contact__row-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--accent-light);
  flex-shrink: 0;
}
.contact__row-label {
  display: block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
}
.contact__row-value {
  display: block;
  font-weight: 700;
  font-size: 1.35rem;
}
.contact__guarantee {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.contact__form-wrap {
  padding: 4rem;
}
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.field__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-soft);
}
.field input,
.field textarea {
  width: 100%;
  padding: 1rem 1.15rem;
  border: 1px solid #c2c6d4;
  border-radius: 16px;
  font: inherit;
  color: var(--text);
  background: var(--bg);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(88, 230, 255, 0.18);
}
.field textarea {
  resize: vertical;
  border-radius: 24px;
}
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.contact__form .btn--block {
  min-height: 68px;
  font-size: 1rem;
}
.contact__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contact__form .btn[disabled] {
  opacity: 0.6;
  cursor: progress;
}
.contact__error {
  font-size: 0.85rem;
  color: #c0392b;
  font-weight: 600;
}
.contact__consent {
  font-size: 0.78rem;
  color: var(--muted);
  line-height: 1.5;
}
.contact__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  height: 100%;
  color: var(--accent-strong);
}
.contact__success h3 {
  margin-top: 0.5rem;
}
.contact__success p {
  color: var(--muted);
}

@media (max-width: 860px) {
  .contact__card {
    grid-template-columns: 1fr;
    border-radius: 28px;
  }
  .contact__info,
  .contact__form-wrap {
    padding: 2rem;
  }
  .contact__row {
    margin-top: 1.5rem;
  }
  .contact__row-value {
    font-size: 1.15rem;
    word-break: break-word;
  }
}
@media (max-width: 480px) {
  .contact__info,
  .contact__form-wrap {
    padding: 1.5rem;
  }
  .field-row {
    grid-template-columns: 1fr;
  }
  .contact__row-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
