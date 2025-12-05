# Micro Donation Platform - Technical Documentation

## Architecture Overview

This is a **single-screen React Native application** built with Expo that uses React Hooks for state management. It follows a functional component architecture with all screens and logic contained in `App.js`.

### Architecture Pattern: Screen-Based Navigation

```
Home Screen
  ├─ User Registration
  ├─ Admin Registration
  ├─ Login
  └─ Where to Donate

User Authenticated Flow
  ├─ User Dashboard (causes list, donation history)
  ├─ Cause Detail (full project info)
  └─ Donation Modal (payment selection)

Admin Authenticated Flow
  ├─ Admin Dashboard (stats, donations, join requests)
  ├─ Add Cause Modal
  └─ Request Approval Workflow

Payment Flows
  ├─ In-App Balance (direct deduction)
  ├─ GCash (instructions + confirmation)
  └─ Online Banking (instructions + confirmation)
```

---

## Data Model

### Users
```javascript
{
  id: number,
  email: string,
  password: string,           // NOTE: Never hash passwords in production
  name: string,
  type: 'user' | 'admin',
  balance: number             // In-app wallet (₱)
}
```

### Causes
```javascript
{
  id: number,
  title: string,
  description: string,
  raised: number,             // Amount raised so far (₱)
  goal: number,               // Target amount (₱)
  category: string,           // e.g., 'Education', 'Health', 'Animals'
  image: string               // URL or base64 image data
}
```

### Donations
```javascript
{
  id: number,
  userId: number,
  causeId: number,
  amount: number,             // Amount donated (₱)
  date: string,               // ISO date or formatted string
  userName: string,           // Donor name (for quick access)
  causeName: string           // Cause title (for quick access)
}
```

### Cause Join Requests
```javascript
{
  id: number,
  userId: number,
  causeId: number,
  userName: string,           // User requesting to join
  causeTitle: string,         // Cause they want to join
  status: 'pending' | 'approved' | 'rejected'
}
```

---

## State Management

All state is managed with React `useState` hooks:

```javascript
// Authentication & User
const [currentScreen, setCurrentScreen] = useState('home');
const [userType, setUserType] = useState('');           // 'user' | 'admin'
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);

// Forms
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

// Donation
const [donationAmount, setDonationAmount] = useState('');
const [selectedCause, setSelectedCause] = useState(null);
const [showDonationModal, setShowDonationModal] = useState(false);
const [paymentMethod, setPaymentMethod] = useState('balance');

// Admin: Add Cause
const [showAddCauseModal, setShowAddCauseModal] = useState(false);
const [newCauseTitle, setNewCauseTitle] = useState('');
const [newCauseDescription, setNewCauseDescription] = useState('');
const [newCauseGoal, setNewCauseGoal] = useState('');
const [newCauseCategory, setNewCauseCategory] = useState('General');
const [newCauseImage, setNewCauseImage] = useState('');

// Payment Instructions
const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);

// Data Collections
const [users, setUsers] = useState([...]);
const [causes, setCauses] = useState([...]);
const [donations, setDonations] = useState([]);
const [causeRequests, setCauseRequests] = useState([]);
```

---

## Core Functions

### Authentication Functions

#### `handleRegister()`
- Validates all required fields
- Checks for duplicate email
- Creates new user object
- Adds to users array
- Navigates to login screen

#### `handleLogin()`
- Validates email & password
- Finds matching user
- Sets current user and login state
- Routes to appropriate dashboard (user or admin)

#### `handleLogout()`
- Clears current user
- Sets login state to false
- Resets forms
- Returns to home screen

#### `resetForm()`
- Clears all form input states

---

### Donation Functions

#### `handleDonate()`
- Validates donation amount
- Checks balance (for in-app payments only)
- Creates donation record
- Updates cause `raised` total
- Deducts balance (if in-app payment)
- Shows success alert
- Closes modal

#### `openDonationModal(cause)`
- Sets selected cause
- Resets payment method to 'balance'
- Opens donation modal

---

### Cause Management Functions

#### `handleAddCause()` (Admin)
- Validates title and goal amount
- Converts goal to number
- Creates new cause object
- Adds to causes array (at top)
- Clears form
- Shows success alert

#### `requestToJoinCause(cause)` (User)
- Checks if user is logged in
- Validates no duplicate pending requests
- Creates request object
- Adds to causeRequests array
- Shows confirmation alert

#### `approveRequest(reqId)` (Admin)
- Updates request status to 'approved'
- Shows success alert

#### `rejectRequest(reqId)` (Admin)
- Updates request status to 'rejected'
- Shows info alert

---

## Screen Rendering Functions

### `renderHome()`
- Welcome header
- 4 action buttons:
  - User Registration
  - Admin Registration
  - Login
  - Where to Donate

### `renderRegister()`
- Form fields: name, email, password, confirm password
- Register & Back buttons
- Tests credentials displayed

### `renderLogin()`
- Form fields: email, password
- Login & Back buttons
- Test credentials box

### `renderUserDashboard()`
- Header with username & balance
- ScrollView containing:
  - Available causes (map of cause cards)
  - Your donations (filter by current user)
  - Logout button

### `renderAdminDashboard()`
- Header with username
- Statistics cards (total users, donations, amount)
- All donations (chronological list)
- Pending join requests (with approve/reject buttons)
- Logout button

### `renderCauseDetail()`
- Header with cause title & category
- Cause image placeholder (if provided)
- Full description
- Progress text (raised / goal)
- Donate & Request to Join buttons
- Back button

### `renderWhereToDonate()`
- Info cards for each payment method:
  - GCash
  - Online Banking
  - In-App Balance
- Back button

---

## Modal Components

### `renderDonationModal()`
- Title (cause name)
- Balance display
- Amount input
- Quick-select buttons (₱5, ₱10, ₱25, ₱50)
- **Payment method selector:**
  - In-App Balance (default)
  - GCash
  - Online Banking
- Confirm & Cancel buttons

### `renderPaymentInstructions()`
- Shows GCash or Online Banking details
- Placeholder payment info
- "I have paid" confirmation button
- Close button

### `renderAddCauseModal()`
- Input fields:
  - Title
  - Description (multiline)
  - Goal amount
  - Image URL
- Create Cause & Cancel buttons

---

## Styling

All styles are in a `StyleSheet.create()` object with:
- Flexbox layout
- Color variables inline
- Responsive sizing
- Shadow/elevation for depth

### Key Style Objects

```javascript
// Containers
safeArea, container, content

// Headers
header, headerTitle, headerSubtitle

// Buttons
button, menuButton, secondaryButton, donateButton

// Forms
form, label, input, quickButton, methodButton

// Cards
causeCard, donationCard, statCard, requestCard, infoCard

// Modals
modalOverlay, modalContent, modalTitle

// Progress
progressBar, progressFill, progressContainer

// Text
sectionTitle, emptyText
```

---

## Navigation Flow

### Home Screen
- Entry point for all users
- Options branch to registration, login, or "where to donate"

### User Path
```
Login → User Dashboard → [Browse Causes] → Click Cause
          ↓
      Choose Cause → Donate Modal → Select Payment → Confirm
      
      Or: Request to Join → Cause Detail → Request submitted
```

### Admin Path
```
Login → Admin Dashboard → [View Stats] → [Review Donations]
         ↓
     [Approve/Reject Requests] → [Add New Cause]
```

---

## Payment Flow Details

### In-App Balance Payment
1. User selects "In-App Balance"
2. Clicks "Confirm Donation"
3. Amount validated against user balance
4. Donation recorded immediately
5. User balance decremented
6. Modal closes, alert shown

### External Payment (GCash / Online Banking)
1. User selects "GCash" or "Online Bank"
2. Clicks "Confirm Donation"
3. Payment instructions modal opens
4. User sees payment details (QR/account info)
5. User performs external payment (outside app)
6. User clicks "I have paid" button
7. Donation recorded (app has no verification)
8. Modal closes, alert shown

**Important:** External payments are **unverified**. In production, integrate:
- Payment gateway webhooks
- Bank API verification
- GCash API callbacks

---

## Validation Rules

### Registration
- All fields required
- Email must be unique
- Passwords must match
- Email format should be validated (basic check)

### Login
- Email and password required
- Must match existing user

### Donations
- Amount must be numeric and > 0
- Amount must not exceed balance (in-app payments)

### Add Cause
- Title required
- Goal amount required and must be numeric > 0

### Join Request
- User must be logged in
- No duplicate pending requests allowed
- Same user + same cause combination blocked

---

## Error Handling

Uses React Native `Alert` for user feedback:

```javascript
Alert.alert('Error', 'Please fill all fields');
Alert.alert('Success', 'Registration successful!');
Alert.alert('Info', 'You already have a pending request');
```

**Production improvements needed:**
- Replace with custom Toast/Snackbar
- Add error boundaries
- Log errors to backend/analytics
- Implement retry logic for network calls

---

## Performance Considerations

### Current Implementation
- All calculations happen synchronously
- No data caching or memoization
- Re-renders on any state change

### Optimization Opportunities
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Use `useReducer` for complex state
- Implement lazy loading for donation lists
- Add pagination for large datasets

---

## Security Notes

### Current (Not Production-Ready)
- Passwords stored in plain text
- No encryption
- No token-based authentication
- No HTTPS/SSL
- No rate limiting
- Credentials visible in test box

### Production Requirements
- Hash passwords (bcrypt)
- Use JWT for sessions
- Implement HTTPS only
- Add API rate limiting
- Validate input on both client & server
- Use environment variables for sensitive data
- Implement CORS policies
- Add SQL injection prevention (if using database)

---

## Extension Points

### To Add Features

1. **Persistent Storage**
   ```javascript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   // Save users to AsyncStorage on change
   // Load from AsyncStorage on app start
   ```

2. **Image Upload**
   ```javascript
   import * as ImagePicker from 'expo-image-picker';
   // Let admin pick image from device
   // Convert to base64 or upload to cloud
   ```

3. **Backend Connection**
   ```javascript
   const response = await fetch('https://api.example.com/causes', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(newCause)
   });
   ```

4. **Push Notifications**
   ```javascript
   import * as Notifications from 'expo-notifications';
   // Send notification to user on donation received
   ```

5. **Authentication Provider**
   ```javascript
   import { createContext } from 'react';
   const AuthContext = createContext();
   // Move auth logic to context
   ```

---

## Testing Recommendations

### Manual Testing
- Test user registration with valid/invalid data
- Test admin cause creation
- Test donations with different payment methods
- Test request approvals
- Test navigation between screens
- Test form validation

### Unit Testing (Jest + React Native Testing Library)
```javascript
test('handleDonate calculates correct donation', () => {
  // Mock states
  // Call handleDonate
  // Assert donation record created
});
```

### Integration Testing
- Test complete user registration → donation flow
- Test admin cause creation → user donation
- Test request → approval workflow

---

## Deployment

### To Publish on App Stores

1. **Build Android APK/AAB**
   ```bash
   eas build --platform android
   ```

2. **Build iOS IPA**
   ```bash
   eas build --platform ios
   ```

3. **Submit to Stores**
   - Google Play Store (Android)
   - Apple App Store (iOS)

See [Expo Documentation](https://docs.expo.dev/build/introduction/) for detailed steps.

---

## Dependencies

```json
{
  "expo": "~54.0.25",           // Expo framework
  "expo-status-bar": "~3.0.8",  // Status bar API
  "react": "19.1.0",            // React core
  "react-native": "0.81.5"      // React Native core
}
```

### To Add
- `@react-native-async-storage/async-storage` — Persistent storage
- `expo-image-picker` — Device image selection
- `react-native-qrcode-svg` — QR code generation
- `axios` or `fetch` — HTTP requests
- `react-native-gesture-handler` — Gesture handling

---

## Code Quality

### Best Practices Implemented
✅ Functional components with hooks  
✅ Component separation (screen render functions)  
✅ Consistent naming conventions  
✅ StyleSheet for optimized styling  
✅ SafeAreaView for device compatibility  
✅ Form validation before submission  

### To Improve
- [ ] Extract components into separate files
- [ ] Add TypeScript for type safety
- [ ] Use Context API for global state
- [ ] Implement custom hooks (useAuth, useDonation)
- [ ] Add ESLint & Prettier for code standards
- [ ] Add unit & integration tests
- [ ] Document JSDoc comments

---

## Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| Blank screen | Missing screen render | Check `currentScreen` state |
| Button not working | Event handler not bound | Ensure `onPress` function is passed |
| Data lost on reload | In-memory storage | Implement AsyncStorage |
| Image not showing | URL invalid | Use valid HTTP/HTTPS image URLs |
| Payment not recording | Logic error | Check `handleDonate()` function |
| Request not appearing | Filter condition wrong | Check `causeRequests.filter()` |

---

## Contact & Support

For technical questions or enhancement requests, please refer to:
- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Hooks Reference](https://react.dev/reference/react)

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Maintainer:** Development Team
