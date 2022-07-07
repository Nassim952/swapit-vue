import { shallowMount } from "@vue/test-utils";
import Signin from '@/components/Form/Signin.vue'

describe('Signin.vue', () => {
    it('check Signin form component',() => {
        const with_label = false
        const wrapper = shallowMount(Signin)
        expect(wrapper.text()).toMatch(with_label)
        
    } )
})