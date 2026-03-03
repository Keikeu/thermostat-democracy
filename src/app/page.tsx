import Image from "next/image";
import Thermostat from "@/components/custom/thermostat";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="max-w-[1024]">
        <section className="flex flex-col items-center text-center md:mt-24">
          <h1>Find the perfect thermostat setting for your office</h1>
          <p className="mt-4 mb-6">
            Let your coworkers tell us what feels comfortable. We’ll find the
            overlap.
          </p>
          <Button size="lg" asChild>
            <Link href="/create">Start the vote</Link>
          </Button>
          <span className="text-sm text-current/75 mt-2">
            No account required
          </span>
          <Thermostat votes={[]} unit="C" />
        </section>

        <section className="mt-20">
          <h2>How it works</h2>
          {[
            {
              title: "Initiate the conversation",
              paragraph:
                "You initiate a vote and send the link to your coworkers.",
            },
            {
              title: "Gather data",
              paragraph:
                "The coworkers are asked 3 questions about their office temperature preferences.",
            },
            {
              title: "Analyze results",
              paragraph:
                "We analyze the responses and calculate The Sweet Spot. Everybody can see the results as they come in.",
            },
          ].map((el, i) => (
            <div key={i} className="flex flex-wrap justify-between mt-14">
              <p className="w-full md:w-2/12">0{i + 1}</p>
              <p className="w-full font-bold md:font-normal md:w-4/12">
                {el.title}
              </p>
              <p className="w-full md:w-6/12">{el.paragraph}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-16">How we find The Sweet Spot</h2>
          <p>
            We calculate <b>discomfort score</b> for each possible thermostat
            setting.
          </p>
          <ul className="list-disc pl-4 py-4">
            <li>If the temperature matches your ideal, discomfort is zero.</li>
            <li>If it falls within your comfort range, discomfort is low.</li>
            <li>
              If it falls outside your range, discomfort increases the further
              it moves away.
            </li>
          </ul>
          <p>
            The temperature with the lowest total discomfort across the team
            becomes <b>The Sweet Spot</b>.
          </p>
        </section>
      </main>

      <section className="w-full flex flex-col items-center justify-center text-center gap-6 md:min-h-[400px] bg-[url(/gradient-blocks-double.svg)] bg-no-repeat bg-contain bg-bottom">
        <h3>Thermostat democracy starts here</h3>
        <p>Cast the votes. Find the overlap. Set the temperature.</p>
        <Button size="lg" asChild>
          <Link href="/create">Start the vote</Link>
        </Button>
      </section>

      <footer className="w-full pt-8 px-10 pb-4 bg-brown text-background bg-[url(/texture.png)]">
        {/* <div className="flex flex-col items-center text-center gap-2">
          <h4>Do you like it?</h4>
          <p>
            Spread the word on:{" "}
            <a
              className="underline"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              className="underline"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>{" "}
            |{" "}
            <a
              className="underline"
              href="https://bluesky.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
          </p>
        </div> */}

        <div className="flex justify-between items-end">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/eu.svg"
              alt="European Union symbol"
              width={64}
              height={64}
            />
            <p>Made in EU</p>
          </div>
          <p>Copyright © 2026 Karolina Placek</p>
        </div>
      </footer>
    </>
  );
}
