import { activeMissions } from '../data/projects'

export default function SelectedWork() {
  return (
    <section className="content-frame py-section">
      <h2 className="text-micro text-center mb-block">
        Selected Work
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {activeMissions.map((project) => (
          <a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet text-title interactive"
          >
            {project.title.replace('Aryntra ', '')}
          </a>
        ))}
      </div>
    </section>
  )
}
