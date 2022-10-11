// >npm install --save-exact esbuild-wasm@0.8.27
// >yarn add esbuild-wasm

// inorder to make use of this webassembly inside the browser - copy esbuild.wasm from node-modules and paste in public folder

// in terminal
// >npm view react dist.tarball
// https://registry.npmjs.org/react/-/react-17.0.2.tgz
// opening this link downloads a zip ile
// this folder's index.js file can be used to help in bundling

// using this link in app creates CORS error
// UNPKG usage solves the problem
// eg: https://unpkg.com/react
// this goes to https://unpkg.com/react@17.0.2/index.js

// https://unpkg.com/tiny-test-pkg
// https://unpkg.com/tiny-test-pkg@1.0.0/index.js
// gives page with module.exports = 'hi there!';

// >yarn add axios

// >git config --get remote.origin.url


// section 9

// creating cache of the requests made to save the data as cache in browser and reduce time in making requests
// using indexedDB to prevent overload of data storage in cache with the help of localforage api
// caching with key value pairs

// >yarn add localforage

// section 11

// >yarn add @monaco-editor/react

// For TypeScript type definitions, this package uses the monaco-editor package as a peer dependency.
// >yarn add monaco-editor
// >yarn add prettier @types/prettier //to format code

// >yarn add bulmaswatch

// to fix highlight errors in monaco editor - optional
// >yarn add monaco-jsx-highlighter@0.0.15 jscodeshift@0.11.0 @types/jscodeshift@0.7.2

// >yarn add jscodeshift@0.11.0 @types/jscodeshift@0.7.2 //responsible for parsing js code and helps the highter

// >yarn add @babel/parser @babel/traverse

// section 13
// using react-resizable to create resizable panes
// >yarn add react-resizable @types/react-resizable

// section 15
// creating a markdown editor(MDEditor) and preview(MDEditor.Markdown) in react
// using @uiw/react-md-editor

// >yarn add @uiw/react-md-editor

// section 16
// implementing redux
// >yarn add @types/react-redux react-redux redux redux-thunk axios

// npx create-react-app my-app --template redux-typescript

// >yarn add @reduxjs/toolkit

// first creating ActionTypes -> Action -> Cell -> cellsreducer(outline) -> action creators(synchronous actions) -> cellsreducer

// section 17
// >yarn add immer

// section 18 - Back to react
// creating hooks for useSelector and useDispatch
// replacing useState with redux store
// adding action bar
// stying the action bar with @fortawesome/fontawesome-free
// https://www.npmjs.com/search?q=%40fortawesome%2Ffontawesome-free

// >yarn add @fortawesome/fontawesome-free

// adding css styling to the action-bar

// unfortunately, we don't have any other elements right now with a position of relative. Whenever you put in a position of absolute, that element will be positioned relative to the closest parent that has a position of relative. So right now, we're actually seeing all four different action bars stacked up on top of each other.

// So we need to go back into our different cell definitions and to each of them, we need to add in a class name or add an access rule to give these things a position of relative. We could add in those exact rules to our code cell and our text ed components. Or alternatively, we could just add it into the. Cell list item, which is what is wrapping the Text editor and the code cell

// try { //to run only at start
//   await esbuild.initialize({
//     worker: true,
//     wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm' //instead of pasting the wasm in public folder
//   });
// } catch (err) {
//   if(err instanceof Error && err.message.includes('initialize')) {
//     esbuild.initialize({
//       worker: false,
//       wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.23/esbuild.wasm'
//     })
//   } else {
//     throw err;
//   }
// }

// 220. Three Possible Solutions
// the add-cell bar appears when a cell is created newly and then gets faded- this happens because the last add-cell bar is move down and as it is not hovered anymore it fades away (as it has no key)
// to avoid this behaviour

// sol-1
// adding css 

// .add-cell:active {
//   opacity: 0 !important;
//   transition: opacity 0s;
// }

// The active pseudo class selector is applied to any element that the user is actively interacting with generally through a click. So by adding on ad cell active, we're seeing that whenever a user is really clicking actively clicking on ad cell, we are going to temporarily apply opacity of zero. And we're going to also update the transition property as well to make sure that the change in opacity occurs instantaneously. So I want to instantaneously apply in opacity of zero, and I want to make sure I apply the important important selector on here as well for the important modifier to make sure that we override any existing other opacity rules. The one downside to this is that if I click down and hold, that applies the active selector. So even though I have not released my mouse right now, I've not released my clicking button. The active duty selector is being applied. So this thing fades out for just a moment entirely when user first clicks before they even let go of their mouse.

// sol-2 in cell-list.tsx

renderedCells.push(
  <AddCell key={Math.random()} forceVisible={cells.length === 0} nextCellId={null} />
)

// this means that every single time we render our sell list component, we're going to have a completely different key being applied to this component because we are applying a totally different key react is going to say, oh, there's already an ad selling the -- well. It has a different key, so it must not be really the same component. So it's going to throw away the ad sell currently in the dom and completely recreate it. So by doing this, we are not really pushing down the ad sell component, which is what is happening right now. Instead, we are throwing out the current ad sell that we're clicking on and then rendering a brand new one. And because we are rendering a brand new one, there is going to not be any starting opacity of one point zero. Instead is going to have an initial opacity of zero.

// but the problem continues when adding between the cells

// sol-3
// insertCellAfter instead of inserting before
// this solves the problem as the add-cell bar is not going to be pushed down and is going to remain in the same position

// section19
// 223. Should there be a bundles Reducer

// always avoid selectors with async logic
// One thing the selectors do behind the scenes is a little bit of performance optimization. Internally, they say that if a selector is ever called with identical arguments the first time, it will go ahead and run your selector code so they'll actually do some calculation. But if you ever try to run that selector again on identical arguments, then rather than redoing your calculation, it might just return the initially calculated value right away. So it's a little performance optimization. Doing stuff like that with asynchronous code can be really, really challenging and sometimes it can lead to really unpredictable results. So because our bundler is very much asynchronous in nature, we are not going to create a bundle selector.

// Other engineers will disagree with my opinion. There are packages out there that allow you to write asynchronous selectors. You can't use an asynchronous selector in react redux by default.

// No need to add useEffect dependency if the function is imported, only add dependency for created variables or values that are received as props and for things other than imports

// 237. Adding Eager Bundle
// fixing the Preview lag at start

// 239. Shoawing a loading Message
// when the bundle is undefined or when bundle.loading = true

// 241. Can We Estimate the bundle Duration
// to prevent the flasing of the progress bar on loading fast bundled codes

// if user writes JS without import, bundling is fast
// if there are imports, bundling takes longer time

// **if bundling takes more than .2 seconds, the bundlng time is long**
// using fade in animation in the progress bar based on this .2 seconds
// creating fadeIn properties, setting opacity to 0 upto 0.25secs 

// to clear the local cached imports
// Application -> IndexedDB -> filecache -> keyvaluepairs  - delete all the files

// to increase the time of loading
// Network -> No Throttling - change to Slow 3G

// Section20: Adding a 'Culminative Code Execution' Feature
// to allow referencing the functions conts or any data from prior code cell

// crrating a show function to directly execute code from code cell instead of using documnent.querySelector().innerHTML
// eg
show(1);
show('asdf');
show({});
show({abd: "abd"})
show([2,,33,3]);
show(<div>element</div>);
show(() => <div>fsfd</div>);

// section 21 The Path -Lerna
// to allow user to save/load a user's notebook from their hard drive  
// by letting the user run only the CLI which runs the Local Node API which runs Build Client Files(index.html and index.js) and the locally saves notebook(where all the cells are saved) of the user

// Lerna CLI - Tool for managing multi-package project
// use only version v3.22.1 of lerna
// >npm install -g --save-exact lerna@3.22.1 - using this
// >yarn add lerna@3.22.1 --exact
