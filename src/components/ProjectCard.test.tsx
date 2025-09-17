import { render, screen } from "@testing-library/react";
import ProjectCard, { Project } from "./ProjectCard";

// Mock next/image for JSDOM
vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} {...props} />;
  }
}));

describe("ProjectCard", () => {
  const baseProject: Project = {
    id: "1",
    title: "Awesome App",
    description: "An awesome app that does amazing things.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS"]
  };

  it("renders title, description, and tech badges", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText(baseProject.title)).toBeInTheDocument();
    expect(screen.getByText(baseProject.description)).toBeInTheDocument();

    for (const tech of baseProject.techStack) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it("renders placeholder image when no image is provided", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByText(/no image available/i)).toBeInTheDocument();
  });

  it("renders live and repo links when provided", () => {
    const projectWithLinks: Project = {
      ...baseProject,
      liveUrl: "https://example.com/live",
      repoUrl: "https://github.com/user/repo"
    };

    render(<ProjectCard project={projectWithLinks} />);

    const liveLink = screen.getByRole("link", {
      name: new RegExp(`Open live site for ${projectWithLinks.title} in a new tab`, "i")
    });
    const repoLink = screen.getByRole("link", {
      name: new RegExp(`Open repository for ${projectWithLinks.title} in a new tab`, "i")
    });

    expect(liveLink).toBeInTheDocument();
    expect(repoLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", projectWithLinks.liveUrl);
    expect(repoLink).toHaveAttribute("href", projectWithLinks.repoUrl);
  });

  it("does not render links when urls are missing", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.queryByRole("link", {
        name: new RegExp(`Open live site for ${baseProject.title} in a new tab`, "i")
      })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: new RegExp(`Open repository for ${baseProject.title} in a new tab`, "i")
      })
    ).not.toBeInTheDocument();
  });
});


