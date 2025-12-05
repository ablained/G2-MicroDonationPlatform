# Micro Donation Platform for Local Causes

A React Native application built with Expo that enables users to donate to local community causes and admins to manage donation campaigns. The platform features multi-payment support, cause request workflows, and detailed project tracking.

---

## Features

### 1. **Admin: Add Donation Causes**
- Admins can create new donation causes with:
  - **Title** — Name of the cause/project
  - **Description** — Detailed project information
  - **Goal Amount** — Target donation amount
  - **Category** — Categorize causes (Education, Health, Animals, etc.)
  - **Image URL** — Add photos/images to causes for visual appeal
- Admin Dashboard shows stats: total users, total donations, total amount raised

### 2. **Donor Dashboard & Causes**
- Users see a list of all active causes with:
  - Real-time progress bars (visual fundraising progress)
  - Amount raised vs. goal
  - Category badges
- Click any cause to view **Detailed Cause Page** with:
  - Full description and project details
  - High-quality image placeholder
  - Progress tracking
  - Donate button
  - Option to request to join the cause team

### 3. **Request to Join Causes (Approval Workflow)**
- Users can submit a **request to join** a cause
- Admin receives notifications of pending join requests
- Admin Dashboard displays **pending requests** with:
  - User name
  - Cause title
  - Approve/Reject buttons
- Status tracking: Pending → Approved/Rejected

### 4. **Payment Methods**
- **In-App Balance** — Quick wallet-based donations (default)
- **GCash** — Payment instructions + "I have paid" confirmation
- **Online Banking** — Bank transfer details + "I have paid" confirmation
- Donation modal supports quick-select amounts: ₱5, ₱10, ₱25, ₱50
- **Where to Donate** screen lists all payment options for users

### 5. **Detailed Project Management**
- Each cause has:
  - Comprehensive description
  - Category tagging
  - Progress tracking ($ raised / goal)
  - Image support
  - Donation history
  - Fundraising statistics
- Admin can view all donations across all causes
- Real-time updates to fundraising progress

### 6. **Authentication**
- User & Admin registration with validation
- Secure login system
- Test credentials included for quick access
- Session management

---

## Project Structure

```
micro-donation-local-causes/
├── App.js                    # Main app (all screens, states, logic)
├── app.json                  # Expo configuration
├── package.json              # Dependencies & scripts
├── index.js                  # App entry point
└── assets/                   # Image assets folder
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo CLI (optional, but recommended)

### Steps

1. **Clone or navigate to the project**
   ```bash
   cd c:\Users\jerald\Desktop\micro-donation-local-causes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on your device**
   - **Android Emulator:** Press `a` in terminal
   - **iOS Simulator:** Press `i` in terminal
   - **Expo Go App:** Scan the QR code with your phone's camera

---

## Test Credentials

Use these credentials to quickly test the platform:

### User Account
- **Email:** `user@test.com`
- **Password:** `user123`
- **Role:** Regular donor
- **Starting Balance:** ₱1,000

### Admin Account
- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Role:** Administrator (manage causes & approvals)

---

## Usage Guide

### For Users (Donors)

1. **Sign Up or Login**
   - Choose "User Registration" or login with existing credentials
   - Your starting balance is ₱1,000

2. **Browse Causes**
   - View all active causes on your dashboard
   - Click any cause title to see detailed project information

3. **Make a Donation**
   - Click "Donate" button on any cause
   - Choose donation amount or use quick-select (₱5, ₱10, ₱25, ₱50)
   - Select payment method:
     - **In-App Balance** — Deducted from your wallet immediately
     - **GCash** — Receive payment instructions; confirm after paying
     - **Online Banking** — Receive bank details; confirm after transferring
   - Confirm donation

4. **Request to Join a Cause**
   - Open a cause detail page
   - Click "Request to Join" button
   - Admin will review and approve/reject your request

5. **View Your Donation History**
   - Your Dashboard shows all your past donations
   - Track which causes you've supported

6. **Where to Donate**
   - On the home screen, tap "Where to Donate"
   - View all available payment methods and instructions

---

### For Admins

1. **Sign Up or Login**
   - Choose "Admin Registration" or login with admin credentials
   - Access the Admin Dashboard after login

2. **Create a New Cause**
   - On Admin Dashboard, tap "Add New Cause"
   - Fill in:
     - Cause title (e.g., "Education for Children")
     - Detailed description (e.g., "Support school supplies and tuition...")
     - Goal amount (e.g., 10000)
     - Category (e.g., Education, Health, Animals)
     - Image URL (optional; use a direct image link)
   - Tap "Create Cause"

3. **View Dashboard Statistics**
   - Total number of registered users
   - Total number of donations made
   - Total amount of money raised

4. **Review All Donations**
   - See a chronological list of all donations made
   - Details include: donor name, cause, amount, date

5. **Manage Join Requests**
   - Pending Join Requests section shows users requesting to join causes
   - For each request:
     - Tap "Approve" to accept the user
     - Tap "Reject" to decline
   - Track status: Pending → Approved/Rejected

---

## API/Payment Integration Notes

### Current Implementation
- All data is stored **in-app (in-memory state)**
- Payment flows are **placeholder/demonstration**
- GCash and Online Banking show payment instructions and await user confirmation

### Production Enhancements

To integrate real payment processing:

1. **Backend Server** (Node.js, Django, Firebase, etc.)
   - Store users, causes, donations in a database
   - Implement authentication (JWT)
   - Handle payment verification

2. **Payment Gateway Integration**
   - **GCash:** Integrate with GCash API or payment processor
   - **Online Banking:** Connect to Philippine banks or payment service (e.g., PayMongo, 2Checkout)

3. **Persistent Storage**
   - Use `AsyncStorage` for local caching
   - Or connect to a backend database (Firebase Realtime DB, MongoDB, PostgreSQL)

4. **Image Hosting**
   - Use `expo-image-picker` to let admins upload photos
   - Store images on cloud services (AWS S3, Firebase Storage, Cloudinary)

---

## Key React Native Components Used

- **SafeAreaView** — Safe area padding for notches/status bars
- **ScrollView** — Scrollable content areas
- **View** — Layout containers
- **Text** — Text display
- **TextInput** — User input fields
- **TouchableOpacity** — Pressable buttons
- **Modal** — Popups/dialogs for donations, forms
- **StyleSheet** — Styling and responsive design
- **Alert** — User notifications

---

## State Management

All app state is managed using React `useState`:

```javascript
// Users and authentication
const [users, setUsers] = useState([...])
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [currentUser, setCurrentUser] = useState(null)

// Causes and donations
const [causes, setCauses] = useState([...])
const [donations, setDonations] = useState([])

// Requests and UI
const [causeRequests, setCauseRequests] = useState([])
const [currentScreen, setCurrentScreen] = useState('home')
const [showDonationModal, setShowDonationModal] = useState(false)
// ... and more
```

---

## Screen Navigation

1. **Home** — Welcome & main menu
2. **Register** — User/Admin registration
3. **Login** — User/Admin login
4. **User Dashboard** — Causes list, donation history, balance
5. **Admin Dashboard** — Stats, all donations, join requests, add cause button
6. **Cause Detail** — Full project info, donate, request to join
7. **Where to Donate** — Payment method guide
8. **Modals:**
   - Donation modal (amount + payment method)
   - Payment instructions modal (GCash/Bank)
   - Add new cause modal (admin only)

---

## Styling & Design

- **Color Scheme:**
  - Primary: `#6200ea` (Purple) — Buttons, progress bars
  - Secondary: `#03dac6` (Teal) — Alternative actions
  - Background: `#e5e9e7` (Light gray)
  - Header: `#2e1847` (Dark purple)

- **Typography:**
  - Large titles: 24px, bold
  - Section titles: 20px, bold
  - Body text: 16px
  - Small text: 12–14px

- **Layout:**
  - Card-based design for causes
  - Progress bars for fundraising tracking
  - Quick action buttons for common amounts

---

## Troubleshooting

### App won't start
- Ensure Node.js is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -r node_modules && npm install`

### Expo connection issues
- Run `expo doctor` to diagnose
- Restart the Expo server: `npm start` (press `R`)
- Check that your phone/emulator is on the same network

### Payment methods not showing
- Ensure you're on the donation modal
- Select a cause first before clicking "Donate"

### Data resets after closing the app
- This is expected behavior (in-memory storage)
- To persist, we can add `AsyncStorage` integration

---

## Future Enhancements

- [ ] **Persistent Storage** — AsyncStorage or backend database
- [ ] **Real Payment Integration** — GCash API, PayMongo, online banking
- [ ] **Image Uploads** — expo-image-picker integration
- [ ] **Push Notifications** — Notify users of donation updates
- [ ] **Social Sharing** — Share causes on social media
- [ ] **Advanced Analytics** — Fundraising charts, donor insights
- [ ] **Cause Categories** — Filter by category
- [ ] **Search & Filter** — Find causes by keyword
- [ ] **User Profiles** — Detailed donor/admin profiles
- [ ] **Cause Teams** — Collaborative cause management

---

## License

This project is for educational and demonstration purposes.

---

## Support

For issues or questions, please contact the development team or refer to the React Native and Expo documentation:
- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Platform:** React Native (Expo)  
**Language:** JavaScript (ES6+)
