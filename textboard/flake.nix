{
  inputs = {
    naersk.url = "github:nix-community/naersk/master";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      utils,
      ...
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        defaultPackage =
          with pkgs;
          rustPlatform.buildRustPackage {
            name = "textboard";
            src = ./.;
            cargoLock.lockFile = ./Cargo.lock;
            nativeBuildInputs = [
              pkg-config
              autoPatchelfHook
            ];
            buildInputs = [ (lib.getLib stdenv.cc.cc) ];
            runtimeDependencies = [
              wayland
              libxkbcommon
              libGL
              xorg.libXcursor
              xorg.libXrandr
              xorg.libXi
              xorg.libX11
            ];
          };
        devShell =
          with pkgs;
          mkShell {
            nativeBuildInputs = [
              pkg-config
              autoPatchelfHook
            ];
            buildInputs = [
              cargo
              rustc
              rustfmt
              pre-commit
              rustPackages.clippy
            ];
            RUST_SRC_PATH = rustPlatform.rustLibSrc;
          };
      }
    );
}
