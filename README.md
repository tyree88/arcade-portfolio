# Arcade Portfolio

An interactive 3D portfolio website with an arcade theme, built with Next.js, Three.js, and React Three Fiber.

![Arcade Portfolio](https://via.placeholder.com/1200x630?text=Arcade+Portfolio)

## 🎮 Overview

This project transforms vintage arcade machines into clickable interactive elements that showcase different projects. The immersive 3D environment allows visitors to explore your work in a unique and engaging way.

### ✨ Key Features

- **3D Interactive Environment**: Built with Three.js and React Three Fiber
- **Arcade Machine Showcase**: Each project is displayed as an interactive arcade cabinet
- **Retro-Nostalgic Aesthetic**: Vintage arcade styling with modern web technologies
- **Responsive Design**: Works across desktop and mobile devices
- **Animation Effects**: Smooth transitions and interactions using GSAP

## 🚀 Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **3D Rendering**: [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Animation**: [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + custom SCSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **TypeScript**: For type safety and better developer experience

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/arcade-portfolio.git
cd arcade-portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
arcade-portfolio/
├── public/               # Static assets
│   ├── models/           # 3D models
│   │   └── textures/         # Texture files
│   │   └── fonts/            # Custom typography
│   └── images/           # Project screenshots
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── three/        # Three.js components
│   │   │   ├── Scene.tsx         # Main 3D scene
│   │   │   └── ArcadeCabinet.tsx # Arcade machine component
│   │   └── ui/           # UI components
│   │       └── Button.tsx        # Button component
│   └── lib/              # Utility functions and hooks
└── styles/               # Additional styling
```

## 🎯 Usage

### Adding a New Project

To add a new project to your arcade portfolio:

1. Create a new arcade cabinet component in `src/components/three/`
2. Add project details (title, description, links, etc.)
3. Position the new cabinet in the scene

### Customizing the Theme

The project uses Tailwind CSS for styling. You can customize the theme by editing:

- `tailwind.config.mjs` - For colors, fonts, and other theme settings
- `src/app/globals.css` - For global styles
- `styles/` directory - For additional custom styling

## 🧪 Testing

```bash
npm run lint
# or
yarn lint
```

## 🚢 Deployment

This project is ready to be deployed on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

```bash
npm run build
# or
yarn build
```

## 🔮 Future Enhancements

- **Mini-games**: Add playable mini-games related to each project
- **Advanced Interactions**: Implement joystick controls for navigation
- **Content Management**: Add a headless CMS for easier project updates
- **Accessibility**: Improve keyboard navigation and screen reader support

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Animation Library](https://greensock.com/gsap/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [React Three Fiber Examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)
- [Three.js Examples](https://threejs.org/examples/)
- [Retro Arcade Art References](https://example.com)
