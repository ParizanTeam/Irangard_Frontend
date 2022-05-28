import React from 'react';
import { mount, shallow } from 'enzyme';

function Fixture() {
  return (
    <div>
      <div id="checked">hello</div>
    </div>
  );
}

test('hello', () => {
  const wrapper = mount(<Fixture />); // mount/render/shallow when applicable
  expect(wrapper.find('#checked').text()).toEqual('hello');
});
