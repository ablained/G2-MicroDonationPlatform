# Quick Start Guide - Micro Donation Platform

## 🚀 Get Started in 60 Seconds

### 1. Install & Run

```bash
# Navigate to the project folder
cd c:\Users\jerald\Desktop\micro-donation-local-causes

# Install dependencies (if not done already)
npm install

# Start the app
npm start
```

The app will start on **port 8088** with a QR code displayed.

### 2. Open the App

**Option A: On Your Phone**
- Open **Expo Go** app (free from App Store/Play Store)
- Scan the QR code from the terminal
- App loads in ~10 seconds

**Option B: On Android Emulator**
- Press `a` in the terminal
- Emulator launches automatically

**Option C: On iOS Simulator** (Mac only)
- Press `i` in the terminal
- iOS Simulator launches automatically

**Option D: Web Browser**
- Press `w` in the terminal
- Opens at `localhost:8088` (limited features)

---

## 👤 Test the App

### For Users (Donors)

1. **Login** with:
   - Email: `user@test.com`
   - Password: `user123`

2. **Explore Causes** — Browse the list of causes to donate to

3. **View Cause Details** — Tap a cause title to see full project info

4. **Make a Donation** — Choose amount and payment method (in-app balance, GCash, online banking)

5. **Request to Join** — Join a cause team with the "Request to Join" button

6. **Check Donations** — View your donation history on the dashboard

---

### For Admins

1. **Login** with:
   - Email: `admin@test.com`
   - Password: `admin123`

2. **Add a New Cause** — Tap "Add New Cause" button:
   - Title: "Emergency Relief Fund"
   - Description: "Help families affected by disasters"
   - Goal: "50000"
   - Category: "Emergency"
   - Image URL: (leave blank or add one)

3. **View Statistics** — Dashboard shows user count, donation count, total amount

4. **Review Donations** — See all donations made to all causes

5. **Approve Requests** — When users request to join, approve or reject in the "Pending Join Requests" section

---

## 🎯 Key Features to Test

| Feature | Steps | Expected Result |
|---------|-------|-----------------|
| **Add Cause (Admin)** | Click "Add New Cause" → Fill form → Create | New cause appears at top of list |
| **Donate** | Select cause → Click "Donate" → Enter amount → Confirm | Donation recorded, balance updated, progress bar moves |
| **Payment Methods** | In donation modal, switch between payment options | Can select In-App Balance, GCash, Online Bank |
| **Request to Join** | View cause detail → Click "Request to Join" | Admin sees request in "Pending Join Requests" |
| **Approve Request (Admin)** | Admin Dashboard → Pending requests → Click "Approve" | Request status changes to approved |
| **Where to Donate** | Home screen → "Where to Donate" | Shows all payment methods & instructions |

---

## 💾 Data Persistence

**Note:** All data is stored in-app memory only. When you close the app:
- Causes created will reset
- Donations will reset
- User balances will reset
- Requests will reset

To add permanent storage, we can add `AsyncStorage` (5 min setup). Let me know if you'd like that!

---

## 📱 Terminal Commands While Running

While the app is running (`npm start`), use these hotkeys:

| Key | Action |
|-----|--------|
| `a` | Open Android Emulator |
| `i` | Open iOS Simulator |
| `w` | Open Web Browser |
| `r` | Reload App |
| `j` | Open Debugger |
| `m` | Toggle Menu |
| `?` | Show All Commands |
| `Ctrl+C` | Stop Server |

---

## 🐛 Common Issues & Solutions

### **"Port 8081 is in use"**
- The app automatically switches to port 8088. Just scan the new QR code.

### **"Module not found" error**
```bash
npm cache clean --force
rm -r node_modules
npm install
npm start
```

### **Blank white screen**
- Press `r` to reload
- Check that you're on a supported device/emulator

### **QR code won't scan**
- Make sure phone and computer are on the same WiFi network
- Try entering the URL manually from the terminal output

### **App crashes on donate**
- Ensure in-app balance is sufficient (user starts with ₱1,000)
- Make sure a cause is selected before donating

---

## 📁 Project Files

```
micro-donation-local-causes/
├── App.js                      # Main app file (all logic & screens)
├── package.json                # Dependencies & scripts
├── app.json                    # Expo configuration
├── index.js                    # Entry point
├── README.md                   # Full documentation
├── QUICKSTART.md               # This file
└── assets/                     # Images folder (empty)
```

---

## 🎨 Color Scheme

- **Purple** (`#6200ea`) — Primary buttons & highlights
- **Teal** (`#03dac6`) — Secondary actions
- **Dark Purple** (`#2e1847`) — Headers
- **Light Gray** (`#e5e9e7`) — Background

---

## 💡 Next Steps (Optional Enhancements)

1. **Add Data Persistence** → AsyncStorage (saves data across sessions)
2. **Add Image Upload** → expo-image-picker (admins upload photos)
3. **Real Payments** → PayMongo / GCash API integration
4. **Backend** → Node.js server + database (MongoDB/PostgreSQL)
5. **Push Notifications** → Notify users of donations
6. **Search & Filter** → Find causes by category/keyword

---

## 📞 Need Help?

Check the full `README.md` for:
- Detailed feature descriptions
- API/Backend integration notes
- Component breakdown
- State management overview

Or ask for help implementing any of the above enhancements!

---

**Happy donating! 🎉**
