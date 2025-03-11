{ pkgs }: {
  buildInputs = [
    pkgs.nodejs-19_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.esbuild
    pkgs.nodePackages.prettier
    pkgs.nodePackages.eslint
    pkgs.tailwindcss
    pkgs.nodePackages.postcss
    pkgs.nodePackages.autoprefixer
  ];
  shellHook = ''
    echo "Environment setup complete."
  '';
}
