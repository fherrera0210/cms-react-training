# cms-react-training
******
# 1 Exercise: Your First Components
Create a repo in GitHub named “cms-react-training” under your own account. This repo will be used for all the exercises in the coursework as well as the final project at the end. To keep things manageable, each exercise and the final project should each be in their own branch on this repo. For now, you only need to make one (1) branch: the one for this exercise and should be named “exercise-1”.
In your new repo, build a NextJS app.

Build a Comic component.
Styling must be done with Next’s built-in CSS Modules system.
Images must be loaded via Next/Image. (https://nextjs.org/docs/pages/api-reference/components/image)
Must include sub-components for Button as well as a Detail.
Iterate over the array of comics in the Static Data and render a Comic for each one.
Comics should be displayed in a responsive grid.
Use inline styles via the style attribute on the element wrapping the comics. It should only take ~3 lines of CSS to create a rudimentary responsive grid.

******
# 2 Exercise: Working With An API
Create a new branch in your repo named “exercise-2”. This branch should be based on “exercise-1”.
Create a custom hook for the Marvel API. (https://comicvine.gamespot.com/api/)
Your hook must support handling the loading, success, and error states of the API.
Update your grid of comics to be powered by your new hook instead of the Static Data.

******
# 3 Exercise: Type It Up
Create a new branch in your repo named “exercise-3”. This branch should be based on “exercise-2”.
Put NextJS in TypeScript mode. (https://nextjs.org/docs/app/api-reference/config/typescript#existing-projects)
Convert all your components and hooks from .js files to .tsx files.
Define types or interfaces for all props for each component/hook as well as address any TypeScript errors that may have appeared.

******
# 4 Exercise: Your First Test
Create a new branch named “exercise-4”. This branch should be based on “exercise-3”.
Add Jest and the React Testing Library to your project.
Create a test that validates that the Comic component accurately renders the title, issue number, published date, and creator names.

******
# Final Project
Create a new branch in your repo named “final-project”. This branch should be based on “exercise-4”.
Taking everything you’ve learned and built up until now, build out everything else in the Design Comps. (there are multiple pages)
When you’ve finished your final project, send your repo to your lead for review. You may need to update the permissions on your repo to allow your lead to view your work.
***
# Final Project Criteria
All images must be loaded via the Next/Image component.
You will need to update your Marvel API hook to support filters and pagination.
The pagination must be full functional
It should reset when you choose an item from the filters

Character filter options:

Iron Man: 1009368

Captain America: 1009220

Thor: 1009664

Deadpool: 1009268

Scarlet Witch: 1009562

Black Widow: 1009189

Wasp: 1009707

Gamora: 1010763

Creator filter options:

Kate Leth: 12787

Brian Michael Bendis: 24

Stan Lee: 30

Steve Ditko: 32

Jack Kirby: 196

You must be able to add and remove comics from a favorites list.
An accurate count of favorites must show in the header.
The favorites sidebar should always be accurate and the close button should work
Once clicked, favorite buttons should become unfavorite buttons.
Favorites should be limited to no more than 10 comics. Once that limit is reached all favorite buttons should become disabled until a comic is removed from the favorites list.
Favorites should be stored in LocalStorage so selections persist after a page reload.
The app must be responsive. (There are mobile comps in the XD file)
The app should follow best practices around semantics and accessibility.
The app must match the Design Comp visually.