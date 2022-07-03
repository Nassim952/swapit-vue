import { shallowMount } from "@vue/test-utils";
import Input from '@/components/Inputs/Input.vue'

describe('Input.vue', () => {
    it('check input component',() => {
        const name = "name of input"
        const type = "type of input"
        const variant = "black"
        const placeholder = "placeholder"
        const wrapper = shallowMount(Input, {
            propsData: {name,
                        type,
                        variant,
                        placeholder,
                    }
        })
        expect(wrapper.text()).toMatch(name,type,variant,placeholder)
        
    } )
})