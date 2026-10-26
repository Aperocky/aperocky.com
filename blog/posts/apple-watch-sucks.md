# Apple Watch's Disastrous Upgrade

Ever since I was force upgraded to WatchOS 27 to connect to my new iPhone, recording an exercise gradually turned into checking what could be wrong this time, and barely once had it not made a significant deviation on my exercise data. Below are excerpts from my recent [Strava](https://www.strava.com/athletes/123888854) logs in the past week:

## From My Strava Logs

### 1. Z2 BUY GARMIN

> How does an $800 sports watch in Ultra fail to find a stable zone 2 pulse FOR 50 STRAIGHT MINUTES?
>
> Apple why don’t you pack up your entire wearable business and SELL IT TO GARMIN?
>
> So I don’t look down and find no pulse, or worse, my cadence.
>
> Someone screenshot this and send it to John Ternus

### 2. Z2 10K

> In addition to heart rate shenanigans. Apple Watch swallowed 100m from each of the first 1K of my previous 2 runs
>
> Apple Watch Ultra is not a serious sport watch

### 3. Z2 10K

> When Apple Watch swallows distance at the beginning, the GPS track is somehow correct. It just amortize the missing distance across the first km or so. As a software engineer, I am astounded and amused at how this get to happen.
>
> Running in loops with Strava sections expose this elaborate bug mechanism that just seems deliberate.

### 4. Z2 10mi

> Updated to WatchOS27.2 dev build, apparently that fixed the distance not following GPS bug.
>
> But heart rate is still trash. Random 180bpm in the middle of Z2 nowhere? To think about it, I have not had a single activity after the forced upgrade to WatchOS 27 that the watch just did its job accurately.
>
> Is Apple using its in house LLM model to write its software now?

---

These are just the sections that I have publicly commented about the watch - they are not the only ones wrong, in fact, all of them were wrong. I have a 1 km ride on GPS that Apple Watch decided was precisely 0.0km distance travelled. Which I cancelled and did not bother to post. And it really only happened since the upgrade of Watch OS.

## Engineering Thoughts.

Heart Rate is somewhat excusable, you can blame it on hardware, on how it's objectively hard to detect a pulse, on the weather or the sweat. Even though subjectively it was worse than before the upgrade, but you can just chalk it up to this customers disgruntled feeling. But what is **inexcusable** is how the *distance don't match that of the GPS track*.

This is not just me, there are plenty of post like [this one](https://www.reddit.com/r/AppleWatchFitness/comments/1wrxk09/i_made_the_mistake_of_updating_to_watchos_27/) and [this one](https://www.reddit.com/r/AppleWatchFitness/comments/1wnlp9s/apple_watch_recording_runs_completely_wrong_after/) that all points to the same problem. *How does this happen*?

While Watch OS is closed source and we can only infer what happened, this feels familiar. You have one metric that clearly defines distance - that of the GPS. And somehow, the logic added other factor that *overrode* that obvious metric, and you have laughable results such as a 0m distance that are visible on the map, or an always off first mile pace, or a 20 mile official marathon. As an engineer, I can almost even tell you what happened: The product team believed that we needed to account for accuracy under some bridge, in buildings, where GPS cannot reach. The engineering team decided to ask some AI to implement. And they tested under the bridge in their latest new watch and it all seemed to work out. Nobody asked or cared whether GPS track distance is the real distance shown, which is what vast majority of the use case are.

And thus rolls out a disasterous update, with product focused on niche use, with code filled with slop and some other random bug or slop causing heart rate to become difficult to catch too. They apparently have fixed it in the "dev build" for the distance bug. But are the trust ever coming back?

We're all going to keep using LLM to write our code, but this doesn't have to happen. Product and Engineering need to stay focused on the base case for behavior, the base case for main logic flow. *You had a GPS Track, use that for distance!.*

And finally, **simple is better than complex**, and it's never more true today.
