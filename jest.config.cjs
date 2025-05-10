// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  // ... seu setupFilesAfterEnv, moduleNameMapper etc.
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
        plugins: [
          // mantém SSR e displayName para seus testes
          ["styled-components", { ssr: true, displayName: true }],
        ],
      },
    ],
  },
  // ... restante
};

module.exports = createJestConfig(customJestConfig);
