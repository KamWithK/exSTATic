{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    vtslsPatch = {
      url = "https://github.com/NixOS/nixpkgs/pull/347284.patch";
      flake = false;
    };
  };

  outputs =
    inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = (import (inputs.nixpkgs) { inherit system; });
        patchedNixpkgs = pkgs.applyPatches {
          src = pkgs.path;
          patches = [ inputs.vtslsPatch ];
        };
        patchedPkgs = import patchedNixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs.nodePackages; [
            nodejs
            npm
            typescript
            prettier
            pkgs.vtsls
          ];
        };
      }
    );
}
