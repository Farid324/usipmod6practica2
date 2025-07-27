<template>
  <div class="home">
    <h1>Gestión de Prendas</h1>

    <PrendaFormComponent
      :editando="prendaEditando"
      :categorias="categorias"
      @refrescar="cargarPrendas"
      @cancelar="prendaEditando = null"
    />

    <PrendaListComponent
      :prendas="prendas"
      :categorias="categorias"
      @refrescar="cargarPrendas"
      @editar="prendaEditando = $event"
    />
  </div>
</template>

<script>
import axios from 'axios'
import PrendaFormComponent from '../components/PrendaFormComponent.vue'
import PrendaListComponent from '../components/PrendaListComponent.vue'

export default {
  components: {
    PrendaFormComponent,
    PrendaListComponent
  },
  data() {
    return {
      prendas: [],
      categorias: [],
      prendaEditando: null
    }
  },
  created() {
    this.cargarPrendas()
    this.cargarCategorias()
  },
  methods: {
    async cargarPrendas() {
      try {
        const res = await axios.get('http://localhost:3000/prendas')
        this.prendas = res.data
      } catch (err) {
        console.error('Error al cargar prendas:', err)
      }
    },
    async cargarCategorias() {
      try {
        const res = await axios.get('http://localhost:3000/categorias')
        this.categorias = res.data
      } catch (err) {
        console.error('Error al cargar categorías:', err)
      }
    }
  }
}
</script>

<style scoped>
.home {
  max-width: auto;
  margin: auto;
  padding: 2rem;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>