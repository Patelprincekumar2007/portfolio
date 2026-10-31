# Patel Prince — Portfolio v2

Multi-page animated portfolio. Dark editorial "ink & paper" theme with a 3D
print station that prints the actual resume.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS for styling
- React Three Fiber + Drei (3D hero data-sphere, 3D printer)
- GSAP + ScrollTrigger (preloader, hero intro, scroll reveals)

## Pages
- `/` — hero with particle data-sphere, featured work, about teaser, CV call-to-action
- `/projects` — all five projects with tags and links
- `/about` — bio, academics, technical arsenal
- `/journey` — experience timeline
- `/cv` — the Print Station: click PRINT MY CV, the printer spins up with real
  mechanical audio and a paper sheet carrying the resume emerges in 3D, then
  Preview / Download / Print again. Skip and Mute while printing.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
```

Production:
```bash
npm run build
npm start
```

Requires Node.js 20+ (built and verified on Node 22). Everything (fonts, sound, PDF) is bundled —
no CDN needed at runtime.

## Edit content
- All text, projects, journey entries, skills, links: `lib/content.ts`
- Colors: `tailwind.config.ts` (`ink`, `paper`, `accent`) and `app/globals.css`
- The resume PDF: replace `public/cv/Patel_Princekumar_Resume.pdf`
- The paper texture in the 3D printer: replace `public/cv/resume-preview-1.png`
  (a render of the resume's first page — regenerate after changing the PDF)
- Printer sound: replace `public/sounds/printer.mp3`

## Deploy
Any Node host (Vercel recommended: import repo, zero config). Do not forget to
keep `public/` intact — the CV PDF and sound live there.

## Accessibility
- `prefers-reduced-motion`: preloader and reveals are skipped; the print
  completes instantly without animation.
- 3D scenes are decorative; all content is available as text.
