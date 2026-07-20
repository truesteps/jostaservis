<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import ObfuscatedEmail from '../ObfuscatedEmail.vue'

const form = reactive({ name: '', phone: '', email: '', message: '' })
const submitted = ref(false)

function onSubmit() {
  // No backend yet: wire this to an email service / API endpoint.
  // For now we acknowledge the submission client-side.
  submitted.value = true
}
</script>

<template>
  <section id="kontakt" class="section contact">
    <div class="container">
      <div class="contact__card">
        <!-- Left: info panel -->
        <div class="contact__info">
          <h2 class="contact__title">Máte dotaz?<br />Ozvěte se nám.</h2>
          <p class="contact__lead">
            Rádi vám poradíme s technickým stavem vašeho vrtu nebo připravíme
            nezávaznou cenovou nabídku na míru.
          </p>

          <a href="tel:+420721466388" class="contact__row">
            <span class="contact__row-icon"><AppIcon name="phone" :size="18" /></span>
            <span>
              <span class="contact__row-label">Telefonický kontakt</span>
              <span class="contact__row-value">+420 721 466 388</span>
            </span>
          </a>

          <ObfuscatedEmail v-slot="{ email, href, ready, buildLink }">
            <a
              v-if="ready"
              :href="href"
              class="contact__row"
              @mouseenter="buildLink"
              @focus="buildLink"
              @click="buildLink"
            >
              <span class="contact__row-icon"><AppIcon name="mail" :size="18" /></span>
              <span>
                <span class="contact__row-label">E-mailová adresa</span>
                <span class="contact__row-value">{{ email }}</span>
              </span>
            </a>
            <span v-else class="contact__row">
              <span class="contact__row-icon"><AppIcon name="mail" :size="18" /></span>
              <span>
                <span class="contact__row-label">E-mailová adresa</span>
                <span class="contact__row-value">Zobrazit e-mail</span>
              </span>
            </span>
          </ObfuscatedEmail>

          <p class="contact__guarantee">
            <AppIcon name="shield-check" :size="18" />
            Garantujeme profesionální přístup a čistotu práce.
          </p>
        </div>

        <!-- Right: form -->
        <div class="contact__form-wrap">
          <div v-if="submitted" class="contact__success">
            <AppIcon name="shield-check" :size="40" />
            <h3>Děkujeme za vaši poptávku!</h3>
            <p>Ozveme se vám co nejdříve.</p>
          </div>

          <form v-else class="contact__form" @submit.prevent="onSubmit">
            <label class="field">
              <span class="field__label">Jméno a příjmení</span>
              <input
                v-model="form.name"
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
                  type="tel"
                  placeholder="+420 123 456 789"
                />
              </label>
              <label class="field">
                <span class="field__label">E-mail</span>
                <input
                  v-model="form.email"
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
                rows="4"
                placeholder="O jakou službu máte zájem? Jak je studna stará a hluboká?"
              ></textarea>
            </label>

            <button type="submit" class="btn btn--primary btn--block">
              Odeslat nezávaznou poptávku
            </button>

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
  grid-template-columns: 1fr 1.1fr;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  background: var(--surface);
}
.contact__info {
  background: var(--blue);
  color: #fff;
  padding: 2.75rem;
}
.contact__title {
  color: #fff;
  font-size: clamp(1.5rem, 3vw, 2rem);
}
.contact__lead {
  margin-top: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
}
.contact__row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.75rem;
  cursor: pointer; /* email <a> has no href until hover builds the mailto */
}
.contact__row-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--accent);
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
  font-size: 1.05rem;
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
  padding: 2.75rem;
}
.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
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
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--border-strong);
  border-radius: 10px;
  font: inherit;
  color: var(--text);
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(22, 188, 225, 0.15);
}
.field textarea {
  resize: vertical;
}
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  }
  .contact__info,
  .contact__form-wrap {
    padding: 2rem;
  }
}
@media (max-width: 480px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
