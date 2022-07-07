import { shallowMount } from "@vue/test-utils";
import GameLayer from '@/components/Game/GameLayer.vue'

describe('GameLayer.vue', () => {
    it('check gameLayer component',() => {
        const game =  new Object({id: 1,
        name: "Thief II: The Metal Age",
        status: "",
        storyline: "Thief. However, he is betrayed by his fence and ambushed after an early mission, and he determines that Truart, the local sheriff, is hunting him. Keepers take Garrett to hear a prophecy about ts. As Garrett leaves, one of the Keepers informs him that Truart had been hired to kill him, and he gives Garrett a letter thechanist cathedral before Karras activates their mait with plants, and Garrett completes her plan, killing Karras in the rust gas. Afterward, Garrett is approached by a Keeper who explains that Karras' scheme and Viktoria's death had been prophesied. Garrett demands to know the rest of the Keepers' prophecies as the game ends.",
        summary: "The ultimate thief is back! Tread softly as you make your way through 15 new complex, non-linear levels full of loot to steal and guards to outsmart. Improved enemy AI, new gadgets and a riveting story will draw you into the world of Thief II: The Metal Age, a place of powerful new technologies, fanatical religions and corruption.",
        version_title: "",
        aggregated_rating: 90,
        aggregated_rating_count: 1,
        follows: 51,
        first_release_date: 953596800,
        genres: [
        "/api/genres/5",
        "/api/genres/13"
        ],
        involvedCompanies: [
        "/api/companies/2740",
        "/api/companies/2739",
        "/api/companies/21014"
        ],
        modes: [
        "/api/modes/1"
        ],
        platforms: [
        "/api/platforms/6"
        ],
        versionTitle: "",
        aggregatedRating: 90,
        aggregatedRatingCount: 1,
        firstReleaseDate: 953596800})

        const full = false
    
        const wrapper = shallowMount(GameLayer, {
            propsData: {game,
                        full, 
                    }
        })
        expect(wrapper.text()).toMatch(game,full)
        
    } )
})