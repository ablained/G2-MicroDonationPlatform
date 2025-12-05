# Code Examples & Patterns - Micro Donation Platform

## Quick Code Reference

This document provides code snippets and patterns used in the micro donation platform.

---

## 1. State Management Examples

### Setting Up Initial State

```javascript
// User Authentication
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [users, setUsers] = useState([
  { id: 1, email: 'user@test.com', password: 'user123', name: 'Test User', type: 'user', balance: 1000 },
  { id: 2, email: 'admin@test.com', password: 'admin123', name: 'Admin User', type: 'admin' }
]);

// Causes & Donations
const [causes, setCauses] = useState([
  { id: 1, title: 'Education', description: '...', raised: 5420, goal: 10000, category: 'Education', image: '' }
]);
const [donations, setDonations] = useState([]);
const [causeRequests, setCauseRequests] = useState([]);
```

### Updating State - Adding New Item

```javascript
// Add new user after registration
const newUser = {
  id: users.length + 1,
  email,
  password,
  name,
  type: userType,
  balance: 1000
};
setUsers([...users, newUser]);

// Add new cause
const newCause = {
  id: causes.length + 1,
  title: newCauseTitle,
  description: newCauseDescription,
  raised: 0,
  goal: parseFloat(newCauseGoal),
  category: newCauseCategory,
  image: newCauseImage,
};
setCauses([newCause, ...causes]); // Add to top
```

### Updating State - Modifying Existing Item

```javascript
// Update cause with new raised amount after donation
setCauses(causes.map(c => 
  c.id === selectedCause.id 
    ? { ...c, raised: c.raised + amount } 
    : c
));

// Update request status
setCauseRequests(causeRequests.map(r => 
  r.id === reqId 
    ? { ...r, status: 'approved' } 
    : r
));

// Update user balance after donation
setCurrentUser({ ...currentUser, balance: currentUser.balance - amount });
```

### Filtering State - Getting Subset

```javascript
// Get user's donations only
const userDonations = donations.filter(d => d.userId === currentUser.id);

// Get pending requests
const pendingRequests = causeRequests.filter(r => r.status === 'pending');

// Get donations for a specific cause
const causeDonations = donations.filter(d => d.causeId === selectedCause.id);

// Calculate total
const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
```

---

## 2. Form Handling Patterns

### Input Handling

```javascript
<TextInput
  style={styles.input}
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>
```

### Form Validation

```javascript
const handleRegister = () => {
  // Check all required fields
  if (!name || !email || !password || !confirmPassword) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }
  
  // Check password match
  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }
  
  // Check unique email
  if (users.find(u => u.email === email)) {
    Alert.alert('Error', 'Email already registered');
    return;
  }
  
  // Validation passed - proceed
  // ...
};
```

### Form Reset

```javascript
const resetForm = () => {
  setEmail('');
  setPassword('');
  setName('');
  setConfirmPassword('');
};

// Call after successful submission
handleRegister();
resetForm();
setCurrentScreen('login');
```

---

## 3. Authentication Patterns

### User Login

```javascript
const handleLogin = () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }
  
  // Find user matching credentials
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    
    // Navigate to appropriate dashboard
    const destination = user.type === 'admin' ? 'adminDashboard' : 'userDashboard';
    setCurrentScreen(destination);
    
    resetForm();
  } else {
    Alert.alert('Error', 'Invalid credentials');
  }
};
```

### Session Management

```javascript
const handleLogout = () => {
  setIsLoggedIn(false);
  setCurrentUser(null);
  setCurrentScreen('home');
  resetForm();
};
```

---

## 4. Donation Flow Examples

### Creating a Donation Record

```javascript
const handleDonate = () => {
  // Validate amount
  if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
    Alert.alert('Error', 'Please enter a valid amount');
    return;
  }
  
  const amount = parseFloat(donationAmount);
  
  // Check balance only for in-app payments
  if (paymentMethod === 'balance' && amount > currentUser.balance) {
    Alert.alert('Error', 'Insufficient balance');
    return;
  }
  
  // Create donation object
  const newDonation = {
    id: donations.length + 1,
    userId: currentUser.id,
    causeId: selectedCause.id,
    amount,
    date: new Date().toLocaleDateString(),
    userName: currentUser.name,
    causeName: selectedCause.title
  };
  
  // Record donation
  setDonations([...donations, newDonation]);
  
  // Update cause progress
  setCauses(causes.map(c => 
    c.id === selectedCause.id 
      ? { ...c, raised: c.raised + amount } 
      : c
  ));
  
  // Deduct balance only if in-app payment
  if (paymentMethod === 'balance') {
    setCurrentUser({ ...currentUser, balance: currentUser.balance - amount });
  }
  
  // Close modal and show success
  setShowDonationModal(false);
  setDonationAmount('');
  Alert.alert('Success', `Thank you for donating ₱${amount.toFixed(2)} to ${selectedCause.title}!`);
};
```

### Displaying Donation History

```javascript
// In render function
{donations.filter(d => d.userId === currentUser.id).length === 0 ? (
  <Text style={styles.emptyText}>No donations yet</Text>
) : (
  donations.filter(d => d.userId === currentUser.id).map(donation => (
    <View key={donation.id} style={styles.donationCard}>
      <Text style={styles.donationTitle}>{donation.causeName}</Text>
      <Text style={styles.donationAmount}>₱{donation.amount}</Text>
      <Text style={styles.donationDate}>{donation.date}</Text>
    </View>
  ))
)}
```

---

## 5. Admin Features

### Creating a New Cause

```javascript
const handleAddCause = () => {
  // Validate inputs
  if (!newCauseTitle || !newCauseGoal) {
    Alert.alert('Error', 'Please provide title and goal amount');
    return;
  }
  
  const goal = parseFloat(newCauseGoal);
  if (isNaN(goal) || goal <= 0) {
    Alert.alert('Error', 'Please enter a valid goal amount');
    return;
  }
  
  // Create cause object
  const newCause = {
    id: causes.length + 1,
    title: newCauseTitle,
    description: newCauseDescription,
    raised: 0,
    goal,
    category: newCauseCategory,
    image: newCauseImage,
  };
  
  // Add to causes
  setCauses([newCause, ...causes]);
  
  // Close modal and reset form
  setShowAddCauseModal(false);
  setNewCauseTitle('');
  setNewCauseDescription('');
  setNewCauseGoal('');
  setNewCauseCategory('General');
  setNewCauseImage('');
  
  Alert.alert('Success', 'Cause added successfully');
};
```

### Viewing Dashboard Statistics

```javascript
const renderAdminDashboard = () => {
  // Calculate stats
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalUsers = users.filter(u => u.type === 'user').length;
  
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{totalUsers}</Text>
        <Text style={styles.statLabel}>Total Users</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{donations.length}</Text>
        <Text style={styles.statLabel}>Total Donations</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>₱{totalDonations.toFixed(2)}</Text>
        <Text style={styles.statLabel}>Total Amount</Text>
      </View>
    </View>
  );
};
```

---

## 6. Request Management Pattern

### Submitting a Join Request

```javascript
const requestToJoinCause = (cause) => {
  // Check if logged in
  if (!isLoggedIn || !currentUser) {
    Alert.alert('Info', 'Please login to request to join a cause');
    return;
  }
  
  // Check for duplicate pending request
  const existing = causeRequests.find(r => 
    r.userId === currentUser.id && 
    r.causeId === cause.id && 
    r.status === 'pending'
  );
  
  if (existing) {
    Alert.alert('Info', 'You already have a pending request for this cause');
    return;
  }
  
  // Create request
  const req = {
    id: causeRequests.length + 1,
    userId: currentUser.id,
    causeId: cause.id,
    userName: currentUser.name,
    causeTitle: cause.title,
    status: 'pending'
  };
  
  // Add to requests
  setCauseRequests([...causeRequests, req]);
  Alert.alert('Success', 'Request submitted. Admin will review it.');
};
```

### Approving/Rejecting Requests

```javascript
const approveRequest = (reqId) => {
  setCauseRequests(causeRequests.map(r => 
    r.id === reqId 
      ? { ...r, status: 'approved' } 
      : r
  ));
  Alert.alert('Success', 'Request approved');
};

const rejectRequest = (reqId) => {
  setCauseRequests(causeRequests.map(r => 
    r.id === reqId 
      ? { ...r, status: 'rejected' } 
      : r
  ));
  Alert.alert('Info', 'Request rejected');
};

// Display pending requests
{causeRequests.filter(r => r.status === 'pending').map(req => (
  <View key={req.id} style={styles.requestCard}>
    <Text>{req.userName} requested to join "{req.causeTitle}"</Text>
    <View style={{ flexDirection: 'row', marginTop: 8 }}>
      <TouchableOpacity style={styles.button} onPress={() => approveRequest(req.id)}>
        <Text style={styles.buttonText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => rejectRequest(req.id)}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  </View>
))}
```

---

## 7. Payment Method Selection

### Payment Modal with Method Selection

```javascript
<Text style={[styles.label, { marginTop: 6 }]}>Payment Method</Text>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
  <TouchableOpacity 
    onPress={() => setPaymentMethod('balance')} 
    style={[styles.methodButton, paymentMethod === 'balance' && styles.methodSelected]}
  >
    <Text style={styles.methodText}>In-App Balance</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    onPress={() => setPaymentMethod('gcash')} 
    style={[styles.methodButton, paymentMethod === 'gcash' && styles.methodSelected]}
  >
    <Text style={styles.methodText}>GCash</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    onPress={() => setPaymentMethod('online')} 
    style={[styles.methodButton, paymentMethod === 'online' && styles.methodSelected]}
  >
    <Text style={styles.methodText}>Online Bank</Text>
  </TouchableOpacity>
</View>

<TouchableOpacity 
  style={styles.button} 
  onPress={() => {
    if (paymentMethod === 'balance') {
      handleDonate();
    } else {
      setShowPaymentInstructions(true);
    }
  }}
>
  <Text style={styles.buttonText}>Confirm Donation</Text>
</TouchableOpacity>
```

### Payment Instructions Modal

```javascript
const renderPaymentInstructions = () => (
  <Modal visible={showPaymentInstructions} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {paymentMethod === 'gcash' ? 'GCash Payment' : 'Online Banking Payment'}
        </Text>
        
        {paymentMethod === 'gcash' ? (
          <View>
            <Text style={{ marginBottom: 8 }}>Send your payment to:</Text>
            <Text style={{ fontWeight: 'bold' }}>GCash: 0917-XXX-XXXX (Account Name)</Text>
          </View>
        ) : (
          <View>
            <Text style={{ marginBottom: 8 }}>Bank transfer details:</Text>
            <Text style={{ fontWeight: 'bold' }}>Bank: Example Bank</Text>
            <Text style={{ fontWeight: 'bold' }}>Account: 123456789</Text>
          </View>
        )}
        
        <Text style={{ marginTop: 12, color: '#666' }}>
          After you complete the transfer, press "I have paid"
        </Text>
        
        <TouchableOpacity 
          style={[styles.button, { marginTop: 12 }]} 
          onPress={() => { 
            setShowPaymentInstructions(false); 
            handleDonate(); 
          }}
        >
          <Text style={styles.buttonText}>I have paid</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
```

---

## 8. Navigation Pattern

### Screen Switching

```javascript
// Navigate to different screens
const navigateTo = (screen) => setCurrentScreen(screen);

// In components
<TouchableOpacity onPress={() => setCurrentScreen('userDashboard')}>
  <Text>Go to Dashboard</Text>
</TouchableOpacity>

// Main render logic
return (
  <SafeAreaView style={styles.safeArea}>
    {currentScreen === 'home' && renderHome()}
    {currentScreen === 'register' && renderRegister()}
    {currentScreen === 'login' && renderLogin()}
    {currentScreen === 'userDashboard' && renderUserDashboard()}
    {currentScreen === 'adminDashboard' && renderAdminDashboard()}
    {currentScreen === 'causeDetail' && renderCauseDetail()}
    {currentScreen === 'whereToDonate' && renderWhereToDonate()}
    
    {/* Modals always visible */}
    {renderDonationModal()}
    {renderPaymentInstructions()}
    {renderAddCauseModal()}
  </SafeAreaView>
);
```

---

## 9. Styling Patterns

### Button Styles

```javascript
const styles = StyleSheet.create({
  // Primary button
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Secondary button
  secondaryButton: {
    backgroundColor: '#03dac6',
  },
  
  // Small button
  quickButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  
  // Menu button
  menuButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
});
```

### Card Styles

```javascript
const styles = StyleSheet.create({
  causeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  donationCard: {
    backgroundColor: '#d88f8fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});
```

---

## 10. Common Utilities

### Calculation Helpers

```javascript
// Calculate progress percentage
const progress = (cause.raised / cause.goal) * 100;

// Format currency
const formattedAmount = `₱${amount.toFixed(2)}`;

// Calculate total donations
const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

// Get filtered list count
const userDonationCount = donations.filter(d => d.userId === currentUser.id).length;
```

### Data Formatting

```javascript
// Format date
const dateString = new Date().toLocaleDateString();

// Format numeric input
const numericValue = parseFloat(inputValue);

// Find item in array
const cause = causes.find(c => c.id === causeId);

// Map with conditional logic
causes.map(c => 
  c.id === targetId 
    ? { ...c, raised: c.raised + amount } 
    : c
)
```

---

## 11. Error Handling Patterns

### Try-Catch for Async Operations (Future Use)

```javascript
const handleFetchCauses = async () => {
  try {
    const response = await fetch('https://api.example.com/causes');
    const data = await response.json();
    setCauses(data);
  } catch (error) {
    Alert.alert('Error', 'Failed to load causes');
    console.error(error);
  }
};
```

### Input Validation Patterns

```javascript
// Check required field
if (!value) {
  Alert.alert('Error', 'This field is required');
  return;
}

// Check numeric range
if (amount < 0 || amount > maxAmount) {
  Alert.alert('Error', 'Amount out of range');
  return;
}

// Check duplicate
if (users.find(u => u.email === email)) {
  Alert.alert('Error', 'Email already exists');
  return;
}

// Check conditions
if (paymentMethod === 'balance' && amount > balance) {
  Alert.alert('Error', 'Insufficient balance');
  return;
}
```

---

## 12. Best Practices

### Do's ✅
```javascript
✅ Use meaningful variable names
✅ Validate user input
✅ Provide user feedback with Alerts
✅ Use StyleSheet for performance
✅ Keep functions focused and single-purpose
✅ Use filter/map for data manipulation
✅ Check for null/undefined before using
✅ Reset forms after submission
✅ Show success/error messages
```

### Don'ts ❌
```javascript
❌ Don't store passwords in plain text (use hashing)
❌ Don't make API calls without try-catch (future)
❌ Don't mutate state directly (always create new objects/arrays)
❌ Don't use inline styles (use StyleSheet)
❌ Don't render complex logic (extract to functions)
❌ Don't ignore error states
❌ Don't forget to close modals
❌ Don't leave console.logs in production
❌ Don't use string interpolation in styles
```

---

This comprehensive guide covers the most common patterns and examples used in the micro donation platform. Use these as templates when extending the application!
