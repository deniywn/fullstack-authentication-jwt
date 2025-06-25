# fullstack-authentication-jwt

# Fullstack Authentication System 🔐  


A complete JWT-based authentication system built with React, Node.js, and MongoDB Atlas. Implemented in under 3 hours with proper authentication flow, protected routes, and session management.

## Features ✨
- ✅ User registration & login
- ✅ JWT authentication with token expiration
- ✅ Protected dashboard route
- ✅ Password hashing with bcrypt
- ✅ CORS security configuration
- ✅ Responsive error handling

## Tech Stack 🛠️
| Layer        | Technology               |
|--------------|--------------------------|
| **Frontend** | React 18 + Vite + Axios  |
| **Backend**  | Node.js + Express.js     |
| **Database** | MongoDB Atlas            |
| **Auth**     | JWT + bcryptjs           |

## Setup Guide ⚙️

### 1. Backend Setup
```bash
cd auth-backend
npm install
cp .env.example .env  # Fill with your credentials
```

**Configure `.env`:**
```ini
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/authapp
JWT_SECRET=your_strong_secret_here
```

### 2. Frontend Setup
```bash
cd auth-frontend
npm install
```

### 3. Run Application
```bash
# Terminal 1 (Backend)
cd auth-backend
npm start

# Terminal 2 (Frontend)
cd auth-frontend
npm run dev
```

## API Endpoints 🌐
| Endpoint     | Method | Description                | Auth Required |
|--------------|--------|----------------------------|---------------|
| `/register`  | POST   | Register new user          | No            |
| `/login`     | POST   | Login & get JWT token      | No            |
| `/dashboard` | GET    | Protected dashboard access | Yes (Bearer)  |

## Testing Guide 🧪
### Manual Testing
1. **Registration**  
   - Visit `http://localhost:5173/register`  
   - Submit valid credentials  
   - Verify:  
     ✅ Redirect to login page  
     ✅ User appears in MongoDB  

2. **Login**  
   - Visit `http://localhost:5173/login`  
   - Use registered credentials  
   - Verify:  
     ✅ Token stored in localStorage  
     ✅ Redirect to dashboard  

3. **Protected Route**  
   - Try accessing `/dashboard` without login  
   - Verify:  
     ✅ Redirect to login page  

### API Testing with Curl
```bash
# Register user
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Access dashboard (use token from login)
curl -X GET http://localhost:5000/dashboard \
  -H "Authorization: Bearer <your_token>"
```

## Project Structure 📂
```
auth-app/
├── auth-backend/            # Backend server
│   ├── server.js            # Main backend logic
│   ├── .env                 # Environment variables
│   └── package.json
│
└── auth-frontend/           # React application
    ├── src/
    │   ├── components/      # Auth components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx          # Router configuration
    │   └── main.jsx         # Entry point
    ├── vite.config.js
    └── package.json
```

## Troubleshooting 🚨
| Issue                        | Solution |
|------------------------------|----------|
| CORS errors                  | Double-check `origin` in backend CORS config |
| MongoDB connection failed    | Verify connection string in `.env` |
| "Token invalid" errors       | Ensure same JWT_SECRET in backend/frontend |
| Frontend not redirecting     | Check navigate() calls and state updates |
| Port conflicts               | Change PORT in `.env` or use `npm run dev -- --port 3000` |

## Verification Checks ✔️
1. **Database Check**  
   ```mongodb
   use authapp
   db.users.find().pretty()
   ```

2. **Token Validation**  
   - Check localStorage in DevTools (Application tab)
   - Verify at [jwt.io](https://jwt.io)

## Deployment Notes 🚀
1. **Backend**: Host on Render/Heroku with MongoDB Atlas URI  
2. **Frontend**: Deploy to Vercel/Netlify  
3. **Environment**: Update API URLs to production endpoints

## License 📄
MIT License - see [LICENSE](LICENSE) for details

---

**Development Time**: 3 hours  
**Test Coverage**: Manual + Postman  
**Stability**: Production-ready with proper error handling  

> **Note**: For detailed implementation code, refer to the component files in each directory. Remember to never commit `.env` files to version control!
