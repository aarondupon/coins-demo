import { Redirect } from 'expo-router';

const GITHUB_URL = 'https://github.com/aarondupon';

export default function GitHubTabScreen() {
  return <Redirect href={GITHUB_URL} />;
}
