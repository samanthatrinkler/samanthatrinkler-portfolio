import { useEffect, useState } from "react"

type Project = {
  id: string
  title: string
  year: string
  category: string
  service: string
  image: string
  detailImage: string
  alt: string
  description: string
  size: "wide" | "portrait" | "standard"
}

const projects: Project[] = [
  {
    id: "amda",
    title: "50 ans de l’AMDA",
    year: "2025–26",
    category: "Editorial",
    service: "Editorial design · Archives",
    image: "/projects/amda.png",
    detailImage: "/projects/amda-spread.jpg",
    alt: "D’Ailleurs Info, special anniversary edition",
    description:
      "An anniversary edition celebrating fifty years of the Association des Amis de la Maison d’Ailleurs. Historic posters are reworked into a playful visual archive.",
    size: "wide",
  },
  {
    id: "apex",
    title: "APEX",
    year: "2025",
    category: "Digital",
    service: "Art direction · UI/UX",
    image: "/projects/apex.png",
    detailImage: "/projects/apex-detail.png",
    alt: "APEX private banking mobile interface",
    description:
      "A private banking concept for a digital generation: direct language, intuitive tools and a bold visual identity in place of traditional financial codes.",
    size: "portrait",
  },
  {
    id: "piq-piq",
    title: "PIQ PIQ",
    year: "2024",
    category: "Identity",
    service: "Brand identity · Packaging",
    image: "/projects/piq-piq.png",
    detailImage: "/projects/piq-piq-detail.png",
    alt: "PIQ PIQ beer packaging",
    description:
      "A collaborative identity by Collectif Cave Canem for WhiteFrontier brewery—balancing spice, lightness and the joy of being together.",
    size: "standard",
  },
  {
    id: "simply-jet",
    title: "Simply Jet",
    year: "2022",
    category: "Identity",
    service: "Strategy · Brand identity",
    image: "/projects/simply-jet.png",
    detailImage: "/projects/simply-jet-colours.png",
    alt: "Simply Jet identity on a cloudscape",
    description:
      "A complete visual identity refresh for the Lausanne-based private aviation broker, developed while working as Content Strategy Manager.",
    size: "wide",
  },
  {
    id: "hydro-hegemony",
    title: "Hydro-Hegemony",
    year: "2021",
    category: "Editorial",
    service: "Publication · Web design",
    image: "/projects/hydro-hegemony.png",
    detailImage: "/projects/hydro-spread.png",
    alt: "Bound Hydro-Hegemony publication",
    description:
      "A visual research project tracing water-related conflicts from 3000 BC to the present, revealing water’s role in geopolitical and environmental tensions.",
    size: "portrait",
  },
  {
    id: "legatum-digitalis",
    title: "Legatum Digitalis",
    year: "2022",
    category: "Editorial",
    service: "Research · Publication",
    image: "/projects/legatum-digitalis.jpg",
    detailImage: "/projects/legatum-posters.jpg",
    alt: "Legatum Digitalis installation",
    description:
      "An ECAL Bachelor project investigating digital inheritance, online memory and the legal, social and technological traces we leave behind.",
    size: "portrait",
  },
  {
    id: "sambiancer",
    title: "S’ambiancer",
    year: "2020",
    category: "Motion",
    service: "Illustration · Animation",
    image: "/projects/sambiancer.png",
    detailImage: "/projects/sambiancer-detail.png",
    alt: "Colourful still from S’ambiancer",
    description:
      "An animated collaboration with Fiona Valais, selected for projection on Lausanne’s Bel-Air tower during the Lausanne Lumières festival.",
    size: "wide",
  },
]

const categories = ["All", "Editorial", "Identity", "Digital", "Motion"]

function ArrowIcon({ direction = "right" }: { direction?: "right" | "left" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
      viewBox="0 0 24 24"
    >
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  )
}

function App() {
  const [filter, setFilter] = useState("All")
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter)

  useEffect(() => {
    if (!activeProject) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null)
    }
    document.body.classList.add("no-scroll")
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.classList.remove("no-scroll")
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [activeProject])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Samantha Trinkler, home"
        >
          ST<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="availability">
          <span aria-hidden="true" />
          Available for projects
        </p>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>Independent graphic designer</span>
            <span>Lausanne, CH</span>
          </div>
          <h1 id="hero-title">
            Samantha
            <br />
            <em>Trinkler</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Identities, editorial systems and digital experiences made with
              clarity and character.
            </p>
            <a
              className="circle-link"
              href="#work"
              aria-label="Explore selected work"
            >
              <ArrowIcon />
            </a>
          </div>
        </section>

        <section
          className="work-section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">
              Projects <em>with purpose.</em>
            </h2>
          </div>

          <div className="filter-row">
            <p>Filter by</p>
            <div className="filters" role="group" aria-label="Filter projects">
              {categories.map((category) => (
                <button
                  className={filter === category ? "active" : ""}
                  key={category}
                  onClick={() => setFilter(category)}
                  type="button"
                >
                  {category}
                  <sup>
                    {category === "All"
                      ? projects.length
                      : projects.filter(
                          (project) => project.category === category,
                        ).length}
                  </sup>
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <article
                className={`project-card ${index % 2 ? "is-even" : ""}`}
                key={project.id}
              >
                <div className="project-heading">
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-meta">
                    <p>{project.service}</p>
                    <p>{project.year}</p>
                  </div>
                </div>
                <button
                  className={`project-stage ${project.size}`}
                  onClick={() => setActiveProject(project)}
                  type="button"
                  aria-label={`View ${project.title} project`}
                >
                  <span className="media-frame primary">
                    <img src={project.image} alt={project.alt} loading="lazy" />
                  </span>
                  <span className="media-frame secondary">
                    <img
                      src={project.detailImage}
                      alt={`${project.title} project detail`}
                      loading="lazy"
                    />
                  </span>
                  <span className="view-project">
                    View case study <ArrowIcon />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <p className="eyebrow">02 / Profile</p>
          <div className="about-grid">
            <h2 id="about-title">
              Swiss precision,
              <br />
              <em>Australian openness.</em>
            </h2>
            <div className="about-copy">
              <p className="lead">
                I build distinctive visual worlds across identity, print and
                screen.
              </p>
              <p>
                ECAL-trained and based in Lausanne, I work independently and as
                one third of Collectif Cave Canem. My approach pairs rigorous
                systems with an instinct for expressive detail.
              </p>
              <dl>
                <div>
                  <dt>Services</dt>
                  <dd>
                    Art direction
                    <br />
                    Visual identity
                    <br />
                    Editorial design
                    <br />
                    Digital design
                  </dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>
                    English
                    <br />
                    Français
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <footer id="contact">
          <p className="eyebrow">03 / Let’s work together</p>
          <a className="contact-link" href="mailto:samanthatrinkler@gmail.com">
            <span>Start a project</span>
            <ArrowIcon />
          </a>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Samantha Trinkler</p>
            <div>
              <a
                href="https://www.linkedin.com/in/samanthatrinkler/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a href="mailto:samanthatrinkler@gmail.com">Email ↗</a>
            </div>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </main>

      {activeProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            className="modal-backdrop"
            onClick={() => setActiveProject(null)}
            type="button"
            aria-label="Close project"
          />
          <div className="modal-panel">
            <div className="modal-top">
              <p>Selected work / {activeProject.year}</p>
              <button
                className="close-button"
                onClick={() => setActiveProject(null)}
                type="button"
                autoFocus
              >
                Close <span>×</span>
              </button>
            </div>
            <div className="modal-title-row">
              <h2 id="modal-title">{activeProject.title}</h2>
              <p>{activeProject.description}</p>
            </div>
            <div className="modal-images">
              <img src={activeProject.image} alt={activeProject.alt} />
              <img
                src={activeProject.detailImage}
                alt={`${activeProject.title} project detail`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
