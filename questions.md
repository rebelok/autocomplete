# Questions

## What is the difference between Component and PureComponent? give an example where it might break my app.

`PureComponent` implements the `shouldComponentUpdate` lifecycle method and does a shallow comparison of new state and props to the previous version. So the component is re-rendered if there are changes to state and props detected. This can greatly improve the performance of the application. But may also break the app. For example if a property is just mutated, so the shallow comparison won’t detect the change and component won’t be re-rendered.

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Context + ShouldComponentUpdate might be dangerous as if a component decides it doesn’t need to re-render (using `shouldComponentUpdate` method), it won’t be re-rendering the child tree of components. So, if there where changes to any child components the were provided not through props drilling, but context. These changes won’t get rendered.

## Describe 3 ways to pass information from a component to its PARENT.

Three ways to pass information to a parent component:
1. Using callback provided by the parent component
2. Using common context, so child component can change the data in the context and parent component use it.
3. State management library, so all components may use and change the application state.

## Give 2 ways to prevent components from re-rendering.

1. Implement `shouldComponentUpdate` lifecycle method returning false.
2. Use useMemo hook with empty dependencies array (`useMemo(() => <Header />, [])`)

## What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a way to wrap elements in the react without adding a DOM element. We need it because React requires to return single root element from the react component. So we either wrap everything we return into a DOM element like a div or we can use fragment to wrap our elements. I personally don’t remember any issues with fragments, except maybe the one that we cannot use shorthand `<></>` when we return a list of elements, because we cannot set the key property on it, so we need to use 
```
<Fragment key={key}>…</Fragment>
``` 
in this case.

## Give 3 examples of the HOC pattern.

HOC pattern can be used for some different cases like: state abstraction, code composition and render hijacking. 
1. “connect” function of react-redux library is the example of state abstraction. We provide the parts of the state and actions to allow the component to change it through the props and connects function is what we use to do it. 
2. By add behavior to the component through HOC we don’t need to change the component itself and we can re-use the HOC for multiple components. For example we can write withLogger HOC which will log the changed props to the console for debug reasons and use it in multiple places without changing the code of components.
3. `withLoader` - can be an another example of HOC. We can use it to render loader icon while isLoaded property is not true and the component itself when it’s loaded.

## what's the difference in handling exceptions in promises, callbacks and async...await.

When we started to use asynchronous js we had callback in the beginning. And to be able to handle exceptions there was the error-first callback pattern introduced. So we can provide the error to the callback when it happens and null otherwise in the first arguments of the callback. The rest arguments were free to be used as we like. After some time, when we tasted the callback hell, promises were introduced. Promises are much more convenient in the error handling, as we can handle errors in the promise chain using the catch blocks in the proper places. When a promise rejects, the control jumps to the closest rejection handler. Each promise has implicit try/catch block, so every error raised is treated the same as promise rejection. The await/async code doesn’t have these implicit try/catch blocks so we need to add them explicitly.

## How many arguments does setState take and why is it async.

`setState` take 2 arguments, state update object and a callback to be called after the state update take place. `setState` function is async, because: 
1. there could be heavy calculations in the setState
2. it may cause the changes in the Child and then in Parent and then again in Child component
3. there could be concurrent updates to the UI from different sources

To avoid all these, the calculations of changes are batched and calculated asynchronously.
	
## List the steps needed to migrate a Class to Function Component.

1. Change the class keyword to function and remove the extends React.Component part
2. Place the contents of the `render()` method in the function body
3. Convert all other methods on the class to stand-alone functions
4. Get rid of any use of this. to reference methods or variables
5. Remove the constructor function replacing state definition with `useState` hook calls. 
6. Replace `setState` call with setters from `useState` hooks.
7. Replace state update side effects and lifecycle methods with `useEffect` hooks

## List a few ways styles can be used with components.

We can set styles through the style property of the component accepting object with styles and rendering them into the style attribute. Another option is to import CSS/SCSS files in the components and use the classes listed in the css in the className properties of the components. That way it would be rendered in the class attribute of DOM element and the styles applied according to the CSS. The most modern way to apply styles is to use some styling library like Emotion, styled-components, etc. Using them we can have pre-styled components, props-based styling and optimized CSS, but under the hood the first two approaches are used anyway.

## How to render an HTML string coming from the server.

``` js
<div dangerouslySetInnerHTML={{__html: data}}    />
```
