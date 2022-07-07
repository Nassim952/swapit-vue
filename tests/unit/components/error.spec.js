import { shallowMount } from "@vue/test-utils";
import Error from '@/components/Errors/Error.vue'

describe('Error.vue', () => {
    it('check Error component',() => {
        const variant = "white"
        const value = "erreur"
        
        const wrapper = shallowMount(Error, {
            propsData: {variant,
                        value
                    }
        })
        expect(wrapper.text()).toMatch(value, variant)
        
    } )
})