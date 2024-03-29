# PET-Project Freelancer

App for tracking money made per month, per year and per client

CURRENT:

- Search field on Projects page
- If there are no projects at all, or no projects found -> display a "There are no projects to display" screen, that takes the center of the page and moves Arrow buttons down
- Earning by Clients on Main page not working
- Add tests

NEW TODOs

1. [x] FRONT: make the whole root layout work with grids and media queries
2. [x] FRONT: change Logout button to be less prominent
3. [x] FRONT: show proper errors
4. [ ] FRONT: animate BG change on route change. Every route/page has its BG color (main, tomato, brown, green, etc)
       4.1 [ ] green for PROJECTS page and light-red for CLIENTS page?
5. [ ] FRONT: offline Google fonts
6. [x] FRONT: add a working Add Project functionality to the Dashboard page
7. [ ] BACK: add messages to payloads that are sent from the backend on all successful operations with Users, Projects, and Clients.
       7.1 [ ] FRONT: show these messages as notifications on the frontend
8. [ ] FRONT: make Dashboard page more mobile friendly: adjust fonts, work on menu, etc
9. [ ] FRONT: is there a reason to send SUBMIT button into a modal form component? It would make sense if that form was universal, but it is not
10. [ ] FRONT: use FEATURES directory? For Auth, Clients, Projects
11. [ ] FRONT: put "edit", "add", and "delete" routes inside "projects" and "clients" main routes? In this case the main routes will have no element of their own, but will serve as an outer shell
12. [ ] FRONT: Dashboard page looks too cumbersome, need to think if there is a way to unload it somehow. One of the ways is to move some calculation functions into Utilities and a modal Add Project into a separate page (but in that case it won't be modal anymore)
13. [ ] FRONT: some items inside lib.tsx file are to specific, I should move them to the location where they are used
14. [ ] BACK: check whether I check form inputs properly
15. [ ] BACK: move some functionality from Utils into Middleware folder
16. [ ] FRONT: try font-clamping - especially need this for Dashboard page
17. [ ] FRONT: start working on Projects page - a sortable and searchable table of all projects
18. [ ] BACK: when getting projects for the last year I think I can use the generics getAll from CRUD, the only thing I need is to add filtering by date. How do I do that?
19. [ ] FRONT: on PROJECTS page show truncated notes text and display full text on hover in a tooltip (https://sebhastian.com/html-hover-text/)
20. [ ] BACK: do I sanitize user-sent data before saving it to DB?
21. ?[ ] FRONT: add a "Keep me logged in" checkbox - if checked, save token to localStorage
22. ?[ ] FRONT: how do I get a token from state and use it inside loaders??? Right now I'm getting token from localStorage, but that is not the way
23. [ ] BACK: check if I use "lean" where it can be used
24. [ ] BACK: add granular Mongo-related error messages (as per Jonas's course)
25. [ ] FRONT: rewrite react-router logic and use a previous version (the current one has too little resources and is very cumbersome for me)
26. [ ] FRONT: Storybook - should I try it? Just for kicks?
27. [ ] FRONT: projects - current and finished; start and deadline date; payment settled or not
28. [ ] FRONT: projects - may need a Spinner, right now there is a pause while the projects are loading
29. [ ] FRONT: API - really look into creating an API layer, so that in my components or hooks I can reference API calls like `api.createProject(...)`. Then my `api` module will use a 'client' module (fetch or something) to make the call?
30. [ ] FRONT: error handling as per (https://www.builder.io/blog/safe-data-fetching?ck_subscriber_id=478685813)
31. [ ] FRONT: change all PX sizes to REMs, and set the root font-size to 62.5%, so that the user can zoom in and our, and we can work with 10px root font-size
32. [ ] FRONT: move Pagination into a separate components, that accepts the required number of pages and a method to call for pagination
33. [ ] FRONT: projects - maybe add a Rozetka-style "Load more" button to change PAGE_LIMIT
34. [ ] FRONT: think on how I can organize my styles as per Schmedtmann CSS-tutorial
