# Ripple Grid Logic System

An ultra-premium, interactive 3x3 logic engine built with React, Tailwind CSS, and sophisticated animations. Ripple Grid combines high-tech "Zenith" aesthetics with reactive grid-based cellular automata rules.

## 🚀 Live Interaction Logic

The system operates on an equilibrium of three core protocols:

### 1. Click Interaction
- Clicking any active (non-locked) node increments its inner logic value by **+1**.

### 2. The "Ripple" Rules
- **Rule A (Ripple Effect)**: If a node's new value is **divisible by 3** (e.g., 3, 6, 9...), it automatically **decrements (-1)** the node immediately to its **RIGHT**.
  - *Constraint*: If the node is in the last column, no ripple is sent.
- **Rule B (Surge Boost)**: If a node's new value is **divisible by 5** (e.g., 5, 10...), it triggers an energy surge that **increments (+2)** the node immediately **BELOW** it.
  - *Constraint*: If the node is in the bottom row, no surge is triggered.

### 3. The "Locked" State
- **Thermal Shutdown**: If any node reaches a value of **15 or higher**, it enters a "Locked" state.
- **Visual**: The node turns **Danger Red** with a carbon-fiber texture.
- **Effect**: Locked nodes are **Immutable Reactors**. They cannot be clicked, and their neighbors cannot change their values through ripples or surges.

## 💎 Design Philosophy

- **Zenith Aesthetics**: Midnight-blue celestial gradients, radial glows, and glassmorphic telemetry panels.
- **HUD Interface**: Real-time diagnostic logs and system logic cards provide a professional "command center" feel.
- **Precision Fit**: Re-engineered for a strictly **scroll-free** experience on modern displays.
- **Micro-Animations**: Kinetic orbiters, pulsing core nodes, and hover-triggered shine effects.

## 🛠️ Technology Stack

- **React**: Functional components and optimized state management.
- **Tailwind CSS**: Utility-first styling with sophisticated backdrop filters and gradients.
- **Google Fonts (Outfit)**: Premium geometric typography for a technical edge.
- **Lucide Icons / SVG**: High-resolution, animated vector iconography.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Grid-Ripple
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📜 Version History
- **v1.0.0**: Initial Logic Equilibrium release with Rule A/B protocols and Locked State threshold.

---
