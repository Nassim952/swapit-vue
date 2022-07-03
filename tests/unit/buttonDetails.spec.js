import { shallowMount } from "@vue/test-utils";
import Button from '@/components/buttons/Button_Details.vue'

describe('Button_Details.vue', () => {
    it('check Button Details component',() => {
        const title = "Button details title"
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