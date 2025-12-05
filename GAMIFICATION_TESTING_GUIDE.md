# 🧪 Gamification Testing Guide

## Step-by-Step Testing Instructions

Complete these steps to verify all gamification features work correctly.

---

## 🚀 Pre-Testing Setup

### Prerequisites
- ✅ App installed and dependencies loaded
- ✅ App runs without errors (`npm start` successful)
- ✅ Test account available: user@test.com / user123

### Test Environment
- Test on any device (Android/iOS/Web)
- Have pen & paper ready to track results
- Approximately 10-15 minutes per complete test cycle

---

## 🧪 Test Case 1: First Donation & Bronze Badge

### Scenario
New user makes their first donation of ₱50+

### Steps

**Step 1: Login**
1. Launch app
2. Click "Login" on home screen
3. Email: `user@test.com`
4. Password: `user123`
5. ✅ Should show welcome message and go to dashboard

**Step 2: Check Initial Profile**
1. Look at "🏆 Your Profile" section
2. ✅ Rank should be "New Donor"
3. ✅ Total Donated: ₱0
4. ✅ Points: 0
5. ✅ No badges shown yet

**Step 3: Select Cause**
1. Scroll down to causes list
2. Click any cause (e.g., "Education for Children")
3. ✅ Should open cause detail page

**Step 4: Donate ₱50**
1. Click "💰 Donate" button
2. Enter amount: `50`
3. Select payment method: "In-App Balance"
4. Click "Donate" button
5. ✅ Modal should show: "Thank you for donating ₱50!"

**Step 5: Verify Achievement Popup**
1. 🎉 Modal should appear with:
   - Icon: 🥉
   - Title: "🎉 Achievement Unlocked! 🎉"
   - Name: "Bronze Donor"
   - Message: "You reached Bronze Donor! 🥉"
2. ✅ Click "Awesome! 🎊" button

**Step 6: Check Updated Profile**
1. Should return to dashboard
2. ✅ "🏆 Your Profile" now shows:
   - Rank: "Bronze Donor" with 🥉 emoji
   - Total Donated: ₱50
   - Points: 50
   - 1 Badge shown: 🥉

### Expected Results
- ✅ Bronze badge unlocked
- ✅ Achievement modal appeared
- ✅ Profile updated
- ✅ Donation recorded
- ✅ Points calculated

### Pass/Fail: ___________

---

## 🧪 Test Case 2: Leaderboard Ranking

### Scenario
User can view leaderboard and see their ranking

### Steps

**Step 1: Navigate to Leaderboard**
1. From dashboard, click "🏅 Leaderboard" button
2. ✅ Should open leaderboard screen

**Step 2: Verify Leaderboard Content**
1. ✅ Title should be "🏆 Leaderboard"
2. ✅ Subtitle: "Top Donors This Month"
3. ✅ Should show at least 1 user (you)
4. ✅ Your name should be visible
5. ✅ Your donation amount shown (₱50)
6. ✅ Your points shown (50)

**Step 3: Check Ranking Display**
1. ✅ #1 position should have 🥇 icon
2. ✅ (If multiple users) #2 has 🥈, #3 has 🥉
3. ✅ Other positions show numeric rank (#4, #5, etc)

**Step 4: Verify Sorting**
1. ✅ Users sorted by total donated (highest first)
2. ✅ Your ₱50 donation is in correct position

**Step 5: Go Back**
1. Click "Back to Dashboard" button
2. ✅ Should return to dashboard

### Expected Results
- ✅ Leaderboard displays correctly
- ✅ Users sorted by donations
- ✅ Medal icons appear for top 3
- ✅ Your ranking visible
- ✅ Navigation works

### Pass/Fail: ___________

---

## 🧪 Test Case 3: Achievements Dashboard

### Scenario
User can view all 8 possible achievements

### Steps

**Step 1: Navigate to Achievements**
1. From dashboard, click "🎯 Achievements" button
2. ✅ Should open achievements screen

**Step 2: Verify Page Layout**
1. ✅ Title: "🎯 Achievements"
2. ✅ Subtitle: "Unlock badges and reach new heights!"
3. ✅ Progress text: "You have unlocked 1 / 8 badges"

**Step 3: Check All 8 Badges Displayed**
1. Scroll through and verify all badges shown:
   - ✅ 💎 Platinum Donor (Locked)
   - ✅ 🥇 Gold Donor (Locked)
   - ✅ 🥈 Silver Donor (Locked)
   - ✅ 🥉 Bronze Donor (**Unlocked** ✓)
   - ✅ 🔥 Streak Champion (Locked)
   - ✅ 🎨 Variety Hero (Locked)
   - ✅ 📱 Social Advocate (Locked)
   - ✅ 🚀 Impact Champion (Locked)

**Step 4: Verify Badge Status**
1. Bronze Donor should show: "[✓ Unlocked]"
2. Others should show: "[Locked]"
3. Each badge should show description (e.g., "Donated ₱50+")

**Step 5: Go Back**
1. Click "Back to Dashboard" button
2. ✅ Should return to dashboard

### Expected Results
- ✅ All 8 badges display
- ✅ Correct unlock status
- ✅ Bronze shown as unlocked
- ✅ Others shown as locked
- ✅ Navigation works

### Pass/Fail: ___________

---

## 🧪 Test Case 4: Unlock Silver Badge

### Scenario
User makes additional donations to reach ₱200 total and unlocks Silver badge

### Steps

**Step 1: Make Second Donation**
1. From dashboard, select a different cause
2. Click "💰 Donate"
3. Enter amount: `100`
4. Select payment method: "In-App Balance"
5. ✅ Should show success message

**Step 2: Verify No Achievement (yet)**
1. ✅ NO modal should appear (total is ₱150)
2. ✅ Progress shows ₱150 total

**Step 3: Make Third Donation**
1. Select another cause
2. Click "💰 Donate"
3. Enter amount: `50`
4. Select payment method: "In-App Balance"
5. ✅ Should show success message

**Step 4: Verify Achievement Popup**
1. 🎉 Modal should appear with:
   - Icon: 🥈
   - Name: "Silver Donor"
   - Message: "You reached Silver Donor! 🥈"
2. ✅ Click "Awesome! 🎊"

**Step 5: Check Updated Profile**
1. ✅ Total Donated: ₱200
2. ✅ Points: 200
3. ✅ Rank: "Silver Donor" with 🥈
4. ✅ Badges: Shows 🥉 and 🥈

**Step 6: Verify Leaderboard Update**
1. Click "🏅 Leaderboard"
2. ✅ Your amount should show ₱200
3. ✅ Your points should show 200

**Step 7: Verify Achievements Update**
1. Click "🎯 Achievements"
2. ✅ Progress: "2 / 8 badges"
3. ✅ Silver Donor marked "✓ Unlocked"

### Expected Results
- ✅ Silver badge unlocked
- ✅ Achievement modal appeared
- ✅ Profile shows both badges
- ✅ Leaderboard updated
- ✅ Achievements updated

### Pass/Fail: ___________

---

## 🧪 Test Case 5: Points Calculation

### Scenario
Verify points are calculated correctly for various donation amounts

### Test Data

| Donation | Expected Points | Actual | Status |
|----------|-----------------|--------|--------|
| ₱10 | 10 | ___ | ___ |
| ₱25 | 20 | ___ | ___ |
| ₱50 | 50 | ___ | ___ |
| ₱100 | 100 | ___ | ___ |
| ₱250 | 250 | ___ | ___ |

### Steps

1. For each donation amount above:
   - Make a donation
   - Check updated points in profile
   - Record actual points earned
   - Compare to expected

✅ All should match expected values

### Expected Results
- ✅ Points = Amount (₱100 = 100 pts)
- ✅ Rounding: floor to nearest 10
- ✅ Consistent across all donations

### Pass/Fail: ___________

---

## 🧪 Test Case 6: Rank Updates

### Scenario
Verify user rank updates correctly at each threshold

### Ranks to Test

| Total Donated | Expected Rank | Actual | Verified |
|---------------|---------------|--------|----------|
| ₱0 | New Donor | ___ | ___ |
| ₱50+ | Bronze Donor | ___ | ___ |
| ₱200+ | Silver Donor | ___ | ___ |
| ₱500+ | Gold Donor | ___ | ___ |
| ₱1000+ | Platinum Donor | ___ | ___ |

### Steps

1. Make donations in increments to hit each threshold
2. After each tier, check profile
3. Verify rank updated correctly

### Expected Results
- ✅ Rank shows correct emoji
- ✅ Rank updates automatically
- ✅ All transitions work

### Pass/Fail: ___________

---

## 🧪 Test Case 7: Data Persistence

### Scenario
User data persists after logout and login

### Steps

**Step 1: Note Current Stats**
1. From dashboard, note:
   - Rank: ___________
   - Total Donated: ___________
   - Points: ___________
   - Badge count: ___________

**Step 2: Logout**
1. Click "Logout" button
2. ✅ Should return to home screen

**Step 3: Login Again**
1. Click "Login"
2. Email: user@test.com
3. Password: user123
4. ✅ Should show dashboard again

**Step 4: Verify Data**
1. Check "🏆 Your Profile"
2. ✅ Rank: Same as Step 1
3. ✅ Total Donated: Same as Step 1
4. ✅ Points: Same as Step 1
5. ✅ Badges: Same as Step 1

### Expected Results
- ✅ All data persists
- ✅ Stats unchanged
- ✅ Badges still shown

### Pass/Fail: ___________

---

## 🧪 Test Case 8: UI/UX Testing

### Scenario
Verify all UI elements render correctly and are responsive

### Checklist

**Profile Card**
- [ ] Shows rank with emoji
- [ ] Shows total donated amount
- [ ] Shows points
- [ ] Shows category count
- [ ] Shows badge icons
- [ ] Properly formatted and readable

**Dashboard Buttons**
- [ ] "🏅 Leaderboard" button visible
- [ ] "🎯 Achievements" button visible
- [ ] Buttons clickable
- [ ] Button colors visible

**Leaderboard Screen**
- [ ] Title visible
- [ ] User entries formatted well
- [ ] Medal icons show for top 3
- [ ] Back button functional

**Achievements Screen**
- [ ] Title visible
- [ ] All 8 badges visible
- [ ] Lock/unlock icons clear
- [ ] Descriptions readable
- [ ] Back button functional

**Achievement Modal**
- [ ] Centered on screen
- [ ] Icon visible (large emoji)
- [ ] Text readable
- [ ] Button clickable
- [ ] Dismiss works

### Expected Results
- ✅ All UI elements visible
- ✅ Responsive layout
- ✅ Proper colors and formatting
- ✅ Navigation smooth

### Pass/Fail: ___________

---

## 🧪 Test Case 9: Error Handling

### Scenario
App handles edge cases gracefully

### Test Scenarios

1. **Negative Donation**
   - Try to donate ₱-50
   - ✅ Should show error message

2. **Zero Donation**
   - Try to donate ₱0
   - ✅ Should show error message

3. **Insufficient Balance**
   - Try to donate more than balance
   - ✅ Should show error message

4. **Empty Leaderboard**
   - (If no donations) Check leaderboard
   - ✅ Should show "No donors yet"

### Expected Results
- ✅ All errors handled
- ✅ Clear error messages
- ✅ No crashes

### Pass/Fail: ___________

---

## 🧪 Test Case 10: Multi-User Leaderboard

### Scenario
Leaderboard correctly ranks multiple users

### Steps

**Create Test Data** (if needed):
1. Create second test account (e.g., test2@test.com)
2. Make donation as user 2 (₱300)
3. Login as original user
4. Make donation (₱100)

**Check Leaderboard**:
1. Click "🏅 Leaderboard"
2. ✅ User 2 should rank higher (₱300 > ₱100)
3. ✅ Correct order shown

### Expected Results
- ✅ Multi-user ranking works
- ✅ Sorting by donation amount
- ✅ Correct order displayed

### Pass/Fail: ___________

---

## 📋 Summary Test Results

| Test Case | Result | Notes |
|-----------|--------|-------|
| 1. First Donation & Bronze | _____ | __________ |
| 2. Leaderboard | _____ | __________ |
| 3. Achievements | _____ | __________ |
| 4. Silver Badge | _____ | __________ |
| 5. Points Calculation | _____ | __________ |
| 6. Rank Updates | _____ | __________ |
| 7. Data Persistence | _____ | __________ |
| 8. UI/UX | _____ | __________ |
| 9. Error Handling | _____ | __________ |
| 10. Multi-User | _____ | __________ |

---

## ✅ Final Verification

- [ ] All 10 test cases passed
- [ ] No console errors
- [ ] No crashes encountered
- [ ] Features work as expected
- [ ] Ready for production

---

## 🐛 Issues Found

List any bugs or issues discovered:

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## 🎊 Testing Complete!

**Status:** Ready for production ✅

**Tested by:** ________________
**Date:** ________________
**Time spent:** ________________ minutes

