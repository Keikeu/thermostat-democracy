import { getElection } from "@/app/actions/getElection";
import { getVotesForElection } from "@/app/actions/getVotesForElection";
import { ChartCalibration } from "@/components/charts/chart-calibration";
import { ChartComfortRange } from "@/components/charts/chart-comfort-range";
import { ChartIdealTemp } from "@/components/charts/chart-ideal-temp";
import { ChartDiscomfortScore } from "@/components/charts/chart-discomfort-score";
import ReportCard from "@/components/custom/report-card";
import Thermostat from "@/components/custom/thermostat";
import { Badge } from "@/components/ui/badge";
import {
  calculateAverageGuess,
  calculateAverageIdeal,
  calculateAveragePerceptionBias,
  calculateAverageRangeSize,
  calculateCurrentTempInComfortRange,
  calculateGotItRight,
  calculateMedianIdeal,
  calculateModeIdeal,
  calculateOverestimated,
  calculateSweetSpot,
  calculateSweetSpotComfortableFor,
  calculateSweetSpotIdealFor,
  calculateSweetSpotInComfortRange,
  calculateUnderestimated,
  formatTemp,
  getCalibrationChartData,
  getComfortRangeChartData,
  getIdealTempChartData,
  getDiscomfortScoreChartData,
} from "@/lib/helpers";

export default async function Report({
  params,
}: Readonly<{
  params: Promise<{ electionId: string }>;
}>) {
  const { electionId } = await params;
  const election = await getElection(electionId);
  const votes = await getVotesForElection(electionId);

  const { temperature: currentTemp, unit } = election;

  const numberOfVotes = votes.length;

  const sweetSpot = calculateSweetSpot(votes, unit);
  const sweetSpotIdealFor = calculateSweetSpotIdealFor(votes, sweetSpot);
  const sweetSpotComfortableFor = calculateSweetSpotComfortableFor(
    votes,
    sweetSpot,
  );

  const averageIdeal = formatTemp(calculateAverageIdeal(votes));
  const medianIdeal = formatTemp(calculateMedianIdeal(votes));
  const modeIdeal = formatTemp(calculateModeIdeal(votes));

  const currentTempInComforRange = calculateCurrentTempInComfortRange(
    votes,
    currentTemp,
  );
  const sweetSpotInComforRange = calculateSweetSpotInComfortRange(
    votes,
    sweetSpot,
  );
  const averageRangeSize = calculateAverageRangeSize(votes);

  const averageGuess = calculateAverageGuess(votes);
  const avergagePerceptionBias = calculateAveragePerceptionBias(
    votes,
    currentTemp,
  );
  const gotItRight = calculateGotItRight(votes, currentTemp);
  const underestimated = calculateUnderestimated(votes, currentTemp);
  const overestimated = calculateOverestimated(votes, currentTemp);

  const discomfortScoreChartData = getDiscomfortScoreChartData(votes, unit);
  const idealTempChartData = getIdealTempChartData(votes, unit);
  const comfortRangeChartData = getComfortRangeChartData(votes);
  const calibrationChartData = getCalibrationChartData(votes, unit);

  return (
    <main className="flex flex-col max-w-[1024]">
      <div className="flex gap-4 items-center mt-16 mb-2">
        <h1>{election.name}</h1>
        <Badge variant="secondary">
          <div className="size-3 rounded-full bg-primary animate-pulse" />
          <span className="uppercase font-semibold">Live</span>
        </Badge>
      </div>
      <p>
        {numberOfVotes} responses so far. The data updates as votes come in.
      </p>

      <Thermostat votes={votes} unit={election.unit} withLabels />

      <section>
        <h2 className="mb-8">The Sweet Spot</h2>
        <p>
          We calculate <b>discomfort score</b> for each possible thermostat
          setting.
        </p>
        <ul className="list-disc pl-4 py-4">
          <li>If the temperature matches your ideal, discomfort is zero.</li>
          <li>If it falls within your comfort range, discomfort is low.</li>
          <li>
            If it falls outside your range, discomfort increases the further it
            moves away.
          </li>
        </ul>
        <p>
          The temperature with the lowest total discomfort across the team
          becomes <b>The Sweet Spot</b>.
        </p>

        <div className="flex gap-8 my-8">
          <ReportCard
            label="The Sweet Spot"
            value={formatTemp(sweetSpot) + unit}
          />
          <ReportCard label="Ideal for" value={sweetSpotIdealFor} />
          <ReportCard label="Comfortable for" value={sweetSpotComfortableFor} />
        </div>

        <ChartDiscomfortScore
          data={discomfortScoreChartData}
          numberOfVotes={numberOfVotes}
          unit={unit}
          currentTemp={currentTemp}
          sweetSpot={sweetSpot}
        />
      </section>
      <section>
        <h2 className="mb-8">Ideal Temperature</h2>
        <div className="flex gap-8 my-8">
          <ReportCard label="Average" value={averageIdeal + unit} />
          <ReportCard label="Median" value={medianIdeal + unit} />
          <ReportCard label="Mode" value={modeIdeal + unit} />
        </div>

        <ChartIdealTemp
          data={idealTempChartData}
          currentTemp={currentTemp}
          sweetSpot={sweetSpot}
        />
      </section>
      <section>
        <h2 className="mb-8">Comfort Range</h2>
        <div className="flex gap-8 my-8">
          <ReportCard
            label="Current temperature within comfort range"
            value={currentTempInComforRange}
          />
          <ReportCard
            label="Sweet spot within comfort range"
            value={sweetSpotInComforRange}
          />
          <ReportCard
            label="Average range size"
            value={averageRangeSize + unit}
          />
        </div>

        <ChartComfortRange data={comfortRangeChartData} unit={unit} />
      </section>
      <section>
        <h2 className="mb-8">Calibration</h2>
        <div className="flex gap-8 my-8">
          <ReportCard
            label="Current office setting"
            value={formatTemp(currentTemp) + unit}
          />
          <ReportCard label="Average guess" value={averageGuess + unit} />
          <ReportCard
            label="Average perception bias"
            value={avergagePerceptionBias + unit}
          />
        </div>
        <div className="flex gap-8 my-8">
          <ReportCard
            label="Got it right"
            sub="within 0.5° from actual"
            value={gotItRight}
          />
          <ReportCard label="Underestimated" value={underestimated} />
          <ReportCard label="Overestimated" value={overestimated} />
        </div>

        <ChartCalibration
          data={calibrationChartData}
          currentTemp={currentTemp}
          sweetSpot={sweetSpot}
        />
      </section>
      <section>
        <h2 className="mb-8">More tips and tricks</h2>
        <div className="flex flex-col gap-6">
          <div>
            <h4>Consider seasonal clothing norms</h4>
            <p>
              In summer, lighter clothing shifts comfort ranges. In winter,
              heavier clothing shifts them again. Expect seasonal drift.
            </p>
          </div>
          <div>
            <h4>Keep humidity in mind</h4>
            <p>Very dry air feels colder. Very humid air feels warmer.</p>
          </div>
          <div>
            <h4>Personal solutions for people on the extremes</h4>
            <p>
              There is no single temperature that will satisfy everyone.
              Consider buying blankets for people running cold and small desk
              fans for those running hot.
            </p>
          </div>
          <div>
            <h4>Creating warm and cool zones or rooms</h4>
            <p>
              If your office temperature is controlled by a few separate
              thermostats, consider designating some spaces as slightly warmer
              and some as slightly cooler than The Sweet Spot.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
