{ pkgs }: {
  # Specify the Nix channel
  channel = "stable-23_11"; # Using the newer channel

  # Define the dependencies needed for the project environment
  deps = [
    pkgs.nodejs-20_x # Node.js version 20
    pkgs.nodePackages.typescript-language-server # For TypeScript support
    pkgs.yarn # Yarn package manager
    pkgs.npm # Npm package manager (often included with nodejs, but explicit doesn't hurt)
    pkgs.nodePackages.prettier # Code formatter
    pkgs.nodePackages.eslint # Linter
    pkgs.tailwindcss # Tailwind CSS framework
    pkgs.nodePackages.postcss # PostCSS processor
    pkgs.nodePackages.autoprefixer # PostCSS plugin for vendor prefixes
    pkgs.esbuild # Bundler, potentially used by Next.js or other tools
    # pkgs.replitPackages.jest # Jest for testing (can be uncommented if needed)
  ];

  # Optional shell hook to run commands when the environment starts
  # shellHook = ''
  #   echo "Nix environment setup complete."
  # '';
}
