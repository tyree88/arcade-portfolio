
{ pkgs }: {
<<<<<<< HEAD
  buildInputs = [
    pkgs.nodejs-19_x
=======
  deps = [
    pkgs.nodejs-20_x
>>>>>>> e450355 (Assistant checkpoint: Fix Node.js and Next.js configuration)
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
