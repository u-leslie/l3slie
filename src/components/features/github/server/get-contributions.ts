import type { Activity } from "@/components/kibo-ui/contributions-graph";
import { GITHUB_USERNAME } from "../constant";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export async function getGitHubContributions(): Promise<Activity[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
  );
  const data = (await res.json()) as GitHubContributionsResponse;
  return data.contributions;
}