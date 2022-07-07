import { shallowMount } from "@vue/test-utils";
import Button from '@/components/buttons/Button.vue'

describe('Button.vue', () => {
    it('check Button component',() => {
        const title = "Button title"
        const as = "a"
        const onClick = function test(){
            return "sortie"
        }
        const wrapper = shallowMount(Button, {
            propsData: {name,
                        title,
                        as,
                        onClick
                    }
        })
        expect(wrapper.text()).toMatch(title,as,onClick)
        
    } )
})