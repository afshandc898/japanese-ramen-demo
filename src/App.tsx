import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Facebook, Instagram, Quote } from 'lucide-react'

type MenuTab = 'ramen' | 'small-plates' | 'drinks'

interface MenuItem {
  name: string
  price: string
  description?: string
}

interface Testimonial {
  quote: string
  author: string
}

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reserve', href: '#reserve' },
]

const menuData: Record<MenuTab, MenuItem[]> = {
  ramen: [
    {
      name: 'Tonkotsu Hana',
      price: '$24',
      description:
        '48-hour pork bone broth, chashu, soft egg, nori, bamboo shoots. Our signature.',
    },
    {
      name: 'Spicy Miso',
      price: '$23',
      description:
        'House red miso, chilli oil, minced pork, corn, spring onion. Warming.',
    },
    {
      name: 'Shoyu Tori',
      price: '$22',
      description:
        'Chicken soy broth, roast chicken, leek oil, menma. Light yet deeply complex.',
    },
    {
      name: 'Vegetable Shio',
      price: '$21',
      description:
        'Kombu and vegetable broth, roasted mushrooms, yuzu, crispy shallots. Vegan.',
    },
    {
      name: 'Black Garlic Tonkotsu',
      price: '$26',
      description:
        'Dark, rich, smoky. Pork broth with mayu, sous vide pork belly, pickled ginger.',
    },
    {
      name: 'Mazemen (no soup)',
      price: '$22',
      description:
        'Dry tossed noodles, tare sauce, chashu, egg yolk, spring onion.',
    },
  ],
  'small-plates': [
    {
      name: 'Gyoza (6pc)',
      price: '$14',
      description: 'Pan-fried pork & cabbage, ponzu dipping sauce',
    },
    {
      name: 'Karaage Chicken',
      price: '$16',
      description: 'Japanese fried chicken, Kewpie mayo, lemon',
    },
    {
      name: 'Takoyaki (4pc)',
      price: '$13',
      description: 'Octopus balls, bonito flakes, okonomiyaki sauce, mayo',
    },
    {
      name: 'Edamame',
      price: '$8',
      description: 'Sea salt, toasted sesame',
    },
  ],
  drinks: [
    {
      name: 'Japanese Sapporo Draft',
      price: '$12',
    },
    {
      name: 'Yuzu Lemonade',
      price: '$8',
      description: 'House-made, sparkling',
    },
    {
      name: 'Matcha Latte (hot/iced)',
      price: '$7',
    },
    {
      name: 'Ramune Soda',
      price: '$5',
      description: 'Original / Melon / Strawberry',
    },
  ],
}

const testimonials: Testimonial[] = [
  {
    quote: 'Best ramen I\'ve had outside of Japan. The tonkotsu is otherworldly.',
    author: 'Sarah M., Google ★★★★★',
  },
  {
    quote: 'We come here every Friday. The spicy miso is dangerously good.',
    author: 'James T., Yelp ★★★★★',
  },
  {
    quote:
      'Atmosphere is perfect — dark, moody, intimate. The gyoza deserve their own award.',
    author: 'Lisa K., Google ★★★★★',
  },
]

const galleryCards = [
  { label: 'The Broth', image: '/images/gallery-broth.jpg' },
  { label: 'Hand-cut Noodles', image: '/images/gallery-noodles.jpg' },
  { label: 'The Bowl', image: '/images/gallery-bowl.jpg' },
  { label: 'Late Night Fitzroy', image: '/images/gallery-exterior.jpg' },
  { label: 'Karaage', image: '/images/gallery-karaage.jpg' },
  { label: 'Yuzu Bar', image: '/images/gallery-bar.jpg' },
]

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: 'easeOut' as const },
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<MenuTab>('ramen')
  const [isReserved, setIsReserved] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tabButtons = useMemo(
    () => [
      { key: 'ramen' as const, label: 'Ramen' },
      { key: 'small-plates' as const, label: 'Small Plates' },
      { key: 'drinks' as const, label: 'Drinks' },
    ],
    [],
  )

  const handleReserveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsReserved(true)
    event.currentTarget.reset()
  }

  return (
    <div className="min-h-screen bg-[#0a0605] text-[#F5F0EB]">
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-[rgba(196,30,58,0.2)] bg-[rgba(10,6,5,0.95)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-6xl px-5 py-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#top" className="group leading-none">
              <p className="font-heading text-2xl tracking-[0.25em]">
                <span className="text-[#C41E3A]">HA</span>{' '}
                <span className="text-[#D4A843]">NA</span>
              </p>
              <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-[#8B7355] group-hover:text-[#F5F0EB]">
                花
              </p>
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wide text-[#F5F0EB]/80 transition-colors hover:text-[#D4A843]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#reserve"
              className="rounded-full bg-[#C41E3A] px-4 py-2.5 text-xs font-medium tracking-wide text-white transition hover:scale-[1.02] hover:bg-[#a61931] md:px-5 md:text-sm"
            >
              Reserve a Table
            </a>
          </div>
          <div className="mt-3 flex items-center justify-center gap-5 border-t border-[rgba(196,30,58,0.16)] pt-3 text-xs tracking-[0.2em] md:hidden">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-[#F5F0EB]/75 transition hover:text-[#D4A843]">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-12 pt-28 md:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(196,30,58,0.28),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-[#0a0605]/70 to-[#0a0605]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#D4A843_0.6px,transparent_0.6px)] [background-size:3px_3px]" />

          <motion.div
            className="relative mx-auto flex w-full max-w-6xl flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-heading mb-3 text-6xl leading-none text-[#F5F0EB]/40 md:text-8xl lg:text-9xl">
              手打ち麺
            </p>
            <h1 className="font-heading max-w-3xl text-5xl leading-tight tracking-wide md:text-7xl">
              Ramen. Refined.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[#F5F0EB]/80 md:text-xl">
              Handcrafted broths. Slow-cooked 48 hours. Fitzroy&apos;s best kept secret.
            </p>
            <div className="mt-9 flex flex-wrap gap-4 rounded-2xl border border-[rgba(196,30,58,0.2)] bg-[rgba(15,7,8,0.42)] p-3 backdrop-blur-sm">
              <a
                href="#reserve"
                className="rounded-full bg-[#C41E3A] px-7 py-3 text-sm font-semibold tracking-wide text-white transition hover:scale-[1.03] hover:bg-[#a61931]"
              >
                Reserve Tonight
              </a>
              <a
                href="#menu"
                className="rounded-full border border-[rgba(212,168,67,0.55)] px-7 py-3 text-sm font-semibold tracking-wide text-[#F5F0EB] transition hover:border-[#D4A843] hover:bg-[#D4A843]/10"
              >
                Explore Menu
              </a>
            </div>
          </motion.div>

          <motion.a
            href="#story"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8B7355] transition hover:text-[#D4A843]"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            aria-label="Scroll to story"
          >
            <ChevronDown size={30} />
          </motion.a>
        </section>

        <motion.section
          id="story"
          className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8"
          {...sectionReveal}
        >
          <div>
            <p className="text-sm tracking-[0.3em] text-[#D4A843]">THE BROTH BEHIND THE BOWL</p>
            <h2 className="font-heading mt-4 text-4xl tracking-wide md:text-5xl">Our Story</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#F5F0EB]/85">
              Hana Ramen was born from a single obsession: the perfect bowl.
            </p>
            <p className="mt-4 leading-relaxed text-[#F5F0EB]/80">
              Every broth is simmered for 48 hours. Every noodle hand-cut each morning. Every
              topping sourced from Melbourne&apos;s finest producers.
            </p>
            <p className="mt-4 leading-relaxed text-[#F5F0EB]/80">
              We opened our doors in Fitzroy because this neighbourhood deserves food that
              doesn&apos;t compromise.
            </p>
            <p className="mt-6 text-sm text-[#8B7355]">Est. 2021 · 234 Smith Street, Fitzroy</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <motion.article
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[rgba(196,30,58,0.4)] bg-[rgba(18,8,10,0.62)] p-6 backdrop-blur-md"
            >
              <p className="font-heading text-4xl text-[#D4A843]">48hrs</p>
              <p className="mt-2 text-[#F5F0EB]/80">broth cook time</p>
            </motion.article>
            <motion.article
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[rgba(196,30,58,0.4)] bg-[rgba(18,8,10,0.62)] p-6 backdrop-blur-md"
            >
              <p className="font-heading text-4xl text-[#D4A843]">100% fresh</p>
              <p className="mt-2 text-[#F5F0EB]/80">daily noodles</p>
            </motion.article>
          </div>
        </motion.section>

        <motion.section id="menu" className="mx-auto max-w-6xl px-5 py-20 md:px-8" {...sectionReveal}>
          <p className="text-sm tracking-[0.3em] text-[#D4A843]">SIGNATURE MENU</p>
          <h2 className="font-heading mt-4 text-4xl tracking-wide md:text-5xl">What We&apos;re Known For</h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {tabButtons.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full border px-5 py-2 text-sm tracking-wide transition ${
                  activeTab === tab.key
                    ? 'border-[#C41E3A] bg-[#C41E3A] text-white'
                    : 'border-[rgba(196,30,58,0.35)] bg-[#12080A] text-[#F5F0EB]/80 hover:border-[#D4A843]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {menuData[activeTab].map((item) => (
              <motion.article
                key={item.name}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-[rgba(196,30,58,0.2)] bg-[rgba(18,8,10,0.64)] p-5 backdrop-blur-md transition"
              >
                <div className="h-0.5 w-0 bg-[#C41E3A] transition-all duration-300 group-hover:w-full" />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-heading text-2xl tracking-wide">{item.name}</h3>
                  <span className="shrink-0 text-lg font-semibold text-[#D4A843]">{item.price}</span>
                </div>
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#F5F0EB]/75">{item.description}</p>
                ) : null}
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="gallery" className="mx-auto max-w-6xl px-5 py-20 md:px-8" {...sectionReveal}>
          <p className="text-sm tracking-[0.3em] text-[#D4A843]">ATMOSPHERE</p>
          <h2 className="font-heading mt-4 text-4xl tracking-wide md:text-5xl">Inside Hana</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryCards.map((card) => (
              <motion.article
                key={card.label}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative h-56 overflow-hidden rounded-2xl border border-[rgba(196,30,58,0.2)]"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[rgba(196,30,58,0.15)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="font-heading absolute bottom-4 left-4 text-2xl tracking-wide text-[#F5F0EB] drop-shadow-lg">
                  {card.label}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="mx-auto max-w-6xl px-5 py-20 md:px-8" {...sectionReveal}>
          <p className="text-sm tracking-[0.3em] text-[#D4A843]">WHAT PEOPLE SAY</p>
          <h2 className="font-heading mt-4 text-4xl tracking-wide md:text-5xl">Guest Reviews</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.author}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[rgba(196,30,58,0.25)] bg-[rgba(18,8,10,0.62)] p-6 backdrop-blur-md"
              >
                <Quote className="text-[#C41E3A]" size={28} />
                <p className="mt-4 leading-relaxed text-[#F5F0EB]/85">“{testimonial.quote}”</p>
                <p className="mt-4 text-sm text-[#D4A843]">— {testimonial.author}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="reserve" className="mx-auto max-w-6xl px-5 py-20 md:px-8" {...sectionReveal}>
          <p className="text-sm tracking-[0.3em] text-[#D4A843]">RESERVE A TABLE</p>
          <h2 className="font-heading mt-4 text-4xl tracking-wide md:text-5xl">Book Your Bowl</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-[rgba(196,30,58,0.25)] bg-[rgba(18,8,10,0.62)] p-6 backdrop-blur-md md:p-8">
              {isReserved ? (
                <div className="rounded-xl border border-[rgba(212,168,67,0.4)] bg-[#0f0809] p-6">
                  <p className="font-heading text-2xl text-[#D4A843]">Reservation Request Received</p>
                  <p className="mt-3 text-[#F5F0EB]/80">
                    Arigatou! We&apos;ll be in touch shortly to confirm your table at Hana Ramen.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsReserved(false)}
                    className="mt-5 rounded-full border border-[rgba(196,30,58,0.4)] px-5 py-2 text-sm transition hover:border-[#D4A843] hover:text-[#D4A843]"
                  >
                    Submit another reservation
                  </button>
                </div>
              ) : (
                <form className="grid gap-4" onSubmit={handleReserveSubmit}>
                  <input required placeholder="Name" className="form-input" />
                  <input required type="email" placeholder="Email" className="form-input" />
                  <input required type="tel" placeholder="Phone" className="form-input" />
                  <input required type="date" className="form-input" />

                  <select required defaultValue="" className="form-input">
                    <option value="" disabled>
                      Select time
                    </option>
                    {['5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm'].map(
                      (time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ),
                    )}
                  </select>

                  <select required defaultValue="" className="form-input">
                    <option value="" disabled>
                      Party size
                    </option>
                    {['1-2', '3-4', '5-6', '7+'].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>

                  <textarea
                    rows={4}
                    placeholder="Special requests"
                    className="form-input resize-none"
                  />

                  <button
                    type="submit"
                    className="mt-2 rounded-full bg-[#C41E3A] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#a61931]"
                  >
                    Reserve My Table
                  </button>
                </form>
              )}
            </div>

            <aside className="rounded-2xl border border-[rgba(196,30,58,0.25)] bg-[rgba(18,8,10,0.62)] p-6 backdrop-blur-md">
              <h3 className="font-heading text-2xl tracking-wide">Visit Us</h3>
              <p className="mt-4 text-[#F5F0EB]/80">234 Smith Street, Fitzroy VIC 3065</p>
              <p className="mt-1 text-[#F5F0EB]/80">(03) 9417 2388</p>
              <div className="mt-6 border-t border-[rgba(196,30,58,0.25)] pt-5 text-sm text-[#F5F0EB]/75">
                <p className="font-semibold text-[#D4A843]">Hours</p>
                <ul className="mt-3 space-y-2">
                  <li>Tue–Thu: 5:30pm – 9:30pm</li>
                  <li>Fri–Sat: 5:00pm – 10:30pm</li>
                  <li>Sun: 5:00pm – 9:00pm</li>
                  <li>Mon: Closed</li>
                </ul>
              </div>
            </aside>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-[rgba(196,30,58,0.2)] bg-[#0b0606] px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-2xl tracking-[0.2em]">
              <span className="text-[#C41E3A]">HA</span> <span className="text-[#D4A843]">NA</span>
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">Ramen. Refined.</p>
            <p className="mt-1 text-xs text-[#8B7355]">ABN: 72 891 234 567</p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-[#F5F0EB]/80">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-[#D4A843]">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[#8B7355]">
            <a href="#" aria-label="Instagram" className="transition hover:text-[#D4A843]">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="transition hover:text-[#D4A843]">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-[rgba(196,30,58,0.16)] pt-5 text-xs text-[#8B7355]">
          <p>© 2025 Hana Ramen. All rights reserved.</p>
          <p className="mt-1">Website by CrateWeb</p>
        </div>
      </footer>
    </div>
  )
}

export default App
