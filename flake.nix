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
        };
      }
    );
}
