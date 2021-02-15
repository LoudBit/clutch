import test from 'ava'
import { mount } from '@vue/test-utils'
import Lch2 from '~/components/Lch2'

test('is a Vue instance', (t) => {
  const wrapper = mount(Lch2)
  t.is(wrapper.isVueInstance(), true)
})
