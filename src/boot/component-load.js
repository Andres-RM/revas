// import something here
import ApexAnimal from 'components/ApexAnimal'
import ApexAnimalPerdida from 'components/ApexAnimalPerdida'
import rMenuItem from 'components/rMenuItem'
import rMenu from '../components/rMenu.vue'
import ApexLineSmall from 'components/ApexLineSmall'
import rSuperMenu from 'components/rSuperMenu'
import rFooter from 'components/rFooter'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({
  app,
  router,
  Vue
}) => {
  Vue.component(rMenu.name, rMenu)
  Vue.component(rMenuItem.name, rMenuItem)
  Vue.component(ApexAnimal.name, ApexAnimal)
  Vue.component(ApexAnimalPerdida.name, ApexAnimalPerdida)
  Vue.component(ApexLineSmall.name, ApexLineSmall)
  Vue.component(rSuperMenu.name, rSuperMenu)
  Vue.component(rFooter.name, rFooter)
}
