import React from "react";
import { shallow, render, mount } from 'enzyme';

import InputNumber from "./InputNumber";


it("sets input value", () => {
    const props = {
        max: 10,
        min: 1,
        value: 2
    };
    const input = mount(<InputNumber {...props} />);
    expect(input.state('val')).toBe(2);
});

it("sets input min value", () => {
    const props = {
        max: 10,
        min: 1,
        value: 20
    };
    const input = mount(<InputNumber {...props} />);
    expect(input.state('val')).toBe(1);
});

it("sets input min value 2", () => {
    const props = {
        max: 10,
        min: 5,
        value: 2
    };
    const input = mount(<InputNumber {...props} />);
    expect(input.state('val')).toBe(5);
});

it("sets new input value", () => {
    const props = {
        max: 10,
        min: 1,
        value: 2
    };
    const input = mount(<InputNumber {...props} />);
    const event = {
        target: {
            value: "3"
        }
    };
    input.simulate('change', event);
    expect(input.state('val')).toBe(3);
});
