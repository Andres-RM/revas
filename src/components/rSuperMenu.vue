<template>
  <div class="super-menu fit row wrap justify-center content-center items-center">
    <div class="row wrap col-12 full-height">
      <div class="col-12 col-sm-9 col-md-6">
        <ul class="row column justify-center items-center q-px-lg q-py-xl full-height">
          <li
            v-for="(link, index) of menu"
            :key="index"
            @click="toggle($event)"
            @mouseleave="leave"
            @mouseover="hover($event)">
            <router-link :to="link.to" exact>
              {{ link.text }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-12 col-sm-3 col-md-4" style="border-left: 1px solid rgba(255,255,255,.05)">
        <div class="row column justify-center full-height">
          <div class="email text-white">
            <h3>Creditos</h3>
            <p class="text-subtitle1">
              <q-icon name="fas fa-envelope"/>
              yoslyhernandez@gmail.com <br>
              (Prof. Yosly Hernandez)
            </p>
            <p class="text-subtitle1">
              <q-icon name="fas fa-envelope"/>
              danivagu2000@gmail.com <br>(Prof. Daniel Vargas)
            </p>
            <p class="text-subtitle1">
              <q-icon name="fas fa-envelope"/>
              ramriezandres1994@gmail.com <br>(Luis Ramirez)
            </p>
          </div>
          <div class="email text-white">
            <h3 style="line-height: 1.5">Objeto de Aprendizaje de <br>Contenidos Abiertos</h3>
            <p class="text-subtitle1">
              Movimiento de rebaño vacuno - simulador
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-2 sm-hide" style="border-left: 1px solid rgba(255,255,255,.05)">
        <div class="row justify-center full-height relative-position">
          <img src="~assets/logo-ucv.png" class="logo-menu" :style="style">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rSuperMenu',
  data () {
    return {
      menu: [
        {
          to: {
            name: 'home'
          },
          text: 'Inicio'
        },
        {
          to: {
            name: 'simulacion'
          },
          text: 'Simulación'
        }
      ],
      style: {
        top: '50%'
      }
    }
  },
  methods: {
    toggle (e) {
      this.$emit('togglemenu', e)
    },
    hover (e) {
      this.style.top = e.target.offsetTop + 70 + 'px'
    },
    leave () {
      this.style.top = '50%'
    }
  }
}
</script>

<style scoped lang="scss">
.email {
  margin: 20px 0;
  padding-left: 10px;
  position: relative;

  h3 {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 3px;
      background: #ffffff;
    }

    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  p {
    font-weight: 300;
  }
}

.logo-menu {
  position: absolute;
  left: 0;
  transform: translate(-50%, -50%);
  max-width: 200px;
  top: 50%;
  transition: all .5s ease-out;
}
</style>
