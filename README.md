# Silver Screen

Welcome to silver screen a movie and TV show streaming website! This project is built using Next.js 14.

## Features

- **Streaming:** Watch your favorite movies and TV shows online.
- **Search:** Easily find movies and TV shows using our search functionality.
- **Responsive Design:** Enjoy a seamless viewing experience on any device - desktop, tablet, or mobile.
- **Dynamic Routing:** Navigate smoothly between different pages without page reloads.
- **Performance:** Benefit from the performance optimizations provided by Next.js.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Create a `.env.local` file in the root of the project.
4. Add the following properties to the `.env.local` file:
   TMDB_API_KEY=your_tmdb_api_key
   TMDB_ACCESS_TOKEN=your_tmdb_access_token
5. Replace `your_tmdb_api_key` and `your_tmdb_access_token` with your actual API key and access token from TMDB.
6. Save the `.env.local` file.
7. Install dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
```

8. Start the application

```bash
npm start
# or
yarn start
```

## Technologies Used

- **Next.js:** A React framework for building server-side rendered and statically generated applications.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for building custom designs quickly.
- **Shadcn/ui:** A UI library for building user interfaces with React.

## Dependency APIs

- **TMDB:** The Movie Database (TMDB) API is used for fetching movie and TV show data.
- **Vidsrc:** Vidsrc API is used for streaming movie and TV show content.
