# Prompts Used in This Project

## Setup Storybook for Component Development
```bash
Set up Storybook for component development
  Here's the plan:
  1. Install @storybook/react-native + on-device addons
  2. Create .storybook/ config files
  3. Add app/storybook.tsx route
  4. Create Checkbox.stories.tsx
```

Why used: Easier component development and UI states testing. Optional auto regression testing with Chromatic/visual.

## Custom Checkbox Component Spec 
```bash
Checkbox
Props: value (boolean | 'indeterminate'), onValueChange?, disabled?, readOnly?, hasError?, label?, errorMessage?, accessibilityLabel?, style overrides.
Behavior:
Press toggles value when !disabled && !readOnly && onValueChange. indeterminate → false.
Check icon when checked, dash when indeterminate. Error state uses red border/bg.
States: idle | checked | indeterminate | disabled | readOnly | error
Style: border, bg, label, rounded
Tests: renders unchecked; onValueChange dispatch on press; no event dispatch when disabled; indeterminate and error visible.
```
Why used: It just works, especially if you already have other components. 


## Api + Zod

```bash
Create zod schema from api endpoints:
- create client api (use fetch) DO NOT USE AXIOS
- create coinsApi (list + paging & detail)

/web/coins?page[:number]=1&page[:size]=50
{
"meta": {
"success": true,
"totalCoinCount": 2162
},
"data": [
{
"id": "V1jxGX",
"code": "btc",
"dirtyCode": "BTC",
"name": "Bitcoin",
"slug": "bitcoin",
"priceInUSD": 68201.5881,
"availableSupply": 0,
"totalSupply": 0,
"marketCapRank": 1,
"volume24hInUSD": 28699908242,
"marketCapInUSD": 1364239298884.5044,
"percentChange1h": -0.1707567094049233,
"percentChange24h": -1.6182145624027928,
"percentChange7d": -7.357468921659032,
"showDisclaimer": false
},
{
"id": "V1Y7OX",
"code": "eth",
"dirtyCode": "ETH",
"name": "Ethereum",
"slug": "ethereum",
"priceInUSD": 2055.8944,
"availableSupply": 0,
"totalSupply": 0,
"marketCapRank": 2,
"volume24hInUSD": 13545904230,
"marketCapInUSD": 248129173676.08112,
"percentChange1h": -0.3517694915726523,
"percentChange24h": -2.9147577695046256,
"percentChange7d": -8.069935622925014,
"showDisclaimer": false
},
...
]
}

/web/coins/:id

{
"meta": {
"success": true
},
"data": {
"id": "V1jxGX",
"code": "btc",
"dirtyCode": "BTC",
"name": "Bitcoin",
"slug": "bitcoin",
"priceInUSD": 68180.8542,
"availableSupply": 0,
"totalSupply": 0,
"marketCapRank": 1,
"volume24hInUSD": 28699908242,
"marketCapInUSD": 1364260010799.5684,
"percentChange1h": -0.07310604415448384,
"percentChange24h": -1.5993263663202206,
"percentChange7d": -7.385632992575577,
"showDisclaimer": false
}
}

```

Why: Way faster than manual setup, nice start for typing



## Minimal Accessibility (a11y)
```bash
Add minimal accessibility (a11y) labels and roles
```
Why used: Simple, high-impact inclusive design.

## Localization (i18n)
```bash
- Add expo-localization
- read project first
- extract language and create json files and use translation in components
```

```bash
merge similar translations
```

## Prompt disagree:
For all of them: Since there isn't much boilerplate or reference examples, I peer-review 100% of the AI-generated code. I mostly rely on Cursor Tab for iterative assistance, rather than depending on a single, large one-shot prompt.
For developer tooling, I do care less about the output, such as Storybook stories generation to test UI states."