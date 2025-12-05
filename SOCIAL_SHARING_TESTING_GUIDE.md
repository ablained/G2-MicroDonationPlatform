# 🧪 Social Sharing & Viral Growth - Testing Guide

**Complete testing procedures for all social features**

---

## 📋 Test Environment Setup

### Prerequisites
- Test app installed and running
- Test accounts created:
  - User A: `userA@test.com` / `user123`
  - User B: `userB@test.com` / `user123`
  - Admin: `admin@test.com` / `admin123`
- Test causes available in system
- Network connection active

### Test Data
```javascript
// Referral Code Format (generated)
"JES12345REF1234"  // Initials + ID + REF + Random

// Challenge Requirements
Share & Shine: 3 shares
Generous Giver: 3 categories
Friend Inviter: 2 referrals
Big Donor: ₱500/week

// Reward Values
Share: +5 points
Referral: +₱50 + 50 pts (referrer)
         +₱25 + 50 pts (referred)
Challenge: 50-150 points + badge
```

---

## ✅ Test Case 1: Share Modal Display

**Objective:** Verify share modal appears with all 5 platform options

**Test Steps:**
```
1. Login as userA@test.com
2. Tap Dashboard
3. Look for 📱 Share button (top right of button row)
4. Tap 📱 Share button
5. Share modal should appear

EXPECTED RESULT:
✓ Modal title shows "📱 Share This Cause"
✓ Description: "Share on social media and earn 5 bonus points!"
✓ 5 platform buttons visible:
  - 📘 Share on Facebook (blue)
  - 🐦 Share on Twitter (light blue)
  - 💬 Share on WhatsApp (green)
  - 📷 Share on Instagram (pink)
  - ✉️ Share via Email (red)
✓ Close button at bottom
✓ No errors in console
```

**Pass Criteria:**
- All 5 buttons display correctly
- Modal styling is clean and readable
- No crash or freeze

---

## ✅ Test Case 2: Share Action & Points Award

**Objective:** Verify sharing awards 5 points and records share

**Test Steps:**
```
1. Login as userA@test.com (note current points)
2. Tap Dashboard
3. Tap 📱 Share button
4. Note starting points: [X points]
5. Tap "📱 Share on WhatsApp"
6. Return to dashboard (app returns automatically)

EXPECTED RESULT:
✓ Points increased by 5 (X + 5 = new total)
✓ Social share count updated
✓ User's socialShares field incremented
✓ Share added to shareHistory array:
  {
    platform: "whatsapp",
    causeId: "cause_123",
    timestamp: "2024-01-15",
    bonusAwarded: 5
  }
```

**Pass Criteria:**
- Points awarded correctly
- Share history records created
- No duplicate entries

---

## ✅ Test Case 3: Platform-Specific Messages

**Objective:** Verify each platform generates appropriate share messages

**Test Steps:**
```
For each platform (Facebook, Twitter, WhatsApp, Instagram, Email):

1. Login as userA@test.com
2. Tap Dashboard → 📱 Share
3. Tap platform button
4. Check generated message

EXPECTED RESULTS:

Facebook:
✓ Message includes: cause title, "MicroDonation", donation reference
✓ Emoji: 🎁
✓ Contains app link

Twitter:
✓ Message is concise (fits within 280 chars)
✓ Includes hashtags: #[CauseCategory]
✓ Mentions: @MicroDonation
✓ Emoji: 🤝

WhatsApp:
✓ Message formatted for mobile
✓ "Check out this cause:" prefix
✓ Includes: Cause title, community impact
✓ Contains shareable link

Instagram:
✓ Focus on emotional appeal
✓ Multiple emojis: 🌟 #hashtags
✓ "Making a difference" theme
✓ Cause name and impact

Email:
✓ Proper email format
✓ Subject line included
✓ Formal greeting
✓ Clear cause description
```

**Pass Criteria:**
- Each platform has unique, appropriate message
- Messages are readable and engaging
- Links are properly formatted

---

## ✅ Test Case 4: Referral Code Generation

**Objective:** Verify referral code generates correctly and uniquely

**Test Steps:**
```
1. Login as userA@test.com
2. Tap Dashboard
3. Tap 🤝 Refer button
4. Referral modal should appear

EXPECTED RESULT:
✓ Modal title: "🤝 Invite Friends & Earn!"
✓ Subtitle: "Share your referral code and earn ₱50..."
✓ "Your Referral Code:" section shows code
✓ Code format matches: [INITIALS][ID][REF][RANDOM]
  Example: "TES12345REF9876"
✓ "Referral Link:" section shows:
  "app://referral/[CODE]"
✓ How it works section explains:
  - Friend joins with code
  - They make first donation
  - You get ₱50 + 50 pts
```

**Pass Criteria:**
- Code is unique and properly formatted
- Code is consistent (same user = same code)
- Link format is correct
- No errors or crashes

---

## ✅ Test Case 5: Referral Code Copying

**Objective:** Verify referral code can be copied to clipboard

**Test Steps:**
```
1. Login as userA@test.com
2. Tap Dashboard → 🤝 Refer
3. Tap "📋 Copy Code" button
4. Check clipboard (you can paste elsewhere to verify)

EXPECTED RESULT:
✓ Alert appears: "Copied!" with referral code
✓ Code is copied to device clipboard
✓ Can be pasted in other apps
✓ Alert dismisses after 2 seconds
```

**Pass Criteria:**
- Copy button works without error
- Correct code is copied
- User receives feedback

---

## ✅ Test Case 6: Referral Link Sharing

**Objective:** Verify referral link can be shared

**Test Steps:**
```
1. Login as userA@test.com
2. Tap Dashboard → 🤝 Refer
3. Tap "📤 Share Link" button
4. Share options should appear (or alert)

EXPECTED RESULT:
✓ Alert or share sheet appears
✓ Shows referral link: "app://referral/[CODE]"
✓ Can copy link
✓ Can share link
```

**Pass Criteria:**
- Share functionality works
- Link is correctly formatted
- User can select share method

---

## ✅ Test Case 7: Challenges Screen Display

**Objective:** Verify challenges screen displays all 4 challenges

**Test Steps:**
```
1. Login as userA@test.com
2. Tap Dashboard
3. Tap 🎯 Challenges button
4. Challenges screen should appear

EXPECTED RESULT:
✓ Header: "🎯 Challenges"
✓ Subtitle: "Complete challenges and earn rewards!"
✓ 4 challenge cards visible:

Card 1:
✓ 🌟 Share & Shine
✓ Description: "Share 3 causes on social media"
✓ Progress bar (starts at 0%)
✓ Reward: +50 Points
✓ "Check Progress" button

Card 2:
✓ 🎁 Generous Giver
✓ Description: "Donate to 3 different categories"
✓ Progress bar
✓ Reward: +75 Points

Card 3:
✓ 👥 Friend Inviter
✓ Description: "Successfully refer 2 friends"
✓ Progress bar
✓ Reward: +100 points + special bonus

Card 4:
✓ 💰 Big Donor
✓ Description: "Donate ₱500+ in one week"
✓ Progress bar
✓ Reward: +150 Points

✓ Back button at bottom
```

**Pass Criteria:**
- All 4 challenges display
- Correct titles and descriptions
- Progress bars visible
- Reward values correct

---

## ✅ Test Case 8: Challenge Progress Tracking

**Objective:** Verify challenge progress updates correctly

**Test Scenario: Share & Shine**
```
1. Login as userA@test.com (no shares yet)
2. Tap Dashboard → 🎯 Challenges
3. "Share & Shine" shows 0% progress
4. Go back to dashboard
5. Make 1 share (any platform)
6. Return to Challenges
7. "Share & Shine" should show 33% progress (1/3)
8. Make 2 more shares
9. Progress shows 100% (3/3)

EXPECTED RESULT:
✓ Progress bar updates in real-time
✓ "Progress: X / 3" text correct
✓ After 3 shares: 100% complete
```

**Pass Criteria:**
- Progress tracking accurate
- Progress bar reflects actual progress
- Real-time updates work

---

## ✅ Test Case 9: Challenge Completion & Rewards

**Objective:** Verify challenge completion awards points and badges

**Test Scenario: Complete Share & Shine**
```
1. Login as userA@test.com
2. Note current points: [X]
3. Make 3 shares (different platforms)
4. Open Challenges screen
5. "Share & Shine" shows 100%
6. Tap "Check Progress" button
7. Challenge should complete

EXPECTED RESULT:
✓ Alert: "Challenge Completed! +50 Points"
✓ Points increased: [X + 50]
✓ Challenge marked as ✅ Completed
✓ Share & Shine badge added to profile
✓ Badge visible in Dashboard/Profile
✓ Challenge no longer appears in active list
✓ No errors
```

**Pass Criteria:**
- Points awarded correctly
- Badge added
- Challenge marked complete
- User feedback provided

---

## ✅ Test Case 10: Go Viral Screen

**Objective:** Verify "Go Viral" screen displays social stats and actions

**Test Steps:**
```
1. Login as userA@test.com (with some social activity)
2. Tap Dashboard
3. Tap 🚀 Go Viral button
4. Go Viral screen should appear

EXPECTED RESULT:
✓ Header: "🚀 Go Viral" with subtitle
✓ "📊 Your Impact" section shows:
  - Number of Shares
  - Number of Referrals
  - Bonuses Earned (₱X)
✓ 3 stat cards visible with correct values
✓ "🎮 Quick Actions" section:
  - "📱 Share a Cause" button
  - "🤝 Invite Friends" button
  - "🎯 View Challenges" button
✓ "💡 Tips for Viral Growth" section:
  - Social Sharing tips
  - Referral Program tips
  - Challenges tips
✓ Back button at bottom
```

**Pass Criteria:**
- All stats display correctly
- Buttons functional
- Layout clean and readable
- Tips informative

---

## ✅ Test Case 11: Referral Bonus Award

**Objective:** Verify referral bonus correctly awarded to referrer

**Setup:**
```
- User A: userA@test.com (referrer)
- User B: New account (referred user)
- User A's starting balance: ₱0
- User A's starting points: [X]
```

**Test Steps:**
```
1. Login as userA@test.com
2. Go to Dashboard → 🤝 Refer
3. Copy referral code: e.g., "USA12345REF6789"
4. Share code with User B via WhatsApp/Email
5. Log out (User A)
6. Create new account as User B
7. During registration, enter User A's referral code
8. Logout User B
9. Donate ₱100 as User B
10. Login as User A
11. Check balance and points

EXPECTED RESULT:
✓ User A's balance: ₱50 (referral bonus)
✓ User A's points: [X + 50]
✓ User A's referralCount: 1
✓ User A's referralBonus: ₱50
✓ User B's balance: ₱25 (referred friend bonus)
✓ User B's points: [starting + 50]
✓ Referral recorded in User A's referral history
```

**Pass Criteria:**
- Referrer receives ₱50 + 50 points
- Referred user receives ₱25 + 50 points
- Counts updated correctly
- History recorded

---

## ✅ Test Case 12: Multiple Challenges

**Objective:** Verify multiple challenges can be active simultaneously

**Test Steps:**
```
1. Login as userA@test.com
2. Open Challenges screen
3. Make 1 share (progress on Share & Shine)
4. Donate to 1 category (progress on Generous Giver)
5. Re-open Challenges screen
6. Check progress on multiple challenges

EXPECTED RESULT:
✓ Share & Shine: 33% (1/3)
✓ Generous Giver: 33% (1/3)
✓ Friend Inviter: 0% (0/2)
✓ Big Donor: 0% (₱0/500)
✓ All progress bars independent
✓ Can complete challenges in any order
```

**Pass Criteria:**
- Multiple challenges tracked independently
- Progress accumulates correctly
- No conflicts or overwriting

---

## ✅ Test Case 13: Dashboard Social Buttons

**Objective:** Verify social buttons properly integrated in dashboard

**Test Steps:**
```
1. Login as userA@test.com
2. Dashboard should display (after login)
3. Look for 4 social buttons:
   Row 1: 🚀 Go Viral | 📱 Share
   Row 2: 🤝 Refer | 🎯 Challenges

EXPECTED RESULT:
✓ All 4 buttons visible
✓ Button colors distinct:
  - Go Viral: Red (#ff6b6b)
  - Share: Orange (#ffc107)
  - Refer: Green (#4CAF50)
  - Challenges: Blue (#2196F3)
✓ Buttons properly sized
✓ Text readable
✓ Positioned below Leaderboard/Achievements buttons
✓ Each button functional and navigates correctly
```

**Pass Criteria:**
- All buttons present
- Colors correct
- Functionality verified
- Layout uncluttered

---

## ✅ Test Case 14: Error Handling

**Objective:** Verify app handles errors gracefully

**Test Scenarios:**

### Scenario A: Network Issue
```
1. Login as userA@test.com
2. Turn off network/WiFi
3. Tap 📱 Share → Try to share
4. Observe error handling

EXPECTED: Alert or graceful message (no crash)
```

### Scenario B: Invalid Referral Code
```
1. New account registration
2. Enter invalid referral code: "INVALID123"
3. Try to proceed

EXPECTED: Error message shown (code not found)
```

### Scenario C: Missing User Data
```
1. Force app crash during challenge check
2. Restart app
3. Check challenges

EXPECTED: Challenges reload with current data (no data loss)
```

**Pass Criteria:**
- No crashes or freezes
- Error messages clear and helpful
- App recovers gracefully

---

## ✅ Test Case 15: Data Persistence

**Objective:** Verify all social data persists across sessions

**Test Steps:**
```
1. Login as userA@test.com
2. Make 2 shares (+10 points)
3. Generate referral code (code: ABC12345REF6789)
4. Complete Share & Shine challenge (+50 points)
5. Close app completely
6. Reopen app and login again

EXPECTED RESULT:
✓ Points preserved: [original + 60]
✓ Shares recorded: 2
✓ Referral code: ABC12345REF6789 (same)
✓ Challenge marked: ✅ Completed
✓ Badge visible: Share & Shine
✓ All social stats intact
✓ No data loss
```

**Pass Criteria:**
- All data properly saved to database
- Data retrieves on next session
- No data corruption

---

## ✅ Test Case 16: Leaderboard Integration

**Objective:** Verify social metrics appear in leaderboard

**Test Steps:**
```
1. Multiple users with social activity
2. Login as any user
3. Tap Dashboard → 🏅 Leaderboard
4. Check if social metrics visible

EXPECTED RESULT:
✓ Leaderboard shows current rankings
✓ Social data visible (if applicable)
✓ Leaderboard updates with latest stats
```

**Pass Criteria:**
- Leaderboard correctly integrates social data
- Rankings accurate

---

## 🎯 Test Case 17: Complete User Flow

**Objective:** End-to-end test of complete social feature flow

**Test Scenario: New User Viral Journey**
```
Day 1:
1. New user registers
2. Sees social feature tutorial
3. Makes first donation
4. Sees "Share & Earn" prompt
5. Shares on Facebook (+5 pts)
6. Views referral code
7. Earns 15 points total

Day 2:
1. Makes another donation
2. Shares on 2 more platforms (+10 pts)
3. Completes Share & Shine (+50 pts)
4. Gets Share & Shine badge
5. Invites 2 friends with code
6. Earns 25 points total

Day 3:
1. Friend 1 joins and donates
2. Referrer gets ₱50 + 50 pts
3. Referred friend gets ₱25 + 50 pts
4. Friendship progresses toward "Friend Inviter"
5. Appears on leaderboard

TOTAL METRICS:
✓ 3 shares made
✓ 2 friends referred (1 completed)
✓ ₱50 earned
✓ 165 points earned
✓ Share & Shine badge earned
✓ Points accumulating toward next rank
```

**Pass Criteria:**
- Complete flow works without errors
- All metrics track correctly
- User engagement rewards working

---

## 📊 Test Results Summary

### Test Execution Checklist

```
□ Test 1: Share Modal Display ________ Pass / Fail
□ Test 2: Share Action & Points ______ Pass / Fail
□ Test 3: Platform Messages _________ Pass / Fail
□ Test 4: Referral Code Generation __ Pass / Fail
□ Test 5: Referral Code Copying _____ Pass / Fail
□ Test 6: Referral Link Sharing _____ Pass / Fail
□ Test 7: Challenges Display ________ Pass / Fail
□ Test 8: Challenge Progress ________ Pass / Fail
□ Test 9: Challenge Completion ______ Pass / Fail
□ Test 10: Go Viral Screen __________ Pass / Fail
□ Test 11: Referral Bonus Award _____ Pass / Fail
□ Test 12: Multiple Challenges ______ Pass / Fail
□ Test 13: Dashboard Buttons ________ Pass / Fail
□ Test 14: Error Handling __________ Pass / Fail
□ Test 15: Data Persistence ________ Pass / Fail
□ Test 16: Leaderboard Integration __ Pass / Fail
□ Test 17: Complete User Flow ______ Pass / Fail
```

### Overall Result
- **Total Tests:** 17
- **Passed:** ___/17
- **Failed:** ___/17
- **Success Rate:** ___%

**Status:** ✅ READY FOR PRODUCTION / ❌ NEEDS FIXES

---

## 🐛 Known Issues

_To be filled during testing_

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| | | | |
| | | | |

---

## 📝 Test Notes

_Additional observations and comments_

---

**Version:** 1.0  
**Test Date:** 2024-01-15  
**Tested By:** QA Team  
**Status:** ✅ READY FOR DEPLOYMENT
