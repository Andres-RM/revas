<template>
  <q-page padding>
    <div class="row wrap q-col-gutter-md">
      <div class="col-12 col-md-2">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">Población Inicial</div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-form @submit="procesar">
              <q-input
                v-for="(animal, index) in animalesInput"
                :key="index"
                filled
                color="secondary"
                dense
                type="number"
                :label="animal.label"
                v-model.number="animal.value"
                lazy-rules
                :rules="[val => (val !== null && val !== '') || 'Requerido']"
              />
              <q-select
                v-model="anio"
                :options="[5, 6, 7, 8, 9, 10]"
                dense
                color="secondary"
                filled
                label="Años proyectados"
                lazy-rules
                :rules="[val => (val !== null && val !== '') || 'Requerido']"
              />
              <q-btn
                type="submit"
                color="primary"
                label="procesar"
                dense
                no-caps
                :loading="load_procesar"
                no-wrap
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-10">
        <div class="row q-col-gutter-md wrap justify-center full-height">
          <template v-if="resultados.vacas.length">
            <div class="col-12 col-sm-6 col-md-9">
              <q-intersection once transition="slide-down">
                <q-card>
                  <q-card-section>
                    <div class="text-subtitle1 q-mb-sm">
                      Proyección por animal
                    </div>
                    <div class="row wrap q-col-gutter-sm">
                      <div class="col col-sm-4 col-md-3">
                        <q-select
                          @input="selectAnimal"
                          v-model="animal_select"
                          :options="selectOption"
                          option-value="key"
                          emit-value
                          map-options
                          dense
                          outlined
                          option-label="label"
                          label="Animal"
                        />
                      </div>
                      <div class="col">
                        <q-tabs
                          v-model="tab_anio"
                          class="text-teal"
                          stretch
                          align="left"
                        >
                          <q-tab
                            v-for="(anio, index) of resultados[animal_select]"
                            :key="index"
                            :name="index"
                            :label="index + 1 + 'º año'"
                          />
                        </q-tabs>
                      </div>
                    </div>
                    <q-tab-panels v-model="tab_anio" animated keep-alive swipeable>
                      <q-tab-panel
                        v-for="(anio, index) of resultados[animal_select]"
                        :key="index"
                        :name="index"
                      >
                        <div class="row wrap q-col-gutter-md">
                          <div class="col-12 col-md-4">
                            <p>
                              Cantidad inicial:
                              <span class="text-weight-medium">{{
                                  Math.round(anio.numero)
                                }}</span>
                            </p>
                            <template v-if="anio.rate_partos">
                              <div
                                class="row q-gutter-md items-center content-center"
                              >
                                <p>Partos (%):</p>
                                <div class="col">
                                  <q-slider
                                    v-model="anio.rate_partos.default"
                                    :min="anio.rate_partos.min"
                                    :max="anio.rate_partos.max"
                                    snap
                                    label
                                    label-always
                                    @change="handleChange"
                                    :label-value="anio.rate_partos.default + '%'"
                                    :step="anio.rate_partos.step"
                                  />
                                </div>
                              </div>
                              <p>
                                Partos (nº):
                                <span class="text-weight-medium">{{
                                    Math.round(anio.num_partos)
                                  }}</span>
                              </p>
                            </template>
                            <template v-if="anio.rate_mortalidad">
                              <div
                                class="row q-gutter-md items-center content-center"
                              >
                                <p>Mortalidad (%):</p>
                                <div class="col">
                                  <q-slider
                                    v-model="anio.rate_mortalidad.default"
                                    :min="anio.rate_mortalidad.min"
                                    :max="anio.rate_mortalidad.max"
                                    snap
                                    label
                                    label-always
                                    @change="handleChange"
                                    :label-value="
                                  anio.rate_mortalidad.default + '%'
                                "
                                    :step="anio.rate_mortalidad.step"
                                  />
                                </div>
                              </div>
                              <p>
                                Mortalidad (nº):
                                <span class="text-weight-medium">{{
                                    Math.round(anio.num_mortalidad)
                                  }}</span>
                              </p>
                            </template>
                          </div>
                          <div class="col-12 col-md-4">
                            <template v-if="anio.rate_descarte">
                              <div
                                class="row q-gutter-md items-center content-center"
                              >
                                <p>Descarte (%):</p>
                                <div class="col">
                                  <q-slider
                                    v-model="anio.rate_descarte.default"
                                    :min="anio.rate_descarte.min"
                                    :max="anio.rate_descarte.max"
                                    snap
                                    label
                                    label-always
                                    @change="handleChange"
                                    :label-value="anio.rate_descarte.default + '%'"
                                    :step="anio.rate_descarte.step"
                                  />
                                </div>
                              </div>
                              <p>
                                Descarte (nº):
                                <span class="text-weight-medium">{{
                                    Math.round(anio.num_descarte)
                                  }}</span>
                              </p>
                            </template>
                            <p>
                              Reemplazo (n):
                              <span class="text-weight-medium">{{
                                  Math.round(anio.reemplazo)
                                }}</span>
                            </p>
                            <p>
                              Compras (n):
                              <span class="text-weight-medium">{{
                                  Math.round(anio.compras)
                                }}</span>
                            </p>
                          </div>
                          <div class="col-12 col-md-4">
                            <p>
                              Disponibles (n):
                              <span class="text-weight-medium">{{
                                  Math.round(anio.disponibles)
                                }}</span>
                            </p>
                            <p>
                              Ventas (n):
                              <span class="text-weight-medium">{{
                                  Math.round(anio.ventas)
                                }}</span>
                            </p>
                            <p class="text-body1">
                              Total (n):
                              <span class="text-weight-medium">
                            {{ Math.round(anio.total) }}
                          </span>
                            </p>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card-section>
                </q-card>
              </q-intersection>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-intersection once transition="slide-left">
                <q-card class="bg-primary">
                  <q-card-section class="q-pb-none text-white">
                    <div class="text-h6">Unidad animal</div>
                  </q-card-section>
                  <apex-line-small :seriedata="resultados.ua"/>
                </q-card>
              </q-intersection>
            </div>
            <div class="col-12 col-md-6">
              <q-intersection once transition="slide-right">
                <q-card>
                  <q-card-section>
                    <apex-animal :animaldata="animal_select_value"/>
                  </q-card-section>
                </q-card>
              </q-intersection>
            </div>
            <div class="col-12 col-md-6">
              <q-intersection once transition="slide-left">
                <q-card>
                  <q-card-section>
                    <apex-animal-perdida :animaldata="animal_select_value"/>
                  </q-card-section>
                </q-card>
              </q-intersection>
            </div>
          </template>
          <div class="col self-center text-center" v-else>
            <q-spinner-gears size="70px" color="primary"/>
            <p class="text-h5 text-weight-light">Simulador</p>
            <p class="text-subtitle2 text-weight-medium">
              Ingrese los valores iniciales de población animal para ejecutar
              simulacion
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Pagesimulacion',
  data () {
    return {
      animalesInput: [
        {
          value: null,
          label: 'Vacas',
          key: 'vacas',
          rate_partos: {
            min: 60,
            max: 75,
            default: 65,
            step: 1
          },
          rate_mortalidad: {
            min: 1,
            max: 2,
            default: 1.5,
            step: 0.1
          },
          rate_descarte: {
            min: 15,
            max: 20,
            default: 18,
            step: 1
          },
          calcularReemplazo: data => {
            return data.num_descarte + data.num_mortalidad
          },
          calcularDisponibilidad: data => {
            return data.numero - data.reemplazo + data.compras
          },
          calcularVentas: data => {
            return data.reemplazo
          },
          calcularTotal: data => {
            return data.disponibles
          }
        },
        {
          value: null,
          label: 'Mautes(as)',
          key: 'mautes',
          rate_mortalidad: {
            min: 1,
            max: 5,
            default: 4,
            step: 0.5
          },
          calcularDisponibilidad: data => {
            return data.numero - data.num_mortalidad
          },
          calcularTotal: data => {
            return data.disponibles - data.ventas
          }
        },
        {
          value: null,
          label: 'Novillas',
          key: 'novillas',
          rate_mortalidad: {
            min: 1,
            max: 3,
            default: 2,
            step: 0.1
          },
          calcularDisponibilidad: data => {
            return data.numero - data.num_mortalidad
          },
          calcularTotal: data => {
            return data.disponibles - data.ventas
          }
        },
        {
          value: null,
          label: 'Novillos',
          key: 'novillos',
          rate_mortalidad: {
            min: 1,
            max: 3,
            default: 2,
            step: 0.1
          },
          calcularDisponibilidad: data => {
            return data.numero - data.num_mortalidad
          },
          calcularTotal: data => {
            return data.disponibles - data.ventas
          },
          calcularVentas: data => {
            return data.disponibles
          }
        },
        {
          value: null,
          label: 'Toretes',
          key: 'toretes',
          rate_mortalidad: {
            min: 1,
            max: 3,
            default: 2,
            step: 0.1
          },
          calcularDisponibilidad: data => {
            return data.numero - data.num_mortalidad
          },
          calcularTotal: data => {
            return data.disponibles - data.ventas
          },
          calcularVentas: data => {
            return data.disponibles
          }
        },
        {
          value: null,
          label: 'Toros',
          key: 'toros',
          rate_mortalidad: {
            min: 0,
            max: 2,
            default: 1.5,
            step: 0.1
          },
          rate_descarte: {
            min: 30,
            max: 40,
            default: 35,
            step: 1
          },
          calcularReemplazo: data => {
            return data.num_descarte + data.num_mortalidad
          },
          calcularCompras: data => {
            return Math.round(data.reemplazo)
          },
          calcularDisponibilidad: data => {
            return data.numero - data.reemplazo + data.compras
          },
          calcularVentas: data => {
            return Math.round(data.num_descarte)
          },
          calcularTotal: data => {
            return data.disponibles
          }
        }
      ],
      uaSetting: [
        {
          value: 1,
          label: 'Vacas',
          key: 'vacas'
        },
        {
          value: 0.25,
          label: 'Becerros(as)',
          key: 'becerros'
        },
        {
          value: 0.5,
          label: 'Mautes(as)',
          key: 'mautes'
        },
        {
          value: 0.75,
          label: 'Novillas',
          key: 'novillas'
        },
        {
          value: 0.75,
          label: 'Novillos',
          key: 'novillos'
        },
        {
          value: 0.75,
          label: 'Toretes',
          key: 'toretes'
        },
        {
          value: 1.5,
          label: 'Toros',
          key: 'toros'
        }
      ],
      resultados: {
        vacas: [],
        becerros: [],
        mautes: [],
        novillas: [],
        novillos: [],
        toretes: [],
        toros: [],
        ua: []
      },
      load_procesar: false,
      animal_select: 'vacas',
      selectOption: [
        {
          key: 'vacas',
          label: 'Vacas'
        },
        {
          key: 'becerros',
          label: 'Becerros(as)'
        },
        {
          label: 'Mautes(as)',
          key: 'mautes'
        },
        {
          label: 'Novillas',
          key: 'novillas'
        },
        {
          label: 'Novillos',
          key: 'novillos'
        },
        {
          label: 'Toretes',
          key: 'toretes'
        },
        {
          label: 'Toros',
          key: 'toros'
        }
      ],
      animal_select_value: [],
      tab_anio: 0,
      anio: 5
    }
  },
  methods: {
    procesar () {
      this.load_procesar = true
      this.resultados = {
        becerros: [],
        mautes: [],
        novillas: [],
        novillos: [],
        toretes: [],
        toros: [],
        vacas: [],
        ua: []
      }
      this.primerAnio()
      this.proyecion()
      this.animal_select_value = this.resultados[this.animal_select]
      this.calcularUA()
      this.load_procesar = false
    },
    primerAnio () {
      this.animalesInput.forEach(animal => {
        const data = {
          numero: animal.value,
          rate_partos: animal.rate_partos
            ? Object.assign({}, animal.rate_partos)
            : null,
          num_partos: animal.rate_partos
            ? animal.value * (animal.rate_partos.default / 100)
            : 0,
          rate_mortalidad: animal.rate_mortalidad
            ? Object.assign({}, animal.rate_mortalidad)
            : null,
          num_mortalidad: animal.rate_mortalidad
            ? animal.value * (animal.rate_mortalidad.default / 100)
            : 0,
          rate_descarte: animal.rate_descarte
            ? Object.assign({}, animal.rate_descarte)
            : null,
          num_descarte: animal.rate_descarte
            ? animal.value * (animal.rate_descarte.default / 100)
            : 0
        }
        data.reemplazo = animal.calcularReemplazo
          ? animal.calcularReemplazo(data)
          : 0
        data.compras = animal.calcularCompras ? animal.calcularCompras(data) : 0
        data.disponibles = animal.calcularDisponibilidad(data)
        data.ventas = animal.calcularVentas ? animal.calcularVentas(data) : 0
        data.total = animal.calcularTotal(data)
        this.resultados[animal.key].push(data)
        if (animal.key === 'vacas') {
          const becerro = this.procesarBecerro(data)
          this.resultados.becerros.push(becerro)
        }
      })
    },
    proyecion () {
      if (!this.resultados.vacas.length) this.primerAnio()
      for (let i = 0; i < this.anio - 1; i++) {
        const vaca = this.procesarVaca(
          this.resultados.vacas[i],
          this.resultados.novillas[i]
        )
        this.resultados.vacas.push(vaca)
        const becerro = this.procesarBecerro(vaca)
        this.resultados.becerros.push(becerro)
        const maute = this.procesarMaute(
          this.resultados.becerros[i],
          this.resultados.mautes[i]
        )
        this.resultados.mautes.push(maute)
        const novilla = this.procesarNovillas(
          this.resultados.mautes[i],
          this.resultados.novillas[i],
          vaca
        )
        this.resultados.novillas.push(novilla)
        const novillo = this.procesarNovillos(
          this.resultados.mautes[i],
          this.resultados.novillos[i]
        )
        this.resultados.novillos.push(novillo)
        const toretes = this.procesarToretes(
          this.resultados.mautes[i],
          this.resultados.toretes[i]
        )
        this.resultados.toretes.push(toretes)
        const toro = this.procesarToro(this.resultados.toros[i])
        this.resultados.toros.push(toro)
      }
    },
    procesarBecerro (vacas) {
      const data = {
        numero: vacas.num_partos,
        rate_partos: null,
        num_partos: 0,
        rate_mortalidad: {
          min: 5,
          max: 15,
          default: 10
        },
        num_mortalidad: vacas.num_partos * (10 / 100),
        rate_descarte: null,
        num_descarte: 0,
        reemplazo: 0,
        compras: 0,
        ventas: 0
      }
      data.disponibles = data.numero - data.num_mortalidad
      data.total = data.disponibles - data.ventas
      return data
    },
    procesarVaca (anteriorVaca, anteriorNovilla) {
      const data = {
        numero: anteriorVaca.total + anteriorNovilla.total
      }
      data.rate_partos = Object.assign({}, anteriorVaca.rate_partos)
      data.num_partos = data.numero * (data.rate_partos.default / 100)
      data.rate_mortalidad = Object.assign({}, anteriorVaca.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.rate_descarte = Object.assign({}, anteriorVaca.rate_descarte)
      data.num_descarte = data.numero * (data.rate_descarte.default / 100)
      data.reemplazo = data.num_descarte + data.num_mortalidad
      data.compras = 0
      data.disponibles = data.numero - data.reemplazo + data.compras
      data.ventas = Math.round(data.num_descarte)
      data.total = data.disponibles
      return data
    },
    procesarMaute (anteriorBecerro, anteriorMaute) {
      const data = {
        numero: anteriorBecerro.total,
        rate_partos: null,
        num_partos: 0,
        rate_descarte: null,
        num_descarte: 0,
        reemplazo: 0,
        compras: 0,
        ventas: 0
      }
      data.rate_mortalidad = Object.assign({}, anteriorMaute.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.disponibles = data.numero - data.num_mortalidad
      data.total = data.disponibles - data.ventas
      return data
    },
    procesarNovillas (anteriorMaute, anteriorNovilla, vacas) {
      const data = {
        numero: anteriorMaute.total / 2,
        rate_partos: null,
        num_partos: 0,
        rate_descarte: null,
        num_descarte: 0,
        reemplazo: 0,
        compras: 0
      }
      data.rate_mortalidad = Object.assign({}, anteriorNovilla.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.disponibles = data.numero - data.num_mortalidad
      data.ventas = Math.round(vacas.total + data.disponibles - 600)
      data.total = data.disponibles - data.ventas
      return data
    },
    procesarNovillos (anteriorMaute, anteriorNovillo) {
      const data = {
        numero: anteriorMaute.total / 4,
        rate_partos: null,
        num_partos: 0,
        rate_descarte: null,
        num_descarte: 0,
        reemplazo: 0,
        compras: 0
      }
      data.rate_mortalidad = Object.assign({}, anteriorNovillo.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.disponibles = data.numero - data.num_mortalidad
      data.ventas = Math.round(data.disponibles)
      data.total = data.disponibles - data.ventas
      return data
    },
    procesarToretes (anteriorMaute, anteriorTorete) {
      const data = {
        numero: anteriorMaute.total / 4,
        rate_partos: null,
        num_partos: 0,
        rate_descarte: null,
        num_descarte: 0,
        reemplazo: 0,
        compras: 0
      }
      data.rate_mortalidad = Object.assign({}, anteriorTorete.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.disponibles = data.numero - data.num_mortalidad
      data.ventas = Math.round(data.disponibles)
      data.total = data.disponibles - data.ventas
      return data
    },
    procesarToro (anteriorToro) {
      const data = {
        numero: anteriorToro.total,
        rate_partos: null,
        num_partos: 0
      }
      data.rate_mortalidad = Object.assign({}, anteriorToro.rate_mortalidad)
      data.num_mortalidad = data.numero * (data.rate_mortalidad.default / 100)
      data.rate_descarte = Object.assign({}, anteriorToro.rate_descarte)
      data.num_descarte = data.numero * (data.rate_descarte.default / 100)
      data.reemplazo = data.num_mortalidad + data.num_descarte
      data.compras = Math.round(data.reemplazo)
      data.disponibles = data.numero - data.reemplazo + data.compras
      data.ventas = Math.round(data.num_descarte)
      data.total = data.disponibles
      return data
    },
    calcularUA () {
      this.resultados.ua = []
      this.resultados.vacas.forEach((value, index, array) => {
        let ua = 0
        this.uaSetting.forEach((uasetting) => {
          ua += this.resultados[uasetting.key][index].numero * uasetting.value
        })
        this.resultados.ua.push(ua)
      })
    },
    selectAnimal (key) {
      this.animal_select_value = this.resultados[key]
    },
    handleChange () {
      this.resultados.vacas.forEach((vaca, index, array) => {
        if (index) {
          vaca.numero =
            array[index - 1].total + this.resultados.novillas[index - 1].total
        }
        vaca.num_partos = vaca.numero * (vaca.rate_partos.default / 100)
        vaca.num_mortalidad =
          vaca.numero * (vaca.rate_mortalidad.default / 100)
        vaca.num_descarte = vaca.numero * (vaca.rate_descarte.default / 100)
        vaca.reemplazo = vaca.num_descarte + vaca.num_mortalidad
        vaca.disponibles = vaca.numero - vaca.reemplazo + vaca.compras
        vaca.ventas = Math.round(vaca.num_descarte)
        vaca.total = vaca.disponibles
      })
      this.resultados.becerros.forEach((becerro, index) => {
        becerro.numero = this.resultados.vacas[index].num_partos
        becerro.num_mortalidad =
          becerro.numero * (becerro.rate_mortalidad.default / 100)
        becerro.disponibles = becerro.numero - becerro.num_mortalidad
        becerro.total = becerro.disponibles - becerro.ventas
      })
      this.resultados.mautes.forEach((maute, index) => {
        if (index) maute.numero = this.resultados.becerros[index - 1].total
        maute.num_mortalidad =
          maute.numero * (maute.rate_mortalidad.default / 100)
        maute.disponibles = maute.numero - maute.num_mortalidad
        maute.total = maute.disponibles - maute.ventas
      })
      this.resultados.novillas.forEach((novilla, index) => {
        if (index) novilla.numero = this.resultados.mautes[index - 1].total / 2
        novilla.num_mortalidad =
          novilla.numero * (novilla.rate_mortalidad.default / 100)
        novilla.disponibles = novilla.numero - novilla.num_mortalidad
        if (index) {
          novilla.ventas =
            Math.round(novilla.disponibles + this.resultados.vacas[index].total - 600)
        }
        novilla.total = novilla.disponibles - novilla.ventas
      })
      this.resultados.novillos.forEach((novillo, index) => {
        if (index) novillo.numero = this.resultados.mautes[index - 1].total / 4
        novillo.num_mortalidad =
          novillo.numero * (novillo.rate_mortalidad.default / 100)
        novillo.disponibles = novillo.numero - novillo.num_mortalidad
        novillo.ventas = Math.round(novillo.disponibles)
        novillo.total = novillo.disponibles - novillo.ventas
      })
      this.resultados.toretes.forEach((torete, index) => {
        if (index) torete.numero = this.resultados.mautes[index - 1].total / 4
        torete.num_mortalidad =
          torete.numero * (torete.rate_mortalidad.default / 100)
        torete.disponibles = torete.numero - torete.num_mortalidad
        torete.ventas = Math.round(torete.disponibles)
        torete.total = torete.disponibles - torete.ventas
      })
      this.resultados.toros.forEach((toro, index, array) => {
        if (index) toro.numero = array[index - 1].total
        toro.num_mortalidad =
          toro.numero * (toro.rate_mortalidad.default / 100)
        toro.num_descarte = toro.numero * (toro.rate_descarte.default / 100)
        toro.reemplazo = toro.num_descarte + toro.num_mortalidad
        toro.compras = Math.round(toro.reemplazo)
        toro.disponibles = toro.numero - toro.reemplazo + toro.compras
        toro.ventas = Math.round(toro.num_descarte)
        toro.total = toro.disponibles
      })
      this.selectAnimal(this.animal_select)
      this.calcularUA()
    }
  }
}
</script>
