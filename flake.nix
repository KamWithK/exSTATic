{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    webextension.url = "path:./webextension";
    textboard.url = "path:./textboard";
  };

  outputs =
    {
      flake-utils,
      nixpkgs,
      webextension,
      textboard,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = (import nixpkgs { inherit system; });
      in
      {
        devShell = pkgs.mkShell {
          inputsFrom = [
            webextension.devShell.${system}
            textboard.devShell.${system}
          ];
          packages = [
            textboard.defaultPackage.${system}
          ];
          LD_LIBRARY_PATH =
            with pkgs;
            lib.makeLibraryPath [
              libxkbcommon
              libGL

              # WINIT_UNIX_BACKEND=wayland
              wayland

              # WINIT_UNIX_BACKEND=x11
              xorg.libXcursor
              xorg.libXrandr
              xorg.libXi
              xorg.libX11
            ];
        };
      }
    );
}
