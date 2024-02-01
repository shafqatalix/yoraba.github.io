---
title: Testing React components using Jest
date: 2022-12-22
tags: ["react", "jest"]
published: true
description: A simple guide testing React components using Jest
layout: post
permalink: /testing-react-components-jest
---

Testing is a crucial part of the software development process, as it helps ensure that code is working correctly and meets the requirements of the project. [Jest](https://jestjs.io/) is a popular JavaScript testing framework that makes it easy to test JavaScript code in a variety of environments. In this article, we'll explore how to use Jest to test your code and improve the reliability and quality of your software.

To get started with Jest, you'll need to install it using npm or yarn:

```bash
# npm
npm install --save-dev jest enzyme

# yarn
yarn add --dev jest enzyme

```

Once Jest is installed, you'll need to configure it to run your tests. You can do this by adding a jest field to your package.json file:

```json
{
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

This configuration tells Jest to use the **jsdom** test environment, which allows you to run your tests in a simulated browser environment.

In order to run jest from command line you need to add this to your package.json:

```json
 "scripts": {
    "test": "jest"
  },
```

Now if you run jest tests with this command:

```bash
yarn test
```

## Testing Plain JavaScript code

With Jest installed and configured, you're ready to start writing tests. Jest uses a syntax similar to describe and it from the Mocha testing framework. Here's an example of a simple test using Jest:

```javascript
describe("my test suite", () => {
  it("passes this test", () => {
    expect(1 + 1).toBe(2);
  });

  it("fails this test", () => {
    expect(1 + 1).toBe(3);
  });
});
```

In this example, we have a test suite called "my test suite" with two tests inside of it. The first test passes, as it correctly expects that 1 + 1 is equal to 2. The second test fails, as it expects that 1 + 1 is equal to 3.

Jest also provides a number of utility functions that you can use to structure your tests and make them easier to read and maintain. For example, you can use beforeEach and afterEach to run code before and after each test in a suite:

```javascript
describe("my test suite", () => {
  let foo;

  beforeEach(() => {
    foo = "bar";
  });

  it("has the correct value for foo", () => {
    expect(foo).toBe("bar");
  });

  it("can change the value of foo", () => {
    foo = "baz";
    expect(foo).toBe("baz");
  });
});
```

In this example, the value of foo is set to **'bar'** before each test is run. This means that both tests have access to the same initial state, and you don't have to repeat the same setup code in each test.

Jest also provides a number of matchers that you can use to make your tests more expressive and easier to read. For example, you can use the toBe matcher to check that two values are strictly equal:

```javascript
it("checks for strict equality", () => {
  expect(1).toBe(1);
  expect(1).not.toBe("1");
});
```

In this example, the first test passes because the value of 1 is strictly equal to the value of 1. The second test passes because the value of 1 is not strictly equal to the string '1'. There are many other matchers available in Jest, including **toEqual**, **toBeNull**, **toBeUndefined**, and many others.

## Testing React Components

Unit testing React components with Jest is a straightforward process. First, you'll need to make sure that you have Jest installed and configured in your project, i.e. above tests work.

To test a React component with Jest, you'll need to import the component and render it using the ReactDOM.render function. You can then use Jest's expect function to make assertions about the component's output. Here's an example of a simple test for a React component:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import MyComponent from "./MyComponent";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MyComponent />, div);
});
```

In this example, we're importing the **MyComponent** component and rendering it to a DOM element using **ReactDOM.render**. We're then using Jest's **expect** function to check that the component renders without crashing.

### Snapshot testing

You can also use Jest's snapshot testing feature to test the output of your React components. Snapshot testing allows you to take a "snapshot" of the component's output and compare it to the snapshot in future test runs. If the output changes, the snapshot will fail, alerting you to the change. Here's an example of how to use snapshot testing with a React component:

```jsx
import React from "react";
import MyComponent from "./MyComponent";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

In this example, we're using the [react-test-renderer](https://reactjs.org/docs/test-renderer.html) library to render the **MyComponent** component to a JSON tree. We then use Jest's **toMatchSnapshot** function to compare the tree to the snapshot stored in the **snapshots** directory.

### Testing function invokes

You can use Jest's **mock** function to create mock functions and modules for testing. This is useful when you want to test a component that depends on external APIs or other untestable code. Here's an example of how to use Jest mocks in a React component test:

```jsx
import React from "react";
import MyComponent from "./MyComponent";
import * as api from "./api";

jest.mock("./api");

it("calls the API when mounted", () => {
  const spy = jest.spyOn(api, "getData");
  const wrapper = mount(<MyComponent />);
  expect(spy).toHaveBeenCalled();
});
```

In this example, we're using Jest's **mock** function to mock the api.

### Testing events

To test a click event handler in a React component using Jest, you can use the simulate method provided by the react-test-renderer library. This method allows you to simulate a DOM event and make assertions about the component's behavior as a result.

Here's an example of how you might test a click event handler in a React component:

```jsx
import React from "react";
import { shallow } from "enzyme";
import MyComponent from "./MyComponent";

it("calls the click event handler when the button is clicked", () => {
  const mockClickHandler = jest.fn();
  const wrapper = shallow(<MyComponent onClick={mockClickHandler} />);
  wrapper.find("button").simulate("click");
  expect(mockClickHandler).toHaveBeenCalled();
});
```

In this example, we're using the **shallow** method from the **enzyme** library to render a shallow version of the **MyComponent** component. We're then using the simulate method to **simulate** a click event on the **button** element inside the component. Finally, we're using Jest's **toHaveBeenCalled** function to make an assertion that the mock click handler function was called when the button was clicked.

You can also use the **simulate** method to test other DOM events, such as **focus**, **blur**, **submit**, and many others. For example, you could test a **submit** event handler like this:

```jsx
import React from "react";
import { shallow } from "enzyme";
import MyComponent from "./MyComponent";

it("calls the submit event handler when the form is submitted", () => {
  const mockSubmitHandler = jest.fn();
  const wrapper = shallow(<MyComponent onSubmit={mockSubmitHandler} />);
  wrapper.find("form").simulate("submit");
  expect(mockSubmitHandler).toHaveBeenCalled();
});
```

In this example, we're simulating a submit event on the form element inside the component and making an assertion that the mock submit handler function was called.

### Helpful resources

- [Testing React Apps](https://jestjs.io/docs/tutorial-react)
