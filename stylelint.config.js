module.exports = {
  extends: ['stylelint-config-recommended'],
  "plugins": [
    "stylelint-scss"
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
        ignoreProperties: [
          '@import',
          '@apply'
        ]
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};