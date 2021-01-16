// import something here
import rMenu from '../components/rMenu.vue'
import rMenuItem from 'components/rMenuItem'
import ApexAnimal from 'components/ApexAnimal'

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
}