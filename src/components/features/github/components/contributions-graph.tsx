"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Activity } from "@/components/kibo-ui/contributions-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contributions-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GITHUB_USERNAME } from "../constant";

export function GitHubContributionsGraph({
  contributions,
}: {
  contributions: Activity[];
}) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const closeTooltipTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [activeDate, setActiveDate] = useState<string>();
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }),
    [],
  );
  const data = contributions;

  useEffect(() => {
    const calendar = calendarRef.current;

    if (!calendar) {
      return;
    }

    const scrollLeft = calendar.scrollWidth - calendar.clientWidth;

    if (scrollLeft > 0) {
      calendar.scrollLeft = scrollLeft;
    }
  }, [data]);

  const handleBlockEnter = (date: string) => {
    if (closeTooltipTimeout.current) {
      clearTimeout(closeTooltipTimeout.current);
      closeTooltipTimeout.current = null;
    }
    setActiveDate(date);
  };

  const handleBlockLeave = () => {
    closeTooltipTimeout.current = setTimeout(() => {
      setActiveDate(undefined);
      closeTooltipTimeout.current = null;
    }, 40);
  };

  return (
    <TooltipProvider>
      <ContributionGraph
            className="w-full py-2"
            data={data}
            blockSize={11}
            blockMargin={3}
            blockRadius={0}
          >
            <ContributionGraphCalendar
              ref={calendarRef}
              className="no-scrollbar"
            >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip open={activeDate === activity.date}>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    onMouseEnter={() => handleBlockEnter(activity.date)}
                    onMouseLeave={handleBlockLeave}
                    className={cn(
                      'hover:data-[level="0"]:fill-[#ebedf0] hover:dark:data-[level="0"]:fill-[#161b22]',
                      'hover:data-[level="1"]:fill-[#9be9a8] hover:dark:data-[level="1"]:fill-[#0e4429]',
                      'hover:data-[level="2"]:fill-[#40c463] hover:dark:data-[level="2"]:fill-[#006d32]',
                      'hover:data-[level="3"]:fill-[#30a14e] hover:dark:data-[level="3"]:fill-[#26a641]',
                      'hover:data-[level="4"]:fill-[#216e39] hover:dark:data-[level="4"]:fill-[#39d353]',
                    )}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {activity.count} {activity.count === 1 ? "contribution" : "contributions"} on {dateFormatter.format(new Date(activity.date))}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-sm text-black/70">
                <a
                  className="font-medium hover:underline hover:underline-offset-4"
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener"
                >
                  {totalCount} contributions in {year}
                </a>
              </div>
            )}
          </ContributionGraphTotalCount>
          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="text-muted-foreground animate-spin" />
    </div>
  );
}