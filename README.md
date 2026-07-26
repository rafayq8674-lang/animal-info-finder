Animal Info Finder
What it does & the problem it solves
Animal Info Finder is a web app that lets anyone search for any animal by name and instantly get accurate, easy-to-read information about it — habitat, diet, average lifespan, conservation status, and 2–3 interesting facts.
As a zoology student, I often needed quick, reliable facts about different species while studying or preparing teaching material, and searching multiple websites for this basic information was slow and inconsistent. This app solves that problem for students, teachers, and anyone curious about wildlife by putting verified, structured animal information in one simple place, generated instantly using AI.
Live URL
https://animal-info-finder.ai.studio
Features
Search any animal by name and get instant results
AI-generated summaries covering habitat, diet, and average lifespan
2–3 interesting facts per animal
Conservation status badge (e.g., Endangered, Least Concern)
Popular species quick-search buttons (African Elephant, Red Panda, Snow Leopard, etc.)
Recent search history
Text-to-speech "Listen" feature to read results aloud
Share and Save functionality
Offline fallback catalog — if the AI service is temporarily unavailable, the app still shows a reliable summary instead of failing
Clean, responsive, nature-themed design (works on mobile and desktop)
AI Feature
The app uses Google Gemini AI to generate structured, real-time information about whichever animal the user searches for. When a user submits a search, the app sends the animal name to Gemini with instructions to return the habitat, diet, average lifespan, conservation status, and a short set of interesting facts in a consistent format, which is then displayed in a styled card.
If the AI service fails to respond (e.g., due to a temporary API issue), the app automatically falls back to a small built-in catalog of verified animal facts, so the user is never shown an error.
Tools & Services Used
Google AI Studio — used to design, build, and iterate on the app using natural-language prompts
Google Gemini AI — powers the animal information generation
React + TypeScript — frontend framework
Vite — build tool
Hosted and deployed via Google AI Studio's built-in publishing feature
Screenshots
(Add these directly in the GitHub README editor by dragging in the images you already have: the search screen with popular species, the African Elephant result screen, and one more search result.)
How to Run the Project Locally
Clone this repository
Run npm install to install dependencies
Add your Gemini API key as an environment variable
Run npm run dev to start the development server
Open the local URL shown in the terminal
Alternatively, the live version can be used directly at the URL above — no setup required.
