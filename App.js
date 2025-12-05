import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Registration/Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Donation States
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('balance');
  const [showAddCauseModal, setShowAddCauseModal] = useState(false);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [causeRequests, setCauseRequests] = useState([]);
  
  // Enhanced Payment Methods States
  const [paymentTransactions, setPaymentTransactions] = useState([]);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [paymentMethodDetails, setPaymentMethodDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cryptoAddress: '',
    selectedBNPL: 'installments-3'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [favoritesCauses, setFavoritesCauses] = useState([]);
  
  // Gamification States
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  
  // Social Sharing & Viral Growth States
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [socialShares, setSocialShares] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showChallengeDetail, setShowChallengeDetail] = useState(false);
  
  // Enhanced Admin Cause Creation States
  const [newCauseTitle, setNewCauseTitle] = useState('');
  const [newCauseDescription, setNewCauseDescription] = useState('');
  const [newCauseGoal, setNewCauseGoal] = useState('');
  const [newCauseCategory, setNewCauseCategory] = useState('Education');
  const [newCauseSubcategory, setNewCauseSubcategory] = useState('');
  const [newCauseBeneficiaries, setNewCauseBeneficiaries] = useState('');
  const [newCauseImpact, setNewCauseImpact] = useState('');
  const [newCauseTimeline, setNewCauseTimeline] = useState('');
  const [newCauseImage, setNewCauseImage] = useState('https://via.placeholder.com/300x200?text=Cause+Image');
  const [newCauseTeam, setNewCauseTeam] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mock Data
  const [users, setUsers] = useState([
    { 
      id: 1, 
      email: 'user@test.com', 
      password: 'user123', 
      name: 'Test User', 
      type: 'user', 
      balance: 1000,
      totalDonated: 0,
      points: 0,
      donationStreak: 0,
      categoriesDonatedTo: [],
      badges: [],
      rank: 'New Donor',
      completedCauses: 0,
      // Social Sharing Fields
      referralCode: 'USER' + Math.floor(Math.random() * 100000),
      referralCount: 0,
      referredBy: null,
      socialShares: 0,
      shareHistory: [],
      completedChallenges: [],
      activeChallenges: [],
      referralBonus: 0
    },
    { 
      id: 2, 
      email: 'admin@test.com', 
      password: 'admin123', 
      name: 'Admin User', 
      type: 'admin' 
    }
  ]);
  
  const [causes, setCauses] = useState([
    { 
      id: 1, 
      title: 'Education for Children', 
      description: 'Support school supplies, tuition, and daily meals for underprivileged kids in rural areas. Help us transform lives through quality education.',
      longDescription: 'This comprehensive initiative aims to provide quality education to 500+ children in underserved communities across remote regions. We supply complete school materials, textbooks, notebooks, writing materials, school uniforms, nutritious meals daily, and educational support programs. Our program includes literacy classes for parents, computer training, and scholarship assistance. We partner with local schools to ensure sustainable impact and community involvement.',
      raised: 5420, 
      goal: 10000, 
      category: 'Education',
      subcategory: 'School Supplies',
      beneficiaries: '500+ children and 200 families',
      impact: 'Enable 500 children to attend school with complete materials and daily nutrition, improving literacy rates by 85% and school attendance by 90%',
      timeline: '6 months initial phase, 2 years long-term',
      team: 'Education Foundation Team',
      image: 'https://images.unsplash.com/photo-1427504494785-cdaf999f335f?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1427504494785-cdaf999f335f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1577720643272-265f434a8b6a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop'
      ],
      status: 'Active',
      donors: 45,
      updates: [
        'Day 1: Project Launch - Community awareness campaign started',
        'Day 5: First 100 students registered and materials sourced',
        'Day 10: School uniforms and materials distributed to 150 children',
        'Day 15: Daily meal program initiated - 200+ children receiving daily nutrition',
        'Day 20: Parents literacy program launched with 75 parents enrolled'
      ] 
    },
    { 
      id: 2, 
      title: 'Clean Water Project', 
      description: 'Build wells and water filtration systems to provide clean water to remote rural communities. Ensure access to safe drinking water for all.',
      longDescription: 'Access to clean water is a fundamental human right. Our comprehensive water and sanitation project is building 10 new deep wells in remote villages, installing modern water filtration and purification systems, and providing community training on water conservation and hygiene. We are serving 2,000+ families across 10 villages. Each well is equipped with solar pumps for sustainability and comes with regular maintenance training for local communities. We also provide basic sanitation facilities and hygiene education programs.',
      raised: 8200, 
      goal: 15000, 
      category: 'Health',
      subcategory: 'Water & Sanitation',
      beneficiaries: '2,000+ families (10,000+ people)',
      impact: 'Provide clean water access to 10,000+ people, reduce water-borne diseases by 80%, and improve community health and hygiene standards',
      timeline: '4 months construction, ongoing maintenance',
      team: 'Water & Sanitation Team',
      image: 'https://images.unsplash.com/photo-1559027615-cd615c0db358?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1559027615-cd615c0db358?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop'
      ],
      status: 'Active',
      donors: 67,
      updates: [
        'Day 1: Site survey completed - 10 locations identified',
        'Day 7: Wells construction started - Foundation work in progress',
        'Day 14: 3 wells completed - Testing and installation of pumps',
        'Day 21: Water purification systems installed in 5 wells',
        'Day 28: Community training on well maintenance and water conservation'
      ]
    },
    { 
      id: 3, 
      title: 'Animal Shelter', 
      description: 'Support shelter operations, veterinary care, and rehabilitation for rescued animals. Give abandoned animals a second chance at life.',
      longDescription: 'Our animal shelter rescues and rehabilitates abandoned, abused, and stray animals. We provide comprehensive veterinary care, nutritious food, safe shelter, and rehabilitation services for 200+ animals daily. Our team includes trained veterinarians, animal behaviorists, and caregivers who work 24/7 to ensure the well-being of our animals. We also run adoption programs, community education on animal welfare, and vaccination camps. Each animal receives personalized care and medical treatment based on their specific needs.',
      raised: 3100, 
      goal: 5000, 
      category: 'Animals',
      subcategory: 'Animal Care & Rescue',
      beneficiaries: '200+ rescued animals, Community education',
      impact: 'Rescue, rehabilitate, and care for 200+ animals monthly, achieve 70% successful adoption rate, and educate 500+ community members on animal welfare',
      timeline: 'Ongoing daily operations',
      team: 'Animal Welfare Team',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1552053831-71594a27c62d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601758228579-7f41a1e1b51a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1576259621309-c4c5789f82d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45ac003d2e13?w=400&h=300&fit=crop'
      ],
      status: 'Active',
      donors: 34,
      updates: [
        'Day 1: Animal rescue campaign launched - Community outreach started',
        'Day 3: 20 animals rescued from the streets and given emergency care',
        'Day 8: Veterinary treatment ongoing - 15 animals treated for injuries',
        'Day 15: 10 animals successfully adopted into loving homes',
        'Day 20: Free vaccination and health camp for 50 community animals'
      ]
    },
    { 
      id: 4, 
      title: 'Medical Emergency Fund', 
      description: 'Help cover urgent medical expenses, surgeries, and medications for underprivileged families who cannot afford emergency healthcare.',
      longDescription: 'Many families in our community cannot afford emergency medical treatment, forcing them to make impossible choices between health and financial survival. Our Medical Emergency Fund provides immediate financial assistance for hospital bills, emergency surgeries, critical medications, and specialized treatments. We work with hospitals to negotiate discounted rates and provide direct payment support. Our team also provides follow-up care assistance, rehabilitation support, and financial counseling to help families recover both medically and financially.',
      raised: 12500, 
      goal: 20000, 
      category: 'Health',
      subcategory: 'Emergency Medical Care',
      beneficiaries: '100+ patients, 300+ family members',
      impact: 'Provide lifesaving emergency medical care to 100+ underprivileged patients, reduce medical debt crisis for families, and improve health outcomes',
      timeline: 'Ongoing - 24/7 emergency support',
      team: 'Medical Relief Team',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
      photos: [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583324156892-2b95f56c0c6f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1631217314160-e6df44dd64d4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1579154204601-01d18a7e8e6c?w=400&h=300&fit=crop'
      ],
      status: 'Active',
      donors: 89,
      updates: [
        'Day 1: Emergency fund established with 24/7 support hotline',
        'Day 5: First 5 critical patients supported - Emergency surgeries completed',
        'Day 10: 15 emergency cases handled - 100% payment assistance provided',
        'Day 15: 25 families received follow-up care and rehabilitation support',
        'Day 20: Partnership with 5 hospitals established for discounted emergency services'
      ]
    },
  ]);
  
  const [donations, setDonations] = useState([]);

  // Badge Definitions
  const BADGES = {
    bronze: { name: 'Bronze Donor', icon: '🥉', threshold: 50, title: 'Donated ₱50+' },
    silver: { name: 'Silver Donor', icon: '🥈', threshold: 200, title: 'Donated ₱200+' },
    gold: { name: 'Gold Donor', icon: '🥇', threshold: 500, title: 'Donated ₱500+' },
    platinum: { name: 'Platinum Donor', icon: '💎', threshold: 1000, title: 'Donated ₱1000+' },
    streak: { name: 'Streak Champion', icon: '🔥', threshold: 4, title: '4+ week streak' },
    variety: { name: 'Variety Hero', icon: '🎨', threshold: 5, title: 'Donated to 5+ categories' },
    advocate: { name: 'Social Advocate', icon: '📱', threshold: 10, title: '10+ shares' },
    impact: { name: 'Impact Champion', icon: '🚀', threshold: 100, title: '₱100 total impact' },
  };

  // Gamification Helper Functions
  const calculateRank = (totalDonated) => {
    if (totalDonated >= 1000) return 'Platinum Donor';
    if (totalDonated >= 500) return 'Gold Donor';
    if (totalDonated >= 200) return 'Silver Donor';
    if (totalDonated >= 50) return 'Bronze Donor';
    return 'New Donor';
  };

  const calculatePoints = (amount) => {
    return Math.floor(amount / 10) * 10;
  };

  const checkAchievements = (user, amount, causeName) => {
    const achievements = [];
    const newTotalDonated = (user.totalDonated || 0) + amount;
    const newPoints = (user.points || 0) + calculatePoints(amount);

    // Check milestone achievements
    if (newTotalDonated >= 1000 && (user.totalDonated || 0) < 1000) {
      achievements.push({ name: BADGES.platinum.name, icon: BADGES.platinum.icon, message: 'You reached Platinum Donor! 💎' });
    } else if (newTotalDonated >= 500 && (user.totalDonated || 0) < 500) {
      achievements.push({ name: BADGES.gold.name, icon: BADGES.gold.icon, message: 'You reached Gold Donor! 🥇' });
    } else if (newTotalDonated >= 200 && (user.totalDonated || 0) < 200) {
      achievements.push({ name: BADGES.silver.name, icon: BADGES.silver.icon, message: 'You reached Silver Donor! 🥈' });
    } else if (newTotalDonated >= 50 && (user.totalDonated || 0) < 50) {
      achievements.push({ name: BADGES.bronze.name, icon: BADGES.bronze.icon, message: 'You reached Bronze Donor! 🥉' });
    }

    return achievements;
  };

  const updateUserGamification = (userId, donation) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === userId) {
          const newTotalDonated = (user.totalDonated || 0) + donation.amount;
          const newPoints = (user.points || 0) + calculatePoints(donation.amount);
          const cause = causes.find(c => c.id === donation.causeId);
          const newCategoriesDonatedTo = Array.from(new Set([...(user.categoriesDonatedTo || []), cause.category]));
          const achievements = checkAchievements(user, donation.amount, cause.title);

          if (achievements.length > 0) {
            setNewAchievement(achievements[0]);
            setShowAchievementModal(true);
          }

          return {
            ...user,
            totalDonated: newTotalDonated,
            points: newPoints,
            categoriesDonatedTo: newCategoriesDonatedTo,
            rank: calculateRank(newTotalDonated),
            badges: achievements.length > 0 ? [...(user.badges || []), ...achievements] : (user.badges || []),
          };
        }
        return user;
      })
    );
  };

  // Social Sharing & Viral Growth Functions

  const generateReferralCode = (userId, userName) => {
    const code = userName.substring(0, 3).toUpperCase() + 'REF' + userId + Math.floor(Math.random() * 1000);
    return code;
  };

  const generateShareMessage = (causeTitle, platform) => {
    const messages = {
      facebook: `🎯 I just donated to "${causeTitle}" on our donation platform! Help make a difference! 💝 #GiveBack #LocalCauses`,
      twitter: `Just donated to "${causeTitle}"! 💝 Join me in making a difference in our community! #Charity #Donate`,
      whatsapp: `Hey! I donated to "${causeTitle}" and you can too! 💝 Let's help together! 🤝`,
      instagram: `Supporting "${causeTitle}" 💝 Help us make a real impact in our community! 🙌 #GivingBack #LocalCauses`,
      email: `Check out this amazing cause: "${causeTitle}" - I just donated and would love your support! 💝`
    };
    return messages[platform] || messages.facebook;
  };

  const handleShareDonation = (platform) => {
    const message = generateShareMessage(selectedCause?.title || 'our cause', platform);
    setShareMessage(message);
    
    // Record the share
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === currentUser.id) {
          const newShares = (user.socialShares || 0) + 1;
          const bonusPoints = 5; // 5 bonus points per share
          return {
            ...user,
            socialShares: newShares,
            points: (user.points || 0) + bonusPoints,
            shareHistory: [...(user.shareHistory || []), {
              platform,
              cause: selectedCause?.title,
              date: new Date().toLocaleDateString(),
              bonusPoints
            }]
          };
        }
        return user;
      })
    );

    Alert.alert(
      'Share on ' + platform.toUpperCase(),
      'Share this message:\n\n' + message + '\n\nYou earned 5 bonus points! 🎉',
      [
        { text: 'Cancel', onPress: () => setShowShareModal(false) },
        { 
          text: 'Copy Message', 
          onPress: () => {
            Alert.alert('Success', 'Message copied to clipboard! 📋');
            setShowShareModal(false);
          }
        }
      ]
    );
  };

  const handleCreateReferral = () => {
    if (!currentUser) return;
    
    const code = generateReferralCode(currentUser.id, currentUser.name);
    const link = `app://referral/${code}`;
    
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            referralCode: code
          };
        }
        return user;
      })
    );

    setReferralCode(code);
    setReferralLink(link);
    setShowReferralModal(true);
  };

  const handleReferralBonus = (referredUserId, referralCode) => {
    setUsers(prevUsers =>
      prevUsers.map(user => {
        if (user.referralCode === referralCode) {
          // Reward referrer
          return {
            ...user,
            referralCount: (user.referralCount || 0) + 1,
            referralBonus: (user.referralBonus || 0) + 50,
            balance: (user.balance || 0) + 50
          };
        } else if (user.id === referredUserId) {
          // Reward referred user
          return {
            ...user,
            referredBy: referralCode,
            balance: (user.balance || 0) + 25,
            points: (user.points || 0) + 50
          };
        }
        return user;
      })
    );

    Alert.alert('🎉 Referral Bonus!', 'You earned ₱50 referral bonus! 🎊');
  };

  const initializeChallenges = () => {
    const defaultChallenges = [
      {
        id: 1,
        title: '🌟 Share & Shine',
        description: 'Share 3 causes on social media',
        requirement: 3,
        type: 'shares',
        reward: 100,
        rewardType: 'points',
        icon: '📱',
        active: true
      },
      {
        id: 2,
        title: '💝 Generous Giver',
        description: 'Donate to 3 different causes',
        requirement: 3,
        type: 'categories',
        reward: 75,
        rewardType: 'points',
        icon: '💝',
        active: true
      },
      {
        id: 3,
        title: '🤝 Friend Inviter',
        description: 'Refer 2 friends successfully',
        requirement: 2,
        type: 'referrals',
        reward: 200,
        rewardType: 'points',
        icon: '🤝',
        active: true
      },
      {
        id: 4,
        title: '💰 Big Donor',
        description: 'Donate ₱500 in one week',
        requirement: 500,
        type: 'amount',
        reward: 150,
        rewardType: 'points',
        icon: '💰',
        active: true
      }
    ];
    setChallenges(defaultChallenges);
  };

  const checkChallengeCompletion = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user || !challenges.length) return;

    setUsers(prevUsers =>
      prevUsers.map(u => {
        if (u.id === userId) {
          let completed = [];
          let newPoints = u.points || 0;

          // Check each challenge
          challenges.forEach(challenge => {
            if (!(u.completedChallenges || []).includes(challenge.id)) {
              let isMet = false;

              if (challenge.type === 'shares' && u.socialShares >= challenge.requirement) {
                isMet = true;
              } else if (challenge.type === 'categories' && u.categoriesDonatedTo?.length >= challenge.requirement) {
                isMet = true;
              } else if (challenge.type === 'referrals' && u.referralCount >= challenge.requirement) {
                isMet = true;
              } else if (challenge.type === 'amount' && u.totalDonated >= challenge.requirement) {
                isMet = true;
              }

              if (isMet) {
                completed.push(challenge.id);
                newPoints += challenge.reward;
              }
            }
          });

          if (completed.length > 0) {
            Alert.alert('🎉 Challenge Completed!', `You earned ${completed.length} challenge(s)! +${completed.reduce((sum, id) => sum + (challenges.find(c => c.id === id)?.reward || 0), 0)} points!`);
            return {
              ...u,
              points: newPoints,
              completedChallenges: [...(u.completedChallenges || []), ...completed]
            };
          }
        }
        return u;
      })
    );
  };

  // Authentication Functions
  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (users.find(u => u.email === email)) {
      Alert.alert('Error', 'Email already registered');
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      email,
      password,
      name,
      type: userType,
      balance: 1000
    };
    
    setUsers([...users, newUser]);
    Alert.alert('Success', 'Registration successful! Please login.');
    resetForm();
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      Alert.alert('Success', `Welcome ${user.name}!`);
      setCurrentScreen(user.type === 'admin' ? 'adminDashboard' : 'userDashboard');
      resetForm();
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentScreen('home');
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  // Donation Functions
  const handleDonate = () => {
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }
    
    const amount = parseFloat(donationAmount);
    if (paymentMethod === 'balance' && amount > currentUser.balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }
    
    const newDonation = {
      id: donations.length + 1,
      userId: currentUser.id,
      causeId: selectedCause.id,
      amount,
      date: new Date().toLocaleDateString(),
      userName: currentUser.name,
      causeName: selectedCause.title
    };
    
    setDonations([...donations, newDonation]);
    // Deduct balance only if paying from in-app balance
    if (paymentMethod === 'balance') {
      setCurrentUser({ ...currentUser, balance: currentUser.balance - amount });
    }
    // Update cause raised amount
    setCauses(causes.map(c => c.id === selectedCause.id ? { ...c, raised: c.raised + amount } : c));
    
    // Update gamification
    updateUserGamification(currentUser.id, newDonation);
    
    setShowDonationModal(false);
    setDonationAmount('');
    Alert.alert('Success', `Thank you for donating ₱${amount.toFixed(2)} to ${selectedCause.title}!`);
  };

  const openDonationModal = (cause) => {
    setSelectedCause(cause);
    setPaymentMethod('balance');
    setShowDonationModal(true);
  };

  const handleAddCause = () => {
    if (!newCauseTitle || !newCauseGoal) {
      Alert.alert('Error', 'Please provide title and goal amount');
      return;
    }
    const goal = parseFloat(newCauseGoal);
    if (isNaN(goal) || goal <= 0) {
      Alert.alert('Error', 'Please enter a valid goal amount');
      return;
    }

    const newCause = {
      id: causes.length + 1,
      title: newCauseTitle,
      description: newCauseDescription,
      longDescription: newCauseDescription,
      raised: 0,
      goal,
      category: newCauseCategory,
      subcategory: newCauseSubcategory,
      beneficiaries: newCauseBeneficiaries,
      impact: newCauseImpact,
      timeline: newCauseTimeline,
      team: newCauseTeam,
      image: newCauseImage,
      photos: [newCauseImage],
      status: 'Active',
      donors: 0,
      updates: ['Project just launched!']
    };

    setCauses([newCause, ...causes]);
    setShowAddCauseModal(false);
    resetCauseForm();
    Alert.alert('Success', 'Cause added successfully!');
  };

  const resetCauseForm = () => {
    setNewCauseTitle('');
    setNewCauseDescription('');
    setNewCauseGoal('');
    setNewCauseCategory('Education');
    setNewCauseSubcategory('');
    setNewCauseBeneficiaries('');
    setNewCauseImpact('');
    setNewCauseTimeline('');
    setNewCauseImage('https://via.placeholder.com/300x200?text=Cause+Image');
    setNewCauseTeam('');
  };

  // Enhanced Filtering & Search
  const getFilteredCauses = () => {
    let filtered = causes;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    
    // Search by title or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query)
      );
    }
    
    // Sort
    if (sortBy === 'raised') {
      filtered = filtered.sort((a, b) => (b.raised - b.goal) - (a.raised - a.goal));
    } else if (sortBy === 'goal') {
      filtered = filtered.sort((a, b) => a.goal - b.goal);
    } else if (sortBy === 'recent') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    }
    
    return filtered;
  };

  const toggleFavorite = (causeId) => {
    if (favoritesCauses.includes(causeId)) {
      setFavoritesCauses(favoritesCauses.filter(id => id !== causeId));
    } else {
      setFavoritesCauses([...favoritesCauses, causeId]);
    }
  };

  const categories = ['All', 'Education', 'Health', 'Animals', 'Environment', 'Emergency'];

  const requestToJoinCause = (cause) => {
    if (!isLoggedIn || !currentUser) {
      Alert.alert('Info', 'Please login to request to join a cause');
      return;
    }
    const existing = causeRequests.find(r => r.userId === currentUser.id && r.causeId === cause.id && r.status === 'pending');
    if (existing) {
      Alert.alert('Info', 'You already have a pending request for this cause');
      return;
    }
    const req = {
      id: causeRequests.length + 1,
      userId: currentUser.id,
      causeId: cause.id,
      userName: currentUser.name,
      causeTitle: cause.title,
      status: 'pending',
      requestDate: new Date().toLocaleDateString()
    };
    setCauseRequests([...causeRequests, req]);
    Alert.alert('Success', 'Request submitted. Admin will review it.');
  };

  const approveRequest = (reqId) => {
    setCauseRequests(causeRequests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));
    Alert.alert('Success', 'Request approved');
  };

  const rejectRequest = (reqId) => {
    setCauseRequests(causeRequests.map(r => r.id === reqId ? { ...r, status: 'rejected' } : r));
    Alert.alert('Info', 'Request rejected');
  };

  // Render Functions
  const renderHome = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Micro Donation Platform</Text>
        <Text style={styles.headerSubtitle}>Make a difference with small contributions</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => {
            setUserType('user');
            setCurrentScreen('register');
          }}
        >
          <Text style={styles.menuButtonText}>User Registration</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => {
            setUserType('admin');
            setCurrentScreen('register');
          }}
        >
          <Text style={styles.menuButtonText}>Admin Registration</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuButton, styles.secondaryButton]}
          onPress={() => setCurrentScreen('login')}
        >
          <Text style={styles.menuButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: '#009688' }]}
          onPress={() => setCurrentScreen('whereToDonate')}
        >
          <Text style={styles.menuButtonText}>Where to Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRegister = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userType === 'admin' ? 'Admin' : 'User'} Registration</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => {
              resetForm();
              setCurrentScreen('home');
            }}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderLogin = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => {
              resetForm();
              setCurrentScreen('home');
            }}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
          
          <View style={styles.testCredentials}>
            <Text style={styles.testTitle}>Test Credentials:</Text>
            <Text style={styles.testText}>User: user@test.com / user123</Text>
            <Text style={styles.testText}>Admin: admin@test.com / admin123</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderUserDashboard = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome, {currentUser.name}!</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Balance: ₱{currentUser.balance.toFixed(2)}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Gamification Stats */}
        <View style={styles.gamificationCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>🏆 Your Profile</Text>
            <Text style={{ fontSize: 24 }}>{BADGES[currentUser.rank?.toLowerCase().replace(/\s/g, '') === 'platinumdonor' ? 'platinum' : currentUser.rank?.toLowerCase().replace(/\s/g, '') === 'golddonor' ? 'gold' : currentUser.rank?.toLowerCase().replace(/\s/g, '') === 'silverdonor' ? 'silver' : currentUser.rank?.toLowerCase().replace(/\s/g, '') === 'bronzedonor' ? 'bronze' : 'new'] || '✨'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6200ea' }}>₱{currentUser.totalDonated || 0}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>Total Donated</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6200ea' }}>{currentUser.points || 0}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>Points</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6200ea' }}>{currentUser.categoriesDonatedTo?.length || 0}</Text>
              <Text style={{ fontSize: 12, color: '#666' }}>Categories</Text>
            </View>
          </View>
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#555' }}>Rank: {currentUser.rank || 'New Donor'}</Text>
          
          {/* Badges Display */}
          {currentUser.badges && currentUser.badges.length > 0 && (
            <View>
              <Text style={{ fontSize: 12, fontWeight: '600', marginBottom: 8, color: '#666' }}>Achievements:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {currentUser.badges.map((badge, idx) => (
                  <View key={idx} style={{ alignItems: 'center', marginRight: 12, marginBottom: 8 }}>
                    <Text style={{ fontSize: 24, marginBottom: 2 }}>{badge.icon}</Text>
                    <Text style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>{badge.name.split(' ')[0]}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Quick Action Buttons */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 6 }]}
            onPress={() => setCurrentScreen('leaderboard')}
          >
            <Text style={styles.buttonText}>🏅 Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginLeft: 6 }]}
            onPress={() => setCurrentScreen('achievements')}
          >
            <Text style={styles.buttonText}>🎯 Achievements</Text>
          </TouchableOpacity>
        </View>

        {/* Social Sharing Buttons */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 6, backgroundColor: '#ff6b6b' }]}
            onPress={() => setCurrentScreen('viralGrowth')}
          >
            <Text style={styles.buttonText}>🚀 Go Viral</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginLeft: 6, backgroundColor: '#ffc107' }]}
            onPress={() => setShowShareModal(true)}
          >
            <Text style={styles.buttonText}>📱 Share</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 6, backgroundColor: '#4CAF50' }]}
            onPress={handleCreateReferral}
          >
            <Text style={styles.buttonText}>🤝 Refer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginLeft: 6, backgroundColor: '#2196F3' }]}
            onPress={() => setCurrentScreen('challenges')}
          >
            <Text style={styles.buttonText}>🎯 Challenges</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <TextInput 
          style={[styles.input, { marginBottom: 12 }]}
          placeholder="🔍 Search causes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Filter Controls */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 8 }]}
            onPress={() => setFilterOpen(!filterOpen)}
          >
            <Text style={styles.buttonText}>⚙️ Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1 }]}
            onPress={() => setSortBy(sortBy === 'recent' ? 'raised' : 'recent')}
          >
            <Text style={styles.buttonText}>📊 {sortBy === 'recent' ? 'Recent' : 'Top Raised'}</Text>
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        {filterOpen && (
          <View style={{ marginBottom: 12, backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Filter by Category:</Text>
            <View style={styles.pickerContainer}>
              {categories.map(cat => (
                <TouchableOpacity 
                  key={cat}
                  style={[styles.pickerOption, selectedCategory === cat && styles.pickerOptionSelected]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={selectedCategory === cat ? { fontWeight: 'bold', color: '#fff' } : {}}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Favorites Section */}
        {favoritesCauses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>⭐ Favorite Causes</Text>
            {getFilteredCauses().filter(c => favoritesCauses.includes(c.id)).map(cause => {
              const progress = (cause.raised / cause.goal) * 100;
              return (
                <View key={cause.id} style={styles.causeCard}>
                  {cause.image && (
                    <Image 
                      source={{ uri: cause.image }}
                      style={styles.causeImage}
                    />
                  )}
                  <View style={styles.causeHeader}>
                    <TouchableOpacity onPress={() => { setSelectedCause(cause); setCurrentScreen('causeDetail'); }} style={{ flex: 1 }}>
                      <Text style={styles.causeTitle}>{cause.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.causeCategory}>{cause.category}</Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                  </View>
                  <View style={styles.causeFooter}>
                    <Text style={styles.raisedText}>₱{cause.raised.toLocaleString()} / ₱{cause.goal.toLocaleString()}</Text>
                    <TouchableOpacity style={styles.donateButton} onPress={() => openDonationModal(cause)}>
                      <Text style={styles.donateButtonText}>Donate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </>
        )}

        <Text style={styles.sectionTitle}>All Available Causes</Text>
        {getFilteredCauses().length === 0 ? (
          <Text style={styles.emptyText}>No causes match your search</Text>
        ) : (
          getFilteredCauses().map(cause => {
            const progress = (cause.raised / cause.goal) * 100;
            return (
              <View key={cause.id} style={styles.causeCard}>
                {cause.image && (
                  <Image 
                    source={{ uri: cause.image }}
                    style={styles.causeImage}
                  />
                )}
                <View style={styles.causeHeader}>
                  <TouchableOpacity onPress={() => { setSelectedCause(cause); setCurrentScreen('causeDetail'); }} style={{ flex: 1 }}>
                    <Text style={styles.causeTitle}>{cause.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.causeCategory}>{cause.category}</Text>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
                  </View>
                  <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                </View>
                
                <View style={styles.causeFooter}>
                  <Text style={styles.raisedText}>
                    ₱{cause.raised.toLocaleString()} / ₱{cause.goal.toLocaleString()} ({cause.donors} donors)
                  </Text>
                  <TouchableOpacity 
                    style={styles.donateButton}
                    onPress={() => openDonationModal(cause)}
                  >
                    <Text style={styles.donateButtonText}>Donate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
        
        <Text style={styles.sectionTitle}>Your Donations</Text>
        {donations.filter(d => d.userId === currentUser.id).length === 0 ? (
          <Text style={styles.emptyText}>No donations yet - start supporting a cause!</Text>
        ) : (
          donations.filter(d => d.userId === currentUser.id).map(donation => (
            <View key={donation.id} style={styles.donationCard}>
              <Text style={styles.donationTitle}>{donation.causeName}</Text>
              <Text style={styles.donationAmount}>₱{donation.amount.toLocaleString()}</Text>
              <Text style={styles.donationDate}>{donation.date}</Text>
            </View>
          ))
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderAdminDashboard = () => {
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalUsers = users.filter(u => u.type === 'user').length;
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome, {currentUser.name}!</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <TouchableOpacity style={[styles.button, { marginBottom: 12 }]} onPress={() => setShowAddCauseModal(true)}>
            <Text style={styles.buttonText}>Add New Cause</Text>
          </TouchableOpacity>

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
          
          <Text style={styles.sectionTitle}>All Donations</Text>
          {donations.length === 0 ? (
            <Text style={styles.emptyText}>No donations yet</Text>
          ) : (
            donations.map(donation => (
              <View key={donation.id} style={styles.donationCard}>
                <Text style={styles.donationTitle}>{donation.userName}</Text>
                <Text style={styles.donationSubtitle}>{donation.causeName}</Text>
                <Text style={styles.donationAmount}>₱{donation.amount}</Text>
                <Text style={styles.donationDate}>{donation.date}</Text>
              </View>
            ))
          )}

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Pending Join Requests</Text>
          {causeRequests.filter(r => r.status === 'pending').length === 0 ? (
            <Text style={styles.emptyText}>No pending requests</Text>
          ) : (
            causeRequests.filter(r => r.status === 'pending').map(req => (
              <View key={req.id} style={styles.requestCard}>
                <Text style={styles.requestText}>{req.userName} requested to join "{req.causeTitle}"</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 6 }]} onPress={() => approveRequest(req.id)}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.secondaryButton, { flex: 1 }]} onPress={() => rejectRequest(req.id)}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderDonationModal = () => (
    <Modal
      visible={showDonationModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowDonationModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Donate to {selectedCause?.title}</Text>
          
          <Text style={styles.modalBalance}>Your Balance: ₱{currentUser?.balance.toFixed(2)}</Text>
          
          <Text style={styles.label}>Donation Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={donationAmount}
            onChangeText={setDonationAmount}
            keyboardType="numeric"
          />
          
          <View style={styles.quickAmounts}>
            {[5, 10, 25, 50].map(amount => (
              <TouchableOpacity
                key={amount}
                style={styles.quickButton}
                onPress={() => setDonationAmount(amount.toString())}
              >
                <Text style={styles.quickButtonText}>₱{amount}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 6 }]}>Payment Method (11 Options)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => setPaymentMethod('balance')} style={[styles.paymentMethodChip, paymentMethod === 'balance' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>💰 Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('gcash')} style={[styles.paymentMethodChip, paymentMethod === 'gcash' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>📱 GCash</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('bank')} style={[styles.paymentMethodChip, paymentMethod === 'bank' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>🏦 Bank</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('debit-card')} style={[styles.paymentMethodChip, paymentMethod === 'debit-card' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>💳 Debit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('credit-card')} style={[styles.paymentMethodChip, paymentMethod === 'credit-card' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>💎 Credit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('paypal')} style={[styles.paymentMethodChip, paymentMethod === 'paypal' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>🌐 PayPal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('apple-pay')} style={[styles.paymentMethodChip, paymentMethod === 'apple-pay' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>🍎 Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('google-pay')} style={[styles.paymentMethodChip, paymentMethod === 'google-pay' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>🔵 Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('crypto')} style={[styles.paymentMethodChip, paymentMethod === 'crypto' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>₿ Crypto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('bnpl')} style={[styles.paymentMethodChip, paymentMethod === 'bnpl' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>📅 BNPL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentMethod('codes')} style={[styles.paymentMethodChip, paymentMethod === 'codes' && styles.paymentMethodChipSelected]}>
              <Text style={styles.paymentMethodChipText}>🎟️ Codes</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <TouchableOpacity style={styles.button} onPress={() => {
            if (paymentMethod === 'balance') {
              handleDonate();
            } else {
              setShowPaymentInstructions(true);
            }
          }}>
            <Text style={styles.buttonText}>Confirm Donation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => {
              setShowDonationModal(false);
              setDonationAmount('');
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderPaymentInstructions = () => (
    <Modal visible={showPaymentInstructions} transparent animationType="fade" onRequestClose={() => setShowPaymentInstructions(false)}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: '90%' }]}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.modalTitle}>
              {paymentMethod === 'balance' && '💰 In-App Wallet'} 
              {paymentMethod === 'gcash' && '📱 GCash Payment'} 
              {paymentMethod === 'bank' && '🏦 Bank Transfer'} 
              {paymentMethod === 'debit-card' && '💳 Debit Card'} 
              {paymentMethod === 'credit-card' && '💎 Credit Card'} 
              {paymentMethod === 'paypal' && '🌐 PayPal'} 
              {paymentMethod === 'apple-pay' && '🍎 Apple Pay'} 
              {paymentMethod === 'google-pay' && '🔵 Google Pay'} 
              {paymentMethod === 'crypto' && '₿ Cryptocurrency'} 
              {paymentMethod === 'bnpl' && '📅 Buy Now, Pay Later'} 
              {paymentMethod === 'codes' && '🎟️ Promo & Gift Codes'}
            </Text>
            
            {/* IN-APP WALLET */}
            {paymentMethod === 'balance' && (
              <View>
                <Text style={styles.sectionTitle}>Pay with In-App Wallet</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontSize: 14, marginBottom: 8 }}>Donation Amount: <Text style={{ fontWeight: 'bold', color: '#6200ea' }}>₱{donationAmount}</Text></Text>
                  <Text style={{ fontSize: 14 }}>Your Balance: <Text style={{ fontWeight: 'bold', color: '#28a745' }}>₱{currentUser?.balance.toFixed(2)}</Text></Text>
                </View>
                {currentUser?.balance >= parseFloat(donationAmount) ? (
                  <View style={styles.infoCard}>
                    <Text style={{ color: '#28a745', fontWeight: '600' }}>✓ Sufficient balance available</Text>
                  </View>
                ) : (
                  <View style={styles.infoCard}>
                    <Text style={{ color: '#d32f2f', fontWeight: '600' }}>✗ Insufficient balance</Text>
                    <Text style={{ color: '#666', marginTop: 4 }}>Please load your wallet first</Text>
                  </View>
                )}
              </View>
            )}

            {/* GCASH */}
            {paymentMethod === 'gcash' && (
              <View>
                <Text style={styles.sectionTitle}>GCash Mobile Money Transfer</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>✓ Fastest Payments</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>Instant transfer • Available 24/7 • No registration needed</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Instructions:</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>1. Open GCash app</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>2. Tap "Send Money" → "To Other GCash"</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>3. Enter: 0917-XXX-XXXX</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>4. Reference: {selectedCause?.title}</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>5. Amount: ₱{donationAmount}</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#fff3cd', borderLeftWidth: 4, borderLeftColor: '#ffc107' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Recipient Details:</Text>
                  <Text style={{ fontSize: 12, marginTop: 4 }}>📱 0917-XXX-XXXX | Micro Donations PH</Text>
                  <Text style={{ fontSize: 12 }}>Transfer Fee: ₱0-5</Text>
                </View>
              </View>
            )}

            {/* BANK TRANSFER */}
            {paymentMethod === 'bank' && (
              <View>
                <Text style={styles.sectionTitle}>Online Banking Transfer</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Bank Details:</Text>
                  <Text style={{ fontSize: 13, marginBottom: 4 }}>🏦 <Text style={{ fontWeight: 'bold' }}>Bank:</Text> PNB (Philippines National Bank)</Text>
                  <Text style={{ fontSize: 13, marginBottom: 4 }}>📍 <Text style={{ fontWeight: 'bold' }}>Branch:</Text> Makati Main</Text>
                  <Text style={{ fontSize: 13, marginBottom: 4 }}>👤 <Text style={{ fontWeight: 'bold' }}>Account:</Text> Micro Donations PH</Text>
                  <Text style={{ fontSize: 13, marginBottom: 4 }}>💳 <Text style={{ fontWeight: 'bold' }}>Number:</Text> 123456789012</Text>
                  <Text style={{ fontSize: 13 }}>🔢 <Text style={{ fontWeight: 'bold' }}>SWIFT:</Text> PNBMPHMM</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>How to Transfer:</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>1. Log into your online banking</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>2. Click "Fund Transfer"</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>3. Add the account above</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>4. Enter amount: ₱{donationAmount}</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#e3f2fd', borderLeftWidth: 4, borderLeftColor: '#2196f3' }]}>
                  <Text style={{ fontSize: 13, color: '#1976d2' }}>⏱️ Confirmation: 1-2 business days</Text>
                </View>
              </View>
            )}

            {/* DEBIT CARD */}
            {paymentMethod === 'debit-card' && (
              <View>
                <Text style={styles.sectionTitle}>Pay with Debit Card</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Card Number</Text>
                  <TextInput style={styles.input} placeholder="1234 5678 9012 3456" value={paymentMethodDetails.cardNumber} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardNumber: text})} maxLength="19" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput style={styles.input} placeholder="MM/YY" value={paymentMethodDetails.cardExpiry} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardExpiry: text})} maxLength="5" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput style={styles.input} placeholder="123" value={paymentMethodDetails.cardCVV} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardCVV: text})} maxLength="4" />
                  </View>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#f0f7ff' }]}>
                  <Text style={{ fontSize: 13 }}>✓ 256-bit SSL encrypted</Text>
                  <Text style={{ fontSize: 13 }}>✓ 3D Secure protection</Text>
                  <Text style={{ fontSize: 13 }}>✓ Instant processing</Text>
                </View>
              </View>
            )}

            {/* CREDIT CARD */}
            {paymentMethod === 'credit-card' && (
              <View>
                <Text style={styles.sectionTitle}>Pay with Credit Card</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Card Number</Text>
                  <TextInput style={styles.input} placeholder="1234 5678 9012 3456" value={paymentMethodDetails.cardNumber} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardNumber: text})} maxLength="19" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>Expiry</Text>
                    <TextInput style={styles.input} placeholder="MM/YY" value={paymentMethodDetails.cardExpiry} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardExpiry: text})} maxLength="5" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput style={styles.input} placeholder="123" value={paymentMethodDetails.cardCVV} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cardCVV: text})} maxLength="4" />
                  </View>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#f0f7ff' }]}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>💳 Rewards Available:</Text>
                  <Text style={{ fontSize: 13 }}>• Earn credit card points</Text>
                  <Text style={{ fontSize: 13 }}>• Cashback rewards</Text>
                  <Text style={{ fontSize: 13 }}>• Extended billing cycle</Text>
                </View>
              </View>
            )}

            {/* PAYPAL */}
            {paymentMethod === 'paypal' && (
              <View>
                <Text style={styles.sectionTitle}>PayPal Checkout</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Amount: ₱{donationAmount}</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>USD: ${(parseFloat(donationAmount) * 0.018).toFixed(2)}</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Steps:</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>1. Tap "Pay with PayPal"</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>2. Log into your PayPal account</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>3. Review and confirm</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>4. Done!</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#fff9e6' }]}>
                  <Text style={{ fontWeight: 'bold' }}>✓ Buyer Protection</Text>
                  <Text style={{ fontSize: 13 }}>If you don't receive the item, you'll get your money back</Text>
                </View>
              </View>
            )}

            {/* APPLE PAY */}
            {paymentMethod === 'apple-pay' && (
              <View>
                <Text style={styles.sectionTitle}>Apple Pay - One Tap Checkout</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>How it works:</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>1. Tap "Apple Pay"</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>2. Verify with Face ID/Touch ID</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>3. Payment complete!</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#f5f5f5' }]}>
                  <Text style={{ fontWeight: 'bold' }}>⚡ Ultra Fast Checkout</Text>
                  <Text style={{ fontSize: 13 }}>Typically 2-3 seconds</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontSize: 13 }}>💳 Cards Accepted:</Text>
                  <Text style={{ fontSize: 13 }}>Visa • Mastercard • American Express</Text>
                </View>
              </View>
            )}

            {/* GOOGLE PAY */}
            {paymentMethod === 'google-pay' && (
              <View>
                <Text style={styles.sectionTitle}>Google Pay - Quick Checkout</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>How it works:</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>1. Tap "Google Pay"</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>2. Confirm biometric</Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>3. Payment processed instantly</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#f0f7ff' }]}>
                  <Text style={{ fontWeight: 'bold' }}>⚡ Instant Processing</Text>
                  <Text style={{ fontSize: 13 }}>2-3 seconds from tap to completion</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontSize: 13 }}>Available with:</Text>
                  <Text style={{ fontSize: 13 }}>• Credit/Debit Cards</Text>
                  <Text style={{ fontSize: 13 }}>• Bank Accounts</Text>
                </View>
              </View>
            )}

            {/* CRYPTOCURRENCY */}
            {paymentMethod === 'crypto' && (
              <View>
                <Text style={styles.sectionTitle}>Cryptocurrency Payment</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Accepted Coins:</Text>
                  <Text style={{ fontSize: 13 }}>₿ Bitcoin • Ξ Ethereum • ◆ BNB • ◈ USDT</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Wallet Address</Text>
                  <TextInput style={styles.input} placeholder="Enter your wallet address" value={paymentMethodDetails.cryptoAddress} onChangeText={(text) => setPaymentMethodDetails({...paymentMethodDetails, cryptoAddress: text})} />
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontSize: 13 }}>Amount in PKP: {parseFloat(donationAmount) * 0.0015} coins</Text>
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#f0f7ff' }]}>
                  <Text style={{ fontWeight: 'bold' }}>⚡ Blockchain Benefits:</Text>
                  <Text style={{ fontSize: 13 }}>✓ Transparent tracking</Text>
                  <Text style={{ fontSize: 13 }}>✓ Low transaction fees (0.5-2%)</Text>
                  <Text style={{ fontSize: 13 }}>✓ Immediate settlement</Text>
                </View>
              </View>
            )}

            {/* BNPL */}
            {paymentMethod === 'bnpl' && (
              <View>
                <Text style={styles.sectionTitle}>Buy Now, Pay Later (BNPL)</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Payment Plans:</Text>
                </View>
                <TouchableOpacity style={[styles.bnplOption, paymentMethodDetails.selectedBNPL === 'installments-3' && styles.bnplOptionSelected]} onPress={() => setPaymentMethodDetails({...paymentMethodDetails, selectedBNPL: 'installments-3'})}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>3 Installments</Text>
                  <Text style={{ fontSize: 12, color: '#666' }}>₱{(parseFloat(donationAmount) / 3).toFixed(2)} × 3 (0% interest)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bnplOption, paymentMethodDetails.selectedBNPL === 'installments-6' && styles.bnplOptionSelected]} onPress={() => setPaymentMethodDetails({...paymentMethodDetails, selectedBNPL: 'installments-6'})}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>6 Installments</Text>
                  <Text style={{ fontSize: 12, color: '#666' }}>₱{(parseFloat(donationAmount) / 6).toFixed(2)} × 6 (0% interest)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bnplOption, paymentMethodDetails.selectedBNPL === 'installments-12' && styles.bnplOptionSelected]} onPress={() => setPaymentMethodDetails({...paymentMethodDetails, selectedBNPL: 'installments-12'})}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>12 Installments</Text>
                  <Text style={{ fontSize: 12, color: '#666' }}>₱{(parseFloat(donationAmount) / 12).toFixed(2)} × 12 (0% interest)</Text>
                </TouchableOpacity>
                <View style={[styles.infoCard, { backgroundColor: '#e8f5e9' }]}>
                  <Text style={{ fontWeight: 'bold', color: '#2e7d32' }}>✓ No Credit Check</Text>
                  <Text style={{ fontSize: 12, color: '#555' }}>Instant approval • Flexible payment terms</Text>
                </View>
              </View>
            )}

            {/* PROMO & GIFT CODES */}
            {paymentMethod === 'codes' && (
              <View>
                <Text style={styles.sectionTitle}>Promo & Gift Codes</Text>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>✓ Promo Codes</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Get discounts with our partner codes</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>✓ Gift Cards</Text>
                  <Text style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Donate using gift card balances</Text>
                </View>
                <View style={styles.infoCard}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Enter Code:</Text>
                  <TextInput style={styles.input} placeholder="Promo or gift code" />
                </View>
                <View style={[styles.infoCard, { backgroundColor: '#fff3e0' }]}>
                  <Text style={{ fontWeight: 'bold' }}>Where to Get:</Text>
                  <Text style={{ fontSize: 13 }}>📧 Email promotions</Text>
                  <Text style={{ fontSize: 13 }}>🎉 Special events</Text>
                  <Text style={{ fontSize: 13 }}>🎁 Gift cards</Text>
                </View>
              </View>
            )}
            
            {/* GENERAL INFO */}
            <Text style={styles.sectionTitle}>Payment Security & Support</Text>
            <View style={styles.infoCard}>
              <Text style={{ fontSize: 13, marginBottom: 8 }}>✓ SSL 256-bit encryption on all payments</Text>
              <Text style={{ fontSize: 13, marginBottom: 8 }}>✓ PCI DSS compliance</Text>
              <Text style={{ fontSize: 13, marginBottom: 8 }}>✓ Fraud protection guarantee</Text>
              <Text style={{ fontSize: 13 }}>✓ 24/7 customer support</Text>
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={() => { 
                if (paymentMethod === 'balance' && currentUser?.balance >= parseFloat(donationAmount)) {
                  setShowPaymentInstructions(false); 
                  handleDonate();
                } else if (paymentMethod !== 'balance') {
                  setShowPaymentInstructions(false); 
                  handleDonate();
                }
              }}
            >
              <Text style={styles.buttonText}>✓ Confirm & Donate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => setShowPaymentInstructions(false)}>
              <Text style={styles.buttonText}>← Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderAddCauseModal = () => (
    <Modal visible={showAddCauseModal} transparent animationType="slide" onRequestClose={() => setShowAddCauseModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { maxHeight: '95%' }]}>
          <Text style={styles.modalTitle}>Add New Cause</Text>
          <ScrollView showsVerticalScrollIndicator={true}>
            {/* Basic Information */}
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <Text style={styles.label}>Title *</Text>
            <TextInput style={styles.input} value={newCauseTitle} onChangeText={setNewCauseTitle} placeholder="Cause title" />
            
            <Text style={styles.label}>Description *</Text>
            <TextInput style={[styles.input, { height: 80 }]} value={newCauseDescription} onChangeText={setNewCauseDescription} placeholder="Describe the cause/project" multiline />
            
            <Text style={styles.label}>Goal Amount (₱) *</Text>
            <TextInput style={styles.input} value={newCauseGoal} onChangeText={setNewCauseGoal} placeholder="e.g. 10000" keyboardType="numeric" />
            
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              {categories.map(cat => (
                <TouchableOpacity 
                  key={cat}
                  style={[styles.pickerOption, newCauseCategory === cat && styles.pickerOptionSelected]}
                  onPress={() => setNewCauseCategory(cat)}
                >
                  <Text style={newCauseCategory === cat ? { fontWeight: 'bold', color: '#fff' } : {}}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Detailed Information */}
            <Text style={styles.sectionTitle}>Project Details</Text>
            
            <Text style={styles.label}>Sub-category</Text>
            <TextInput style={styles.input} value={newCauseSubcategory} onChangeText={setNewCauseSubcategory} placeholder="e.g. School Supplies, Medicine, etc." />
            
            <Text style={styles.label}>Beneficiaries</Text>
            <TextInput style={styles.input} value={newCauseBeneficiaries} onChangeText={setNewCauseBeneficiaries} placeholder="e.g. 500+ children, Families in need" />
            
            <Text style={styles.label}>Expected Impact</Text>
            <TextInput style={[styles.input, { height: 80 }]} value={newCauseImpact} onChangeText={setNewCauseImpact} placeholder="What will this money accomplish?" multiline />
            
            <Text style={styles.label}>Timeline</Text>
            <TextInput style={styles.input} value={newCauseTimeline} onChangeText={setNewCauseTimeline} placeholder="e.g. 6 months, 1 year" />
            
            <Text style={styles.label}>Team/Organization</Text>
            <TextInput style={styles.input} value={newCauseTeam} onChangeText={setNewCauseTeam} placeholder="Organization handling this cause" />

            {/* Image Information */}
            <Text style={styles.sectionTitle}>Images</Text>
            <Text style={styles.label}>Primary Image URL</Text>
            <TextInput style={styles.input} value={newCauseImage} onChangeText={setNewCauseImage} placeholder="https://images.unsplash.com/..." />
            
            <View style={styles.infoCard}>
              <Text style={{ fontSize: 12, color: '#666' }}>💡 Tip: Use Unsplash.com or similar service for free high-quality images</Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity style={styles.button} onPress={handleAddCause}>
              <Text style={styles.buttonText}>Create Cause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => { setShowAddCauseModal(false); resetCauseForm(); }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderCauseDetail = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{selectedCause?.title}</Text>
        <Text style={styles.headerSubtitle}>{selectedCause?.category} • {selectedCause?.status}</Text>
      </View>
      <ScrollView style={styles.content}>
        {/* Primary Image */}
        {selectedCause?.image && (
          <Image 
            source={{ uri: selectedCause.image }}
            style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 15 }}
          />
        )}

        {/* Description */}
        <Text style={{ fontSize: 14, color: '#333', marginBottom: 12, lineHeight: 20 }}>{selectedCause?.description}</Text>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((selectedCause?.raised / selectedCause?.goal) * 100, 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round((selectedCause?.raised / selectedCause?.goal) * 100)}%</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>₱{selectedCause?.raised?.toLocaleString()} / ₱{selectedCause?.goal?.toLocaleString()} ({selectedCause?.donors} donors)</Text>

        {/* Detailed Info */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          {selectedCause?.beneficiaries && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>👥 Beneficiaries:</Text>
              <Text style={styles.detailValue}>{selectedCause.beneficiaries}</Text>
            </View>
          )}
          {selectedCause?.impact && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>🎯 Impact:</Text>
              <Text style={styles.detailValue}>{selectedCause.impact}</Text>
            </View>
          )}
          {selectedCause?.timeline && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>⏱️ Timeline:</Text>
              <Text style={styles.detailValue}>{selectedCause.timeline}</Text>
            </View>
          )}
          {selectedCause?.team && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>👔 Organization:</Text>
              <Text style={styles.detailValue}>{selectedCause.team}</Text>
            </View>
          )}
        </View>

        {/* Updates */}
        {selectedCause?.updates && selectedCause.updates.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Project Updates</Text>
            {selectedCause.updates.map((update, idx) => (
              <View key={idx} style={styles.updateItem}>
                <Text style={styles.updateText}>• {update}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Photo Gallery */}
        {selectedCause?.photos && selectedCause.photos.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Photo Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {selectedCause.photos.map((photo, idx) => (
                <Image 
                  key={idx}
                  source={{ uri: photo }}
                  style={{ width: 150, height: 120, borderRadius: 8, marginRight: 10 }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 6 }]} onPress={() => openDonationModal(selectedCause)}>
            <Text style={styles.buttonText}>💰 Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 6, backgroundColor: favoritesCauses.includes(selectedCause?.id) ? '#d32f2f' : '#9c27b0' }]}
            onPress={() => toggleFavorite(selectedCause?.id)}
          >
            <Text style={styles.buttonText}>{favoritesCauses.includes(selectedCause?.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton, { flex: 1 }]} onPress={() => requestToJoinCause(selectedCause)}>
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => setCurrentScreen('userDashboard')}>
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderWhereToDonate = () => (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Where to Donate</Text></View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.infoCard}><Text style={{ fontWeight: 'bold' }}>GCash</Text><Text>Send to 0917-XXX-XXXX</Text></View>
        <View style={styles.infoCard}><Text style={{ fontWeight: 'bold' }}>Online Bank</Text><Text>Example Bank • Account: 123456789</Text></View>
        <View style={styles.infoCard}><Text style={{ fontWeight: 'bold' }}>In-App Balance</Text><Text>Use your wallet to donate quickly</Text></View>
        <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={() => setCurrentScreen('home')}><Text style={styles.buttonText}>Back</Text></TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderLeaderboard = () => {
    const sortedUsers = [...users.filter(u => u.type === 'user')].sort((a, b) => (b.totalDonated || 0) - (a.totalDonated || 0));
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
          <Text style={styles.headerSubtitle}>Top Donors This Month</Text>
        </View>
        <ScrollView style={styles.content}>
          {sortedUsers.length === 0 ? (
            <Text style={styles.emptyText}>No donors yet</Text>
          ) : (
            sortedUsers.map((user, idx) => (
              <View key={user.id} style={[styles.leaderboardCard, idx === 0 && { backgroundColor: '#fff59d', borderLeftColor: '#FFD700', borderLeftWidth: 4 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 24, marginRight: 12, fontWeight: 'bold', color: '#6200ea' }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </Text>
                    <View>
                      <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333' }}>{user.name}</Text>
                      <Text style={{ fontSize: 12, color: '#666' }}>{user.rank || 'New Donor'}</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#6200ea' }}>₱{(user.totalDonated || 0).toLocaleString()}</Text>
                    <Text style={{ fontSize: 12, color: '#666' }}>{user.points || 0} pts</Text>
                  </View>
                </View>
              </View>
            ))
          )}
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => setCurrentScreen('userDashboard')}>
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderAchievements = () => {
    const badgesList = Object.values(BADGES);
    const userBadgeNames = currentUser.badges?.map(b => b.name) || [];
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎯 Achievements</Text>
          <Text style={styles.headerSubtitle}>Unlock badges and reach new heights!</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12, color: '#666' }}>
            You have unlocked {currentUser.badges?.length || 0} / {badgesList.length} badges
          </Text>
          
          {badgesList.map((badge, idx) => {
            const isUnlocked = userBadgeNames.includes(badge.name);
            return (
              <View key={idx} style={[styles.achievementCard, !isUnlocked && { opacity: 0.5 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 32, marginRight: 12 }}>{isUnlocked ? badge.icon : '🔒'}</Text>
                    <View>
                      <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#333' }}>{badge.name}</Text>
                      <Text style={{ fontSize: 12, color: '#666' }}>{badge.title}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: isUnlocked ? '#6200ea' : '#ccc' }}>
                    {isUnlocked ? '✓ Unlocked' : 'Locked'}
                  </Text>
                </View>
              </View>
            );
          })}
          
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => setCurrentScreen('userDashboard')}>
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderAchievementModal = () => (
    <Modal visible={showAchievementModal} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { alignItems: 'center' }]}>
          <Text style={{ fontSize: 48, marginBottom: 15 }}>{newAchievement?.icon}</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#6200ea', textAlign: 'center' }}>
            🎉 Achievement Unlocked! 🎉
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#333', textAlign: 'center' }}>
            {newAchievement?.name}
          </Text>
          <Text style={{ fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' }}>
            {newAchievement?.message}
          </Text>
          <TouchableOpacity 
            style={[styles.button, { width: '100%' }]}
            onPress={() => setShowAchievementModal(false)}
          >
            <Text style={styles.buttonText}>Awesome! 🎊</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderShareModal = () => (
    <Modal visible={showShareModal} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>📱 Share This Cause</Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 15, textAlign: 'center' }}>
            Share on social media and earn 5 bonus points!
          </Text>
          
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Share on:</Text>
            
            <TouchableOpacity 
              style={[styles.button, { marginBottom: 8, backgroundColor: '#3b5998' }]}
              onPress={() => handleShareDonation('facebook')}
            >
              <Text style={styles.buttonText}>📘 Share on Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { marginBottom: 8, backgroundColor: '#1da1f2' }]}
              onPress={() => handleShareDonation('twitter')}
            >
              <Text style={styles.buttonText}>🐦 Share on Twitter</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { marginBottom: 8, backgroundColor: '#25d366' }]}
              onPress={() => handleShareDonation('whatsapp')}
            >
              <Text style={styles.buttonText}>💬 Share on WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { marginBottom: 8, backgroundColor: '#e1306c' }]}
              onPress={() => handleShareDonation('instagram')}
            >
              <Text style={styles.buttonText}>📷 Share on Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#ea4335' }]}
              onPress={() => handleShareDonation('email')}
            >
              <Text style={styles.buttonText}>✉️ Share via Email</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={() => setShowShareModal(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderReferralModal = () => (
    <Modal visible={showReferralModal} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>🤝 Invite Friends & Earn!</Text>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 15, textAlign: 'center' }}>
            Share your referral code and earn ₱50 for each friend who joins!
          </Text>

          <View style={styles.infoCard}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Your Referral Code:</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6200ea' }}>{referralCode}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Referral Link:</Text>
            <Text style={{ fontSize: 12, color: '#666', fontFamily: 'monospace' }}>{referralLink}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>How it works:</Text>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>✅ Friend joins with your code</Text>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>✅ They make first donation</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>✅ You get ₱50 bonus + 50 pts</Text>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <TouchableOpacity 
              style={[styles.button, { flex: 1, marginRight: 6 }]}
              onPress={() => {
                Alert.alert('Copied!', `Code copied: ${referralCode}`);
              }}
            >
              <Text style={styles.buttonText}>📋 Copy Code</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { flex: 1, marginLeft: 6 }]}
              onPress={() => {
                Alert.alert('Share Link', `Share this: ${referralLink}`);
              }}
            >
              <Text style={styles.buttonText}>📤 Share Link</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={() => setShowReferralModal(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderChallenges = () => {
    if (!challenges.length) {
      initializeChallenges();
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎯 Challenges</Text>
          <Text style={styles.headerSubtitle}>Complete challenges and earn rewards!</Text>
        </View>
        <ScrollView style={styles.content}>
          {challenges.map(challenge => {
            const user = currentUser;
            let progress = 0;
            let isCompleted = user?.completedChallenges?.includes(challenge.id);

            if (challenge.type === 'shares') progress = user?.socialShares || 0;
            else if (challenge.type === 'categories') progress = user?.categoriesDonatedTo?.length || 0;
            else if (challenge.type === 'referrals') progress = user?.referralCount || 0;
            else if (challenge.type === 'amount') progress = user?.totalDonated || 0;

            const progressPercent = Math.min((progress / challenge.requirement) * 100, 100);

            return (
              <View key={challenge.id} style={[styles.causeCard, isCompleted && { backgroundColor: '#c8e6c9', borderLeftColor: '#4caf50', borderLeftWidth: 4 }]}>
                <View style={{ padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: 24 }}>{challenge.icon}</Text>
                    {isCompleted && <Text style={{ fontSize: 18 }}>✅</Text>}
                  </View>
                  
                  <Text style={[styles.causeTitle, { marginBottom: 5 }]}>{challenge.title}</Text>
                  <Text style={{ fontSize: 12, color: '#666', marginBottom: 10 }}>{challenge.description}</Text>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(progressPercent)}%</Text>
                  </View>

                  <Text style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                    Progress: {progress} / {challenge.requirement}
                  </Text>

                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#6200ea', marginTop: 10 }}>
                    Reward: +{challenge.reward} {challenge.rewardType}
                  </Text>

                  {!isCompleted && (
                    <TouchableOpacity 
                      style={[styles.button, { marginTop: 10 }]}
                      onPress={() => checkChallengeCompletion(currentUser.id)}
                    >
                      <Text style={styles.buttonText}>Check Progress</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton, { marginTop: 20 }]}
            onPress={() => setCurrentScreen('userDashboard')}
          >
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const renderViralGrowth = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚀 Go Viral</Text>
        <Text style={styles.headerSubtitle}>Grow our community!</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>📊 Your Impact</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser?.socialShares || 0}</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentUser?.referralCount || 0}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₱{currentUser?.referralBonus || 0}</Text>
            <Text style={styles.statLabel}>Bonuses</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>🎮 Quick Actions</Text>
        
        <TouchableOpacity 
          style={[styles.button, { marginBottom: 12 }]}
          onPress={() => setShowShareModal(true)}
        >
          <Text style={styles.buttonText}>📱 Share a Cause</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { marginBottom: 12 }]}
          onPress={handleCreateReferral}
        >
          <Text style={styles.buttonText}>🤝 Invite Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => setCurrentScreen('challenges')}
        >
          <Text style={styles.buttonText}>🎯 View Challenges</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>💡 Tips for Viral Growth</Text>
        <View style={styles.infoCard}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>📱 Social Sharing</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Share causes on Facebook, Twitter, Instagram, WhatsApp</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Earn 5 bonus points per share</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Complete the "Share & Shine" challenge</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>🤝 Referral Program</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Share your referral code with friends</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Earn ₱50 + 50 pts for each successful referral</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Referred friend also gets ₱25 bonus!</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>🎯 Challenges</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Complete 4 different challenges</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Earn bonus points and special badges</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>• Compete with other donors!</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.logoutButton, { marginTop: 20 }]}
          onPress={() => setCurrentScreen('userDashboard')}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'register' && renderRegister()}
      {currentScreen === 'login' && renderLogin()}
      {currentScreen === 'userDashboard' && renderUserDashboard()}
      {currentScreen === 'adminDashboard' && renderAdminDashboard()}
      {currentScreen === 'causeDetail' && renderCauseDetail()}
      {currentScreen === 'whereToDonate' && renderWhereToDonate()}
      {currentScreen === 'leaderboard' && renderLeaderboard()}
      {currentScreen === 'achievements' && renderAchievements()}
      {currentScreen === 'challenges' && renderChallenges()}
      {currentScreen === 'viralGrowth' && renderViralGrowth()}
      {renderDonationModal()}
      {renderPaymentInstructions()}
      {renderAddCauseModal()}
      {renderAchievementModal()}
      {renderShareModal()}
      {renderReferralModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e9e7ff',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2e1847ff',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5b0af1ff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  balanceContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#03dac6',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
  },
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
  testCredentials: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  testTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  testText: {
    fontSize: 12,
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  causeCard: {
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  causeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  causeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 12,
    marginBottom: 10,
  },
  causeTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  causeCategory: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    borderRadius: 4,
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ea',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  causeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  raisedText: {
    fontSize: 14,
    color: '#666',
  },
  donateButton: {
    backgroundColor: '#6200ea',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  donateButtonText: {
    color: '#df1515ff',
    fontWeight: '600',
  },
  donationCard: {
    backgroundColor: '#d88f8fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  donationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  donationSubtitle: {
    fontSize: 14,
    color: '#8f4b4bff',
    marginBottom: 5,
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  donationDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    marginTop: 20,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalBalance: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  quickAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  quickButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  quickButtonText: {
    fontWeight: '600',
  },
  methodButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  methodSelected: {
    backgroundColor: '#6200ea',
  },
  methodText: {
    color: '#000',
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  pickerOption: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    margin: 5,
  },
  pickerOptionSelected: {
    backgroundColor: '#6200ea',
  },
  detailSection: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  updateItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#6200ea',
  },
  updateText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  // Gamification Styles
  gamificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ea',
  },
  leaderboardCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#6200ea',
  },
  achievementCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  shareButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  referralCard: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 4,
  },
  challengeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftColor: '#2196F3',
    borderLeftWidth: 4,
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    minWidth: 40,
    textAlign: 'right',
  },
  paymentMethodChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  paymentMethodChipSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  paymentMethodChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  methodButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  methodSelected: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  methodText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 13,
  },
  bnplOption: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  bnplOptionSelected: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ea',
  },
});

export default App; 