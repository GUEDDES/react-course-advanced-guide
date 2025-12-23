# Screenshots - Social Media Dashboard

## 📸 Application Overview

### Dashboard Page
![Dashboard](./screenshots/dashboard.png)
*Real-time metrics dashboard with live updates*

**Features visible:**
- Platform metrics cards (Twitter, Instagram, LinkedIn)
- Followers count per platform
- Engagement rates
- Post counts
- Recent activity feed
- Live connection indicator
- Real-time updates via WebSocket

---

### Platform Metrics Cards
![Metrics Cards](./screenshots/metrics-cards.png)
*Detailed platform statistics*

**Features visible:**
- Platform icons
- Color-coded cards
- Followers with trend indicators
- Engagement percentages
- Total posts
- Hover effects
- Animated updates

---

### Posts Management
![Posts Page](./screenshots/posts.png)
*Post scheduling and management*

**Features visible:**
- Post list with status badges
- Filter buttons (All, Scheduled, Drafts)
- Platform indicators
- Scheduled date/time
- Like and comment counts
- Delete functionality
- Create new post button

---

### Post Creation Form
![Post Form](./screenshots/post-form.png)
*Create and schedule social media posts*

**Features visible:**
- Platform selector dropdown
- Content textarea with character count
- Date/time picker for scheduling
- Cancel and Create buttons
- Modal overlay
- Form validation

---

### Inbox (Unified Messages)
![Inbox](./screenshots/inbox.png)
*All messages from all platforms in one place*

**Features visible:**
- Unified message list
- Platform badges
- Unread indicators
- Timestamp (relative: "2 hours ago")
- Message preview
- Mark as read button
- Delete option
- Unread count badge in header

---

### Analytics Page
![Analytics](./screenshots/analytics.png)
*Performance analytics and insights*

**Features visible:**
- Total followers aggregate
- Average engagement rate
- Total posts this month
- Trend indicators (+12.5% this month)
- Chart placeholders
  - Growth trend line chart
  - Engagement rate bar chart

---

### Sidebar Navigation
![Sidebar](./screenshots/sidebar.png)
*Beautiful gradient sidebar with navigation*

**Features visible:**
- SocialHub logo
- Navigation menu with icons
- Active state highlighting
- Platform badges (Twitter, Instagram, LinkedIn)
- Gradient background
- Icon indicators

---

### Header with Connection Status
![Header](./screenshots/header.png)
*Header showing real-time connection*

**Features visible:**
- Welcome message
- Daily summary text
- Live/Offline indicator
- Animated status dot
- New Post button

---

### WebSocket Live Connection
![Live Updates](./screenshots/live-updates.gif)
*Animated GIF showing real-time updates*

**Features visible:**
- Metrics updating in real-time
- Connection status changing
- New messages appearing
- Smooth animations
- Auto-reconnect demonstration

---

### Mobile Responsive View
![Mobile](./screenshots/mobile.png)
*Fully responsive mobile design*

**Features visible:**
- Collapsible sidebar
- Stacked cards
- Touch-friendly buttons
- Mobile-optimized navigation
- Responsive grid

---

## 🎨 Design System

### Color Palette

**Background:**
- Primary: `#ffffff` (White)
- Secondary: `#f5f7fa` (Light Gray)

**Sidebar:**
- Gradient: `#1e293b` → `#0f172a`

**Platform Colors:**
- Twitter: `#000000` (Black/X)
- Instagram: Gradient `#f09433` → `#bc1888`
- LinkedIn: `#0077b5`

**Status Colors:**
- Connected: `#d1fae5` background, `#065f46` text
- Disconnected: `#fee2e2` background, `#991b1b` text
- Primary: `#3b82f6`
- Success: `#10b981`
- Warning: `#f59e0b`
- Danger: `#ef4444`

---

### Typography

**Font Family:** System UI, -apple-system, sans-serif

**Sizes:**
- H1: 2rem (32px)
- H2: 1.5rem (24px)
- H3: 1.125rem (18px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

---

### Components

**Cards:**
- Background: White
- Border Radius: 12px
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`
- Padding: 1.5rem
- Hover: Lift effect with deeper shadow

**Badges:**
- Border Radius: 12px
- Padding: 0.25rem 0.75rem
- Font size: 0.75rem
- Font weight: 500

**Buttons:**
- Primary: Blue background
- Border Radius: 8px
- Padding: 0.75rem 1.5rem
- Transition: 200ms

---

## 🔄 Real-Time Features Showcase

### WebSocket Connection Flow
![Connection Flow](./screenshots/connection-flow.png)
*Diagram showing WebSocket lifecycle*

1. **Initial Connection**
   - Client connects to `ws://localhost:8080`
   - Status changes to "Live"

2. **Receiving Updates**
   - Server sends metrics every 5 seconds
   - UI updates smoothly
   - Animations on value changes

3. **Heartbeat**
   - Ping sent every 30 seconds
   - Pong received from server
   - Keeps connection alive

4. **Disconnection**
   - Status changes to "Offline"
   - Auto-reconnect starts
   - Up to 5 retry attempts

5. **Reconnection**
   - Exponential backoff
   - Status back to "Live"
   - Data syncs

---

## 📹 Video Demonstrations

### Creating a Scheduled Post
![Create Post Demo](./screenshots/create-post.gif)
1. Click "+ New Post"
2. Select platform
3. Enter content
4. Set schedule time
5. Click "Create Post"
6. See in scheduled list

---

### Live Metrics Update
![Metrics Update](./screenshots/metrics-update.gif)
1. Watch dashboard
2. See numbers change
3. Smooth animations
4. Real-time data

---

### Reading Inbox Messages
![Inbox Demo](./screenshots/inbox-demo.gif)
1. Navigate to Inbox
2. See unread count
3. Click "Mark as read"
4. Badge updates
5. Delete message

---

## 🔧 Developer Screenshots

### Redux DevTools (if integrated)
![DevTools](./screenshots/devtools.png)
*State inspection and time travel*

### Network Tab (WebSocket)
![Network](./screenshots/network.png)
*WebSocket frames inspection*

### React DevTools
![React DevTools](./screenshots/react-devtools.png)
*Component tree and props*

---

## 📝 Screenshot Guide

To capture screenshots:

1. **Create screenshots folder:**
   ```bash
   mkdir screenshots
   ```

2. **Required screenshots:**
   - `dashboard.png` - Main dashboard
   - `metrics-cards.png` - Close-up of metrics
   - `posts.png` - Posts page
   - `post-form.png` - Create post modal
   - `inbox.png` - Inbox page
   - `analytics.png` - Analytics page
   - `sidebar.png` - Sidebar navigation
   - `header.png` - Header with status
   - `mobile.png` - Mobile responsive view

3. **Animated GIFs:**
   - `live-updates.gif` - Real-time updates
   - `create-post.gif` - Creating a post
   - `metrics-update.gif` - Metrics changing
   - `inbox-demo.gif` - Reading messages

4. **Tools to use:**
   - [LICEcap](https://www.cockos.com/licecap/) - GIF recording
   - [Kap](https://getkap.co/) - macOS screen recorder
   - Chrome DevTools - Responsive screenshots
   - [Carbon](https://carbon.now.sh/) - Code screenshots

5. **Dimensions:**
   - Desktop: 1200px width
   - Mobile: 375px width
   - Format: PNG (screenshots), GIF (animations)

---

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome 100+
- ✅ Firefox 90+
- ✅ Safari 15+
- ✅ Edge 100+

WebSocket support required (all modern browsers).

---

**Note:** Screenshots show the application in action. For actual implementation, run the project locally or check the live demo.
