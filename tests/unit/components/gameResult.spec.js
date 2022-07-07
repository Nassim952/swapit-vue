import { shallowMount } from "@vue/test-utils";
import Games_result from '@/components/Game/Games_result.vue'

describe('Games_result.vue', () => {
    it('check gameResult component',() => {
        const query = "select * from games"
        const fixed = true
       
        const wrapper = shallowMount(Games_result, {
            propsData: {query,
                        fixed
                    }
        })
        expect(wrapper.text()).toMatch(query,fixed)
        
    } )
})