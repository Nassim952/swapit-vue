import { shallowMount } from "@vue/test-utils";
import Filtre from '@/components/Filter/Filtre.vue'

describe('Filtre.vue', () => {
    it('check Filtre component',() => {
        const title = "title of Filtre"
        const ressource = "black"
        const placeholder = "placeholder"
        const wrapper = shallowMount(Filtre, {
            propsData: {title,
                        ressource,
                        
                    }
        })
        expect(wrapper.text()).toMatch(title,ressource)
        
    } )
}) 