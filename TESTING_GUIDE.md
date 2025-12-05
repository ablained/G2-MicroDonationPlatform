# Testing Guide - Micro-Donation Platform v2.0

## ✅ Verification Checklist

Use this guide to test all new and existing features to ensure everything works correctly.

---

## 🔐 Test Accounts

### User Account (Regular Donor)
- **Email:** user@test.com
- **Password:** user123
- **Starting Balance:** ₱5,000
- **Role:** Regular user who can donate and make requests

### Admin Account (Cause Creator)
- **Email:** admin@test.com
- **Password:** admin123
- **Role:** Admin who can create causes and approve requests

---

## 🧪 Feature Testing

### ✅ TEST 1: Authentication & Login

**Test Case 1.1 - Admin Login**
```
Steps:
1. Launch app
2. Click "Already have an account? Login"
3. Enter: admin@test.com / admin123
4. Click Login

Expected Result:
✓ Successfully logged in
✓ Redirected to Admin Dashboard
✓ Can see "Add New Cause" button
✓ Can see pending requests section
```

**Test Case 1.2 - User Login**
```
Steps:
1. Launch app
2. Click "Already have an account? Login"
3. Enter: user@test.com / user123
4. Click Login

Expected Result:
✓ Successfully logged in
✓ Redirected to User Dashboard
✓ Shows balance: ₱5,000.00
✓ Can see causes list
```

---

### ✅ TEST 2: Admin - Create Detailed Cause

**Test Case 2.1 - Create Full Featured Cause**
```
Steps:
1. Login as admin
2. Click "Add New Cause"
3. Fill form:
   - Title: "School Supplies for Rural Kids"
   - Description: "Help us provide essential school supplies"
   - Goal: 25000
   - Category: Education
   - Sub-category: School Supplies
   - Beneficiaries: 300+ children
   - Impact: Enable 300 children to continue education
   - Timeline: 3 months
   - Team: Education Advocates
   - Image: https://images.unsplash.com/photo-1427504494785-cdaf999f335f
4. Click "Create Cause"

Expected Result:
✓ Success message appears
✓ Modal closes
✓ Form fields cleared
✓ New cause visible in dashboard
✓ Has all detailed fields
```

**Test Case 2.2 - Create Cause with Validation Error**
```
Steps:
1. Login as admin
2. Click "Add New Cause"
3. Leave Title empty
4. Click "Create Cause"

Expected Result:
✓ Alert appears: "Please provide title and goal amount"
✓ Modal stays open
✓ Can continue editing form
```

---

### ✅ TEST 3: User Dashboard - Search & Filter

**Test Case 3.1 - Search Functionality**
```
Steps:
1. Login as user
2. In search bar, type "Education"
3. Observe results

Expected Result:
✓ Only causes with "Education" in title/description shown
✓ Results update in real-time
✓ Other causes are filtered out
```

**Test Case 3.2 - Category Filtering**
```
Steps:
1. Login as user
2. Click "⚙️ Filter" button
3. Filter panel appears
4. Select "Health" category
5. Click "Health" button again to toggle

Expected Result:
✓ Filter panel opens/closes smoothly
✓ Causes updated to show only selected category
✓ Purple highlight shows selected category
✓ Button changes visual state
```

**Test Case 3.3 - Sorting**
```
Steps:
1. Login as user
2. Click "📊 Recent" button
3. Causes sort by newest first
4. Click button again (now shows "📊 Top Raised")
5. Causes sort by most funded first

Expected Result:
✓ Sorting toggles between Recent and Top Raised
✓ Button label changes
✓ Cause order changes accordingly
```

---

### ✅ TEST 4: Favorites/Bookmark System

**Test Case 4.1 - Favorite a Cause**
```
Steps:
1. Login as user
2. Click on any cause to view details
3. Click heart button (🤍)
4. Button turns red (❤️)
5. Click back to dashboard
6. Notice "⭐ Favorite Causes" section appears

Expected Result:
✓ Heart button changes to red
✓ Favorite section shows on dashboard
✓ Bookmarked cause appears in favorites
✓ Can still see cause in main list
```

**Test Case 4.2 - Remove from Favorites**
```
Steps:
1. With cause favorited (red heart)
2. Click heart button again
3. Heart turns white

Expected Result:
✓ Heart button changes to white
✓ Cause removed from favorites section
✓ If no more favorites, section disappears
✓ Cause still in main list
```

---

### ✅ TEST 5: Detailed Cause Page

**Test Case 5.1 - View Cause with Full Information**
```
Steps:
1. Login as user
2. Click on any cause
3. View cause detail page

Expected Result:
✓ Large project image displays
✓ Title and status visible
✓ Progress bar shows correctly (0-100%)
✓ Raised and goal amounts formatted (₱X,XXX)
✓ Donor count displays
✓ All detail sections visible:
  - Project Details (beneficiaries, impact, timeline, team)
  - Project Updates (timeline of milestones)
  - Photo Gallery (scrollable images)
✓ Three action buttons present:
  - 💰 Donate
  - ❤️ Favorite (or 🤍 if not favorited)
  - Join
```

**Test Case 5.2 - Photo Gallery Navigation**
```
Steps:
1. On cause detail page
2. Scroll down to Photo Gallery
3. Swipe left/right or scroll horizontally

Expected Result:
✓ Multiple images display
✓ Can scroll through images
✓ Images don't overlap content
✓ Professional image sizing
```

---

### ✅ TEST 6: Donation Flow

**Test Case 6.1 - Donate via In-App Wallet**
```
Steps:
1. Login as user
2. Click "Donate" on any cause
3. Donation modal opens
4. Amount field shows (e.g., 1000)
5. Select "In-App Balance" payment method
6. Click proceed
7. Payment instructions modal opens
8. Verify balance sufficient
9. Click "I Have Paid"

Expected Result:
✓ Payment instructions show wallet balance
✓ Green checkmark: "Sufficient balance available"
✓ Donation processed
✓ Donation appears in "Your Donations"
✓ Cause balance increases
✓ User balance decreases
✓ Success message appears
```

**Test Case 6.2 - Donate via GCash**
```
Steps:
1. Login as user
2. Click "Donate" on cause
3. Enter amount: 5000
4. Select "GCash" payment method
5. Payment instructions modal opens

Expected Result:
✓ Shows "📱 GCash Payment" title
✓ Step-by-step instructions display:
  - Step 1: Open GCash App
  - Step 2: Send Money
  - Step 3: Enter Amount
  - Step 4: Confirm
✓ Shows GCash number: 0917-XXX-XXXX
✓ Shows amount to send: ₱5,000
✓ Shows instructions for proof
✓ "I Have Paid" button available
```

**Test Case 6.3 - Donate via Online Banking**
```
Steps:
1. Login as user
2. Click "Donate" on cause
3. Enter amount: 10000
4. Select "Online Banking" payment method
5. Instructions modal opens

Expected Result:
✓ Shows "🏦 Online Banking" title
✓ Bank details display:
  - Bank: Philippines National Bank (PNB)
  - Branch: Main Office, Makati
  - Account: Micro Donations PH Inc.
  - Number: 123456789012
  - SWIFT: PNBMPHMM
✓ Shows transfer steps
✓ Shows amount: ₱10,000
```

---

### ✅ TEST 7: Request to Join Cause

**Test Case 7.1 - Send Join Request**
```
Steps:
1. Login as user
2. Click on any cause detail
3. Click "Join" button
4. Check admin dashboard

Expected Result:
✓ Success message: "Request submitted. Admin will review it."
✓ Request appears in Admin Dashboard
✓ Shows: [User Name] requested [Cause Name]
✓ Approve/Reject buttons available
```

**Test Case 7.2 - Admin Approves Request**
```
Steps:
1. Login as admin
2. View pending requests in dashboard
3. Click "Approve" button

Expected Result:
✓ Request status changes to approved
✓ Success message appears
✓ Approved request moves to approved section
```

---

### ✅ TEST 8: Where to Donate (Info Page)

**Test Case 8.1 - View Payment Methods**
```
Steps:
1. Login as user
2. Click menu icon or "Where to Donate"
3. View page

Expected Result:
✓ Shows all payment methods:
  - GCash info
  - Online Banking details
  - In-App Balance info
✓ Professional formatting
✓ Clear instructions
✓ Back button works
```

---

### ✅ TEST 9: Data Display & Formatting

**Test Case 9.1 - Currency Formatting**
```
Steps:
1. Login as user
2. View cause cards
3. Check all amounts

Expected Result:
✓ All amounts use ₱ symbol
✓ Numbers formatted with commas:
  - ₱1,000 (not ₱1000)
  - ₱10,000 (not ₱10000)
  - ₱100,000 (not ₱100000)
✓ Decimal places shown for balance: ₱5,000.00
```

**Test Case 9.2 - Progress Bar Accuracy**
```
Steps:
1. Create cause with:
   - Goal: 10000
   - Raised: 5000
2. Check progress bar

Expected Result:
✓ Progress bar shows 50%
✓ Correctly calculated
✓ Visual bar filled to 50%
```

---

### ✅ TEST 10: User Experience

**Test Case 10.1 - Empty States**
```
Steps:
1. Create new user account
2. Check "Your Donations" section
3. Search for non-existent cause

Expected Result:
✓ Donations shows: "No donations yet - start supporting a cause!"
✓ Search shows: "No causes match your search"
✓ Messages are helpful and encouraging
```

**Test Case 10.2 - Navigation Flow**
```
Steps:
1. Login as user
2. Click cause → Detail page
3. Click back → Returns to dashboard
4. Click favorite → Highlights correctly
5. Click donate → Payment flow works
6. Logout → Returns to home

Expected Result:
✓ Navigation smooth
✓ No stuck states
✓ Back buttons work
✓ Data persists correctly
```

---

## 🔍 Bug Testing Scenarios

### Scenario 1: Boundary Testing
```
Test: Very large donation amount
- Try donating ₱999,999,999
Expected: Either accepts or shows error gracefully

Test: Invalid characters in search
- Type special characters in search bar
- Expected: No crash, handles gracefully

Test: Very long text fields
- Enter 1000-character description
- Expected: Displays or truncates gracefully
```

### Scenario 2: State Management
```
Test: Rapid clicking
- Rapidly click donate, filter, sort buttons
- Expected: No duplication or errors

Test: Multiple filters
- Apply search + category + sort simultaneously
- Expected: All work together correctly
```

---

## 📱 Platform Testing

### iOS Simulator
```
✓ Launch on iOS
✓ Test all features
✓ Check layout on iPhone SE, 11, 12, 13
✓ Verify image display
✓ Test scrolling smoothness
```

### Android Emulator
```
✓ Launch on Android
✓ Test all features
✓ Check layout on various screen sizes
✓ Verify image display
✓ Test keyboard handling
```

### Web (Browser)
```
✓ Launch in web browser
✓ Test responsive layout
✓ Verify all features work
✓ Check cross-browser compatibility
```

---

## 📊 Performance Testing

### Load Testing
```
Create 20+ causes with full details
- Search among many causes: Should be instant
- Filter causes: Should be instant
- Sort causes: Should be instant
- No lag observed
```

### Memory Testing
```
- Open and close modals repeatedly
- No memory leaks
- App remains responsive
```

---

## ✨ Visual Quality Testing

### Colors & Styling
```
✓ Primary purple (#6200ea) consistent
✓ Success green (#28a745) visible
✓ Error red (#d32f2f) clear
✓ Proper contrast for accessibility
✓ All text readable
```

### Typography
```
✓ Section titles prominent
✓ Labels clear and organized
✓ Body text readable
✓ Proper spacing between elements
✓ Emoji indicators visible
```

### Images
```
✓ Images load from URLs
✓ Images display correctly sized
✓ Images don't distort
✓ Fallbacks work if image fails
```

---

## ✅ Final Verification Checklist

- [ ] Admin can create detailed causes with all fields
- [ ] User can search causes in real-time
- [ ] User can filter by category
- [ ] User can sort by recent/top raised
- [ ] User can favorite/bookmark causes
- [ ] Cause detail page shows all information
- [ ] Photo gallery displays and scrolls
- [ ] User can donate via all 3 payment methods
- [ ] Payment instructions are clear
- [ ] User can request to join a cause
- [ ] Admin can approve/reject requests
- [ ] Donations appear in user history
- [ ] Currency displays correctly formatted
- [ ] Progress bars calculate accurately
- [ ] All navigation works smoothly
- [ ] No console errors appear
- [ ] App responds to all interactions
- [ ] Search returns correct results
- [ ] Favorites persist during session
- [ ] Empty states show helpful messages

---

## 📝 Test Report Template

```
TEST REPORT - Micro-Donation Platform v2.0

Date: [Date]
Tester: [Name]
Platform: [iOS/Android/Web]

PASSED TESTS: __/20
FAILED TESTS: __/20

Issues Found:
1. [Issue description]
   - Expected: [Expected behavior]
   - Actual: [Actual behavior]
   - Severity: [Critical/High/Medium/Low]

2. [Issue description]
   ...

RECOMMENDATIONS:
1. [Recommendation]
2. [Recommendation]

OVERALL STATUS: ✓ PASS / ❌ FAIL
```

---

## 🎯 Success Criteria

The app is ready for production when:
- ✅ All 20+ test cases pass
- ✅ No critical bugs found
- ✅ Performance acceptable
- ✅ Visual design consistent
- ✅ Navigation smooth
- ✅ Data displays correctly
- ✅ All features function as designed

---

## 🚀 Next Steps

After testing:
1. Document any issues found
2. Fix critical bugs first
3. Run regression testing
4. Get stakeholder approval
5. Deploy to production

---

**Last Updated:** 2024
**Version:** 2.0
**Status:** Ready for Testing
