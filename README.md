This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# SportRadar FE Coding Challenge by Thanathon

![Scoreboard Preview](/public/preview.png)

## How it works?

- The application retrieves matchup datas from the API
- When pres START, the API assigns match-time (defaults at 90 seconds)
- A random score is generated every 10 seconds while the match is in progress
- You can skip the waiting, end the match and generate scores for the remaining time

## How to run

To run this repository locally, run this:

```bash
# Make sure you have Yarn installed:
yarn install

# Start development Preview mode:
yarn dev


# or if you prefer NPM, make sure you have it installed:
npm i

#then run:
npm run dev
```

Finally, navigate to [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## E2E Test

To run PlayWrighte E2E test, make sure you run the project locally (see above) then run this:

```bash
yarn playwright test
```

or with PlayWright UI with visualizations:

```bash
yarn playwright test --ui
```

NOTE: In UI-mode, press green-colored "Play"-icon to run the test.

## Recources

This project is utilising following technologies:

- NextJS (based on React TypeScript)
- NextJS API
- Tailwind CSS v4
- Jotai (State Management)
