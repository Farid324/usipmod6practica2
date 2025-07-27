<template>
  <div id="app">
    <nav>
      <router-link class="pestana" to="/">Prendas</router-link>
      <router-link class="pestana" to="/categorias">Categorías</router-link>
    </nav>

    <router-view />

    <footer>
      <p>Práctica 2 - Agenda de Ropa | Vue 3 + JSON Server</p>
      <p>Desarrollado por: Farid Arancibia</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}
.pestana{
  background-color: #ffffff;
  color: black;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  background-color: #459cf8;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

footer {
  text-align: center;
  margin-top: auto;
  padding: 1rem;
  background-color: #ffffff;
  font-size: 14px;
}
</style>