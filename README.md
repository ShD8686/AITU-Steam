# Final Project: AITU Steam (Gaming Store Platform)

## 1. Project Overview
This is a production-ready Full-Stack application simulating a digital gaming platform like Steam. It allows users to browse games, add them to a cart, purchase them using a virtual wallet, and track their playtime. The project is built with a focus on security (RBAC), scalability (MVC), and relational data integrity.

## 2. Key Features
- **Advanced Auth:** JWT sessions and password hashing with Bcrypt.
- **Admin Tools:** Automated admin role detection and manual "IsApproved" check for security.
- **Store & Search:** Browse games by genre or find them using the real-time search bar.
- **Shopping Cart:** Save games to a personal cart before buying.
- **Personal Library:** Tracks all purchased games and simulates "Play Time" (hours played).
- **Virtual Bank:** A profile system where users can top up their balance using a simulated 16-digit card system.

## 3. Relational Integrity (Object Links)
The project maintains complex relationships in MongoDB:
- **Developer ↔ Game:** Each game stores a `ref` to its Developer's `ObjectId`. Used with `.populate()` to show publisher info.
- **User ↔ Library:** A user's library stores an array of objects, each linking a `GameID` and `hoursPlayed`.
- **User ↔ Cart:** A one-to-many link between users and the games they intend to buy.

## 4. API Documentation

### Authentication & Profile
- `POST /api/auth/register` - Create account (Admin role if email contains 'admin').
- `POST /api/auth/login` - Returns JWT token and user role.
- `GET /api/auth/me` - (Protected) Get full profile info, wallet balance, and cart.
- `POST /api/auth/funds` - (Protected) Add virtual money to wallet (requires 16-digit card).

### Store Logic
- `GET /games` - List games (supports `?genre=` and `?search=` filters).
- `GET /games/:id` - Detailed game info + publisher bio.
- `POST /api/auth/cart` - (Protected) Add game to user's shopping cart.
- `POST /api/auth/purchase` - (Protected) Deduct funds and move game to Library.
- `POST /api/auth/play` - (Protected) Simulate gaming activity and increase hours played.

### Admin Only
- `POST /developers` - Create a new game publisher.
- `POST /games` - Publish a new game to the store.

## 5. Architectural Choices

- **MVC Pattern:** The code is strictly separated into `models/`, `routes/`, and `controllers/`. This ensures the backend logic is modular and easy to debug.
- **Role-Based Access Control (RBAC):** Middleware checks the JWT payload for `role`. Only users with the `admin` role can access POST/PUT/DELETE routes.
- **JWT Security:** Using JSON Web Tokens allows for stateless authentication, making the app faster and more professional compared to traditional sessions.
- **Manual Approval:** For security, even if a user registers as an admin, they are blocked by an `isApproved: false` flag until the DB owner manually verifies them.

## 6. Setup & Installation
1. **Clone the repo:** `git clone <your-repo-link>`
2. **Install dependencies:** `npm install`
3. **Configure .env:**
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure secret key for token signing.
4. **Run locally:** `node server.js`
5. **URL:** Open `http://localhost:3000`

## 7. Live URL
**Live App:** `https://aitu-steam.onrender.com`

## 8. Postman Collection
The root folder contains `postman_collection.json` which includes tests for:
1. Unauthorized access (401 error).
2. Forbidden user actions on admin routes (403 error).
3. Successful admin CRUD and user purchases.
