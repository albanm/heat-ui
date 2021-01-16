# Experimental UI

WARNING: absolutely not ready for anyone but myself. Will probably never be more than an experiment to be honest.

## Paradigm

The antithesis of material design. This is not a material world of stacked sheets, but a world of light, darkness, reactive gradients and autonomous motions where boundaries are meant to be broken.

The metaphore used most of the time is energy. Energy emits colored light, attracts autonomous entities, it burns and dissipates.

## Packages

  - **@heat/primitives**: Primitives to manage stacked matrices of energy levels that we call planes and render them to a canvas element.
  - **@heat/entities**: Entities exist in one or multiple planes of the universe and interact with them using @heat/primitives. They are typed using fitting metaphores like Star, BlackHole, SpaceCraft, etc. Entity types can be added to fit more use-cases.
  - **@heat/vue**: Components and directives to integrate heat planes in the background of your Vue application and map page elements to heat entities.

## Explore

How to make this as fast and non-blocking as possible ?

  - Is WASM really a net gain for primitives ?
  - Rendering canvas in worker ? https://developers.google.com/web/updates/2018/08/offscreen-canvas
  - Or use a SharedArrayBuffer and perform all computations in worker and copy the shared array buffer to canvas in main thread ?
