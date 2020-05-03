import Common from '@/components/common';
import shop from './shop';
import goods from './goods'
const components = {
    ...Common,
    ...shop,
    ...goods,
}
export default {
    install(Vue) {
        for (let key in components){
            Vue.component(key,components[key])
        }
    }
}