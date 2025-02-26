# React

Best er að fara yfir [nýlega mikið uppfærða skjölun hjá React](https://react.dev/):

- Learning React (í mikilvægisröð):
  - [Quick start](https://react.dev/learn)
  - [Start a New React Project](https://react.dev/learn/start-a-new-react-project)
  - [Describing the UI](https://react.dev/learn/describing-the-ui)
  - [Adding Interactivity](https://react.dev/learn/adding-interactivity)
  - [Managing State](https://react.dev/learn/managing-state)
  - [Escape Hatches](https://react.dev/learn/escape-hatches)
- Reference (uppfletting þegar þið byrjið að nota)
  - [Hooks](https://react.dev/reference/react/hooks), sér í lagi:
    - [useCallback](https://react.dev/reference/react/useCallback)
    - [useEffect](https://react.dev/reference/react/useEffect)
    - [useState](https://react.dev/reference/react/useState)
  - [Components](https://react.dev/reference/react/components)
  - [APIs](https://react.dev/reference/react/apis)
    - [createContext](https://react.dev/reference/react/createContext)
    - [memo](https://react.dev/reference/react/memo)

Í febrúar 2025 var þróun á `create-react-app` hætt: [Sunsetting Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app). Í stað þess er hægt að nota `vite`.

Eldri fyrirlestrar um React úr vef2:

- [React](1.react.md), [vídeó (42:06)](https://www.youtube.com/watch?v=oPlKtdsoqeg) frá vef2-2021
- [React components](2.react-components.md), [vídeó (45:24)](https://www.youtube.com/watch?v=XFHwO_vNpL4) frá vef2-2021
- [React events & state](3.react-state-events.md), [vídeó (32:20)](https://www.youtube.com/watch?v=hqB2skRyLiI) frá vef2-2021
- [React lifecycle](4.react-lifecycle.md), [vídeó (45:43)](https://www.youtube.com/watch?v=C2ApcYVR6Mc) frá vef2-2021
- [React ajax og forms](5.react-ajax-forms.md), [vídeó (46:32)](https://www.youtube.com/watch?v=avUfO9sPScs) frá vef2-2021
- [React skipulag verkefna](6.react-project.md), [vídeó (23:19)](https://www.youtube.com/watch?v=H_qoQma_UHw) frá vef2-2021
- [React router](7.react-router.md), [vídeó (10:43)](https://www.youtube.com/watch?v=Z_y70KqNaDM) frá vef2-2021
- [React context](8.react-context.md), [vídeó (22:12)](https://www.youtube.com/watch?v=s4rpLMTbT3k) frá vef2-2021
- [React flux og redux](9.flux-redux.md), [vídeó (41:34)](https://www.youtube.com/watch?v=7rX3VCjjqOk) frá vef2-2019
  - Ath notar class components en myndum nota [functional components og hooks](https://react-redux.js.org/api/hooks) í dag

Aukalega er nánari yfirferð á React frá 2022:

- [Vika 8, 2022](https://github.com/vefforritun/vef2-2022/blob/main/vikur/vika-08.md)
- [Vika 11, 2022](https://github.com/vefforritun/vef2-2022/blob/main/vikur/vika-11.md)

## Dæmi

- [jsx](./daemi/01.jsx/)
- [components](./daemi/02.components/)
- [conditional](./daemi/03.conditional/)
- [children](./daemi/04.children/)
- [props](./daemi/05.props/)
- [events](./daemi/06.events/)
- [state](./daemi/07.state/)
- [Klukka](./daemi/08.clock)
- [Hooks](./daemi/09.hooks)
- [Ajax](./daemi/10.ajax)
- [Form](./daemi/11.form)
- [Lifting state](./daemi/12.lifting-state)
- [Project](./daemi/13.project)
- [react router](./daemi/14.react-router)
- [Theme](daemi/15.theme)
- [Login](daemi/16.login)
- [redux](daemi/17.redux)
- [redux login](daemi/18.redux-login)
- [redux todos](daemi/19.redux-todos)

## Aukaefni

- [React docs](https://reactjs.org/docs/getting-started.html), skanna og sjá hvað er farið yfir. Yfirferð fylgir að mestu leiti
  - [React: Reconciliation](https://reactjs.org/docs/reconciliation.html)
  - [React: Accessibility](https://reactjs.org/docs/accessibility.html)
- [Pete Hunt: React: Rethinking best practices -- JSConf EU 2013](https://www.youtube.com/watch?v=x7cQ3mrcKaY)
- [create react app](https://github.com/facebook/create-react-app)
- [How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)
- React browser extensions fyrir [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) og [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)
  - [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
  - [Rules of hooks](https://reactjs.org/docs/hooks-rules.html)
- [Making setInterval Declarative with React Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
- [React docs: Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [React docs: Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
- [React docs: Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
- [React docs: Accessibility](https://reactjs.org/docs/accessibility.html)
- [Heroku Buildpack for create-react-app](https://github.com/mars/create-react-app-buildpack)
- [React Router](https://reactrouter.com/web/guides/quick-start)

## Ítarefni

- [„Web 2.0“](https://en.wikipedia.org/wiki/Web_2.0)
- [`prop-types`](https://github.com/facebook/prop-types)
- [WTF is JSX](https://jasonformat.com/wtf-is-jsx/)
- [`useReducer` fyrir flóknari tilvik](https://reactjs.org/docs/hooks-reference.html#functional-updates)
- [Deploying React with Zero Configuration](https://blog.heroku.com/deploying-react-with-zero-configuration)
- [CSS modules](https://github.com/css-modules/css-modules)
- [`styled-components`](https://styled-components.com/)
- [`emotion`](https://emotion.sh/docs/introduction)
- [When Does a Project Need React?](https://css-tricks.com/project-need-react/)
- [Evolving Patterns in React](https://www.freecodecamp.org/news/evolving-patterns-in-react-116140e5fe8f/)
- [React Design Principles](https://reactjs.org/docs/design-principles.html)
- [React - Basic Theoretical Concepts](https://github.com/reactjs/react-basic)
- [Build Your Own React — A Step By Step Guide](https://hackernoon.com/build-your-own-react-48edb8ed350d)
- [React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/)
- [Flux examples](https://github.com/facebook/flux/tree/master/examples)
- [Redux](https://redux.js.org/)
- [Getting Started with Redux, video](https://app.egghead.io/playlists/fundamentals-of-redux-course-from-dan-abramov-bd5cc867)
- [Redux Real World Example](https://github.com/reactjs/redux/tree/master/examples/real-world)
- [MobX – Simple, scalable state management](https://mobx.js.org/)
- [preact – Fast 3kB React alternative with the same modern API. Components & Virtual DOM.](https://github.com/developit/preact)
