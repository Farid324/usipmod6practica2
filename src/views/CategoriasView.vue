<template>
  <div class="categorias">
    <h1>Gestión de Categorías</h1>

    <CategoriaFormComponent
      :editando="categoriaEditando"
      @refrescar="cargarCategorias"
      @cancelar="categoriaEditando = null"
    />

    <CategoriaListComponent
      :categorias="categorias"
      @refrescar="cargarCategorias"
      @editar="categoriaEditando = $event"
    />
  </div>
</template>

<script>
import axios from 'axios'
import CategoriaFormComponent from '../components/CategoriaFormComponent.vue'
import CategoriaListComponent from '../components/CategoriaListComponent.vue'

export default {
  components: {
    CategoriaFormComponent,
    CategoriaListComponent
  },
  data() {
    return {
      categorias: [],
      categoriaEditando: null
    }
  },
  created() {
    this.cargarCategorias()
  },
  methods: {
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
.categorias {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
