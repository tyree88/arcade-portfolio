/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add transpilePackages to properly handle threejs
  transpilePackages: ['three'],
  
  // Ensure we can load images and fonts
  images: {
    domains: [],
  },
  
  // Webpack configuration for threejs
  webpack: (config) => {
    // Add support for importing GLSL shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source'
    });
    
    return config;
  }
};

export default nextConfig;