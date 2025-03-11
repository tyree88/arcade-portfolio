
{ pkgs }: {
<<<<<<< HEAD
  buildInputs = [
    pkgs.nodejs-19_x
=======
  deps = [
<<<<<<< HEAD
    pkgs.nodejs-20_x
>>>>>>> e450355 (Assistant checkpoint: Fix Node.js and Next.js configuration)
=======
    pkgs.nodejs-18_x
>>>>>>> b02284e (Assistant checkpoint: Update NodeJS version and fix Tailwind + Next.js config)
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.esbuild
    pkgs.nodePackages.prettier
    pkgs.nodePackages.eslint
    pkgs.tailwindcss
    pkgs.nodePackages.postcss
    pkgs.nodePackages.autoprefixer
    pkgs.npm
  ];
  shellHook = ''
    echo "Environment setup complete."
  '';
}
