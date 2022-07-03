import { shallowMount } from "@vue/test-utils";
import Contact from '@/components/Form/Contact.vue'

describe('Contact.vue', () => {
    it('check Contact form component',() => {
        const with_label = false
        const wrapper = shallowMount(Contact, {
            propsData: {with_label}
        })
        expect(wrapper.text()).toMatch(with_label)
        
    } )
})