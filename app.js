// App State
const state = {
    currentUser: null,
    currentPage: 'home',
    isLoggedIn: false
};

// Mock Data
const mockData = {
    projects: [
        {
            id: 1,
            title: "Video Editing for YouTube Channel",
            budget: "$500",
            deadline: "7 days",
            category: "video",
            skills: ["Premiere Pro", "After Effects"]
        },
        {
            id: 2,
            title: "Logo Design for Tech Startup",
            budget: "$300",
            deadline: "3 days",
            category: "design",
            skills: ["Illustrator", "Photoshop"]
        },
        {
            id: 3,
            title: "Full Stack Web Application",
            budget: "$2000",
            deadline: "30 days",
            category: "development",
            skills: ["React", "Node.js", "MongoDB"]
        }
    ],
    
    messages: [
        {
            id: 1,
            name: "John Smith",
            avatar: "JS",
            lastMessage: "When can you start the project?",
            time: "5m ago",
            unread: 2
        },
        {
            id: 2,
            name: "Sarah Johnson",
            avatar: "SJ",
            lastMessage: "The design looks perfect!",
            time: "1h ago",
            unread: 0
        },
        {
            id: 3,
            name: "Mike Chen",
            avatar: "MC",
            lastMessage: "Please check the latest files",
            time: "2h ago",
            unread: 1
        }
    ],
    
    transactions: [
        {
            id: 1,
            type: "credit",
            amount: "$500",
            description: "Payment received from John",
            date: "Today"
        },
        {
            id: 2,
            type: "debit",
            amount: "$50",
            description: "Withdrawal to bank",
            date: "Yesterday"
        },
        {
            id: 3,
            type: "credit",
            amount: "$200",
            description: "Bonus for top rating",
            date: "2 days ago"
        }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        checkAuth();
    }, 2000);
});

// Check Authentication
function checkAuth() {
    const savedUser = localStorage.getItem('gigamerge_user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        state.isLoggedIn = true;
        loadPage('home');
    } else {
        showLoginPage();
    }
}

// Show Login Page
function showLoginPage() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <div class="login-container">
            <div class="login-header">
                <h1>Welcome Back</h1>
                <p>Sign in to continue</p>
            </div>
            
            <div class="login-form glass-card">
                <form id="loginForm">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
                </form>
                
                <div class="social-login">
                    <div class="social-btn" onclick="googleLogin()">
                        <i class="fab fa-google"></i>
                    </div>
                    <div class="social-btn" onclick="githubLogin()">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="social-btn" onclick="facebookLogin()">
                        <i class="fab fa-facebook-f"></i>
                    </div>
                </div>
                
                <p style="text-align: center; margin-top: 20px;">
                    Don't have an account? 
                    <a href="#" onclick="showRegister()" style="color: white; font-weight: 600;">Sign Up</a>
                </p>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        login();
    });
}

// Login Function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        state.currentUser = {
            email: email,
            name: email.split('@')[0],
            avatar: email[0].toUpperCase()
        };
        state.isLoggedIn = true;
        
        localStorage.setItem('gigamerge_user', JSON.stringify(state.currentUser));
        
        // Show success message
        showNotification('Login successful! Welcome back!', 'success');
        
        // Load home page
        loadPage('home');
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Show Registration Page
function showRegister() {
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <div class="login-container">
            <div class="login-header">
                <h1>Create Account</h1>
                <p>Join GigaMerge Studio</p>
            </div>
            
            <div class="login-form glass-card">
                <form id="registerForm">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter your name" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="regEmail" placeholder="Enter your email" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="regPassword" placeholder="Create password" required>
                    </div>
                    
                    <div class="form-group">
                        <label>I want to</label>
                        <select id="userRole" style="width: 100%; padding: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;">
                            <option value="client">Hire Freelancers</option>
                            <option value="freelancer">Work as Freelancer</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign Up</button>
                </form>
                
                <p style="text-align: center; margin-top: 20px;">
                    Already have an account? 
                    <a href="#" onclick="showLoginPage()" style="color: white; font-weight: 600;">Sign In</a>
                </p>
            </div>
        </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        register();
    });
}

// Register Function
function register() {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (name && email && password) {
        state.currentUser = {
            name: name,
            email: email,
            role: role,
            avatar: name[0].toUpperCase()
        };
        state.isLoggedIn = true;
        
        localStorage.setItem('gigamerge_user', JSON.stringify(state.currentUser));
        
        showNotification('Account created successfully!', 'success');
        loadPage('home');
    }
}

// Load Pages
function loadPage(page) {
    if (!state.isLoggedIn && page !== 'login') {
        showLoginPage();
        return;
    }
    
    state.currentPage = page;
    updateActiveNav(page);
    
    const content = document.getElementById('page-content');
    content.className = 'slide-up';
    
    switch(page) {
        case 'home':
            loadHomePage(content);
            break;
        case 'projects':
            loadProjectsPage(content);
            break;
        case 'messages':
            loadMessagesPage(content);
            break;
        case 'wallet':
            loadWalletPage(content);
            break;
        case 'profile':
            loadProfilePage(content);
            break;
        default:
            loadHomePage(content);
    }
}

// Load Home Page
function loadHomePage(content) {
    content.innerHTML = `
        <div class="welcome-section">
            <h1>Welcome, ${state.currentUser?.name || 'Freelancer'}! 👋</h1>
            <p>Find your next opportunity</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Active Projects</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">$2.5k</div>
                <div class="stat-label">Earnings</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">4.9★</div>
                <div class="stat-label">Rating</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">45</div>
                <div class="stat-label">Completed</div>
            </div>
        </div>
        
        <h2 style="margin-bottom: 15px;">Popular Categories</h2>
        <div class="categories-grid">
            <div class="category-item">
                <i class="fas fa-video"></i>
                <span>Video</span>
            </div>
            <div class="category-item">
                <i class="fas fa-paint-brush"></i>
                <span>Design</span>
            </div>
            <div class="category-item">
                <i class="fas fa-code"></i>
                <span>Dev</span>
            </div>
            <div class="category-item">
                <i class="fas fa-music"></i>
                <span>Audio</span>
            </div>
            <div class="category-item">
                <i class="fas fa-camera"></i>
                <span>Photo</span>
            </div>
            <div class="category-item">
                <i class="fas fa-mobile-alt"></i>
                <span>Mobile</span>
            </div>
        </div>
        
        <h2 style="margin-bottom: 15px;">Recommended Projects</h2>
        <div id="projects-list"></div>
    `;
    
    // Load projects
    const projectsList = document.getElementById('projects-list');
    mockData.projects.forEach(project => {
        projectsList.innerHTML += `
            <div class="project-item" onclick="viewProject(${project.id})">
                <div class="project-icon">
                    <i class="fas fa-${project.category === 'video' ? 'video' : project.category === 'design' ? 'paint-brush' : 'code'}"></i>
                </div>
                <div class="project-info">
                    <div class="project-title">${project.title}</div>
                    <div class="project-meta">
                        <span><i class="far fa-clock"></i> ${project.deadline}</span>
                        <span class="project-budget">${project.budget}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// Load Projects Page
function loadProjectsPage(content) {
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2>Available Projects</h2>
            <button class="btn btn-primary" onclick="showCreateProject()">
                <i class="fas fa-plus"></i> Post
            </button>
        </div>
        
        <div class="search-box" style="margin-bottom: 20px;">
            <input type="text" placeholder="Search projects..." style="width: 100%; padding: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: white;">
        </div>
        
        <div id="all-projects-list"></div>
    `;
    
    const projectsList = document.getElementById('all-projects-list');
    mockData.projects.forEach(project => {
        projectsList.innerHTML += `
            <div class="project-item" onclick="viewProject(${project.id})">
                <div class="project-icon">
                    <i class="fas fa-${project.category === 'video' ? 'video' : project.category === 'design' ? 'paint-brush' : 'code'}"></i>
                </div>
                <div class="project-info">
                    <div class="project-title">${project.title}</div>
                    <div class="project-meta">
                        <span><i class="fas fa-tag"></i> ${project.skills.join(', ')}</span>
                    </div>
                    <div class="project-meta" style="margin-top: 5px;">
                        <span><i class="far fa-clock"></i> ${project.deadline}</span>
                        <span class="project-budget">${project.budget}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// Load Messages Page
function loadMessagesPage(content) {
    content.innerHTML = `
        <h2 style="margin-bottom: 20px;">Messages</h2>
        <div id="messages-list"></div>
    `;
    
    const messagesList = document.getElementById('messages-list');
    mockData.messages.forEach(message => {
        messagesList.innerHTML += `
            <div class="message-item" onclick="openChat(${message.id})">
                <div class="message-avatar">${message.avatar}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-name">${message.name}</span>
                        <span class="message-time">${message.time}</span>
                    </div>
                    <div class="message-preview">${message.lastMessage}</div>
                </div>
                ${message.unread > 0 ? `<div class="unread-badge" style="background: var(--primary); color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">${message.unread}</div>` : ''}
            </div>
        `;
    });
}

// Load Wallet Page
function loadWalletPage(content) {
    content.innerHTML = `
        <div class="wallet-header">
            <div class="wallet-balance">$1,234.56</div>
            <div class="wallet-label">Available Balance</div>
        </div>
        
        <div class="wallet-actions">
            <button class="btn btn-primary" onclick="addFunds()">
                <i class="fas fa-plus-circle"></i> Add
            </button>
            <button class="btn" onclick="withdrawFunds()">
                <i class="fas fa-arrow-up"></i> Withdraw
            </button>
        </div>
        
        <h3 style="margin-bottom: 15px;">Recent Transactions</h3>
        <div id="transactions-list"></div>
    `;
    
    const transactionsList = document.getElementById('transactions-list');
    mockData.transactions.forEach(transaction => {
        transactionsList.innerHTML += `
            <div class="project-item" style="margin-bottom: 10px;">
                <div class="project-icon" style="background: ${transaction.type === 'credit' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'}">
                    <i class="fas fa-${transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div class="project-info">
                    <div class="project-title">${transaction.description}</div>
                    <div class="project-meta">
                        <span>${transaction.date}</span>
                        <span style="color: ${transaction.type === 'credit' ? '#10b981' : '#ef4444'}; font-weight: 600;">${transaction.amount}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// Load Profile Page
function loadProfilePage(content) {
    content.innerHTML = `
        <div class="profile-header" style="text-align: center; margin-bottom: 30px;">
            <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 700;">
                ${state.currentUser?.avatar || 'U'}
            </div>
            <h2>${state.currentUser?.name || 'User'}</h2>
            <p>${state.currentUser?.email || 'user@example.com'}</p>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
                <span class="badge" style="background: var(--success); padding: 5px 15px; border-radius: 20px; font-size: 0.8rem;">Verified</span>
                <span class="badge" style="background: var(--primary); padding: 5px 15px; border-radius: 20px; font-size: 0.8rem;">Premium</span>
            </div>
        </div>
        
        <div class="glass-card">
            <h3>Statistics</h3>
            <div style="margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Total Projects</span>
                    <span style="font-weight: 600;">45</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Completion Rate</span>
                    <span style="font-weight: 600;">98%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Response Time</span>
                    <span style="font-weight: 600;">2 minutes</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Rating</span>
                    <span style="font-weight: 600;">4.9 ★ (128 reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="glass-card">
            <h3>Skills</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px;">
                <span style="background: rgba(99, 102, 241, 0.3); padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;">Video Editing</span>
                <span style="background: rgba(139, 92, 246, 0.3); padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;">Premiere Pro</span>
                <span style="background: rgba(99, 102, 241, 0.3); padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;">After Effects</span>
                <span style="background: rgba(139, 92, 246, 0.3); padding: 5px 12px; border-radius: 20px; font-size: 0.9rem;">Photoshop</span>
            </div>
        </div>
        
        <button class="btn" style="width: 100%; margin-top: 20px;" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i> Logout
        </button>
    `;
}

// Utility Functions
function updateActiveNav(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'}; 
                    color: white; 
                    padding: 12px 20px; 
                    border-radius: 10px; 
                    position: fixed; 
                    top: 80px; 
                    left: 20px; 
                    right: 20px; 
                    z-index: 1000;
                    text-align: center;">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function logout() {
    localStorage.removeItem('gigamerge_user');
    state.currentUser = null;
    state.isLoggedIn = false;
    showLoginPage();
    showNotification('Logged out successfully', 'success');
}

function viewProject(id) {
    showNotification('Project details feature coming soon!', 'info');
}

function openChat(id) {
    showNotification('Chat feature coming soon!', 'info');
}

function addFunds() {
    showNotification('Add funds feature coming soon!', 'info');
}

function withdrawFunds() {
    showNotification('Withdraw feature coming soon!', 'info');
}

function showCreateProject() {
    showNotification('Create project feature coming soon!', 'info');
}

// Social Login Handlers
function googleLogin() {
    showNotification('Google login coming soon!', 'info');
}

function githubLogin() {
    showNotification('GitHub login coming soon!', 'info');
}

function facebookLogin() {
    showNotification('Facebook login coming soon!', 'info');
}

// Initialize bottom navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        loadPage(page);
    });
});

// Search icon handler
document.getElementById('search-icon')?.addEventListener('click', () => {
    loadPage('projects');
});

// Notification handler
document.getElementById('notification-icon')?.addEventListener('click', () => {
    showNotification('You have 3 new notifications!', 'info');
});

// Profile icon handler
document.getElementById('profile-icon')?.addEventListener('click', () => {
    loadPage('profile');
});
function loadHomePage(content) {
    content.innerHTML = `
        <div class="welcome-section">
            <h1>Welcome, ${state.currentUser?.name || 'Freelancer'}! 👋</h1>
            <p>Find your next opportunity</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Active Projects</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">$2.5k</div>
                <div class="stat-label">Earnings</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">4.9★</div>
                <div class="stat-label">Rating</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">45</div>
                <div class="stat-label">Completed</div>
            </div>
        </div>
        
        <h2 style="margin-bottom: 15px;">Popular Categories</h2>
        <div class="categories-grid">
            <div class="category-item">
                <i class="fas fa-video"></i>
                <span>Video</span>
            </div>
            <div class="category-item">
                <i class="fas fa-paint-brush"></i>
                <span>Design</span>
            </div>
            <div class="category-item">
                <i class="fas fa-code"></i>
                <span>Dev</span>
            </div>
            <div class="category-item">
                <i class="fas fa-music"></i>
                <span>Audio</span>
            </div>
            <div class="category-item">
                <i class="fas fa-camera"></i>
                <span>Photo</span>
            </div>
            <div class="category-item">
                <i class="fas fa-mobile-alt"></i>
                <span>Mobile</span>
            </div>
        </div>
        
        <!-- Founders Section -->
        <div class="flip-card-container">
            <h2 class="section-title">🌟 Meet Our Founders</h2>
            <div class="founders-grid" id="founders-grid"></div>
        </div>
        
        <!-- Creators Section -->
        <div class="flip-card-container">
            <h2 class="section-title">🎨 Top Creators</h2>
            <div class="creators-grid" id="creators-grid"></div>
        </div>
        
        <h2 style="margin-bottom: 15px;">Recommended Projects</h2>
        <div id="projects-list"></div>
    `;
    
    // Load founders
    const foundersGrid = document.getElementById('founders-grid');
    const founders = [
        { name: "SHAURYA KUSHWAHA", role: "CEO & Co-Founder", image: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "HARSH KUSHWAHA", role: "Co-founder", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Shubham Maurya", role: "Man Director", image: "https://randomuser.me/api/portraits/men/45.jpg" }
    ];
    founders.forEach(founder => {
        foundersGrid.appendChild(createFlipCard(founder.name, founder.role, founder.image));
    });
    
    // Load creators
    const creatorsGrid = document.getElementById('creators-grid');
    const creators = [
        { name: "Elena Rodriguez", role: "Video Editor", image: "https://randomuser.me/api/portraits/women/22.jpg" },
        { name: "David Kim", role: "Motion Designer", image: "https://randomuser.me/api/portraits/men/12.jpg" },
        { name: "Nina Patel", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/95.jpg" },
        { name: "Omar Hassan", role: "3D Artist", image: "https://randomuser.me/api/portraits/men/78.jpg" }
    ];
    creators.forEach(creator => {
        creatorsGrid.appendChild(createFlipCard(creator.name, creator.role, creator.image));
    });
    
    // Load projects
    const projectsList = document.getElementById('projects-list');
    mockData.projects.forEach(project => {
        projectsList.innerHTML += `
            <div class="project-item" onclick="viewProject(${project.id})">
                <div class="project-icon">
                    <i class="fas fa-${project.category === 'video' ? 'video' : project.category === 'design' ? 'paint-brush' : 'code'}"></i>
                </div>
                <div class="project-info">
                    <div class="project-title">${project.title}</div>
                    <div class="project-meta">
                        <span><i class="far fa-clock"></i> ${project.deadline}</span>
                        <span class="project-budget">${project.budget}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// Helper function to create a flip card
function createFlipCard(name, role, imageUrl) {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <div class="card-name">${name}</div>
                <div class="card-role">${role}</div>
                <i class="fas fa-user-circle" style="font-size: 3rem; margin-top: 10px; opacity: 0.7;"></i>
                <small style="margin-top: 5px;">Click to reveal</small>
            </div>
            <div class="flip-card-back">
                <img src="${imageUrl}" alt="${name}" class="card-image" onerror="this.src='https://via.placeholder.com/120?text=Image'">
                <div class="card-name">${name}</div>
                <div class="card-role">${role}</div>
            </div>
        </div>
    `;
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
    });
    return card;
}
function loadHomePage(content) {
    content.innerHTML = `
        <!-- Welcome & Stats -->
        <div class="welcome-section">
            <h1>Welcome, ${state.currentUser?.name || 'Freelancer'}!</h1>
            <p>Find your next opportunity</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item"><div class="stat-value">12</div><div class="stat-label">Active Projects</div></div>
            <div class="stat-item"><div class="stat-value">$2.5k</div><div class="stat-label">Earnings</div></div>
            <div class="stat-item"><div class="stat-value">4.9★</div><div class="stat-label">Rating</div></div>
            <div class="stat-item"><div class="stat-value">45</div><div class="stat-label">Completed</div></div>
        </div>
        
        <!-- Popular Categories -->
        <h2 style="margin-bottom: 15px;">Popular Categories</h2>
        <div class="categories-grid">
            <div class="category-item"><i class="fas fa-video"></i><span>Video</span></div>
            <div class="category-item"><i class="fas fa-paint-brush"></i><span>Design</span></div>
            <div class="category-item"><i class="fas fa-code"></i><span>Dev</span></div>
            <div class="category-item"><i class="fas fa-music"></i><span>Audio</span></div>
            <div class="category-item"><i class="fas fa-camera"></i><span>Photo</span></div>
            <div class="category-item"><i class="fas fa-mobile-alt"></i><span>Mobile</span></div>
        </div>
        
        <!-- About Section (unchanged) -->
        <div class="about-section" id="about-section">
            <div class="about-container">
                <div class="about-text">
                    <h3>GigaMerge Studio</h3>
                    <div class="tagline">Where Creativity Meets Opportunity</div>
                    <p><strong>What is GigaMerge?</strong> A premium ecosystem connecting top-tier creative talent with ambitious clients. We blend AI-driven matching, secure escrow payments, and a community-first approach to redefine freelance collaboration.</p>
                    <p><strong>Vision:</strong> To become the world's most trusted creative marketplace where talent thrives and clients succeed.</p>
                    <p><strong>Mission:</strong> Empower creators with tools, exposure, and fair compensation; provide clients with vetted professionals and seamless project management.</p>
                    <div class="about-stats">
                        <div class="stat-badge"><span class="number">5000+</span><span class="label">Projects</span></div>
                        <div class="stat-badge"><span class="number">2000+</span><span class="label">Creators</span></div>
                        <div class="stat-badge"><span class="number">98%</span><span class="label">Satisfaction</span></div>
                    </div>
                    <div class="about-buttons">
                        <button class="btn-glow btn-primary-glow" onclick="applyMembership()">Apply for Membership</button>
                        <button class="btn-glow" onclick="downloadAgreement()">Download Agreement</button>
                    </div>
                </div>
                <div class="about-visual"><div class="glow-orb"></div></div>
            </div>
        </div>
        
        <!-- ========== FOUNDERS SECTION 1: Core Founders ========== -->
        <div class="flip-card-container stagger-item" id="founders-container">
            <h2 class="section-title">🌟 Core Founders</h2>
            <div class="founders-grid" id="founders-grid"></div>
        </div>
        
        <!-- ========== FOUNDERS SECTION 2: Strategic Founders ========== -->
        <div class="flip-card-container stagger-item" id="strategic-founders-container">
            <h2 class="section-title">📈 Strategic Founders</h2>
            <div class="founders-grid" id="strategic-founders-grid"></div>
        </div>
        
        
        <!-- Creators & Editors Section (unchanged) -->
        <div class="flip-card-container stagger-item" id="creators-container">
            <h2 class="section-title">🎨 Top Editors & Creators</h2>
            <div class="creators-grid" id="creators-grid"></div>
        </div>
        
        <!-- Recommended Projects -->
        <h2 style="margin-bottom: 15px;">Recommended Projects</h2>
        <div id="projects-list"></div>
    `;
    
    // ========== 1. CORE FOUNDERS (existing) ==========
    const foundersGrid = document.getElementById('founders-grid');
    const coreFounders = [
        { name: "GTM", role: "Founder", image: "https://randomuser.me/api/portraits/men/32.jpg", social: { twitter: "#", linkedin: "#", github: "#" } },
        { name: "Shaurya Kushwaha", role: "CEO", image: "https://randomuser.me/api/portraits/women/68.jpg", social: { twitter: "#", linkedin: "#", github: "#" } },
        { name: "Harsh Kushwaha", role: "Co-founder", image: "https://randomuser.me/api/portraits/men/45.jpg", social: { twitter: "#", linkedin: "#", instagram: "#" } },
        { name: "Shubham Maurya", role: "Managing Director", image: "https://randomuser.me/api/portraits/women/44.jpg", social: { twitter: "#", linkedin: "#", behance: "#" } },
        { name: "Shubham Kushwaha", role: "CTO", image: "https://randomuser.me/api/portraits/men/22.jpg", social: { twitter: "#", linkedin: "#" } },
        { name: "Shubham Gupta", role: "CMO", image: "https://randomuser.me/api/portraits/women/17.jpg", social: { twitter: "#", linkedin: "#", github: "#" } }
    ];
    coreFounders.forEach(founder => {
        foundersGrid.appendChild(createFlipCard(founder.name, founder.role, founder.image, founder.social));
    });
    
    // ========== 2. STRATEGIC FOUNDERS ==========
    const strategicGrid = document.getElementById('strategic-founders-grid');
    const strategicFounders = [
        { name: "GTM", role: "Chairperson", image: "https://randomuser.me/api/portraits/men/91.jpg", social: { linkedin: "#", twitter: "#" } },
        { name: "Shubham Maurya", role: "Investor Relations", image: "https://randomuser.me/api/portraits/women/29.jpg", social: { linkedin: "#", twitter: "#" } },
        { name: "Shaurya Kushwaha", role: "COO", image: "https://randomuser.me/api/portraits/men/62.jpg", social: { linkedin: "#", instagram: "#" } },
        { name: "Harsh Kushwaha", role: "Community Lead", image: "https://randomuser.me/api/portraits/women/56.jpg", social: { twitter: "#", linkedin: "#" } }
    ];
    strategicFounders.forEach(founder => {
        strategicGrid.appendChild(createFlipCard(founder.name, founder.role, founder.image, founder.social));
    });
    
    // ========== CREATORS & EDITORS ==========
    const creatorsGrid = document.getElementById('creators-grid');
    const creators = [
        { name: "Elena Rodriguez", role: "Video Editor", image: "https://randomuser.me/api/portraits/women/22.jpg", description: "Award-winning editor with 10+ years experience.", social: { twitter: "#", instagram: "#" } },
        { name: "David Kim", role: "Video Editor", image: "https://randomuser.me/api/portraits/men/12.jpg", description: "Specializes in cinematic motion graphics.", social: { twitter: "#", dribbble: "#" } },
        { name: "Olivia Chen", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/95.jpg", description: "Creates intuitive, beautiful interfaces.", social: { linkedin: "#", behance: "#" } },
        { name: "Omar Hassan", role: "3D Artist", image: "https://randomuser.me/api/portraits/men/78.jpg", description: "Expert in Blender and Unreal Engine.", social: { instagram: "#", artstation: "#" } },
        { name: "Liam Patel", role: "Editor of the Week", image: "https://randomuser.me/api/portraits/men/55.jpg", description: "⭐ Top-rated editor this week! Exceptional storytelling.", special: "week", social: { twitter: "#", linkedin: "#" } },
        { name: "Sophia Martinez", role: "Editor of the Month", image: "https://randomuser.me/api/portraits/women/33.jpg", description: "🏆 Best editor of May – 50+ perfect reviews.", special: "month", social: { instagram: "#", twitter: "#" } }
    ];
    creators.forEach(creator => {
        let card = createFlipCard(creator.name, creator.role, creator.image, creator.social, creator.description);
        if (creator.special) {
            card.classList.add('special-card');
            const badge = document.createElement('div');
            badge.className = 'card-badge';
            badge.innerText = creator.special === 'week' ? '⭐ EDITOR OF THE WEEK' : '🏆 EDITOR OF THE MONTH';
            card.appendChild(badge);
        }
        creatorsGrid.appendChild(card);
    });
    
    // Load projects (unchanged)
    const projectsList = document.getElementById('projects-list');
    mockData.projects.forEach(project => {
        projectsList.innerHTML += `
            <div class="project-item" onclick="viewProject(${project.id})">
                <div class="project-icon">
                    <i class="fas fa-${project.category === 'video' ? 'video' : project.category === 'design' ? 'paint-brush' : 'code'}"></i>
                </div>
                <div class="project-info">
                    <div class="project-title">${project.title}</div>
                    <div class="project-meta">
                        <span><i class="far fa-clock"></i> ${project.deadline}</span>
                        <span class="project-budget">${project.budget}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Trigger animations after content is loaded
    setTimeout(initAnimations, 100);
}
// ========== PROFILE MANAGEMENT ==========

// Load user profile from localStorage (or initialize with defaults)
function loadUserProfile() {
    let user = state.currentUser;
    if (!user) return null;
    
    // If profile details missing, add defaults
    if (!user.profile) {
        user.profile = {
            name: user.name || '',
            role: user.role || 'Freelancer',
            bio: 'Creative professional passionate about delivering high-quality work.',
            address: '',
            portfolio: '',
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=6366f1&color=fff`,
            social: {
                twitter: '',
                linkedin: '',
                github: '',
                instagram: '',
                behance: '',
                dribbble: ''
            }
        };
        // Save back to state and localStorage
        state.currentUser = user;
        localStorage.setItem('gigamerge_user', JSON.stringify(user));
    }
    return user.profile;
}

// Save profile from form data
function saveProfile(formData) {
    const user = state.currentUser;
    if (!user) return false;
    
    // Update profile fields
    user.profile = {
        ...user.profile,
        ...formData
    };
    // Also update top-level name for consistency
    user.name = formData.name || user.name;
    user.avatar = formData.avatar || user.avatar;
    
    // Save to state and localStorage
    state.currentUser = user;
    localStorage.setItem('gigamerge_user', JSON.stringify(user));
    
    // Refresh the profile page to show updated data
    loadPage('profile');
    showNotification('Profile updated successfully!', 'success');
    return true;
}
function loadProfilePage(content) {
    const profile = loadUserProfile();
    if (!profile) {
        content.innerHTML = '<p>Loading profile...</p>';
        return;
    }
    
    // Build social inputs (only for platforms with value)
    const socialFields = [
        { id: 'twitter', label: 'Twitter', icon: 'fab fa-twitter', placeholder: 'https://twitter.com/username' },
        { id: 'linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin', placeholder: 'https://linkedin.com/in/username' },
        { id: 'github', label: 'GitHub', icon: 'fab fa-github', placeholder: 'https://github.com/username' },
        { id: 'instagram', label: 'Instagram', icon: 'fab fa-instagram', placeholder: 'https://instagram.com/username' },
        { id: 'behance', label: 'Behance', icon: 'fab fa-behance', placeholder: 'https://behance.net/username' },
        { id: 'dribbble', label: 'Dribbble', icon: 'fab fa-dribbble', placeholder: 'https://dribbble.com/username' }
    ];
    
    let socialHtml = '';
    socialFields.forEach(field => {
        const value = profile.social?.[field.id] || '';
        socialHtml += `
            <div class="form-group">
                <label><i class="${field.icon}"></i> ${field.label}</label>
                <input type="url" id="social_${field.id}" placeholder="${field.placeholder}" value="${escapeHtml(value)}">
            </div>
        `;
    });
    
    content.innerHTML = `
        <div class="profile-edit-container glass-card">
            <h2>Edit Profile</h2>
            
            <!-- Avatar -->
            <div class="avatar-section" style="text-align: center; margin-bottom: 20px;">
                <img id="avatarPreview" src="${profile.avatar}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.3); margin-bottom: 10px;">
                <div>
                    <label for="avatarInput" class="btn-glow" style="display: inline-block; cursor: pointer; padding: 8px 16px;">Change Avatar</label>
                    <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                </div>
            </div>
            
            <!-- Name -->
            <div class="form-group">
                <label><i class="fas fa-user"></i> Full Name</label>
                <input type="text" id="profileName" value="${escapeHtml(profile.name)}" placeholder="Your name">
            </div>
            
            <!-- Role -->
            <div class="form-group">
                <label><i class="fas fa-briefcase"></i> Role / Title</label>
                <input type="text" id="profileRole" value="${escapeHtml(profile.role)}" placeholder="e.g., Video Editor, Graphic Designer">
            </div>
            
            <!-- Bio -->
            <div class="form-group">
                <label><i class="fas fa-align-left"></i> Bio</label>
                <textarea id="profileBio" rows="4" placeholder="Tell us about yourself...">${escapeHtml(profile.bio)}</textarea>
            </div>
            
            <!-- Address -->
            <div class="form-group">
                <label><i class="fas fa-map-marker-alt"></i> Address / Location</label>
                <input type="text" id="profileAddress" value="${escapeHtml(profile.address)}" placeholder="City, Country">
            </div>
            
            <!-- Portfolio URL -->
            <div class="form-group">
                <label><i class="fas fa-link"></i> Portfolio URL</label>
                <input type="url" id="profilePortfolio" value="${escapeHtml(profile.portfolio)}" placeholder="https://yourportfolio.com">
            </div>
            
            <!-- Social Links -->
            <h3 style="margin: 20px 0 10px;">Social Profiles</h3>
            ${socialHtml}
            
            <!-- Save Button -->
            <div class="about-buttons" style="margin-top: 20px;">
                <button class="btn-glow btn-primary-glow" id="saveProfileBtn">Save Changes</button>
                <button class="btn-glow" id="cancelProfileBtn">Cancel</button>
            </div>
        </div>
    `;
    
    // Attach event listeners
    // Avatar upload
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Save button
    document.getElementById('saveProfileBtn').addEventListener('click', () => {
        // Gather form data
        const updatedProfile = {
            name: document.getElementById('profileName').value.trim(),
            role: document.getElementById('profileRole').value.trim(),
            bio: document.getElementById('profileBio').value.trim(),
            address: document.getElementById('profileAddress').value.trim(),
            portfolio: document.getElementById('profilePortfolio').value.trim(),
            avatar: avatarPreview.src, // could be data URL or original URL
            social: {}
        };
        
        // Collect social links
        const socialFields = ['twitter', 'linkedin', 'github', 'instagram', 'behance', 'dribbble'];
        socialFields.forEach(field => {
            const input = document.getElementById(`social_${field}`);
            if (input && input.value.trim()) {
                updatedProfile.social[field] = input.value.trim();
            }
        });
        
        saveProfile(updatedProfile);
    });
    
    // Cancel button – just reload profile page (discard changes)
    document.getElementById('cancelProfileBtn').addEventListener('click', () => {
        loadPage('profile');
    });
}

// Helper to escape HTML to prevent injection
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}
// ========== UPGRADED BUTTON FUNCTIONS ==========

// Apply for Membership – opens Google Form with smooth transition
function applyMembership() {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScw4_y9Mcw5IXZPLPGsq2S0cFBE1Bcd_wivxbUxJSE5pr0Mvw/viewform';
    
    // Show a notification before opening
    showNotification('Redirecting to membership form...', 'info');
    
    // Small delay to let notification show, then open form
    setTimeout(() => {
        window.open(formUrl, '_blank');
    }, 500);
}

// Download Agreement – generates a professional agreement file
function downloadAgreement() {
    // Show loading notification
    showNotification('Preparing your agreement document...', 'info');
    
    // Simulate a short loading time for better UX
    setTimeout(() => {
        const agreementContent = `GigaMerge Studio – Membership Agreement
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Version 1.0 | Effective Date: ${new Date().toLocaleDateString()}

1. PARTIES
This Agreement is between GigaMerge Studio ("Platform") and the applying member ("Member").

2. MEMBERSHIP TERMS
2.1 Membership grants access to premium features, project listings, and AI tools.
2.2 Members agree to abide by the Platform's Code of Conduct and Community Guidelines.
2.3 Platform reserves the right to modify membership benefits with 30 days' notice.

3. FEES & PAYMENTS
3.1 Membership fees are billed monthly or annually based on selected plan.
3.2 All payments are processed via secure escrow services.
3.3 Refunds are available within 14 days of initial subscription.

4. CONTENT & INTELLECTUAL PROPERTY
4.1 Members retain ownership of their work.
4.2 Platform may use anonymized data for analytics and improvement.
4.3 Members grant Platform a non-exclusive license to display portfolio content.

5. TERMINATION
5.1 Either party may terminate with 30 days' written notice.
5.2 Platform may suspend access for violations of Terms of Service.

6. LIABILITY
6.1 Platform is not liable for disputes between members.
6.2 Escrow system protects payments per our Dispute Resolution Policy.

7. GOVERNING LAW
This Agreement is governed by the laws of India.

────────────────────────────────────────
To accept, please sign digitally via our membership form.
For questions, contact support@gigamerge.com

Thank you for choosing GigaMerge Studio!
`;
        
        const blob = new Blob([agreementContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GigaMerge_Membership_Agreement.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Agreement downloaded successfully!', 'success');
    }, 800);
}
function downloadAgreement() {
    window.open('https://yourdomain.com/agreement.pdf', '_blank');
}
// Scroll reveal for all elements with .reveal class
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    reveals.forEach(el => observer.observe(el));
}

// Call after content loads
window.addEventListener('load', () => {
    initScrollReveal();
});
// In your DOMContentLoaded or after initialization
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
    document.getElementById('main-app').style.display = 'block';
}, 2000);
// After adding all content to DOM
document.querySelectorAll('.about-section, .flip-card-container, .stats-grid, .categories-grid, #projects-list').forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
    }
});
// Add hover sound effect (optional, comment out if not desired)
// This is a placeholder; you can add actual sound if needed.

// Add tilt effect to flip cards (optional, using simple transform)
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
// ========== CHAT SYSTEM ==========

// Initialize chat conversations in localStorage if not exists
function initChats() {
    const chats = localStorage.getItem('gigamerge_chats');
    if (!chats) {
        const defaultChats = [
            {
                id: 'ai_assistant',
                name: 'AI Assistant',
                avatar: '🤖',
                type: 'ai',
                lastMessage: 'Hello! Ask me anything about GigaMerge Studio.',
                timestamp: Date.now(),
                unread: 1,
                messages: [
                    { id: 1, sender: 'ai', text: 'Hello! Ask me anything about GigaMerge Studio.', timestamp: Date.now(), read: false }
                ]
            },
            {
                id: 'john_smith',
                name: 'John Smith',
                avatar: 'JS',
                type: 'user',
                lastMessage: 'When can you start the project?',
                timestamp: Date.now() - 3600000,
                unread: 2,
                messages: [
                    { id: 1, sender: 'john_smith', text: 'Hi, I saw your profile. Are you available for a video editing project?', timestamp: Date.now() - 86400000, read: true },
                    { id: 2, sender: 'user', text: 'Yes, I am available. What type of project?', timestamp: Date.now() - 72000000, read: true },
                    { id: 3, sender: 'john_smith', text: 'I need a YouTube intro animation. Can you do that?', timestamp: Date.now() - 3600000, read: false },
                    { id: 4, sender: 'john_smith', text: 'When can you start?', timestamp: Date.now() - 3600000, read: false }
                ]
            },
            {
                id: 'sarah_johnson',
                name: 'Sarah Johnson',
                avatar: 'SJ',
                type: 'user',
                lastMessage: 'The design looks perfect!',
                timestamp: Date.now() - 7200000,
                unread: 0,
                messages: [
                    { id: 1, sender: 'sarah_johnson', text: 'Can you design a logo for my startup?', timestamp: Date.now() - 172800000, read: true },
                    { id: 2, sender: 'user', text: 'Sure! What style do you prefer?', timestamp: Date.now() - 170000000, read: true },
                    { id: 3, sender: 'sarah_johnson', text: 'Modern, minimalist. Let me send references.', timestamp: Date.now() - 168000000, read: true },
                    { id: 4, sender: 'sarah_johnson', text: 'The design looks perfect!', timestamp: Date.now() - 7200000, read: true }
                ]
            }
        ];
        localStorage.setItem('gigamerge_chats', JSON.stringify(defaultChats));
    }
}

// Get all chats from storage
function getChats() {
    return JSON.parse(localStorage.getItem('gigamerge_chats') || '[]');
}

// Save chats back to storage
function saveChats(chats) {
    localStorage.setItem('gigamerge_chats', JSON.stringify(chats));
}

// Add a new message to a specific chat
function addMessage(chatId, sender, text, isUser = false) {
    const chats = getChats();
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return false;
    
    const newMessage = {
        id: Date.now(),
        sender: sender,
        text: text,
        timestamp: Date.now(),
        read: false
    };
    chat.messages.push(newMessage);
    chat.lastMessage = text;
    chat.timestamp = Date.now();
    if (sender !== 'user') {
        chat.unread = (chat.unread || 0) + 1;
    }
    saveChats(chats);
    return true;
}

// Mark messages as read for a chat
function markChatRead(chatId) {
    const chats = getChats();
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
        chat.unread = 0;
        chat.messages.forEach(msg => { msg.read = true; });
        saveChats(chats);
    }
}

// AI Knowledge Base (50+ possible responses)
const aiResponses = [
    { keywords: ['what is gigamerge', 'gigamerge studio', 'tell me about gigamerge'], response: 'GigaMerge Studio is a Creative Talent Marketplace + Digital Agency connecting creators (editors, coders, writers) with clients (YouTubers, brands, businesses). We act as the bridge, managing projects, quality, and payments.' },
    { keywords: ['services', 'what do you do', 'offers'], response: 'We provide video editing, graphic design, web development, content writing, and digital marketing services. We also manage end-to-end projects for clients, ensuring quality and timely delivery.' },
    { keywords: ['how to hire', 'find freelancer', 'get work done'], response: 'You can post a project or browse our creators. Our AI matching system will suggest the best talent. Once you choose, we handle communication, milestones, and payments through our escrow system.' },
    { keywords: ['become freelancer', 'join as creator', 'work with you'], response: 'Great! Apply through our membership form (Apply for Membership button). We’ll review your portfolio and skills. Once accepted, you’ll get access to client projects and premium tools.' },
    { keywords: ['pricing', 'cost', 'how much'], response: 'Pricing varies by project. For clients, we charge a commission (e.g., ₹5000 project → editor gets ₹3500, GigaMerge keeps ₹1500). For creators, we have subscription plans starting at ₹999/month for premium features.' },
    { keywords: ['payment', 'escrow', 'secure'], response: 'We use an escrow system: clients deposit money upfront, funds are locked, and released only after project approval. This ensures security for both parties.' },
    { keywords: ['team', 'founders', 'who runs'], response: 'Our founding team: Alex Mercer (CEO), Sophia Chen (CTO), Marcus Lee (Creative Director), Isabella Rossi (Head of Design), James O’Connor (COO), and Nina Kapoor (AI Lead). Together, we’re building a global creative platform.' },
    { keywords: ['strategy', 'plan', 'future'], response: 'Our roadmap: Phase 1 (0-1M) build team and get first clients; Phase 2 (1-3M) establish regular client base; Phase 3 (3-6M) launch website and portfolio; Phase 4 (future) app, marketplace, AI tools.' },
    { keywords: ['revenue', 'earn money', 'commission'], response: 'We earn primarily through commission on projects (typically 20-30%). In the future, we’ll offer subscription plans for creators and premium services for clients.' },
    { keywords: ['rules', 'policies', 'terms'], response: 'Key rules: no direct client dealing (all through platform), mandatory agreement, payment before work, maintain quality, respect hierarchy. These protect everyone.' },
    { keywords: ['ai', 'chatbot', 'artificial intelligence'], response: 'Our AI helps match clients with the right freelancers, suggests proposals, analyzes portfolios, and now this chatbot! We’re constantly improving AI features to make your experience smoother.' },
    { keywords: ['contact', 'support', 'help'], response: 'You can reach us at support@gigamerge.com. Our team is available 24/7 to assist you. Also, you can ask me any question!' },
    { keywords: ['apply', 'membership', 'join'], response: 'Click the "Apply for Membership" button in the About section. It opens a Google Form where you can submit your details. We’ll get back to you within 48 hours.' },
    { keywords: ['agreement', 'contract', 'legal'], response: 'You can download our Membership Agreement from the About section. It outlines terms of service, payment, and responsibilities.' }
];

// Default response if no match
const defaultAIResponse = "I'm here to help! You can ask me about GigaMerge Studio's services, pricing, team, strategy, how to join, and more. What would you like to know?";

// AI response generator
function getAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    for (let item of aiResponses) {
        if (item.keywords.some(keyword => lowerMsg.includes(keyword))) {
            return item.response;
        }
    }
    return defaultAIResponse;
}

// Simulate AI typing delay and response
function sendAIMessage(chatId, userMessage) {
    // First add user message (already added in sendMessage)
    setTimeout(() => {
        const response = getAIResponse(userMessage);
        addMessage(chatId, 'ai', response);
        // Refresh UI if chat view is open
        const currentChatId = document.querySelector('.chat-view')?.dataset.chatId;
        if (currentChatId === chatId) {
            loadChatView(chatId);
        }
    }, 500 + Math.random() * 1000); // simulate thinking
}

// Send a new message (called from chat view)
function sendMessage(chatId, messageText) {
    if (!messageText.trim()) return;
    
    const chats = getChats();
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;
    
    // Add user message
    addMessage(chatId, 'user', messageText, true);
    
    // Refresh chat UI
    loadChatView(chatId);
    
    // If AI chat, trigger AI response
    if (chat.type === 'ai') {
        sendAIMessage(chatId, messageText);
    } else {
        // For user chats, simulate reply (optional)
        // We'll not auto-reply to keep it realistic; user expects the other person to reply later.
        // But we can add a simple "typing" simulation if desired.
    }
}

// Load the chat view for a specific chat
function loadChatView(chatId) {
    const chats = getChats();
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;
    
    markChatRead(chatId);
    
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <div class="chat-view" data-chat-id="${chat.id}">
            <div class="chat-header glass-card" style="margin-bottom: 0; border-radius: 20px 20px 0 0;">
                <button class="back-btn" onclick="loadMessagesPage()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="chat-user-info">
                    <div class="chat-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center;">
                        ${chat.avatar}
                    </div>
                    <div>
                        <div class="chat-name">${chat.name}</div>
                        <div class="chat-status">${chat.type === 'ai' ? 'Online • AI Assistant' : 'Online'}</div>
                    </div>
                </div>
                <div></div> <!-- spacer -->
            </div>
            
            <div class="messages-container" id="messages-container">
                ${chat.messages.map(msg => `
                    <div class="message ${msg.sender === 'user' ? 'message-outgoing' : 'message-incoming'}">
                        <div class="message-bubble">
                            ${msg.text}
                            <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="message-input-container glass-card" style="border-radius: 0 0 20px 20px; margin-top: 0;">
                <input type="text" id="messageInput" placeholder="Type a message..." class="message-input">
                <button id="sendMessageBtn" class="btn-glow btn-primary-glow" style="padding: 12px 20px;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    // Scroll to bottom of messages
    const container = document.getElementById('messages-container');
    if (container) container.scrollTop = container.scrollHeight;
    
    // Add event listeners
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendMessageBtn');
    
    const send = () => {
        const text = input.value.trim();
        if (text) {
            sendMessage(chat.id, text);
            input.value = '';
        }
    };
    
    sendBtn.addEventListener('click', send);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') send();
    });
}

// Load messages list (conversations)
function loadMessagesPage() {
    const chats = getChats();
    // Sort by timestamp descending
    chats.sort((a, b) => b.timestamp - a.timestamp);
    
    const content = document.getElementById('page-content');
    content.innerHTML = `
        <div class="messages-page">
            <h2 style="margin-bottom: 20px;">Messages</h2>
            <div id="conversations-list"></div>
        </div>
    `;
    
    const conversationsList = document.getElementById('conversations-list');
    conversationsList.innerHTML = '';
    
    chats.forEach(chat => {
        const lastMsgTime = new Date(chat.timestamp).toLocaleDateString() === new Date().toLocaleDateString() 
            ? new Date(chat.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
            : new Date(chat.timestamp).toLocaleDateString();
        
        const unreadBadge = chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : '';
        
        const item = document.createElement('div');
        item.className = 'message-item';
        item.onclick = () => loadChatView(chat.id);
        item.innerHTML = `
            <div class="message-avatar">${chat.avatar}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-name">${chat.name}</span>
                    <span class="message-time">${lastMsgTime}</span>
                </div>
                <div class="message-preview">${chat.lastMessage.substring(0, 50)}</div>
            </div>
            ${unreadBadge}
        `;
        conversationsList.appendChild(item);
    });
}
// Inside checkAuth or after user login
initChats();
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
