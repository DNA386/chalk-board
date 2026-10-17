## Getting Started
If on windows, help npm find scripts:
```bash
npm config set script-shell powershell
```

## Writing the CV details
Modify the site content by editing the files in `/markdown`.
There are two sub-directories: 
- `/mindmap` contains a list of segments to add to the single page mindmap. 
- `/pages` contains content to be displayed on separate pages. 
  The location of the page in the app will mirror the structure of the `/markdown/pages` directory:
  if you want a page to live at `https://blackboard.cv/path/to/page`, save it under `/markdown/pages/path/to/page.md`.
  By default no layouts or fallbacks will be generated, only the main page.
  If you would like to customise this, the extra layouts can be added manually to the app dir in the desired place.
- To activate pagination, you can add `use pagination` to the start of the file. The parsing then expects
  page delimiters `--- {title}`. The title field is optional, if unset the page will simply be numbered. 
  The first section is understood to be the title and will remain accross the various pages.

You can compile them into the relevant components/pages via:
```bash
npm run compile
```

In order for the content you created to actually show up in the app, you must define how these are accessed in `\app\_index\pageIndex.ts`.
This file contains some consts that you can/should modify:
- `PAGES`: (ordered) list of pages. This generates the top menu visible when not inside the chalkboard world. (ie if this app is access directly as a webpage)
- `MINDMAP_GRID`: tailwind classes to define the underlying mindmap grid. Unless feeling extra fancy, you should just pick a number of rows and columns that allows you to distribute the content nicely. 
- `SECTIONS`: This defines the sections that appear in the mindmap. 
  By default, these will be filled into the grid automatically, but you can also speficy particular positions via the `row-n` and `col-n` properties.
  For each component, add an import of the compiled markdown file (which must be under `markdown/mindmap`).
  The order in the `SECTIONS` array will affect the automatic placement of the sections.
  You should also specify how many grid blocks each component should take up via the `col-span-n` and `row-span-n` classes.
  Note that the heading component is built directly without markdown.


#### Landing page
The landing/home page is not generated via markdown compilation, and is found at `app/page.tsx`.


## Viewing the results
In order to serve files locally, you must set up environment variables so the chalkboard and world
know where they are being hosted.

To do so, create a file in the root of the project called `.env.local`, and paste the following config:
```
NEXT_PUBLIC_CHALKWORLD_URL=http://127.0.0.1:5173
NEXT_PUBLIC_CHALKWORLD_MESSAGE_URL=http://127.0.0.1:5173
NEXT_PUBLIC_CHALKBOARD_URL=http://localhost:3000
NEXT_PUBLIC_BASE_PATH=""
```
*Do not* push this as it will break the deployment.

Run the development server:
```bash
npm run dev
```
The dev server should reload automatically when it detects a change in the files, 
but the markdown compilation must still be run manually.


For the production version, build the app:
```bash
npm run build
```
Then you can serve the files locally:
```bash
npm run serve
```

## Connecting to the world

The app is intended to work when embedded within a 3D blackboard world. When viewed separately, the mindmap page in particular is
not visible, as the setup requires precise placement incompatible with a responsive layout.
Instead, a navigation bar is included, and the user can navigate to the specified pages.

When in the app, page navigation is handled via the 3D world. 
You may set this up within that app as per the rules specified there.
The interaction between the blackboard contents (this app) and the external world is handled via the
[message](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event) system.

To configure the connection, specify the relevant app urls in `.env.local` as defined above.
The production config is stored in `.env`.