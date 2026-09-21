# Mastermind

The classic code-breaking game, in the browser. The computer hides a code of 4 colored
pegs (6 colors, repeats allowed). You get 10 guesses; each guess is scored with feedback
pegs - bright for right color in the right spot, gray for right color in the wrong spot.

- No signup, nothing to install - pure static HTML/JS
- Win/played stats persist in `localStorage`
- `engine.js` holds the scoring logic as pure functions, shared between the app and node tests

## Play

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

```
node /tmp/mm-test.js   # requires engine.js; adjust path in the test file
```
