<template>
    <header>
    <nav>
      <ul>
        <li>
          <!--
            router-link acts like a href=""
            on active link additional classes are added:
            router-link-active
            router-link-exact-active (for nested routes)
            classes names are configurable in router  
            -->
          <router-link to="/">Home</router-link>
        </li>
        <!-- <li>
          <router-link to="/about">About</router-link>
        </li> -->
        <li>
          <router-link to="/prompt-imager">Prompt Imager</router-link>
        </li>
        <li>
          <router-link to="/chat">askGPT</router-link>
        </li>
      </ul>
    </nav>
  </header>

 
  

</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a {
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  color:#e1f4f7;
  display: inline-block;
  //font-family: 'VT323', sans-serif;
  //font-size: 1.4rem;

}

a:hover,
a.active {
  color: #f1a80a;
}
</style>
