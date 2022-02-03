# VotAqui

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Firebase project

You must create a project on firebase. The free account should be enough for most purposes.

### Setup environment variables

Create a file `.env.local` with the following content (replacing the values by the ones in your project):

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_AUTH_DOMAIN=your-app-url-here.firebaseapp.com
NEXT_PUBLIC_DATABASE_URL=https://your-app-default-rtdb.firebaseio.com
NEXT_PUBLIC_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_STORAGE_BUCKET=your-app-url.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=messaging-id-here
NEXT_PUBLIC_APP_ID=app-id-here
NEXT_PUBLIC_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID
```

### Initial data

The poll is created directly on Firebase. Your realtime database must follow the structure below (names in uppercase mean you can define whatever value you want):

```
your-app-default-rtdb
|- polls
    |- YOUR_POLL_SLUG
        |- meta
            |- acceptingVotes: true
            |- currentQuestion: 0
        |- questions
            |- 0
                |- options
                    |- 0
                        |- image: OPTIONAL_IMAGE_RELATIVE_PATH_FROM_FIREBASE_STORAGE
                        |- text: OPTIONAL_OPTION_TEXT
                    |- 1
                        |- image: OPTIONAL_IMAGE_RELATIVE_PATH_FROM_FIREBASE_STORAGE
                        |- text: OPTIONAL_OPTION_TEXT
                |- question: QUESTION_TEXT
                |- title: OPTIONAL_QUESTION_TITLE
```

If you want to use images, add them to your Firebase Storage and add the path here (e.g. `/dcu/1A.png`).

Anywhere in the dataset where the key is a number means that it is an array. You can add how many other options you want following the same structure.

IMPORTANT: I haven't tested it with the titles and texts yet (only images), so the layout may be broken. Sorry...

## Deploy

You can deploy this project on Vercel (or anywhere else, given that you can run Next.js there).
