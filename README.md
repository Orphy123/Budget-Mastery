# 💰 MoneyWise - Smart Budgeting & Investment Planning Platform

MoneyWise is a comprehensive personal finance application that helps users manage their income, allocate funds intelligently, and make data-driven investment decisions. Built with React, TypeScript, and Supabase, it provides personalized financial recommendations based on user profiles, location, and financial goals.

## ✨ Features

### 🎯 Core Functionality
- **Smart Budget Allocation**: Automated 50/30/20 rule implementation with customizable adjustments
- **Investment Recommendations**: Personalized suggestions based on risk tolerance and experience level
- **Goal Tracking**: Visual progress tracking for emergency funds, investment targets, and custom goals
- **City-Based Adjustments**: Cost of living considerations for accurate recommendations
- **Financial Insights**: AI-powered spending analysis and optimization suggestions

### 🔐 User Management
- **Secure Authentication**: Email/password authentication with Supabase Auth
- **Profile Persistence**: All financial data securely stored and synced across devices
- **Privacy First**: Row-level security ensures users only access their own data

### 📊 Dashboard Features
- **Interactive Charts**: Budget breakdown with pie charts and progress bars
- **Real-time Calculations**: Dynamic budget allocation based on income and expenses
- **Investment Portfolio**: Curated investment options from high-yield savings to growth ETFs
- **Spending Insights**: Smart recommendations for financial optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moneywise-finance-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file in the root directory:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run database migrations**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the migration file: `supabase/migrations/create_user_profiles.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Create an account and complete the onboarding flow

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive, utility-first styling
- **Recharts** for interactive data visualizations
- **Lucide React** for consistent iconography
- **Vite** for fast development and optimized builds

### Backend & Database
- **Supabase** for authentication, database, and real-time features
- **PostgreSQL** with Row Level Security (RLS) for data protection
- **Custom hooks** for data fetching and state management

### Key Components
```
src/
├── components/
│   ├── auth/           # Authentication forms
│   ├── dashboard/      # Main dashboard components
│   └── onboarding/     # Multi-step setup flow
├── hooks/              # Custom React hooks
├── lib/                # Supabase client and utilities
├── types/              # TypeScript type definitions
└── utils/              # Calculation and helper functions
```

## 📱 User Journey

1. **Authentication**: Secure sign-up/sign-in with email and password
2. **Onboarding Flow**: 5-step process to collect financial profile
   - Income and housing costs
   - Monthly expenses breakdown
   - Financial goals and targets
   - Risk tolerance and investment experience
   - Review and confirmation
3. **Dashboard**: Comprehensive financial overview with:
   - Budget allocation visualization
   - Investment recommendations
   - Goal progress tracking
   - Spending insights and tips

## 🔒 Security & Privacy

- **Row Level Security**: Database policies ensure users only access their own data
- **Secure Authentication**: Supabase Auth handles password hashing and session management
- **Environment Variables**: Sensitive configuration stored securely
- **Type Safety**: TypeScript prevents runtime errors and data inconsistencies

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (600, 500, 50) for positive financial actions
- **Secondary**: Blue (600, 500, 50) for informational elements
- **Accent**: Orange/Amber for warnings and highlights
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy with proper spacing
- **Body**: Readable font sizes with 150% line height
- **UI Elements**: Medium weight for buttons and labels

### Components
- **Cards**: Rounded corners (xl) with subtle shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with focus states and validation
- **Charts**: Interactive with tooltips and legends

## 🚀 Next Level Enhancements

### 1. Advanced Analytics & AI
- **Spending Pattern Analysis**: Machine learning to identify spending trends and anomalies
- **Predictive Budgeting**: AI-powered forecasting for future expenses and income
- **Smart Alerts**: Proactive notifications for budget overruns or investment opportunities
- **Natural Language Queries**: "How much can I save for vacation this year?"

### 2. Investment Platform Integration
- **Real-time Market Data**: Live stock prices, ETF performance, and market news
- **Portfolio Tracking**: Connect brokerage accounts for comprehensive portfolio management
- **Automated Investing**: Dollar-cost averaging and rebalancing features
- **Tax Optimization**: Tax-loss harvesting and retirement account optimization

### 3. Banking & Financial Services
- **Open Banking Integration**: Connect bank accounts for automatic transaction categorization
- **Bill Management**: Track recurring payments and optimize subscription services
- **Credit Score Monitoring**: Integration with credit reporting agencies
- **Loan Optimization**: Refinancing recommendations and debt payoff strategies

### 4. Social & Gamification Features
- **Financial Challenges**: Monthly savings challenges with community leaderboards
- **Goal Sharing**: Share financial milestones with friends and family
- **Financial Education**: Interactive courses and quizzes on personal finance topics
- **Achievement System**: Badges and rewards for reaching financial milestones

### 5. Advanced Planning Tools
- **Retirement Calculator**: Comprehensive retirement planning with multiple scenarios
- **Tax Planning**: Year-round tax optimization strategies and projections
- **Insurance Analysis**: Coverage gap analysis and policy recommendations
- **Estate Planning**: Basic will and beneficiary management tools

### 6. Mobile & Accessibility
- **Native Mobile Apps**: iOS and Android apps with offline capabilities
- **Voice Interface**: Voice commands for quick balance checks and transaction logging
- **Accessibility Features**: Screen reader support, high contrast modes, and keyboard navigation
- **Multi-language Support**: Localization for global user base

### 7. Business & Family Features
- **Family Financial Planning**: Shared budgets and goals for couples and families
- **Small Business Tools**: Expense tracking and cash flow management for entrepreneurs
- **Financial Advisor Integration**: Connect with certified financial planners
- **Document Storage**: Secure storage for financial documents and receipts

### 8. Advanced Security & Compliance
- **Biometric Authentication**: Fingerprint and face recognition for mobile apps
- **Fraud Detection**: AI-powered transaction monitoring and alerts
- **Compliance Tools**: GDPR, CCPA, and financial regulation compliance features
- **Audit Trails**: Comprehensive logging for all financial data access and changes

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email support@moneywise.app or join our community Discord server.

---

Built with ❤️ by the MoneyWise team. Making financial planning accessible to everyone.